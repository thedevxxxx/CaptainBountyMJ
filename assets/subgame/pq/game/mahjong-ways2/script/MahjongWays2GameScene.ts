
import { _decorator, Component, Color, director } from 'cc';
import { commonEvent, EventType } from '../../../script/event/CommonEventManage';
import { CommonAmountInfo } from '../../../script/subgame/info/CommonAmountInfo';
import { CommonModeInfo } from '../../../script/subgame/info/CommonModeInfo';
import { CommonAmountUI } from '../../../script/subgame/ui/common/CommonAmountUI';
import { CommonAutoUI } from '../../../script/subgame/ui/common/CommonAutoUI';
import { CommonControlUI } from '../../../script/subgame/ui/common/CommonControlUI';
import { CommonHistoryUI } from '../../../script/subgame/ui/common/CommonHistoryUI';
import { CommonMenuUI } from '../../../script/subgame/ui/common/CommonMenuUI';
import { CommonPaytableUI } from '../../../script/subgame/ui/common/CommonPaytableUI';
import { CommonRuleUI } from '../../../script/subgame/ui/common/CommonRuleUI';
import { CommonStartBtn } from '../../../script/subgame/ui/common/CommonStartBtn';
import { mahjongWays2NetManager as netMgr ,mahjongWays2EventType} from './network/mahjongWays2NetManager';
import { NetEventType } from '../../../script/subgame/base/NetManagerBase';
import proto from "../../../script/network/proto/PQproto_msg.js";
import { delay } from "../../../script/subgame/common/BaseTimer";
import CommonAlert from '../../../script/subgame/ui/common/CommonAlert';
import { PopupUIManager } from '../../../script/ui/CommonPopupUIManager';
import CommonToast from '../../../script/subgame/ui/common/CommonToast';
import { SceneBase } from '../../../script/subgame/base/SceneBase';
import { EnterGameParam } from '../../../script/subgame/base/ReceiverBase';
import mahjongWays2Model, { Lottery, ReelResult, SymbolName } from "./network/mahjongWays2Model";
import hqq from "../../../script/hqqhub/pq_Hqq";
import mahjongWays2Receiver from "./network/mahjongWays2Receiver";
import mahjongWays2Sender from "./network/mahjongWays2Sender";
import { mahjongWays2TestData } from './test/mahjongWays2TestData';
import mahjongWays2LotteryInfoConverter from './data/mahjongWays2LotteryInfoConverter';
const { ccclass, property } = _decorator;
 
@ccclass
export class MahjongWays2GameScene extends SceneBase {
    private amountInfo:CommonAmountInfo = new CommonAmountInfo();
    private modeInfo:CommonModeInfo;

    private normalColor:Color;
    private hoverColor:Color;
    private pressedColor:Color;
    private disabledColor:Color;
    private labelColor:Color;
    private isFreeGame: boolean;

    @property(CommonControlUI)
    controlUI:CommonControlUI = null;   //公共控制组件

    @property(CommonAmountUI)
    amountUI:CommonAmountUI = null;     //公共金额组件

    @property(CommonMenuUI)             //公共菜单栏组件
    menuUI:CommonMenuUI = null;

    @property(CommonPaytableUI)         //公共赔付组件
    paytableUI:CommonPaytableUI = null;

    @property(CommonRuleUI)             //公共规则组件
    ruleUI:CommonRuleUI = null;

    @property(CommonAutoUI)             //公共自动组件
    autoUI:CommonAutoUI = null;

    @property(CommonHistoryUI)          //公共历史组件
    histUI:CommonHistoryUI = null;

    @property(CommonStartBtn)           //游戏皮肤开始按钮
    startSkinBtn:CommonStartBtn = null;

    @property(CommonAlert)              //弹出提示
    alert:CommonAlert = null;

    @property(CommonToast)              //toast提示
    toast:CommonToast = null;


    //测试数据
    private demoData() {
        this.amountInfo = new CommonAmountInfo();
        this.amountInfo.balance = 1000;
        this.amountInfo.chip = 0.4;
        this.amountInfo.bonus = 0;
        this.amountInfo.chipArr = [0.4, 0.8, 1.2, 2, 3.6, 4, 5, 6, 12, 25, 50];

        this.modeInfo = new CommonModeInfo();
        this.modeInfo.sound = true;
        this.modeInfo.turbo = false;

        this.normalColor = new Color(220, 130, 100);
        this.hoverColor = new Color(220, 130, 100);
        this.pressedColor = new Color(220, 130, 100);
        this.disabledColor = new Color(220, 130, 100);
        this.labelColor = new Color(230, 230, 230);
    }

    onLoad () {
        netMgr.inst.init(
            new mahjongWays2Receiver(),
            new mahjongWays2Sender(),
            new mahjongWays2Model(new hqq()),
            netMgr.evRepo,
        );
        
        this.menuUI.node.active =
        this.paytableUI.node.active =
        this.ruleUI.node.active =
        this.autoUI.node.active =
        this.histUI.node.active =
        this.alert.node.active =
        this.toast.node.active = true;
        PopupUIManager.initAlert(this.alert);
        PopupUIManager.initToast(this.toast);
        this.demoData();
        this.addEvent();
    }

    start() {
        this.menuUI.node.active =
        this.paytableUI.node.active =
        this.ruleUI.node.active =
        this.autoUI.node.active =
        this.histUI.node.active =
        this.alert.node.active =
        this.toast.node.active = false;
        //需要传入modeinfo
        this.controlUI.updateModeInfo(this.modeInfo);
        this.menuUI.updateModeInfo(this.modeInfo);
        this.autoUI.updateModeInfo(this.modeInfo);
        //传入amountInfo
        this.controlUI.updateAmountInfo(this.amountInfo);
        this.amountUI.updateAmountInfo(this.amountInfo);
        this.autoUI.updateAmountInfo(this.amountInfo);
        //某些公用组件需要初始化个性化皮肤
        this.controlUI.setStartBtn(this.startSkinBtn);
        //赔付表传入图片路径
        this.paytableUI.updateContent(
            ["mahjongWays2/image/paytable/paytable_1/spriteFrame", 
            "mahjongWays2/image/paytable/paytable_2/spriteFrame",
            "mahjongWays2/image/paytable/paytable_3/spriteFrame",
            "mahjongWays2/image/paytable/paytable_4/spriteFrame"])
        //规则表传入图片路径
        this.ruleUI.updateContent(
            ["mahjongWays2/image/rule/rule_1/spriteFrame", 
            "mahjongWays2/image/rule/rule_2/spriteFrame",
            "mahjongWays2/image/rule/rule_3/spriteFrame",
            "mahjongWays2/image/rule/rule_4/spriteFrame",
            "mahjongWays2/image/rule/rule_5/spriteFrame"])
        //更新颜色
        this.amountUI.updateIconColor(this.normalColor);
        this.controlUI.updateBtnColor(this.normalColor, this.hoverColor, this.pressedColor, this.disabledColor);
        this.menuUI.updateBtnColor(this.normalColor, this.hoverColor, this.pressedColor, this.disabledColor);
        this.menuUI.updateLabelColor(this.labelColor);
        this.autoUI.updateIconColor(this.normalColor);
        this.histUI.updateColor(this.normalColor);
        //按钮旋转
        this.controlUI.playSlow();
        this.histUI.setLoadMethod(this.loadHistDemo);
    }

    
    onDestroy() {
        this.removeEvent();
    }

    protected addEvent() {
        commonEvent.register(EventType.CLICK_START, this, this.clickStart.bind(this));
        commonEvent.register(EventType.CLICK_EXIT, this, this.clickExit.bind(this));
        commonEvent.register(EventType.ON_BET_LEVEL_CHANGE, this, this.onBetLevelChagne.bind(this));

        netMgr.evRepo.register(NetEventType.ON_SPINE_RESP, this, this.onSpineResp.bind(this));
        netMgr.evRepo.register(NetEventType.ON_ENTER_GAME, this, this.onEnterGame.bind(this));
        netMgr.evRepo.register(NetEventType.ON_CONNECT_RETRY, this, this.showRetryToast.bind(this));
        netMgr.evRepo.register(NetEventType.ON_CONNECT_FAIL, this, this.showConnectFailPop.bind(this));
        netMgr.evRepo.register(NetEventType.ON_POINT_ENOUGH, this, this.showPointEnoughPop.bind(this));
        netMgr.evRepo.register(NetEventType.ON_OTHER_FAIL, this, this.showFailPop.bind(this));
        netMgr.evRepo.register("onResult", this, this.onResult.bind(this));
        
    }


    protected removeEvent() {
        commonEvent.unregister(EventType.CLICK_START, this);
        commonEvent.unregister(EventType.CLICK_EXIT, this);
        commonEvent.unregister(EventType.ON_BET_LEVEL_CHANGE, this);

        netMgr.evRepo.unregister(NetEventType.ON_SPINE_RESP, this);
        netMgr.evRepo.unregister(NetEventType.ON_ENTER_GAME, this);
        netMgr.evRepo.unregister(NetEventType.ON_CONNECT_RETRY, this);
        netMgr.evRepo.unregister(NetEventType.ON_CONNECT_FAIL, this);
        netMgr.evRepo.unregister(NetEventType.ON_POINT_ENOUGH, this);
        netMgr.evRepo.unregister(NetEventType.ON_OTHER_FAIL, this);
        netMgr.evRepo.unregister("onResult", this);

    }

    private clickStart(data) {
        netMgr.evRepo.dispatch("112");

        //linTestData
        netMgr.inst.model.betAmounts = [0.02, 0.10, 1, 2.5];//投注設置
        netMgr.inst.model.betAmount = 0.02;//投注設置
        netMgr.inst.model.betMutiple = 1;//投注設置
        netMgr.inst.model.baseBet = 20;//投注設置

        console.log("点击开始:")
        console.log("amountInfo:" + JSON.stringify(data.amountInfo))
        console.log("modeInfo:" + JSON.stringify(data.modeInfo))
        let modeInfo = data.modeInfo as CommonModeInfo;
        if (modeInfo.auto == 0) {
            this.controlUI.playFast();   //调用 this.controlUI.playSlow(); 回到慢转状态
        } else {
            netMgr.inst.model.autoCount = this.modeInfo.auto;
            this.controlUI.setAuto(this.modeInfo.auto);
        }

        netMgr.inst.sendSpin();
    }

    /**
     * 滚轮结果回传
     */
    private async onSpineResp(data: proto.ILotteryInfo) {
        console.log('spine 回传结果')
        console.log(data);
        let resData = data as proto.ILotteryInfo;

        if(mahjongWays2TestData.inst.usingTestData){
            resData = mahjongWays2TestData.inst.getTestData();
        }

        console.log(mahjongWays2TestData.inst.getTestData());

        netMgr.evRepo.dispatch("onLotteryInfo", resData);
        mahjongWays2LotteryInfoConverter.onLotteryInfo(resData);
        this.controlUI.playSlow();

        // netMgr.inst.model.autoCount--;
        // if (netMgr.inst.model.autoCount > 0) {
        //     await delay(1000)//先做假的 
        //     this.controlUI.setAuto(netMgr.inst.model.autoCount);
        //     netMgr.inst.sendSpin();
        // } else {
        //     this.controlUI.playSlow();
        // }
    }

    /**
     * 进入游戏
     */
    private onEnterGame(data: EnterGameParam): void {
        console.log('进入游戏');
        console.log(data);

        if (data.success) {
            
            const lastLotteryInfos = data.lastLotteryInfo;
            if (lastLotteryInfos == null) {
                return;
            }
            const lastLotteryInfo = lastLotteryInfos[data.lastLotteryInfo.length - 1];
            if (lastLotteryInfo == null) {
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
                    
                    /**
                     * 进入免费游戏的视觉界面处理
                     */
                }
            }

            netMgr.inst.model.betAmounts = [0.01, 0.03, 0.1, 1, 5];//目前各子游戏写死在前端
            
            const baseBet = lastLotteryInfo.baseBet;
            const betSize = lastLotteryInfo.betSize;
            const betLevel = lastLotteryInfo.betLevel;
            const betMoney = (baseBet * betSize * betLevel);
            if (baseBet > 0) {
                netMgr.inst.model.baseBet = baseBet;
            }

            if (betSize > 0) {
                netMgr.inst.model.betAmount = betSize;
            }
            if (betLevel > 0) {
                netMgr.inst.model.betMutiple = betLevel;
            }
            if (betMoney > 0) {
                netMgr.inst.model.totalBetAmount = betMoney;
            }


            this.amountInfo.balance = netMgr.inst.model.pqItem.pqBalance;
            this.amountInfo.chip = netMgr.inst.model.betAmounts[betLevel];
            this.amountInfo.bonus = 0;
            this.amountInfo.chipArr = netMgr.inst.model.betAmounts;
            this.controlUI.updateAmountInfo(this.amountInfo);
            this.amountUI.updateAmountInfo(this.amountInfo);
            this.autoUI.updateAmountInfo(this.amountInfo);


        }
    }

    private onBetLevelChagne(idx: number): void {
        netMgr.inst.model.betMutiple = idx + 1;
    }


    private onResult = async (lottery: Lottery) => {
        console.log(`onResult`, lottery);
        if (lottery == null) {
            console.log(`[mahjongWays2_ReelRepository] lottery null`);
            return;
        }

        // if(!mahjongWays2TestData.inst.usingTestData) return;
        const roundResults = lottery.roundResults;
        const roundCount = roundResults.length;
        const finalRoundResult = roundResults[roundCount - 1];
        const multiples = lottery.multiplies.slice();
        const wins = lottery.wins;
        const accumulatedWins = lottery.accumulatedWins;
        const balances = lottery.balances;
        const isFirstFreeGame = lottery.isFirstFreeGame;
        const freeGameTotalWin = lottery.freeGameTotalWin;
        const winMultiple = lottery.totalWinMultiple;
        const totalWin = lottery.totalWin;
        const totalWinMultiple = lottery.totalWinMultiple;
        const betAmount = lottery.betAmount;
        const isFreeGame = lottery.isFreeGame;
        const extraFreeCount = lottery.extraFreeCount;
        const freeGames = lottery.freeGames;

        this.isFreeGame = isFreeGame;
        console.log("[mahjongWays2_ReelRepository]" +
            "\nbalances", balances,
            "\naccumulatedWins", accumulatedWins,
            "\nmultiples", multiples,
            "\nisFirstFreeGame", isFirstFreeGame,
            "\nfreeGames", freeGames,
            "\nfreeGameTotalWin", freeGameTotalWin,
            "\ntotalWin", totalWin,
            "\ntotalWinMultiple", totalWinMultiple,
            "\nextraFreeCount", extraFreeCount,
        );
        if (isFreeGame) {
            let data = {
                freeGameCount: freeGames,
                isFirstFreeGame: isFirstFreeGame
            }
            netMgr.evRepo.dispatch("onFreeGameCount", data);
        }

        let accumulatedWinMultiple = 0;
        for (let roundIndex = 0; roundIndex < roundResults.length; roundIndex++) {
            const roundResult = roundResults[roundIndex];
            const reelResults = roundResult.reelResults;
            const nextReelResults = roundResults[roundIndex + 1]?.reelResults;
            const isFirstRound = (roundIndex === 0);
            const hasCombination = reelResults.some(reelResult => reelResult.symbolResults.some(symboleResult => symboleResult.isCombinable));
            if (isFirstRound) {
                netMgr.evRepo.dispatch("onMultiple",{
                    multiple: multiples.shift(),
                    isFreeGame: (isFirstFreeGame) ? false : isFreeGame,
                    isMute: false
                });
                netMgr.evRepo.dispatch("onBalanceChanged",balances.shift());
                await delay(1000)//先做假的 

                // await this.spin(reelResults);
                if (!isFreeGame) {
                    netMgr.evRepo.dispatch("onWinMoney",{ winMoney: 0 });
                }
                netMgr.evRepo.dispatch("onSpinFinished");
            }
            if (hasCombination) {
                // await this.combine(reelResults);
                await delay(2000)//先做假的 

                netMgr.evRepo.dispatch("onBalanceChanged",balances.shift());
                const accumulatedWin = accumulatedWins.shift();
                const win = wins.shift();
                const accumulatedWinMoney = (isFreeGame) ? freeGameTotalWin : accumulatedWin;
                accumulatedWinMultiple = (accumulatedWin / betAmount);
                netMgr.evRepo.dispatch("onAccumulatedWinMoney",accumulatedWinMoney);
                netMgr.evRepo.dispatch("onWinMoney",{ winMoney: win, accumulatedWinMutiple: accumulatedWinMultiple });
                netMgr.evRepo.dispatch("onMultiple",{
                    multiple: multiples.shift(),
                    isFreeGame: (isFirstFreeGame) ? false : isFreeGame,
                    isMute: false
                });
                // await this.flip(reelResults, nextReelResults);
                // await this.shake(reelResults);
                // await this.fall(reelResults);
                await delay(1000)//先做假的 

            } else {
                console.log(`[mahjongWays2_ReelRepository] no combination`);
            }
        }
        const bigWin = lottery.bigWins.bigWin;
        const megaWin = lottery.bigWins.megaWin;
        const superWin = lottery.bigWins.superWin;
        const isGreaterThanQuintuple = (winMultiple >= 5);
        const shouldWinEffect = (winMultiple >= 20);
        const isBigWin = (winMultiple >= 20 && winMultiple < 35);
        const isMegaWin = (winMultiple >= 35 && winMultiple < 50);
        const isSuperWin = (winMultiple >= 50);


        if (shouldWinEffect) {
            await delay(3000)//先做假的 

            // this.mahjongWays2_EventRepository.onWinEffectTweenToNumberStarted");
            // const winEffect = await new mahjongWays2_WinEffect().init({
            //     parent: this.parent,
            //     mahjongWays2_UIFactory: this.mahjongWays2_UIFactory,
            //     mahjongWays2_EventRepository: this.mahjongWays2_EventRepository
            // });
            // if (isBigWin) {
            //     winEffect.bigWin();
            //     await winEffect.tweenToNumber(0, totalWin, 7.2);
            // }
            // if (isMegaWin) {
            //     winEffect.bigWin();
            //     await winEffect.tweenToNumber(0, megaWin, 7.2);
            //     winEffect.megaWin();
            //     await winEffect.tweenToNumber(megaWin, totalWin, 6.7);
            // }
            // if (isSuperWin) {
            //     winEffect.bigWin();
            //     await winEffect.tweenToNumber(0, megaWin, 7.2);
            //     winEffect.megaWin();
            //     await winEffect.tweenToNumber(megaWin, superWin, 6.7);
            //     winEffect.superWin();
            //     await winEffect.tweenToNumber(superWin, totalWin, 6.7);
            // }
            // this.mahjongWays2_EventRepository.onWinEffectTweenToNumberFinished");
            // await delay(5000);
            // winEffect.destroy();
        }

        netMgr.evRepo.dispatch("onTotalWinMoney",{ totalWinMoney: totalWin, accumulatedWinMutiple: accumulatedWinMultiple });

        const hasTotalWinEffect = (roundCount >= 2);
        if (hasTotalWinEffect) {
            await delay(1000);
            if (isGreaterThanQuintuple) {
                await delay(500);
            }
        }

        const finalReelResults = finalRoundResult.reelResults;
        const isWinFreeGame = this.getIsWinFreeGame(finalReelResults);
        if (isWinFreeGame) {
            netMgr.evRepo.dispatch("onWinFreeGame");
            const shouldShowFreeGameTitle = (extraFreeCount > 0 && !isFirstFreeGame);
            if (shouldShowFreeGameTitle) {
                // const freeGameTitle = new mahjongWays2_FreeGameTitle({
                //     parent: this.parent,
                //     mahjongWays2_UIFactory: this.mahjongWays2_UIFactory,
                //     freeGameCount: extraFreeCount,
                //     lifeTimeSeconds: 3
                // });
                netMgr.evRepo.dispatch("onFreeGameCount",{
                    freeGameCount: freeGames,
                    isFirstFreeGame: isFirstFreeGame
                });
                await delay(3000);
            }
        }

        if (freeGames > 0) {
            await delay(1000);
            const param = {
                freeGameCount: freeGames,
                isFirstFreeGame: isFirstFreeGame
            };

            netMgr.evRepo.dispatch("onFreeGame",param);
            // mjhlNetMgr.onFreeGame(param);

            if (isFirstFreeGame) {
                netMgr.evRepo.dispatch("onFreeGameCount",param);
            }
        } else {
            if (isFreeGame) {
                await delay(2000);
                netMgr.evRepo.dispatch("onFreeGameSettle",{ totalWin: lottery.freeGameTotalWin });//??
            }
        }
        netMgr.evRepo.dispatch("onResultFinished",{ isFirstFreeGame: isFirstFreeGame });
        return;

    }


   private getIsWinFreeGame(reelResults: Array<ReelResult>) {
        let scatterCount = 0;
        reelResults.forEach(reelResult => {
            const symbolResults = reelResult.symbolResults;
            for (let index = 0; index < symbolResults.length; index++) {
                const symbolResult = symbolResults[index];
                if (index >= 4 && index <= 7) {
                    if (symbolResult.symbolName === SymbolName.Scatter) {
                        scatterCount++;
                    }
                }
            }
        });
        const getIsWinFreeGame = (scatterCount >= 3);
        return getIsWinFreeGame;
    }
    /**
     * 点击退出弹窗
     */
    private clickExit() {
        let param = {
            title: "退出游戏",
            content: "你确定要退出游戏?",
            buttons: [{
                title: "取消",
            }, {
                title: "退出",
                onClicked: () => this.exit()
            }]};
        PopupUIManager.openAlert(param);
    }

    //加载历史数据demo
    public loadHistDemo(histUI:CommonHistoryUI) {
        console.log("请求服务端历史数据页数：" + histUI.page);
        //此处请求服务器数据


        //此处模拟服务器数据返回
        setTimeout(()=>{
            let dataInfo = {date: "05/27", time: "17:12:05", id:"1999999999999999911", bet:"1.2", profit:"30000"}
            let respList = [dataInfo, dataInfo, dataInfo, dataInfo, dataInfo, dataInfo, dataInfo, dataInfo, dataInfo, dataInfo, dataInfo];
            histUI.node.active && histUI.updateList(respList);
        }, 1000);
    }

    // update (deltaTime: number) {
    // }
}
