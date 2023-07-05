import { Node, Sprite, Vec2, Size, UIOpacity, Vec3, sp, SpriteFrame } from "cc";
import AnimationPlayer from "../../animations/mahjongWays_AnimationPlayer";
import { mahjongWaysNetManager as netMgr ,mahjongWaysEventType} from '../../network/mahjongWaysNetManager';
import {FreeGameParameter}  from "../../../scripts/type/mahjongWays_Types";
import { _decorator, Component } from "cc";

const { ccclass,property } = _decorator;
@ccclass('mahjongWays_TopPanelComponent')
export default class mahjongWays_TopPanelComponent extends Component {



    @property(Node)
    multiplierBackgroundBonus:Node = null;

    @property(Node)
    particleSkeletonNode:Node = null;

    private particleAnimationPlayer: AnimationPlayer;

    protected start(): void {
        this.initUI();
        this.addEvent();
    }

    private addEvent() {
        netMgr.evRepo.register("onFreeGameCount", this, this.onFreeGameCount.bind(this));
        netMgr.evRepo.register("onBaseGame", this, this.onBaseGame.bind(this));
        netMgr.evRepo.register("onStartFreeGameButtonClicked", this, this.onStartFreeGameButtonClicked.bind(this)); 
    }

    protected removeEvent() {
        netMgr.evRepo.unregister("onFreeGameCount", this);
        netMgr.evRepo.unregister("onBaseGame", this);
        netMgr.evRepo.unregister("onStartFreeGameButtonClicked", this);     
    }


    private initUI() {
        this.multiplierBackgroundBonus.active = false;
        this.particleAnimationPlayer = new AnimationPlayer(this.particleSkeletonNode.getComponent(sp.Skeleton));
    }

    public onDestroy() {
        this.removeEvent();
        try {
            this.particleAnimationPlayer.destroy();
            this.particleAnimationPlayer = null;
        } catch (error) {
            console.log(`[mahjongWays_TopPanel] ${error}`);
        }
    }

    private onFreeGameCount = (freeGameParameter: FreeGameParameter) => {
        const freeGameCount = freeGameParameter.freeGameCount;
        if (freeGameCount === 0) {

        } else {
            this.particleAnimationPlayer.playAnimationLoop("bonus_bg_particle");
        }
        this.multiplierBackgroundBonus.active = true;
    }

    private onBaseGame = () => {
        this.particleAnimationPlayer.stopAnimation();
        this.multiplierBackgroundBonus.active = false;
    }

    private onStartFreeGameButtonClicked = () => {
        this.multiplierBackgroundBonus.active = true;
    }
}
