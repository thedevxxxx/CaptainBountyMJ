import { Button, Node, Size, Sprite, Vec2 } from "cc";
import pq_UIFactory from "../pq_UIFactory";

export default class pq_Menu {

    public constructor(parent: Node, pq_UIFactory: pq_UIFactory) {
        this.createUI(parent, pq_UIFactory);
    }

    public destroy() {

    }

    private createUI(parent: Node, pq_UIFactory: pq_UIFactory) {
        const background = pq_UIFactory.createSprite({
            parent: parent,
            name: ""
        }, {
            contentSize: new Size(257, 93),
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/images/pq_menu_di/spriteFrame"
        }, {
            left: 0,
            top: 128.5
        });

        const button = pq_UIFactory.createButton({
            parent: background.node,
            name: ""
        }, {
            position: new Vec2(-5, 0),
            transition: Button.Transition.NONE,
            onClick: () => { }
        }, {
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.RAW,
            spriteFramePath: "pq/images/pq_btn_menu/spriteFrame"
        });

        const buttonIcon = pq_UIFactory.createSprite({
            parent: button.node,
            name: ""
        }, {
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.RAW,
            spriteFramePath: "pq/images/pq_txt_lhj/spriteFrame"
        })
    }
}