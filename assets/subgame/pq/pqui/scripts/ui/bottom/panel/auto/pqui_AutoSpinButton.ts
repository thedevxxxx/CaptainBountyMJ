import { Button, Size, Sprite, Color, Node } from "cc";
import pqui_DataRepository from "../../../../data/pqui_DataRepository";
import pqui_EventRepository from "../../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../../script/ui/pq_UIFactory";
import pqui_AutoSpinPanel from "./pqui_AutoSpinPanel";

export default class pqui_AutoSpinButton {

    private pqui_EventRepository: pqui_EventRepository;

    private pqui_DataRepository: pqui_DataRepository;

    private pqui_AutoSpinPanel: pqui_AutoSpinPanel;

    private button: Button;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository, pqui_DataRepository: pqui_DataRepository) {
        this.pqui_EventRepository = pqui_EventRepository;
        this.pqui_DataRepository = pqui_DataRepository;

        const button = pqui_UIFactory.createButton({
            parent: parent,
            name: ""
        }, {
            transition: Button.Transition.SCALE,
            onClick: () => this.showPanel(parent.parent.parent, pqui_UIFactory),
            zoomScale: 0.9
        }, {
            contentSize: new Size(64.4, 64.4),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_icon_frame_auto/spriteFrame",
            color: new Color(180, 120, 80)
        }, null, {
            right: 60,
            top: 30
        });
        this.button = button;

        const icon1 = pqui_UIFactory.createSprite({
            parent: button.node,
            name: ""
        }, {
            contentSize: new Size(64 * 0.7, 65 * 0.7),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_icon_gray_refresh/spriteFrame",
            color: new Color(180, 120, 80)
        });

        const icon2 = pqui_UIFactory.createSprite({
            parent: button.node,
            name: ""
        }, {
            contentSize: new Size(27 * 0.7, 34 * 0.7),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_icon_play/spriteFrame",
            color: new Color(180, 120, 80)
        });

        pqui_EventRepository.onlockButtonsUI.Attach(() => {
            this.lock();
        });

        pqui_EventRepository.onUnlockButtonsUI.Attach(() => {
            this.unlock();
        });
    }

    public destroy() {

    }

    private showPanel(parent: Node, pqui_UIFactory: pqui_UIFactory) {
        if (this.pqui_AutoSpinPanel != null) {
            console.log(`[pqui_AutoSpinButton] pqui_AutoSpinPanel existed`);
            return;
        }
        this.pqui_AutoSpinPanel = new pqui_AutoSpinPanel(parent, pqui_UIFactory, this.pqui_EventRepository, this.pqui_DataRepository, () => this.hidePanel());
    }

    private hidePanel() {
        this.pqui_AutoSpinPanel = null;
    }

    private lock() {
        this.button.interactable = false;
    }

    private unlock() {
        this.button.interactable = true;
    }
}