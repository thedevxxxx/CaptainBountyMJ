import { Color, Label, Node, Size, Sprite, Tween, tween, UIOpacity } from "cc";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class GrayToast {

    private rootNode: Node;

    private fadeoutTween: Tween<UIOpacity>;

    private label: Label;

    private onDestroy: (grayToast: GrayToast) => void;

    constructor() {

    }

    public async init(parent: Node, garyToastParameter: string, onDestroy: (grayToast: GrayToast) => void, pqui_UIFactory: pqui_UIFactory) {
        const sprite = await pqui_UIFactory.createSpriteAsync({
            parent: parent
        }, {
            contentSize: new Size(500, 120),
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_white_square/spriteFrame",
            color: new Color(50, 50, 60, 250),
        }, {
            bottom: 40,
            target: pqui_UIFactory.canvasNode,
        });
        sprite.addComponent(UIOpacity);
        this.rootNode = sprite.node;

        const label = pqui_UIFactory.createLabel({
            parent: sprite.node
        }, {
            string: garyToastParameter,
            color: Color.WHITE,
            fontSize: 32,
        });
        this.label = label;

        this.onDestroy = onDestroy;

        return this;
    }

    public destroy() {
        this.stopFadeoutTween();
        this.rootNode.destroy();
        console.log(`[GrayToast] destroy`);
    }

    public popUp(content: string) {
        this.stopFadeoutTween();
        this.rootNode.getComponent(UIOpacity).opacity = 255;
        this.label.string = content;
        this.startFadeoutTween(() => {
            this.onDestroy(this);
            this.destroy();
        });
    }

    private startFadeoutTween(onComplete: (grayToast: GrayToast) => void) {
        const opacity = this.rootNode.getComponent(UIOpacity);
        this.fadeoutTween = tween(opacity)
            .delay(2.8)
            .to(0.2, { opacity: 0 }, {
                onComplete: () => {
                    onComplete(this);
                    this.destroy();
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

export interface GrayToastParameter {

    content?: string;
}