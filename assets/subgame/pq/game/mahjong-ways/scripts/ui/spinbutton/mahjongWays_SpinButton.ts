/*
import { Tween, Sprite, Button, Vec3, Vec2, tween, SpriteFrame, Node, Size, Label, Color, UIOpacity } from "cc";
import { delay } from "../../timer/mahjongWays_Timer";
import AnimationPlayer from "../animations/mahjongWays_AnimationPlayer";
import TweenPlayer from "../animations/mahjongWays_TweenPlayer";
import mahjongWays_GameState, { GameState } from "../gamestate/mahjongWays_GameState";
import mahjongWays_EventRepository from "../../../../../script/event/pq_EventRepository";
import mahjongWays_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { log } from "cc";
import { sp } from "cc";
import { mjhlNetMgr } from "../../network/mahjongWays_NetManager";

export default class mahjongWays_SpinButton {

    private mahjongWays_UIFactory: mahjongWays_UIFactory;

    private mahjongWays_EventRepository: mahjongWays_EventRepository;

    private mahjongWays_GameState: mahjongWays_GameState;

    private buttonNode: Node;

    private buttonClickTween: Tween<Node>;

    private turntableNode: Node;

    private turntableSprite: Sprite;

    private turntableTween: Tween<Node>;

    private autoSpinCount: number;

    private autoNode: Node;

    private autoCountLabel: Label;

    private haloSprite: Sprite;

    private haloScaleTweenAnimation: TweenPlayer<Node>;

    private haloOpacityTweenAnimation: TweenPlayer<UIOpacity>;

    private auraSprite: Sprite;

    private auraScaleTweenAnimation: TweenPlayer<Node>;

    private auraOpacityTweenAnimation: TweenPlayer<UIOpacity>;

    private particleAnimationPlayer: AnimationPlayer;

    private reflectionAnimationPlayer: AnimationPlayer;

    private lightSprite: Sprite;

    private lightOpacityTweenAnimation: TweenPlayer<UIOpacity>;

    public constructor() {

    }

    public async init(spinButtonParameter: SpinButtonParameter) {
        const parent = spinButtonParameter.parent;
        const mahjongWays_UIFactory = spinButtonParameter.mahjongWays_UIFactory;
        const mahjongWays_EventRepository = spinButtonParameter.mahjongWays_EventRepository;
        const mahjongWays_GameState = spinButtonParameter.mahjongWays_GameState;

        this.mahjongWays_UIFactory = mahjongWays_UIFactory;
        this.mahjongWays_EventRepository = mahjongWays_EventRepository;
        this.mahjongWays_GameState = mahjongWays_GameState;
        this.createUI(parent, mahjongWays_UIFactory);

        this.haloScaleTweenAnimation = new TweenPlayer();
        this.haloOpacityTweenAnimation = new TweenPlayer();
        this.auraScaleTweenAnimation = new TweenPlayer();
        this.auraOpacityTweenAnimation = new TweenPlayer();
        this.lightOpacityTweenAnimation = new TweenPlayer();

        mahjongWays_EventRepository.onSpinFinished.Attach(() => {
            this.stopTurntableTween();
            this.setTurntableSkin(false, false);
        });
        mahjongWays_EventRepository.onResultFinished.Attach(resultFinishedParameter => {
            this.setTurntableSkin(true, false);
            this.startTurntableTween(4);
            if (resultFinishedParameter.isFirstFreeGame) {
                this.stopAutoSpin();
            }
        });
        mahjongWays_EventRepository.onAutoSpin.Attach((count) => {
            this.onAutoSpin(count);
        });

        mahjongWays_EventRepository.onResultFinished.Attach(() => {
            this.checkAutoSpin();
        });

        this.startTurntableTween(4);

        return this;
    }

    public destroy() {
        try {
            this.haloScaleTweenAnimation.destroy();
            this.haloOpacityTweenAnimation.destroy();
            this.auraScaleTweenAnimation.destroy();
            this.auraOpacityTweenAnimation.destroy();
            this.particleAnimationPlayer.destroy();
            this.reflectionAnimationPlayer.destroy();
            this.lightOpacityTweenAnimation.destroy();
            this.stopButtonClickTween();
            this.stopTurntableTween();
            this.haloScaleTweenAnimation = null;
            this.haloOpacityTweenAnimation = null;
            this.auraScaleTweenAnimation = null;
            this.auraOpacityTweenAnimation = null;
            this.particleAnimationPlayer = null;
            this.reflectionAnimationPlayer = null;
            this.lightOpacityTweenAnimation = null;
        } catch (error) {
            console.log(`[mahjongWays_SpinButton] ${error}`);
        }
    }

    private async createUI(parent: Node, mahjongWays_UIFactory: mahjongWays_UIFactory) {
        const rootNode = mahjongWays_UIFactory.createNode({
            parent: parent,
            name: "mahjongWays_SpinButton",
            position: new Vec3(0, -10, 0)
        });

        const haloSprite = mahjongWays_UIFactory.createSprite({
            parent: rootNode,
            name: "haloSprite",
            scale: new Vec3(2, 2),
            position: new Vec3(0, 25)
        }, {
            contentSize: new Size(104, 102),
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE,
            spriteFramePath: "mahjong-ways/images/effects/spinGlow/spin_glow_a/spriteFrame",
            materialPath: "mahjong-ways/materials/remove-black-material"
        });
        haloSprite.addComponent(UIOpacity);
        this.haloSprite = haloSprite;
        this.hideHaloSprite();

        const button = mahjongWays_UIFactory.createButton({
            parent: rootNode,
            name: ""
        }, {
            transition: Button.Transition.NONE,
            onClick: () => this.onButtonClicked(),
        }, {
            contentSize: new Size(186, 195),
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE,
            spriteFramePath: "mahjong-ways/images/ui/mj_btn_circle/mahjongWays_btn_circle_01/spriteFrame"
        });
        const buttonNode = button.node;
        this.buttonNode = buttonNode;
        const turntableSprite = mahjongWays_UIFactory.createSprite({
            parent: button.node,
            name: "",
            position: new Vec3(0, 17)
        }, {
            contentSize: new Size(118, 116),
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE,
            spriteFramePath: "mahjong-ways/images/ui/mj_btn_circle/mahjongWays_btn_circle_rotate_yellow/spriteFrame"
        });
        this.turntableSprite = turntableSprite;
        const turntableNode = turntableSprite.node;
        this.turntableNode = turntableNode;

        const autoNode = mahjongWays_UIFactory.createNode({
            parent: rootNode,
            name: ""
        });
        autoNode.active = false;
        this.autoNode = autoNode;
        const autoSpinButton = mahjongWays_UIFactory.createButton({
            parent: autoNode,
            name: ""
        }, {
            transition: Button.Transition.NONE,
            onClick: () => this.stopAutoSpin()
        }, {
            contentSize: new Size(186, 195),
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE,
            spriteFramePath: "mahjong-ways/images/ui/mj_btn_circle/mahjongWays_btn_circle_02/spriteFrame"
        });

        const autoCountLabel = mahjongWays_UIFactory.createLabel({
            parent: autoNode,
            name: "totalWinLabel"
        }, {
            contentSize: new Size(90, 83),
            fontPath: "mahjong-ways/bigImage/text/num/a_mahjongWays_gold_num",
            color: Color.WHITE,
            overflow: Label.Overflow.SHRINK,
            spacingX: -8,
            fontSize: 50,
            lineHeight: 100
        }, null, {
            horizontalCenter: 0,
            verticalCenter: 15
        });
        this.autoCountLabel = autoCountLabel;

        const auraSprite = mahjongWays_UIFactory.createSprite({
            parent: rootNode,
            name: "auraSprite",
            scale: new Vec3(2, 2),
            position: new Vec3(-3, 15)
        }, {
            contentSize: new Size(113, 116),
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE,
            spriteFramePath: "mahjong-ways/images/effects/spinGlow/spin_glow_d/spriteFrame",
            materialPath: "mahjong-ways/materials/remove-black-material"
        });
        auraSprite.addComponent(UIOpacity);
        this.auraSprite = auraSprite;
        this.hideAuraSprite();

        log('spin_vfx_a load')
        const particleSkeletonNode = hqq.addNode(rootNode,{
            Res:hqq['pq'],
            skeleton:"game/mahjong-ways/animations/spines/spin_vfx_a/",
            name:"particleSkeleton",
            timeScale: 1,scale:1.5
        }); 
        this.particleAnimationPlayer = new AnimationPlayer(particleSkeletonNode.getComponent(sp.Skeleton));

        log('spin_vfx_b load')
        const reflectionSkeletonNode = hqq.addNode(rootNode,{
            Res:hqq['pq'],
            skeleton:"game/mahjong-ways/animations/spines/spin_vfx_b/",
            name:"reflectionSkeleton",
            timeScale: 0.5,scale:1.35,x:0,y:15
        }); 
        this.reflectionAnimationPlayer = new AnimationPlayer(reflectionSkeletonNode.getComponent(sp.Skeleton));

        const lightSprite = mahjongWays_UIFactory.createSprite({
            parent: rootNode,
            name: "lightSprite",
            scale: new Vec3(1.5, 2),
        }, {
            contentSize: new Size(278, 184),
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE,
            spriteFramePath: "mahjong-ways/images/effects/spinGlow/spin_flare_a/spriteFrame",
            materialPath: "mahjong-ways/materials/remove-black-material"
        });
        lightSprite.addComponent(UIOpacity);
        this.lightSprite = lightSprite;
        this.hideLightSprite();
    }

    private onButtonClicked() {
        if (this.getCanSpin()) {
            this.mahjongWays_EventRepository.onSpinButtonClicked.Notify();
            mjhlNetMgr.sendSpin();
            
            this.stopButtonClickTween();
            this.playButtonClickTween();
            this.setTurntableSkin(false, true);
            this.playEffects();
        }
    }

    private playButtonClickTween() {
        this.buttonClickTween = tween(this.buttonNode)
            .to(0.1, { scale: new Vec3(1.1, 1.1) })
            .to(0.1, { scale: new Vec3(0.9, 0.9) })
            .call(() => {
                this.stopTurntableTween();
                this.startTurntableTween(0.3);
            })
            .to(0.1, { scale: Vec3.ONE })
            .start();
    }

    private stopButtonClickTween() {
        if (this.buttonClickTween != null) {
            this.buttonClickTween.stop();
            this.buttonClickTween = null;
            this.buttonNode.setScale(Vec3.ONE);
        }
    }

    private startTurntableTween(duration: number) {
        this.turntableTween = tween(this.turntableNode)
            .to(duration, { eulerAngles: new Vec3(0, 0, -360) })
            .call(() => this.turntableNode.eulerAngles = Vec3.ZERO)
            .union()
            .repeatForever()
            .start();
    }

    private stopTurntableTween() {
        if (this.turntableTween != null) {
            this.turntableTween.stop();
            this.turntableTween = null;
            this.turntableNode.eulerAngles = Vec3.ZERO;
        }
    }

    private async setTurntableSkin(isClickable: boolean, isHighSpeed: boolean) {
        let spriteFrameName = (isClickable) ? "mahjongWays_btn_circle_rotate_yellow" : "mahjongWays_btn_circle_rotate_gray";
        spriteFrameName = (isHighSpeed) ? `${spriteFrameName}_blur` : spriteFrameName;
        const spriteFramePath = `mahjong-ways/images/ui/mj_btn_circle/${spriteFrameName}/spriteFrame`;
        this.turntableSprite.spriteFrame = await this.mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(spriteFramePath, SpriteFrame);
    }

    private getCanSpin(): boolean {
        return this.mahjongWays_GameState.gameStateMachine.isState(GameState.Idle);
    }

    private async onAutoSpin(count: number) {
        this.buttonNode.active = false;
        this.autoSpinCount = count;
        this.autoNode.active = true;
        this.autoCountLabel.string = count.toString();
        await delay(1000);
        this.checkAutoSpin();
    }

    private checkAutoSpin() {
        if (this.autoSpinCount > 0) {
            this.autoCountLabel.string = this.autoSpinCount.toString();
            this.mahjongWays_EventRepository.onAutoSpinOnce.Notify();
            mjhlNetMgr.sendAutoSpin();

            this.autoSpinCount--;
        } else {
            this.stopAutoSpin();
        }
    }

    private stopAutoSpin() {
        this.autoSpinCount = 0;
        this.autoNode.active = false;
        this.buttonNode.active = true;
        this.mahjongWays_EventRepository.onStopAutoSpin.Notify();
    }

    private playEffects() {
        this.playHaloEffect();
        this.playAuraEffect();
        this.playLightEffect();
        this.playParticleEffect();
        this.playReflectEffect();
    }

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

    private playParticleEffect() {
        this.particleAnimationPlayer.stopAnimation();
        this.particleAnimationPlayer.playAnimationOnce("animation");
    }

    private playReflectEffect() {
        this.reflectionAnimationPlayer.stopAnimation();
        this.reflectionAnimationPlayer.playAnimationOnce("animation");
    }

    private showHaloSprite() {
        this.haloSprite.node.active = true;
    }

    private hideHaloSprite() {
        this.haloSprite.node.active = false;
    }

    private showAuraSprite() {
        this.auraSprite.node.active = true;
    }

    private hideAuraSprite() {
        this.auraSprite.node.active = false;
    }

    private showLightSprite() {
        this.lightSprite.node.active = true;
    }

    private hideLightSprite() {
        this.lightSprite.node.active = false;
    }

    private resetHaloSprite() {
        const haloSprite = this.haloSprite;
        haloSprite.node.setScale(2, 2);
        haloSprite.getComponent(UIOpacity).opacity = 255;
    }

    private resetAuraSprite() {
        const auraSprite = this.auraSprite;
        auraSprite.node.setScale(2, 2);
        auraSprite.getComponent(UIOpacity).opacity = 255;
    }

    private resetLightSprite() {
        this.auraSprite.getComponent(UIOpacity).opacity = 255;
    }

}

interface SpinButtonParameter {

    parent: Node;

    mahjongWays_UIFactory: mahjongWays_UIFactory;

    mahjongWays_EventRepository: mahjongWays_EventRepository;

    mahjongWays_GameState: mahjongWays_GameState;
}
*/