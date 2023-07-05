import { Color, Node, Size, UITransform, Widget } from "cc";
import pqui_Panel from "../../../base/pqui_Panel";
import pqui_UIFactory from "../../../../../../script/ui/pq_UIFactory";

export default class pqui_PaytablePanel {

    public paytablePanelBackgroundNode: Node;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, onDestroy: Function) {
        const canvasSize = pqui_UIFactory.canvasNode.getComponent(UITransform).contentSize;
        const panel = new pqui_Panel({
            parent: parent,
            panelContentSize: new Size(canvasSize.width, canvasSize.height),
            backgroundSpriteFramePath: "pq/pqui/images/pqui_dark_square3/spriteFrame",
            closeButtonSpriteFramePath: "pq/pqui/images/pqui_btn_close2/spriteFrame",
            onClose: onDestroy,
            pqui_UIFactory: pqui_UIFactory
        });
        const paytablePanelBackgroundNode = panel.backgroundNode;
        this.paytablePanelBackgroundNode = paytablePanelBackgroundNode;

        const titleLabel = pqui_UIFactory.createLabel({
            parent: paytablePanelBackgroundNode,
            name: "title"
        }, {
            string: "赔付表",
            color: new Color(180, 120, 80)
        }, null, {
            top: 20,
            horizontalCenter: 0,
            alignMode: Widget.AlignMode.ALWAYS
        });
    }

    public destroy() {

    }
}