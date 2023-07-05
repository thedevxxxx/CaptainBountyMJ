import { _decorator, Component, Node, untAlert } from 'cc';
import * as cc from "cc";
const {ccclass, property} = _decorator;

import { Language_pay } from "./payLanguage_1";

@ccclass('PayJisuDhIframe1')
export default class PayJisuDhIframe1 extends Component {
    @property(Node)
    DhBtn: Node | null = null;
    @property(Node)
    WebView: Node | null = null;
    public data : any = {};
    public showSelect = false;
    public results= null ;
    public current = {channel_name: "银行卡1",
        channel_type: "2",
        max_amount: "40000",
        min_amount: "1"};
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
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        this.fetchIndex();
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
        
        if(this.bankData.length>0){
            let Info =JSON.parse(this.bankData[0].info)
            for (var k in Info) {
                this.Info[k] = Info[k]
            }
            this.bankId = this.bankData[0].id;
        }
        this.action = this.bankData.length != 0 ? 'edit' :'add';
        //最小金额也需要根据package_id判断
        let withdraw_min_amount = JSON.parse(this.data.data.withdraw_min_amount)
        console.log(data)
        if(data.withDraw_info.jisu_withdraw_iframe.channel){
            this.current = data.withDraw_info.jisu_withdraw_iframe.channel[0]
        }
        withdraw_min_amount['bank'].forEach(item => {
            //9.1日增加,兑换的最小金额，取渠道和支付方式相比，较大的最小兑换金额
            if(item.package_id == this.app.UrlData.package_id && Number(this.current.min_amount) <Number(item.min_amount)){
                this.current.min_amount = item.min_amount
            }
        });
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
    //兑换
    public fetchgetHighSpeedWithdrawIframeUrl(){
        var url = `${this.app.UrlData.host}/api/with_draw/getHighSpeedWithdrawIframeUrl`;
        let dataStr=''
        //如果proxy_name为“”，则不传
        if(this.app.UrlData.proxy_name == ""){
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&account_id=${this.bankId}&order_type=${this.current.channel_type}&withdraw_type=11&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&package_id=${this.app.UrlData.package_id}`
        }else{
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&account_id=${this.bankId}&order_type=${this.current.channel_type}&withdraw_type=11&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}`
        }
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
    btn1Click(){
        //按键音效
        this.app.loadMusic(1);
        this.showAccountAlert()
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        if(this.bankData.length == 0){
            this.showAccountAlert()
        }else{
            this.fetchgetHighSpeedWithdrawIframeUrl()
        }
    }
    onDestroy(){
    }
}
