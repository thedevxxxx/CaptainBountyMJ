import { Sprite, Button, Color, Size, Vec3, Label, SpriteFrame, Node } from "cc";
import pqui_EventRepository from "../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class pqui_SoundButton {

    private pqui_UIFactory: pqui_UIFactory;

    private pqui_EventRepository: pqui_EventRepository;

    private isMute: boolean;

    private buttotSprite: Sprite;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository) {
        this.pqui_UIFactory = pqui_UIFactory;
        this.pqui_EventRepository = pqui_EventRepository;

        const node = pqui_UIFactory.createNode({
            parent: parent,
            name: "pqui_QuitButton"
        });
        pqui_UIFactory.addWidget(node, { left: 140, top: 15 });

        const button = pqui_UIFactory.createButton({
            parent: node,
            name: ""
        }, {
            transition: Button.Transition.COLOR,
            normalColor: new Color(180, 120, 80),
            hoverColor: new Color(180, 120, 80),
            pressedColor: new Color(127, 82, 52),
            disabledColor: new Color(180, 120, 80),
            onClick: () => this.onTurboButtonClicked()
        }, {
            contentSize: new Size(52.5, 50.4),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_btn_volumn_on/spriteFrame",
        });
        this.buttotSprite = button.getComponent(Sprite);

        const label = pqui_UIFactory.createLabel({
            parent: node,
            name: ""
        }, {
            position: new Vec3(0, -60),
            string: "声音",
            color: new Color(161, 146, 138),
            horizontalAlign: Label.HorizontalAlign.CENTER,
            verticalAlign: Label.VerticalAlign.CENTER,
            fontSize: 25
        });
    }

    public destroy() {

    }

    private onTurboButtonClicked() {
        if (this.isMute) {
            this.muteOff();
        } else {
            this.muteOn();
        }
    }

    private async muteOn() {
        this.isMute = true;
        this.buttotSprite.spriteFrame = await this.pqui_UIFactory.assetRepository.getAsset<SpriteFrame>("pq/pqui/images/pqui_btn_volumn_off/spriteFrame", SpriteFrame);
        this.pqui_EventRepository.onMute.Notify(true);
    }

    private async muteOff() {
        this.isMute = false;
        this.buttotSprite.spriteFrame = await this.pqui_UIFactory.assetRepository.getAsset<SpriteFrame>("pq/pqui/images/pqui_btn_volumn_on/spriteFrame", SpriteFrame);
        this.pqui_EventRepository.onMute.Notify(false);
    }
}