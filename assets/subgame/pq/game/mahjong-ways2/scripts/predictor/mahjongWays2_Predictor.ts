import { GoldenSymbolNames, SymbolName } from "../type/mahjongWays2_Types";

export function isGoldenMahjong(symbolName: SymbolName): boolean {
    return GoldenSymbolNames.indexOf(symbolName) !== -1;
}


export function isScatter(symbolName: SymbolName): boolean {
    return symbolName === SymbolName.Scatter;
}