import { SpriteFrame, Node, Sprite, Vec2, Vec3 } from "cc";
import mjhl_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class mjhl_Multiple {

    public textSprite: Sprite;

    private mjhl_UIFactory: mjhl_UIFactory;

    private index: number;
    backgroundSprite: Sprite;

    //private effect:Animation;

    public constructor(parent: Node, index: number, mjhl_UIFactory: mjhl_UIFactory) {
        this.mjhl_UIFactory = mjhl_UIFactory;

        this.index = index;

        this.createUI(parent, index, mjhl_UIFactory);

        this.hideBackground();
    }

    public destroy() {

    }

    public async setBaseGameTextSpriteSpritFrame(multiple: string) {
        this.hideBackground();
        const path = `mjhl/images/text/beishu_di/mjhl_beishu_brown_${multiple}/spriteFrame`;
        this.textSprite.spriteFrame = await this.mjhl_UIFactory.assetRepository.getAsset<SpriteFrame>(path, SpriteFrame);
    }

    public async setFreeGameTextSpriteSpritFrame(multiple: string) {
        this.hideBackground();
        const path = `mjhl/images/text/beishu_di/mjhl_beishu_red_${multiple}/spriteFrame`;
        this.textSprite.spriteFrame = await this.mjhl_UIFactory.assetRepository.getAsset<SpriteFrame>(path, SpriteFrame);
    }

    public async setCurrentMultipleTextSpriteSpritFrame(multiple: string) {
        this.showBackground();
        const path = `mjhl/images/text/beishu/mjhl_beishu_gold_${multiple}/spriteFrame`;
        this.textSprite.spriteFrame = await this.mjhl_UIFactory.assetRepository.getAsset<SpriteFrame>(path, SpriteFrame);
    }

    private createUI(parent: Node, index: number, mjhl_UIFactory: mjhl_UIFactory) {
        const rootNode = mjhl_UIFactory.createNode({
            parent: parent,
            name: "mjhl_Multiple",
            position: new Vec3(-200 + (index * 130), 5),
        });

        const backgroundSprite = mjhl_UIFactory.createSprite({
            parent: rootNode,
            name: "backgroundSprite",
            scale: new Vec3(2, 2),
            position: new Vec3(0, 20)
        }, {
            sizeMode: Sprite.SizeMode.RAW,
            type: Sprite.Type.SIMPLE,
            spriteFramePath: "mjhl/images/multiplier/multiplier_glow/spriteFrame",
            materialPath: "mjhl/materials/remove-black-material"
        });
        this.backgroundSprite = backgroundSprite;

        const textSprite = mjhl_UIFactory.createSprite({
            parent: rootNode,
            name: "mjhl_Multiple",
        }, {
            sizeMode: Sprite.SizeMode.RAW,
            type: Sprite.Type.SIMPLE
        });
        this.textSprite = textSprite;

        const multiple = ["1", "2", "3", "5"];
        if (index === 0) {
            this.setCurrentMultipleTextSpriteSpritFrame(multiple[index]);
        } else {
            this.setBaseGameTextSpriteSpritFrame(multiple[index]);
        }
    }

    private showBackground() {
        this.backgroundSprite.node.active = true;
    }

    private hideBackground() {
        this.backgroundSprite.node.active = false;
    }
}