import { Node, Sprite } from "cc";
import pq_UIFactory from "../pq_UIFactory";

export default class pq_Background {

    public constructor(parent: Node, pq_UIFactory: pq_UIFactory) {
        const background = pq_UIFactory.createSprite({
            parent: parent,
            name: ""
        }, {
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/bigImage/pq_bg/spriteFrame"
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        });
    }

    public destroy() {

    }
}