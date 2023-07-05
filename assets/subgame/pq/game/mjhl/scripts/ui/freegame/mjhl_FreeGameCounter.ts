import { Sprite, SpriteFrame, Size, Layout } from "cc";
import { Node } from "cc";
import mjhl_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class mjhl_FreeGameCounter {

    private mjhl_UIFactory: mjhl_UIFactory;

    private rootNode: Node;

    private layoutNode: Node;

    public constructor(parent: Node, mjhl_UIFactory: mjhl_UIFactory) {
        this.mjhl_UIFactory = mjhl_UIFactory;
        this.createUI(parent, mjhl_UIFactory);
    }

    public destroy() {
        this.rootNode.destroy();
    }

    public async setFreeCount(count: number) {
        const nubmers = count.toString().split("");
        let sprites = this.layoutNode.getComponentsInChildren(Sprite);
        if (nubmers.length !== sprites.length) {
            if (nubmers.length > sprites.length) {
                const lack = (nubmers.length - sprites.length);
                for (let index = 0; index < lack; index++) {
                    const sprite = this.mjhl_UIFactory.createSprite({
                        parent: this.layoutNode,
                        name: ""
                    }, {
                        name: "digits",
                        sizeMode: Sprite.SizeMode.RAW,
                        type: Sprite.Type.SIMPLE
                    });
                }
            } else {
                const redundantCount = (sprites.length - nubmers.length)
                for (let index = 0; index < redundantCount; index++) {
                    const child = this.layoutNode.children[0];
                    child.setParent(null);
                    child.destroy();
                }
            }
        }

        sprites = this.layoutNode.getComponentsInChildren(Sprite);

        for (let index = 0; index < nubmers.length; index++) {
            const sprite = sprites[index];
            const number = nubmers[index];
            sprite.spriteFrame = await this.mjhl_UIFactory.assetRepository.getAsset<SpriteFrame>(`mjhl/images/freegame/num/mjhl_num_gold_guang_${number}/spriteFrame`, SpriteFrame);
        }
    }

    public show() {
        this.rootNode.active = true;
    }

    public hide() {
        this.rootNode.active = false;
    }

    private createUI(parent: Node, mjhl_UIFactory: mjhl_UIFactory) {
        const rootNode = mjhl_UIFactory.createNode({
            parent: parent,
            name: "mjhl_FreeGameCounter"
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });
        this.rootNode = rootNode;

        const remainingFreeCountText = mjhl_UIFactory.createSprite({
            parent: rootNode,
            name: ""
        }, {
            contentSize: new Size(407 * 0.9, 188 * 0.9),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "mjhl/images/freegame/mjhl_txt_restFreeGame/spriteFrame"
        }, {
            left: 70,
            top: 60,
        });

        const layoutNode = mjhl_UIFactory.createNode({
            parent: rootNode,
            name: "layout"
        });
        mjhl_UIFactory.addHorizontalLayout(layoutNode, {
            resizeMode: Layout.ResizeMode.CONTAINER
        });
        mjhl_UIFactory.addWidget(layoutNode, {
            horizontalCenter: 180,
            top: 90
        });
        this.layoutNode = layoutNode;
    }
}