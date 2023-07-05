import { _decorator, Component, Label } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

@ccclass('PayCashHistoryListItem1')
export default class PayCashHistoryListItem1 extends Component {
    @property(Label)
    typeLabel: Label | null = null;
    @property(Label)
    amountLabel: Label | null = null;
    @property(Label)
    exchangeLabel: Label | null = null;
    @property(Label)
    arrival_amountLabel: Label | null = null;
    @property(Label)
    statusLabel: Label | null = null;
    
    @property(Label)
    created_atLabel: Label | null = null;
    @property(Label)
    arrival_atLabel: Label | null = null;
    @property(Label)
    admin_remarkLabel: Label | null = null;
    
    public results = {};
    public app = null;
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
    }

    public init(data){
        this.typeLabel.string = data.type == 1 ? '支付宝'
            :(data.type == 2 ? '银行卡'
                :(data.type ==4 ? '交易所'
                    :(data.type == 5 ? "赠送"
                        :(data.type == 3 ? "人工兑换"
                            :( data.type == 6 ?"USDT兑换":
                                ( data.type == 8 ?"极速兑换":
                                    ( data.type == 9 ?"匹配兑换":
                                        ( data.type == 10 ?"极速兑换":
                                            ( data.type == 11 ?"极速兑换I":
                                                ( data.type == 22 ?"EBpay兑换":
                                                    ( data.type == 23 ?"TOpay兑换":
                                                        ( data.type == 24 ?"OKpay兑换":'')
                                                    )
                                            )
                                        )
                                    )
                                ) ))))));
        this.amountLabel.string = this.app.config.toDecimal(data.amount);
        // 类型=兑换渠道
        // 当类型=人工兑换时，费率为玩家填写费率
        // 当类型=人工代提时，费率为0
        // 当类型=银行卡、支付宝时，费率=平台费率+渠道费率
        // 当类型=赠送时，费率均为0
        if(data.type == 3){
            this.exchangeLabel.string  = `${this.app.config.toDecimal1(data.handling_fee*100)}%`;
        }else if(data.type == 4 || data.type == 5){
            this.exchangeLabel.string  = '0.0%';
        }else if(data.type == 1 || data.type == 2 || data.type ==8 || data.type ==10) {
            //平台费率➕渠道费率
            var sum = Number(data.results.platform_rate) + Number(data.results.channel_rate);
            this.exchangeLabel.string  = `${this.app.config.toDecimal1(sum*100)}%`;
        }else {
            this.exchangeLabel.string  = '0.0%';
        }
        this.arrival_amountLabel.string  = this.app.config.toDecimal(data.arrival_amount);
        if(data.status == 4){
            this.statusLabel.string  = '已成功'
        }else if(data.status == 5){
            this.statusLabel.string  = '已失败'
        }else if(data.status == 3){
            this.statusLabel.string  = '等待匹配'
        }else if(data.status == 7){
            this.statusLabel.string  = '匹配成功'
        }else{
            this.statusLabel.string  = '审核中'
        }
        this.created_atLabel.string = this.app.config.getTime(data.created_at);
        this.arrival_atLabel.string = data.arrival_at == 0 ? '无' : this.app.config.getTime(data.arrival_at);
        this.admin_remarkLabel.string = data.user_remark ? data.user_remark.substring(0,28) :"" ;
        this.results = data.results;
    }
}
