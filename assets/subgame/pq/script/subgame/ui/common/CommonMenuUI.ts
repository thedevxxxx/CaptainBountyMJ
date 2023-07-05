
import { _decorator, Component, Node, Color, Sprite, Button, Label, Vec3, Tween, tween } from 'cc';
import { commonEvent, EventType } from '../../../event/CommonEventManage';
import { CommonModeInfo } from '../../info/CommonModeInfo';
import { ICommonUI } from '../../interface/ICommonUI';
import Tweens from '../../common/Tweens';
const { ccclass, property } = _decorator;
 
@ccclass('CommonMenuUI')
export class CommonMenuUI extends Component implements ICommonUI {

    private exitBtn:Button;
    private soundBtn:Button;
    private paytableBtn:Button;
    private ruleBtn:Button;
    private histBtn:Button;
    private closeBtn:Button;

    private origPos:Vec3;
    private hidePos:Vec3;
    private modeInfo:CommonModeInfo;

    private showTween:Tween<Node>;

    onLoad () {
        this.exitBtn = this.node.getChildByName('layout').getChildByName('exit_btn').getChildByName('ic_exit').getComponent(Button);
        this.soundBtn = this.node.getChildByName('layout').getChildByName('sound_btn').getChildByName('ic_sound').getComponent(Button);
        this.paytableBtn = this.node.getChildByName('layout').getChildByName('paytable_btn').getChildByName('ic_paytable').getComponent(Button);
        this.ruleBtn = this.node.getChildByName('layout').getChildByName('rule_btn').getChildByName('ic_rule').getComponent(Button);
        this.histBtn = this.node.getChildByName('layout').getChildByName('hist_btn').getChildByName('ic_hist').getComponent(Button);
        this.closeBtn = this.node.getChildByName('layout').getChildByName('close_btn').getChildByName('ic_close').getComponent(Button);
        
        this.origPos = new Vec3(this.node.x, this.node.y);
        this.hidePos = new Vec3(this.node.x, this.node.y * 1.5);

        Tweens.addOpacityEffect(this.exitBtn.node);
        Tweens.addOpacityEffect(this.soundBtn.node);
        Tweens.addOpacityEffect(this.paytableBtn.node);
        Tweens.addOpacityEffect(this.ruleBtn.node);
        Tweens.addOpacityEffect(this.histBtn.node);
        Tweens.addOpacityEffect(this.closeBtn.node);
        
        this.addEvent();
    }

    onDestroy() {
        this.removeEvent();
        this.stopShowTween();
    }

    private stopShowTween() {
        if (this.showTween != null) {
            this.showTween.stop();
            this.showTween = null;
        }
    }

    private addEvent() {
        commonEvent.register(EventType.MENU_UI_OPEN, this, this.open.bind(this));
        commonEvent.register(EventType.MENU_UI_CLOSE, this, this.close.bind(this));
    }

    private removeEvent() {
        commonEvent.unregister(EventType.MENU_UI_OPEN, this);
        commonEvent.unregister(EventType.MENU_UI_CLOSE, this);
    }

    open() {
        this.node.active = true;
        this.allBtnEnabled(true);
        this.updateSoundBtn()
        this.node.y = this.hidePos.y;
        this.showTween = tween(this.node)
            .to(.2, { position: this.origPos })
            .call(() => this.node.y = this.origPos.y)
            .union()
            .start();
    }

    close() {
        this.node.active = false;
    }

    /**
     * 更新modeinfo
     */
     updateModeInfo(modeInfo:CommonModeInfo) {
        this.modeInfo = modeInfo;
    }

    /**
     * 更新btn颜色
     */
     updateBtnColor(normalColor:Color, pressedColor:Color, hoverColor:Color, disabledColor:Color) {
        this.updateBtnColorView(this.exitBtn, normalColor, pressedColor, hoverColor, disabledColor);
        this.updateBtnColorView(this.paytableBtn, normalColor, pressedColor, hoverColor, disabledColor);
        this.updateBtnColorView(this.ruleBtn, normalColor, pressedColor, hoverColor, disabledColor);
        this.updateBtnColorView(this.histBtn, normalColor, pressedColor, hoverColor, disabledColor);

        this.updateSpriteColorView(this.soundBtn.node.getChildByName("ic_soundon").getComponent(Sprite), normalColor);
        this.updateSpriteColorView(this.soundBtn.node.getChildByName("ic_soundoff").getComponent(Sprite), normalColor);
    }

    private updateBtnColorView(button:Button, normalColor:Color, pressedColor:Color, hoverColor:Color, disabledColor:Color) {
        button.transition = Button.Transition.COLOR;
        if (normalColor != null) {
            button.normalColor = normalColor;
        }
        if (pressedColor != null) {
            button.pressedColor = pressedColor;
        }
        if (hoverColor != null) {
            button.hoverColor = hoverColor;
        }
        if (disabledColor != null) {
            button.disabledColor = disabledColor;
        }
    }

    /**
     * 更新label颜色
     */
    updateLabelColor(color:Color) {
        this.updateLabelColorView(this.exitBtn.node.parent.getChildByName("label").getComponent(Label), color);
        this.updateLabelColorView(this.soundBtn.node.parent.getChildByName("label").getComponent(Label), color);
        this.updateLabelColorView(this.paytableBtn.node.parent.getChildByName("label").getComponent(Label), color);
        this.updateLabelColorView(this.ruleBtn.node.parent.getChildByName("label").getComponent(Label), color);
        this.updateLabelColorView(this.histBtn.node.parent.getChildByName("label").getComponent(Label), color);
        this.updateLabelColorView(this.closeBtn.node.parent.getChildByName("label").getComponent(Label), color);
    }

    private updateLabelColorView(label:Label, color:Color) {
        label.color = color;
    }

    private updateSpriteColorView(sp:Sprite, color:Color) {
        sp.color = color;
    }

     //更新声音按钮
     private updateSoundBtn() {
        if (this.modeInfo.sound) {
            this.soundBtn.node.getChildByName("ic_soundon").active = true;
            this.soundBtn.node.getChildByName("ic_soundoff").active = false;
        } else {
            this.soundBtn.node.getChildByName("ic_soundon").active = false;
            this.soundBtn.node.getChildByName("ic_soundoff").active = true;
        }
    }

    //====================================点击事件

    clickExitBtn() {
        console.log("点击退出按钮");
        commonEvent.dispatch(EventType.CLICK_EXIT);
    }

    clickPaytableBtn() {
        console.log("点击赔付按钮")
        commonEvent.dispatch(EventType.MENU_UI_CLOSE);
        commonEvent.dispatch(EventType.PAYTABLE_UI_OPEN);
    }
    
    clickRuleBtn() {
        console.log("点击规则按钮")
        commonEvent.dispatch(EventType.MENU_UI_CLOSE);
        commonEvent.dispatch(EventType.RULE_UI_OPEN);
    }

    clickCloseBtn() {
        console.log("点击关闭按钮")
        commonEvent.dispatch(EventType.MENU_UI_CLOSE);
        commonEvent.dispatch(EventType.CONTROL_UI_OPEN);
        this.allBtnEnabled(false);
    }

    clickHistBtn() {
        console.log("点击历史按钮")
        commonEvent.dispatch(EventType.MENU_UI_CLOSE);
        commonEvent.dispatch(EventType.HIST_UI_OPEN);
    }

    clickSoundBtn() {
        this.modeInfo.sound = !this.modeInfo.sound;
        console.log("点击声音按钮:" + this.modeInfo.sound)
        this.updateSoundBtn();
        commonEvent.dispatch(EventType.CLICK_SOUND, this.modeInfo);
    }

    /**
     * 按钮是否可点
     * @param bool 是否可点
     */
    private allBtnEnabled(bool:boolean) {
        this.exitBtn.enabled = 
        this.soundBtn.enabled = 
        this.paytableBtn.enabled = 
        this.ruleBtn.enabled = 
        this.histBtn.enabled = 
        this.closeBtn.enabled = bool;
    }
}