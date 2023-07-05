import { Node } from "cc";
import { _decorator, Component } from "cc";
import { Label } from "cc";

const { ccclass,property } = _decorator;
@ccclass('mahjongWays_FreeGameCounterComponent')
export default class mahjongWays_FreeGameCounterComponent extends Component {


    @property(Node)
    remainingFreeCountNum:Node = null;
    
    public setFreeCount(count: number) {
         const nubmers = count.toString().split("");
        this.remainingFreeCountNum.getComponent(Label).string = nubmers+"";
    }

}