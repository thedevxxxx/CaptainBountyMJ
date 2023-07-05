import { _decorator, Component, Label } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

@ccclass('PayCyjeItem1')
export default class PayCyjeItem1 extends Component {
    @property(Label)
    label: Label | null = null;
    callBack = null;
    init(num,callBack){
        this.callBack = callBack
        this.label.string = num
    }
    onClick(e){
        this.callBack(e)
        this.node.parent.active = false
    }
}
