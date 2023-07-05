import { _decorator, Component, Node, untAlert } from 'cc';
import * as cc from "cc";
const {ccclass, property} = _decorator;

import { Language_pay } from "./payLanguage_1";

@ccclass('PayJisuIframe1')
export default class PayJisuIframe1 extends Component {
    @property(Node)
    DhBtn: Node | null = null;
    @property(Node)
    WebView: Node | null = null;
    public data : any = {};
    public showSelect = false;
    public results= null ; 
    public current :any = {};
// //当前选择的银行卡信息
    public Info = {
        bank_name:'',
        branch_name:'',
        card_name:'',
        card_num:'',
        bank_province:'',
        bank_city:''
    };
    public bankData = [];
    public bankId = null;
    public action = 'add';
    app = null;
    login_ip = ""
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        this.fetchIndex();
        this.fetchZfb();
        if(this.app.gHandler.gameGlobal.ipList) {
            this.login_ip = this.app.gHandler.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert("获取登陆ip失败!")
        }
        //点充值历史，关闭网页
        this.app.eventTarget.on("openRechargeHistory",()=>{
            
            this.WebView.active = false
            this.DhBtn.active = true
            this.DhBtn.getComponent(cc.Button).interactable = true
        },this);
    }
    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;

        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading();
            if(response.status == 0){
                self.data = response;
                self.initRender();
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading();
        })
    }
    public fetchZfb(){
        var url = `${this.app.UrlData.host}/api/payment/aliPayPaymentIndex?user_id=${this.app.UrlData.user_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                this.current = response.data.pq_payIframe[0]
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading()
        })
    }
    //selectItem回调
    public initRender(){
        this.bankData = [];
        let data = this.data.data;
        for(let i = 0 ;i < data.list.length ;i++){
            let item = this.data.data.list[i];
            if (item.type == 3){
                this.bankData.push(item)
            }
        }
        this.action = this.bankData.length != 0 ? 'edit' :'add';
    }
    //显示弹窗
    showAccountAlert(){
        this.app.showBankAccountAlert({
            text:this.bankData.length != 0  ?'修改银行卡' : '设置银行卡',
            action:this.action,
            itemId:this.bankId,
            parentComponent:this,
            //修改界面初始数据
            changeData:this.Info
        });
    }
    //充值
    public fetchgetHighSpeedTransferIframeUrl(){
        var url = `${this.app.UrlData.host}/api/payment/getHighSpeedTransferIframeUrl`;
        let dataStr=''
        dataStr = `user_id=${this.app.UrlData.user_id}&order_type=29&user_name=${decodeURI(this.app.UrlData.user_name)}&channel_id=${this.current.channel_id}&channel_name=${this.current.name}&pay_name=${this.current.nick_name}&pay_type=${this.current.pay_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&order_ip=${this.login_ip ? this.login_ip:"127.0.0.1"}&device_id=${this.app.gHandler.gameGlobal.player.deviceid}`
        let self = this;
        self.DhBtn.getComponent(cc.Button).interactable  = false;
        this.app.showLoading()
        this.app.ajax('POST',url,dataStr,(response)=>{
            this.app.hideLoading()
            if(response.status == 0){
                self.fetchIndex();
                this.WebView.active = true
                this.WebView.getComponent(cc.WebView).url = response.data
                self.DhBtn.active  = false;
            }else{
                console.log("data:",response.data,"msg:",response.msg)
                self.DhBtn.getComponent(cc.Button).interactable  = true;
            }
        },(errstatus)=>{
            this.app.hideLoading()
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        if(this.bankData.length == 0){
            this.showAccountAlert()
        }else{
            this.fetchgetHighSpeedTransferIframeUrl()
        }
    }
    onDestroy(){
       
    }
}
