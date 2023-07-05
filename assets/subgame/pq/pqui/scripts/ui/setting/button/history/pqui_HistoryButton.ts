import { Button, Color, Size, Sprite, Vec3, Label, Node } from "cc";
import pqui_RecordPanel from "../../../top/record/pqui_RecordPanel";
import pqui_UIFactory from "../../../../../../script/ui/pq_UIFactory";

export default class pqui_HistoryButton {

    private pqui_RecordPanel: pqui_RecordPanel;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory) {
        const node = pqui_UIFactory.createNode({
            parent: parent,
            name: "pqui_QuitButton"
        });
        pqui_UIFactory.addWidget(node, { left: 500, top: 15 });

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
            contentSize: new Size(68.6, 58.8),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_icon_bonus/spriteFrame",
        });

        const label = pqui_UIFactory.createLabel({
            parent: node,
            name: ""
        }, {
            position: new Vec3(0, -60),
            string: "历史",
            color: new Color(161, 146, 138),
            horizontalAlign: Label.HorizontalAlign.CENTER,
            verticalAlign: Label.VerticalAlign.CENTER,
            fontSize: 25
        });
    }

    public destroy() {

    }

    private showPanel(parent: Node, pqui_UIFactory: pqui_UIFactory) {
        if (this.pqui_RecordPanel != null) {
            console.log(`[pqui_HistoryButton] pqui_RecordPanel existed`);
            return;
        }
        this.pqui_RecordPanel = new pqui_RecordPanel(parent, pqui_UIFactory, () => this.hidePanel());
    }

    private hidePanel() {
        this.pqui_RecordPanel = null;
    }
}