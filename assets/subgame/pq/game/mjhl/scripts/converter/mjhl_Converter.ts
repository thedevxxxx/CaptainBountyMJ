import { SymbolName } from "../type/mjhl_Types";

export function convertServerCodeToSymbolName(code: number, isGold: boolean): SymbolName {
    const symbolNameBySeverCode = [
        null,
        SymbolName.Wild,
        SymbolName.Scatter,
        isGold ? SymbolName.GoldenGreenDragon : SymbolName.GreenDragon,
        isGold ? SymbolName.GoldenRedDragon : SymbolName.RedDragon,
        isGold ? SymbolName.GoldenWhiteDragon : SymbolName.WhiteDragon,
        isGold ? SymbolName.GoldenEightOfCharacters : SymbolName.EightOfCharacters,
        isGold ? SymbolName.GoldenFiveOfDots : SymbolName.FiveOfDots,
        isGold ? SymbolName.GoldenFiveOfBamboos : SymbolName.FiveOfBamboos,
        isGold ? SymbolName.GoldenTwoOfDots : SymbolName.TwoOfDots,
        isGold ? SymbolName.GoldenTwoOfBamboos : SymbolName.TwoOfBamboos,
    ];
    return symbolNameBySeverCode[code];
}