import { Node } from "cc";
import pq_UIFactory from "../pq_UIFactory";
import pq_Popup, { PopupParameter } from "./popup/pq_Popup";

export default class pq_Warner {

    public get isActive() { return this.node.active }

    private pq_UIFactory: pq_UIFactory;

    private node: Node;

    private popupParameterQueue: Array<PopupParameter>;

    private currentPopupParameter: PopupParameter;

    public constructor(parent: Node, pq_UIFactory: pq_UIFactory) {
        this.createUI(parent, pq_UIFactory);

        this.pq_UIFactory = pq_UIFactory;
        
        this.popupParameterQueue = new Array<PopupParameter>();
    }

    public onPopup(content: string, onConfirmButtonClick?: Function, onCancelButtonClick?: Function, onCloseButtonClick?: Function) {
        this.popupParameterQueue.push({ content: content, onConfirmButtonClick: onConfirmButtonClick, onCancelButtonClick: onCancelButtonClick, onCloseButtonClick: onCloseButtonClick })
        this.checkQueue();
    }

    public setScale(isProtrait: boolean) {
        if (isProtrait) {
            this.node.setScale(0.56, 0.56);
        } else {
            this.node.setScale(1, 1);
        }
    }

    public destroy() {
        console.log("[pq_Popup] destroy");
    }

    private createUI(parent: Node, pq_UIFactory: pq_UIFactory) {
        const node = pq_UIFactory.createNode({
            parent: parent,
            name: "pq_Warner"
        });
        this.node = node;
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
        new pq_Popup(this.node, this.pq_UIFactory, popupParameter, () => this.hidePopup());
    }

    private hidePopup() {
        this.currentPopupParameter = null;
        this.checkQueue();
    }
}