//@ts-ignore
import proto from "../network/proto/PQproto_msg.js";
import { EventKeyboard, Input, input, KeyCode, Node } from "cc";
import pqui_ServiceLocator from "../../pqui/scripts/service/pqui_ServiceLocator";
import { IResponse } from "../network/pq_HttpNetwork";
import { GameConfig } from "../ui/gamelist/pq_GameList";
import pq_Event from "./pq_Event";

export default class pq_EventRepository {
    
    // pq
    public onExitButtonClick = new pq_Event<void, void>();

    public onExitLoadingButtonClick = new pq_Event<void, void>();

    public onEnterGame = new pq_Event<GameConfig, void>();

    public receiveMessageByCommand = new Map<proto.SubCommand, pq_Event<IResponse, void>>();

    public onLoginSucceeded = new pq_Event<LoginSucceededParameter, void>();

    public onLogoutSucceeded = new pq_Event<void, void>();

    public onLogoutFailed = new pq_Event<void, void>();

    public onRefreshTokenonSucceeded = new pq_Event<string, void>();

    // pq game

    public readonly onKeyDown = new pq_Event<KeyCode, void>();

    public readonly onSpinButtonClicked = new pq_Event<void, void>();

    public readonly onResult = new pq_Event<any, void>(); // Lottery

    public readonly onBalanceChanged = new pq_Event<number, void>();

    public readonly onWinMoney = new pq_Event<WinMoneyParameter, void>();

    public readonly onAccumulatedWinMoney = new pq_Event<number, void>();

    public readonly onTotalWinMoney = new pq_Event<TotalWinMoneyParameter, void>();

    public readonly onMultiple = new pq_Event<any, void>();//MutilpleAttribute

    public readonly onFreeGameCount = new pq_Event<FreeGameParameter, void>();

    public readonly onFreeGame = new pq_Event<FreeGameParameter, void>();

    public readonly onFreeGamePanelShow = new pq_Event<void, void>();

    public readonly onFreeGameSettle = new pq_Event<FreeGameSettleParameter, void>();

    public readonly onWinFreeGame = new pq_Event<void, void>();

    public readonly onBaseGame = new pq_Event<void, void>();

    public readonly onStartFreeGameButtonClicked = new pq_Event<void, void>();

    public readonly onReceiveFreeGameRewardClicked = new pq_Event<void, void>();

    public readonly onLotteryInfo = new pq_Event<proto.ILotteryInfo, void>();

    public readonly onResultFinished = new pq_Event<ResultFinishedParameter, void>();

    public readonly onSpinFinished = new pq_Event<void, void>();

    public readonly onAutoSpin = new pq_Event<number, void>();

    public readonly onAutoSpinOnce = new pq_Event<void, void>();

    public readonly onStopAutoSpin = new pq_Event<void, void>();

    public readonly onShowRules = new pq_Event<Node, void>();

    public readonly onShowPaytable = new pq_Event<Node, void>();

    public readonly onDefaultRoundResult = new pq_Event<any, void>(); // Array<Array<SymbolName>>

    public readonly onCombine = new pq_Event<any, void>(); // Array<ReelResult>

    public readonly onFlip = new pq_Event<any, void>(); // Array<ReelResult>

    public readonly onAllReelSpinStarted = new pq_Event<void, void>();

    public readonly onAllReelSpinFinished = new pq_Event<any, void>(); // Array<ReelResult>

    public readonly onReelSpinFinished = new pq_Event<any, void>(); // ReelResult

    public readonly onAllReelFallFinished = new pq_Event<any, void>(); // Array<ReelResult>

    public readonly onSymbolFallFinished = new pq_Event<any, void>(); // mjhl_Symbol

    public readonly onScatterFall = new pq_Event<void, void>();

    public readonly onSymbolGuiderShow = new pq_Event<void, void>();

    public readonly onFreeGameSettleStarted = new pq_Event<void, void>();

    public readonly onFreeGameSettleFinished = new pq_Event<void, void>();

    public readonly onWinEffectTweenToNumberStarted = new pq_Event<void, void>();

    public readonly onWinEffectTweenToNumberFinished = new pq_Event<void, void>();

    public readonly onQuintupleSkin = new pq_Event<void, void>();

    public readonly onTotalWinSkin = new pq_Event<void, void>();

    public readonly onStartMarqueeTweenToNumber = new pq_Event<void, void>();

    public readonly onMarqueeTweenToNumberFinished = new pq_Event<void, void>();

    public readonly onEnterGameSucceeded = new pq_Event<void, void>();

    public readonly onEnterGameFailed = new pq_Event<void, void>();

    public readonly onPopup = new pq_Event<PopupParameter, void>();

    public readonly onGrayToast = new pq_Event<string, void>();

    public readonly onEffectSpinStarted = new pq_Event<number, void>();

    public readonly onReelEffect = new pq_Event<void, void>();

    public readonly onEffectSpinFinished = new pq_Event<number, void>();

    public readonly onEffectSpinNoScatters = new pq_Event<void, void>();

    public readonly onPoorNetwork = new pq_Event<number, void>();

    public readonly onQuit = new pq_Event<void, void>();

    public readonly onMute = new pq_Event<boolean, void>();
    
    // pq game - ui
    public readonly onMoreSettingButtonClickedUI = new pq_Event<void, void>();
    public readonly onSettingPanelCloseButtonClickedUI = new pq_Event<void, void>();
    public readonly onQuitButtonClickedUI = new pq_Event<void, void>();
    public readonly onBetAmountChangedUI = new pq_Event<number, void>();
    public readonly onBetMutipleChangedUI = new pq_Event<number, void>();
    public readonly onTotalBetAmountChangedUI = new pq_Event<number, void>();
    public readonly onWinMoneyChangedUI = new pq_Event<number, void>();
    public readonly onBlackToastUI = new pq_Event<any, void>(); // BlackToastParameter
    public readonly onShowBottomBackgroundUI = new pq_Event<void, void>();
    public readonly onHideBottomBackgroundUI = new pq_Event<void, void>();
    public readonly onTopPanelWidgetBottomChangeUI = new pq_Event<number, void>();
    public readonly onlockButtonsUI = new pq_Event<void, void>();
    public readonly onUnlockButtonsUI = new pq_Event<void, void>();
    public readonly onBalanceChangedUI = new pq_Event<number, void>();

    protected static _instance:pq_EventRepository;

    public static getInstance(): pq_EventRepository {
        this._instance || (this._instance = new pq_EventRepository());
        return this._instance;
    }

    private static clearInstance(){
        this._instance = undefined;
    }

    public constructor() {
        this.receiveMessageByCommand.set(proto.SubCommand.EnumSubLoginResp, new pq_Event<IResponse, void>());
        this.receiveMessageByCommand.set(proto.SubCommand.EnumSubLogoutResp, new pq_Event<IResponse, void>());
        this.receiveMessageByCommand.set(proto.SubCommand.EnumSubUserRefreshTokenResp, new pq_Event<IResponse, void>());
    }

    public destroy(isBackHall:boolean = false) {
        if(!isBackHall){
            this.onKeyDown.Reset();
            this.onSpinButtonClicked.Reset();
            this.onResult.Reset();
            this.onBalanceChanged.Reset();
            this.onWinMoney.Reset();
            this.onAccumulatedWinMoney.Reset();
            this.onTotalWinMoney.Reset();
            this.onMultiple.Reset();
            this.onFreeGameCount.Reset();
            this.onFreeGame.Reset();
            this.onFreeGamePanelShow.Reset();
            this.onFreeGameSettle.Reset();
            this.onWinFreeGame.Reset();
            this.onBaseGame.Reset();
            this.onStartFreeGameButtonClicked.Reset();
            this.onReceiveFreeGameRewardClicked.Reset();
            this.onLotteryInfo.Reset();
            this.onResultFinished.Reset();
            this.onSpinFinished.Reset();
            this.onAutoSpin.Reset();
            this.onAutoSpinOnce.Reset();
            this.onStopAutoSpin.Reset();
            this.onShowRules.Reset();
            this.onShowPaytable.Reset();
            this.onDefaultRoundResult.Reset();
            this.onCombine.Reset();
            this.onFlip.Reset();
            this.onAllReelSpinStarted.Reset();
            this.onAllReelSpinFinished.Reset();
            this.onReelSpinFinished.Reset();
            this.onAllReelFallFinished.Reset();
            this.onSymbolFallFinished.Reset();
            this.onScatterFall.Reset();
            this.onSymbolGuiderShow.Reset();
            this.onFreeGameSettleStarted.Reset();
            this.onFreeGameSettleFinished.Reset();
            this.onWinEffectTweenToNumberStarted.Reset();
            this.onWinEffectTweenToNumberFinished.Reset();
            this.onQuintupleSkin.Reset();
            this.onTotalWinSkin.Reset();
            this.onStartMarqueeTweenToNumber.Reset();
            this.onMarqueeTweenToNumberFinished.Reset();
            this.onEnterGameSucceeded.Reset();
            this.onEnterGameFailed.Reset();
            this.onPopup.Reset();
            this.onGrayToast.Reset();
            this.onEffectSpinStarted.Reset();
            this.onReelEffect.Reset();
            this.onEffectSpinFinished.Reset();
            this.onEffectSpinNoScatters.Reset();
            this.onPoorNetwork.Reset();
            this.onQuit.Reset();
            this.onMute.Reset();
            this.onMoreSettingButtonClickedUI.Reset();
            this.onSettingPanelCloseButtonClickedUI.Reset();
            this.onQuitButtonClickedUI.Reset();
            this.onBetAmountChangedUI.Reset();
            this.onBetMutipleChangedUI.Reset();
            this.onTotalBetAmountChangedUI.Reset();
            this.onWinMoneyChangedUI.Reset();
            this.onBlackToastUI.Reset();
            this.onShowBottomBackgroundUI.Reset();
            this.onHideBottomBackgroundUI.Reset();
            this.onTopPanelWidgetBottomChangeUI.Reset();
            this.onlockButtonsUI.Reset();
            this.onUnlockButtonsUI.Reset();
            this.onBalanceChangedUI.Reset();
        }else{
            this.receiveMessageByCommand.clear();
            this.receiveMessageByCommand = null;
            pq_EventRepository.clearInstance();
        }
    }
}

export interface LoginSucceededParameter {
    pqToken: string;
    balance: number;
}

export interface FreeGameParameter {
    freeGameCount: number;
    isFirstFreeGame: boolean;
}

export interface FreeGameSettleParameter {
    totalWin: number;
}

export interface ResultFinishedParameter {
    isFirstFreeGame: boolean;
}

export interface WinMoneyParameter {
    winMoney: number;
    accumulatedWinMutiple?: number;
}

export interface TotalWinMoneyParameter {
    totalWinMoney: number;
    accumulatedWinMutiple?: number;
}

export interface PopupParameter {

    title: string;

    content: string;

    popupButtonParameters: Array<PopupButtonParameter>;
}

interface PopupButtonParameter {

    title?: string;

    onClicked?: Function;
}