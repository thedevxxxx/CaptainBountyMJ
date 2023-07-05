import { Button, Color, Size, Sprite, Vec3, Label, Node } from "cc";
import pqui_PaytablePanel from "./pqui_PaytablePanel";
import pqui_EventRepository from "../../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../../script/ui/pq_UIFactory";

export default class pqui_PaytableButton {

    private pqui_EventRepository: pqui_EventRepository;

    private pqui_PaytablePanel: pqui_PaytablePanel;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository) {
        this.pqui_EventRepository = pqui_EventRepository;
        const node = pqui_UIFactory.createNode({
            parent: parent,
            name: "pqui_QuitButton"
        });
        pqui_UIFactory.addWidget(node, { left: 260, top: 15 });

        const button = pqui_UIFactory.createButton({
            parent: node,
            name: ""
        }, {
            transition: Button.Transition.COLOR,
            normalColor: new Color(180, 120, 80),
            hoverColor: new Color(180, 120, 80),
            pressedColor: new Color(127, 82, 52),
            disabledColor: new Color(180, 120, 80),
            onClick: () => this.showPanel(parent.parent.parent, pqui_UIFactory)
        }, {
            contentSize: new Size(54.6, 54.6),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_icon_list/spriteFrame",
        });

        const label = pqui_UIFactory.createLabel({
            parent: node,
            name: ""
        }, {
            position: new Vec3(0, -60),
            string: "赔付表",
            color: new Color(161, 146, 138),
            horizontalAlign: Label.HorizontalAlign.CENTER,
            verticalAlign: Label.VerticalAlign.CENTER,
            fontSize: 25
        });
    }

    public destroy() {

    }

    private showPanel(parent: Node, pqui_UIFactory: pqui_UIFactory) {
        if (this.pqui_PaytablePanel != null) {
            console.log(`[pqui_PaytableButton] pqui_PaytablePanel existed`);
            return;
        }
        this.pqui_PaytablePanel = new pqui_PaytablePanel(parent, pqui_UIFactory, () => this.hidePanel());
        this.pqui_EventRepository.onShowPaytable.Notify(this.pqui_PaytablePanel.paytablePanelBackgroundNode);
    }

    private hidePanel() {
        this.pqui_PaytablePanel = null;
    }
}