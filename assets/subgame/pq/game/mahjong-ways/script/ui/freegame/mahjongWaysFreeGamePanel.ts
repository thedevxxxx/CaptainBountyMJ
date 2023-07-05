
import { Sprite } from 'cc';
import { _decorator, Component, Node } from 'cc';
import TweenPlayer from '../../../../../script/animations/TweenPlayer';
import { Label } from 'cc';
import AnimationPlayer from '../../../../../script/animations/AnimationPlayer';
import { mahjongWaysNetManager as netMgr ,mahjongWaysEventType} from '../../network/mahjongWaysNetManager';

import { delay } from "../../../../../script/subgame/common/BaseTimer";
import { sp } from 'cc';
import { tween } from 'cc';
import { UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('mahjongWaysFreeGamePanel')
export class mahjongWaysFreeGamePanel extends Component {

    @property(Node)
    baseNode: Node;
    
    @property(Label)
    counterLabel: Label;

    @property(Sprite)
    goldBackgroud: Sprite;

    @property(Sprite)
    mahjongBackground: Sprite;

    @property(Sprite)
    starryBackground: Sprite;

    @property(Label)
    freeGameTimesNum: Label;

    @property(Node)
    effectSkeletonNode: Node;
    private buttonEffectAnimationPlayer: AnimationPlayer;


    timeoutId = undefined;

    private diffusionTween: TweenPlayer<{ value: number }>;
    private startNodeTween: TweenPlayer<{ value: number }>;



    start () {
        this.initUi();
        this.addEvent();

    }

    initUi(){
        this.counterLabel.string = "";
        this.baseNode.active = false;
        this.diffusionTween = new TweenPlayer();
        this.startNodeTween = new TweenPlayer();
        this.buttonEffectAnimationPlayer = new AnimationPlayer(this.effectSkeletonNode.getComponent(sp.Skeleton));
    }

    addEvent(){
        netMgr.evRepo.register("onShowFreeSpinTranstion", this, this.onShowFreeSpinTranstion.bind(this));
    }

    protected removeEvent() {
        netMgr.evRepo.unregister("onShowFreeSpinTranstion", this);
    }

    onShowFreeSpinTranstion(data: any){

        if(data.isShow){
            this.startClickCountdown();
            this.startDiffusionTween();
            this.counterLabel.string = data.count.toString();

            this.baseNode.getComponent(UIOpacity).opacity = 0;
            this.baseNode.active = true;
            this.startTween(true);
        }else{
            this.stopClickCountdown();
            this.diffusionTween.stopTween();
            this.counterLabel.string = "";        
            this.buttonEffectAnimationPlayer.stopAnimation();
            this.baseNode.getComponent(UIOpacity).opacity = 255;
            this.startTween(false);

            // this.baseNode.active s= false;
        }
    }


    private async onButtonClicked() {
        this.buttonEffectAnimationPlayer.stopAnimation();
        this.buttonEffectAnimationPlayer.playAnimationOnce("animation");
        await delay(500);
        this.onShowFreeSpinTranstion(false);
    }


    onDestroy() {
        this.diffusionTween.destroy();
        this.diffusionTween = null;
        this.buttonEffectAnimationPlayer.destroy();
        this.buttonEffectAnimationPlayer = null;
        this.stopClickCountdown();
        this.removeEvent();
    }
    
    private startClickCountdown() {
        this.timeoutId = undefined;

        this.timeoutId = setTimeout(() => {
            this.onButtonClicked();
        }, 5000);
    }

    private stopClickCountdown() {
        if (this.timeoutId != null) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    private startDiffusionTween() {
        this.diffusionTween.stopTween();
        const object = { value: 1 };
        this.diffusionTween.tween = tween(object)
            .by(1, { value: 0.01 }, {
                onUpdate: (object: { value: number }) => {
                    const value = object.value;
                    this.goldBackgroud.node.setScale(value, value);
                    this.mahjongBackground.node.setScale(value, value);
                    this.starryBackground.node.setScale(value * 5, value * 53);
                }
            })
            .repeatForever()
            .start();
    }


    private startTween(setting:boolean) {
        this.startNodeTween.stopTween();
        const object = { value:  setting? 1:255 };
        this.startNodeTween.tween = tween(object)
            .by(1, { value: setting? 255:-255}, {
                onUpdate: (object: { value: number }) => {
                    const value = object.value;
                    this.baseNode.getComponent(UIOpacity).opacity = value;
                    if(value <= 0)this.baseNode.active = false;
                }
            })
            .start();
    }

}

