import { pq_IHqq } from "../../../../script/hqqhub/pq_Hqq";
import ModelBase from "../../../../script/subgame/base/ModelBase";

export default class mahjongWaysModel extends ModelBase{
    constructor(hqq: pq_IHqq) {
        super(hqq);
    }

    public freeGameCount: number;

    public isAutoSpin: boolean;

    public isFreeGame: boolean;

    public isFreeGamePanelDisplaying: boolean;

    setFreeGameTotalWin(freeGameTotalWin: number): void {
        this.freeGameTotalWin = freeGameTotalWin;
    }

    getDefaultReelSymbolNames() {
        return [[
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfDots,
            SymbolName.FiveOfBamboos,
            SymbolName.TwoOfDots,
            SymbolName.TwoOfBamboos,
            SymbolName.FiveOfBamboos,
        ], [
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.RedDragon,
            SymbolName.GreenDragon,
            SymbolName.GoldenRedDragon,
            SymbolName.Scatter,
            SymbolName.EightOfCharacters,
            SymbolName.RedDragon,
        ], [
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.Wild,
            SymbolName.FiveOfBamboos,
            SymbolName.TwoOfDots,
            SymbolName.Wild,
            SymbolName.RedDragon,
        ], [
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.RedDragon,
            SymbolName.GreenDragon,
            SymbolName.Scatter,
            SymbolName.GoldenWhiteDragon,
            SymbolName.EightOfCharacters,
            SymbolName.RedDragon,
        ], [
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfDots,
            SymbolName.FiveOfBamboos,
            SymbolName.TwoOfDots,
            SymbolName.TwoOfBamboos,
            SymbolName.EightOfCharacters,
        ]]
    }




}

export const EmojiBySymbolName = [
    null, "🀪", "🀥", "🀅", "🀄︎", "🀆", "🀎", "🀝", "🀔", "🀚", "🀑", "🀅", "🀄︎", "🀆", "🀎", "🀝", "🀔", "🀚", "🀑"
];

export enum SymbolName {

    Wild = 1,

    Scatter,

    GreenDragon,

    RedDragon,

    WhiteDragon,

    EightOfCharacters,

    FiveOfDots,

    FiveOfBamboos,

    TwoOfDots,

    TwoOfBamboos,

    GoldenGreenDragon,

    GoldenRedDragon,

    GoldenWhiteDragon,

    GoldenEightOfCharacters,

    GoldenFiveOfDots,

    GoldenFiveOfBamboos,

    GoldenTwoOfDots,

    GoldenTwoOfBamboos
}

export const GoldenSymbolNames = [
    SymbolName.GoldenGreenDragon,
    SymbolName.GoldenRedDragon,
    SymbolName.GoldenWhiteDragon,
    SymbolName.GoldenEightOfCharacters,
    SymbolName.GoldenFiveOfDots,
    SymbolName.GoldenFiveOfBamboos,
    SymbolName.GoldenTwoOfBamboos,
    SymbolName.GoldenTwoOfDots
]

export const EliminableSymbolNames = [
    SymbolName.Wild,
    SymbolName.GreenDragon,
    SymbolName.RedDragon,
    SymbolName.WhiteDragon,
    SymbolName.EightOfCharacters,
    SymbolName.FiveOfDots,
    SymbolName.FiveOfBamboos,
    SymbolName.TwoOfBamboos,
    SymbolName.TwoOfDots,
]

export interface Lottery {

    roundResults: Array<RoundResult>;

    wins: Array<number>;

    accumulatedWins: Array<number>;

    isFirstFreeGame: boolean;

    multiplies: Array<number>;

    freeGames: number;

    balances: Array<number>;

    isFreeGame: boolean;

    freeGameTotalWin: number;

    totalWin: number;

    totalWinMultiple: number;

    bigWins: {
        bigWin: number,
        megaWin: number,
        superWin: number
    },

    betAmount: number;

    extraFreeCount: number;
}

export interface RoundResult {

    reelResults: Array<ReelResult>;
}

export interface ReelResult {

    symbolResults: Array<SymbolResult>;
}

export interface SymbolResult {

    debug?: string;

    symbolName: SymbolName;

    isCombinable: boolean;
}