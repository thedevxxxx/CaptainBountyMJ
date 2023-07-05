import { Component, Label, tween, Tween, UIOpacity, _decorator } from "cc";
const { ccclass, property } = _decorator;
@ccclass('CommonToast')
export default class CommonToast  extends Component {

    private fadeoutTween: Tween<UIOpacity>;

    @property(Label)
    content:Label = null;


    onLoad () {
    }

    onDestroy() {
    }

    public open(params: string) {
        this.stopFadeoutTween();
        this.node.getComponent(UIOpacity).opacity = 255;
        this.content.string = params;
        this.startFadeoutTween(() => {
            this.stopFadeoutTween();
        });
    }

    private startFadeoutTween(onComplete: (toast: CommonToast) => void) {
        const opacity = this.node.getComponent(UIOpacity);
        this.fadeoutTween = tween(opacity)
            .delay(2.8)
            .to(0.2, { opacity: 0 }, {
                onComplete: () => {
                    this.node.active = false;
                }
            })
            .start();
    }

    private stopFadeoutTween() {
        if (this.fadeoutTween != null) {
            this.fadeoutTween.stop();
            this.fadeoutTween = null;
        }
    }
}