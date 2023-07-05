import { _decorator, Component, Node } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

import { Language_pay } from "./payLanguage_1";

@ccclass('PayCashHistoryToggle1')
export default class PayCashHistoryToggle1 extends Component {
    @property(Node)
    normalIcon : Node | null = null;
    @property(Node)
    currentIcon : Node | null = null;
    
    app =null;
    index = null;
    parentComponet : any = ''
    text = null;
    public init(data){
        let src = Language_pay.Lg.getLgSrc()
        this.text =data.text;
        this.index = data.index;
        this.parentComponet = data.parentComponet
        if(this.index == 0){
            this.app.loadIcon(`${src}/menu/menu_all_2`,this.normalIcon,207,44)
            this.app.loadIcon(`${src}/menu/menu_all_1`,this.currentIcon,249,86);
        }else if(this.index == 1){
            this.app.loadIcon(`${src}/menu/menu_unfinished_2`,this.normalIcon,207,44)
            this.app.loadIcon(`${src}/menu/menu_unfinished_1`,this.currentIcon,249,86);
        }else if(this.index == 2){
            this.app.loadIcon(`${src}/menu/menu_finished_2`,this.normalIcon,207,44)
            this.app.loadIcon(`${src}/menu/menu_finished_1`,this.currentIcon,249,86);
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
    }
    
    onClick(){
        //按键音效
        this.app.loadMusic(1);

        this.parentComponet.order_status = this.index;
        this.parentComponet.page = 1;
        this.parentComponet.fetchIndex();
    }
    // update (dt) {}
}
