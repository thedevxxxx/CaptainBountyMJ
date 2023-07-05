import { Node, Sprite, Size, Layout, Button, SpriteFrame, isValid } from "cc";
import mjhl_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class mjhl_FreeGameTitle {

    private mjhl_UIFactory: mjhl_UIFactory;

    private rootNode: Node;

    private layoutNode: Node;

    private timeout: ReturnType<typeof setTimeout>;

    private lifeTimeSeconds: number;

    public constructor(mjhl_FreeGamePanelParameter: mjhl_FreeGameTitleParameter) {
        const mjhl_UIFactory = mjhl_FreeGamePanelParameter.mjhl_UIFactory;
        const freeGameCount = mjhl_FreeGamePanelParameter.freeGameCount;
        this.lifeTimeSeconds = mjhl_FreeGamePanelParameter.lifeTimeSeconds;
        this.mjhl_UIFactory = mjhl_UIFactory;

        this.createUI(mjhl_FreeGamePanelParameter);

        this.setFreeCountLabel(freeGameCount);

        this.startKillSelf();
    }

    private startKillSelf() {
        if (this.lifeTimeSeconds == null) {
            console.log(`[mjhl_FreeGameTitle] lifeTimeSeconds is null`);
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

    private createUI(mjhl_FreeGamePanelParameter: mjhl_FreeGameTitleParameter) {
        const parent = mjhl_FreeGamePanelParameter.parent;
        const mjhl_UIFactory = mjhl_FreeGamePanelParameter.mjhl_UIFactory;

        const rootNode = mjhl_UIFactory.createNode({
            parent: parent,
            name: "mjhl_FreeGamePanel"
        });
        this.rootNode = rootNode;
        mjhl_UIFactory.addWidget(rootNode, { top: 0, bottom: 0, left: 0, right: 0 });

        const title = mjhl_UIFactory.createSprite({
            parent: rootNode,
            name: ""
        }, {
            name: "title",
            spriteFramePath: "mjhl/images/freegame/mjhl_txt_winFreeGame/spriteFrame",
            sizeMode: Sprite.SizeMode.RAW,
            type: Sprite.Type.SIMPLE
        }, {
            top: 250
        });

        const layoutNode = mjhl_UIFactory.createNode({
            parent: rootNode,
            name: "layout"
        });
        mjhl_UIFactory.addHorizontalLayout(layoutNode, {
            resizeMode: Layout.ResizeMode.CONTAINER
        });
        mjhl_UIFactory.addWidget(layoutNode, { top: 450 });
        this.layoutNode = layoutNode;
    }

    private async setFreeCountLabel(count: number) {
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
}

interface mjhl_FreeGameTitleParameter {
    parent: Node;
    mjhl_UIFactory: mjhl_UIFactory;
    freeGameCount: number;
    lifeTimeSeconds: number;
}