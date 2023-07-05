import pq_EventRepository, { LoginSucceededParameter } from "../event/pq_EventRepository";
import pq_HqqHub from "../hqqhub/pq_Hqq";

export default class pq_Config {

    public static isLogin: boolean;

    public readonly version: string;

    public readonly userId: number;

    public readonly password: string;

    public readonly token: string;

    public readonly gameId: string

    public readonly serverUrl: string

    public pqItem: PQItem;

    private pq_HqqHub: pq_HqqHub;

    private pq_EventRepository: pq_EventRepository;

    public constructor(pq_HqqHub: pq_HqqHub) {
        this.version = "0.1.2";
        console.log(`[pq_Config] ${this.version}`);

        this.pq_HqqHub = pq_HqqHub;

        if (pq_Config.isLogin == null || pq_Config.isLogin === false) {
            this.clearPQItem();
        }

        this.initPQItem();

        this.userId = pq_HqqHub.getUserId();
        this.password = pq_HqqHub.getPassword();
        this.token = pq_HqqHub.getToken();
        this.gameId = pq_HqqHub.getGameId();
        this.serverUrl = pq_HqqHub.getServerUrl();
    }

    public init(pq_EventRepository: pq_EventRepository){
        this.pq_EventRepository = pq_EventRepository;
        pq_EventRepository.onLoginSucceeded.Attach(this.onLoginSucceeded);
        pq_EventRepository.onRefreshTokenonSucceeded.Attach(this.onRefreshTokenonSucceeded);
    }

    public destroy() {
        this.pq_EventRepository.onLoginSucceeded.Detach(this.onLoginSucceeded);
        this.pq_EventRepository.onRefreshTokenonSucceeded.Detach(this.onRefreshTokenonSucceeded);
        console.log(`[pq_Config] destroy`);
    }

    private onLoginSucceeded = (loginSucceededParamter: LoginSucceededParameter) => {
        const pqToken = loginSucceededParamter.pqToken;
        this.setPQToken(pqToken);
        this.setPQBalance(loginSucceededParamter.balance);
        pq_Config.isLogin = true;
    }

    private onRefreshTokenonSucceeded = (pqToken: string) => {
        this.setPQToken(pqToken);
    }

    public setPQToken(pqToken: string) {
        console.log("[pq_Config] setPQToken", pqToken);
        this.pqItem.pqToken = pqToken;
        localStorage.setItem("pq", JSON.stringify(this.pqItem));
    }

    private setPQBalance(pqBalance: number) {
        console.log("[pq_Config] setPQBalance", pqBalance);
        this.pqItem.pqBalance = pqBalance;
        localStorage.setItem("pq", JSON.stringify(this.pqItem));
    }

    private initPQItem() {
        const pqItemString = localStorage.getItem("pq");
        if (pqItemString != null) {
            const pqItem: PQItem = JSON.parse(pqItemString);
            this.pqItem = pqItem;
            console.log("[pq_Config] initPQItem", pqItemString);
        } else {
            this.pqItem = {
                pqToken: null,
                pqBalance: null,
            };
            console.log("[pq_Config] pqItemString is null");
        }
    }

    private clearPQItem() {
        localStorage.removeItem("pq");
        console.log("[pq_Config] clearPQItem");
    }
}

interface PQItem {
    pqToken: string;
    pqBalance: number;
}