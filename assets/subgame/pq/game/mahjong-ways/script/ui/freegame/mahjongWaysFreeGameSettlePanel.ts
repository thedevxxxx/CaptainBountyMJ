
import { Button } from 'cc';
import { Tween } from 'cc';
import { _decorator, Component, Node } from 'cc';
import TweenPlayer from '../../../../../script/animations/TweenPlayer';
const { ccclass, property } = _decorator;
import { delay } from "../../../../../script/subgame/common/BaseTimer";
import AnimationPlayer from '../../../../../script/animations/AnimationPlayer';
import { Label } from 'cc';
import { mahjongWaysNetManager as netMgr ,mahjongWaysEventType} from '../../network/mahjongWaysNetManager';
import { formatGold } from "../../../../../script/formatter/pq_Formatter";
import { tween } from 'cc';
import { UIOpacity } from 'cc';
import { sp } from 'cc';


 
@ccclass('mahjongWaysFreeGameSettlePanel')
export class mahjongWaysFreeGameSettlePanel extends Component {
    @property(Node)
    baseNode: Node;

    @property(Button)
    button: Button;

    @property(Label)
    spriteNumberLabel: Label;
    
    @property(Node)
    spriteNumberDisplayer: Node;

    @property(Node)
    lightAnimation: Node;
    private lightAnimationPlayer: AnimationPlayer;

    @property(Node)
    effectSkeletonNode: Node;
    private particleAnimationPlayer: AnimationPlayer;


    private totalWinTween: Tween<{ value: number; }>;

    // private onButtonClickedCallback: Function;

    private timeout: ReturnType<typeof setTimeout>;

    private endValue: number;

    private shouldFinishTween: boolean;

    private numberTween: Tween<{ value: number }>
    private startNodeTween: TweenPlayer<{ value: number }>;

    private resolve: (value: void | PromiseLike<void>) => void;

    start () {
        this.addEvent();
        this.startNodeTween = new TweenPlayer();
        this.particleAnimationPlayer = new AnimationPlayer(this.effectSkeletonNode.getComponent(sp.Skeleton));
        this.baseNode.active = false;
    }

    addEvent(){
        netMgr.evRepo.register("onShowFreeGameSettlePanel", this, this.onShowFreeGameSettlePanel.bind(this));
    }

    protected removeEvent() {
        netMgr.evRepo.unregister("onShowFreeGameSettlePanel", this);
    }  

    public onDestroy() {
        this.removeEvent();
        this.lightAnimationPlayer?.destroy();
        this.lightAnimationPlayer = null;
        this.particleAnimationPlayer?.destroy();
        this.particleAnimationPlayer = null;
        this.stopClickCountdown();
        this.stopTotalWinTween();
    }

    onBackgroundClicked() {
        this.shouldFinishTween = true;
        this.finishTweenToNumber(this.endValue);
    }

    onShowFreeGameSettlePanel(totalWin){
        this.baseNode.active = true;
        this.startTween(true);
        this.startClickCountdown();
        this.tweenToNumber(0, totalWin, 2.18);
    }

    private async tweenToNumber(startValue: number, endValue: number, duration: number) {
        netMgr.evRepo.dispatch("onFreeGameSettleStarted", this);

        // this.mahjongWays_EventRepository.onFreeGameSettleStarted.Notify();
        this.endValue = endValue;
        if (this.shouldFinishTween) {
            this.finishTweenToNumber(endValue);
            this.button.node.active = true;
            // netMgr.evRepo.dispatch("onFreeGameSettleFinished", this);

            // this.mahjongWays_EventRepository.onFreeGameSettleFinished.Notify();
        } else {
            await this.startTweenToNumber({
                startValue: startValue,
                endValue: endValue,
                duration: duration,
                onCompleted: () => {
                    this.button.node.active = true;
                    // netMgr.evRepo.dispatch("onFreeGameSettleFinished", this);
                }
            });
        }
    }

    public finishTweenToNumber(endValue: number) {
        const value = formatGold(endValue);
        this.setSpriteNumber(+value);
        // this.onTweenToNumberFinished?.();
        this.resolve?.();
        this.resolve = null;
    }

    private stopTotalWinTween() {
        if (this.totalWinTween != null) {
            this.totalWinTween.stop();
            this.totalWinTween = null;
        }
    }

    private async onButtonClicked() {
        this.particleAnimationPlayer.playAnimationOnce("animation");
        this.stopClickCountdown();
        await delay(500);
        this.startTween(false);
        this.onButtonClickedCallback();
        await delay(600);
        netMgr.evRepo.dispatch("onFreeGameSettleFinished", this);
        // this.destroy();
    }

    private startClickCountdown() {
        this.timeout = setTimeout(() => {
            this.onButtonClicked();
        }, 5000);
    }

    private stopClickCountdown() {
        if (this.timeout != null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }


    onButtonClickedCallback() {
        netMgr.evRepo.dispatch("onReceiveFreeGameRewardClicked", this);

        netMgr.evRepo.dispatch("onBaseGame", this);
        netMgr.evRepo.dispatch("onMultiple", this);

        // this.mahjongWays_EventRepository.onReceiveFreeGameRewardClicked.Notify();
        // this.mahjongWays_EventRepository.onBaseGame.Notify();
        // this.mahjongWays_EventRepository.onMultiple.Notify({
        //     multiple: 1,
        //     isFreeGame: false,
        //     isMute: false
        // });
    
    }
    public async setSpriteNumber(number: number) {
        this.spriteNumberLabel.string = formatGold(number);
    }
    
    public async startTweenToNumber(tweenToNumberParameter: TweenToNumberParameter) {
        return new Promise<void>(resolve => {
            const startValue = tweenToNumberParameter.startValue;
            const endValue = tweenToNumberParameter.endValue;
            const duration = tweenToNumberParameter.duration;
            const onCompleted = tweenToNumberParameter.onCompleted;


            this.stopTweenToNumber();

            const object = { value: startValue };

            this.numberTween = tween(object)
                .to(duration, {
                    value: endValue
                }, {
                    progress: (start: number, end: number, current: number, ratio: number) => {
                        const value = formatGold(current);
                        this.setSpriteNumber(+value);
                        return start + (end - start) * ratio;
                    }
                })
                .call(() => {
                    this.finishTweenToNumber(endValue);
                    onCompleted?.();
                })
                .start();
        });
    }
    public stopTweenToNumber() {
        if (this.numberTween) {
            this.numberTween.stop();
            this.numberTween = null;
        }
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


interface TweenToNumberParameter {

    startValue: number;

    endValue: number;

    duration: number;

    onCompleted?: Function;
}