
import { _decorator, Component, Node } from 'cc';
import  mahjongWays_MultipleNumber from './mahjongWays_MultipleNumber';
import { mahjongWaysNetManager as netMgr ,mahjongWaysEventType}  from "../../network/mahjongWaysNetManager";

const { ccclass, property } = _decorator;

 
@ccclass('mahjongWays_Multiplier')
export class mahjongWays_Multiplier extends Component {

    @property(Node)           
    bonusBG:Node = null;

    @property(Node)           
    x1:Node = null;    
    
    @property(Node)           
    x2:Node = null;

    @property(Node)           
    x3:Node = null;

    @property(Node)           
    x5:Node = null;

    @property(Node)           
    x2Free:Node = null;

    @property(Node)           
    x4Free:Node = null;

    @property(Node)           
    x6Free:Node = null;

    @property(Node)           
    x10Free:Node = null;

    numNormal:Node[] = [];

    numFree:Node[] = [];

    start () {
        this.numNormal = [this.x1,this.x2,this.x3,this.x5];
        this.numFree = [this.x2Free,this.x4Free,this.x6Free,this.x10Free];

        this.initUI();
        this.addEvent();
    }

    private initUI() {
        this.bonusBG.active = false;
        this.numNormal.forEach((node,index)=>{
            if(index == 0) {
                node.getComponent(mahjongWays_MultipleNumber).switchText(true,false,false);
            }else{
                node.getComponent(mahjongWays_MultipleNumber).switchText(false,false,false);
            }
        })
        this.numFree.forEach((node,index)=>{
            node.getComponent(mahjongWays_MultipleNumber).switchAll(false);
        })    
    }
    protected addEvent() {
        netMgr.evRepo.register("onSetMultiplier", this, this.onSetMultiplier.bind(this));
    }

    protected removeEvent() {
        netMgr.evRepo.unregister("onSetMultiplier", this);
    }

    public async onSetMultiplier(parameter){
        let multiplier = this.multiplierTrans(parameter.multiplier,parameter.isFreeGame);
        let isFreeGame = parameter.isFreeGame;

        if(isFreeGame){
            this.bonusBG.active = true;
            this.numNormal.forEach((node,index)=>{
                node.getComponent(mahjongWays_MultipleNumber).switchAll(false);
            })
            this.numFree.forEach((node,index)=>{
                // node.active = true;
                if(index == multiplier){
                    if(multiplier == 0){
                        node.getComponent(mahjongWays_MultipleNumber).switchText(true,false,false);
                    }else{
                        node.getComponent(mahjongWays_MultipleNumber).switchText(true,true,true);
                    }
                }else{
                    node.getComponent(mahjongWays_MultipleNumber).switchText(false,false,false);
                }
            })
        }else{
            this.bonusBG.active = false;
            this.numFree.forEach((node,index)=>{
                node.getComponent(mahjongWays_MultipleNumber).switchAll(false);
            })
            this.numNormal.forEach((node,index)=>{
                // node.active = true;
                if(index == multiplier){
                    if(multiplier == 0){
                        node.getComponent(mahjongWays_MultipleNumber).switchText(true,false,false);
                    }else{
                        node.getComponent(mahjongWays_MultipleNumber).switchText(true,true,true);
                    }
                }else{
                    node.getComponent(mahjongWays_MultipleNumber).switchText(false,false,false);
                }
            })
        }
    }
    public async setMultiplier(multiplier:number,isFreeGame:boolean){
        if(isFreeGame){
            this.bonusBG.active = true;
            this.numNormal.forEach((node,index)=>{
                node.getComponent(mahjongWays_MultipleNumber).switchAll(false);
            })
            this.numFree.forEach((node,index)=>{
                // node.active = true;
                if(index == multiplier){
                    if(multiplier == 0){
                        node.getComponent(mahjongWays_MultipleNumber).switchText(true,false,false);
                    }else{
                        node.getComponent(mahjongWays_MultipleNumber).switchText(true,true,true);
                    }
                }else{
                    node.getComponent(mahjongWays_MultipleNumber).switchText(false,false,false);
                }
            })
        }else{
            this.bonusBG.active = false;
            this.numFree.forEach((node,index)=>{
                node.getComponent(mahjongWays_MultipleNumber).switchAll(false);
            })
            this.numNormal.forEach((node,index)=>{
                // node.active = true;
                if(index == multiplier){
                    if(multiplier == 0){
                        node.getComponent(mahjongWays_MultipleNumber).switchText(true,false,false);
                    }else{
                        node.getComponent(mahjongWays_MultipleNumber).switchText(true,true,true);
                    }
                }else{
                    node.getComponent(mahjongWays_MultipleNumber).switchText(false,false,false);
                }
            })
        }
    }



    multiplierTrans(number,isFree){
        if(!isFree){
            switch(number){
                case 1:
                    return 0;
                case 2:
                    return 1;
                case 3:
                    return 2;
                case 5:
                    return 3;
                }
        }else{
            switch(number){
                case 2:
                    return 0;
                case 4:
                    return 1;
                case 6:
                    return 2;
                case 10:
                    return 3;
                }
        }
    
    }

    onDestroy(){
        this.removeEvent();
    }
}
