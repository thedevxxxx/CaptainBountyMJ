/*
import { ParticleSystem2D } from "cc";
import { Button, Color, KeyCode, Node, Size, Sprite, TERRAIN_NORTH_INDEX, Tween, tween, Vec2, Vec3 } from "cc";
import TweenPlayer from "../animations/mahjongWays_TweenPlayer";
import mahjongWays_SpriteNumberDisplayer from "../spritenumber/mahjongWays_SpriteNumberDisplayer";
import mahjongWays_EventRepository from "../../../../../script/event/pq_EventRepository";
import mahjongWays_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class mahjongWays_WinEffect {

    private mahjongWays_UIFactory: mahjongWays_UIFactory;

    private rootNode: Node;

    private backTreasureBowlContainer: Node;

    private frontTreasureBowlContainer: Node;

    private treasureTowerContainer: Node;

    private textContainer: Node;

    private bigWinSprite: Sprite;

    private megaWinSprite: Sprite;

    private superWinSprite: Sprite;

    private spriteNumberDisplayer: mahjongWays_SpriteNumberDisplayer;

    private shouldFinishTween: boolean;

    private endValue: number;

    private plate: Sprite;

    private glare: Sprite;

    private rotationTween: TweenPlayer<Node>;

    private bounceTween: TweenPlayer<{ scale: number }>;

    private explosionTween: TweenPlayer<{ scale: number, red: number, green: number, blue: number }>

    private bigWinBackground: Sprite;

    private explosion: Sprite;

    private halo: Sprite;

    private coinsFountainParticle: ParticleSystem2D;

    private ingotsFountainParticle: ParticleSystem2D;

    public constructor() {

    }

    public async init(mahjongWays_WinEffectParameter: mahjongWays_WinEffectParameter) {
        await this.createUI(mahjongWays_WinEffectParameter);

        this.bounceTween = new TweenPlayer();
        this.explosionTween = new TweenPlayer();

        this.startRotationTween();

        return this;
    }

    public destroy() {
        this.coinsFountainParticle.stopSystem();
        this.ingotsFountainParticle.stopSystem();
        this.explosionTween.destroy()
        this.explosionTween = null;
        this.rotationTween.destroy()
        this.rotationTween = null;
        this.bounceTween.destroy();
        this.bounceTween = null;
        this.spriteNumberDisplayer.stopTweenToNumber();
        this.spriteNumberDisplayer = null;
        this.rootNode?.destroy();
    }

    private async createUI(mahjongWays_WinEffectParameter: mahjongWays_WinEffectParameter) {
        const parent = mahjongWays_WinEffectParameter.parent;
        const mahjongWays_UIFactory = mahjongWays_WinEffectParameter.mahjongWays_UIFactory;
        const mahjongWays_EventRepository = mahjongWays_WinEffectParameter.mahjongWays_EventRepository;

        this.mahjongWays_UIFactory = mahjongWays_UIFactory;

        const rootNode = mahjongWays_UIFactory.createNode({
            parent: parent,
            name: "mahjongWays_WinEffect",
            position: new Vec3(0, 100)
        });
        this.rootNode = rootNode;

        const background = mahjongWays_UIFactory.createButton({
            parent: rootNode,
            name: "background"
        }, {
            onClick: () => this.onBackgroundClicked(),
            transition: Button.Transition.NONE
        }, {
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "mahjong-ways/images/mahjongWays_white/spriteFrame",
            color: new Color(0, 0, 0, 150)
        }, null, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            target: mahjongWays_UIFactory.canvasNode
        });

        const coinsFountainParticle = await this.mahjongWays_UIFactory.createParticleSystem2DAsync({
            nodeParameter: {
                parent: rootNode,
                name: "coinsFountainParticle"
            },
            playOnLoad: false,
            autoRemoveOnFinish: false,
            filePath: "mahjong-ways/images/effects/particles/bw_particle/bw_particle_b",
            spriteFramePaths: [
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_a_00/spriteFrame",
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_a_01/spriteFrame",
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_a_02/spriteFrame",
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_a_03/spriteFrame",
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_a_04/spriteFrame",
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_a_05/spriteFrame",
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_a_06/spriteFrame",
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_a_07/spriteFrame",
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_a_08/spriteFrame",
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_a_09/spriteFrame",
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_a_10/spriteFrame"
            ]
        });
        coinsFountainParticle.stopSystem();
        this.coinsFountainParticle = coinsFountainParticle;

        const ingotsFountainParticle = await this.mahjongWays_UIFactory.createParticleSystem2DAsync({
            nodeParameter: {
                parent: rootNode,
                name: "ingotsFountainParticle"
            },
            playOnLoad: false,
            autoRemoveOnFinish: false,
            filePath: "mahjong-ways/images/effects/particles/bw_particle/bw_particle_b",
            spriteFramePaths: [
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_b_00/spriteFrame",
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_b_01/spriteFrame",
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_b_02/spriteFrame",
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_b_03/spriteFrame",
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_b_04/spriteFrame",
                "mahjong-ways/images/effects/particles/bw_particle/bw_particle_b_05/spriteFrame"
            ]
        });
        ingotsFountainParticle.stopSystem();
        this.ingotsFountainParticle = ingotsFountainParticle;

        const rainParticle = await this.mahjongWays_UIFactory.createParticleSystem2DAsync({
            nodeParameter: {
                parent: rootNode,
                name: "rainParticle",
                position: new Vec3(0, 200)
            },
            playOnLoad: true,
            autoRemoveOnFinish: false,
            filePath: "mahjong-ways/images/effects/particles/rainParticle/bw_particle_c",
            spriteFramePaths: [
                "mahjong-ways/images/effects/particles/rainParticle/bw_particle_c_01/spriteFrame",
                "mahjong-ways/images/effects/particles/rainParticle/bw_particle_c_02/spriteFrame",
                "mahjong-ways/images/effects/particles/rainParticle/bw_particle_c_03/spriteFrame",
            ],
            customMaterialPath: "mahjong-ways/materials/remove-black-material"
        });

        const plate = mahjongWays_UIFactory.createSprite({
            parent: rootNode,
            name: "plate",
            scale: new Vec3(1, 1)
        }, {
            position: new Vec2(0, -150),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            contentSize: new Size(540, 530),
            spriteFramePath: "mahjong-ways/images/effects/bigWinEffect/bw_vfx_a/spriteFrame",
            materialPath: "mahjong-ways/materials/remove-black-material"
        });
        this.plate = plate;

        const backTreasureBowlContainer = mahjongWays_UIFactory.createNode({
            parent: rootNode,
            name: "backTreasureBowlContainer"
        });
        this.backTreasureBowlContainer = backTreasureBowlContainer;
        const backLeftTreasureBowl = mahjongWays_UIFactory.createSprite({
            parent: backTreasureBowlContainer,
            name: "backLeftTreasureBowl",
        }, {
            position: new Vec2(-170, 0),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            contentSize: new Size(218, 221),
            spriteFramePath: "mahjong-ways/images/win/mahjongWays_treasureBowl/spriteFrame"
        });
        const backRightTreasureBowl = mahjongWays_UIFactory.createSprite({
            parent: backTreasureBowlContainer,
            name: "backLeftTreasureBowl",
            scale: new Vec3(-1, 1)
        }, {
            position: new Vec2(170, 0),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            contentSize: new Size(218, 221),
            spriteFramePath: "mahjong-ways/images/win/mahjongWays_treasureBowl/spriteFrame"
        });

        const bigWinBackground = mahjongWays_UIFactory.createSprite({
            parent: rootNode,
            name: "bigWinBackground",
        }, {
            position: new Vec2(0, 0),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            contentSize: new Size(565, 311),
            spriteFramePath: "mahjong-ways/images/win/mahjongWays_bigWin/spriteFrame"
        });
        this.bigWinBackground = bigWinBackground;

        const frontTreasureBowlContainer = mahjongWays_UIFactory.createNode({
            position: new Vec3(0, -150),
            parent: rootNode,
            name: "fontTreasureBowlContainer"
        });
        this.frontTreasureBowlContainer = frontTreasureBowlContainer;
        const frontLeftTreasureBowl = mahjongWays_UIFactory.createSprite({
            parent: frontTreasureBowlContainer,
            name: "backLeftTreasureBowl",
        }, {
            position: new Vec2(-130, 0),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            contentSize: new Size(218, 221),
            spriteFramePath: "mahjong-ways/images/win/mahjongWays_treasureBowl/spriteFrame"
        });
        const frontRightTreasureBowl = mahjongWays_UIFactory.createSprite({
            parent: frontTreasureBowlContainer,
            name: "backLeftTreasureBowl",
            scale: new Vec3(-1, 1)
        }, {
            position: new Vec2(130, 0),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            contentSize: new Size(218, 221),
            spriteFramePath: "mahjong-ways/images/win/mahjongWays_treasureBowl/spriteFrame"
        });

        const treasureTowerContainer = mahjongWays_UIFactory.createNode({
            position: new Vec3(0, -150),
            parent: rootNode,
            name: "treasureTowerContainer"
        });
        this.treasureTowerContainer = treasureTowerContainer;
        const leftTreasureTower = mahjongWays_UIFactory.createSprite({
            parent: treasureTowerContainer,
            name: "leftTreasureTower",
        }, {
            position: new Vec2(-230, 0),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            contentSize: new Size(218 * 0.75, 221 * 0.75),
            spriteFramePath: "mahjong-ways/images/win/mahjongWays_treasureTower/spriteFrame"
        });
        const rightTreasureTower = mahjongWays_UIFactory.createSprite({
            parent: treasureTowerContainer,
            name: "rightTreasureTower",
        }, {
            position: new Vec2(230, 0),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            contentSize: new Size(218 * 0.75, 221 * 0.75),
            spriteFramePath: "mahjong-ways/images/win/mahjongWays_treasureTower/spriteFrame"
        });

        const glare = mahjongWays_UIFactory.createSprite({
            parent: rootNode,
            name: "glare",
            scale: new Vec3(1.5, 1.5)
        }, {
            position: new Vec2(0, -100),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            contentSize: new Size(540, 496),
            spriteFramePath: "mahjong-ways/images/effects/bigWinEffect/bw_vfx_b/spriteFrame",
            materialPath: "mahjong-ways/materials/remove-black-material"
        });
        this.glare = glare;

        const halo = mahjongWays_UIFactory.createSprite({
            parent: rootNode,
            name: "halo",
            scale: new Vec3(5, 5)
        }, {
            position: new Vec2(0, -100),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            contentSize: new Size(138, 139),
            spriteFramePath: "mahjong-ways/images/effects/bigWinEffect/bw_vfx_g/spriteFrame",
            materialPath: "mahjong-ways/materials/remove-black-material"
        });
        this.halo = halo;


        const sunLight = mahjongWays_UIFactory.createSprite({
            parent: rootNode,
            name: "plate",
            scale: new Vec3(1.5, 1.5)
        }, {
            position: new Vec2(0, -250),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            contentSize: new Size(540, 317),
            spriteFramePath: "mahjong-ways/images/effects/bigWinEffect/bw_vfx_c/spriteFrame",
            materialPath: "mahjong-ways/materials/remove-black-material"
        });
        const explosion = mahjongWays_UIFactory.createSprite({
            parent: rootNode,
            name: "plate",
            scale: new Vec3(2, 2)
        }, {
            position: new Vec2(0, -150),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            contentSize: new Size(211, 191),
            spriteFramePath: "mahjong-ways/images/effects/bigWinEffect/bw_vfx_f/spriteFrame",
            materialPath: "mahjong-ways/materials/remove-black-material"
        });
        explosion.node.active = false;
        this.explosion = explosion;


        const textContainer = mahjongWays_UIFactory.createNode({
            position: new Vec3(0, -50),
            parent: rootNode,
            name: "textContainer"
        });
        this.textContainer = textContainer;
        const bigWinSprite = mahjongWays_UIFactory.createSprite({
            parent: textContainer,
            name: "bigWin",
        }, {
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            contentSize: new Size(317 * 0.75, 197 * 0.75),
            spriteFramePath: "mahjong-ways/images/win/mahjongWays_txt_bigWin/spriteFrame"
        });
        this.bigWinSprite = bigWinSprite;
        const megaWinSprite = mahjongWays_UIFactory.createSprite({
            parent: textContainer,
            name: "megaWin",
        }, {
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            contentSize: new Size(317 * 0.75, 194 * 0.75),
            spriteFramePath: "mahjong-ways/images/win/mahjongWays_txt_megaWin/spriteFrame"
        });
        this.megaWinSprite = megaWinSprite;
        const superWinSprite = mahjongWays_UIFactory.createSprite({
            parent: textContainer,
            name: "superWin",
        }, {
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            contentSize: new Size(631 * 0.75, 214 * 0.75),
            spriteFramePath: "mahjong-ways/images/win/mahjongWays_txt_superWin/spriteFrame"
        });
        this.superWinSprite = superWinSprite;

        const spriteNumberDisplayer = new mahjongWays_SpriteNumberDisplayer({
            parent: rootNode,
            mahjongWays_UIFactory: mahjongWays_UIFactory,
            hasComma: true,
            widgetParameter: { bottom: -230 },
            //onStartTweenToNumber: () => mahjongWays_EventRepository.onWinEffectTweenToNumberStarted.Notify(),
            //onTweenToNumberFinished: () => mahjongWays_EventRepository.onWinEffectTweenToNumberFinished.Notify()
        });
        this.spriteNumberDisplayer = spriteNumberDisplayer;
    }

    public async tweenToNumber(startValue: number, endValue: number, duration: number) {
        this.endValue = endValue;
        if (this.shouldFinishTween) {
            this.spriteNumberDisplayer.finishTweenToNumber(endValue);
        } else {
            await this.spriteNumberDisplayer.startTweenToNumber({
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

        if (!this.coinsFountainParticle.stopped) {
            this.coinsFountainParticle.stopSystem();
        }
        this.ingotsFountainParticle.resetSystem();
    }

    private onBackgroundClicked() {
        this.shouldFinishTween = true;
        this.finishTweenToNumber();
    }

    private finishTweenToNumber() {
        this.spriteNumberDisplayer.stopTweenToNumber();
        this.spriteNumberDisplayer.finishTweenToNumber(this.endValue);
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
        this.spriteNumberDisplayer.layoutNode.setScale(0, 0);
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
                    this.spriteNumberDisplayer.layoutNode.setScale(scale, scale);
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
                    this.spriteNumberDisplayer.layoutNode.setScale(scale, scale);
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
}

interface mahjongWays_WinEffectParameter {
    parent: Node;
    mahjongWays_UIFactory: mahjongWays_UIFactory;
    mahjongWays_EventRepository: mahjongWays_EventRepository;
}
*/