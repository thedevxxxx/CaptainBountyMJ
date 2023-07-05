import pqui_BasePanel from "./bottom/panel/pqui_BasePanel";
import pqui_BottomBackground from "./bottom/pqui_BottomBackground";
import pqui_SettingPanel from "./setting/panel/pqui_SettingPanel";
import pqui_TopPanel from "./top/pqui_TopPanel";
import pqui_DataRepository from "../data/pqui_DataRepository";
import pqui_Warner from "./warnr/pqui_Warner";
import pqui_EventRepository from "../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../script/ui/pq_UIFactory";
import { find, Node } from "cc";

export default class pqui_UI {

    public pqui_BasePanel: pqui_BasePanel;

    private pqui_BottomBackground: pqui_BottomBackground;

    private pqui_SettingPanel: pqui_SettingPanel;

    private pqui_TopPanel: pqui_TopPanel;

    private pqui_Warner: pqui_Warner;

    private node: Node;

    public constructor() {

    }
    public async init(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository, pqui_DataRepository: pqui_DataRepository) {
        const node = pqui_UIFactory.createNode({
            parent: parent,
            name: "pqui_UI"
        });
        this.node = node;
        pqui_UIFactory.addWidget(node, { top: 0, bottom: 0, left: 0, right: 0, target: find("Canvas") });

        this.pqui_TopPanel = new pqui_TopPanel(node, pqui_UIFactory, pqui_EventRepository, pqui_DataRepository);
        this.pqui_BottomBackground = new pqui_BottomBackground(node, pqui_UIFactory, pqui_EventRepository);
        this.pqui_BasePanel = await new pqui_BasePanel().init(this.pqui_BottomBackground.rootNode, pqui_UIFactory, pqui_EventRepository, pqui_DataRepository);
        this.pqui_SettingPanel = new pqui_SettingPanel(this.pqui_BottomBackground.rootNode, pqui_UIFactory, pqui_EventRepository);
        this.pqui_Warner = new pqui_Warner(node, pqui_UIFactory, pqui_EventRepository);

        return this;
    }

    public destroy() {
        this.pqui_Warner.destroy();
        this.pqui_SettingPanel.destroy();
        this.pqui_BasePanel.destroy();
        this.pqui_BottomBackground.destroy();
        this.pqui_TopPanel.destroy();
    }

    public show() {
        this.node.active = true;
    }

    public hide() {
        this.node.active = false;
    }
}