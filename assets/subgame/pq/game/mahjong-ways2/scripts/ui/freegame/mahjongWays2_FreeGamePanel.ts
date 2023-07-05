/*
import { Node, Sprite, Size, Layout, Button, SpriteFrame, isValid, Vec3, tween } from "cc";
import { delay } from "../../timer/mahjongWays2_Timer";
import AnimationPlayer from "../animations/mahjongWays2_AnimationPlayer";
import TweenPlayer from "../animations/mahjongWays2_TweenPlayer";
import mahjongWays2_FreeGameTitle from "./mahjongWays2_FreeGameTitle";
import mahjongWays2_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { log } from "cc";
import { sp } from "cc";

export default class mahjongWays2_FreeGamePanel {

    private rootNode: Node;

    private onButtonClickedCallback: Function;

    private timeout: ReturnType<typeof setTimeout>;

    private mahjongWays2_FreeGameTitle: mahjongWays2_FreeGameTitle;

    private buttonEffectAnimationPlayer: AnimationPlayer;

    private goldBackgroud: Sprite;

    private mahjongBackground: Sprite;

    private starryBackground: Sprite;

    private diffusionTween: TweenPlayer<{ value: number }>;

    public constructor(mahjongWays2_FreeGamePanelParameter: mahjongWays2_FreeGamePanelParameter) {
        const onButtonClickedCallback = mahjongWays2_FreeGamePanelParameter.onButtonClickedCallback;

        this.onButtonClickedCallback = onButtonClickedCallback;

        this.diffusionTween = new TweenPlayer();

        this.createUI(mahjongWays2_FreeGamePanelParameter);

        this.startDiffusionTween();

        this.startClickCountdown();
    }

    public destroy() {
        this.diffusionTween.destroy();
        this.diffusionTween = null;
        this.buttonEffectAnimationPlayer.destroy();
        this.buttonEffectAnimationPlayer = null;
        this.stopClickCountdown();
        this.mahjongWays2_FreeGameTitle.destroy();
        this.mahjongWays2_FreeGameTitle = null;
        if (isValid(this.rootNode, true)) {
            this.rootNode.destroy();
        }
    }

    private async createUI(mahjongWays2_FreeGamePanelParameter: mahjongWays2_FreeGamePanelParameter) {
        const parent = mahjongWays2_FreeGamePanelParameter.parent;
        const mahjongWays2_UIFactory = mahjongWays2_FreeGamePanelParameter.mahjongWays2_UIFactory;
        const freeGameCount = mahjongWays2_FreeGamePanelParameter.freeGameCount;

        const rootNode = mahjongWays2_UIFactory.createNode({
            parent: parent,
            name: "mahjongWays2_FreeGamePanel"
        });
        this.rootNode = rootNode;
        mahjongWays2_UIFactory.addWidget(rootNode, { top: 0, bottom: 0, left: 0, right: 0 });

        const backgroud = mahjongWays2_UIFactory.createSprite({
            parent: rootNode,
            name: ""
        }, {
            name: "backgroud",
            spriteFramePath: "mahjong-ways2/bigImage/effects/bonus_transition_d/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });
        const goldBackgroud = mahjongWays2_UIFactory.createSprite({
            parent: rootNode,
            name: "goldBackgroud",
        }, {
            contentSize: new Size(750, 1334),
            spriteFramePath: "mahjong-ways2/bigImage/effects/mahjongWays2_bg_dec/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });
        this.goldBackgroud = goldBackgroud;
        const mahjongBackground = mahjongWays2_UIFactory.createSprite({
            parent: rootNode,
            name: "mahjongBackground",
        }, {
            contentSize: new Size(750, 1334),
            spriteFramePath: "mahjong-ways2/bigImage/effects/bonusEffect/mahjongWays2_freegame_background2/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });
        this.mahjongBackground = mahjongBackground;
        const starryBackground = mahjongWays2_UIFactory.createSprite({
            parent: rootNode,
            name: "starryBackground"
        }, {
            contentSize: new Size(750, 1334),
            spriteFramePath: "mahjong-ways2/bigImage/effects/bonus_transition_a/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE,
            materialPath: "mahjong-ways2/materials/remove-black-material"
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });
        this.starryBackground = starryBackground;

        const button = mahjongWays2_UIFactory.createButton({
            parent: rootNode,
            name: ""
        }, {
            onClick: () => this.onButtonClicked(),
            transition: Button.Transition.NONE
        }, {
            contentSize: new Size(385, 143),
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "mahjong-ways2/images/effects/bonusEffect/mahjongWays2_bg_dec_btn/spriteFrame",
        }, null, {
            bottom: 200
        });
        const startIcon = mahjongWays2_UIFactory.createSprite({
            parent: button.node,
            name: ""
        }, {
            name: "startIcon",
            contentSize: new Size(143, 68),
            spriteFramePath: "mahjong-ways2/images/freegame/mahjongWays2_txt_start_1/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        });

        log('bonus_bg_particle load')
        const effectSkeletonNode = hqq.addNode(button.node,{
            Res:hqq['pq'],
            skeleton:"game/mahjong-ways2/animations/spines/bonus_button_vfx/",
            name:"effectSkeleton",
            scale:1.33,timeScale:1
        });
        this.buttonEffectAnimationPlayer = new AnimationPlayer(effectSkeletonNode.getComponent(sp.Skeleton));

        const text = mahjongWays2_UIFactory.createSprite({
            parent: rootNode,
            name: ""
        }, {
            name: "text",
            spriteFramePath: "mahjong-ways2/images/freegame/mahjongWays2_txt_winDoubleBonus/spriteFrame",
            sizeMode: Sprite.SizeMode.RAW,
            type: Sprite.Type.SIMPLE
        }, {
            bottom: 400
        });

        this.mahjongWays2_FreeGameTitle = new mahjongWays2_FreeGameTitle({
            parent: rootNode,
            mahjongWays2_UIFactory: mahjongWays2_UIFactory,
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

interface mahjongWays2_FreeGamePanelParameter {

    parent: Node;

    mahjongWays2_UIFactory: mahjongWays2_UIFactory;

    freeGameCount: number;

    onButtonClickedCallback: Function;
}
*/