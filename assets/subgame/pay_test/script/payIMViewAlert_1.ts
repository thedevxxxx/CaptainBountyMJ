//支付宝webview

import { _decorator, Component, WebView } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

@ccclass('PayIMViewAlert1')
export default class PayIMViewAlert1 extends Component {
    @property(WebView)
    ZfbView:WebView | null = null;
    app =null
    init(data){
        this.ZfbView.url = data.url;
        
    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        var global = cc.find("payGlobal").getComponent("payGlobal_1")
        this.ZfbView.url = global.imWebViewUrl;
        this.initView()
    }
    initView(){
        var e = cc.view.getVisibleSize();
        e.getComponent(cc.UITransform).height / 1334 < 1 && this.node.setScale(e.getComponent(cc.UITransform).height / 750, e.getComponent(cc.UITransform).height / 1334);
    }
    onClick(){
        cc.director.preloadScene('payRecharge',()=>{
            hqq.reflect.setOrientation("landscape", 1334, 750)
            cc.director.loadScene('payRecharge')
        })
    }
    // update (dt) {}
}
