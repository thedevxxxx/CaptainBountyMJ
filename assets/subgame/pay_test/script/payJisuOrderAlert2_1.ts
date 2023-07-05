import { _decorator, Component, Node, Label } from 'cc';
import * as cc from 'cc';
import Config from "./payConfig_1"
import { Language_pay } from "./payLanguage_1";
const {ccclass, property} = _decorator;
@ccclass('PayJisuOrderAlertTwo1')
export default class PayJisuOrderAlertTwo1 extends Component {
    @property(Node)
    popWindowBG : Node | null = null;
    @property(Label)
    bank_nameLabel: Label | null = null;
    @property(Label)
    card_numLabel: Label | null = null;
    @property(Label)
    card_nameLabel: Label | null = null;
    @property(Label)
    amountLabel: Label | null = null;
    @property(Label)
    nickNameLabel: Label | null = null;
    @property(Label)
    attention : Label | null = null;
    
    public results = {};
    public token = null;
    public config = null;
    public UrlData : any = [];
    app : any= {};
    login_ip = '';
    order_id = ''//订单生成后返回的order_id
    callback = null // 充值历史传入
    jisu_payment_expired_time = 0 // 倒计时
    public init(type,data,callback= ()=>{}){
        this.callback = callback
        if(hqq.gameGlobal.ipList) {
            this.login_ip = hqq.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert("获取登陆ip失败!")
        }
        if(type ===1 ){
            this.popWindowBG.active=false;
            this.fetchOrder(data)
        }else{
            //充值历史里面打开订单，这时候已经有了订单号
            this.order_id = data.data.order_id
            this.initRender(data)
        }
        
    }
    
    fetchOrder(data){
        var url = `${this.app.UrlData.host}/api/payment/jisu/create`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&amount=${data.amount}&channel_id=${data.channel_id}&pay_type=${data.pay_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&order_type=${data.order_type}&order_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&device_id=${hqq.app.deviceID}&payment_id=${data.payment_id}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.popWindowBG.active=true;
                self.initRender(response);
                this.order_id = response.data.order_id
            }else{
                self.app.showAlert(response.msg);
                self.removeSelf();
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }
    //获取倒计时
    public fetchconfiglist(){
        var url = `${this.app.UrlData.host}/api/jisu/config/list?`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                this.jisu_payment_expired_time = Number(response.data.jisu_payment_expired_time)
                // this.attention.string = `温馨提示：\n1.请使用与绑定银行卡相同账户名的账户进行支付。\n2.转账的金额必须和订单上的收款金额完全一致，包括小数点。\n3.单笔订单有效时间为${this.jisu_payment_expired_time}分钟，请勿逾期支付，未到账请联系客服。`
                this.attention.string = `温馨提示：\n1.请使用与绑定银行卡相同账户名的账户进行支付。\n2.转账的金额必须和订单上的收款金额完全一致，包括小数点。\n3.单笔订单有效时间为10分钟， 请勿逾期支付，未到账请联系客服。`
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    initRender(data){
        this.amountLabel.string = this.config.toDecimal(data.data.amount);
        this.bank_nameLabel.string = data.data.bank_name;
        this.card_nameLabel.string = data.data.card_name;
        this.card_numLabel.string = data.data.card_num;
        this.nickNameLabel.string = data.data.user_name;
    }
    onLoad () {
        this.config = new Config();
        this.UrlData = this.config.getUrlData();
        this.token = this.config.token;

        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        this.fetchconfiglist()
    }
    copyCard_num(){
        //按键音效
        this.app.loadMusic(1);
        
        if (hqq.reflect) {
            if (hqq.reflect.setClipboard(this.card_numLabel.string)) {
                this.app.showAlert(`复制成功!:${this.card_numLabel.string}`)
            } else {
                this.app.showAlert(`复制失败!请升级系统版本`)
            }
        }
       
    }
    copyCard_name(){
        //按键音效
        this.app.loadMusic(1);
        if (hqq.reflect) {
            if (hqq.reflect.setClipboard(this.card_nameLabel.string)) {
                this.app.showAlert(`复制成功!:${this.card_nameLabel.string}`)
            } else {
                this.app.showAlert(`复制失败!请升级系统版本`)
            }
        }
    }
    copyAmount(){
        //按键音效
        this.app.loadMusic(1);

        if (hqq.reflect) {
            if (hqq.reflect.setClipboard(this.amountLabel.string)) {
                this.app.showAlert(`复制成功!:${this.amountLabel.string}`)
            } else {
                this.app.showAlert(`复制失败!请升级系统版本`)
            }
        }
    }

    copyBankName(){
        //按键音效
        this.app.loadMusic(1);
        if (hqq.reflect) {
            if (hqq.reflect.setClipboard(this.bank_nameLabel.string)) {
                this.app.showAlert(`复制成功!:${this.bank_nameLabel.string}`)
            } else {
                this.app.showAlert(`复制失败!请升级系统版本`)
            }
        }
    }
    
    removeSelf(){
        //按键音效
        this.app.loadMusic(1);

        this.node.removeFromParent()
    }

    onClick(){
        //按键音效
        this.app.loadMusic(1);
    }
    // update (dt) {}
}
