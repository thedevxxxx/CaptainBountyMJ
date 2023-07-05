import { Node, Sprite, Size, Layout, Button, SpriteFrame, isValid } from "cc";
import mahjongWays2_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class mahjongWays2_FreeGameTitle {

    private mahjongWays2_UIFactory: mahjongWays2_UIFactory;

    private rootNode: Node;

    private layoutNode: Node;

    private timeout: ReturnType<typeof setTimeout>;

    private lifeTimeSeconds: number;

    public constructor(mahjongWays2_FreeGamePanelParameter: mahjongWays2_FreeGameTitleParameter) {
        const mahjongWays2_UIFactory = mahjongWays2_FreeGamePanelParameter.mahjongWays2_UIFactory;
        const freeGameCount = mahjongWays2_FreeGamePanelParameter.freeGameCount;
        this.lifeTimeSeconds = mahjongWays2_FreeGamePanelParameter.lifeTimeSeconds;
        this.mahjongWays2_UIFactory = mahjongWays2_UIFactory;

        this.createUI(mahjongWays2_FreeGamePanelParameter);

        this.setFreeCountLabel(freeGameCount);

        this.startKillSelf();
    }

    private startKillSelf() {
        if (this.lifeTimeSeconds == null) {
            console.log(`[mahjongWays2_FreeGameTitle] lifeTimeSeconds is null`);
            return;
        }
        const milliseconds = this.lifeTimeSeconds * 1000;
        setTimeout(() => {
            this.destroy();
        }, milliseconds);
    }

    private stopKillSelf() {
        if (this.timeout != null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    public destroy() {
        this.stopKillSelf();
        if (isValid(this.rootNode, true)) {
            this.rootNode.destroy();
        }
    }

    private createUI(mahjongWays2_FreeGamePanelParameter: mahjongWays2_FreeGameTitleParameter) {
        const parent = mahjongWays2_FreeGamePanelParameter.parent;
        const mahjongWays2_UIFactory = mahjongWays2_FreeGamePanelParameter.mahjongWays2_UIFactory;

        const rootNode = mahjongWays2_UIFactory.createNode({
            parent: parent,
            name: "mahjongWays2_FreeGamePanel"
        });
        this.rootNode = rootNode;
        mahjongWays2_UIFactory.addWidget(rootNode, { top: 0, bottom: 0, left: 0, right: 0 });

        const title = mahjongWays2_UIFactory.createSprite({
            parent: rootNode,
            name: ""
        }, {
            name: "title",
            spriteFramePath: "mahjong-ways2/images/freegame/mahjongWays2_txt_winFreeGame/spriteFrame",
            sizeMode: Sprite.SizeMode.RAW,
            type: Sprite.Type.SIMPLE
        }, {
            top: 250
        });

        const layoutNode = mahjongWays2_UIFactory.createNode({
            parent: rootNode,
            name: "layout"
        });
        mahjongWays2_UIFactory.addHorizontalLayout(layoutNode, {
            resizeMode: Layout.ResizeMode.CONTAINER
        });
        mahjongWays2_UIFactory.addWidget(layoutNode, { top: 450 });
        this.layoutNode = layoutNode;
    }

    private async setFreeCountLabel(count: number) {
        const nubmers = count.toString().split("");
        let sprites = this.layoutNode.getComponentsInChildren(Sprite);
        if (nubmers.length !== sprites.length) {
            if (nubmers.length > sprites.length) {
                const lack = (nubmers.length - sprites.length);
                for (let index = 0; index < lack; index++) {
                    const sprite = this.mahjongWays2_UIFactory.createSprite({
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
            sprite.spriteFrame = await this.mahjongWays2_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways2/images/freegame/num/mahjongWays2_num_gold_guang_${number}/spriteFrame`, SpriteFrame);
        }
    }
}

interface mahjongWays2_FreeGameTitleParameter {
    parent: Node;
    mahjongWays2_UIFactory: mahjongWays2_UIFactory;
    freeGameCount: number;
    lifeTimeSeconds: number;
}