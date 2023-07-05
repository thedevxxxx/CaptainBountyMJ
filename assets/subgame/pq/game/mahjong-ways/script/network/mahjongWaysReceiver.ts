import ReceiverBase from "../../../../script/subgame/base/ReceiverBase";
import proto from "../../../../script/network/proto/PQproto_msg.js";
import { NetEventType } from "../../../../script/subgame/base/NetManagerBase";

export default class mahjongWaysReceiver extends ReceiverBase {

    protected onSpinResp(data: proto.IUserSpinResp): void {
        super.onSpinResp(data);
    }

    protected onUserRefreshTokenResp(data: proto.IUserRefreshTokenResp): void {
        super.onUserRefreshTokenResp(data);
    }

    protected onEnterGameResp(response: proto.IUserEnterGameResp): void {
        super.onEnterGameResp(response);

        const resultCode = this.getResultCode(response);
        if (resultCode !== proto.CommandResult.ResultCode.Success) {
            this.showFailPop(resultCode, response.result.serverTime);

            this.evRepo.dispatch(NetEventType.ON_ENTER_GAME, { success: false });
            console.error(`[Receiver] resultCode:${resultCode}`);
            return;
        }
        console.log('Receiver EnumSubEnterGameResp')
        this.evRepo.dispatch(NetEventType.ON_ENTER_GAME, { 
            success: true,
            lastLotteryInfo: response.lastLotteryInfo
        });
        this.sender.startRefreshToken();

    }
}
