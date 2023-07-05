import { Sprite, SpriteFrame, Size, Layout } from "cc";
import { Node } from "cc";
import mahjongWays2_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { _decorator, Component } from "cc";
import { Label } from "cc";

const { ccclass,property } = _decorator;
@ccclass('mahjongWays2_FreeGameCounterComponent')
export default class mahjongWays2_FreeGameCounterComponent extends Component {

    // @property(Node)
    // layoutNode:Node = null;

    @property(Node)
    remainingFreeCountNum:Node = null;
    
    //private mahjongWays2_UIFactory: mahjongWays2_UIFactory;

    // private rootNode: Node;

    // private layoutNode: Node;

    // public constructor(parent: Node, mahjongWays2_UIFactory: mahjongWays2_UIFactory) {
    //     this.mahjongWays2_UIFactory = mahjongWays2_UIFactory;
    //     this.createUI(parent, mahjongWays2_UIFactory);
    // }


    public async setFreeCount(count: number) {
         const nubmers = count.toString().split("");
        this.remainingFreeCountNum.getComponent(Label).string = nubmers+"";

    }
    // public async setFreeCount(count: number) {
        // const nubmers = count.toString().split("");
        // let sprites = this.layoutNode.getComponentsInChildren(Sprite);
        // if (nubmers.length !== sprites.length) {
        //     if (nubmers.length > sprites.length) {
        //         const lack = (nubmers.length - sprites.length);
        //         for (let index = 0; index < lack; index++) {
        //             const sprite = mahjongWays2_UIFactory.createSprite({
        //                 parent: this.layoutNode,
        //                 name: ""
        //             }, {
        //                 name: "digits",
        //                 sizeMode: Sprite.SizeMode.RAW,
        //                 type: Sprite.Type.SIMPLE
        //             });
        //         }
        //     } else {
        //         const redundantCount = (sprites.length - nubmers.length)
        //         for (let index = 0; index < redundantCount; index++) {
        //             const child = this.layoutNode.children[0];
        //             child.setParent(null);
        //             child.destroy();
        //         }
        //     }
        // }

        // sprites = this.layoutNode.getComponentsInChildren(Sprite);

        // for (let index = 0; index < nubmers.length; index++) {
        //     const sprite = sprites[index];
        //     const number = nubmers[index];
        //     sprite.spriteFrame = await this.mahjongWays2_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways2/images/freegame/num/mahjongWays2_num_gold_guang_${number}/spriteFrame`, SpriteFrame);
        // }
    // }

    public show() {
        this.node.active = true;
    }

    public hide() {
        this.node.active = false;
    }

    // private createUI(parent: Node, mahjongWays2_UIFactory: mahjongWays2_UIFactory) {
    //     // const rootNode = mahjongWays2_UIFactory.createNode({
    //     //     parent: parent,
    //     //     name: "mahjongWays2_FreeGameCounter"
    //     // }, {
    //     //     top: 0,
    //     //     bottom: 0,
    //     //     left: 0,
    //     //     right: 0
    //     // });
    //     // this.rootNode = rootNode;

    //     const remainingFreeCountText = mahjongWays2_UIFactory.createSprite({
    //         parent: rootNode,
    //         name: ""
    //     }, {
    //         contentSize: new Size(407 * 0.9, 188 * 0.9),
    //         type: Sprite.Type.SIMPLE,
    //         sizeMode: Sprite.SizeMode.CUSTOM,
    //         spriteFramePath: "mahjong-ways2/images/freegame/mahjongWays2_txt_restFreeGame/spriteFrame"
    //     }, {
    //         left: 70,
    //         top: 60,
    //     });

    //     const layoutNode = mahjongWays2_UIFactory.createNode({
    //         parent: rootNode,
    //         name: "layout"
    //     });
    //     mahjongWays2_UIFactory.addHorizontalLayout(layoutNode, {
    //         resizeMode: Layout.ResizeMode.CONTAINER
    //     });
    //     mahjongWays2_UIFactory.addWidget(layoutNode, {
    //         horizontalCenter: 180,
    //         top: 90
    //     });
    //     this.layoutNode = layoutNode;
    // }
}