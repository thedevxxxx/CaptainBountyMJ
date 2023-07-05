import { _decorator, Component, Label } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

import {Language_pay} from "./payLanguage_1"

@ccclass('PaySxxqItem1')
export default class PaySxxqItem1 extends Component {
    @property(Label)
    created_atLabel: Label | null = null;
    @property(Label)
    remarkLabel : Label | null = null;
    @property(Label)
    amountLabel: Label | null = null;
    
    public results :any= {};
    public app = null;
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
    }

    public init(data){
        this.amountLabel.string = this.app.config.toDecimal(data.amount);
        this.remarkLabel.string = data.remark;
        this.created_atLabel.string = data.created_at == 0 ? `${Language_pay.Lg.ChangeByText('无')}` : this.app.config.getTime(data.created_at);
    }
    // update (dt) {}
}
