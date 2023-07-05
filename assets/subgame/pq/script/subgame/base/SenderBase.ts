import BaseTimer, { delay } from "../common/BaseTimer";
import httpNetwork from "../../network/pq_HttpNetwork";
import proto from "../../network/proto/PQproto_msg.js";
import { IModel, ISender } from "./NetManagerBase";
import { FreeGameParameter } from "../../event/pq_EventRepository";

export default class SenderBase implements ISender {
    private model: IModel;
    private refreshTokenInterval: ReturnType<typeof setInterval>;

    private gameCode: string;
    private timer: BaseTimer = new BaseTimer();

    init(model: IModel, gamecode: string): void {
        this.model = model;
        this.gameCode = gamecode;

        httpNetwork.getInstance().sendMessage(proto.SubCommand.EnumSubEnterGameReq, {
            userId: this.model.userId,
            gameCode: this.gameCode,
        });
    }

    async onFreeGame(param: FreeGameParameter): Promise<void> {
        if (param.isFirstFreeGame) {
            return;
        }
        await this.startSpinOnce(1000);
    }

    async onPoorNetwork(count: number): Promise<void> {
        if (count < 6) {
            await this.startSpinOnce(3000);
        }
    }

    async startSpinOnce(sec: number): Promise<void> {
        await delay(sec);
        httpNetwork.getInstance().sendMessage(proto.SubCommand.EnumSubSpinReq, {
            userId: this.model.userId,
            gameCode: this.gameCode,
            betSize: this.model.betAmount,
            betLevel: this.model.betMutiple,
            baseBet: this.model.baseBet
        });
    }

    startRefreshToken(): void {
        this.sendRefreshToken();
        this.refreshTokenInterval = setInterval(() => {
            this.sendRefreshToken();
        }, 600000 * 0.98);
    }

    destroy(): void {
        this.stopRefreshToken();
        this.timer.destroy();
    }

    protected sendRefreshToken() {
        httpNetwork.getInstance().sendMessage(proto.SubCommand.EnumSubUserRefreshTokenReq, {
            userId: this.model.userId
        });
    }

    protected stopRefreshToken() {
        if (this.refreshTokenInterval != null) {
            clearInterval(this.refreshTokenInterval);
            this.refreshTokenInterval = null;
        }
    }
}