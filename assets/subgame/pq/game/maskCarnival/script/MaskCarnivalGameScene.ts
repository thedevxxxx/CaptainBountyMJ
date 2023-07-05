
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
import { maskCarnivalNetManager as netMgr } from './network/maskCarnivalNetManager';
import { NetEventType } from '../../../script/subgame/base/NetManagerBase';
import proto from "../../../script/network/proto/PQproto_msg.js";
import { delay } from "../../../script/subgame/common/BaseTimer";
import CommonAlert from '../../../script/subgame/ui/common/CommonAlert';
import { PopupUIManager } from '../../../script/ui/CommonPopupUIManager';
import CommonToast from '../../../script/subgame/ui/common/CommonToast';
import { SceneBase } from '../../../script/subgame/base/SceneBase';
import { EnterGameParam } from '../../../script/subgame/base/ReceiverBase';
import maskCarnivalModel from "./network/maskCarnivalModel";
import hqq from "../../../script/hqqhub/pq_Hqq";
import maskCarnivalReceiver from "./network/maskCarnivalReceiver";
import maskCarnivalSender from "./network/maskCarnivalSender";
import { CommonBoxInfo } from '../../../script/subgame/info/CommonBoxInfo';
import { CommonReelInfo } from '../../../script/subgame/info/CommonReelInfo';
import { CommonSymbolInfo } from '../../../script/subgame/info/CommonSymbolInfo';
import { CommonBox } from '../../../script/subgame/ui/game/CommonBox';
import { SYMBOL_STATE } from '../../../script/subgame/ui/game/CommonSymbol';
import { MaskCarnivalBox } from './game/MaskCarnivalBox';
const { ccclass, property } = _decorator;
 
@ccclass
export class MaskCarnivalGameScene extends SceneBase {
    private amountInfo:CommonAmountInfo = new CommonAmountInfo();
    private modeInfo:CommonModeInfo;
    private boxInfo:CommonBoxInfo;

    private normalColor:Color;
    private hoverColor:Color;
    private pressedColor:Color;
    private disabledColor:Color;
    private labelColor:Color;

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

    @property(MaskCarnivalBox)                //卷轴盒子
    box:MaskCarnivalBox = null;


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

        this.boxInfo = new CommonBoxInfo;
        let maxCol = 5; //5列
        for (var i = 0; i < maxCol; i++) {
            var reelInfo = new CommonReelInfo();
            reelInfo.index = i;
            reelInfo.quantity = 5;  //如需显示4行，这里要定义5行，需要预留一行来做卷轴动画
            for (var j = 0; j < reelInfo.quantity; j++) {
                var symbolInfo = new CommonSymbolInfo();
                symbolInfo.type = Math.floor(Math.random() * 2);
                symbolInfo.index = j;
                reelInfo.symbolArr.push(symbolInfo);
            }
            this.boxInfo.reelArr.push(reelInfo);
        }
    }

    onLoad () {
        netMgr.inst.init(
            new maskCarnivalReceiver(),
            new maskCarnivalSender(),
            new maskCarnivalModel(new hqq()),
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
            ["game/maskCarnival/image/paytable/paytable_1/spriteFrame", 
            "game/maskCarnival/image/paytable/paytable_2/spriteFrame",
            "game/maskCarnival/image/paytable/paytable_3/spriteFrame",
            "game/maskCarnival/image/paytable/paytable_4/spriteFrame"])
        //规则表传入图片路径
        this.ruleUI.updateContent(
            ["game/maskCarnival/image/rule/rule_1/spriteFrame", 
            "game/maskCarnival/image/rule/rule_2/spriteFrame",
            "game/maskCarnival/image/rule/rule_3/spriteFrame",
            "game/maskCarnival/image/rule/rule_4/spriteFrame",
            "game/maskCarnival/image/rule/rule_5/spriteFrame"])
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
        //创建卷轴盒子
        this.box.createReels(5, this.boxInfo);
        this.box.createReelEffects(5, 4);
        // this.box.updateBoxInfo(this.boxInfo);    //后续需要更新的时候调用
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
    }

    private clickStart(data) {
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
        this.box.setStateAll(SYMBOL_STATE.NORMAL);
        this.box.spin(0.2, this.testDataResp.bind(this));   //转动多个
        // this.box.spinSingle(3, this.testDataResp.bind(this));  //转动单个
        // 以下先屏蔽方便测试
        // netMgr.inst.sendSpin();
    }

    //测试用，数据返回后回调
    private testDataResp(currentIndex, totalIndex) {
        console.log("卷轴", currentIndex + "/" + totalIndex +"已完成最大转数")
        if (currentIndex == totalIndex) {
            //这里向服务端请求开奖数据
            //getServerData
            this.box.stop(0.2, this.playSymbol.bind(this)); //停止多个
        }
        // this.box.stopSingle(currentIndex, this.testEffect.bind(this));  //停止单个
    }

    //播放符号特效
    private playSymbol(currentIndex, totalIndex) {
        console.log("卷轴", currentIndex + "/" + totalIndex +"停止旋转")
        //测试效果
        if (currentIndex == totalIndex) {
            this.box.setStateAll(SYMBOL_STATE.MASK);
            let param = [
                {reel: 0, symbol: [{index: 0, state: SYMBOL_STATE.BINGO}, {index: 1, state: SYMBOL_STATE.BINGO}]},
                {reel: 1, symbol: [{index: 2, state: SYMBOL_STATE.BINGO}, {index: 3, state: SYMBOL_STATE.BINGO}]},
                {reel: 2, symbol: [{index: 1, state: SYMBOL_STATE.BINGO}, {index: 2, state: SYMBOL_STATE.BINGO}]},
            ];
            this.box.setState(0.1, param, this.playSymbolComplete.bind(this));
        }
    }

    //播放符号特效回调
    private playSymbolComplete(currentIndex, totalIndex) {
        console.log("卷轴", currentIndex + "/" + totalIndex +"特效播放完成")
        if (currentIndex == totalIndex) {
            //播放此轮得奖特效
        }
    }

    /**
     * 滚轮结果回传
     */
    private async onSpineResp(data: proto.ILotteryInfo) {
        console.log('spine 回传结果')
        console.log(data);

        netMgr.inst.model.autoCount--;
        if (netMgr.inst.model.autoCount > 0) {
            await delay(1000)//先做假的, 实际要配合滚轮滚完再发送spine指令
            this.controlUI.setAuto(netMgr.inst.model.autoCount);
            netMgr.inst.sendSpin();
        } else {
            this.controlUI.playSlow();
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
