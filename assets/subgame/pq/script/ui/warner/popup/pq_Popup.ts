import { Sprite, Size, Vec3, Label, Color, Vec2, Button, Node } from "cc";
import pq_UIFactory from "../../pq_UIFactory";

export default class pq_Popup {

    private rootNode: Node;

    public constructor(parent: Node, pq_UIFactory: pq_UIFactory, popupParameter: PopupParameter, onDestroy: Function) {
        this.createUI(parent, pq_UIFactory, popupParameter, onDestroy);
    }

    public destroy() {
        this.rootNode.destroy();
        console.log("[pq_Popup] destroy");
    }

    private createUI(parent: Node, pq_UIFactory: pq_UIFactory, popupParameter: PopupParameter, onDestroy: Function) {
        const rootNode = pq_UIFactory.createSprite({
            parent: parent,
            name: ""
        }, {
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.RAW,
            spriteFramePath: "pq/images/pq_mask/spriteFrame"
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }).node;
        this.rootNode = rootNode;
        const block = pq_UIFactory.createBlockInput({
            parent: rootNode,
            name: "block"
        });

        const background = pq_UIFactory.createSprite({
            parent: rootNode,
            name: ""
        }, {
            contentSize: new Size(845, 436),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.RAW,
            spriteFramePath: "pq/images/pq_bindtip/spriteFrame"
        });

        const label = pq_UIFactory.createLabel({
            parent: background.node,
            name: ""
        }, {
            position: new Vec3(0, 60),
            contentSize: new Size(700, 240),
            horizontalAlign: Label.HorizontalAlign.CENTER,
            verticalAlign: Label.VerticalAlign.CENTER,
            fontSize: 36,
            lineHeight: 36,
            overflow: Label.Overflow.SHRINK,
            color: new Color(210, 163, 126)
        });
        label.string = popupParameter.content;//??

        const confirmButton = pq_UIFactory.createButton({
            parent: background.node,
            name: ""
        }, {
            position: new Vec2(-160, -120),
            onClick: () => {
                popupParameter.onConfirmButtonClick?.();
                this.destroy();
                onDestroy();
            },
            transition: Button.Transition.SCALE,
        }, {
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.RAW,
            spriteFramePath: "pq/images/pq_surebtn/spriteFrame"
        });

        const cancelButton = pq_UIFactory.createButton({
            parent: background.node,
            name: ""
        }, {
            position: new Vec2(160, -120),
            onClick: () => {
                popupParameter.onCancelButtonClick?.();
                this.destroy();
                onDestroy();
            },
            transition: Button.Transition.SCALE,
        }, {
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.RAW,
            spriteFramePath: "pq/images/pq_cancelbtn/spriteFrame"
        });

        const closeButton = pq_UIFactory.createButton({
            parent: background.node,
            name: ""
        }, {
            position: new Vec2(400, 200),
            onClick: () => {
                popupParameter.onCloseButtonClick?.();
                this.destroy();
                onDestroy();
            },
            transition: Button.Transition.SCALE,
        }, {
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.RAW,
            spriteFramePath: "pq/images/pq_close/spriteFrame"
        });

        cancelButton.node.active = (popupParameter.onCancelButtonClick != null);
        closeButton.node.active = (popupParameter.onCloseButtonClick != null);

        confirmButton.node.x = (cancelButton.node.active) ? -160 : 0;
    }
}

export interface PopupParameter {

    content: string;

    onConfirmButtonClick?: Function;

    onCancelButtonClick?: Function;

    onCloseButtonClick?: Function;
}