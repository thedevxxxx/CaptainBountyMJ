import { Sprite, Label, Tween, Vec2, Size, Color, Layout, tween, RenderComponent, Node, Vec3, UIOpacity } from "cc";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class pqui_BlackToast {

    private background: Sprite;

    private label: Label;

    private backgroundNodeTween: Tween<Node>;

    private opacityTween: Tween<UIOpacity>;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory) {
        const background = pqui_UIFactory.createSprite({
            parent: parent,
            name: ""
        }, {
            position: new Vec2(0, -280),
            contentSize: new Size(62, 62),
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            color: new Color(0, 0, 0),
            spriteFramePath: "pq/pqui/images/pqui_dark_circle/spriteFrame",
        });
        background.addComponent(UIOpacity);
        this.background = background;
        pqui_UIFactory.addHorizontalLayout(background.node, {
            resizeMode: Layout.ResizeMode.CONTAINER,
            paddingLeft: 20,
            paddingRight: 20
        });

        const label = pqui_UIFactory.createLabel({
            parent: background.node,
            name: ""
        }, {
            verticalAlign: Label.VerticalAlign.CENTER,
            horizontalAlign: Label.HorizontalAlign.CENTER,
            color: Color.WHITE,
            fontSize: 32
        });
        this.label = label;
    }

    public destroy() {
        try {
            this.stopTween();
        } catch (error) {
            console.log(`[pqui_Toast]${error}`);
        }
    }

    public popUp(toastParameter: BlackToastParameter) {
        this.stopTween();
        this.label.string = toastParameter.content;
        for (let index = 0; index < toastParameter.extraContent?.length; index++) {
            const node = toastParameter.extraContent[index].node;
            node.setParent(this.background.node);
            node.setSiblingIndex(index);
        }
        this.startTween();
    }

    private startTween() {
        this.backgroundNodeTween = tween(this.background.node)
            .to(0.1, { scale: new Vec3(1.25, 1.25) })
            .to(0.1, { scale: Vec3.ONE })
            .delay(3)
            .call(() => this.startTween())
            .start()

        this.opacityTween = tween(this.background.getComponent(UIOpacity))
            .delay(3)
            .to(0.1, { opacity: 0 })
            .start();
    }

    private stopTween() {
        if (this.backgroundNodeTween != null) {
            this.backgroundNodeTween.stop();
            this.backgroundNodeTween = null;
            this.background.node.setScale(Vec3.ONE);
            this.background.node.children.forEach(node => {
                if (node !== this.label.node) {
                    node.destroy();
                }
            });
        }

        if (this.opacityTween != null) {
            this.opacityTween.stop();
            this.opacityTween = null;
            this.background.getComponent(UIOpacity).opacity = 255;
        }
    }
}

export interface BlackToastParameter {
    content: string;
    extraContent?: Array<RenderComponent>
}