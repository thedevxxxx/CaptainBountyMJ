import pq_Config from "../../../../script/config/pq_Config";
import pq_Event from "../../../../script/event/pq_Event";
import pq_EventRepository from "../../../../script/event/pq_EventRepository";
import { IResponse } from "../../../../script/network/pq_HttpNetwork";
import proto from "../../../../script/network/proto/PQproto_msg.js";

export default class example_Receiver {

    private poorNetworkCount: number;

    public constructor(pq_EventRepository: pq_EventRepository, pq_Config: pq_Config) {
    
        this.poorNetworkCount = 0;

        // new pq_Event Map
        pq_EventRepository.receiveMessageByCommand.set(proto.SubCommand.EnumSubSpinResp, new pq_Event<IResponse, void>());

        pq_EventRepository.receiveMessageByCommand.set(proto.SubCommand.EnumSubEnterGameResp, new pq_Event<IResponse, void>());

        pq_EventRepository.receiveMessageByCommand.set(proto.SubCommand.EnumSubUserRefreshTokenResp, new pq_Event<IResponse, void>());

        // get and attach event
        pq_EventRepository.receiveMessageByCommand.get(proto.SubCommand.EnumSubSpinResp).Attach((response: proto.IUserSpinResp) => {
            const resultCode = this.getResultCode(response);
            if (resultCode !== proto.CommandResult.ResultCode.Success) {
                if ((+resultCode) < 0) {
                    this.poorNetworkCount += 1;
                    if (this.poorNetworkCount < 6) {
                        pq_EventRepository.onGrayToast.Notify(`网路繁忙, 正在重试... (第${this.poorNetworkCount}次)`);
                    } else {
                        pq_EventRepository.onPopup.Notify({
                            title: "未能成功交易",
                            content: `未能连接到服，请检查您的网路或重试。\n(错误代码: N1000)`,
                            popupButtonParameters: [{
                                title: "重试",
                                onClicked: () => {
                                    this.poorNetworkCount = 0;
                                    pq_EventRepository.onPoorNetwork.Notify(this.poorNetworkCount);
                                },
                            }, {
                                title: "退出",
                                onClicked: () => {
                                    pq_EventRepository.onQuit.Notify();
                                },
                            }]
                        });
                    }
                    pq_EventRepository.onPoorNetwork.Notify(this.poorNetworkCount);
                } else {
                    this.poorNetworkCount = 0;
                    pq_EventRepository.onPopup.Notify({
                        title: "未能成功交易",
                        content: `积分不足， 请尝试切换注额。\n(错误代码: ${proto.SubCommand.EnumSubSpinResp}E${resultCode}T${response.result.serverTime})`,
                        popupButtonParameters: [{
                            title: "确定",
                            onClicked: () => {
                                pq_EventRepository.onResultFinished.Notify({ isFirstFreeGame: false });
                            },
                        }]
                    });
                    console.log(`[Receiver] resultCode:${resultCode}`);
                }
                return;
            }
            this.poorNetworkCount = 0;
            const lotteryInfo = response.lotteryInfo;
            if (lotteryInfo == null) {
                console.log("lotteryInfo is null");
                return;
            }

            // 1. Edit EnumSubSpinResp - lotteryInfo
            pq_EventRepository.onLotteryInfo.Notify(response.lotteryInfo);
            const balance = response.lotteryInfo.balance;
        });

        pq_EventRepository.receiveMessageByCommand.get(proto.SubCommand.EnumSubEnterGameResp).Attach((response: proto.IUserEnterGameResp) => {
            const resultCode = this.getResultCode(response);
            if (resultCode !== proto.CommandResult.ResultCode.Success) {
                pq_EventRepository.onPopup.Notify({
                    title: "",
                    content: `\n(错误代码: ${proto.SubCommand.EnumSubSpinResp}E${resultCode}T${response.result.serverTime})`,
                    popupButtonParameters: [{
                        title: "确定",
                        onClicked: () => {
                            pq_EventRepository.onQuit.Notify();
                        },
                    }]
                });

                pq_EventRepository.onEnterGameFailed.Notify();
                console.error(`[Receiver] resultCode:${resultCode}`);
                return;
            }
            console.log('Receiver EnumSubEnterGameResp')
            pq_EventRepository.onEnterGameSucceeded.Notify();

            // 2. Edit EnumSubEnterGameResp - lastLotteryInfo
            const lastLotteryInfos = response.lastLotteryInfo;
            if (lastLotteryInfos == null) {
                console.log("[Receiver] lastLotteryInfos is null");
                return;
            }
            const lastLotteryInfo = lastLotteryInfos[response.lastLotteryInfo.length - 1];
            if (lastLotteryInfo == null) {
                console.log("[Receiver] lastLotteryInfo is null");
                return;
            }
            const lasetLotteryInfoList = lastLotteryInfo.lotteryInfoList[lastLotteryInfo.lotteryInfoList.length - 1];
            const winMultiplier = lasetLotteryInfoList.winMultiplier;
            let totalWin = 0;
            lastLotteryInfos.forEach(lastLotteryInfo => {
                lastLotteryInfo.lotteryInfoList.forEach(lotteryInfo => {
                    const winMoney = lotteryInfo.winMoney;
                    if (winMoney != null && winMoney > 0) {
                        totalWin += winMoney;
                    }
                });
            });
            // 3. Edit EnumSubEnterGameResp - finalFreeCount
            const finalFreeCount = lastLotteryInfo.finalFreeCount;
            const isFreeGame = (lastLotteryInfo.betMoney === 0);
            if (finalFreeCount != null) {
                const betMoney = lastLotteryInfo.betMoney;
                if (finalFreeCount > 0) {
                    const isFirstFreeGame = (lastLotteryInfos.length === 1);
                    pq_EventRepository.onFreeGame.Notify({ freeGameCount: finalFreeCount, isFirstFreeGame: isFirstFreeGame });
                    pq_EventRepository.onFreeGameCount.Notify({ freeGameCount: finalFreeCount, isFirstFreeGame: isFirstFreeGame });
                }
            }
            const isLastFinalFreeGame = (isFreeGame && finalFreeCount === 0);
            if (isLastFinalFreeGame) {
                pq_EventRepository.onMultiple.Notify({
                    multiple: 1,
                    isFreeGame: false,
                    isMute: true

                });
            } else {
                pq_EventRepository.onMultiple.Notify({
                    multiple: winMultiplier,
                    isFreeGame: isFreeGame,
                    isMute: true
                });
            }
            // 4. Edit EnumSubEnterGameResp - allSymbols #符号(需解析)
            lasetLotteryInfoList.allSymbols
        });

        // update PQ token
        pq_EventRepository.receiveMessageByCommand.get(proto.SubCommand.EnumSubUserRefreshTokenResp).Attach((userRefreshTokenResp: proto.IUserRefreshTokenResp) => {
            const resultCode = this.getResultCode(userRefreshTokenResp);
            if (resultCode !== proto.CommandResult.ResultCode.Success) {
                console.error(`[Receiver] resultCode:${resultCode}`);
                return;
            }
            pq_Config.setPQToken(userRefreshTokenResp.pqToken);
        });
    }

    public destroy() {

    }

    private getResultCode(response: Response): proto.CommandResult.ResultCode {
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
}

interface Response {
    result?: proto.ICommandResult;
}