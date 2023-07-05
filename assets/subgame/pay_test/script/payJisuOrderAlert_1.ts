import { _decorator, Component, Node, Label, Button } from 'cc';
import * as cc from 'cc';
import Config from './payConfig_1';
const {ccclass, property} = _decorator;
@ccclass('PayJisuOrderAlert1')
export default class PayJisuOrderAlert1 extends Component {
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
    @property(Button)
    btn : Button | null = null;
    
    public results = {};
    public token = null;
    public config = null;
    public UrlData : any = [];
    app : any= {};
    login_ip = '';
    order_id = ''//订单生成后返回的order_id
    callback = ()=>{} // 充值历史传入
    channel = "极速充值"
    timer = null
    public init(type,data,callback= ()=>{},channel){
        this.channel = channel
        this.callback = callback
        if(hqq.gameGlobal.ipList) {
            this.login_ip = hqq.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert("获取登陆ip失败!")
        }
        if(type ===1 ){
            this.popWindowBG.active=false;
            if(this.channel == "极速充值"){
                this.fetchOrder(data)
            }else{
                this.fetchOrder2(data)
            }
        }else{
            //充值历史里面打开订单，这时候已经有了订单号
            this.order_id = data.data.order_id
            if(data.data.status == 5){
                this.btn.interactable = false
            }
            console.log("data",data)
            this.initRender(data)
        }
        
    }
    
    fetchOrder(data){
        var url = `${this.app.UrlData.host}/api/payment/HighSpeedTransfer`;
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

    fetchOrder2(data){
        var url = `${this.app.UrlData.host}/api/payment/HighSpeedTransferTwo`;
        let dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&amount=${data.amount}&channel_id=${data.channel_id}&pay_type=${data.pay_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&order_type=28&order_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&device_id=${hqq.app.deviceID}&payment_id=${data.payment_id}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
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
    //获取订单信息，当收款信息更新后，展示订单信息界面
    fetchgetHighSpeedTransferPayTwoBankInfo(){
        var url = `${this.app.UrlData.host}/api/payment/getHighSpeedTransferPayTwoBankInfo`;
        let dataStr = `order_id=${this.order_id}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                if(response.data.card_name!=""&&response.data.card_num!=""){
                    clearInterval(this.timer)
                    this.initRender(response)
                }
            }else{
                self.app.showAlert(response.msg);
            }
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
        })
    }

    initRender(data){
        this.amountLabel.string = this.config.toDecimal(data.data.amount);
        this.bank_nameLabel.string = data.data.bank_name;
        this.card_nameLabel.string = data.data.card_name;
        this.card_numLabel.string = data.data.card_num;
        this.nickNameLabel.string = data.data.user_name == undefined ?"无":data.data.user_name;
        if(data.data.card_name==""&& data.data.card_num==""){
            this.node.getChildByName("WaitContent").active = true
            let label2 = this.node.getChildByName("WaitContent").getChildByName("label2").getComponent(cc.RichText)
            label2.string = `<color=#000000>此次打款金额为<color=#E53114>${this.config.toDecimal(data.data.amount)}元</c>，请依照金额打款</color>`
            this.amountLabel.string = this.config.toDecimal(data.data.amount);
            this.popWindowBG.active=false;
            let self = this
            this.timer = setInterval(()=>{
                self.fetchgetHighSpeedTransferPayTwoBankInfo()
            },10000)
        }else{
            this.popWindowBG.active=true;
            this.node.getChildByName("WaitContent").active = false
        }
    }
    onLoad () {
        this.config = new Config();
        this.UrlData = this.config.getUrlData();
        this.token = this.config.token;

        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
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
        //确认付款
        this.btn.interactable = false;
        if(this.channel == "极速充值2"){
            this.fetchconfirmHighSpeedTransferPayTwo(1)
        }else{
            this.fetchconfirmHighSpeedTransferPay()
        }
        
    }
    quxiaoClick(){
        //按键音效
        this.app.loadMusic(1);
        //确认取消
        this.fetchconfirmHighSpeedTransferPayTwo(2)
        clearInterval(this.timer)
    }
    fetchconfirmHighSpeedTransferPay(){
        var url = `${this.app.UrlData.host}/api/payment/confirmHighSpeedTransferPay`;
        let dataStr = `order_id=${this.order_id}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                self.app.showAlert("确认付款成功！");
                //调用回调，更新充值历史数据
                self.callback()
            }else{
                self.app.showAlert(response.msg);
            }
            self.removeSelf();
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
            self.removeSelf();
        })
    }
    fetchconfirmHighSpeedTransferPayTwo(payment_confirm_status){
        var url = `${this.app.UrlData.host}/api/payment/confirmHighSpeedTransferPayTwo`;
        let dataStr = `order_id=${this.order_id}&payment_confirm_status=${payment_confirm_status}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                if(payment_confirm_status == 1){
                    self.app.showAlert("确认付款成功！");
                }else{
                    self.app.showAlert("取消成功！");
                }
                self.callback()
            }else{
                self.app.showAlert(response.msg);
            }
            self.removeSelf();
        },(errstatus)=>{
            self.app.showAlert(`网络错误${errstatus}`)
            self.removeSelf();
        })
    }
    onDestroy(){
        this.fetchconfirmHighSpeedTransferPayTwo(2)
        clearInterval(this.timer)
    }
    // update (dt) {}
}
