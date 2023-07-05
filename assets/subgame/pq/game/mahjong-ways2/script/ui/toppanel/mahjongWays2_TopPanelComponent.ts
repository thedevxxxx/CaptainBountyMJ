import { Node, Sprite, Vec2, Size, UIOpacity, Vec3, sp, SpriteFrame } from "cc";
import AnimationPlayer from "../../animations/mahjongWays2_AnimationPlayer";
// import mahjongWays2_Multipler from "../multiplier/mahjongWays2_Multipler";
import mahjongWays2_EventRepository,{FreeGameParameter} from "../../../../../script/event/pq_EventRepository";
import mahjongWays2_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { log } from "cc";
import { _decorator, Component } from "cc";

const { ccclass,property } = _decorator;
@ccclass('mahjongWays2_TopPanelParameter')
export default class mahjongWays2_TopPanelComponent extends Component {

    @property(Node)
    multiplierBackground:Node = null;

    @property(Node)
    multiplierBackgroundBonus:Node = null;

    @property(SpriteFrame)
    freeGameBarSpriteFrame:SpriteFrame = null;

    @property(SpriteFrame)
    baseGameBarSpriteFrame:SpriteFrame = null;

    @property(Node)
    particleAnimationPlayerNode:Node = null;

    private particleAnimationPlayer: AnimationPlayer;

    // private mahjongWays2_Multipler: mahjongWays2_Multipler;

    protected start(): void {
        this.initUI();
        this.addEvent();
    }

    private addEvent() {
        mahjongWays2_EventRepository.getInstance().onFreeGameCount.Attach(this.onFreeGameCount);
        mahjongWays2_EventRepository.getInstance().onBaseGame.Attach(this.onBaseGame);
        mahjongWays2_EventRepository.getInstance().onStartFreeGameButtonClicked.Attach(() => {
            this.multiplierBackgroundBonus.active = true;
        });    
    }

    private initUI() {
        this.multiplierBackgroundBonus.active = false;
        this.particleAnimationPlayer = new AnimationPlayer(this.particleAnimationPlayerNode.getComponent(sp.Skeleton));
    }

    public onDestroy() {
        try {
            this.particleAnimationPlayer.destroy();
            this.particleAnimationPlayer = null;
            mahjongWays2_EventRepository.getInstance().onFreeGameCount.Detach(this.onFreeGameCount);
            mahjongWays2_EventRepository.getInstance().onBaseGame.Detach(this.onBaseGame);
            // this.mahjongWays2_Multipler.destroy();
        } catch (error) {
            console.log(`[mahjongWays2_TopPanel] ${error}`);
        }
    }

    private async createUI(parent: Node, mahjongWays2_UIFactory: mahjongWays2_UIFactory) {
        const backgroud = mahjongWays2_UIFactory.createSprite({
            parent: parent,
            name: "",
        }, {
            name: "mahjongWays2_TopBackground",
            spriteFramePath: "mahjong-ways2/mahjongWays2_images/mahjongWays2_ui_bg_a/spriteFrame",
            sizeMode: Sprite.SizeMode.RAW,
            type: Sprite.Type.SIMPLE
        }, {
            top: -60
        });

        log('bonus_bg_particle load')
        const particleSkeletonNode = hqq.addNode(backgroud.node,{
            Res:hqq['pq'],
            skeleton:"game/mahjong-ways2/animations/spines/bonus_bg_particle/",
            name:"particle",
            timeScale: 0.5,scaleX:1.736,scaleY:-1.736,widget:{bottom: 0}
        }); 
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
}
