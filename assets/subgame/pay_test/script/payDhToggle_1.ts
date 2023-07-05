//兑换导航

import { _decorator, Component, Node, Label } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

import { Language_pay } from "./payLanguage_1";

@ccclass('PayDhToggle1')
export default class PayDhToggle1 extends Component {
    @property(Node)
    normalIcon : Node | null = null;
    @property(Node)
    currentIcon : Node | null = null;
    @property(Node)
    tishi : Node | null = null;
    @property(Label)
    tishiLabel : Label | null =null;
    
    app= null;
    text = null;
    public init(data){
        let src = Language_pay.Lg.getLgSrc()
        this.text=data.text;
        if( cc.isValid(this.tishi ) )
        {
            this.app.loadIcon(`${src}/menu/tishi`,this.tishi,97,55);
        }    
        if(this.app.UrlData.package_id == 9){
            let zi = cc.find( "zi" , this.node );
            if( cc.isValid( zi ) )
            {
                if(this.text == '支付宝兑换'){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "支付宝");
                }else if(this.text == '银行卡兑换'){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡");
                    // this.setTishiLabel(0.02);
                }else if(this.text == '人工兑换'){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "人工兑换");
                }else if(this.text == '兑换记录'){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "兑换记录");
                }else if(this.text == 'USDT兑换'){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "USDT钱包");
                }else if(this.text == '极速兑换'|| this.text == "极速兑换2"){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "极速兑换");
                }else if(this.text == '匹配兑换'){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "匹配兑换");
                }else if(this.text == '赠送'){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "账户内互转");
                }else if(this.text == '赠送记录'){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "转账记录");
                }else if(this.text == '极速兑换Iframe'){
                    zi.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "极速兑换");
                }
            }
        }else if(this.app.UrlData.package_id == 15 || this.app.UrlData.package_id == 18|| this.app.UrlData.package_id == 20 || this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22){
            if(this.text == '支付宝兑换'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "支付宝");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "支付宝");
            }else if(this.text == '银行卡兑换'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡");
                // this.setTishiLabel(0.02);
            }else if(this.text == '人工兑换'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "人工兑换");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "人工兑换");
            }else if(this.text == '兑换记录'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "兑换记录");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "兑换记录");
            }else if(this.text == 'USDT兑换'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "USDT钱包");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "USDT钱包");
            }else if(this.text == '极速兑换'|| this.text == "极速兑换2"){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "极速兑换");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "极速兑换");
            }else if(this.text == '匹配兑换'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "匹配兑换");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "匹配兑换");
            }else if(this.text == '赠送'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "账户内互转");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "账户内互转");
            }else if(this.text == '赠送记录'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "转账记录");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "转账记录");
            }else if(this.text == '极速兑换Iframe'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "极速兑换");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "极速兑换");
            }
        }else if(this.app.UrlData.package_id == 16){
            if(this.text == '银行卡兑换'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡");
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/tixiandaoyinhj2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/tixiandaoyinhj`,currentIcon,44,44);
            }else if(this.text == '银行卡管理'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡管理");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "银行卡管理");
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/yinhangkaguanli`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/yinhangkaguanli2`,currentIcon,44,44);
            }else if(this.text == 'USDT兑换'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "USDT兑换");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "USDT兑换");
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/usdtcz2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/usdtcz1`,currentIcon,44,44);
            }else if(this.text == '极速兑换'|| this.text == "极速兑换2"){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "极速兑换");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "极速兑换");
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/jisu2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/jisu1`,currentIcon,44,44);
            }else if(this.text == '匹配兑换'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "匹配兑换");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "匹配兑换");
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/menu_pipei2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/menu_pipei1`,currentIcon,44,44);
            }else if(this.text == '赠送'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "账户内互转");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "账户内互转");
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/menu_zhnhz_2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/menu_zhnhz_1`,currentIcon,44,44);
            }else if(this.text == '赠送记录'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "转账记录");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "转账记录");
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/menu_zzjl_2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/menu_zzjl_1`,currentIcon,44,44);
            }else if(this.text == '极速兑换Iframe'){
                this.normalIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "极速兑换");
                this.currentIcon.getComponent( cc.Label ).string = Language_pay.Lg.ChangeByText( "极速兑换");
                let normalIcon = this.node.getChildByName("Background").getChildByName("icon")
                let currentIcon = this.node.getChildByName("checkmark").getChildByName("icon")
                this.app.loadIcon(`${src}/menu/jisu2`,normalIcon,44,44);
                this.app.loadIcon(`${src}/menu/jisu1`,currentIcon,44,44);
            }else{
                this.node.removeFromParent()
            }
        }else{
            if(this.text == '支付宝兑换'){
                this.app.loadIcon(`${src}/menu/menu_ali_1`,this.normalIcon,242,86)
                this.app.loadIcon(`${src}/menu/menu_ali_2`,this.currentIcon,249,86);  
            }else if(this.text == '银行卡兑换'){
                this.app.loadIcon(`${src}/menu/menu_union_2`,this.normalIcon,242,86)
                this.app.loadIcon(`${src}/menu/menu_union_1`,this.currentIcon,249,86)
            }else if(this.text == '人工兑换'){
                this.app.loadIcon(`${src}/menu/menu_rengong_1`,this.normalIcon,207,39)
                this.app.loadIcon(`${src}/menu/menu_rengong_2`,this.currentIcon,249,86)
            }else if(this.text == '兑换记录'){
                this.app.loadIcon(`${src}/menu/menu_dhhistory_1`,this.normalIcon,242,86)
                this.app.loadIcon(`${src}/menu/menu_dhhistory_2`,this.currentIcon,249,86)
            }else if(this.text == 'USDT兑换'){
                this.app.loadIcon(`${src}/menu/menu_usdtQb_1`,this.normalIcon,242,86)
                this.app.loadIcon(`${src}/menu/menu_usdtQb_2`,this.currentIcon,249,86)
            }else if(this.text == '极速兑换'|| this.text == "极速兑换2"){
                this.app.loadIcon(`${src}/menu/menu_jsdh_1`,this.normalIcon,242,86)
                this.app.loadIcon(`${src}/menu/menu_jsdh_2`,this.currentIcon,249,86)
            }else if(this.text == '匹配兑换'){
                this.app.loadIcon(`${src}/menu/menu_pipeidh1`,this.normalIcon,242,86)
                this.app.loadIcon(`${src}/menu/menu_pipeidh2`,this.currentIcon,249,86)
            }else if(this.text == '赠送'){
                this.app.loadIcon(`${src}/menu/menu_zhnhz_1`,this.normalIcon,242,86)
                this.app.loadIcon(`${src}/menu/menu_zhnhz_2`,this.currentIcon,249,86)
            }else if(this.text == '赠送记录'){
                this.app.loadIcon(`${src}/menu/menu_zzjl_1`,this.normalIcon,242,86)
                this.app.loadIcon(`${src}/menu/menu_zzjl_2`,this.currentIcon,249,86)
            }else if(this.text == '极速兑换Iframe'){
                this.app.loadIcon(`${src}/menu/menu_jsdh_1`,this.normalIcon,242,86)
                this.app.loadIcon(`${src}/menu/menu_jsdh_2`,this.currentIcon,249,86)
            }else if(this.text == 'EBpay兑换'){
                this.app.loadIcon(`${src}/menu/menu_e1`,this.normalIcon,249,86);
                this.app.loadIcon(`${src}/menu/menu_e2`,this.currentIcon,249,86);
            }else if(this.text == 'TOpay兑换'){
                this.app.loadIcon(`${src}/menu/menu_to1`,this.normalIcon,249,86);
                this.app.loadIcon(`${src}/menu/menu_to2`,this.currentIcon,249,86);
            }else if(this.text == 'OKpay兑换'){
                this.app.loadIcon(`${src}/menu/menu_ok1`,this.normalIcon,249,86);
                this.app.loadIcon(`${src}/menu/menu_ok2`,this.currentIcon,249,86);
            }
        }
    }
    setTishiLabel(percent) {
        cc.log("payDhToggle" , this.text , ' percent=',percent);
        this.tishiLabel.string = `${percent * 100} %`;
        if (percent == 0){
            this.tishi.active = false
        }else{
            this.tishi.active = true
        }
    }
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        this.showAnimate()
    }
    
    showAnimate(){
        if(this.app.UrlData.package_id == 16){
            this.node.parent.children.forEach(e=>{
                let isChecked = e.getComponent(cc.Toggle).isChecked
                if (isChecked){
                    e.getChildByName("checkmark").active = true
                    e.getChildByName("Background").active = false
                }else{
                    e.getChildByName("checkmark").active = false
                    e.getChildByName("Background").active = true
                }
            })
        }
    }
    onClick(){
        //按键音效
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        this.app.loadMusic(1);
        this.app.showLoading();
        this.showAnimate()
        if(this.text == '支付宝兑换'){
            this.addContent('Dh');
        }else if(this.text == '银行卡兑换'){
            this.addContent('BankDh');
        }else if(this.text == '人工兑换'){
            this.addContent('RgDh');
        }else if(this.text == '兑换记录'){
            this.addContent('DhHistory');
        }else if(this.text == 'USDT兑换'){
            this.addContent('UsdtDh');
        }else if(this.text == "极速兑换"){
            this.addContent("JisuDh")
        }else if(this.text == "极速兑换2"){
            this.addContent("JisuDh","极速兑换2")
        }else if(this.text == "匹配兑换"){
            this.addContent("JisuDh2")
        }else if(this.text == "赠送"){
            this.addContent("GiveDh")
        }else if(this.text == "赠送记录"){
            this.addContent("GiveDhHistory")
        }else if(this.text == "极速兑换Iframe"){
            this.addContent("JisuDhIframe")
        }else if(this.text == "EBpay兑换"){
            this.addContent("EBpayDh","EBpay兑换")
        }else if(this.text == "TOpay兑换"){
            this.addContent("EBpayDh","TOpay兑换")
        }else if(this.text == "OKpay兑换"){
            this.addContent("EBpayDh","OKpay兑换")
        }
    }
    addContent(data,type = ""){
        var content = cc.find('Canvas/Cash/Content');
        this.app.loadBundlePrefab(`Prefab/${data}`,(Prefab)=>{
            if(Prefab){ 
                var node = cc.instantiate(Prefab);
                if(type == "极速兑换2"){
                    node.getComponent("PayJisuDh1").init("极速兑换2")
                }else if(data == "JisuDh"){
                    node.getComponent("PayJisuDh1").init("极速兑换")
                }else if(type == "EBpay兑换"){
                    node.getComponent("PayEBpayDh1").init("EBpay兑换")
                }else if(type == "TOpay兑换"){
                    node.getComponent("PayEBpayDh1").init("TOpay兑换")
                }else if(type == "OKpay兑换"){
                    node.getComponent("PayEBpayDh1").init("OKpay兑换")
                }
                content.removeAllChildren();
                content.addChild(node);
            }
        })
    }
    // update (dt) {}
}
