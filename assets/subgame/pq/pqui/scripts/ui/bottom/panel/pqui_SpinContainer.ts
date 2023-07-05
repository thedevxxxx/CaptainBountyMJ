import { Node } from "cc";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class pqui_SpinContainer {

    public readonly node: Node;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory) {
        const node = pqui_UIFactory.createNode({
            parent: parent,
            name: "pqui_SpinContainer"
        });
        pqui_UIFactory.addWidget(node, { horizontalCenter: 0, top: 30 });
        this.node = node;
    }

    public destroy() {

    }

    public show() {
        this.node.active = true;
    }

    public hide() {
        this.node.active = false;
    }
}