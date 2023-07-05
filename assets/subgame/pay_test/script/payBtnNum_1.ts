import { _decorator, Component, Label } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

@ccclass('PayBtnNum1')
export default class PayBtnNum1 extends Component {
    @property(Label)
    label: Label | null = null;
    id = 1;
    callBack = null;
    init(num,callBack,id = 1){
        this.callBack = callBack
        this.label.string = num
        this.id = id
    }
    onClick(e){
        this.callBack(e,this.id)
    }
}
