import { GoldenSymbolNames, SymbolName } from "../network/mahjongWaysModel";

export function isGoldenMahjong(symbolName: SymbolName): boolean {
    return GoldenSymbolNames.indexOf(symbolName) !== -1;
}


export function isScatter(symbolName: SymbolName): boolean {
    return symbolName === SymbolName.Scatter;
}