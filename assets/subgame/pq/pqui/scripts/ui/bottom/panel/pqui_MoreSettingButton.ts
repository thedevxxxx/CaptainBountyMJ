import { Node, Sprite, Button, Size } from "cc";
import pqui_EventRepository from "../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class pqui_MoreSettingButton {

    private button: Button;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository) {
        const button = pqui_UIFactory.createButton({
            parent: parent,
            name: ""
        }, {
            transition: Button.Transition.COLOR,
            onClick: () => pqui_EventRepository.onMoreSettingButtonClickedUI.Notify()
        }, {
            contentSize: new Size(30, 36),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_icon_menu/spriteFrame",
            //  color: new Color(180, 120, 80),
        }, null, {
            right: 0,
            top: 45
        });
        this.button = button;

        pqui_EventRepository.onlockButtonsUI.Attach(() => {
            this.lock();
        });

        pqui_EventRepository.onUnlockButtonsUI.Attach(() => {
            this.unlock();
        });
    }

    public destroy() {

    }

    private lock() {
        this.button.interactable = false;
    }

    private unlock() {
        this.button.interactable = true;
    }
}