import { FreeGameParameter } from "../event/pq_EventRepository";
import BaseTimer, { delay } from "./BaseTimer";
import httpNetwork from "../network/pq_HttpNetwork";
import proto from "../network/proto/PQproto_msg.js";
import { ISender } from "./NetManagerBase";
import { IConfig, IDataRepository } from "./Interface";

export default class SenderBase implements ISender {
    private cfg: IConfig;
    private dataRepo: IDataRepository;
    private refreshTokenInterval: ReturnType<typeof setInterval>;

    private gameCode: string;
    private timer: BaseTimer = new BaseTimer();

    constructor(cfg: IConfig, dataRepo: IDataRepository) {
        this.cfg = cfg;
        this.dataRepo = dataRepo;

        httpNetwork.getInstance().sendMessage(proto.SubCommand.EnumSubEnterGameReq, {
            userId: this.cfg.userId,
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
            userId: this.cfg.userId,
            gameCode: this.gameCode,
            betSize: this.dataRepo.betAmount,
            betLevel: this.dataRepo.betMutiple,
            baseBet: this.dataRepo.baseBet
        });
    }

    setGameCode(code: string): void {
        this.gameCode = code;
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
            userId: this.cfg.userId
        });
    }

    protected stopRefreshToken() {
        if (this.refreshTokenInterval != null) {
            clearInterval(this.refreshTokenInterval);
            this.refreshTokenInterval = null;
        }
    }
}