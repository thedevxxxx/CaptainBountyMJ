
import { _decorator, Component, Node, Sprite, UIOpacity, tween, Vec3, Skeleton, sp } from 'cc';
import AnimationPlayer from '../../../../script/animations/AnimationPlayer';
import TweenPlayer from '../../../../script/animations/TweenPlayer';
import { CommonStartBtn } from '../../../../script/subgame/ui/common/CommonStartBtn';
const { ccclass, property } = _decorator;
 
@ccclass('MahjongWays2StartBtn')
export class MahjongWays2StartBtn extends CommonStartBtn {

    
    @property(Sprite)
    private haloSprite: Sprite;
    private haloScaleTweenAnimation: TweenPlayer<Node>;
    private haloOpacityTweenAnimation: TweenPlayer<UIOpacity>;

    @property(Sprite)
    private auraSprite: Sprite;
    private auraScaleTweenAnimation: TweenPlayer<Node>;
    private auraOpacityTweenAnimation: TweenPlayer<UIOpacity>;

    @property(Sprite)
    private lightSprite: Sprite;
    private lightOpacityTweenAnimation: TweenPlayer<UIOpacity>;

    @property(sp.Skeleton)
    private particleSkeleton:sp.Skeleton;
    private particleAnimationPlayer: AnimationPlayer;

    @property(sp.Skeleton)
    private reflectionSkeleton:sp.Skeleton;
    private reflectionAnimationPlayer: AnimationPlayer;

    start () {
    }

    init() {
        super.init();
        this.hideHaloSprite();
        this.hideAuraSprite();
        this.hideLightSprite();
        this.haloScaleTweenAnimation = new TweenPlayer();
        this.haloOpacityTweenAnimation = new TweenPlayer();
        this.auraScaleTweenAnimation = new TweenPlayer();
        this.auraOpacityTweenAnimation = new TweenPlayer();
        this.lightOpacityTweenAnimation = new TweenPlayer();

        this.particleAnimationPlayer = new AnimationPlayer(this.particleSkeleton);
        this.reflectionAnimationPlayer = new AnimationPlayer(this.reflectionSkeleton);
    }

    
    onDestroy() {
        super.onDestroy();
        this.haloScaleTweenAnimation.destroy();
        this.haloScaleTweenAnimation = null;
        this.haloOpacityTweenAnimation.destroy();
        this.haloOpacityTweenAnimation = null;
        this.auraScaleTweenAnimation.destroy();
        this.auraScaleTweenAnimation = null;
        this.auraOpacityTweenAnimation.destroy();
        this.auraOpacityTweenAnimation = null;
        this.lightOpacityTweenAnimation.destroy();
        this.lightOpacityTweenAnimation = null;
        
        this.particleAnimationPlayer.destroy();
        this.particleAnimationPlayer = null;
        this.reflectionAnimationPlayer.destroy();
        this.reflectionAnimationPlayer = null;
    }

    onClickStart():void {
        this.clickPlayEffect();
    }

    //点击时播放
    private clickPlayEffect() {
        this.playHaloEffect();
        this.playAuraEffect();
        this.playLightEffect();
        this.playParticleEffect();
        this.playReflectEffect();
    }

    //=================================发光=======================
    private playHaloEffect() {
        this.showHaloSprite();
        this.haloScaleTweenAnimation.stopTween();
        this.haloOpacityTweenAnimation.stopTween();
        this.haloScaleTweenAnimation.tween = tween<Node>(this.haloSprite.node)
            .to(0.3, { scale: new Vec3(3.5, 3.5) })
            .start();
        this.haloOpacityTweenAnimation.tween = tween<UIOpacity>(this.haloSprite.getComponent(UIOpacity))
            .delay(0.3)
            .to(0.2, { opacity: 0 })
            .call(() => {
                this.hideHaloSprite();
                this.resetHaloSprite();
            })
            .start();
    }

    private showHaloSprite() {
        this.haloSprite.node.active = true;
    }

    private hideHaloSprite() {
        this.haloSprite.node.active = false;
    }
    
    private resetHaloSprite() {
        this.haloSprite.node.setScale(2, 2);
        this.haloSprite.getComponent(UIOpacity).opacity = 255;
    }


    //=================================光环=======================

    private playAuraEffect() {
        this.showAuraSprite();
        this.auraScaleTweenAnimation.stopTween();
        this.auraOpacityTweenAnimation.stopTween();
        this.auraScaleTweenAnimation.tween = tween<Node>(this.auraSprite.node)
            .to(0.4, { scale: new Vec3(3, 3) })
            .start();
        this.auraOpacityTweenAnimation.tween = tween<UIOpacity>(this.auraSprite.getComponent(UIOpacity))
            .delay(0.4)
            .to(0.2, { opacity: 0 })
            .call(() => {
                this.hideAuraSprite();
                this.resetAuraSprite();
            })
            .start();
    }

    private showAuraSprite() {
        this.auraSprite.node.active = true;
    }

    private hideAuraSprite() {
        this.auraSprite.node.active = false;
    }

    private resetAuraSprite() {
        this.auraSprite.node.setScale(2, 2);
        this.auraSprite.getComponent(UIOpacity).opacity = 255;
    }


    //=================================发光扩散=======================

    private playLightEffect() {
        this.showLightSprite();
        this.lightOpacityTweenAnimation.stopTween();
        this.lightOpacityTweenAnimation.tween = tween<UIOpacity>(this.lightSprite.getComponent(UIOpacity))
            .delay(0.2)
            .to(0.2, { opacity: 0 })
            .call(() => {
                this.hideLightSprite();
                this.resetLightSprite();
            })
            .start();
    }

    private showLightSprite() {
        this.lightSprite.node.active = true;
    }

    private hideLightSprite() {
        this.lightSprite.node.active = false;
    }

    private resetLightSprite() {
        this.auraSprite.getComponent(UIOpacity).opacity = 255;
    }

    //=================================粒子特效=======================
    private playParticleEffect() {
        this.particleAnimationPlayer.stopAnimation();
        this.particleAnimationPlayer.playAnimationOnce("animation");
    }

    private playReflectEffect() {
        this.reflectionAnimationPlayer.stopAnimation();
        this.reflectionAnimationPlayer.playAnimationOnce("animation");
    }
}
