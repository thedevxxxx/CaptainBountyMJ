/*
import { Node, Sprite, Size, Layout, Button, SpriteFrame, isValid, Vec3, tween } from "cc";
import { delay } from "../../timer/mahjongWays_Timer";
import AnimationPlayer from "../animations/mahjongWays_AnimationPlayer";
import TweenPlayer from "../animations/mahjongWays_TweenPlayer";
import mahjongWays_FreeGameTitle from "./mahjongWays_FreeGameTitle";
import mahjongWays_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { log } from "cc";
import { sp } from "cc";

export default class mahjongWays_FreeGamePanel {

    private rootNode: Node;

    private onButtonClickedCallback: Function;

    private timeout: ReturnType<typeof setTimeout>;

    private mahjongWays_FreeGameTitle: mahjongWays_FreeGameTitle;

    private buttonEffectAnimationPlayer: AnimationPlayer;

    private goldBackgroud: Sprite;

    private mahjongBackground: Sprite;

    private starryBackground: Sprite;

    private diffusionTween: TweenPlayer<{ value: number }>;

    public constructor(mahjongWays_FreeGamePanelParameter: mahjongWays_FreeGamePanelParameter) {
        const onButtonClickedCallback = mahjongWays_FreeGamePanelParameter.onButtonClickedCallback;

        this.onButtonClickedCallback = onButtonClickedCallback;

        this.diffusionTween = new TweenPlayer();

        this.createUI(mahjongWays_FreeGamePanelParameter);

        this.startDiffusionTween();

        this.startClickCountdown();
    }

    public destroy() {
        this.diffusionTween.destroy();
        this.diffusionTween = null;
        this.buttonEffectAnimationPlayer.destroy();
        this.buttonEffectAnimationPlayer = null;
        this.stopClickCountdown();
        this.mahjongWays_FreeGameTitle.destroy();
        this.mahjongWays_FreeGameTitle = null;
        if (isValid(this.rootNode, true)) {
            this.rootNode.destroy();
        }
    }

    private async createUI(mahjongWays_FreeGamePanelParameter: mahjongWays_FreeGamePanelParameter) {
        const parent = mahjongWays_FreeGamePanelParameter.parent;
        const mahjongWays_UIFactory = mahjongWays_FreeGamePanelParameter.mahjongWays_UIFactory;
        const freeGameCount = mahjongWays_FreeGamePanelParameter.freeGameCount;

        const rootNode = mahjongWays_UIFactory.createNode({
            parent: parent,
            name: "mahjongWays_FreeGamePanel"
        });
        this.rootNode = rootNode;
        mahjongWays_UIFactory.addWidget(rootNode, { top: 0, bottom: 0, left: 0, right: 0 });

        const backgroud = mahjongWays_UIFactory.createSprite({
            parent: rootNode,
            name: ""
        }, {
            name: "backgroud",
            spriteFramePath: "mahjong-ways/bigImage/effects/bonus_transition_d/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });
        const goldBackgroud = mahjongWays_UIFactory.createSprite({
            parent: rootNode,
            name: "goldBackgroud",
        }, {
            contentSize: new Size(750, 1334),
            spriteFramePath: "mahjong-ways/bigImage/effects/mahjongWays_bg_dec/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });
        this.goldBackgroud = goldBackgroud;
        const mahjongBackground = mahjongWays_UIFactory.createSprite({
            parent: rootNode,
            name: "mahjongBackground",
        }, {
            contentSize: new Size(750, 1334),
            spriteFramePath: "mahjong-ways/bigImage/effects/bonusEffect/mahjongWays_freegame_background2/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });
        this.mahjongBackground = mahjongBackground;
        const starryBackground = mahjongWays_UIFactory.createSprite({
            parent: rootNode,
            name: "starryBackground"
        }, {
            contentSize: new Size(750, 1334),
            spriteFramePath: "mahjong-ways/bigImage/effects/bonus_transition_a/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE,
            materialPath: "mahjong-ways/materials/remove-black-material"
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });
        this.starryBackground = starryBackground;

        const button = mahjongWays_UIFactory.createButton({
            parent: rootNode,
            name: ""
        }, {
            onClick: () => this.onButtonClicked(),
            transition: Button.Transition.NONE
        }, {
            contentSize: new Size(385, 143),
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "mahjong-ways/images/effects/bonusEffect/mahjongWays_bg_dec_btn/spriteFrame",
        }, null, {
            bottom: 200
        });
        const startIcon = mahjongWays_UIFactory.createSprite({
            parent: button.node,
            name: ""
        }, {
            name: "startIcon",
            contentSize: new Size(143, 68),
            spriteFramePath: "mahjong-ways/images/freegame/mahjongWays_txt_start_1/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        });

        log('bonus_bg_particle load')
        const effectSkeletonNode = hqq.addNode(button.node,{
            Res:hqq['pq'],
            skeleton:"game/mahjong-ways/animations/spines/bonus_button_vfx/",
            name:"effectSkeleton",
            scale:1.33,timeScale:1
        });
        this.buttonEffectAnimationPlayer = new AnimationPlayer(effectSkeletonNode.getComponent(sp.Skeleton));

        const text = mahjongWays_UIFactory.createSprite({
            parent: rootNode,
            name: ""
        }, {
            name: "text",
            spriteFramePath: "mahjong-ways/images/freegame/mahjongWays_txt_winDoubleBonus/spriteFrame",
            sizeMode: Sprite.SizeMode.RAW,
            type: Sprite.Type.SIMPLE
        }, {
            bottom: 400
        });

        this.mahjongWays_FreeGameTitle = new mahjongWays_FreeGameTitle({
            parent: rootNode,
            mahjongWays_UIFactory: mahjongWays_UIFactory,
            freeGameCount: freeGameCount,
            lifeTimeSeconds: null
        });
    }

    private async onButtonClicked() {
        this.buttonEffectAnimationPlayer.playAnimationOnce("animation");
        this.stopClickCountdown();
        await delay(500);
        this.onButtonClickedCallback();
        this.destroy();
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
}

interface mahjongWays_FreeGamePanelParameter {

    parent: Node;

    mahjongWays_UIFactory: mahjongWays_UIFactory;

    freeGameCount: number;

    onButtonClickedCallback: Function;
}
*/