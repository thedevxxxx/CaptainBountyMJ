import { Sprite, Size, Vec3, Label, Color, Vec2, Button, Node, BlockInputEvents } from "cc";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class pqui_Popup {

    private rootNode: Node;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, popupParameter: PopupParameter, onDestroy: Function) {
        this.createUI(parent, pqui_UIFactory, popupParameter, onDestroy);
    }

    public destroy() {
        this.rootNode.destroy();
        console.log("[pqui_Popup] destroy");
    }

    private createUI(parent: Node, pqui_UIFactory: pqui_UIFactory, popupParameter: PopupParameter, onDestroy: Function) {
        const rootNode = pqui_UIFactory.createBlockInput({
            parent: parent,
            name: ""
        }).node;
        rootNode.addComponent(BlockInputEvents);
        this.rootNode = rootNode;

        const background = pqui_UIFactory.createSprite({
            parent: rootNode,
            name: ""
        }, {
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_white/spriteFrame",
            color: new Color(0, 0, 0, 128)
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        });

        const popupBackground = pqui_UIFactory.createSprite({
            parent: rootNode,
            name: ""
        }, {
            contentSize: new Size(600, 327),
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            color: new Color(50, 50, 61),
            spriteFramePath: "pq/pqui/images/pqui_white_square/spriteFrame"
        });

        const titleLabel = pqui_UIFactory.createLabel({
            parent: popupBackground.node,
            name: ""
        }, {
            position: new Vec3(0, 110),
            contentSize: new Size(600, 50),
            anchorPoint: new Vec2(0.5, 0.5),
            horizontalAlign: Label.HorizontalAlign.CENTER,
            verticalAlign: Label.VerticalAlign.CENTER,
            fontSize: 36,
            lineHeight: 50,
            overflow: Label.Overflow.SHRINK,
            color: Color.WHITE,
            isBold: true
        });
        titleLabel.string = popupParameter.title;

        const contentLabel = pqui_UIFactory.createLabel({
            parent: popupBackground.node,
            name: ""
        }, {
            anchorPoint: new Vec2(0.5, 0.5),
            position: new Vec3(0, 30),
            contentSize: new Size(600, 100),
            horizontalAlign: Label.HorizontalAlign.CENTER,
            verticalAlign: Label.VerticalAlign.CENTER,
            fontSize: 26,
            lineHeight: 30,
            overflow: Label.Overflow.SHRINK,
            color: Color.WHITE,
            isBold: true

        });
        contentLabel.string = popupParameter.content;

        const popupButtonParameters = popupParameter.popupButtonParameters;

        const popupButtonParametersCount = popupButtonParameters.length;
        for (let index = 0; index < popupButtonParametersCount; index++) {
            const popupButtonParameter = popupButtonParameters[index];
            const onClicked = popupButtonParameter.onClicked;
            const title = popupButtonParameter.title;
            const contentSize = (popupButtonParametersCount > 1) ? (new Size(235, 80)) : (new Size(470, 80));
            const position = (popupButtonParametersCount > 1) ? (new Vec2((-125 + (250 * index)), -90)) : (new Vec2(0, -90));

            const button = pqui_UIFactory.createButton({
                parent: popupBackground.node,
                name: ""
            }, {
                contentSize: contentSize,
                position: position,
                onClick: () => {
                    onClicked?.();
                    this.destroy();
                    onDestroy();
                },
                transition: Button.Transition.NONE,
            }, {
                type: Sprite.Type.SLICED,
                sizeMode: Sprite.SizeMode.CUSTOM,
                spriteFramePath: "pq/pqui/images/pqui_white_square/spriteFrame",
                color: new Color(179, 120, 80)
            }, {
                string: title,
                color: Color.WHITE,
                fontSize: 24
            });
        }
    }
}

export interface PopupParameter {

    title: string;

    content: string;

    popupButtonParameters: Array<PopupButtonParameter>;
}

interface PopupButtonParameter {

    title?: string;

    onClicked?: Function;
}