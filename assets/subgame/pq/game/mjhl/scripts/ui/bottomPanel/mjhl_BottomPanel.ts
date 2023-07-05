import { KeyCode, Node, Size, sp, Sprite, Vec2, Vec3 } from "cc";
import AnimationPlayer from "../animations/AnimationPlayer";
import mjhl_FreeGameCounter from "../freegame/mjhl_FreeGameCounter";
import mjhl_EventRepository,{FreeGameParameter} from "../../../../../script/event/pq_EventRepository";
import mjhl_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { log } from "cc";

export default class mjhl_BottomPanel {

    private mjhl_EventRepository: mjhl_EventRepository;

    private mjhl_FreeGameCounter: mjhl_FreeGameCounter;

    private waysBackgroundNode: Node;

    private backgroudNode: Node;

    private finalFreeGameText: Sprite;

    private particleSkeleton: sp.Skeleton;

    private particleAnimationPlayer: AnimationPlayer;

    public constructor() {

    }

    public async init(bottomPanelParameter: BottomPanelParameter) {
        const parent = bottomPanelParameter.parent;
        const mjhl_UIFactory = bottomPanelParameter.mjhl_UIFactory;
        const mjhl_EventRepository = bottomPanelParameter.mjhl_EventRepository;

        this.mjhl_EventRepository = mjhl_EventRepository;

        await this.createUI(parent, mjhl_UIFactory);

        this.mjhl_FreeGameCounter.hide();
        this.hideFinalFreeGame();

        mjhl_EventRepository.onFreeGameCount.Attach(this.onFreeGameCount);
        mjhl_EventRepository.onBaseGame.Attach(this.onBaseGame);

        return this;
    }

    public destroy() {
        this.particleAnimationPlayer.destroy();
        this.particleAnimationPlayer = null;
        this.mjhl_EventRepository.onFreeGameCount.Detach(this.onFreeGameCount);
        this.mjhl_EventRepository.onBaseGame.Detach(this.onBaseGame);
        this.mjhl_FreeGameCounter.destroy()
    }

    private async createUI(parent: Node, mjhl_UIFactory: mjhl_UIFactory) {
        const backgroud = mjhl_UIFactory.createSprite({
            parent: parent,
            name: ""
        }, {
            name: "mjhl_BottomBackground",
            contentSize: new Size(750, 578),
            spriteFramePath: "mjhl/images/mjhl_bottom_bg/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        }, {
            bottom: -200
        });
        this.backgroudNode = backgroud.node;

        log('bonus_bg_particle load')
        const particleSkeletonNode = hqq.addNode(backgroud.node,{
            Res:hqq['pq'],
            skeleton:"game/mjhl/animations/spines/bonus_bg_particle/",
            name:"particle",
            scale:1.736
        });
        this.particleAnimationPlayer = new AnimationPlayer(particleSkeletonNode.getComponent(sp.Skeleton));

        const frameBackground = mjhl_UIFactory.createSprite({
            parent: backgroud.node,
            name: ""
        }, {
            position: new Vec2(0, 325.009),
            name: "mjhl_FrameBackground",
            spriteFramePath: "mjhl/images/mjhl_bottom_bar/spriteFrame",
            sizeMode: Sprite.SizeMode.RAW,
            type: Sprite.Type.SIMPLE
        });

        this.mjhl_FreeGameCounter = new mjhl_FreeGameCounter(backgroud.node, mjhl_UIFactory);

        const finalFreeGameText = mjhl_UIFactory.createSprite({
            parent: backgroud.node,
            name: ""
        }, {
            contentSize: new Size(584, 104),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "mjhl/images/freegame/mjhl_txt_lastFreeGame/spriteFrame"
        }, {
            horizontalCenter: 0,
            top: 100
        });
        this.finalFreeGameText = finalFreeGameText
    }

    private onFreeGameCount = (freeGameParameter: FreeGameParameter) => {
        const freeGameCount = freeGameParameter.freeGameCount;
        if (freeGameCount === 0) {
            this.mjhl_FreeGameCounter.hide();
            this.showFinalFreeGame();
        } else {
            this.mjhl_FreeGameCounter.setFreeCount(freeGameCount);
            this.mjhl_FreeGameCounter.show();
            this.particleAnimationPlayer.playAnimationLoop("bonus_bg_particle");
        }
    }

    private onBaseGame = () => {
        this.mjhl_FreeGameCounter.hide();
        this.hideFinalFreeGame();
        this.particleAnimationPlayer.stopAnimation();
    }

    private showFinalFreeGame() {
        this.finalFreeGameText.node.active = true;
    }

    private hideFinalFreeGame() {
        this.finalFreeGameText.node.active = false;
    }
}

interface BottomPanelParameter {
    parent: Node;
    mjhl_UIFactory: mjhl_UIFactory;
    mjhl_EventRepository: mjhl_EventRepository;
}