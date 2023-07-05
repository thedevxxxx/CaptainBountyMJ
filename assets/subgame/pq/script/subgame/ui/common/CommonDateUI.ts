
import { _decorator, Component, Node, Label, Sprite, Color } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('CommonDateUI')
export class CommonDateUI extends Component {

    private yearBtn:Node;
    private monthBtn:Node;
    private dayBtn:Node;

    onLoad () {
        this.yearBtn = this.node.getChildByName('btn_year');
        this.monthBtn = this.node.getChildByName('btn_month');
        this.dayBtn = this.node.getChildByName('btn_day');
        this.addEvent();
    }

    onDestroy() {
        this.removeEvent();
    }

    private addEvent() {
    }

    private removeEvent() {
    }

    updateColor(color:Color) {
        this.updateSpriteColorView(this.yearBtn.getComponent(Sprite), color);
        this.updateLabelColorView(this.yearBtn.getChildByName("Node").getChildByName("Label").getComponent(Label), color);
        
        this.updateSpriteColorView(this.monthBtn.getComponent(Sprite), color);
        this.updateLabelColorView(this.monthBtn.getChildByName("Node").getChildByName("Label").getComponent(Label), color);
        
        this.updateSpriteColorView(this.dayBtn.getComponent(Sprite), color);
        this.updateLabelColorView(this.dayBtn.getChildByName("Node").getChildByName("Label").getComponent(Label), color);
    }

    private updateLabelColorView(label:Label, color:Color) {
        label.color = color;
    }

    private updateSpriteColorView(sp:Sprite, color:Color) {
        sp.color = color;
    }
}