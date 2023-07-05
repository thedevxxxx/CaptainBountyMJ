import pq_EventRepository from "../event/pq_EventRepository";
import proto from "./proto/PQproto_msg.js";

export default class pq_Receiver {

    public constructor(pq_EventRepository: pq_EventRepository) {
        pq_EventRepository.receiveMessageByCommand.get(proto.SubCommand.EnumSubLoginResp).Attach((userLoginResp: proto.IUserLoginResp) => {
            console.log('pq_Receiver userLoginResp',userLoginResp);
            if (userLoginResp.result.resultCode === proto.CommandResult.ResultCode.Success) {
                pq_EventRepository.onLoginSucceeded.Notify({
                    pqToken: userLoginResp.userInfo.pqToken,
                    balance: userLoginResp.userInfo.balance
                });
            }
        });

        pq_EventRepository.receiveMessageByCommand.get(proto.SubCommand.EnumSubUserRefreshTokenResp).Attach((userRefreshTokenResp: proto.IUserRefreshTokenResp) => {
            console.log('pq_Receiver userRefreshTokenResp',userRefreshTokenResp);
            if (userRefreshTokenResp.result.resultCode === proto.CommandResult.ResultCode.Success) {
                pq_EventRepository.onRefreshTokenonSucceeded.Notify(userRefreshTokenResp.pqToken);
            }
        });

        pq_EventRepository.receiveMessageByCommand.get(proto.SubCommand.EnumSubLogoutResp).Attach((userLogoutResp: proto.IUserLogoutResp) => {
            console.log('pq_Receiver userLogoutResp',userLogoutResp);
            if (userLogoutResp.result.resultCode === proto.CommandResult.ResultCode.Success) {
                pq_EventRepository.onLogoutSucceeded.Notify();
            } else {
                pq_EventRepository.onLogoutFailed.Notify();
            }
        });
    }

    public destroy() {

    }
}