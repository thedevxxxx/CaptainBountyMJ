export interface IDataRepository {
    readonly betAmount: number;
    readonly betMutiple: number;
    readonly baseBet: number;
    readonly totalBetAmount: number;
    readonly isTurboOn: boolean;

    freeGameCount: number;
    freeGameTotalWin: number;
    isAutoSpin: boolean;
    isFreeGame: boolean;
    isFreeGamePanelDisplaying: boolean;

    destroy(): void;
    setFreeGameTotalWin(freeGameTotalWin): void;
}

export interface IConfig {
    readonly userId: number;
    readonly password: string;
    readonly token: string;
    readonly gameId: string;
    readonly serverUrl: string
    pqToken: string;

    destroy(): void;
    setPQToken(pqToken: string): void;
    setPQBalance(pqBalance: number): void;
}