import { KeyCode, Node } from "cc";
import pqui_EventRepository from "../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../script/ui/pq_UIFactory";
import pqui_Popup, { PopupParameter } from "./popup/pqui_Popup";
import GrayToast, { GrayToastParameter } from "./toast/GrayToast";
import pqui_BlackToast, { BlackToastParameter } from "./toast/pqui_BlackToast";

export default class pqui_Warner {

    private pqui_UIFactory: pqui_UIFactory;

    private node: Node;

    private pqui_BlackToast: pqui_BlackToast;

    private grayToast: GrayToast;

    private popupParameterQueue: Array<PopupParameter>;

    private currentPopupParameter: PopupParameter;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository) {
        this.pqui_UIFactory = pqui_UIFactory;

        this.createUI(parent, pqui_UIFactory);

        this.popupParameterQueue = new Array<PopupParameter>();

        pqui_EventRepository.onGrayToast.Attach((grayToastParameter) => this.onGrayToast(grayToastParameter));
        pqui_EventRepository.onBlackToastUI.Attach((blackToastParameter) => this.onBlackToast(blackToastParameter));
        pqui_EventRepository.onPopup.Attach((popupParameter) => this.onPopup(popupParameter));
    }

    public destroy() {
        this.pqui_BlackToast?.destroy();
        if (this.grayToast != null) {
            this.grayToast.destroy();
            this.grayToast = null;
        }
    }

    private createUI(parent: Node, pqui_UIFactory: pqui_UIFactory) {
        const node = pqui_UIFactory.createNode({
            parent: parent,
            name: "pqui_Warner"
        });
        this.node = node;
    }

    private onBlackToast(blackToastParameter: BlackToastParameter) {
        if (this.pqui_BlackToast == null) {
            this.pqui_BlackToast = new pqui_BlackToast(this.node, this.pqui_UIFactory)
        }
        this.pqui_BlackToast.popUp(blackToastParameter);
    }

    private async onGrayToast(grayToastParameter: string) {
        if (this.grayToast == null) {
            this.grayToast = await new GrayToast().init(this.node, grayToastParameter, () => {
                this.grayToast = null;
            }, this.pqui_UIFactory)
        }
        this.grayToast.popUp(grayToastParameter);
    }

    private onPopup(popupParameter: PopupParameter) {
        this.popupParameterQueue.push(popupParameter);
        this.checkQueue();
    }

    private checkQueue() {
        if (this.currentPopupParameter == null) {
            if (this.popupParameterQueue.length > 0) {
                const popupParameter = this.popupParameterQueue.shift();
                if (popupParameter != null) {
                    this.showPopup(popupParameter);
                }
            }
        }
    }

    private showPopup(popupParameter: PopupParameter) {
        this.currentPopupParameter = popupParameter;
        new pqui_Popup(this.node, this.pqui_UIFactory, popupParameter, () => this.hidePopup());
    }

    private hidePopup() {
        this.currentPopupParameter = null;
        this.checkQueue();
    }
}