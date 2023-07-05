import { Label, Size, Sprite, Button, Color, Vec2, Vec3, Node } from "cc";
import pqui_DataRepository from "../../../data/pqui_DataRepository";
import pqui_EventRepository from "../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";
import pqui_WalletPanel from "./pqui_WalletPanel";

export default class pqui_WalletButton {

    private pqui_EventRepository: pqui_EventRepository;

    private pqui_DataRepository: pqui_DataRepository;

    private pqui_WalletPanel: pqui_WalletPanel;

    private walletLabel: Label;

    private button: Button;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_DataRepository: pqui_DataRepository, pqui_EventRepository: pqui_EventRepository) {
        this.pqui_EventRepository = pqui_EventRepository;
        this.pqui_DataRepository = pqui_DataRepository;

        this.createUI(parent, pqui_UIFactory);

        pqui_EventRepository.onlockButtonsUI.Attach(() => {
            this.lock();
        });

        pqui_EventRepository.onUnlockButtonsUI.Attach(() => {
            this.unlock();
        });
    }

    public destroy() {

    }

    private createUI(parent: Node, pqui_UIFactory: pqui_UIFactory) {
        const background = pqui_UIFactory.createSprite({
            parent: parent,
            name: ""
        }, {
            contentSize: new Size(240, 50),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_default_sprite_splash/spriteFrame"
        }, {
            left: 10
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
            onClick: () => this.showPanel(parent, pqui_UIFactory)
        });
        this.button = button;

        const icon = pqui_UIFactory.createSprite({
            parent: button.node,
            name: ""
        }, {
            color: new Color(180, 120, 80),
            contentSize: new Size(29.4, 29.4),
            position: new Vec2(-90, 0),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_icon_wallet/spriteFrame"
        });
        button.target = icon.node;

        const walletLabel = pqui_UIFactory.createLabel({
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
        this.walletLabel = walletLabel;

        this.setWalletLabel(this.pqui_DataRepository.balance.toFixed(2));
        this.pqui_EventRepository.onBalanceChangedUI.Attach((balance) => this.setWalletLabel(balance?.toFixed(2)));
    }

    private showPanel(parent: Node, pqui_UIFactory: pqui_UIFactory) {
        if (this.pqui_WalletPanel != null) {
            console.log(`[pqui_WalletButton] pqui_WalletPanel existed`);
            return;
        }
        this.pqui_WalletPanel = new pqui_WalletPanel(parent, pqui_UIFactory, this.pqui_DataRepository, this.pqui_EventRepository, () => this.hidePanel());
    }

    private hidePanel() {
        this.pqui_WalletPanel = null;
    }

    private setWalletLabel(balance: string) {
        this.walletLabel.string = `¥${balance}`;
    }

    private lock() {
        this.button.interactable = false;
    }

    private unlock() {
        this.button.interactable = true;
    }
}