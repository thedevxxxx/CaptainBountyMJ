import pqui_ServiceLocator from "../../../../pqui/scripts/service/pqui_ServiceLocator";
import pq_Config from "../../../../script/config/pq_Config";
import pq_EventRepository from "../../../../script/event/pq_EventRepository";
import pq_HttpNetwork from "../../../../script/network/pq_HttpNetwork";
import proto from "../../../../script/network/proto/PQproto_msg.js";

export default class example_Sender {

    private pq_HttpNetwork: pq_HttpNetwork;

    private pqui_ServiceLocator: pqui_ServiceLocator;

    private pq_Config: pq_Config;

    private refreshTokenInterval: ReturnType<typeof setInterval>;

    private gameCode:string = 'example';

    public constructor(pq_HttpNetwork: pq_HttpNetwork, pq_EventRepository: pq_EventRepository, pq_Config: pq_Config, pqui_ServiceLocator: pqui_ServiceLocator) {
        this.pq_HttpNetwork = pq_HttpNetwork;
        this.pq_Config = pq_Config;
        this.pqui_ServiceLocator = pqui_ServiceLocator;

        pq_EventRepository.onPoorNetwork.Attach(async (poorNetworkCount) => {
            if (poorNetworkCount < 6) {
                await this.startSpinOnce(3000);
            }
        });

        // pq_EventRepository.onSpinButtonClicked.Attach(async () => {
        //     await this.startSpinOnce(0);
        // });

        // pq_EventRepository.onAutoSpinOnce.Attach(async () => {
        //     await this.startSpinOnce(0);
        // });

        // pq_EventRepository.onStartFreeGameButtonClicked.Attach(async () => {
        //     await this.startSpinOnce(3000);
        // });

        // pq_EventRepository.onFreeGame.Attach(async (freeGameParameter) => {
        //     if (freeGameParameter.isFirstFreeGame) {
        //         console.log(`[Sender] isFirstFreeGame`);
        //         return;
        //     }
        //     await this.startSpinOnce(1000);
        // });

        pq_EventRepository.onEnterGameSucceeded.Attach(() => {
            this.startRefreshToken();
        });

        pq_HttpNetwork.sendMessage(proto.SubCommand.EnumSubEnterGameReq, {
            userId: pq_Config.userId,
            gameCode: this.gameCode,
        });
    }

    public destroy() {
        this.stopRefreshToken();
    }

    private async startSpinOnce(millisecond: number) {
        // delay millisecond
        this.pq_HttpNetwork.sendMessage(proto.SubCommand.EnumSubSpinReq, {
            userId: this.pq_Config.userId,
            gameCode: this.gameCode,
            betSize: this.pqui_ServiceLocator.betAmount,
            betLevel: this.pqui_ServiceLocator.betMutiple,
            baseBet: this.pqui_ServiceLocator.baseBet
        });
    }

    private sendRefreshToken() {
        this.pq_HttpNetwork.sendMessage(proto.SubCommand.EnumSubUserRefreshTokenReq, {
            userId: this.pq_Config.userId
        });
    }

    private startRefreshToken() {
        this.sendRefreshToken();
        this.refreshTokenInterval = setInterval(() => {
            this.sendRefreshToken();
        }, 600000 * 0.98);
    }

    private stopRefreshToken() {
        if (this.refreshTokenInterval != null) {
            clearInterval(this.refreshTokenInterval);
            this.refreshTokenInterval = null;
        }
    }
}