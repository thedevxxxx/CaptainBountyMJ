import { KeyCode, Node, Size, sp, Sprite, Vec2, Vec3 } from "cc";
import AnimationPlayer from "../../animations/mahjongWays2_AnimationPlayer";
import mahjongWays2_FreeGameCounterComponent from "../../../scripts/ui/freegame/mahjongWays2_FreeGameCounterComponent";
import mahjongWays2_EventRepository,{FreeGameParameter} from "../../../../../script/event/pq_EventRepository";
import mahjongWays2_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { log } from "cc";
import { _decorator, Component } from "cc";
import { SpriteFrame } from "cc";

const { ccclass,property } = _decorator;
@ccclass('mahjongWays2_BottomPanelComponent')
export default class mahjongWays2_BottomPanelComponent extends Component{

    @property(Node)
    finalFreeGameText:Node = null;

    @property(Node)
    freeGameCounter:Node = null;

    @property(Node)
    backgroudNode:Node = null;

    @property(Node)
    particleSkeletonNode:Node = null;

    private particleAnimationPlayer: AnimationPlayer;

    protected start(): void {
        this.addEvent();
        this.hideFinalFreeGame();
        this.freeGameCounter.active = false;
        this.particleAnimationPlayer = new AnimationPlayer(this.particleSkeletonNode.getComponent(sp.Skeleton));

    }

    private addEvent() {
        mahjongWays2_EventRepository.getInstance().onFreeGameCount.Attach(this.onFreeGameCount);
        mahjongWays2_EventRepository.getInstance().onBaseGame.Attach(this.onBaseGame);
    }

    onDestroy() {
        this.particleAnimationPlayer.destroy();
        this.particleAnimationPlayer = null;
        mahjongWays2_EventRepository.getInstance().onFreeGameCount.Detach(this.onFreeGameCount);
        mahjongWays2_EventRepository.getInstance().onBaseGame.Detach(this.onBaseGame);
        this.freeGameCounter.destroy()
    }

    // private async createUI(parent: Node, mahjongWays2_UIFactory: mahjongWays2_UIFactory) {
    //     const backgroud = mahjongWays2_UIFactory.createSprite({
    //         parent: parent,
    //         name: ""
    //     }, {
    //         name: "mahjongWays2_BottomBackground",
    //         contentSize: new Size(750, 578),
    //         spriteFramePath: "mahjong-ways2/images/mahjongWays2_bottom_bg/spriteFrame",
    //         sizeMode: Sprite.SizeMode.CUSTOM,
    //         type: Sprite.Type.SIMPLE
    //     }, {
    //         bottom: -200
    //     });
    //     this.backgroudNode = backgroud.node;

    //     log('bonus_bg_particle load')
    //     const particleSkeletonNode = hqq.addNode(backgroud.node,{
    //         Res:hqq['pq'],
    //         skeleton:"game/mahjong-ways2/animations/spines/bonus_bg_particle/",
    //         name:"particle",
    //         scale:1.736
    //     });
    //     this.particleAnimationPlayer = new AnimationPlayer(particleSkeletonNode.getComponent(sp.Skeleton));

    //     const frameBackground = mahjongWays2_UIFactory.createSprite({
    //         parent: backgroud.node,
    //         name: ""
    //     }, {
    //         position: new Vec2(0, 325.009),
    //         name: "mahjongWays2_FrameBackground",
    //         spriteFramePath: "mahjong-ways2/images/mahjongWays2_bottom_bar/spriteFrame",
    //         sizeMode: Sprite.SizeMode.RAW,
    //         type: Sprite.Type.SIMPLE
    //     });

    //     this.mahjongWays2_FreeGameCounter = new mahjongWays2_FreeGameCounter(backgroud.node, mahjongWays2_UIFactory);

    //     const finalFreeGameText = mahjongWays2_UIFactory.createSprite({
    //         parent: backgroud.node,
    //         name: ""
    //     }, {
    //         contentSize: new Size(584, 104),
    //         type: Sprite.Type.SIMPLE,
    //         sizeMode: Sprite.SizeMode.CUSTOM,
    //         spriteFramePath: "mahjong-ways2/images/freegame/mahjongWays2_txt_lastFreeGame/spriteFrame"
    //     }, {
    //         horizontalCenter: 0,
    //         top: 100
    //     });
    //     this.finalFreeGameText = finalFreeGameText
    // }

    private onFreeGameCount = (freeGameParameter: FreeGameParameter) => {
        const freeGameCount = freeGameParameter.freeGameCount;
        if (freeGameCount === 0) {
            this.freeGameCounter.active = false;
            this.showFinalFreeGame();
        } else {
            //this.mahjongWays2_FreeGameCounter.setFreeCount(freeGameCount);
            this.freeGameCounter.getComponent(mahjongWays2_FreeGameCounterComponent).setFreeCount(freeGameCount);
            this.freeGameCounter.active = true;
            this.particleAnimationPlayer.playAnimationLoop("bonus_bg_particle");
        }
    }

    private onBaseGame = () => {
        this.freeGameCounter.active = false;
        this.hideFinalFreeGame();
        this.particleAnimationPlayer.stopAnimation();
    }

    private showFinalFreeGame() {
        this.finalFreeGameText.active = true;
    }

    private hideFinalFreeGame() {
        this.finalFreeGameText.active = false;
    }
}

interface BottomPanelParameter {
    parent: Node;
    mahjongWays2_UIFactory: mahjongWays2_UIFactory;
    mahjongWays2_EventRepository: mahjongWays2_EventRepository;
}
