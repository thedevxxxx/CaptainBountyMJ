import { KeyCode, Node, Size, sp, Sprite, Vec2, Vec3 } from "cc";
import AnimationPlayer from "../../animations/mahjongWays_AnimationPlayer";
// import mahjongWays_FreeGameCounterComponent from "../../../scripts/ui/freegame/mahjongWays_FreeGameCounterComponent";
import {FreeGameParameter}  from "../../../scripts/type/mahjongWays_Types";
import { mahjongWaysNetManager as netMgr ,mahjongWaysEventType} from '../../network/mahjongWaysNetManager';
import { log } from "cc";
import { _decorator, Component } from "cc";
import { SpriteFrame } from "cc";
import { Label } from "cc";

const { ccclass,property } = _decorator;
@ccclass('mahjongWays_BottomPanelComponent')
export default class mahjongWays_BottomPanelComponent extends Component{

    @property(Node)
    finalFreeGameText:Node = null;

    @property(Node)
    freeGameCounter:Node = null;

    @property(Label)
    freeGameCounterNum:Label = null;

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
        netMgr.evRepo.register("onFreeGameCount", this, this.onFreeGameCount.bind(this));
        netMgr.evRepo.register("onBaseGame", this, this.onBaseGame.bind(this));
    }

    protected removeEvent() {
        netMgr.evRepo.unregister("onFreeGameCount", this);
        netMgr.evRepo.unregister("onBaseGame", this);
    }

    onDestroy() {
        this.removeEvent();
        this.particleAnimationPlayer.destroy();
        this.particleAnimationPlayer = null;
        this.freeGameCounter.destroy()
    }


    // private async createUI(parent: Node, mahjongWays_UIFactory: mahjongWays_UIFactory) {
    //     const backgroud = mahjongWays_UIFactory.createSprite({
    //         parent: parent,
    //         name: ""
    //     }, {
    //         name: "mahjongWays_BottomBackground",
    //         contentSize: new Size(750, 578),
    //         spriteFramePath: "mahjong-ways/images/mahjongWays_bottom_bg/spriteFrame",
    //         sizeMode: Sprite.SizeMode.CUSTOM,
    //         type: Sprite.Type.SIMPLE
    //     }, {
    //         bottom: -200
    //     });
    //     this.backgroudNode = backgroud.node;

    //     log('bonus_bg_particle load')
    //     const particleSkeletonNode = hqq.addNode(backgroud.node,{
    //         Res:hqq['pq'],
    //         skeleton:"game/mahjong-ways/animations/spines/bonus_bg_particle/",
    //         name:"particle",
    //         scale:1.736
    //     });
    //     this.particleAnimationPlayer = new AnimationPlayer(particleSkeletonNode.getComponent(sp.Skeleton));

    //     const frameBackground = mahjongWays_UIFactory.createSprite({
    //         parent: backgroud.node,
    //         name: ""
    //     }, {
    //         position: new Vec2(0, 325.009),
    //         name: "mahjongWays_FrameBackground",
    //         spriteFramePath: "mahjong-ways/images/mahjongWays_bottom_bar/spriteFrame",
    //         sizeMode: Sprite.SizeMode.RAW,
    //         type: Sprite.Type.SIMPLE
    //     });

    //     this.mahjongWays_FreeGameCounter = new mahjongWays_FreeGameCounter(backgroud.node, mahjongWays_UIFactory);

    //     const finalFreeGameText = mahjongWays_UIFactory.createSprite({
    //         parent: backgroud.node,
    //         name: ""
    //     }, {
    //         contentSize: new Size(584, 104),
    //         type: Sprite.Type.SIMPLE,
    //         sizeMode: Sprite.SizeMode.CUSTOM,
    //         spriteFramePath: "mahjong-ways/images/freegame/mahjongWays_txt_lastFreeGame/spriteFrame"
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
            this.freeGameCounterNum.getComponent(Label).string = freeGameCount+"";
            this.freeGameCounter.active = true;
            this.particleAnimationPlayer.playAnimationLoop("bonus_bg_particle");
        }
    }

    private onBaseGame = () => {
        this.freeGameCounter.active = false;
        this.hideFinalFreeGame();
        this.particleSkeletonNode.active = false;
        this.particleAnimationPlayer.stopAnimation();
    }

    private showFinalFreeGame() {
        this.finalFreeGameText.active = true;
    }

    private hideFinalFreeGame() {
        this.finalFreeGameText.active = false;
    }
}
