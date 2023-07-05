//兑换首页

import { _decorator, Component, Prefab, Node } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

import { Language_pay } from "./payLanguage_1";

@ccclass('PayCash1')
export default class PayCash1 extends Component {
    @property(Prefab)
    NavToggle: Prefab | null = null;
    @property(Node)
    ToggleContainer: Node | null = null;
    @property(Node)
    Content:Node | null = null;
    public results : any = {};
    public zfbResults : any = {};
    public app : any = {};
    timer = null;
    canExit= null;
    sxAmount = 0 //受限金额
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        this.fetchIndex();
        //设置延迟，避免用户频繁操作导致报错
        this.timer = setTimeout(() => {
            this.canExit = true;
            clearTimeout(this.timer)
        }, 1000);
        let scalex = cc.view.getVisibleSize().width / 1334;
        console.log("scalex",scalex);
        if(this.app.UrlData.package_id != 16){
            if(scalex >1.1){
                this.Content.setScale(1,scalex/1.1,1);
            }
            this.node.setScale(scalex,1,1);
        }
        if(this.app.UrlData.package_id == 9)
        {  
            let fanhui = cc.find("header/fanhui",this.node);
            fanhui.scaleY/=this.node.scaleY;
            fanhui.scaleX/=this.node.scaleX;
        }else if(this.app.UrlData.package_id == 16){
            //渠道16才显示受限金额 
        }
        this.ToggleContainer.parent.parent.getComponent(cc.UITransform).height = Number(this.ToggleContainer.parent.parent.getComponent(cc.UITransform).height)*cc.view.getVisibleSize().height/750
        this.setLanguageResource()
        let BgState = hqq.audioMgr.getBgState();
        cc.log("BgStateBgState",BgState )
        if(BgState) {
            //播放大厅的背景音乐
            hqq.audioMgr.playBg("hallbg");
        }else{
            hqq.audioMgr.stopBg();  
        }
    }
    public exitBtnClick(){
        if(!this.canExit) return
        //按键音效
        this.app.loadMusic(1)
        hqq.eventMgr.dispatch(hqq.eventMgr.showJumpScene,"hall")
    }
    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;
        this.app.ajax('GET',url,'',(response)=>{
            try{
                this.app.hideLoading()
                if(response.status == 0){
                    this.results = response;
                    this.addNavToggle()
                    this.fetchgetSendMondyConfig()
                }else{
                    this.app.showAlert(response.msg)
                }
            }catch{
                console.log("等待大厅脚本加载")
            }
        },(errstatus)=>{
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    public fetchgetSendMondyConfig(){
        var url = `${this.app.UrlData.host}/api/with_draw/getSendMondyConfig?`;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                let list = response.data.send_money_config.list
                let ids = []
                list.forEach(e=>{
                    if(e.package_id == this.app.UrlData.package_id)
                    ids = e.ids
                })
                ids.forEach(e=>{
                    if(e == this.app.UrlData.user_id) {
                        var node = cc.instantiate(this.NavToggle);
                        this.ToggleContainer.addChild(node);
                        node.getComponent('PayDhToggle1').init({
                            text:"赠送"
                            
                        })
                        var node = cc.instantiate(this.NavToggle);
                        this.ToggleContainer.addChild(node);
                        node.getComponent('PayDhToggle1').init({
                            text:"赠送记录"
                            
                        })
                    }
                })
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`网络错误${errstatus}`)
        })
    }
    public addNavToggle(){
        var arr = [];
        if(!this.results.data.withDraw_info) return;
        if(this.results.data.withDraw_info.artificial){
            if(this.results.data.withDraw_info.artificial.is_close > 0){
                //15不开放人工兑换
                if(this.app.UrlData.package_id == 15|| this.app.UrlData.package_id == 16|| this.app.UrlData.package_id == 20){
                    return
                }
                arr.push('人工兑换')
            }
        }
        if(this.results.data.withDraw_info.bankcard){
            if(this.results.data.withDraw_info.bankcard.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.bankcard.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                        arr.push('银行卡兑换')
                   }
                })
            }
        }
        if(this.results.data.withDraw_info.alipay){
            if(this.results.data.withDraw_info.alipay.is_close > 0){
                arr.push('支付宝兑换')
            }
        }
        if(this.results.data.withDraw_info.usdt){
            if(this.results.data.withDraw_info.usdt.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.usdt.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                    arr.push('USDT兑换')
                   }
                })
            }
        }
        if(this.results.data.withDraw_info.jisu_withdraw){
            if(this.results.data.withDraw_info.jisu_withdraw.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.jisu_withdraw.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                    arr.push('极速兑换')
                   }
                })
            }
        }
        if(this.results.data.withDraw_info.pipei_withdraw){
            if(this.results.data.withDraw_info.pipei_withdraw.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.pipei_withdraw.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                    arr.push('匹配兑换')
                   }
                })
            }
        }
        if(this.results.data.withDraw_info.jisu_withdraw2){
            if(this.results.data.withDraw_info.jisu_withdraw2.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.jisu_withdraw2.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                    arr.push('极速兑换2')
                   }
                })
            }
        }
        if(this.results.data.withDraw_info.jisu_withdraw_iframe){
            if(this.results.data.withDraw_info.jisu_withdraw_iframe.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.jisu_withdraw2.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                    arr.push('极速兑换Iframe')
                   }
                })
            }
        }
        if(this.results.data.withDraw_info.ebpay){
            if(this.results.data.withDraw_info.ebpay.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.ebpay.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                    arr.push('EBpay兑换')
                   }
                })
            }
        }
        if(this.results.data.withDraw_info.topay){
            if(this.results.data.withDraw_info.topay.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.topay.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                    arr.push('TOpay兑换')
                   }
                })
            }
        }
        if(this.results.data.withDraw_info.okpay){
            if(this.results.data.withDraw_info.okpay.is_close > 0){
                //分渠道开关
                let package_ids = this.results.data.withDraw_info.okpay.package_ids
                let package_idsArr = package_ids.split(",")
                package_idsArr.forEach(e=>{
                   if( Number(e) == this.app.UrlData.package_id){
                    arr.push('OKpay兑换')
                   }
                })
            }
        }
        if(arr.length>0){
            //有兑换渠道时才显示兑换记录
            arr.push('兑换记录')
        }
        for(let i:number = 0; i< arr.length; i++){
            var node = cc.instantiate(this.NavToggle);
            this.ToggleContainer.addChild(node);
            node.getComponent('PayDhToggle1').init({
                text:arr[i]
            })
        }
        //首次加载，顺序第一的显示
        if(arr[0]=='人工兑换'){
            this.ToggleContainer.children[0].getComponent('PayDhToggle1').addContent('RgDh')
        }else if(arr[0] == "银行卡兑换"){
            this.ToggleContainer.children[0].getComponent('PayDhToggle1').addContent('BankDh')
        }else if(arr[0] == "支付宝兑换"){
            this.ToggleContainer.children[0].getComponent('PayDhToggle1').addContent('Dh')
        }else if(arr[0] == "USDT兑换"){
            this.ToggleContainer.children[0].getComponent('PayDhToggle1').addContent('UsdtDh')
        }else if(arr[0] == "兑换记录"){
            this.ToggleContainer.children[0].getComponent('PayDhToggle1').addContent('DhHistory')
        }else if(arr[0] == "极速兑换"){
            this.ToggleContainer.children[0].getComponent('PayDhToggle1').addContent('JisuDh')
        }else if(arr[0] == "匹配兑换"){
            this.ToggleContainer.children[0].getComponent('PayDhToggle1').addContent('PipeiDh')
        }else if(arr[0] == "极速兑换Iframe"){
            this.ToggleContainer.children[0].getComponent('PayDhToggle1').addContent('JisuDhIframe')
        }else if(arr[0] == "EBpay兑换"){
            this.ToggleContainer.children[0].getComponent('PayDhToggle1').addContent("EBpayDh","EBpay兑换")
        }else if(arr[0] == "TOpay兑换"){
            this.ToggleContainer.children[0].getComponent('PayDhToggle1').addContent("EBpayDh","TOpay兑换")
        }else if(arr[0] == "OKpay兑换"){
            this.ToggleContainer.children[0].getComponent('PayDhToggle1').addContent("EBpayDh","OKpay兑换")
        }
    }
    onDestroy(){
        clearTimeout(this.timer)
    }
    //设置语言相关的资源和字
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let title= cc.find('Canvas/Cash/header/title')
        this.app.loadIconLg(`${src}/font/title_shouyi`,title)
        
        let loadSP = cc.find('RenderRoot2D/Loading/loadSP')
        loadSP.children.forEach((e)=>{
            if (e.name == Language_pay.Lg.Language){
                e.active = true
            }else{
                e.active = false
            }
        })
    }
}
