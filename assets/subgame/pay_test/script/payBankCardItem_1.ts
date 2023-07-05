import { _decorator, Component, Label } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('PayBankCardItem1')
export default class PayBankCardItem1 extends Component {
    @property(Label)
    label: Label | null = null;
    @property(Label)
    BankName: Label | null = null;
    
    app = null;
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
    }
    public init(info){
       let Info =  JSON.parse(info)
       this.BankName.string = Info.bank_name
       this.label.string = this.app.config.testBankNum(Info.card_num)
    }
}
