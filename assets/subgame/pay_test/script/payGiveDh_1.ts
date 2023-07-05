import { _decorator, Component, Label, Prefab, Node } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

import { Language_pay } from "./payLanguage_1";

@ccclass('PayGiveDh1')
export default class PayGiveDh1 extends Component {
    @property(Label)
    goldLabel: Label | null = null;
    @property(Label)
    amountLabel: Label | null = null;
    @property(Label)
    idLabel: Label | null = null;
    @property(Prefab)
    GiveUserAlert: Prefab | null = null;
    @property(Node)
    DhBtn: Node | null = null;
    
    public data : any = {};
    app = null;
    results = []
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        this.fetchIndex();
    }

    setAmount() {
        this.app.showKeyBoard(this.amountLabel,1);
    }
    setID() {
        this.app.showKeyBoard(this.idLabel,1);
    }
    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;

        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading();
            if(response.status == 0){
                self.data = response;
                this.goldLabel.string = this.app.config.toDecimal(response.data.game_gold);
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading();
        })
    }
    deleteAmount(){
        //按键音效
        this.app.loadMusic(1);
        this.amountLabel.string = Language_pay.Lg.ChangeByText('点击输入');
        this.app.setInputColor('',this.amountLabel);
    }
    deleteId(){
          //按键音效
        this.app.loadMusic(1);
        this.idLabel.string = Language_pay.Lg.ChangeByText('点击输入');
        this.app.setInputColor('',this.idLabel);
    }

    //提示
    showGiveUserAlert(){
        var node =null;
        node = cc.instantiate(this.GiveUserAlert);
        var canvas = cc.find('Canvas');
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/GiveUserAlert")){
            canvas.addChild(node);
        }
        let cash = cc.find('Canvas/Cash').getComponent('PayCash1')
        let package_rate = JSON.parse(cash.results.data.package_rate)
        let package_rate_byPackage = "0"
        package_rate.list.forEach(e => {
            if(e.package_id == this.app.UrlData.package_id){
                package_rate_byPackage = e.rate
            }
        });
        let rate = package_rate_byPackage ?Number (package_rate_byPackage)  : 0;
        console.log('package_rate_byPackage',package_rate_byPackage)
        let rate2 =cash.results.data.channel_rate ?Number (cash.results.data.channel_rate)  : 0;
        let rateMount = (rate+rate2)*Number(this.amountLabel.string);
        node.getComponent('PayGiveUserAlert1').init({
            parentComponent:this,
            rateMount: rateMount,
            gold:Number(this.amountLabel.string),
            id:this.idLabel.string
        })
    }
    //赠送
    public fetchsendMoney(){
        var url = `${this.app.UrlData.host}/api/with_draw/sendMoney`;
        let dataStr= `user_id=${this.app.UrlData.user_id}&receive_user_id=${this.idLabel.string}&amount=${this.amountLabel.string}&package_id=${this.app.UrlData.package_id}`
        let self = this;
        self.DhBtn.getComponent(cc.Button).interactable  = false;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert(Language_pay.Lg.ChangeByText('申请成功!'));
                self.fetchIndex();
            }else{
                if(response.msg == "game user is not found"){
                    self.app.showAlert("收款ID不存在")
                }else{
                    self.app.showAlert(response.msg)
                }
            }
            self.DhBtn.getComponent(cc.Button).interactable  = true;
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        var amount = Number(this.amountLabel.string);
        if(this.amountLabel.string == Language_pay.Lg.ChangeByText('点击输入')){
            this.app.showAlert(Language_pay.Lg.ChangeByText('转账金额不能为空'))
        }else if(this.idLabel.string == Language_pay.Lg.ChangeByText('点击输入')){
            this.app.showAlert(Language_pay.Lg.ChangeByText('转账ID不能为空'))
        }else if(amount >Number(this.goldLabel.string)){
            this.app.showAlert(Language_pay.Lg.ChangeByText('余额不足'))
        }else{
            this.showGiveUserAlert();
        }
    }
}
