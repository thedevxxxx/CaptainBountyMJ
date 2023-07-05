import { Label, Tween, Size, Sprite, Button, Color, Vec2, Vec3, tween, Node } from "cc";
import pqui_DataRepository from "../../../data/pqui_DataRepository";
import pqui_EventRepository from "../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";
import pqui_BetPanel from "./pqui_BetPanel";

export default class pqui_BetSettingButton {

    private pqui_EventRepository: pqui_EventRepository;

    private pqui_DataRepository: pqui_DataRepository;

    private pqui_BetPanel: pqui_BetPanel;

    private betAmountLabel: Label;

    private betAmountTween: Tween<Node>;

    private button: Button;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository, pqui_DataRepository: pqui_DataRepository) {
        this.pqui_EventRepository = pqui_EventRepository;
        this.pqui_DataRepository = pqui_DataRepository;

        const background = pqui_UIFactory.createSprite({
            parent: parent,
            name: ""
        }, {
            contentSize: new Size(240, 50),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_default_sprite_splash/spriteFrame"
        }, {
            horizontalCenter: 0
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
            contentSize: new Size(28, 29.4),
            position: new Vec2(-90, 0),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_icon_money_touzhu/spriteFrame"
        });
        button.target = icon.node;

        const betAmountLabel = pqui_UIFactory.createLabel({
            parent: button.node,
            name: ""
        }, {
            position: new Vec3(30, 0),
            string: `¥${pqui_DataRepository.totalBetAmount.toFixed(2)}`,
            verticalAlign: Label.VerticalAlign.CENTER,
            horizontalAlign: Label.HorizontalAlign.CENTER,
            color: new Color(133, 237, 251),
            fontSize: 30
        });
        this.betAmountLabel = betAmountLabel;

        pqui_EventRepository.onTotalBetAmountChangedUI.Attach((betAmount) => this.setBetAmount(betAmount));

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
        if (this.pqui_BetPanel != null) {
            console.log(`[pqui_BetSettingButton] pqui_BetPanel existed`);
            return;
        }
        this.pqui_BetPanel = new pqui_BetPanel(parent, pqui_UIFactory, this.pqui_EventRepository, this.pqui_DataRepository, () => this.hidePanel());
    }

    private hidePanel() {
        this.pqui_BetPanel = null;
    }

    private setBetAmount(betAmount: number) {
        this.betAmountLabel.string = `¥${betAmount.toFixed(2)}`;
        this.stopBetAmountTween();
        this.startBetAmountTween(betAmount);
    }

    private startBetAmountTween(betAmount: number) {
        const scaleIncrease = new Vec3(1.5 + (betAmount * 0.0005), (1.5 + (betAmount * 0.0005)));
        const scaleDecrease = new Vec3(0.9, 0.9);
        this.betAmountTween = tween(this.betAmountLabel.node)
            .to(0.075, { scale: scaleIncrease })
            .to(0.1, { scale: scaleDecrease })
            .to(0.1, { scale: Vec3.ONE }, { easing: "backOut" })
            .start()
    }

    private stopBetAmountTween() {
        if (this.betAmountTween != null) {
            this.betAmountTween.stop();
            this.betAmountLabel.node.scale = Vec3.ONE;
            this.betAmountTween = null;
        }
    }

    private lock() {
        this.button.interactable = false;
    }

    private unlock() {
        this.button.interactable = true;
    }
}