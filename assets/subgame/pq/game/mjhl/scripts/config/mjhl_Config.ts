import { IConfig } from "../../../../script/base/Interface";
import { pq_IHqq } from "../../../../script/hqqhub/pq_Hqq";

export default class mjhl_Config implements IConfig {

    public readonly userId: number;

    public readonly password: string;

    public readonly token: string;

    public readonly gameId: string;

    public readonly serverUrl: string

    public pqToken: string;

    private pqItem: PQItem;

    public constructor(mjhl_IHqq: pq_IHqq) {
        this.initPQItem();

        this.userId = mjhl_IHqq.getUserId();
        this.password = mjhl_IHqq.getPassword();
        this.token = mjhl_IHqq.getToken();
        this.gameId = mjhl_IHqq.getGameId();
        this.serverUrl = mjhl_IHqq.getServerUrl();
        this.pqToken = this.pqItem.pqToken;
    }

    public destroy() {

    }

    public setPQToken(pqToken: string) {
        console.log("[mjhl_Config] setPQToken", pqToken);
        this.pqToken = pqToken;
        this.pqItem.pqToken = pqToken;
        localStorage.setItem("pq", JSON.stringify(this.pqItem));
    }

    public setPQBalance(pqBalance: number) {
        console.log("[mjhl_Config] setPQBalance", pqBalance);
        this.pqItem.pqBalance = pqBalance;
        localStorage.setItem("pq", JSON.stringify(this.pqItem));
    }

    private initPQItem() {
        const pqItemString = localStorage.getItem("pq");
        if (pqItemString != null) {
            const pqItem: PQItem = JSON.parse(pqItemString);
            this.pqItem = pqItem;
            console.log("[mjhl_Config] initPQItem", pqItemString);
        } else {
            this.pqItem = {
                pqToken: null,
                pqBalance: null,
            };
            console.log("[mjhl_Config] pqItemString is null");
        }
    }
}

interface PQItem {
    pqToken: string;
    pqBalance: number;
}