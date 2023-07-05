import { Node, Sprite, Size, Layout, Button, SpriteFrame, tween, Tween, Label, Color, Vec3 } from "cc";
import { delay } from "../../timer/mjhl_Timer";
import AnimationPlayer from "../animations/AnimationPlayer";
import mjhl_SpriteNumberDisplayer from "../spritenumber/mjhl_SpriteNumberDisplayer";
import mjhl_EventRepository from "../../../../../script/event/pq_EventRepository";
import mjhl_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { log } from "cc";
import { sp } from "cc";

export default class mjhl_FreeGameSettlePanel {

    private mjhl_UIFactory: mjhl_UIFactory;

    private mjhl_EventRepository: mjhl_EventRepository;

    private rootNode: Node;

    private layoutNode: Node;

    private button: Button;

    private totalWinTween: Tween<{ value: number; }>;

    private spriteNumberDisplayer: mjhl_SpriteNumberDisplayer;

    // private totalWinLabel: Label;

    private onButtonClickedCallback: Function;

    private timeout: ReturnType<typeof setTimeout>;

    private particleAnimationPlayer: AnimationPlayer;

    private lightAnimationPlayer: AnimationPlayer;

    private endValue: number;

    private shouldFinishTween: boolean;

    public constructor() {

    }

    public async init(mjhl_FreeGameSettlePanelParameter: mjhl_FreeGameSettlePanelParameter) {
        const parent = mjhl_FreeGameSettlePanelParameter.parent;
        const mjhl_UIFactory = mjhl_FreeGameSettlePanelParameter.mjhl_UIFactory;
        const totalWin = mjhl_FreeGameSettlePanelParameter.totalWin;
        const onButtonClickedCallback = mjhl_FreeGameSettlePanelParameter.onButtonClickedCallback;
        const mjhl_EventRepository = mjhl_FreeGameSettlePanelParameter.mjhl_EventRepository;

        this.mjhl_UIFactory = mjhl_UIFactory;
        this.mjhl_EventRepository = mjhl_EventRepository;
        this.onButtonClickedCallback = onButtonClickedCallback;
        await this.createUI(parent, mjhl_UIFactory, totalWin, onButtonClickedCallback);
        this.startClickCountdown();

        return this;
    }

    public destroy() {
        this.lightAnimationPlayer?.destroy();
        this.lightAnimationPlayer = null;
        this.particleAnimationPlayer?.destroy();
        this.particleAnimationPlayer = null;
        this.stopClickCountdown();
        this.stopTotalWinTween();
        this.rootNode.destroy();
    }

    private async createUI(parent: Node, mjhl_UIFactory: mjhl_UIFactory, totalWin: number, onButtonClickedCallback: Function) {
        const rootNode = mjhl_UIFactory.createNode({
            parent: parent,
            name: "mjhl_FreeGameSettlePanel"
        });
        this.rootNode = rootNode;
        mjhl_UIFactory.addWidget(rootNode, { top: 0, bottom: 0, left: 0, right: 0 });

        const backgroud = mjhl_UIFactory.createSprite({
            parent: rootNode,
            name: ""
        }, {
            name: "backgroud",
            contentSize: new Size(750, 1334),
            spriteFramePath: "mjhl/images/effects/bonusEffect/total_bg/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });

        log('total_glow_a load')
        const lightNode = hqq.addNode(rootNode,{
            Res:hqq['pq'],
            skeleton:"game/mjhl/animations/spines/total_glow_a/",
            name:"light",
            scaleX:1.4,scaleY:1.3,timeScale:.3,widget:{top:0}
        });
        let lightSkeleton = lightNode.getComponent(sp.Skeleton);
        lightSkeleton.playAnimationLoop("animation");
        this.lightAnimationPlayer = new AnimationPlayer(lightSkeleton);

        const coinsFountainParticle = await this.mjhl_UIFactory.createParticleSystem2DAsync({
            nodeParameter: {
                parent: rootNode,
                name: "coinsFountainParticle"
            },
            playOnLoad: true,
            autoRemoveOnFinish: false,
            filePath: "mjhl/images/effects/particles/bw_particle/bw_particle_a",
            spriteFramePaths: [
                "mjhl/images/effects/particles/bw_particle/bw_particle_a_00/spriteFrame",
                "mjhl/images/effects/particles/bw_particle/bw_particle_a_01/spriteFrame",
                "mjhl/images/effects/particles/bw_particle/bw_particle_a_02/spriteFrame",
                "mjhl/images/effects/particles/bw_particle/bw_particle_a_03/spriteFrame",
                "mjhl/images/effects/particles/bw_particle/bw_particle_a_04/spriteFrame",
                "mjhl/images/effects/particles/bw_particle/bw_particle_a_05/spriteFrame",
                "mjhl/images/effects/particles/bw_particle/bw_particle_a_06/spriteFrame",
                "mjhl/images/effects/particles/bw_particle/bw_particle_a_07/spriteFrame",
                "mjhl/images/effects/particles/bw_particle/bw_particle_a_08/spriteFrame",
                "mjhl/images/effects/particles/bw_particle/bw_particle_a_09/spriteFrame",
                "mjhl/images/effects/particles/bw_particle/bw_particle_a_10/spriteFrame"
            ]
        });
        const rainParticle = await this.mjhl_UIFactory.createParticleSystem2DAsync({
            nodeParameter: {
                parent: rootNode,
                name: "rainParticle",
                //   position: new Vec3(0, 200),
                // rotation: new Vec3(0, 0, 180)
            },
            playOnLoad: true,
            autoRemoveOnFinish: false,
            filePath: "mjhl/images/effects/particles/rainParticle/bw_particle_c_3",
            spriteFramePaths: [
                "mjhl/images/effects/particles/rainParticle/bw_particle_c_02/spriteFrame"
            ],
            customMaterialPath: "mjhl/materials/remove-black-material"
        });

        const goldBackgroud = mjhl_UIFactory.createSprite({
            parent: rootNode,
            name: "",
        }, {
            name: "goldBackgroud",
            contentSize: new Size(750, 1051),
            spriteFramePath: "mjhl/bigImages/freegame/mjhl_freegame_settle/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        }, {
            top: 454
        });

        const title = mjhl_UIFactory.createSprite({
            parent: rootNode,
            name: ""
        }, {
            name: "title",
            contentSize: new Size(460, 200),
            spriteFramePath: "mjhl/images/freegame/mjhl_txt_totalWin/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        }, {
            top: 150
        });

        const spriteNumberDisplayer = new mjhl_SpriteNumberDisplayer({
            parent: rootNode,
            mjhl_UIFactory: mjhl_UIFactory,
            hasComma: true,
            widgetParameter: {
                verticalCenter: 250
            },
        });
        this.spriteNumberDisplayer = spriteNumberDisplayer;
        //const totalWinLabel = mjhl_UIFactory.createLabel({
        //    parent: rootNode,
        //    name: "totalWinLabel"
        //}, {
        //    fontPath: "mjhl/bigImage/text/num/a_mjhl_gold_num",
        //    color: Color.WHITE,
        //    fontSize: 100
        //}, null, {
        //    top: 400
        //});
        //this.totalWinLabel = totalWinLabel;

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
        button.node.active = false;
        this.button = button;
        const receivedIcon = mjhl_UIFactory.createSprite({
            parent: button.node,
            name: ""
        }, {
            name: "receivedIcon",
            contentSize: new Size(148, 71),
            spriteFramePath: "mjhl/images/freegame/mjhl_txt_received_1/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        });
        
        log('bonus_button_vfx load')
        const effectSkeletonNode = hqq.addNode(button.node,{
            Res:hqq['pq'],
            skeleton:"game/mjhl/animations/spines/bonus_button_vfx/",
            name:"effectSkeleton",
            scale:1.33,timeScale: 1
        }); 
        this.particleAnimationPlayer = new AnimationPlayer(effectSkeletonNode.getComponent(sp.Skeleton));

        //this.startTotalWinTween(totalWin);
        this.tweenToNumber(0, totalWin, 2.18);
    }

    //private startTotalWinTween(totalWin: number) {
    //    console.log(`[mjhl_FreeGameSettlePanel] startTotalWinTween ${totalWin}`);
    //    const object = { value: 0 };
    //    this.mjhl_EventRepository.onFreeGameSettleStarted.Notify();
    //    this.totalWinTween = tween(object)
    //        .to(2.18, {
    //            value: totalWin
    //        }, {
    //            progress: (start: number, end: number, current: number, ratio: number) => {
    //                this.totalWinLabel.string = current.toFixed(2).toLocaleString();
    //                return start + (end - start) * ratio;
    //            }
    //        })
    //        .call(() => {
    //            this.totalWinLabel.string = totalWin.toFixed(2).toLocaleString();
    //            this.button.node.active = true;
    //            this.mjhl_EventRepository.onFreeGameSettleFinished.Notify();
    //        })
    //        .start();
    //}

    private onBackgroundClicked() {
        this.shouldFinishTween = true;
        this.finishTweenToNumber();
    }

    private async tweenToNumber(startValue: number, endValue: number, duration: number) {
        this.mjhl_EventRepository.onFreeGameSettleStarted.Notify();
        this.endValue = endValue;
        if (this.shouldFinishTween) {
            this.spriteNumberDisplayer.finishTweenToNumber(endValue);
            this.button.node.active = true;
            this.mjhl_EventRepository.onFreeGameSettleFinished.Notify();
        } else {
            await this.spriteNumberDisplayer.startTweenToNumber({
                startValue: startValue,
                endValue: endValue,
                duration: duration,
                onCompleted: () => {
                    this.button.node.active = true;
                    this.mjhl_EventRepository.onFreeGameSettleFinished.Notify();
                }
            });
        }
    }

    private finishTweenToNumber() {
        this.spriteNumberDisplayer.stopTweenToNumber();
        this.spriteNumberDisplayer.finishTweenToNumber(this.endValue);
        this.button.node.active = true;
        this.mjhl_EventRepository.onFreeGameSettleFinished.Notify();
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
}

interface mjhl_FreeGameSettlePanelParameter {
    parent: Node;
    mjhl_UIFactory: mjhl_UIFactory;
    totalWin: number;
    onButtonClickedCallback: Function;
    mjhl_EventRepository: mjhl_EventRepository;
}