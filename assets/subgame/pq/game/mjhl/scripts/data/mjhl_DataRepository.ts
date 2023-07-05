import { IDataRepository } from "../../../../script/base/Interface";
import pqui_ServiceLocator from "../../../../pqui/scripts/service/pqui_ServiceLocator";
import mjhl_EventRepository,{FreeGameParameter} from "../../../../script/event/pq_EventRepository";

export default class mjhl_DataRepository implements IDataRepository {

    public get betAmount() { return this.pqui_ServiceLocator.betAmount }

    public get betMutiple() { return this.pqui_ServiceLocator.betMutiple }

    public get baseBet() { return this.pqui_ServiceLocator.baseBet }

    public get totalBetAmount() { return this.pqui_ServiceLocator.totalBetAmount }

    public get isTurboOn() { return this.pqui_ServiceLocator.isTurboOn; }

    public freeGameCount: number;

    public freeGameTotalWin: number;

    public isAutoSpin: boolean;

    public isFreeGame: boolean;

    public isFreeGamePanelDisplaying: boolean;

    private get hqq() { try { return hqq; } catch (error) { console.log(`[mjhl_DataRepository] ${error}`); } };

    private pqui_ServiceLocator: pqui_ServiceLocator;

    public constructor(pqui_ServiceLocator: pqui_ServiceLocator, mjhl_EventRepository: mjhl_EventRepository) {
        this.pqui_ServiceLocator = pqui_ServiceLocator;

        this.setFreeGameTotalWin(0);

        mjhl_EventRepository.onBalanceChanged.Attach((balance) => pqui_ServiceLocator.setBalance(balance));

        mjhl_EventRepository.onAccumulatedWinMoney.Attach((winMoney) => pqui_ServiceLocator.setWinMoney(winMoney));

        mjhl_EventRepository.onResult.Attach(lottery => {
            const isFreeGame = lottery.isFreeGame;
            this.isFreeGame = isFreeGame;
            if (!isFreeGame) {
                pqui_ServiceLocator.setWinMoney(0);
            }
        });

        mjhl_EventRepository.onFreeGamePanelShow.Attach(() => {
            this.isFreeGamePanelDisplaying = true;
        });

        mjhl_EventRepository.onStartFreeGameButtonClicked.Attach(() => {
            this.isFreeGamePanelDisplaying = false;
        });

        mjhl_EventRepository.onReceiveFreeGameRewardClicked.Attach(() => {
            this.isFreeGame = false;
        });

        mjhl_EventRepository.onFreeGame.Attach((freeGameParameter:FreeGameParameter) => {
            this.freeGameCount = freeGameParameter.freeGameCount;
            pqui_ServiceLocator.hideBottomBackground();
            pqui_ServiceLocator.setTopPanelWigetBottom(50);
            pqui_ServiceLocator.lockButtons();
        });

        mjhl_EventRepository.onFreeGameSettleFinished.Attach(() => {
            this.freeGameCount = 0;
            pqui_ServiceLocator.unlockButtons();
        });

        mjhl_EventRepository.onBaseGame.Attach(() => {
            pqui_ServiceLocator.showBottomBackground();
            pqui_ServiceLocator.setTopPanelWigetBottom(220);
        });

        mjhl_EventRepository.onAutoSpin.Attach(() => {
            pqui_ServiceLocator.lockButtons();
            this.isAutoSpin = true;
        });

        mjhl_EventRepository.onStopAutoSpin.Attach(() => {
            this.isAutoSpin = false;
            pqui_ServiceLocator.unlockButtons();
        });

        mjhl_EventRepository.onSpinButtonClicked.Attach(() => {
            pqui_ServiceLocator.lockButtons();
        });

        mjhl_EventRepository.onResultFinished.Attach(() => {
            if (this.isAutoSpin) {
                console.log(`[mjhl_DataRepository] isAutoSpin`);
                return;
            }
            if (this.freeGameCount > 0) {
                console.log(`[mjhl_DataRepository] this.freeGameCount > 0`);
                return;
            }
            pqui_ServiceLocator.unlockButtons();
        });
    }

    public destroy() {}

    public setFreeGameTotalWin(freeGameTotalWin: number) {
        this.freeGameTotalWin = freeGameTotalWin;
    }
}