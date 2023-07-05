import pqui_EventRepository from "../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";
import pqui_CloseButton from "../button/pqui_CloseButton";
import pqui_HistoryButton from "../button/history/pqui_HistoryButton";
import pqui_PaytableButton from "../button/paytable/pqui_PaytableButton";
import pqui_QuitButton from "../button/pqui_QuitButton";
import pqui_RulesButton from "../button/rules/pqui_RulesButton";
import pqui_SoundButton from "../button/pqui_SoundButton";
import { Tween, Vec3, tween, Node, UIOpacity, Layout, UITransform } from "cc";

export default class pqui_SettingPanel {

    private node: Node;

    private nodeTween: Tween<Node>;

    private opacityTween: Tween<UIOpacity>;

    private pqui_QuitButton: pqui_QuitButton;

    private pqui_SoundButton: pqui_SoundButton;

    private pqui_PaytableButton: pqui_PaytableButton;

    private pqui_RulesButton: pqui_RulesButton;

    private pqui_HistoryButton: pqui_HistoryButton;

    private pqui_CloseButton: pqui_CloseButton;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository) {
        const node = pqui_UIFactory.createNode({
            parent: parent,
            name: "pqui_SettingPanel"
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });
        this.node = node;
        this.node.addComponent(UIOpacity)

        this.pqui_QuitButton = new pqui_QuitButton(node, pqui_UIFactory, pqui_EventRepository);
        this.pqui_SoundButton = new pqui_SoundButton(node, pqui_UIFactory, pqui_EventRepository);
        this.pqui_PaytableButton = new pqui_PaytableButton(node, pqui_UIFactory, pqui_EventRepository);
        this.pqui_RulesButton = new pqui_RulesButton(node, pqui_UIFactory, pqui_EventRepository);
        this.pqui_HistoryButton = new pqui_HistoryButton(node, pqui_UIFactory);
        this.pqui_CloseButton = new pqui_CloseButton(node, pqui_UIFactory, pqui_EventRepository);

        this.hideAll();

        pqui_EventRepository.onMoreSettingButtonClickedUI.Attach(() => this.showAll());
        pqui_EventRepository.onSettingPanelCloseButtonClickedUI.Attach(() => this.hideAll());
    }

    public destroy() {
        this.pqui_CloseButton = null;
        this.pqui_HistoryButton = null;
        this.pqui_RulesButton = null;
        this.pqui_PaytableButton = null;
        this.pqui_SoundButton = null;
        this.pqui_QuitButton = null;
        this.stopTween();
    }

    private showAll() {
        this.node.active = true;
        this.stopTween();
        this.startTween(Vec3.ZERO, 255);
    }

    private async hideAll() {
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