import { Node, Sprite, Size, Layout, Button, SpriteFrame, isValid, Vec3, tween } from "cc";
import { delay } from "../../timer/mjhl_Timer";
import AnimationPlayer from "../animations/AnimationPlayer";
import TweenPlayer from "../animations/TweenPlayer";
import mjhl_FreeGameTitle from "./mjhl_FreeGameTitle";
import mjhl_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { log } from "cc";
import { sp } from "cc";

export default class mjhl_FreeGamePanel {

    private rootNode: Node;

    private onButtonClickedCallback: Function;

    private timeout: ReturnType<typeof setTimeout>;

    private mjhl_FreeGameTitle: mjhl_FreeGameTitle;

    private buttonEffectAnimationPlayer: AnimationPlayer;

    private goldBackgroud: Sprite;

    private mahjongBackground: Sprite;

    private starryBackground: Sprite;

    private diffusionTween: TweenPlayer<{ value: number }>;

    public constructor(mjhl_FreeGamePanelParameter: mjhl_FreeGamePanelParameter) {
        const onButtonClickedCallback = mjhl_FreeGamePanelParameter.onButtonClickedCallback;

        this.onButtonClickedCallback = onButtonClickedCallback;

        this.diffusionTween = new TweenPlayer();

        this.createUI(mjhl_FreeGamePanelParameter);

        this.startDiffusionTween();

        this.startClickCountdown();
    }

    public destroy() {
        this.diffusionTween.destroy();
        this.diffusionTween = null;
        this.buttonEffectAnimationPlayer.destroy();
        this.buttonEffectAnimationPlayer = null;
        this.stopClickCountdown();
        this.mjhl_FreeGameTitle.destroy();
        this.mjhl_FreeGameTitle = null;
        if (isValid(this.rootNode, true)) {
            this.rootNode.destroy();
        }
    }

    private async createUI(mjhl_FreeGamePanelParameter: mjhl_FreeGamePanelParameter) {
        const parent = mjhl_FreeGamePanelParameter.parent;
        const mjhl_UIFactory = mjhl_FreeGamePanelParameter.mjhl_UIFactory;
        const freeGameCount = mjhl_FreeGamePanelParameter.freeGameCount;

        const rootNode = mjhl_UIFactory.createNode({
            parent: parent,
            name: "mjhl_FreeGamePanel"
        });
        this.rootNode = rootNode;
        mjhl_UIFactory.addWidget(rootNode, { top: 0, bottom: 0, left: 0, right: 0 });

        const backgroud = mjhl_UIFactory.createSprite({
            parent: rootNode,
            name: ""
        }, {
            name: "backgroud",
            spriteFramePath: "mjhl/bigImages/effects/bonusEffect/bonus_transition_d/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });
        const goldBackgroud = mjhl_UIFactory.createSprite({
            parent: rootNode,
            name: "goldBackgroud",
        }, {
            contentSize: new Size(750, 1334),
            spriteFramePath: "mjhl/bigImages/effects/bonusEffect/mjhl_bg_dec/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });
        this.goldBackgroud = goldBackgroud;
        const mahjongBackground = mjhl_UIFactory.createSprite({
            parent: rootNode,
            name: "mahjongBackground",
        }, {
            contentSize: new Size(750, 1334),
            spriteFramePath: "mjhl/bigImage/effects/bonusEffect/mjhl_freegame_background2/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });
        this.mahjongBackground = mahjongBackground;
        const starryBackground = mjhl_UIFactory.createSprite({
            parent: rootNode,
            name: "starryBackground"
        }, {
            contentSize: new Size(750, 1334),
            spriteFramePath: "mjhl/bigImages/effects/bonusEffect/bonus_transition_a/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE,
            materialPath: "mjhl/materials/remove-black-material"
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });
        this.starryBackground = starryBackground;

        const button = mjhl_UIFactory.createButton({
            parent: rootNode,
            name: ""
        }, {
            onClick: () => this.onButtonClicked(),
            transition: Button.Transition.NONE
        }, {
            contentSize: new Size(385, 143),
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "mjhl/bigImages/effects/bonusEffect/mjhl_bg_dec_btn/spriteFrame",
        }, null, {
            bottom: 200
        });
        const startIcon = mjhl_UIFactory.createSprite({
            parent: button.node,
            name: ""
        }, {
            name: "startIcon",
            contentSize: new Size(143, 68),
            spriteFramePath: "mjhl/images/freegame/mjhl_txt_start_1/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        });

        log('bonus_bg_particle load')
        const effectSkeletonNode = hqq.addNode(button.node,{
            Res:hqq['pq'],
            skeleton:"game/mjhl/animations/spines/bonus_button_vfx/",
            name:"effectSkeleton",
            scale:1.33,timeScale:1
        });
        this.buttonEffectAnimationPlayer = new AnimationPlayer(effectSkeletonNode.getComponent(sp.Skeleton));

        const text = mjhl_UIFactory.createSprite({
            parent: rootNode,
            name: ""
        }, {
            name: "text",
            spriteFramePath: "mjhl/images/freegame/mjhl_txt_winDoubleBonus/spriteFrame",
            sizeMode: Sprite.SizeMode.RAW,
            type: Sprite.Type.SIMPLE
        }, {
            bottom: 400
        });

        this.mjhl_FreeGameTitle = new mjhl_FreeGameTitle({
            parent: rootNode,
            mjhl_UIFactory: mjhl_UIFactory,
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

interface mjhl_FreeGamePanelParameter {

    parent: Node;

    mjhl_UIFactory: mjhl_UIFactory;

    freeGameCount: number;

    onButtonClickedCallback: Function;
}