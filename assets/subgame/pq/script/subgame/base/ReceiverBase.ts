import { IModel, IReceiver, ISender, NetEventType } from "./NetManagerBase";
import EventRepository from "../../event/pq_EventRepository";
import pq_Event from "../../../script/event/pq_Event";
import proto from "../../network/proto/PQproto_msg.js";
import { IResponse } from "../../network/pq_HttpNetwork";
import { CommonEventManage } from "../../event/CommonEventManage";

export default class ReceiverBase implements IReceiver {
    protected poorNetworkCount: number;
    protected sender: ISender;
    protected model: IModel;
    protected evRepo: CommonEventManage;

    init(sender: ISender, model: IModel, eveRepo: CommonEventManage): void {
        this.sender = sender;
        this.model = model;
        this.evRepo = eveRepo;
    
        this.poorNetworkCount = 0;

        EventRepository.getInstance().receiveMessageByCommand.set(proto.SubCommand.EnumSubSpinResp, new pq_Event<IResponse, void>());
        EventRepository.getInstance().receiveMessageByCommand.set(proto.SubCommand.EnumSubEnterGameResp, new pq_Event<IResponse, void>());
        EventRepository.getInstance().receiveMessageByCommand.set(proto.SubCommand.EnumSubUserRefreshTokenResp, new pq_Event<IResponse, void>());

        EventRepository.getInstance().receiveMessageByCommand.get(proto.SubCommand.EnumSubSpinResp).Attach(this.onSpinResp.bind(this));
        EventRepository.getInstance().receiveMessageByCommand.get(proto.SubCommand.EnumSubEnterGameResp).Attach(this.onEnterGameResp.bind(this));
        EventRepository.getInstance().receiveMessageByCommand.get(proto.SubCommand.EnumSubUserRefreshTokenResp).Attach(this.onUserRefreshTokenResp.bind(this));
    }

    destroy() {}

    protected onSpinResp(data: proto.IUserSpinResp): void {
        const resultCode = this.getResultCode(data);
        if (resultCode !== proto.CommandResult.ResultCode.Success) {
            if ((+resultCode) < 0) {
                this.poorNetworkCount += 1;
                if (this.poorNetworkCount < 6) {
                    this.showRetryToast();
                } else {
                    this.showConnectFailPop();
                }
                this.sender.onPoorNetwork(this.poorNetworkCount);
            } else {
                this.poorNetworkCount = 0;
                this.showPointEnoughPop(resultCode, data.result.serverTime);
                console.log(`[Receiver] resultCode:${resultCode}`);
            }
        } else {
            this.poorNetworkCount = 0;
            const lotteryInfo = data.lotteryInfo;
            if (lotteryInfo == null) {
                console.log("[Receiver] lotteryInfo is null");
            } else {
                const balance = data.lotteryInfo.balance;
                this.model.setPQBalance(balance);
                this.evRepo.dispatch(NetEventType.ON_SPINE_RESP, data.lotteryInfo);
            }
        }
    }

    protected onEnterGameResp(response: proto.IUserEnterGameResp): void {}

    protected onUserRefreshTokenResp(data: proto.IUserRefreshTokenResp): void {
        const resultCode = this.getResultCode(data);
        if (resultCode !== proto.CommandResult.ResultCode.Success) {
            console.error(`[Receiver] resultCode:${resultCode}`);
            return;
        }
        this.model.setPQToken(data.pqToken);
    }

    protected getResultCode(response: HttpResponse): proto.CommandResult.ResultCode {
        if (response == null) {
            console.log(`[Receiver] response is null`);
            return null;
        }
        const result = response.result;
        if (result == null) {
            console.log(`[Receiver] result is null`);
            return null;
        }
        const resultCode = result.resultCode;
        if (resultCode == null) {
            console.log(`[Receiver] result is null`);
            return null;
        }
        return resultCode;
    }

    protected showRetryToast(): void {
        this.evRepo.dispatch(NetEventType.ON_CONNECT_RETRY, this.poorNetworkCount);
    }

    protected showConnectFailPop(): void {
        this.evRepo.dispatch(NetEventType.ON_CONNECT_FAIL, () => {
            this.poorNetworkCount = 0;
            this.sender.onPoorNetwork(this.poorNetworkCount);
        });
    }

    protected showPointEnoughPop(resultCode: any, serverTime: any): void {
        this.evRepo.dispatch(NetEventType.ON_POINT_ENOUGH, {
            resultCode,
            serverTime,
        });
    }

    protected showFailPop(resultCode: any, serverTime: any): void {
        this.evRepo.dispatch(NetEventType.ON_OTHER_FAIL, {
            resultCode,
            serverTime,
        });
    }
}

export interface ErrorParam {
    resultCode,
    serverTime
}

export interface EnterGameParam {
    success: boolean,
    lastLotteryInfo?: proto.ILotteryInfo[],
}

interface HttpResponse {
    result?: proto.ICommandResult;
}