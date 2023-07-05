import pq_Config from "../config/pq_Config";
import pq_EventRepository from "../event/pq_EventRepository";
import pq_HttpNetwork from "./pq_HttpNetwork";
import proto from "./proto/PQproto_msg.js";

export default class pq_Sender {

    private pq_HttpNetwork: pq_HttpNetwork;

    private pq_EventRepository: pq_EventRepository;

    private pq_Config: pq_Config;

    private refreshTokenInterval: ReturnType<typeof setInterval>;

    public constructor(pq_HttpNetwork: pq_HttpNetwork, pq_Config: pq_Config, pq_EventRepository: pq_EventRepository) {
        this.pq_EventRepository = pq_EventRepository;
        this.pq_HttpNetwork = pq_HttpNetwork;
        this.pq_Config = pq_Config;

        pq_EventRepository.onLoginSucceeded.Attach(() => {
            this.startRefreshToken();
        });

        pq_EventRepository.onExitButtonClick.Attach(() => {
            this.sendLogout();
        });

        pq_EventRepository.onExitLoadingButtonClick.Attach(() => {
            this.sendLogout();
        });

        this.sendLogin();

    }

    public destroy() {
        this.stopRefreshToken();
    }

    private sendLogin() {
        console.log(`[pq_Sender] sendLogin`);
        if (pq_Config.isLogin) {//??
            console.log(`[pq_Sender] already login`);
            this.pq_EventRepository.onLoginSucceeded.Notify({
                pqToken: this.pq_Config.pqItem.pqToken,
                balance: this.pq_Config.pqItem.pqBalance,
            });
            return;
        }
        const token = this.pq_Config.token;
        const password = (token == null) ? this.pq_Config.password : null;
        const loginRequest = {
            userId: this.pq_Config.userId,
            gameId: this.pq_Config.gameId,
            password: password,
            token: token
        };
        this.pq_HttpNetwork.sendMessage(proto.SubCommand.EnumSubLoginReq, loginRequest);
    }

    private sendLogout() {
        console.log(`[pq_Sender] sendLogout`);
        this.pq_HttpNetwork.sendMessage(proto.SubCommand.EnumSubLogoutReq, {
            userId: this.pq_Config.userId,
        });
    }

    private sendRefreshToken() {
        console.log(`[pq_Sender] sendRefreshToken`);
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