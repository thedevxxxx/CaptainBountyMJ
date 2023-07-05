import { IConfig, IDataRepository } from "./Interface";
import { IReceiver, ISender } from "./NetManagerBase";
import evRepo from "../../script/event/pq_EventRepository";
import pqui_ServiceLocator from "../../pqui/scripts/service/pqui_ServiceLocator";
import proto from "../../script/network/proto/PQproto_msg.js";
import mjhl_Event from "../../script/event/pq_Event";
import { IResponse } from "../../script/network/pq_HttpNetwork";

export default class ReceiverBase implements IReceiver {
    protected poorNetworkCount: number;
    protected sender: ISender;
    protected cfg: IConfig;
    protected locator: pqui_ServiceLocator;
    protected dataRepo: IDataRepository;

    constructor(cfg: IConfig, locator: pqui_ServiceLocator, dataRepo: IDataRepository) {
        this.cfg = cfg;
        this.locator = locator;
        this.dataRepo = dataRepo;
    
        this.poorNetworkCount = 0;

        evRepo.getInstance().receiveMessageByCommand.set(proto.SubCommand.EnumSubSpinResp, new mjhl_Event<IResponse, void>());
        evRepo.getInstance().receiveMessageByCommand.set(proto.SubCommand.EnumSubEnterGameResp, new mjhl_Event<IResponse, void>());
        evRepo.getInstance().receiveMessageByCommand.set(proto.SubCommand.EnumSubUserRefreshTokenResp, new mjhl_Event<IResponse, void>());

        evRepo.getInstance().receiveMessageByCommand.get(proto.SubCommand.EnumSubSpinResp).Attach(this.onSpinResp.bind(this));
        evRepo.getInstance().receiveMessageByCommand.get(proto.SubCommand.EnumSubEnterGameResp).Attach(this.onEnterGameResp.bind(this));
        evRepo.getInstance().receiveMessageByCommand.get(proto.SubCommand.EnumSubUserRefreshTokenResp).Attach(this.onUserRefreshTokenResp.bind(this));
    }

    setSender(sender: ISender):void {
        this.sender = sender;
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
            return;
        }
        this.poorNetworkCount = 0;
        const lotteryInfo = data.lotteryInfo;
        if (lotteryInfo == null) {
            console.log("[Receiver] lotteryInfo is null");
            return;
        }
        evRepo.getInstance().onLotteryInfo.Notify(data.lotteryInfo);
        const balance = data.lotteryInfo.balance;
        this.cfg.setPQBalance(balance);
    }

    protected onEnterGameResp(response: proto.IUserEnterGameResp): void {}

    protected onUserRefreshTokenResp(data: proto.IUserRefreshTokenResp): void {
        const resultCode = this.getResultCode(data);
        if (resultCode !== proto.CommandResult.ResultCode.Success) {
            console.error(`[Receiver] resultCode:${resultCode}`);
            return;
        }
        this.cfg.setPQToken(data.pqToken);
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
        evRepo.getInstance().onGrayToast.Notify(`网路繁忙, 正在重试... (第${this.poorNetworkCount}次)`);
    }

    protected showConnectFailPop(): void {
        evRepo.getInstance().onPopup.Notify({
            title: "未能成功交易",
            content: `未能连接到服，请检查您的网路或重试。\n(错误代码: N1000)`,
            popupButtonParameters: [{
                title: "重试",
                onClicked: () => {
                    this.poorNetworkCount = 0;
                    this.sender.onPoorNetwork(this.poorNetworkCount);
                },
            }, {
                title: "退出",
                onClicked: () => {
                    evRepo.getInstance().onQuit.Notify();
                },
            }]
        });
    }

    protected showPointEnoughPop(resultCode: any, serverTime: any): void {
        evRepo.getInstance().onPopup.Notify({
            title: "未能成功交易",
            content: `积分不足， 请尝试切换注额。\n(错误代码: ${proto.SubCommand.EnumSubSpinResp}E${resultCode}T${serverTime})`,
            popupButtonParameters: [{
                title: "确定",
                onClicked: () => {
                    evRepo.getInstance().onResultFinished.Notify({ isFirstFreeGame: false });
                },
            }]
        });
    }

    protected showFailPop(resultCode: any, serverTime: any): void {
        evRepo.getInstance().onPopup.Notify({
            title: "",
            content: `\n(错误代码: ${proto.SubCommand.EnumSubSpinResp}E${resultCode}T${serverTime})`,
            popupButtonParameters: [{
                title: "确定",
                onClicked: () => {
                    evRepo.getInstance().onQuit.Notify();
                },
            }]
        });
    }
}

interface HttpResponse {
    result?: proto.ICommandResult;
}