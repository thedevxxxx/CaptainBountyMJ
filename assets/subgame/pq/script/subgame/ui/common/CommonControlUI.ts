import { _decorator, Component, Button, UIOpacity, Sprite, Color, Tween, tween, Node, Vec3} from 'cc';
import { commonEvent, EventType } from '../../../event/CommonEventManage';
import { CommonAmountInfo } from '../../info/CommonAmountInfo';
import { CommonModeInfo } from '../../info/CommonModeInfo';
import { ICommonUI } from '../../interface/ICommonUI';
const { ccclass, property } = _decorator;
import { CommonStartBtn } from './CommonStartBtn';
import Tweens from '../../common/Tweens';
import AnimationPlayer from '../../../animations/AnimationPlayer';
import { sp } from 'cc';
import CommonToastForControl, { ToastState } from './CommonToastForControl';
 
@ccclass('CommonControlUI')
export class CommonControlUI extends Component implements ICommonUI {

    private addBtn:Button;
    private minusBtn:Button;
    private startBtn:Button;
    private turboBtn:Button;
    private autoBtn:Button;
    private menuBtn:Button;
    private toast: CommonToastForControl;

    private startSkinBtn:CommonStartBtn;

    private modeInfo:CommonModeInfo;
    private amountInfo:CommonAmountInfo;

    private origPos:Vec3;
    private hidePos:Vec3;
    private showTween:Tween<Node>;
    private turboAnimSke: sp.Skeleton;
    private turboAnim: AnimationPlayer;

    onLoad () {
        this.addBtn = this.node.getChildByName('layout').getChildByName('add_btn').getComponent(Button);
        this.minusBtn = this.node.getChildByName('layout').getChildByName('minus_btn').getComponent(Button);
        this.startBtn = this.node.getChildByName('layout').getChildByName('start_btn').getComponent(Button);
        this.turboBtn = this.node.getChildByName('layout').getChildByName('turbo_btn').getComponent(Button);
        this.autoBtn = this.node.getChildByName('layout').getChildByName('auto_btn').getComponent(Button);
        this.menuBtn = this.node.getChildByName('layout').getChildByName('menu_btn').getComponent(Button);
        this.toast = this.node.getChildByName('layout').getChildByName('CommonToastForControl').getComponent(CommonToastForControl);
        this.turboAnimSke = this.node.getChildByName('layout').getChildByName('turbo_btn').getChildByName('ske_lighting').getComponent(sp.Skeleton);

        this.origPos = new Vec3(this.node.x, this.node.y);
        this.hidePos = new Vec3(this.node.x, this.node.y * 1.5);

        Tweens.addScaleEffect(this.turboBtn.node);
        Tweens.addScaleEffect(this.autoBtn.node);
        Tweens.addOpacityEffect(this.menuBtn.node);
        Tweens.addOpacityEffect(this.addBtn.node);
        Tweens.addOpacityEffect(this.minusBtn.node);

        this.turboAnim = new AnimationPlayer(this.turboAnimSke);

        this.toast.show(false);

        this.addEvent();
    }

    onDestroy() {
        this.removeEvent();
        this.stopShowTween();
        this.turboAnim?.destroy();
        this.turboAnim = null;
    }

    private stopShowTween() {
        if (this.showTween != null) {
            this.showTween.stop();
            this.showTween = null;
        }
    }

    private addEvent() {
        commonEvent.register(EventType.CHIP_INDEX_MIN, this, this.onChipIndexMin.bind(this));
        commonEvent.register(EventType.CHIP_INDEX_MAX, this, this.onChipIndexMax.bind(this));
        commonEvent.register(EventType.CHIP_INDEX_MIDDLE, this, this.onChipIndexMiddle.bind(this));
        commonEvent.register(EventType.CHIP_UPDATE, this, this.onChipUpdate.bind(this));
        commonEvent.register(EventType.CONTROL_UI_OPEN, this, this.open.bind(this));
        commonEvent.register(EventType.CONTROL_UI_CLOSE, this, this.close.bind(this));
    }

    private removeEvent() {
        commonEvent.unregister(EventType.CHIP_INDEX_MIN, this);
        commonEvent.unregister(EventType.CHIP_INDEX_MAX, this);
        commonEvent.unregister(EventType.CHIP_INDEX_MIDDLE, this);
        commonEvent.unregister(EventType.CHIP_UPDATE, this);
        commonEvent.unregister(EventType.CONTROL_UI_OPEN, this);
        commonEvent.unregister(EventType.CONTROL_UI_CLOSE, this);
    }

    private onChipIndexMin() {
        this.minusBtn.getComponent(UIOpacity).opacity = 100;
    }

    private onChipIndexMax() {
        this.addBtn.getComponent(UIOpacity).opacity = 100;
    }

    private onChipIndexMiddle() {
        this.minusBtn.getComponent(UIOpacity).opacity = 255;
        this.addBtn.getComponent(UIOpacity).opacity = 255;
    }

    private onChipUpdate(amountInfo:CommonAmountInfo) {
        let index = amountInfo.chipArr.indexOf(amountInfo.chip);
        if (index == 0) {
            this.onChipIndexMin();
        } else if (index == this.amountInfo.chipArr.length - 1) {
            this.onChipIndexMax();
        } else {
            this.onChipIndexMiddle();
        }
    }



    /**
     * 更新modeinfo
     */
    updateModeInfo(modeInfo:CommonModeInfo) {
        this.modeInfo = modeInfo;
    }

    /**
     * 更新amountInfo
     */
    updateAmountInfo(amountInfo:CommonAmountInfo) {
        this.amountInfo = amountInfo;
    }

    /**
     * 更新btn颜色
     */
    updateBtnColor(normalColor:Color, pressedColor:Color, hoverColor:Color, disabledColor:Color) {
        this.toast.updateColor(normalColor);

        this.updateBtnColorView(this.addBtn, normalColor, pressedColor, hoverColor, disabledColor);
        this.updateBtnColorView(this.minusBtn, normalColor, pressedColor, hoverColor, disabledColor);
        this.updateBtnColorView(this.startBtn, normalColor, pressedColor, hoverColor, disabledColor);
        this.updateBtnColorView(this.turboBtn, normalColor, pressedColor, hoverColor, disabledColor);
        this.updateBtnColorView(this.autoBtn, normalColor, pressedColor, hoverColor, disabledColor);
        // this.updateBtnColorView(this.menuBtn, normalColor, pressedColor, hoverColor, disabledColor);

        this.updateSproteColorView(this.turboBtn.node.getChildByName("txt_turbo_on").getComponent(Sprite), normalColor);
        this.updateSproteColorView(this.turboBtn.node.getChildByName("txt_turbo_off").getComponent(Sprite), normalColor);
        this.updateSproteColorView(this.autoBtn.node.getChildByName("auto_icon").getComponent(Sprite), normalColor);
        
        this.turboAnimSke.color.set(normalColor.r, normalColor.g, normalColor.b, 255);
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

    private updateSproteColorView(sp:Sprite, color:Color) {
        sp.color = color;
    }

    open() {
        this.node.active = true;
        this.allBtnEnabled(true);
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

    //更新极速按钮
    private updateTurboBtn() {
        this.turboAnim.stopAnimation();
        if (this.modeInfo.turbo) {
            this.turboBtn.node.getChildByName("txt_turbo_on").active = true;
            this.turboBtn.node.getChildByName("txt_turbo_off").active = false;
            this.turboAnim.playAnimationLoop("active");
            this.toast.show(true, ToastState.TURBO_ON);
        } else {
            this.turboBtn.node.getChildByName("txt_turbo_on").active = false;
            this.turboBtn.node.getChildByName("txt_turbo_off").active = true;
            this.toast.show(true, ToastState.TURBO_OFF);
        }
    }

    /**
     * 设置自动状态
     * @param autoNum 
     */
    private setAutoState(autoNum:number) {
        if (autoNum == 0) {
            this.addBtn.interactable = 
            this.minusBtn.interactable = 
            this.menuBtn.interactable = 
            this.autoBtn.interactable = true;

            this.addBtn.getComponent(UIOpacity).opacity = 
            this.minusBtn.getComponent(UIOpacity).opacity = 
            this.menuBtn.getComponent(UIOpacity).opacity = 
            this.autoBtn.getComponent(UIOpacity).opacity = 255;
            this.onChipUpdate(this.amountInfo);
        } else {
            this.addBtn.interactable = 
            this.minusBtn.interactable = 
            this.menuBtn.interactable = 
            this.autoBtn.interactable = false;

            this.addBtn.getComponent(UIOpacity).opacity = 
            this.minusBtn.getComponent(UIOpacity).opacity = 
            this.menuBtn.getComponent(UIOpacity).opacity = 
            this.autoBtn.getComponent(UIOpacity).opacity = 100;
        }
    }

    //====================================开始按钮状态

    /**
     * 
     * @param startBtn 开始按钮
     */
    public setStartBtn(startBtn:CommonStartBtn) {
        this.startSkinBtn = startBtn;
        this.startSkinBtn.init();
    }

    /**
     * 开始按钮自动模式
     * @param num   显示自动次数
     */
    public setAuto(num:number) {
        console.log("开始按钮自动模式")
        this.startSkinBtn.setAuto(num);
        this.setAutoState(num);
        this.addBtn.enabled = 
        this.minusBtn.enabled = 
        this.autoBtn.enabled = false;
    }

    /**
     * 开始按钮慢转
     */
    public playSlow() {
        console.log("开始按钮慢转")
        this.startSkinBtn.playSlow();
        this.setAutoState(0);
        this.addBtn.enabled = 
        this.minusBtn.enabled = 
        this.autoBtn.enabled = true;
    }

    /**
     * 开始按钮快转
     */
     public playFast() {
        console.log("开始按钮快转")
        this.startSkinBtn.playFast();
        this.addBtn.enabled = 
        this.minusBtn.enabled = 
        this.autoBtn.enabled = false;
    }


    //====================================点击事件

    clickStartBtn() {
        let data = {
            "amountInfo": this.amountInfo,
            "modeInfo": this.modeInfo,
        }
        console.log("点击开始按钮 modeInfo:", data)
        commonEvent.dispatch(EventType.CLICK_START, data);
    }

    clickAutoBtn() {
        console.log("点击自动按钮:" + this.modeInfo.auto)
        // commonEvent.dispatch(EventType.CONTROL_UI_CLOSE);
        commonEvent.dispatch(EventType.AUTO_UI_OPEN);
    }

    clickTurboBtn() {
        this.modeInfo.turbo = !this.modeInfo.turbo;
        this.updateTurboBtn();
        console.log("点击极速按钮:" + this.modeInfo.turbo)
    }

    clickMinusBtn() {
        console.log("点击-按钮")
        commonEvent.dispatch(EventType.CHIP_MINUS);
        const idx = this.amountInfo.chipArr.indexOf(this.amountInfo.chip);
        if (idx == 0) {
            this.toast.show(true, ToastState.IS_BET_MIN);
        }
    }

    clickAddBtn() {
        console.log("点击+按钮")
        commonEvent.dispatch(EventType.CHIP_ADD);
        const idx = this.amountInfo.chipArr.indexOf(this.amountInfo.chip);
        if (idx == this.amountInfo.chipArr.length - 1) {
            this.toast.show(true, ToastState.IS_BET_MAX);
        }
    }

    clickMenuBtn() {
        console.log("点击菜单按钮")
        commonEvent.dispatch(EventType.CONTROL_UI_CLOSE);
        commonEvent.dispatch(EventType.MENU_UI_OPEN);
        this.allBtnEnabled(false);
    }

    
    /**
     * 按钮是否可点
     * @param bool 是否可点
     */
     private allBtnEnabled(bool:boolean) {
        this.addBtn.enabled = 
        this.minusBtn.enabled = 
        this.startBtn.enabled = 
        this.turboBtn.enabled = 
        this.autoBtn.enabled = 
        this.menuBtn.enabled = bool;
    }
}