import { Tween, Vec3, tween, Node, UIOpacity } from "cc";
import pqui_DataRepository from "../../../data/pqui_DataRepository";
import pqui_AutoSpinButton from "./auto/pqui_AutoSpinButton";
import pqui_MinusButton from "./pqui_MinusButton";
import pqui_MoreSettingButton from "./pqui_MoreSettingButton";
import pqui_PlusButton from "./pqui_PlusButton";
import pqui_SpinContainer from "./pqui_SpinContainer";
import pqui_TurboButton from "./pqui_TurboSpinButton";
import pqui_EventRepository from "../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class pqui_BasePanel {

    public pqui_SpinContainer: pqui_SpinContainer;

    public pqui_TurboButton: pqui_TurboButton;

    private pqui_MinusButton: pqui_MinusButton;

    private pqui_PlusButton: pqui_PlusButton;

    private pqui_AutoSpinButton: pqui_AutoSpinButton;

    private pqui_MoreSettingButton: pqui_MoreSettingButton;

    private node: Node;

    private nodeTween: Tween<Node>;

    private opacityTween: Tween<UIOpacity>;

    public constructor() {

    }
    public async init(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository, pqui_DataRepository: pqui_DataRepository) {
        const node = pqui_UIFactory.createNode({
            parent: parent,
            name: "pqui_BasePanel"
        });
        pqui_UIFactory.addWidget(node, { top: 0, bottom: 0, left: 0, right: 0 });
        node.addComponent(UIOpacity);
        this.node = node;

        this.pqui_TurboButton = await new pqui_TurboButton().init(node, pqui_UIFactory, pqui_EventRepository);
        this.pqui_MinusButton = new pqui_MinusButton(node, pqui_UIFactory, pqui_DataRepository, pqui_EventRepository);
        this.pqui_SpinContainer = new pqui_SpinContainer(parent, pqui_UIFactory);
        this.pqui_PlusButton = new pqui_PlusButton(node, pqui_UIFactory, pqui_DataRepository, pqui_EventRepository);
        this.pqui_AutoSpinButton = new pqui_AutoSpinButton(node, pqui_UIFactory, pqui_EventRepository, pqui_DataRepository);
        this.pqui_MoreSettingButton = new pqui_MoreSettingButton(node, pqui_UIFactory, pqui_EventRepository);

        pqui_EventRepository.onMoreSettingButtonClickedUI.Attach(() => this.hideAll());
        pqui_EventRepository.onSettingPanelCloseButtonClickedUI.Attach(() => this.showAll());

        return this;
    }

    public destroy() {
        this.pqui_MoreSettingButton.destroy();
        this.pqui_AutoSpinButton.destroy();
        this.pqui_PlusButton.destroy();
        this.pqui_SpinContainer.destroy();
        this.pqui_MinusButton.destroy();
        this.pqui_TurboButton.destroy();
        this.stopTween();
    }

    private showAll() {
        this.node.active = true;
        this.pqui_SpinContainer.show();
        this.stopTween();
        this.startTween(Vec3.ZERO, 255);
    }

    private async hideAll() {
        this.pqui_SpinContainer.hide();
        const position = new Vec3(this.node.position);
        position.y = -200;
        this.stopTween();
        await this.startTween(position, 0);
        this.node.active = false;
    }

    private startTween(position: Vec3, opacity: number) {
        return new Promise<void>(resolve => {
            this.opacityTween = tween(this.node.getComponent(UIOpacity))
                .to(0.15, { opacity: opacity })
                .start();
            this.nodeTween = tween(this.node)
                .to(0.15, { position: position })
                .call(() => resolve())
                .start();


        });
    }

    private stopTween() {
        if (this.nodeTween != null) {
            this.nodeTween.stop();
            this.nodeTween = null;
        }
        if (this.opacityTween != null) {
            this.opacityTween.stop();
            this.opacityTween = null;
        }
    }
}