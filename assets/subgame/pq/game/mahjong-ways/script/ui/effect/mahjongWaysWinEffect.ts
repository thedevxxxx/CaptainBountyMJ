
import { Sprite } from 'cc';
import { _decorator, Component, Node } from 'cc';
import TweenPlayer from '../../../../../script/animations/TweenPlayer';
import { ParticleSystem2D } from 'cc';
import { Color } from 'cc';
import { tween } from 'cc';
import { Vec3 } from 'cc';
import { Tween } from 'cc';
import { formatGold } from "../../../../../script/formatter/pq_Formatter";
import { Label } from 'cc';
import { mahjongWaysNetManager as netMgr ,mahjongWaysEventType} from '../../network/mahjongWaysNetManager';
import { delay } from "../../../../../script/subgame/common/BaseTimer";

import { UIOpacity } from 'cc';

const { ccclass, property } = _decorator;

 
@ccclass('mahjongWaysWinEffect')
export class mahjongWaysWinEffect extends Component {

    @property(ParticleSystem2D)
     coinsFountainParticle: ParticleSystem2D;
    @property(ParticleSystem2D)
     ingotsFountainParticle: ParticleSystem2D;
     @property(ParticleSystem2D)
     rainParticle: ParticleSystem2D;

    @property(Sprite)
     plate: Sprite;
    
     @property(Node)
    backTreasureBowlContainer: Node;
    @property(Sprite)
    bigWinBackground: Sprite;
    @property(Node)
     frontTreasureBowlContainer: Node;
    @property(Node)
     treasureTowerContainer: Node;

    @property(Sprite)
     bigWinSprite: Sprite;
    @property(Sprite)
     megaWinSprite: Sprite;
    @property(Sprite)
     superWinSprite: Sprite;

    @property(Sprite)
     glare: Sprite;
     @property(Sprite)
     halo: Sprite;
    @property(Sprite)
     explosion: Sprite;



     @property(Node)
     textContainer: Node;
     @property(Label)
     spriteNumberLabel: Label;
     @property(Node)
     spriteNumberDisplayer;

     @property(Node)
     baseNode: Node;

    private startNodeTween: TweenPlayer<{ value: number }>;

    private shouldFinishTween: boolean;

    private endValue: number;

    private rotationTween: TweenPlayer<Node>;

    private bounceTween: TweenPlayer<{ scale: number }>;

    private explosionTween: TweenPlayer<{ scale: number, red: number, green: number, blue: number }>

    private numberTween: Tween<{ value: number }>

    private resolve: (value: void | PromiseLike<void>) => void;

    start () {
        this.bounceTween = new TweenPlayer();
        this.explosionTween = new TweenPlayer();
        this.startNodeTween = new TweenPlayer();
        this.baseNode.active = false;
        this.addEvent();
    }

    addEvent(){
        netMgr.evRepo.register("onShowWinEffect", this, this.onShowWinEffect.bind(this));
    }

    protected removeEvent() {
        netMgr.evRepo.unregister("onShowWinEffect", this);
    }  

    public onDestroy() {
        this.removeEvent();
        if (!this.coinsFountainParticle?.stopped) this.coinsFountainParticle?.stopSystem();
        if (!this.ingotsFountainParticle?.stopped) this.ingotsFountainParticle?.stopSystem();
        this.explosionTween?.destroy()
        this.explosionTween = null;
        this.rotationTween?.destroy()
        this.rotationTween = null;
        this.bounceTween?.destroy();
        this.bounceTween = null;
        this.stopTweenToNumber();
    }
    
    public async onShowWinEffect(data){
        return new Promise(async (resolve, reject) => {
        let totalWin = data.totalWin;
        let winMultiple = data.winMultiple;
        const bigWin = data.betAmount * 20;
        const megaWin = data.betAmount * 35;
        const superWin = data.betAmount * 50;
        const isBigWin = (winMultiple >= 20 && winMultiple < 35);
        const isMegaWin = (winMultiple >= 35 && winMultiple < 50);
        const isSuperWin = (winMultiple >= 50);
        this.baseNode.active = true;
        this.startTween(true);
        this.startRotationTween();
            if (isBigWin) {
                this.bigWin();
                await this.tweenToNumber(0, totalWin, 7.2);
            }
            if (isMegaWin) {
                this.bigWin();
                await this.tweenToNumber(0, megaWin, 7.2);
                this.megaWin();
                await this.tweenToNumber(megaWin, totalWin, 6.7);
            }
            if (isSuperWin) {
                this.bigWin();
                await this.tweenToNumber(0, megaWin, 7.2);
                this.megaWin();
                await this.tweenToNumber(megaWin, superWin, 6.7);
                this.superWin();
                await this.tweenToNumber(superWin, totalWin, 6.7);
            }
            netMgr.evRepo.dispatch("onWinEffectTweenToNumberFinished", this);
            await delay(5000);
            await this.hideWinEffect()
            resolve(true);
        });
    }

    async hideWinEffect(){
        this.startTween(false);
        if(this.coinsFountainParticle?.stopped) this.coinsFountainParticle.stopSystem();
        if(this.ingotsFountainParticle?.stopped) this.ingotsFountainParticle.stopSystem();
        this.stopTweenToNumber();
    }

    public async tweenToNumber(startValue: number, endValue: number, duration: number) {
        this.endValue = endValue;
        if (this.shouldFinishTween) {
            this.finishTweenToNumber(endValue);
        } else {
            await this.startTweenToNumber({
                startValue: startValue,
                endValue: endValue,
                duration: duration
            });
        }
    }

    public async bigWin() {
        this.plate.node.setScale(1, 1);
        this.glare.node.setScale(1.5, 1.5);
        this.halo.node.setScale(5, 5);

        this.backTreasureBowlContainer.active = false;
        this.frontTreasureBowlContainer.active = false;
        this.treasureTowerContainer.active = false;

        this.bigWinSprite.node.active = true;
        this.megaWinSprite.node.active = false;
        this.superWinSprite.node.active = false;

        this.startBounceTween();
        this.startExplosionTween();

        this.coinsFountainParticle.resetSystem();
    }

    public async megaWin() {
        this.plate.node.setScale(1.2, 1.2);
        this.glare.node.setScale(1.7, 1.7);
        this.halo.node.setScale(6, 6);

        this.backTreasureBowlContainer.active = true;
        this.frontTreasureBowlContainer.active = false;
        this.treasureTowerContainer.active = false;

        this.bigWinSprite.node.active = false;
        this.megaWinSprite.node.active = true;
        this.superWinSprite.node.active = false;

        this.startBounceTween();
        this.startExplosionTween();

        if (this.coinsFountainParticle.stopped) {
            this.coinsFountainParticle.resetSystem();
        }
    }

    public async superWin() {
        this.plate.node.setScale(1.4, 1.4);
        this.glare.node.setScale(2, 2);
        this.halo.node.setScale(7, 7);

        this.backTreasureBowlContainer.active = true;
        this.frontTreasureBowlContainer.active = true;
        this.treasureTowerContainer.active = true;

        this.bigWinSprite.node.active = false;
        this.megaWinSprite.node.active = false;
        this.superWinSprite.node.active = true;

        this.startBounceTween();
        this.startExplosionTween();

        if (!this.coinsFountainParticle?.stopped) {
            this.coinsFountainParticle?.stopSystem();
        }
        this.ingotsFountainParticle.resetSystem();
    }

    private onBackgroundClicked() {
        this.shouldFinishTween = true;
        this.finishTweenToNumber(this.endValue);
    }

    private startRotationTween() {
        this.rotationTween = new TweenPlayer();
        this.rotationTween.tween = tween(this.glare.node)
            .to(20, { eulerAngles: new Vec3(0, 0, 360) })
            .call(() => this.glare.node.eulerAngles = Vec3.ZERO)
            .union()
            .repeatForever()
            .start()
    }

    private startBounceTween() {
        this.bounceTween.stopTween();

        this.textContainer.setScale(0, 0);
        this.spriteNumberDisplayer.setScale(0, 0);
        this.backTreasureBowlContainer.setScale(0, 0);
        this.frontTreasureBowlContainer.setScale(0, 0);
        this.treasureTowerContainer.setScale(0, 0);
        this.bigWinBackground.node.setScale(0, 0);

        const object = { scale: 0 };
        this.bounceTween.tween = tween(object)
            .to(0.25, { scale: 1.5 }, {
                onUpdate: (object: { scale: number }) => {
                    const scale = object.scale;
                    this.textContainer.setScale(scale, scale);
                    this.spriteNumberDisplayer.setScale(scale, scale);
                    this.backTreasureBowlContainer.setScale(scale, scale);
                    this.frontTreasureBowlContainer.setScale(scale, scale);
                    this.treasureTowerContainer.setScale(scale, scale);
                    this.bigWinBackground.node.setScale(scale, scale);
                }
            })
            .to(0.25, { scale: 1 }, {
                onUpdate: (object: { scale: number }) => {
                    const scale = object.scale;
                    this.textContainer.setScale(scale, scale);
                    this.spriteNumberDisplayer.setScale(scale, scale);
                    this.backTreasureBowlContainer.setScale(scale, scale);
                    this.frontTreasureBowlContainer.setScale(scale, scale);
                    this.treasureTowerContainer.setScale(scale, scale);
                    this.bigWinBackground.node.setScale(scale, scale);
                }
            })
            .start();
    }

    private startExplosionTween() {
        this.explosionTween.stopTween();

        this.explosion.node.active = true;
        this.explosion.node.setScale(2, 2);
        this.explosion.color = Color.WHITE;
        const color = new Color(this.explosion.color);
        const object = {
            scale: 2,
            red: 255,
            green: 255,
            blue: 255
        }
        this.explosionTween.tween = tween(object)
            .to(0.3, { scale: 7 }, {
                onUpdate: (object: { scale: number, red: number, green: number, blue: number }) => {
                    const scale = object.scale;
                    this.explosion.node.setScale(scale, scale);
                }
            })
            .to(0.3, {
                red: 0,
                green: 0,
                blue: 0
            }, {
                onUpdate: (object: { scale: number, red: number, green: number, blue: number }) => {
                    color.r = object.red;
                    color.g = object.green;
                    color.b = object.blue;
                    this.explosion.color = color;
                }
            })
            .call(() => {
                this.explosion.node.active = false;
                this.explosion.color = Color.WHITE;
            })
            .start();
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

            this.resolve = resolve;

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

    public finishTweenToNumber(endValue: number) {
        const value = formatGold(endValue);
        this.setSpriteNumber(+value);
        // this.onTweenToNumberFinished?.();
        this.resolve?.();
        this.resolve = null;
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