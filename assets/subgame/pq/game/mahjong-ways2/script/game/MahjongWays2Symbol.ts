
import { _decorator, Component, Node } from 'cc';
import { CommonSymbol, SYMBOL_STATE, SymbolRes } from '../../../../script/subgame/ui/game/CommonSymbol';
import { CommonSymbolInfo } from '../../../../script/subgame/info/CommonSymbolInfo';
const { ccclass } = _decorator;
 
@ccclass('MahjongWays2Symbol')
export class MahjongWays2Symbol extends CommonSymbol {
    private readonly symbolFame: SymbolRes[] = [
        {
            NORMAL: `game/mahjong-ways2/mahjongWays2_images/symbols/mahjongWays2_2bamboos`,
            BLUR: `game/mahjong-ways2/mahjongWays2_images/symbols/mahjongWays2_2bamboos_blur`
        },
        {
            NORMAL: `game/mahjong-ways2/mahjongWays2_images/symbols/mahjongWays2_2dots`,
            BLUR: `game/mahjong-ways2/mahjongWays2_images/symbols/mahjongWays2_2dots_blur`
        }
    ]

    start () {
    }
    public updateSymbolInfo(info: CommonSymbolInfo) {
        super.updateSymbolInfo(info)
        this.getSymbolAsset(this.symbolFame[this._symbolInfo.type].NORMAL);
    }

    set state(st: SYMBOL_STATE) {
        switch(st) {
            case SYMBOL_STATE.NORMAL:
                this.getSymbolAsset(this.symbolFame[this._symbolInfo.type].NORMAL);
                break;
            case SYMBOL_STATE.BLUR:
                this.getSymbolAsset(this.symbolFame[this._symbolInfo.type].BLUR);
                break;
        }
    }
    
}