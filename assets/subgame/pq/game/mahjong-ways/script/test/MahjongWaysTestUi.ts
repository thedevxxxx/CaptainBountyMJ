
import { _decorator, Component, Node } from 'cc';
import { mahjongWaysTestData } from '../test/mahjongWaysTestData';
import { Toggle } from 'cc';
import { mahjongWays_Multiplier } from '../ui/multiplier/mahjongWays_Multiplier';
import  mahjongWays_MarqueeComponent  from '../ui/marquee/mahjongWays_MarqueeComponent';
import { mahjongWaysNetManager as netMgr ,mahjongWaysEventType} from '../network/mahjongWaysNetManager';

const { ccclass, property } = _decorator;

@ccclass('MahjongWaysTestUi')
export class MahjongWaysTestUi extends Component {

    @property(Node)           
    UiNode:Node = null;

    @property(Node)     
    normalBaseGameButtom:Node = null;

    @property(Node)     
    freeGameX10Buttom:Node = null;

    @property(Node)     
    mahjongWays_MultiplierNode:Node = null;
    
    @property(Node)     
    mahjongWays_MarqueeComponentNode:Node = null;


    onLoad () {
        this.addEvent();
    }

    addEvent(){
        netMgr.evRepo.register("onFreeGame", this, this.onFreeGame.bind(this));
        netMgr.evRepo.register("onMultiple", this, this.onMultiple.bind(this));
        netMgr.evRepo.register("onBalanceChanged", this, this.onBalanceChanged.bind(this));
        netMgr.evRepo.register("onWinMoney", this, this.onWinMoney.bind(this));
        netMgr.evRepo.register("onSpinFinished", this, this.onSpinFinished.bind(this));
        netMgr.evRepo.register("onAccumulatedWinMoney", this, this.onAccumulatedWinMoney.bind(this));
        netMgr.evRepo.register("onTotalWinMoney", this, this.onTotalWinMoney.bind(this));
        netMgr.evRepo.register("onWinFreeGame", this, this.onWinFreeGame.bind(this));
        netMgr.evRepo.register("onFreeGameCount", this, this.onFreeGameCount.bind(this));
        netMgr.evRepo.register("onFreeGameSettle", this, this.onFreeGameSettle.bind(this));
        netMgr.evRepo.register("onResultFinished", this, this.onResultFinished.bind(this));
    }

    start () {
        // if(!hqq.isDebug) this.node.active = false; 
        this.normalBaseGameButtom.getComponent(Toggle).isChecked = false;
        this.freeGameX10Buttom.getComponent(Toggle).isChecked = false;
    }

    onDestroy() {
        this.removeEvent();
    } 

    removeEvent(){
        netMgr.evRepo.unregister("onReelEffect", this);
        netMgr.evRepo.unregister("onMultiple", this);
        netMgr.evRepo.unregister("onBalanceChanged", this);
        netMgr.evRepo.unregister("onWinMoney", this);
        netMgr.evRepo.unregister("onSpinFinished", this);
        netMgr.evRepo.unregister("onAccumulatedWinMoney", this);
        netMgr.evRepo.unregister("onTotalWinMoney", this);
        netMgr.evRepo.unregister("onWinFreeGame", this);
        netMgr.evRepo.unregister("onFreeGameCount", this);
        netMgr.evRepo.unregister("onFreeGameSettle", this);
        netMgr.evRepo.unregister("onResultFinished", this);
    }

    onFreeGame(data){
        console.log("onFreeGame",data);
    }

    onMultiple(data){
        console.log("onMultiple",data);
    }

    onBalanceChanged(data){
        console.log("onBalanceChanged",data);
    }

    onWinMoney(data){
        console.log("onWinMoney",data);
    }

    onSpinFinished(data){
        console.log("onSpinFinished",data);
    }

    onAccumulatedWinMoney(data){
        console.log("onAccumulatedWinMoney",data);
    }

    onTotalWinMoney(data){
        console.log("onTotalWinMoney",data);
    }
    
    onWinFreeGame(data){
        console.log("onWinFreeGame",data);
    }

    onFreeGameCount(data){
        console.log("onFreeGameCount",data);
    }

    onFreeGameSettle(data){
        console.log("onFreeGameSettle",data);
    }

    onResultFinished(data){
        console.log("onResultFinished",data);
    }

    display(){
        if(!hqq.isDebug) return;
        let active = this.UiNode.active
        this.UiNode.active = !active;

        this.normalBaseGameButtom.getComponent(Toggle).isChecked = false;
        this.freeGameX10Buttom.getComponent(Toggle).isChecked = false;
    }

    checkBtn(data){
        mahjongWaysTestData.inst.usingTestData = false;
        console.log("checkBtn",data);
        console.log("checkBtn",data.checkEvents[0].customEventData);
        let customEventData = data.checkEvents[0].customEventData;
        switch(customEventData){
            case 'normalBaseGame':
                if(!this.normalBaseGameButtom.getComponent(Toggle).isChecked) {
                    mahjongWaysTestData.inst.usingTestData = false;
                }else{
                    mahjongWaysTestData.inst.usingTestData = true;
                }

                this.freeGameX10Buttom.getComponent(Toggle).isChecked = false;
                break;
            case 'freeGameX10':
                if(!this.freeGameX10Buttom.getComponent(Toggle).isChecked) {
                    mahjongWaysTestData.inst.usingTestData = false;
                }else{
                    mahjongWaysTestData.inst.usingTestData = true;
                }
                this.normalBaseGameButtom.getComponent(Toggle).isChecked = false;

                break;
        }
        mahjongWaysTestData.inst.freespinCounter = 0;
        mahjongWaysTestData.inst.testDataOption =  customEventData;
        console.log("mahjongWaysTestData.inst.usingTestData",mahjongWaysTestData.inst.usingTestData);
        console.log("mahjongWaysTestData.inst.testDataOption",mahjongWaysTestData.inst.testDataOption);
    }


    testSetMultiplier(event, customEventData){
        let dataStr = customEventData;
        let multiplier:number  =  parseInt(dataStr[0]);
        let isFreeGame = dataStr[1] == "1" ? true : false;
        this.mahjongWays_MultiplierNode.getComponent(mahjongWays_Multiplier).setMultiplier(multiplier,isFreeGame);
    }


    testMarquee(event, data){
        switch(data){
            case 'onResult':
                this.mahjongWays_MarqueeComponentNode.getComponent(mahjongWays_MarqueeComponent).onResult();
                break;
            case 'onWinMoney':
                let win = {
                    "winMoney": 6.4,
                    "accumulatedWinMutiple": 3.2
                }
                this.mahjongWays_MarqueeComponentNode.getComponent(mahjongWays_MarqueeComponent).onWinMoney(win);
                break;               
            case 'onTotalWinMoney':
                let win2 = {
                    "totalWinMoney": 6.4,
                    "accumulatedWinMutiple": 3.2
                }
                this.mahjongWays_MarqueeComponentNode.getComponent(mahjongWays_MarqueeComponent).onTotalWinMoney(win2);
                break;
            case 'startMarquee':
                this.mahjongWays_MarqueeComponentNode.getComponent(mahjongWays_MarqueeComponent).startMarquee();
                break;
            case 'stopMarquee':
                this.mahjongWays_MarqueeComponentNode.getComponent(mahjongWays_MarqueeComponent).stopMarquee();
                break;
            case 'showWin':
                this.mahjongWays_MarqueeComponentNode.getComponent(mahjongWays_MarqueeComponent).showWin(5.5);
                break;
            case 'showTotalWin':
                this.mahjongWays_MarqueeComponentNode.getComponent(mahjongWays_MarqueeComponent).showTotalWin(5.5);
                break;

        }
    }

    testFreeSpinTransitionOn(event, data){
        let dataLocal={
            isShow:true,
            count : 10
        }
                netMgr.evRepo.dispatch("onShowFreeSpinTranstion",dataLocal);


    }
    
    testFreeSpinTransitionOff(event, data){
        let dataLocal={
            isShow:false,
        }
        netMgr.evRepo.dispatch("onShowFreeSpinTranstion",dataLocal);
        console.log("this.freeSpinTransCounter",dataLocal);
    }

    testOnShowWinEffect(event, data){
        let dataLocal={
            totalWin:135.35,
            betAmount:0.5,
            winMultiple:55
        }
        netMgr.evRepo.dispatch("onShowWinEffect",dataLocal);
        console.log("onShowWinEffect",dataLocal);
    }

    testOnShowFreeGameSettlePanel(event, data){

        netMgr.evRepo.dispatch("onShowFreeGameSettlePanel",500);
        console.log("onShowFreeGameSettlePanel",500);
    }
}
