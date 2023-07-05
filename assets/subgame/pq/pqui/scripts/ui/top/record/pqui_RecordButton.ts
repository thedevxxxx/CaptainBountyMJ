import { Label, Size, Sprite, Button, Color, Vec2, Vec3, Node } from "cc";
import pqui_DataRepository from "../../../data/pqui_DataRepository";
import pqui_RecordPanel from "./pqui_RecordPanel";
import pqui_EventRepository from "../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class pqui_RecordButton {

    private pqui_RecordPanel: pqui_RecordPanel;

    private recordLabel: Label;

    private button: Button;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_DataRepository: pqui_DataRepository, pqui_EventRepository: pqui_EventRepository) {
        const background = pqui_UIFactory.createSprite({
            parent: parent,
            name: ""
        }, {
            contentSize: new Size(240, 50),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_default_sprite_splash/spriteFrame"
        }, {
            right: 10
        });

        const button = pqui_UIFactory.createButton({
            parent: background.node,
            name: ""
        }, {
            transition: Button.Transition.COLOR,
            normalColor: new Color(180, 120, 80),
            hoverColor: new Color(180, 120, 80),
            pressedColor: new Color(127, 82, 52),
            disabledColor: new Color(180, 120, 80),
            contentSize: new Size(240, 50),
            onClick: () => this.showPanel(parent.parent, pqui_UIFactory)
        });
        this.button = button;

        const icon = pqui_UIFactory.createSprite({
            parent: button.node,
            name: ""
        }, {
            color: new Color(180, 120, 80),
            contentSize: new Size(37.8, 32.2),
            position: new Vec2(-90, 0),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_icon_bonus_s/spriteFrame"
        });
        button.target = icon.node;

        const recordLabel = pqui_UIFactory.createLabel({
            parent: button.node,
            name: ""
        }, {
            position: new Vec3(30, 0),
            string: "¥0.00",
            verticalAlign: Label.VerticalAlign.CENTER,
            horizontalAlign: Label.HorizontalAlign.CENTER,
            color: new Color(133, 237, 251),
            fontSize: 30
        });
        this.recordLabel = recordLabel;

        this.setRecordLabel(pqui_DataRepository.winMoney.toFixed(2));
        pqui_EventRepository.onWinMoneyChangedUI.Attach((winMoney) => this.setRecordLabel(winMoney?.toFixed(2)));

        pqui_EventRepository.onlockButtonsUI.Attach(() => {
            this.lock();
        });

        pqui_EventRepository.onUnlockButtonsUI.Attach(() => {
            this.unlock();
        });
    }

    public destroy() {

    }

    private showPanel(parent: Node, pqui_UIFactory: pqui_UIFactory) {
        if (this.pqui_RecordPanel != null) {
            console.log(`[pqui_WalletButton] pqui_RecordPanel existed`);
            return;
        }
        this.pqui_RecordPanel = new pqui_RecordPanel(parent, pqui_UIFactory, () => this.hidePanel());
    }

    private hidePanel() {
        this.pqui_RecordPanel = null;
    }

    private setRecordLabel(winMoney: string) {
        this.recordLabel.string = `¥${winMoney}`;
    }

    private lock() {
        this.button.interactable = false;
    }

    private unlock() {
        this.button.interactable = true;
    }
}