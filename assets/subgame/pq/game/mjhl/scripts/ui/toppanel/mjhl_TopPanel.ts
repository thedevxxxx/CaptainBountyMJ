import { Node, Sprite, Vec2, Size, UIOpacity, Vec3, sp, SpriteFrame } from "cc";
import AnimationPlayer from "../animations/AnimationPlayer";
import mjhl_Multipler from "../multiplier/mjhl_Multiplier";
import mjhl_EventRepository,{FreeGameParameter} from "../../../../../script/event/pq_EventRepository";
import mjhl_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { log } from "cc";

export default class mjhl_TopPanel {

    private mjhl_EventRepository: mjhl_EventRepository;

    private waysBackgroundNode: Node;

    private multiplierBackground: Sprite;

    private mjhl_Multipler: mjhl_Multipler;

    private particleAnimationPlayer: AnimationPlayer;

    private baseGameBarSpriteFrame: SpriteFrame;

    private freeGameBarSpriteFrame: SpriteFrame;

    public constructor() {

    }

    public async init(topPanelParameter: TopPanelParameter) {
        const parent = topPanelParameter.parent;
        const mjhl_UIFactory = topPanelParameter.mjhl_UIFactory;
        const mjhl_EventRepository = topPanelParameter.mjhl_EventRepository;

        this.mjhl_EventRepository = mjhl_EventRepository;

        await this.createUI(parent, mjhl_UIFactory);

        this.mjhl_Multipler = await new mjhl_Multipler().init({
            parent: this.multiplierBackground.node,
            mjhl_UIFactory: mjhl_UIFactory,
            mjhl_EventRepository: mjhl_EventRepository
        });

        this.baseGameBarSpriteFrame = await mjhl_UIFactory.assetRepository.getAsset("mjhl/images/mjhl_top_bar/spriteFrame", SpriteFrame);
        this.freeGameBarSpriteFrame = await mjhl_UIFactory.assetRepository.getAsset("mjhl/images/bonus_top_b/spriteFrame", SpriteFrame);

        mjhl_EventRepository.onFreeGameCount.Attach(this.onFreeGameCount);
        mjhl_EventRepository.onBaseGame.Attach(this.onBaseGame);
        mjhl_EventRepository.onStartFreeGameButtonClicked.Attach(() => {
            this.multiplierBackground.spriteFrame = this.freeGameBarSpriteFrame;
        });

        return this;
    }

    public destroy() {
        try {
            this.particleAnimationPlayer.destroy();
            this.particleAnimationPlayer = null;
            this.mjhl_EventRepository.onFreeGameCount.Detach(this.onFreeGameCount);
            this.mjhl_EventRepository.onBaseGame.Detach(this.onBaseGame);
            this.mjhl_Multipler.destroy();
        } catch (error) {
            console.log(`[mjhl_TopPanel] ${error}`);
        }
    }

    private async createUI(parent: Node, mjhl_UIFactory: mjhl_UIFactory) {
        const backgroud = mjhl_UIFactory.createSprite({
            parent: parent,
            name: "",
        }, {
            name: "mjhl_TopBackground",
            spriteFramePath: "mjhl/images/mjhl_top_bg/spriteFrame",
            sizeMode: Sprite.SizeMode.RAW,
            type: Sprite.Type.SIMPLE
        }, {
            top: -60
        });

        log('bonus_bg_particle load')
        const particleSkeletonNode = hqq.addNode(backgroud.node,{
            Res:hqq['pq'],
            skeleton:"game/mjhl/animations/spines/bonus_bg_particle/",
            name:"particle",
            timeScale: 0.5,scaleX:1.736,scaleY:-1.736,widget:{bottom: 0}
        }); 
        this.particleAnimationPlayer = new AnimationPlayer(particleSkeletonNode.getComponent(sp.Skeleton));

        const multiplierBackground = mjhl_UIFactory.createSprite({
            parent: backgroud.node,
            name: ""
        }, {
            position: new Vec2(0, -79.8),
            name: "mjhl_MultiplierBackground",
            spriteFramePath: "mjhl/images/mjhl_top_bar/spriteFrame",
            sizeMode: Sprite.SizeMode.RAW,
            type: Sprite.Type.SIMPLE
        });
        this.multiplierBackground = multiplierBackground;

        const waysBackground = mjhl_UIFactory.createSprite({
            parent: backgroud.node,
            name: ""
        }, {
            position: new Vec2(0, 11.35),
            name: "mjhl_WaysBackground",
            spriteFramePath: "mjhl/images/mjhl_top_bar2/spriteFrame",
            sizeMode: Sprite.SizeMode.RAW,
            type: Sprite.Type.SIMPLE
        });
        this.waysBackgroundNode = waysBackground.node;

        const title = mjhl_UIFactory.createSprite({
            parent: waysBackground.node,
            name: ""
        }, {
            contentSize: new Size(440 * 0.7, 60 * 0.7),
            name: "mjhl_title",
            spriteFramePath: "mjhl/images/mjhl_top_title/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        });


        //backgroud.node.addComponent(UIOpacity).opacity = 50;//??debug
        //multiplierBackground.addComponent(UIOpacity).opacity = 50;//??debug
        //waysBackground.addComponent(UIOpacity).opacity = 50;//??debug
    }

    private onFreeGameCount = (freeGameParameter: FreeGameParameter) => {
        const freeGameCount = freeGameParameter.freeGameCount;
        if (freeGameCount === 0) {

        } else {
            this.particleAnimationPlayer.playAnimationLoop("bonus_bg_particle");
        }
        this.multiplierBackground.spriteFrame = this.freeGameBarSpriteFrame;
    }

    private onBaseGame = () => {
        this.particleAnimationPlayer.stopAnimation();
        this.multiplierBackground.spriteFrame = this.baseGameBarSpriteFrame;
    }
}

interface TopPanelParameter {
    parent: Node;
    mjhl_UIFactory: mjhl_UIFactory;
    mjhl_EventRepository: mjhl_EventRepository;
}