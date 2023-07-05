import { Label, Size, Color, Sprite, Vec3, Widget, Node, UITransform } from "cc";
import { formatGold } from "../../../../../script/formatter/pq_Formatter";
import pqui_DataRepository from "../../../data/pqui_DataRepository";
import pqui_Panel from "../../base/pqui_Panel";
import pqui_EventRepository from "../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class pqui_WalletPanel {

    private pqui_EventRepository: pqui_EventRepository;

    private panel: pqui_Panel;

    private walletLabel: Label;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_DataRepository: pqui_DataRepository, pqui_EventRepository: pqui_EventRepository, onDestroy: Function) {
        this.pqui_EventRepository = pqui_EventRepository;

        const cavnasNodeTransform = pqui_UIFactory.canvasNode.getComponent(UITransform);
        const panel = new pqui_Panel({
            parent: parent.parent,
            panelContentSize: new Size(cavnasNodeTransform.width, cavnasNodeTransform.height * 0.5),
            backgroundSpriteFramePath: "pq/pqui/images/pqui_white_square1/spriteFrame",
            closeButtonSpriteFramePath: "pq/pqui/images/pqui_btn_close/spriteFrame",
            color: new Color(40, 40, 50),
            onClose: () => {
                onDestroy();
                this.destroy();
            },
            pqui_UIFactory: pqui_UIFactory
        });
        this.panel = panel;

        const label = pqui_UIFactory.createLabel({
            parent: panel.backgroundNode,
            name: ""
        }, {
            string: "余额",
            verticalAlign: Label.VerticalAlign.CENTER,
            horizontalAlign: Label.HorizontalAlign.CENTER,
            color: Color.WHITE,
            fontSize: 40
        }, null, {
            top: 30
        });

        const panelBackgroundTransform = panel.backgroundNode.getComponent(UITransform);
        const walletBackground = pqui_UIFactory.createSprite({
            parent: panel.backgroundNode,
            name: ""
        }, {
            contentSize: new Size(panelBackgroundTransform.width * 0.97, panelBackgroundTransform.height * 0.15),
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            color: new Color(48, 48, 61),
            spriteFramePath: "pq/pqui/images/pqui_white_square/spriteFrame",
        }, {
            top: 120
        });

        const icon = pqui_UIFactory.createSprite({
            parent: walletBackground.node,
            name: ""
        }, {
            contentSize: new Size(29.4, 29.4),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            color: new Color(180, 120, 80),
            spriteFramePath: "pq/pqui/images/pqui_icon_wallet/spriteFrame"
        }, {
            left: 20
        });

        const walletTextLabel = pqui_UIFactory.createLabel({
            parent: walletBackground.node,
            name: ""
        }, {
            position: new Vec3(-220, 0),
            string: "现金钱包",
            color: new Color(180, 120, 80),
            verticalAlign: Label.VerticalAlign.CENTER,
            horizontalAlign: Label.HorizontalAlign.LEFT,
            fontSize: 30
        });

        const walletLabel = pqui_UIFactory.createLabel({
            parent: walletBackground.node,
            name: ""
        }, {
            color: new Color(180, 120, 80),
            verticalAlign: Label.VerticalAlign.CENTER,
            horizontalAlign: Label.HorizontalAlign.RIGHT,
            fontSize: 30
        }, null, {
            right: 40,
            alignMode: Widget.AlignMode.ALWAYS
        });
        this.walletLabel = walletLabel;

        this.setWalletLabel(pqui_DataRepository.balance);
        pqui_EventRepository.onBalanceChangedUI.Attach(this.setWalletLabel);

    }

    public destroy() {
        this.pqui_EventRepository.onBalanceChangedUI.Detach(this.setWalletLabel);
        this.panel.destroy();
    }

    private setWalletLabel = (wallet: number) => {
        this.walletLabel.string = `¥${formatGold(wallet)}`;
    }
}