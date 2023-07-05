import { _decorator, Component } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

@ccclass('PayZfbWxAlert1')
export default class PayZfbWxAlert1 extends Component {
    
    app  = null;
    url = ''
    init(url){
        this.url = url
    }
    
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        this.node.removeFromParent();
        cc.sys.openURL(encodeURI(this.url))
        cc.log(encodeURI(this.url))
    }
    removeSelf(){
        this.app.loadMusic(1);
        this.node.removeFromParent();
    }
}
