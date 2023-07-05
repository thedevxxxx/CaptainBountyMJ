import { IDataRepository } from "../../../../script/base/Interface";
import pqui_ServiceLocator from "../../../../pqui/scripts/service/pqui_ServiceLocator";
import mahjongWays_EventRepository,{FreeGameParameter} from "../../../../script/event/pq_EventRepository";

export default class mahjongWays_DataRepository implements IDataRepository {

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

    private get hqq() { try { return hqq; } catch (error) { console.log(`[mahjongWays_DataRepository] ${error}`); } };

    private pqui_ServiceLocator: pqui_ServiceLocator;

    public constructor(pqui_ServiceLocator: pqui_ServiceLocator, mahjongWays_EventRepository: mahjongWays_EventRepository) {
        this.pqui_ServiceLocator = pqui_ServiceLocator;

        this.setFreeGameTotalWin(0);

        mahjongWays_EventRepository.onBalanceChanged.Attach((balance) => pqui_ServiceLocator.setBalance(balance));

        mahjongWays_EventRepository.onAccumulatedWinMoney.Attach((winMoney) => pqui_ServiceLocator.setWinMoney(winMoney));

        mahjongWays_EventRepository.onResult.Attach(lottery => {
            const isFreeGame = lottery.isFreeGame;
            this.isFreeGame = isFreeGame;
            if (!isFreeGame) {
                pqui_ServiceLocator.setWinMoney(0);
            }
        });

        mahjongWays_EventRepository.onFreeGamePanelShow.Attach(() => {
            this.isFreeGamePanelDisplaying = true;
        });

        mahjongWays_EventRepository.onStartFreeGameButtonClicked.Attach(() => {
            this.isFreeGamePanelDisplaying = false;
        });

        mahjongWays_EventRepository.onReceiveFreeGameRewardClicked.Attach(() => {
            this.isFreeGame = false;
        });

        mahjongWays_EventRepository.onFreeGame.Attach((freeGameParameter:FreeGameParameter) => {
            this.freeGameCount = freeGameParameter.freeGameCount;
            pqui_ServiceLocator.hideBottomBackground();
            pqui_ServiceLocator.setTopPanelWigetBottom(50);
            pqui_ServiceLocator.lockButtons();
        });

        mahjongWays_EventRepository.onFreeGameSettleFinished.Attach(() => {
            this.freeGameCount = 0;
            pqui_ServiceLocator.unlockButtons();
        });

        mahjongWays_EventRepository.onBaseGame.Attach(() => {
            pqui_ServiceLocator.showBottomBackground();
            pqui_ServiceLocator.setTopPanelWigetBottom(220);
        });

        mahjongWays_EventRepository.onAutoSpin.Attach(() => {
            pqui_ServiceLocator.lockButtons();
            this.isAutoSpin = true;
        });

        mahjongWays_EventRepository.onStopAutoSpin.Attach(() => {
            this.isAutoSpin = false;
            pqui_ServiceLocator.unlockButtons();
        });

        mahjongWays_EventRepository.onSpinButtonClicked.Attach(() => {
            pqui_ServiceLocator.lockButtons();
        });

        mahjongWays_EventRepository.onResultFinished.Attach(() => {
            if (this.isAutoSpin) {
                console.log(`[mahjongWays_DataRepository] isAutoSpin`);
                return;
            }
            if (this.freeGameCount > 0) {
                console.log(`[mahjongWays_DataRepository] this.freeGameCount > 0`);
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