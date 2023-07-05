import { _decorator, Component, Label } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

@ccclass('PayPublicAlert1')
export default class PayPublicAlert1 extends Component {
    @property(Label)
    label: Label | null = null;
    
    timer = null;
    public init(data){
        this.label.string = data.substring(0,80)
    }

    onLoad () {
        let app = cc.find('Canvas/Main').getComponent('PayMain1');
        if(app.UrlData.package_id == 16){
            this.timer = setTimeout(() => {
                this.node.destroy()
            }, 3000)
        }
    }
    // LoadNodes(){
    //     this.label = this.node.getChildByName('New Layout').children[1].getComponent(cc.Label)
    // }

    removeSelf(){
        this.node.destroy()
    }

    onDestroy(){
        clearTimeout(this.timer);
    }

    start () {

    }

    // update (dt) {}
}
