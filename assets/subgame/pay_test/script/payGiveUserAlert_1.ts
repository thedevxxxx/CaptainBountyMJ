import { _decorator, Component, Label } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

@ccclass('PayGiveUserAlert1')
export default class PayGiveUserAlert1 extends Component {
    @property(Label)
    label: Label | null = null;
    
    public app = null;
    public parentComponent = null;
    public init(data){
        this.parentComponent = data.parentComponent;
        this.label.string = `您确认转账${this.app.config.toDecimal(data.gold)}金币，给玩家ID:${data.id}吗？`
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
    }

    onClick(){
        //按键音效
        this.app.loadMusic(1);
        this.parentComponent.fetchsendMoney();
        this.node.removeFromParent();
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1);
        this.node.destroy();
    }
    // update (dt) {}
}
