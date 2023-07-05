import pqui_ServiceLocator from "../../../../pqui/scripts/service/pqui_ServiceLocator";
import mahjongWays_Config from "../config/mahjongWays_Config";
import { convertServerCodeToSymbolName } from "../converter/mahjongWays_Converter";
import mahjongWays_DataRepository from "../data/mahjongWays_DataRepository";
import evRepo from "../../../../script/event/pq_EventRepository";
import { SymbolName } from "../type/mahjongWays_Types";
import proto from "../../../../script/network/proto/PQproto_msg.js";
import ReceiverBase from "../../../../script/base/ReceiverBase";


export default class mahjongWays_Receiver extends ReceiverBase {
    constructor(cfg: mahjongWays_Config, locator: pqui_ServiceLocator, dataRepo: mahjongWays_DataRepository) {
        super(cfg, locator, dataRepo);
    }

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

            evRepo.getInstance().onEnterGameFailed.Notify();
            console.error(`[Receiver] resultCode:${resultCode}`);
            return;
        }
        console.log('Receiver EnumSubEnterGameResp')
        evRepo.getInstance().onEnterGameSucceeded.Notify();
        this.sender.startRefreshToken();

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
        const finalFreeCount = lastLotteryInfo.finalFreeCount;
        const isFreeGame = (lastLotteryInfo.betMoney === 0);
        if (finalFreeCount != null) {
            if (finalFreeCount > 0) {
                const isFirstFreeGame = (lastLotteryInfos.length === 1);
                const param = { 
                    freeGameCount: finalFreeCount,
                    isFirstFreeGame: isFirstFreeGame
                };
                evRepo.getInstance().onFreeGame.Notify(param);
                this.sender.onFreeGame(param);
                evRepo.getInstance().onFreeGameCount.Notify(param);
            }
        }
        const isLastFinalFreeGame = (isFreeGame && finalFreeCount === 0);
        if (isLastFinalFreeGame) {
            evRepo.getInstance().onMultiple.Notify({
                multiple: 1,
                isFreeGame: false,
                isMute: true

            });
        } else {
            evRepo.getInstance().onMultiple.Notify({
                multiple: winMultiplier,
                isFreeGame: isFreeGame,
                isMute: true
            });
        }

        const baseBet = lastLotteryInfo.baseBet;
        const betSize = lastLotteryInfo.betSize;
        const betLevel = lastLotteryInfo.betLevel;
        const betMoney = (baseBet * betSize * betLevel);
        if (betSize > 0) {
            evRepo.getInstance().onBetAmountChangedUI.Notify(betSize);
        }
        if (betLevel > 0) {
            evRepo.getInstance().onBetMutipleChangedUI.Notify(betLevel);
        }
        if (betMoney > 0) {
            evRepo.getInstance().onTotalBetAmountChangedUI.Notify(betMoney);
        }
        if (totalWin > 0) {
            this.locator.setWinMoney(totalWin);
            this.dataRepo.setFreeGameTotalWin(totalWin);
        }
        evRepo.getInstance().onDefaultRoundResult.Notify(this.getDefaultReelSymbolNamesFromAllSymbols(lasetLotteryInfoList.allSymbols));
    }

    private getDefaultReelSymbolNamesFromAllSymbols(allSymbols: Array<proto.OneLotteryInfo.ISymbolList>) {
        return [[
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            convertServerCodeToSymbolName(allSymbols[0].reelSymbols[3].symbolId, allSymbols[0].reelSymbols[3].isGold),
            convertServerCodeToSymbolName(allSymbols[0].reelSymbols[2].symbolId, allSymbols[0].reelSymbols[2].isGold),
            convertServerCodeToSymbolName(allSymbols[0].reelSymbols[1].symbolId, allSymbols[0].reelSymbols[1].isGold),
            convertServerCodeToSymbolName(allSymbols[0].reelSymbols[0].symbolId, allSymbols[0].reelSymbols[0].isGold),
            SymbolName.FiveOfBamboos
        ], [
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            convertServerCodeToSymbolName(allSymbols[1].reelSymbols[3].symbolId, allSymbols[1].reelSymbols[3].isGold),
            convertServerCodeToSymbolName(allSymbols[1].reelSymbols[2].symbolId, allSymbols[1].reelSymbols[2].isGold),
            convertServerCodeToSymbolName(allSymbols[1].reelSymbols[1].symbolId, allSymbols[1].reelSymbols[1].isGold),
            convertServerCodeToSymbolName(allSymbols[1].reelSymbols[0].symbolId, allSymbols[1].reelSymbols[0].isGold),
            SymbolName.RedDragon
        ], [
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            convertServerCodeToSymbolName(allSymbols[2].reelSymbols[3].symbolId, allSymbols[2].reelSymbols[3].isGold),
            convertServerCodeToSymbolName(allSymbols[2].reelSymbols[2].symbolId, allSymbols[2].reelSymbols[2].isGold),
            convertServerCodeToSymbolName(allSymbols[2].reelSymbols[1].symbolId, allSymbols[2].reelSymbols[1].isGold),
            convertServerCodeToSymbolName(allSymbols[2].reelSymbols[0].symbolId, allSymbols[2].reelSymbols[0].isGold),
            SymbolName.RedDragon
        ], [
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.RedDragon,
            convertServerCodeToSymbolName(allSymbols[3].reelSymbols[3].symbolId, allSymbols[3].reelSymbols[3].isGold),
            convertServerCodeToSymbolName(allSymbols[3].reelSymbols[2].symbolId, allSymbols[3].reelSymbols[2].isGold),
            convertServerCodeToSymbolName(allSymbols[3].reelSymbols[1].symbolId, allSymbols[3].reelSymbols[1].isGold),
            convertServerCodeToSymbolName(allSymbols[3].reelSymbols[0].symbolId, allSymbols[3].reelSymbols[0].isGold),
            SymbolName.RedDragon
        ], [
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            convertServerCodeToSymbolName(allSymbols[4].reelSymbols[3].symbolId, allSymbols[4].reelSymbols[3].isGold),
            convertServerCodeToSymbolName(allSymbols[4].reelSymbols[2].symbolId, allSymbols[4].reelSymbols[2].isGold),
            convertServerCodeToSymbolName(allSymbols[4].reelSymbols[1].symbolId, allSymbols[4].reelSymbols[1].isGold),
            convertServerCodeToSymbolName(allSymbols[4].reelSymbols[0].symbolId, allSymbols[4].reelSymbols[0].isGold),
            SymbolName.EightOfCharacters
        ]]
    }
}
