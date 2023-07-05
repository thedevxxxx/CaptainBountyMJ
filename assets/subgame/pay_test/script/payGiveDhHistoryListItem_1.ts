import { _decorator, Component, Label } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

@ccclass('PayGiveDhHistoryListItem1')
export default class PayGiveDhHistoryListItem1 extends Component {
    @property(Label)
    created_atLabel: Label | null = null;
    @property(Label)
    IdLabel: Label | null = null;
    @property(Label)
    amountLabel: Label | null = null;
    @property(Label)
    statusLabel: Label | null = null;
    
    public app = null;
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
    }

    public init(data){
        this.IdLabel.string = data.ReceiveUserId
        this.amountLabel.string  = this.app.config.toDecimal(data.Amount);
        if(data.status == 4){
            this.statusLabel.string  = '已成功'
        }else if(data.status == 5){
            this.statusLabel.string  = '已失败'
        }else{
            this.statusLabel.string  = '审核中'
        }
        this.created_atLabel.string = this.app.config.getTime(data.created_at);
    }
}
