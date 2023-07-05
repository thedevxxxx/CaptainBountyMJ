import { Label, Size, Color, Sprite, Widget, Layout, Button, Vec2, Vec3, Node, UITransform } from "cc";
import pqui_DataRepository from "../../../../data/pqui_DataRepository";
import pqui_Panel from "../../../base/pqui_Panel";
import pqui_EventRepository from "../../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../../script/ui/pq_UIFactory";

export default class pqui_AutoSpinPanel {

    private pqui_EventRepository: pqui_EventRepository;

    private pqui_DataRepository: pqui_DataRepository;

    private panel: pqui_Panel;

    private walletLabel: Label;

    private totalBetLabel: Label;

    private record: Label;

    private autoSpinCount: number;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository, pqui_DataRepository: pqui_DataRepository, onClose: Function) {
        this.pqui_EventRepository = pqui_EventRepository;
        this.pqui_DataRepository = pqui_DataRepository;
        this.createUI(parent, pqui_UIFactory, onClose);
    }

    public destroy() {
        this.pqui_EventRepository.onBalanceChangedUI.Detach(this.setWalletLabel);
        this.pqui_EventRepository.onTotalBetAmountChangedUI.Detach(this.setBetLabel);
    }

    private createUI(parent: Node, pqui_UIFactory: pqui_UIFactory, onClose: Function) {
        const canvasSize = pqui_UIFactory.canvasNode.getComponent(UITransform).contentSize;

        const panel = new pqui_Panel({
            parent: parent,
            panelContentSize: new Size(canvasSize.width, canvasSize.height * 0.375),
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
            string: "自动旋转",
            verticalAlign: Label.VerticalAlign.CENTER,
            horizontalAlign: Label.HorizontalAlign.CENTER,
            color: Color.WHITE,
            fontSize: 40
        }, null, {
            top: 30
        });

        const panelBackgroundNodeSize = panel.backgroundNode.getComponent(UITransform).contentSize;
        const autoCountPanel = pqui_UIFactory.createSprite({
            parent: panel.backgroundNode,
            name: ""
        }, {
            contentSize: new Size(panelBackgroundNodeSize.width, panelBackgroundNodeSize.height * 0.4),
            color: new Color(40, 40, 51),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_white/spriteFrame"
        }, {
            top: 120
        });
        const autoCountTextLabel = pqui_UIFactory.createLabel({
            parent: autoCountPanel.node,
            name: ""
        }, {
            string: "自动旋转次数",
            verticalAlign: Label.VerticalAlign.CENTER,
            horizontalAlign: Label.HorizontalAlign.CENTER,
            color: Color.WHITE,
            fontSize: 25
        }, null, {
            left: 30,
            top: 20
        });
        autoCountTextLabel.getComponent(Widget).alignMode = Widget.AlignMode.ALWAYS;//??
        const autoCountPanelSize = autoCountPanel.getComponent(UITransform).contentSize;
        const layout = pqui_UIFactory.createTransform({
            parent: autoCountPanel.node,
            name: "layout"
        });
        layout.setContentSize(autoCountPanelSize.width, autoCountPanelSize.height * 0.4);
        layout.node.setPosition(0, -20);
        pqui_UIFactory.addHorizontalLayout(layout.node, {
            resizeMode: Layout.ResizeMode.CHILDREN,
            paddingLeft: 40,
            paddingRight: 40,
            spacingX: 5
        });
        const autoCounts = [10, 30, 50, 80, 1000];
        const autoCountButtons = new Array<Button>();
        for (let index = 0; index < autoCounts.length; index++) {
            const autoCount = autoCounts[index];
            const autoCountButton = pqui_UIFactory.createButton({
                parent: layout.node,
                name: ""
            }, {
                transition: Button.Transition.COLOR,
                normalColor: new Color(110, 110, 119),
                pressedColor: new Color(82, 67, 66),
                hoverColor: new Color(82, 67, 66),
                disabledColor: new Color(164, 112, 78),
                onClick: () => {
                    autoCountButton.interactable = false;
                    this.autoSpinCount = autoCount;
                    autoCountButtons.forEach(button => {
                        if (button !== autoCountButton) {
                            button.interactable = true;
                        }
                    });
                    autoSpinButton.interactable = true;
                }
            }, {
                contentSize: new Size(0, 80),
                type: Sprite.Type.SLICED,
                sizeMode: Sprite.SizeMode.CUSTOM,
                spriteFramePath: "pq/pqui/images/pqui_dark_square/spriteFrame",
            }, {
                string: autoCount.toString(),
                color: Color.WHITE,
                horizontalAlign: Label.HorizontalAlign.CENTER,
                verticalAlign: Label.VerticalAlign.CENTER,
                fontSize: 35
            });
            autoCountButton.target = autoCountButton.getComponentInChildren(Label).node;
            autoCountButtons.push(autoCountButton);
        }

        const autoSpinButton = pqui_UIFactory.createButton({
            parent: panel.backgroundNode,
            name: ""
        }, {
            contentSize: new Size(panelBackgroundNodeSize.width * 0.9, panelBackgroundNodeSize.height * 0.15),
            transition: Button.Transition.COLOR,
            normalColor: new Color(180, 120, 80),
            pressedColor: new Color(180, 120, 80),
            hoverColor: new Color(180, 120, 80),
            disabledColor: new Color(83, 67, 65),
            onClick: () => {
                this.pqui_EventRepository.onAutoSpin.Notify(this.autoSpinCount);
                panel.close();
            }
        }, {
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            color: new Color(180, 120, 80),
            spriteFramePath: "pq/pqui/images/pqui_white_square/spriteFrame",
        }, {
            string: "开始自动旋转",
            color: Color.WHITE,
            horizontalAlign: Label.HorizontalAlign.CENTER,
            verticalAlign: Label.VerticalAlign.CENTER,
            fontSize: 33
        }, {
            bottom: 80
        });
        autoSpinButton.interactable = false;

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

    private setWalletLabel = (wallet: number) => {
        this.walletLabel.string = `¥${wallet?.toFixed(2)}`;
    }

    private setBetLabel = (betAmount: number) => {
        this.totalBetLabel.string = `¥${betAmount.toFixed(2)}`;
    }
}