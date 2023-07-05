import { animation } from "cc";
import { sp } from "cc";
import { SpriteFrame, Node, Sprite, Vec2, Vec3 ,Animation} from "cc";
import { _decorator, Component } from "cc";
import AnimationPlayer from "../../../../../script/animations/AnimationPlayer";

const { ccclass ,property} = _decorator;
@ccclass('mahjongWays2_MultipleNumber')
export default class mahjongWays2_MultipleNumber extends Component{

    private backgroundNode:Node = null;

    private particle:Node = null;
    private particleSkeleton:sp.Skeleton;
    private particleAnimationPlayer: AnimationPlayer;
    
    private onNum:Node = null;

    private offNum:Node = null;

    protected onLoad(): void {
        this.initUI();
    }

    private initUI() {
        console.log("initUI_mahjongWays2_MultipleNumber");
        this.backgroundNode = this.node.getChildByName("mahjongWays2_multiplier_vfx_a_screen");
        this.particle = this.node.getChildByName("particle");
        this.particleSkeleton = this.particle.getComponent(sp.Skeleton);
        this.particleAnimationPlayer = new AnimationPlayer(this.particleSkeleton);
        this.onNum = this.node.getChildByName("onNum");
        this.offNum = this.node.getChildByName("offNum");
    }

    public async switchAll(flag:boolean) {
        console.log("switchAll_mahjongWays2_MultipleNumber");

        this.backgroundNode.active = flag;
        this.onNum.active = flag;
        this.particle.active = flag;
        this.offNum.active = flag;
    }

    public async switchText(flag: boolean,particleFlag:boolean,onNumAnim:boolean) {
        this.backgroundNode.active = flag;
        this.onNum.active = flag;

        this.onNum.getComponent(Animation).play('multiplierNum');
        this.particleAnimationPlayer.stopAnimation();
        if(particleFlag) this.particleAnimationPlayer.playAnimationOnce("animation");
        this.particle.active = particleFlag;
        this.offNum.active = !flag;
    }

}