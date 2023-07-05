
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
import { mahjongWaysNetManager as netMgr ,mahjongWaysEventType} from './network/mahjongWaysNetManager';
import { NetEventType } from '../../../script/subgame/base/NetManagerBase';
import proto from "../../../script/network/proto/PQproto_msg.js";
import { delay } from "../../../script/subgame/common/BaseTimer";
import CommonAlert from '../../../script/subgame/ui/common/CommonAlert';
import { PopupUIManager } from '../../../script/ui/CommonPopupUIManager';
import CommonToast from '../../../script/subgame/ui/common/CommonToast';
import { SceneBase } from '../../../script/subgame/base/SceneBase';
import { EnterGameParam } from '../../../script/subgame/base/ReceiverBase';
import mahjongWaysModel, { Lottery, ReelResult, SymbolName } from "./network/mahjongWaysModel";
import hqq from "../../../script/hqqhub/pq_Hqq";
import mahjongWaysReceiver from "./network/mahjongWaysReceiver";
import mahjongWaysSender from "./network/mahjongWaysSender";
import { mahjongWaysTestData } from './test/mahjongWaysTestData';
import { mahjongWaysWinEffect } from './ui/effect/mahjongWaysWinEffect';
import { CommonBoxInfo } from '../../../script/subgame/info/CommonBoxInfo';
import { MahjongWaysBox } from './game/MahjongWaysBox';
import { CommonReelInfo } from '../../../script/subgame/info/CommonReelInfo';
import { CommonSymbolInfo } from '../../../script/subgame/info/CommonSymbolInfo';
import { SYMBOL_STATE } from '../../../script/subgame/ui/game/CommonSymbol';
import { model } from './data/MahjongWaysModel';
const { ccclass, property } = _decorator;
 
@ccclass
export class MahjongWaysGameScene extends SceneBase {
    private startBtnClicked:boolean = false; //开始按钮是否点击过
    private winResults =    {
        wins: 0,
        accumulatedWins: 0,
        isFirstFreeGame: false,
        multiplies: 0,
        freeGames: 0,
        balances: 0,
        isFreeGame: 0,
        freeGameTotalWin: 0,
        totalWin: 0,
        totalWinMultiple: 0,
        betAmount: 0,
        extraFreeCount: 0,

        balance: 0,
        totalWinMoney: 0,
        finalFreeCount: 0,
        roundInfo:[],
    }        


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

    @property(MahjongWaysBox)                //卷轴盒子
    box:MahjongWaysBox = null;


    @property(mahjongWaysWinEffect)     //赢钱特效
    winEffect:mahjongWaysWinEffect = null;

    private previousFinalFreeCount: number;
    private origAmountUiPosY:number;
    private origControlUiPosY:number;

    //测试数据
    private demoData() {
        model.amountInfo = new CommonAmountInfo();
        model.amountInfo.balance = 1000;
        model.amountInfo.chip = 0.4;
        model.amountInfo.bonus = 0;
        model.amountInfo.chipArr = [0.4, 0.8, 1.2, 2, 3.6, 4, 5, 6, 12, 25, 50];

        model.modeInfo = new CommonModeInfo();
        model.modeInfo.sound = true;
        model.modeInfo.turbo = false;

        this.normalColor = new Color(220, 130, 100);
        this.hoverColor = new Color(220, 130, 100);
        this.pressedColor = new Color(220, 130, 100);
        this.disabledColor = new Color(220, 130, 100);
        this.labelColor = new Color(230, 230, 230);

        model.boxInfo = new CommonBoxInfo;
        let maxCol = 5; //5列
        let defaultSymbol = [[10, 9, 8, 7], [6, 1, 12, 3], [2, 9, 8, 2], [6, 13, 1, 3], [10, 9, 8, 7]];
        for (var i = 0; i < maxCol; i++) {
            var reelInfo = new CommonReelInfo();
            reelInfo.index = i;
            reelInfo.quantity = 6;  //如需显示4行，这里要定义5行，需要预留一行来做卷轴动画
            for (var j = 0; j < reelInfo.quantity; j++) {
                var symbolInfo = new CommonSymbolInfo();
                if (j > 0 && j < reelInfo.quantity - 1) {
                    symbolInfo.type = defaultSymbol[i][j - 1];
                } else {
                    symbolInfo.type = Math.floor(Math.random() * 2) + 8;
                }
                symbolInfo.index = j;
                reelInfo.symbolArr.push(symbolInfo);
            }
            model.boxInfo.reelArr.push(reelInfo);
        }
    }

    onLoad () {
        netMgr.inst.init(
            new mahjongWaysReceiver(),
            new mahjongWaysSender(),
            new mahjongWaysModel(new hqq()),
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

       this.origAmountUiPosY =this.amountUI.node.y;
       this.origControlUiPosY =this.controlUI.node.y;

        this.menuUI.node.active =
        this.paytableUI.node.active =
        this.ruleUI.node.active =
        this.autoUI.node.active =
        this.histUI.node.active =
        this.alert.node.active =
        this.toast.node.active = false;
        //需要传入modeinfo
        this.controlUI.updateModeInfo(model.modeInfo);
        this.menuUI.updateModeInfo(model.modeInfo);
        this.autoUI.updateModeInfo(model.modeInfo);
        //传入amountInfo
        this.controlUI.updateAmountInfo(model.amountInfo);
        this.amountUI.updateAmountInfo(model.amountInfo);
        this.autoUI.updateAmountInfo(model.amountInfo);
        //某些公用组件需要初始化个性化皮肤
        this.controlUI.setStartBtn(this.startSkinBtn);
        //赔付表传入图片路径
        this.paytableUI.updateContent(
            ["game/mahjong-ways/images/paytable/mjhl_paytable1/spriteFrame", 
            "game/mahjong-ways/images/paytable/mjhl_paytable1/spriteFrame",
            "game/mahjong-ways/images/paytable/mjhl_paytable1/spriteFrame",
            "game/mahjong-ways/images/paytable/mjhl_paytable1/spriteFrame"])
        //规则表传入图片路径
        this.ruleUI.updateContent(
            ["game/mahjong-ways/images/rule/mjhl_rule0/spriteFrame", 
            "game/mahjong-ways/images/rule/mjhl_rule1/spriteFrame",
            "game/mahjong-ways/images/rule/mjhl_rule2/spriteFrame",
            "game/mahjong-ways/images/rule/mjhl_rule3/spriteFrame",
            "game/mahjong-ways/images/rule/mjhl_rule4/spriteFrame",
            "game/mahjong-ways/images/rule/mjhl_rule5/spriteFrame"])
        //更新颜色
        this.amountUI.updateIconColor(this.normalColor);
        this.controlUI.updateBtnColor(this.normalColor, this.hoverColor, this.pressedColor, this.disabledColor);
        this.menuUI.updateBtnColor(this.normalColor, this.hoverColor, this.pressedColor, this.disabledColor);
        this.menuUI.updateLabelColor(this.labelColor);
        this.autoUI.updateIconColor(this.normalColor);
        this.histUI.updateColor(this.normalColor);
        //按钮旋转
        this.controlUI.playSlow();

        //创建卷轴盒子
        this.box.createReels(model.maxReel, model.boxInfo);
        this.box.createReelEffects(model.maxReel, 4);
        this.box.hideGuider();

        this.startBtnClicked = false;
        this.commonUIBasePoseSwitch(true);
    }

    
    onDestroy() {
        this.removeEvent();
    }

    protected addEvent() {
        commonEvent.register(EventType.CLICK_START, this, this.clickStart.bind(this));
        commonEvent.register(EventType.CLICK_EXIT, this, this.clickExit.bind(this));
        commonEvent.register(EventType.ON_BET_LEVEL_CHANGE, this, this.onBetLevelChagne.bind(this));
        commonEvent.register(EventType.CLICK_SYMBOL, this, this.clickSymbol.bind(this));

        netMgr.evRepo.register(NetEventType.ON_SPINE_RESP, this, this.onSpineResp.bind(this));
        netMgr.evRepo.register(NetEventType.ON_ENTER_GAME, this, this.onEnterGame.bind(this));
        netMgr.evRepo.register(NetEventType.ON_CONNECT_RETRY, this, this.showRetryToast.bind(this));
        netMgr.evRepo.register(NetEventType.ON_CONNECT_FAIL, this, this.showConnectFailPop.bind(this));
        netMgr.evRepo.register(NetEventType.ON_POINT_ENOUGH, this, this.showPointEnoughPop.bind(this));
        netMgr.evRepo.register(NetEventType.ON_OTHER_FAIL, this, this.showFailPop.bind(this));
        netMgr.evRepo.register("onFreeGameSettleFinished", this, this.checkAutoMode.bind(this));
        
    }


    protected removeEvent() {
        commonEvent.unregister(EventType.CLICK_START, this);
        commonEvent.unregister(EventType.CLICK_EXIT, this);
        commonEvent.unregister(EventType.ON_BET_LEVEL_CHANGE, this);
        commonEvent.unregister(EventType.CLICK_SYMBOL, this);

        netMgr.evRepo.unregister(NetEventType.ON_SPINE_RESP, this);
        netMgr.evRepo.unregister(NetEventType.ON_ENTER_GAME, this);
        netMgr.evRepo.unregister(NetEventType.ON_CONNECT_RETRY, this);
        netMgr.evRepo.unregister(NetEventType.ON_CONNECT_FAIL, this);
        netMgr.evRepo.unregister(NetEventType.ON_POINT_ENOUGH, this);
        netMgr.evRepo.unregister(NetEventType.ON_OTHER_FAIL, this);
        netMgr.evRepo.unregister("onFreeGameSettleFinished", this);

    }

    private async reset() {
        model.reset();
    }

    private clickStart(data) {
        console.log("clickStart:",data)
        if (this.startBtnClicked && model.modeInfo.auto > 0) {
            model.modeInfo.auto = 0;
            this.controlUI.playFast();
            return;
        } else {
            if(this.startBtnClicked) return;
        }
        this.startBtnClicked = true;
        //linTestData
        // netMgr.inst.model.betAmounts = [0.02, 0.10, 1, 2.5];//投注設置
        // netMgr.inst.model.betAmount = 0.01;//投注設置
        // netMgr.inst.model.betMutiple = 2;//投注設置
        // netMgr.inst.model.baseBet = 20;//投注設置
        netMgr.evRepo.dispatch("onResult");
        netMgr.evRepo.dispatch("onSetMultiplier",{ multiplier:1 , isFreeGame: false });
        commonEvent.dispatch(EventType.UPDATE_BONUS, 0 );

        if(this.winResults.balance){
            commonEvent.dispatch(EventType.UPDATE_BALANCE,this.winResults.balance );
        }

        console.log("点击开始:")
        console.log("amountInfo:" + JSON.stringify(model.amountInfo))
        console.log("modeInfo:" + JSON.stringify(model.modeInfo))


        let modeInfo = data.modeInfo as CommonModeInfo;
        if (modeInfo.auto == 0) {
            this.controlUI.playFast();   //调用 this.controlUI.playSlow(); 回到慢转状态
        } else {
            netMgr.inst.model.autoCount = model.modeInfo.auto;
            this.controlUI.setAuto(model.modeInfo.auto);
        }
        this.onStartSpin(); //开始旋转
    }

    private sendFreesspinStart() {
        netMgr.evRepo.dispatch("onSetMultiplier",{ multiplier:2 , isFreeGame: true });
        netMgr.evRepo.dispatch("onResult");


        this.box.setStateAll(SYMBOL_STATE.NORMAL);
        this.box.spin(0.2, this.onSpinning.bind(this), 5, 80);   //转动多个
        //这里向服务端请求免费游戏开奖数据
        //netMgr.inst.sendFreeSpin();
        //这里测试数据
        // this.onSpineResp(null);
    }

    /**
     * 开始旋转
     */
    private onStartSpin():void {
        this.box.hideGuider();
        this.box.setStateAll(SYMBOL_STATE.NORMAL);
        this.box.spin(0.2, this.onSpinning.bind(this), 5, 80);   //转动多个
    }

    //旋转到一定圈数后请求服务器
    private async onSpinning(currentIndex, totalIndex) {
        console.log("卷轴", currentIndex + "/" + totalIndex +"已完成最大转数")
        if (currentIndex == totalIndex) {
            this.box.setStateAll(SYMBOL_STATE.BLUR);
            await delay(1000);
            //这里向服务端请求开奖数据
            //netMgr.inst.sendSpin();

            //这里测试数据
            this.onSpineResp(null);
        }
    }

    
    //停止转动
    private onStop(currentIndex, totalIndex) {
        console.log("卷轴", currentIndex + "/" + totalIndex +"停止旋转")
        this.box.stopSingle(currentIndex);
        //测试效果
        if (currentIndex == totalIndex) {
            console.log("■■■■■■播放第" + (model.resultIndex + 1) +"次结果■■■■■■")
            this.box.setState(model.results[model.resultIndex], this.onRound.bind(this), model.results[model.resultIndex+1]);
        }
    }

    //停止单个
    private onStopSingle(currentIndex, totalIndex) {
        console.log("卷轴", currentIndex + "/" + totalIndex +"停止单个旋转")
        this.box.stopSingle(currentIndex);
        this.box.stopSingleEffect(model.results[model.resultIndex], currentIndex);

        if (currentIndex < totalIndex) {
            this.box.stopSingleSlow(currentIndex + 1, this.onStopSingle.bind(this), 4, 5, 1);
        } else {
            console.log("单个卷轴全部停止完毕")
            this.scheduleOnce(()=>{
                this.box.setState(model.results[model.resultIndex], this.onRound.bind(this), model.results[model.resultIndex+1]);
            }, 0.5);
        }
    }

    ////播放回合
    private async onRound(current, total) {
        console.log("卷轴", current + "/" + total +"特效播放完成")
        console.log("播放回合",this.winResults)

        const wins = this.winResults.wins;
        const accumulatedWins = this.winResults.accumulatedWins;
        const balances = this.winResults.balances;
        const isFirstFreeGame = this.winResults.isFirstFreeGame;
        const freeGameTotalWin = this.winResults.freeGameTotalWin;
        // const winMultiple = this.winResults.totalWinMultiple;
        const totalWin = this.winResults.totalWin;
        const totalWinMultiple = this.winResults.totalWinMultiple;
        const betAmount = this.winResults.betAmount;
        const isFreeGame = this.winResults.isFreeGame;
        const extraFreeCount = this.winResults.extraFreeCount;
        const freeGames = this.winResults.freeGames;

        if (current == total) {
            if (model.resultIndex < model.results.length - 1) {

                let winMoney = this.winResults.roundInfo[model.resultIndex].winMoney;
                let winMultiple = this.winResults.roundInfo[model.resultIndex].winMultiple;

                let winMultiplier = this.winResults.roundInfo[model.resultIndex+1].winMultiplier;
                if(winMoney > 0){
                    await delay(200);
                    netMgr.evRepo.dispatch("onSetMultiplier",{ multiplier: winMultiplier , isFreeGame: isFreeGame });
                    netMgr.evRepo.dispatch("onWinMoney",{ winMoney: winMoney , accumulatedWinMutiple: winMultiplier });
                    await delay(2000);
                }
                
                const shouldWinEffect = (winMultiple >= 20);
                if (shouldWinEffect) {
                    let dataLocal={
                        totalWin:winMoney,
                        betAmount:betAmount,
                        winMultiple:winMultiple
                    }
                    // netMgr.evRepo.dispatch("onShowWinEffect",dataLocal);
                    // await delay(5000);
                    await this.winEffect.onShowWinEffect(dataLocal);
                }

                model.resultIndex++;
                model.updateResultInfo();
                console.log("■■■■■■播放第" + (model.resultIndex) +"次结果■■■■■■")
                this.box.setState(model.results[model.resultIndex], this.onRound.bind(this), model.results[model.resultIndex+1]);   
            } else {
                console.log("整个掉落流程结束")
                this.box.updateBoxInfo(model.boxInfo);
                this.box.setStateAll(SYMBOL_STATE.NORMAL);
                if(this.winResults.totalWinMoney > 0){
                    console.log("onTotalWinMoney", this.winResults.totalWinMoney)
                    netMgr.evRepo.dispatch("onTotalWinMoney",{ totalWinMoney: this.winResults.totalWinMoney , accumulatedWinMutiple: 1 });
                    commonEvent.dispatch(EventType.UPDATE_BONUS, this.winResults.totalWinMoney );
                    await delay(2000);
                }
                const hasTotalWinEffect = (model.results.length >= 2);
                // const isGreaterThanQuintuple = (winMultiple >= 5);
                if (freeGames > 0) {
                    await delay(1000);


                    if (isFirstFreeGame) {
                        let dataLocal={
                            isShow:true,
                            count : freeGames
                        }
                        netMgr.evRepo.dispatch("onShowFreeSpinTranstion",dataLocal);
                        const fisetParam = {
                            freeGameCount: freeGames,
                            isFirstFreeGame: isFirstFreeGame
                        };
                        netMgr.evRepo.dispatch("onFreeGameCount",fisetParam);
                        await delay(2000);
                        this.commonUIBasePoseSwitch(false);
                        await delay(5000);
                    }else{
                        await delay(1000);
                    }

                    const param = {
                        freeGameCount: freeGames-1,
                        isFirstFreeGame: isFirstFreeGame
                    };
                    netMgr.evRepo.dispatch("onFreeGame",param);
                    netMgr.evRepo.dispatch("onFreeGameCount",param);
                    this.reset();
                    this.sendFreesspinStart();
                } else {
                    if (isFreeGame) {
                        await delay(2000);
                        this.commonUIBasePoseSwitch(true);
                        netMgr.evRepo.dispatch("onShowFreeGameSettlePanel",freeGameTotalWin);
                    }else{
                        this.reset();
                        this.checkAutoMode();
                    }
                }
            }
        }
    }



    /**
     * 滚轮结果回传
     */
    private async onSpineResp(data: proto.ILotteryInfo) {
        console.log('spine 回传结果')
        console.log(data);
        let resData = data as proto.ILotteryInfo;

        mahjongWaysTestData.inst.usingTestData = true;
        mahjongWaysTestData.inst.testDataOption = "baseNFreeGameX10";
        if(mahjongWaysTestData.inst.usingTestData){
            resData = mahjongWaysTestData.inst.getTestData();
        }
        // // netMgr.evRepo.dispatch("onLotteryInfo", resData);
        // // mahjongWaysLotteryInfoConverter.onLotteryInfo(resData);

        model.results = this.convertServerDataToLocal(resData);
        this.winResults = this.serverWinDataToLocalWinData(resData);
        console.log("convertServerDataToLocal", model.results)
        console.log("winResults", this.winResults)

        if (model.modeInfo.auto > 0 && !this.winResults.isFreeGame) {   //不是免费游戏的情况下，自动游戏才会递减次数
            model.modeInfo.auto--;
            netMgr.inst.model.autoCount = model.modeInfo.auto;
            this.controlUI.setAuto(model.modeInfo.auto);
        }
        model.resultIndex = 0;
        model.updateResultInfo();
        this.box.updateBoxInfo(model.boxInfo);
        // console.log("胡字数量", model.huNum)
        if (model.huNum < 2) {
            //没有匹配到胡
            if (!model.modeInfo.turbo) {
                this.box.stop(0.2, this.onStop.bind(this)); //停止多个
            } else {
                this.box.stop(0, this.onStop.bind(this)); //停止多个
            }
        } else {
            //匹配到胡
            console.log("胡所在列", model.huReelIndexArr)
            
            if (!model.modeInfo.turbo) {
                for (let i = 0; i < model.maxReel; i++) {
                    if (model.huReelIndexArr.length <= 2) { //多个胡都在某一列的情况下
                        if (i <= model.huReelIndexArr[0]) {
                            this.box.stopSingle(Number(i), this.onStopSingle.bind(this));
                        }
                    } else {
                        if (i <= model.huReelIndexArr[1]) { //取第二个索引  小于等于此索引的都全部停止
                            this.box.stopSingle(Number(i), this.onStopSingle.bind(this));   //停止单个
                        }
                    }
                }
            } else {
                this.box.stop(0, this.onStop.bind(this)); //停止多个
            }
        }
    }

    /**
     * 检查是否有自动模式，并继续执行自动模式
     */
    private checkAutoMode() {
        console.log(`检查自动模式${model.modeInfo.auto}`)
        if (model.modeInfo.auto > 0) {
            //继续执行自动模式
            this.onStartSpin();
        } else {
            this.controlUI.playSlow();
            this.startBtnClicked = false;
        }
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
            let betLevel = lastLotteryInfo.betLevel;            
            betLevel = 2; //暂时写死

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


            model.amountInfo.balance = netMgr.inst.model.pqItem.pqBalance;
            model.amountInfo.chip = netMgr.inst.model.betAmounts[betLevel];
            model.amountInfo.bonus = 0;
            model.amountInfo.chipArr = netMgr.inst.model.betAmounts;
            this.controlUI.updateAmountInfo(model.amountInfo);
            this.amountUI.updateAmountInfo(model.amountInfo);
            this.autoUI.updateAmountInfo(model.amountInfo);


        }
    }

    private onBetLevelChagne(idx: number): void {
        netMgr.inst.model.betMutiple = idx + 1;
    }

    commonUIBasePoseSwitch(base:boolean){
        if(base){
            this.amountUI.node.y = this.origAmountUiPosY;
            this.controlUI.node.y = this.origControlUiPosY;
        }else{
            this.amountUI.node.y = this.origAmountUiPosY-200;
            this.controlUI.node.y = this.origControlUiPosY-400;
        }
    }

    /**
     * 点击符号
     * @param data 
     */
    private clickSymbol(data:any) {
        if (!this.startBtnClicked && model.modeInfo.auto == 0) {
            this.box.showGuider(data);
        }
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
        // console.log("请求服务端历史数据页数：" + histUI.page);
        //此处请求服务器数据


        //此处模拟服务器数据返回
        // setTimeout(()=>{
        //     let dataInfo = {date: "05/27", time: "17:12:05", id:"1999999999999999911", bet:"1.2", profit:"30000"}
        //     let respList = [dataInfo, dataInfo, dataInfo, dataInfo, dataInfo, dataInfo, dataInfo, dataInfo, dataInfo, dataInfo, dataInfo];
        //     histUI.node.active && histUI.updateList(respList);
        // }, 1000);
    }

    convertServerDataToLocal(lotteryInfo: proto.ILotteryInfo):any[]{
        let localAllData =[];
        let lotteryInfoList = lotteryInfo.lotteryInfoList;
        for(let i = 0; i < lotteryInfoList.length; i++){
            let singleAllSymbols = lotteryInfoList[i].allSymbols;
            let localData = [];
            for(let j = 0; j < singleAllSymbols.length; j++){
                let singleReelSymbol = singleAllSymbols[j].reelSymbols;
                let singleRellResult ={
                    reel: 0,
                    symbol:[]
                }
                for(let k = 0; k < singleReelSymbol.length; k++){
                    let symbol = this.convertServerCodeToSymbolName(singleReelSymbol[k].symbolId,singleReelSymbol[k].isGold);
                    let state = singleReelSymbol[k].isLucky? SYMBOL_STATE.BINGO:SYMBOL_STATE.NORMAL;
                    let symbolInfo = {
                        index: k,
                        type: symbol,
                        state: state
                    }
                    
                    singleRellResult.symbol.push(symbolInfo);
                }
                singleRellResult.reel = j;
                localData.push(singleRellResult);
            }
            localAllData.push(localData);
        }
        console.log("localAllData",localAllData);
        return localAllData;
    }

    convertServerCodeToSymbolName(code: number, isGold: boolean): SymbolName {
        const symbolNameBySeverCode = [
            null,
            SymbolName.Wild,
            SymbolName.Scatter,
            isGold ? SymbolName.GoldenGreenDragon : SymbolName.GreenDragon,
            isGold ? SymbolName.GoldenRedDragon : SymbolName.RedDragon,
            isGold ? SymbolName.GoldenWhiteDragon : SymbolName.WhiteDragon,
            isGold ? SymbolName.GoldenEightOfCharacters : SymbolName.EightOfCharacters,
            isGold ? SymbolName.GoldenFiveOfDots : SymbolName.FiveOfDots,
            isGold ? SymbolName.GoldenFiveOfBamboos : SymbolName.FiveOfBamboos,
            isGold ? SymbolName.GoldenTwoOfDots : SymbolName.TwoOfDots,
            isGold ? SymbolName.GoldenTwoOfBamboos : SymbolName.TwoOfBamboos,
        ];
        return symbolNameBySeverCode[code];
    }

    serverWinDataToLocalWinData(lotteryInfo: proto.ILotteryInfo):any{

        const lotterys: Array<proto.IOneLotteryInfo> = JSON.parse(JSON.stringify(lotteryInfo.lotteryInfoList));//??

        const betMoney = lotteryInfo.betMoney ?? 0;
        const finalFreeCount = lotteryInfo.finalFreeCount;
        const extraFreeCount = this.getExtraFreeCount(finalFreeCount);
        this.previousFinalFreeCount = finalFreeCount;
        const freeCount = Math.max(...lotterys.map(lottery => lottery.getFreeCount ?? 0));
        const isFirstFreeGame = ((finalFreeCount > 0) && (finalFreeCount === freeCount) && (betMoney > 0));
        const winMoneyList = lotterys.map(lottery => lottery.winMoney).slice().filter(Number);
        const accumulatedWins = winMoneyList.slice();
        for (let winMoneyIndex = 0; winMoneyIndex < winMoneyList.length; winMoneyIndex++) {
            for (let previousIndex = 0; previousIndex < winMoneyIndex; previousIndex++) {
                accumulatedWins[winMoneyIndex] += winMoneyList[previousIndex];
            }
        }
        const isFreeGame = (betMoney === 0);
        const origianlBalance = lotteryInfo.balance - lotteryInfo.offsetToPlayer - betMoney;
        const balances = new Array<number>();
        balances.push(origianlBalance);
        for (let index = 0; index < accumulatedWins.length; index++) {
            const win = accumulatedWins[index];
            balances.push(origianlBalance + win);
        }
        const multiplies = lotterys.map(lottery => lottery.winMultiplier);

        if (isFirstFreeGame) {
            netMgr.inst.model.freeGameTotalWin = 0;
        }
        if (isFreeGame) {
            const currentRoundTotalWin = (accumulatedWins.length) > 0 ? (accumulatedWins[accumulatedWins.length - 1]) : 0;
            if (currentRoundTotalWin > 0) {
                const freeGameTotalWin = (netMgr.inst.model.freeGameTotalWin + currentRoundTotalWin);
                netMgr.inst.model.freeGameTotalWin = freeGameTotalWin;
            }
        }

        const baseBet = lotteryInfo.baseBet;
        const betLevel = lotteryInfo.betLevel;
        const betSize = lotteryInfo.betSize;
        const totalWin = winMoneyList.reduce((sum, current) => sum + current, 0);
        const betAmount = (baseBet * betLevel * betSize);
        const totalWinMultiple = totalWin / betAmount;
        // const bigWin = betAmount * 20;
        // const megaWin = betAmount * 35;
        // const superWin = betAmount * 50;
        const freeGameTotalWin = netMgr.inst.model.freeGameTotalWin;
        let localAllWinData ={
            wins: winMoneyList.slice(),
            accumulatedWins: accumulatedWins,
            isFirstFreeGame: isFirstFreeGame,
            multiplies: multiplies,
            freeGames: finalFreeCount,
            balances: balances,
            isFreeGame: isFreeGame,
            freeGameTotalWin: freeGameTotalWin,
            totalWin: totalWin,
            totalWinMultiple: totalWinMultiple,
            // bigWins: {
            //     bigWin: bigWin,
            //     megaWin: megaWin,
            //     superWin: superWin
            // },
            betAmount: betAmount,
            extraFreeCount: extraFreeCount,

            balance: 0,
            totalWinMoney: 0,
            finalFreeCount: 0,
            roundInfo:[],
        };

        let lotteryInfoList = lotteryInfo.lotteryInfoList;
        
        for(let i = 0; i < lotteryInfoList.length; i++){
                const winMultiple = lotteryInfoList[i].winMoney / betAmount;

                // totalWin += lotteryInfoList[i].winMoney? lotteryInfoList[i].winMoney:0;
                let singleRoundInfo = {
                    winMoney: lotteryInfoList[i].winMoney? lotteryInfoList[i].winMoney:0,
                    winMultiplier: lotteryInfoList[i].winMultiplier? lotteryInfoList[i].winMultiplier:0,
                    getFreeCount: lotteryInfoList[i].getFreeCount? lotteryInfoList[i].getFreeCount:0,
                    isFree: lotteryInfoList[i].isFree? lotteryInfoList[i].isFree:false,
                    balance: lotteryInfoList[i].balance? lotteryInfoList[i].balance:0,
                    winMultiple: winMultiple,
                }
                localAllWinData.roundInfo.push(singleRoundInfo);
            }

        
        localAllWinData.balance = lotteryInfo.balance;
        localAllWinData.totalWinMoney = totalWin;
        localAllWinData.finalFreeCount = lotteryInfo.finalFreeCount;
        console.log("localAllWinData",localAllWinData);
        return localAllWinData;
    }

    getExtraFreeCount(finalFreeCount: number): number {
        if (finalFreeCount == null) {
            return null;
        }
        if (this.previousFinalFreeCount == null) {
            return null;
        }
        return finalFreeCount - this.previousFinalFreeCount;
    }


}


