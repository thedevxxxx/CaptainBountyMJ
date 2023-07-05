import { pq_IHqq } from "../../hqqhub/pq_Hqq";
import { IModel } from "./NetManagerBase";

export default class ModelBase implements IModel {
    readonly userId: number;
    readonly password: string;
    readonly token: string;
    readonly gameId: string;
    readonly serverUrl: string;

    autoCount: number = 0;
    pqToken: string;
    betAmount: number;
    betAmounts: number[];
    betMutiple: number;
    baseBet: number = 1;
    totalBetAmount: number;
    isTurboOn: boolean;
    freeGameCount: number;
    freeGameTotalWin: number = 0;
    isAutoSpin: boolean;
    isFreeGame: boolean;
    isFreeGamePanelDisplaying: boolean;

    pqItem: PQItem;

    constructor(hqq: pq_IHqq) {
        this.initPQItem();

        this.userId = hqq.getUserId();
        this.password = hqq.getPassword();
        this.token = hqq.getToken();
        this.gameId = hqq.getGameId();
        this.serverUrl = hqq.getServerUrl();
        this.pqToken = this.pqItem.pqToken;
    }

    setPQToken(pqToken: string): void {
        this.pqToken = pqToken;
        this.pqItem.pqToken = pqToken;
        localStorage.setItem("pq", JSON.stringify(this.pqItem));
    }

    setPQBalance(pqBalance: number): void {
        this.pqItem.pqBalance = pqBalance;
        localStorage.setItem("pq", JSON.stringify(this.pqItem));
    }

    private initPQItem() {
        const pqItemString = localStorage.getItem("pq");
        if (pqItemString != null) {
            const pqItem: PQItem = JSON.parse(pqItemString);
            this.pqItem = pqItem;
        } else {
            this.pqItem = {
                pqToken: null,
                pqBalance: null,
            };
            console.log("pqItemString is null");
        }
    }
}

export interface PQItem {
    pqToken: string;
    pqBalance: number;
}