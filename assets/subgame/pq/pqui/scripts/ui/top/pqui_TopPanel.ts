import { Widget, Node } from "cc";
import pqui_DataRepository from "../../data/pqui_DataRepository";
import pqui_EventRepository from "../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../script/ui/pq_UIFactory";
import pqui_BetSettingButton from "./bet/pqui_BetSettingButton";
import pqui_RecordButton from "./record/pqui_RecordButton";
import pqui_WalletButton from "./wallet/pqui_WalletButton";


export default class pqui_TopPanel {

    private pqui_EventRepository: pqui_EventRepository;

    private node: Node;

    private pqui_WalletButton: pqui_WalletButton;

    private pqui_BetSettingButton: pqui_BetSettingButton;

    private pqui_RecordButton: pqui_RecordButton;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository, pqui_DataRepository: pqui_DataRepository) {
        this.pqui_EventRepository = pqui_EventRepository;
        const node = pqui_UIFactory.createNode({
            parent: parent,
            name: "pqui_TopPanel"
        });
        pqui_UIFactory.addWidget(node, { bottom: 220, left: 0, right: 0 });
        this.node = node;

        this.pqui_WalletButton = new pqui_WalletButton(node, pqui_UIFactory, pqui_DataRepository, pqui_EventRepository);
        this.pqui_BetSettingButton = new pqui_BetSettingButton(node, pqui_UIFactory, pqui_EventRepository, pqui_DataRepository);
        this.pqui_RecordButton = new pqui_RecordButton(node, pqui_UIFactory, pqui_DataRepository, pqui_EventRepository);

        pqui_EventRepository.onTopPanelWidgetBottomChangeUI.Attach(this.setWidgetBottom);
    }

    public destroy() {
        this.pqui_EventRepository.onTopPanelWidgetBottomChangeUI.Detach(this.setWidgetBottom);
        this.pqui_RecordButton = null;
        this.pqui_BetSettingButton = null;
        this.pqui_WalletButton = null;
    }

    public setWidgetBottom = (bottom: number) => {
        const widget = this.node.getComponent(Widget);
        widget.bottom = bottom;
        widget.updateAlignment();
    }
}