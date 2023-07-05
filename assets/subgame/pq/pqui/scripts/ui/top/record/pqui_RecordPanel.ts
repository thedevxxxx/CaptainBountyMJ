import { Node, Size, UITransform } from "cc";
import pqui_Panel from "../../base/pqui_Panel";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class pqui_RecordPanel {

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, onDestroy: Function) {
        const canvasSize = pqui_UIFactory.canvasNode.getComponent(UITransform).contentSize;
        const panel = new pqui_Panel({
            parent: parent,
            panelContentSize: new Size(canvasSize.width, canvasSize.height),
            backgroundSpriteFramePath: "pq/pqui/images/pqui_dark_square2/spriteFrame",
            closeButtonSpriteFramePath: "pq/pqui/images/pqui_btn_close2/spriteFrame",
            onClose: onDestroy,
            pqui_UIFactory: pqui_UIFactory
        });

        // const label = pqui_UIFactory.createLabel(panel.backgroundNode, {
        //     string: "投注设置",
        //     verticalAlign: Label.VerticalAlign.CENTER,
        //     horizontalAlign: Label.HorizontalAlign.CENTER,
        //     color: Color.WHITE,
        //     fontSize: 40
        // }, null, {
        //     top: 30
        // });
    }

    public destroy() {

    }


}