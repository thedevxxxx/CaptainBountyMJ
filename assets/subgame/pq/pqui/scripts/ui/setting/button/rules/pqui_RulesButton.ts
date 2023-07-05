import { Button, Color, Size, Sprite, Vec3, Label, Node } from "cc";
import pqui_EventRepository from "../../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../../script/ui/pq_UIFactory";
import pqui_RulesPanel from "./pqui_RulesPanel";

export default class pqui_RulesButton {

    private pqui_EventRepository: pqui_EventRepository;

    private pqui_RulesPanel: pqui_RulesPanel;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository) {
        this.pqui_EventRepository = pqui_EventRepository;

        const node = pqui_UIFactory.createNode({
            parent: parent,
            name: "pqui_QuitButton"
        });
        pqui_UIFactory.addWidget(node, { left: 380, top: 15 });

        const button = pqui_UIFactory.createButton({
            parent: node,
            name: ""
        }, {
            transition: Button.Transition.COLOR,
            normalColor: new Color(180, 120, 80),
            hoverColor: new Color(180, 120, 80),
            pressedColor: new Color(127, 82, 52),
            disabledColor: new Color(180, 120, 80),
            onClick: () => this.showPanel(parent, pqui_UIFactory)
        }, {
            contentSize: new Size(54.4, 56.7),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_icon_rule/spriteFrame",
        });

        const label = pqui_UIFactory.createLabel({
            parent: node,
            name: ""
        }, {
            position: new Vec3(0, -60),
            string: "规则",
            color: new Color(161, 146, 138),
            horizontalAlign: Label.HorizontalAlign.CENTER,
            verticalAlign: Label.VerticalAlign.CENTER,
            fontSize: 25
        });
    }

    public destroy() {

    }

    private showPanel(parent: Node, pqui_UIFactory: pqui_UIFactory) {
        if (this.pqui_RulesPanel != null) {
            console.log(`[pqui_RulesButton] pqui_RulesPanel existed`);
            return;
        }
        this.pqui_RulesPanel = new pqui_RulesPanel(parent, pqui_UIFactory, () => this.hidePanel());
        this.pqui_EventRepository.onShowRules.Notify(this.pqui_RulesPanel.rulesPanelBackgroundNode);
    }

    private hidePanel() {
        this.pqui_RulesPanel = null;
    }
}