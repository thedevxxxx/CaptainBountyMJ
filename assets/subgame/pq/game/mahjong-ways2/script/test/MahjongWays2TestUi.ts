
import { _decorator, Component, Node } from 'cc';
import { mahjongWays2TestData } from '../test/mahjongWays2TestData';
import { Toggle } from 'cc';
import { mahjongWays2_Multiplier } from '../ui/multiplier/mahjongWays2_Multiplier';
import  mahjongWays2_MarqueeComponent  from '../ui/marquee/mahjongWays2_MarqueeComponent';
import { mahjongWays2NetManager as netMgr ,mahjongWays2EventType} from '../network/mahjongWays2NetManager';

const { ccclass, property } = _decorator;

@ccclass('MahjongWays2TestUi')
export class MahjongWays2TestUi extends Component {

    @property(Node)           
    UiNode:Node = null;

    @property(Node)     
    normalBaseGameButtom:Node = null;

    @property(Node)     
    freeGameX10Buttom:Node = null;

    @property(Node)     
    mahjongWays2_MultiplierNode:Node = null;
    
    @property(Node)     
    mahjongWays2_MarqueeComponentNode:Node = null;


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
        if(!hqq.isDebug) this.node.active = false; 
        this.normalBaseGameButtom.getComponent(Toggle).isChecked = false;
        this.freeGameX10Buttom.getComponent(Toggle).isChecked = false;
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
        mahjongWays2TestData.inst.usingTestData = false;
        console.log("checkBtn",data);
        console.log("checkBtn",data.checkEvents[0].customEventData);
        let customEventData = data.checkEvents[0].customEventData;
        switch(customEventData){
            case 'normalBaseGame':
                if(!this.normalBaseGameButtom.getComponent(Toggle).isChecked) {
                    mahjongWays2TestData.inst.usingTestData = false;
                }else{
                    mahjongWays2TestData.inst.usingTestData = true;
                }

                this.freeGameX10Buttom.getComponent(Toggle).isChecked = false;
                break;
            case 'freeGameX10':
                if(!this.freeGameX10Buttom.getComponent(Toggle).isChecked) {
                    mahjongWays2TestData.inst.usingTestData = false;
                }else{
                    mahjongWays2TestData.inst.usingTestData = true;
                }
                this.normalBaseGameButtom.getComponent(Toggle).isChecked = false;

                break;
        }
        mahjongWays2TestData.inst.freespinCounter = 0;
        mahjongWays2TestData.inst.testDataOption =  customEventData;
        console.log("mahjongWays2TestData.inst.usingTestData",mahjongWays2TestData.inst.usingTestData);
        console.log("mahjongWays2TestData.inst.testDataOption",mahjongWays2TestData.inst.testDataOption);
    }


    testSetMultiplier(event, customEventData){
        let dataStr = customEventData;
        let multiplier:number  =  parseInt(dataStr[0]);
        let isFreeGame = dataStr[1] == "1" ? true : false;
        this.mahjongWays2_MultiplierNode.getComponent(mahjongWays2_Multiplier).setMultiplier(multiplier,isFreeGame);
    }


    testMarquee(event, data){
        switch(data){
            case 'onResult':
                this.mahjongWays2_MarqueeComponentNode.getComponent(mahjongWays2_MarqueeComponent).onResult();
                break;
            case 'onWinMoney':
                let win = {
                    "winMoney": 6.4,
                    "accumulatedWinMutiple": 3.2
                }
                this.mahjongWays2_MarqueeComponentNode.getComponent(mahjongWays2_MarqueeComponent).onWinMoney(win);
                break;               
            case 'onTotalWinMoney':
                let win2 = {
                    "totalWinMoney": 6.4,
                    "accumulatedWinMutiple": 3.2
                }
                this.mahjongWays2_MarqueeComponentNode.getComponent(mahjongWays2_MarqueeComponent).onTotalWinMoney(win2);
                break;
            case 'startMarquee':
                this.mahjongWays2_MarqueeComponentNode.getComponent(mahjongWays2_MarqueeComponent).startMarquee();
                break;
            case 'stopMarquee':
                this.mahjongWays2_MarqueeComponentNode.getComponent(mahjongWays2_MarqueeComponent).stopMarquee();
                break;
            case 'showWin':
                this.mahjongWays2_MarqueeComponentNode.getComponent(mahjongWays2_MarqueeComponent).showWin(5.5);
                break;
            case 'showTotalWin':
                this.mahjongWays2_MarqueeComponentNode.getComponent(mahjongWays2_MarqueeComponent).showTotalWin(5.5);
                break;

        }























    }


}
