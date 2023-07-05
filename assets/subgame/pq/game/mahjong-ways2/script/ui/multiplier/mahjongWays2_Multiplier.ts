
import { _decorator, Component, Node } from 'cc';
import  mahjongWays2_MultipleNumber from './mahjongWays2_MultipleNumber';
const { ccclass, property } = _decorator;

 
@ccclass('mahjongWays2_Multiplier')
export class mahjongWays2_Multiplier extends Component {

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
    }

    private initUI() {
        this.bonusBG.active = false;
        this.numNormal.forEach((node,index)=>{
            // node.active = true;
            if(index == 0) {
                node.getComponent(mahjongWays2_MultipleNumber).switchText(true,false,false);
            }else{
                node.getComponent(mahjongWays2_MultipleNumber).switchText(false,false,false);
            }
        })
        this.numFree.forEach((node,index)=>{
            node.getComponent(mahjongWays2_MultipleNumber).switchAll(false);
        })    
    }

    public async setMultiplier(multiplier:number,isFreeGame:boolean){
        if(isFreeGame){
            this.bonusBG.active = true;
            this.numNormal.forEach((node,index)=>{
                node.getComponent(mahjongWays2_MultipleNumber).switchAll(false);
            })
            this.numFree.forEach((node,index)=>{
                // node.active = true;
                if(index == multiplier){
                    if(multiplier == 0){
                        node.getComponent(mahjongWays2_MultipleNumber).switchText(true,false,false);
                    }else{
                        node.getComponent(mahjongWays2_MultipleNumber).switchText(true,true,true);
                    }
                }else{
                    node.getComponent(mahjongWays2_MultipleNumber).switchText(false,false,false);
                }
            })
        }else{
            this.bonusBG.active = false;
            this.numFree.forEach((node,index)=>{
                node.getComponent(mahjongWays2_MultipleNumber).switchAll(false);
            })
            this.numNormal.forEach((node,index)=>{
                // node.active = true;
                if(index == multiplier){
                    if(multiplier == 0){
                        node.getComponent(mahjongWays2_MultipleNumber).switchText(true,false,false);
                    }else{
                        node.getComponent(mahjongWays2_MultipleNumber).switchText(true,true,true);
                    }
                }else{
                    node.getComponent(mahjongWays2_MultipleNumber).switchText(false,false,false);
                }
            })
        }
    }

}
