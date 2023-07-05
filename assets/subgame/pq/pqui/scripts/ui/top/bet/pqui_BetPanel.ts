import { Label, Size, Color, Button, Sprite, Vec2, Vec3, Node, UITransform } from "cc";
import pqui_DataRepository from "../../../data/pqui_DataRepository";
import pqui_Panel from "../../base/pqui_Panel";
import pqui_OptionPnael from "./pqui_OptionPnael";
import pqui_EventRepository from "../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class pqui_BetPanel {

    private pqui_EventRepository: pqui_EventRepository;

    private pqui_DataRepository: pqui_DataRepository;

    private panel: pqui_Panel;

    private pqui_OptionPnael: pqui_OptionPnael;

    private walletLabel: Label;

    private totalBetLabel: Label;

    private record: Label;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository, pqui_DataRepository: pqui_DataRepository, onClose: Function) {
        this.pqui_EventRepository = pqui_EventRepository;
        this.pqui_DataRepository = pqui_DataRepository;
        this.createUI(parent, pqui_UIFactory, onClose);
    }

    public destroy() {
        this.pqui_EventRepository.onBalanceChangedUI.Detach(this.setWalletLabel);
        this.pqui_EventRepository.onTotalBetAmountChangedUI.Detach(this.setBetLabel);
        this.pqui_OptionPnael.destroy();
    }

    private createUI(parent: Node, pqui_UIFactory: pqui_UIFactory, onClose: Function) {
        const canvasSize = pqui_UIFactory.canvasNode.getComponent(UITransform).contentSize;
        const panel = new pqui_Panel({
            parent: parent,
            panelContentSize: new Size(canvasSize.width, (canvasSize.height * 0.65)),
            backgroundSpriteFramePath: "pq/pqui/images/pqui_dark_square2/spriteFrame",
            closeButtonSpriteFramePath: "pq/pqui/images/pqui_btn_close/spriteFrame",
            onClose: () => {
                onClose();
                this.destroy();
            },
            pqui_UIFactory: pqui_UIFactory
        });
        this.panel = panel;

        const titleLabel = pqui_UIFactory.createLabel({
            parent: panel.backgroundNode,
            name: ""
        }, {
            string: "投注设置",
            verticalAlign: Label.VerticalAlign.CENTER,
            horizontalAlign: Label.HorizontalAlign.CENTER,
            color: Color.WHITE,
            fontSize: 40
        }, null, {
            top: 30
        });

        this.pqui_OptionPnael = new pqui_OptionPnael(panel.backgroundNode, pqui_UIFactory, this.pqui_DataRepository);

        const panelBackgroundTransform = panel.backgroundNode.getComponent(UITransform);
        const maxBetButton = pqui_UIFactory.createButton({
            parent: panel.backgroundNode,
            name: ""
        }, {
            contentSize: new Size(panelBackgroundTransform.width * 0.25, panelBackgroundTransform.height * 0.1),
            transition: Button.Transition.NONE,
            normalColor: new Color(180, 120, 80),
            disabledColor: new Color(114, 84, 70),
            onClick: () => this.maxBetButtonClicked(),
        }, {
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            color: new Color(180, 120, 80),
            spriteFramePath: "pq/pqui/images/pqui_white_round_rectangle/spriteFrame",
        }, {
            string: "最大投注",
            color: new Color(180, 120, 80),
            horizontalAlign: Label.HorizontalAlign.CENTER,
            verticalAlign: Label.VerticalAlign.CENTER,
            fontSize: 30
        }, {
            left: 10,
            bottom: 100
        });

        const confirmButton = pqui_UIFactory.createButton({
            parent: panel.backgroundNode,
            name: ""
        }, {
            contentSize: new Size(panelBackgroundTransform.width * 0.7, panelBackgroundTransform.height * 0.1),
            transition: Button.Transition.NONE,
            normalColor: new Color(180, 120, 80),
            disabledColor: new Color(114, 84, 70),
            onClick: () => this.onConfirmButtonClicked(),
        }, {
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            color: new Color(180, 120, 80),
            spriteFramePath: "pq/pqui/images/pqui_white_square/spriteFrame",
        }, {
            string: "确定",
            color: Color.WHITE,
            horizontalAlign: Label.HorizontalAlign.CENTER,
            verticalAlign: Label.VerticalAlign.CENTER,
            fontSize: 40
        }, {
            right: 10,
            bottom: 100
        });

        const iconSpriteFramePaths = [
            "pq/pqui/images/pqui_icon_wallet/spriteFrame",
            "pq/pqui/images/pqui_icon_money_touzhu/spriteFrame",
            "pq/pqui/images/pqui_icon_bonus_s/spriteFrame"
        ];
        const widgetParameters = [
            { left: 10, bottom: 10 },
            { horizontalCenter: 0, bottom: 10 },
            { right: 10, bottom: 10 }
        ];
        const labels = new Array<Label>();
        for (let index = 0; index < iconSpriteFramePaths.length; index++) {
            const background = pqui_UIFactory.createSprite({
                parent: panel.backgroundNode,
                name: ""
            }, {
                contentSize: new Size(240, 50),
                type: Sprite.Type.SIMPLE,
                sizeMode: Sprite.SizeMode.CUSTOM,
                spriteFramePath: "pq/pqui/images/pqui_default_sprite_splash/spriteFrame"
            },
                widgetParameters[index]
            );
            const icon = pqui_UIFactory.createSprite({
                parent: background.node,
                name: ""
            }, {
                contentSize: new Size(28, 29.4),
                position: new Vec2(-90, 0),
                type: Sprite.Type.SIMPLE,
                sizeMode: Sprite.SizeMode.CUSTOM,
                color: new Color(180, 120, 80),
                spriteFramePath: iconSpriteFramePaths[index]
            });
            const label = pqui_UIFactory.createLabel({
                parent: background.node,
                name: ""
            }, {
                position: new Vec3(30, 0),
                string: "¥0.00",
                verticalAlign: Label.VerticalAlign.CENTER,
                horizontalAlign: Label.HorizontalAlign.CENTER,
                color: Color.WHITE,
                fontSize: 30
            });
            labels.push(label);
        }
        this.walletLabel = labels[0];
        this.totalBetLabel = labels[1];
        this.record = labels[2];

        this.setWalletLabel(this.pqui_DataRepository.balance);
        this.pqui_EventRepository.onBalanceChangedUI.Attach(this.setWalletLabel);

        this.setBetLabel(this.pqui_DataRepository.totalBetAmount);
        this.pqui_EventRepository.onTotalBetAmountChangedUI.Attach(this.setBetLabel);
    }

    private maxBetButtonClicked() {
        this.pqui_OptionPnael.scrollToMax();
    }

    private onConfirmButtonClicked() {
        this.pqui_EventRepository.onBetAmountChangedUI.Notify(this.pqui_OptionPnael.getBetAmount());
        this.pqui_EventRepository.onBetMutipleChangedUI.Notify(this.pqui_OptionPnael.getBetMutiple());
        this.pqui_EventRepository.onTotalBetAmountChangedUI.Notify(this.pqui_OptionPnael.getTotalBetAmount());
        this.panel.close();
    }

    private setWalletLabel = (wallet: number) => {
        this.walletLabel.string = `¥${wallet?.toFixed(2)}`;
    }

    private setBetLabel = (betAmount: number) => {
        this.totalBetLabel.string = `¥${betAmount.toFixed(2)}`;
    }
}