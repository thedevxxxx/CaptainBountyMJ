import pqui_DataRepository from "../data/pqui_DataRepository";
import pqui_EventRepository from "../../../script/event/pq_EventRepository";
import pqui_UI from "../ui/pqui_UI";
import { PopupParameter } from "../ui/warnr/popup/pqui_Popup";
import { GrayToastParameter } from "../ui/warnr/toast/GrayToast";

export default class pqui_ServiceLocator {

    public get betAmount() { return this.pqui_DataRepository.betAmount }

    public get betMutiple() { return this.pqui_DataRepository.betMutiple }

    public get baseBet() { return this.pqui_DataRepository.baseBetAmount }

    public get totalBetAmount() { return this.pqui_DataRepository.totalBetAmount }

    public get spinContainerNode() { return this.pqui_UI.pqui_BasePanel.pqui_SpinContainer.node }

    public get isTurboOn() { return this.pqui_UI.pqui_BasePanel.pqui_TurboButton.isTurboOn }

    public readonly pqui_EventRepository: pqui_EventRepository;

    private pqui_DataRepository: pqui_DataRepository;

    private pqui_UI: pqui_UI;

    public constructor(pqui_DataRepository: pqui_DataRepository, pqui_UI: pqui_UI, pqui_EventRepository: pqui_EventRepository) {
        this.pqui_DataRepository = pqui_DataRepository;
        this.pqui_EventRepository = pqui_EventRepository;
        this.pqui_UI = pqui_UI;

        const pqItemString = localStorage.getItem("pq");
        if (pqItemString != null) {
            console.log("[pqui_ServiceLocator] initPQItem", pqItemString);
            const pqItem: PQItem = JSON.parse(pqItemString);
            this.setBalance(pqItem.pqBalance);
        } else {
            console.log("[pqui_ServiceLocator] pqItemString is null");
        }
    }

    public setBalance(balance: number) {
        this.pqui_EventRepository.onBalanceChangedUI.Notify(balance);
    }

    public setWinMoney(winMoney: number) {
        this.pqui_EventRepository.onWinMoneyChangedUI.Notify(winMoney);
    }

    public showBottomBackground() {
        this.pqui_EventRepository.onShowBottomBackgroundUI.Notify();
    }

    public hideBottomBackground() {
        this.pqui_EventRepository.onHideBottomBackgroundUI.Notify();
    }

    public setTopPanelWigetBottom(bottom: number) {
        this.pqui_EventRepository.onTopPanelWidgetBottomChangeUI.Notify(bottom);
    }

    public showUI() {
        this.pqui_UI.show();
    }

    public hideUI() {
        this.pqui_UI.hide();
    }

    public lockButtons() {
        this.pqui_EventRepository.onlockButtonsUI.Notify();
    }

    public unlockButtons() {
        this.pqui_EventRepository.onUnlockButtonsUI.Notify();
    }

    public onPopup(popupParameter: PopupParameter) {
        this.pqui_EventRepository.onPopup.Notify(popupParameter);
    }

    public onGrayToast(grayToastParameter: GrayToastParameter) {
        this.pqui_EventRepository.onGrayToast.Notify(grayToastParameter.content);
    }

    public quit() {
        this.pqui_EventRepository.onQuit.Notify();
    }
}

interface PQItem {
    pqBalance: number;
}