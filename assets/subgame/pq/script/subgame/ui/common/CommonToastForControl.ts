import { Component, _decorator } from "cc";
import STool, { DCom } from "../../common/STool";
import { Color } from "cc";
import Tweens from "../../common/Tweens";
const { ccclass } = _decorator;

@ccclass('CommonToastForControl')
export default class CommonToastForControl extends Component {
    private subNodes: {[idx: string]: DCom};
    private timeout: ReturnType<typeof setTimeout>;
    private _onLoad: boolean = false;
    private _color: Color;
    private _isShow: boolean;
    private _state: ToastState;
    
    onLoad () {
        this.subNodes = STool.getAllNode([
            'toast/turbo_on',
            'toast/turbo_off',
            'toast/content'
        ], this.node);

        this._onLoad = true;
    }

    start(): void {
        if (this._color) {
            this.updateColor(this._color);
        }

        this.show(this._isShow, this._state);
    }

    updateColor(color: Color): void {
        if (this._onLoad) {
            this.subNodes['toast/turbo_on'].color = color;
            this.subNodes['toast/turbo_off'].color = color;
        } else {
            this._color = color;
        }
    }

    show(bool: boolean = true, state: ToastState = ToastState.NONE): void {
        if (this._onLoad) {
            this.subNodes['toast/turbo_on'].show(false);
            this.subNodes['toast/turbo_off'].show(false);
            switch(state) {
                case ToastState.IS_BET_MAX:
                    this.subNodes['toast/content'].label = '最大投注';
                    break;
                case ToastState.IS_BET_MIN:
                    this.subNodes['toast/content'].label = '最小投注';
                    break;
                case ToastState.TURBO_ON:
                    this.subNodes['toast/turbo_on'].show();
                    this.subNodes['toast/content'].label = '极速旋转已开启';
                    break;
                case ToastState.TURBO_OFF:
                    this.subNodes['toast/turbo_off'].show();
                    this.subNodes['toast/content'].label = '极速旋转已关闭';
                    break;
            }
            clearTimeout(this.timeout);
            this.node.active = bool;

            if (bool) {
                Tweens.startBouncingTween(this.node);
                this.timeout = setTimeout(() => {
                    this.node.active = false;
                }, 1000);
            }
        } else {
            this._isShow = bool;
            this._state = state;
        }
    }
}

export enum ToastState {
    NONE,
    TURBO_ON,
    TURBO_OFF,
    IS_BET_MAX,
    IS_BET_MIN,
}