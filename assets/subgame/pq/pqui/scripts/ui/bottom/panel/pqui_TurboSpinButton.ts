import { Sprite, Button, Size, Color, SpriteFrame, Node, Vec3 } from "cc";
import AnimationPlayer from "../../animations/AnimationPlayer";
import pqui_EventRepository from "../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { log } from "cc";
import { sp } from "cc";

export default class pqui_TurboButton {

    public isTurboOn: boolean;

    private pqui_UIFactory: pqui_UIFactory;

    private pqui_EventRepository: pqui_EventRepository;

    private buttotSprite: Sprite;

    private icon: Sprite;

    private lightingAnimationPlayer: AnimationPlayer;

    private offFrameSpriteFrame: SpriteFrame;

    private turboFrameSpriteFrame: SpriteFrame;

    private turboOffSpriteFrame: SpriteFrame;

    public constructor() {

    }

    public async init(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository) {
        this.pqui_UIFactory = pqui_UIFactory;
        this.pqui_EventRepository = pqui_EventRepository;

        this.isTurboOn = false;

        const button = pqui_UIFactory.createButton({
            parent: parent,
            name: ""
        }, {
            transition: Button.Transition.SCALE,
            onClick: () => this.onTurboButtonClicked(),
            zoomScale: 0.9
        }, {
            contentSize: new Size(64.4, 64.4),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_icon_frame_rapid/spriteFrame",
            color: new Color(180, 120, 80),
        }, null, {
            left: 50,
            top: 30
        });
        this.buttotSprite = button.getComponent(Sprite);

        const icon = pqui_UIFactory.createSprite({
            parent: button.node,
            name: "",
            scale: new Vec3(0.8, 0.8)
        }, {
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.RAW,
            color: new Color(180, 120, 80),
            spriteFramePath: "pq/pqui/images/pqui_icon_flash_1/spriteFrame"//pqui_flash_close_1
        });
        this.icon = icon;

        log('turbo_lightning load')
        const lightingNode = hqq.addNode(button.node,{
            Res:hqq['pq'],
            skeleton:"game/mjhl/animations/spines/turbo_lightning/",
            name:"lighting",
            timeScale: 0.5,scale:0.8,color:new Color(180, 120, 80)
        }); 
        this.lightingAnimationPlayer = new AnimationPlayer(lightingNode.getComponent(sp.Skeleton));

        this.offFrameSpriteFrame = await this.pqui_UIFactory.assetRepository.getAsset<SpriteFrame>("pq/pqui/images/pqui_icon_frame_off/spriteFrame", SpriteFrame);
        this.turboFrameSpriteFrame = await this.pqui_UIFactory.assetRepository.getAsset<SpriteFrame>("pq/pqui/images/pqui_icon_frame_rapid/spriteFrame", SpriteFrame);
        this.turboOffSpriteFrame = await this.pqui_UIFactory.assetRepository.getAsset<SpriteFrame>("pq/pqui/images/pqui_flash_close_1/spriteFrame", SpriteFrame);

        return this;
    }

    public destroy() {
        this.lightingAnimationPlayer?.destroy();
        this.lightingAnimationPlayer = null;
    }

    private onTurboButtonClicked() {
        if (this.isTurboOn) {
            this.turboOff();
        } else {
            this.turboOn();
        }
    }

    private turboOn() {
        this.hideIcon();
        this.isTurboOn = true;
        this.buttotSprite.spriteFrame = this.turboFrameSpriteFrame;
        this.lightingAnimationPlayer.stopAnimation();
        this.lightingAnimationPlayer.playAnimationLoop("active");

        this.pqui_EventRepository.onBlackToastUI.Notify({
            content: "极速旋转已开启",
            extraContent: [
                this.pqui_UIFactory.createSprite({
                    parent: null,
                    name: ""
                }, {
                    contentSize: new Size(32 * 0.7, 42 * 0.7),
                    type: Sprite.Type.SIMPLE,
                    sizeMode: Sprite.SizeMode.CUSTOM,
                    color: new Color(180, 120, 80),
                    spriteFramePath: "pq/pqui/images/pqui_icon_flash_1/spriteFrame"
                })
            ]
        });
    }

    private turboOff() {
        this.isTurboOn = false;
        this.buttotSprite.spriteFrame = this.offFrameSpriteFrame;
        this.icon.spriteFrame = this.turboOffSpriteFrame;

        this.lightingAnimationPlayer.stopAnimation();
        this.lightingAnimationPlayer.playAnimationOnce("active-inactive");

        this.pqui_EventRepository.onBlackToastUI.Notify({
            content: "极速旋转已关闭",
            extraContent: [
                this.pqui_UIFactory.createSprite({
                    parent: null,
                    name: ""
                }, {
                    contentSize: new Size(37 * 0.7, 39 * 0.7),
                    type: Sprite.Type.SIMPLE,
                    sizeMode: Sprite.SizeMode.CUSTOM,
                    color: new Color(180, 120, 80),
                    spriteFramePath: "pq/pqui/images/pqui_flash_close_1/spriteFrame"
                })
            ]
        });

        this.showIcon();
    }

    private showIcon() {
        this.icon.node.active = true;
    }

    private hideIcon() {
        this.icon.node.active = false;
    }
}