import { _decorator, Component, Node, Sprite, Tween, tween, Vec3, Label } from 'cc';
import { ICommonStartBtn } from '../../interface/ICommonUI';
const { ccclass, property } = _decorator;
@ccclass('CommonStartBtn')
export class CommonStartBtn extends Component implements ICommonStartBtn {
    @property(Sprite)
    startAutoBg:Sprite;           //自动状态底图

    @property(Sprite)
    startNormalBg:Sprite;         //普通状态底图

    @property(Sprite)
    startNormalArrow:Sprite;      //普通状态箭头

    @property(Sprite)
    startBlurArrow:Sprite;        //普通状态模糊箭头

    @property(Sprite)
    startDisabledArrow:Sprite;    //不可点状态箭头

    @property(Sprite)
    startBlurDisabledArrow:Sprite;//不可点模糊状态箭头

    @property(Label)
    autoLabel:Label;              //自动次数Label

    starBtnState:BTN_STATE = BTN_STATE.IDLE     //按钮状态

    private turnTween: Tween<Node>;
    private turnNode: Node;

    init() {
        console.log("初始化开始皮肤按钮")
        this.starBtnState = BTN_STATE.IDLE;
    }

    start () {
        
    }

    onDestroy() {
        this.turnTween.stop();
        this.turnTween = null;
    }

    /**
     * 开始按钮自动模式
     */
    public setAuto(num:number) {
        this.startNormalBg.node.active = false;
        this.startAutoBg.node.active = true;
        this.startNormalArrow.node.active = false;
        this.startBlurArrow.node.active = false;
        this.startDisabledArrow.node.active = false;
        this.startBlurDisabledArrow.node.active = false;

        this.autoLabel.node.active = true;
        this.autoLabel.getComponent(Label).string = num.toString();

        this.stopTurntableTween();
    }

    /**
     * 开始按钮慢转
     */
     public playSlow() {
        this.starBtnState = BTN_STATE.IDLE;
        this.startNormalBg.node.active = true;
        this.startAutoBg.node.active = false;
        this.startNormalArrow.node.active = true;
        this.startBlurArrow.node.active = false;
        this.startDisabledArrow.node.active = false;
        this.startBlurDisabledArrow.node.active = false;
        this.autoLabel.node.active = false;

        this.turnNode = this.startNormalArrow.node;

        this.stopTurntableTween();
        this.startTurntableTween(4);
    }

    /**
     * 开始按钮快转
     */
     public playFast() {
        if(this.starBtnState == BTN_STATE.SPIN) return;
        this.starBtnState = BTN_STATE.SPIN;
        this.startNormalBg.node.active = true;
        this.startAutoBg.node.active = false;
        this.startNormalArrow.node.active = false;
        this.startBlurArrow.node.active = false;
        this.startDisabledArrow.node.active = false;
        this.startBlurDisabledArrow.node.active = true;
        this.autoLabel.node.active = false;

        this.turnNode = this.startBlurDisabledArrow.node;

        this.stopTurntableTween();
        this.startTurntableTween(0.3);

        this.onClickStart();
    }

    onClickStart():void {
        console.log("当点击按钮时执行")
    }

    private stopTurntableTween() {
        if (this.turnTween != null) {
            this.turnTween.stop();

            this.turnNode.eulerAngles = Vec3.ZERO;
            this.turnTween = null;
        }
    }

    private startTurntableTween(duration: number) {

        this.turnTween = tween(this.turnNode)
            .to(duration, { eulerAngles: new Vec3(0, 0, -360) })
            .call(() => this.turnNode.eulerAngles = Vec3.ZERO)
            .union()
            .repeatForever()
            .start();
    }


}

export enum BTN_STATE {
    IDLE = 'IDLE', //空闲
    SPIN = 'SPIN', //旋转
    AUTO = 'AUTO',  //自动
    DISABLED = 'DISABLED', //不可点
}