import { _decorator, Component, Prefab, Label, Node ,EditBox} from 'cc';
import * as cc from 'cc';
import { Language_pay } from "./payLanguage_1";
const {ccclass, property} = _decorator;

@ccclass('PayEBpayAccountAlert1')
export default class PayEBpayAccountAlert1 extends cc.Component {

    @property(cc.EditBox)
    walletAddressInput: cc.EditBox = null;

    @property(cc.Node)
    titleIcon: cc.Node = null;

    app = null
    action = 'add'
    itemId = ""
    parentComponent = null
    dhType = ""
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        //this.setLanguageResource()
        console.log(this.dhType)
        let src = Language_pay.Lg.getLgSrc()
        if(this.dhType == "EBpay兑换"){
            this.app.loadIconLg(`${src}/font/title_ebpay`,this.titleIcon)
        }else if(this.dhType == "TOpay兑换"){
            this.app.loadIconLg(`${src}/font/topayTitle`,this.titleIcon)
        }else if(this.dhType == "OKpay兑换"){
            this.app.loadIconLg(`${src}/font/okpayTitle`,this.titleIcon)
        }
    }
    init(parentComponent,dhType){
        this.parentComponent = parentComponent
        this.dhType = dhType
    }
    onClick() {
        //按键音效
        this.app.loadMusic(1);
        //去掉输入中的空格
        var str = this.walletAddressInput.string.replace(/[^a-zA-Z\d]/g,'');
        this.walletAddressInput.string = str;
        if(this.walletAddressInput.string == ''){
            this.app.showAlert(Language_pay.Lg.ChangeByText('钱包地址不能为空!'))
        }else if(this.dhType == "EBpay兑换" && (this.walletAddressInput.string.length > 36 || this.walletAddressInput.string.length < 32 )  ){
            this.app.showAlert("EBpay钱包地址限定32-36位！")
        }else if(this.dhType == "TOpay兑换" && (this.walletAddressInput.string.length > 18 || this.walletAddressInput.string.length < 16 )  ){
            this.app.showAlert("TOpay钱包地址限定16-18位！")
        }else if(this.dhType == "OKpay兑换" && (this.walletAddressInput.string.length != 16 )  ){
            this.app.showAlert("OKpay钱包地址限定16位！")
        }else{
            this.fetchBindAccountPay();
            this.node.removeFromParent();
        }
    }
    fetchBindAccountPay() {
        var with_draw_type = 0
        if(this.dhType == "EBpay兑换"){
            with_draw_type = 22
        }else if(this.dhType == "TOpay兑换"){
            with_draw_type = 23
        }else if(this.dhType == "OKpay兑换"){
            with_draw_type = 24
        }
        var url = `${this.app.UrlData.host}/api/with_draw/account/bind`;
        let dataStr = ""
        dataStr = `user_id=${this.app.UrlData.user_id}&type=${with_draw_type}&account=${this.walletAddressInput.string}&package_id=${this.app.UrlData.package_id}`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                this.parentComponent.fetchIndex();
                self.app.showAlert(Language_pay.Lg.ChangeByText('操作成功!'))
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    removeSlef(){
        this.node.removeFromParent()
    }
     //设置语言相关的资源和字
     setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()
        
        let titleIcon= cc.find("Canvas/UsdtAccountAlert/Layout/titleIcon")
        let popup_usdt_frame= cc.find("Canvas/UsdtAccountAlert/Layout/content/popup_usdt_frame")
        let btn1= cc.find("Canvas/UsdtAccountAlert/Layout/btn1")
        let tishi= cc.find("Canvas/UsdtAccountAlert/Layout/tishi").getComponent(cc.Label)

        if(this.app.UrlData.package_id == 8||this.app.UrlData.package_id == 9){
            this.app.loadIconLg(`${src}/font/queding`,btn1.children[0])
            this.app.loadIconLg(`${src}/font/txt_qbdz`,popup_usdt_frame.children[0])
            this.app.loadIconLg(`${src}/font/txt_llx`,popup_usdt_frame.children[1])
            this.app.loadIconLg(`${src}/font/title_usdt`,titleIcon)
        }else if(this.app.UrlData.package_id == 10){
            this.app.loadIconLg(`${src}/font/queding`,btn1.children[0])
            this.app.loadIconLg(`${src}/font/title_usdt`,titleIcon)
            this.app.loadIconLg(`${src}/font/txt_qbdz`,popup_usdt_frame.children[0])
            this.app.loadIconLg(`${src}/font/txt_llx`,popup_usdt_frame.children[1])
        }else if(this.app.UrlData.package_id == 15 ||this.app.UrlData.package_id == 20|| this.app.UrlData.package_id == 18 || this.app.UrlData.package_id == 41 || this.app.UrlData.package_id == 43 || this.app.UrlData.package_id == 45|| this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){
           
        }else{
            this.app.loadIconLg(`${src}/form/popup_usdt_frame`,popup_usdt_frame)
            this.app.loadIconLg(`${src}/btn/surecg`,btn1)
            this.app.loadIconLg(`${src}/font/title_usdt`,titleIcon)
        }

        this.walletAddressInput.placeholder = Language_pay.Lg.ChangeByText('请输入钱包地址')
        tishi.string = Language_pay.Lg.ChangeByText('温馨提示：绑定钱包地址后无法自行修改！请仔细填写您的钱包地址信息，如有错误将会导致您无法收到货币。')
    }
}
