import { _decorator, Component, Label } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

@ccclass('PayBankSelectItem1')
export default class PayBankSelectItem1 extends Component {
    @property(Label)
    label: Label | null = null;
    @property
    parentContent = null;
    parentLabel
    app = null;
    public init(data){
        this.label.string = data.text;
        this.parentContent = data.Content;
        this.parentLabel = data.Label;
    }
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);

        this.parentContent.active = false;
        this.parentLabel.string = this.label.string;
    }
    // update (dt) {}
}
