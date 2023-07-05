
import { _decorator, UIOpacity, sp } from 'cc';
import { CommonSymbol, SYMBOL_STATE, SymbolRes } from '../../../../script/subgame/ui/game/CommonSymbol';
import { CommonSymbolInfo } from '../../../../script/subgame/info/CommonSymbolInfo';
import AnimationPlayer from '../../../../script/animations/AnimationPlayer';
const { ccclass, property } = _decorator;
 
@ccclass('MaskCarnivalSymbol')
export class MaskCarnivalSymbol extends CommonSymbol {
    private readonly symbolFame: SymbolRes[] = [
        {
            NORMAL: `game/maskCarnival/image/symbol/h_0`,
            BLUR: `game/maskCarnival/image/symbol/h_blue_blur`
        },
        {
            NORMAL: `game/maskCarnival/image/symbol/h_1`,
            BLUR: `game/maskCarnival/image/symbol/h_purple_blur`
        }
    ]

    @property(sp.Skeleton)
    private bingoSp_2:sp.Skeleton;
    private bingoAp_2: AnimationPlayer;
    

    start () {
        super.start();
        this.bingoAp_2 = new AnimationPlayer(this.bingoSp_2);
    }

    onDestroy() {

        this.bingoAp_2.stopAnimation();
        this.bingoAp_2.destroy();
        this.bingoAp_2 = null;
    }

    public updateSymbolInfo(info: CommonSymbolInfo) {
        super.updateSymbolInfo(info)
        this.getSymbolAsset(this.symbolFame[this._symbolInfo.type].NORMAL);
    }

    /**
     * 设置状态
     * @param st 状态 SYMBOL_STATE
     * @param callback 符号状态完成时调用
     */
     setState(st: SYMBOL_STATE, callback?:Function) {
        switch(st) {
            case SYMBOL_STATE.NORMAL:
                this.getSymbolAsset(this.symbolFame[this._symbolInfo.type].NORMAL);
                this.bingoAp_2.stopAnimation();
                break;
            case SYMBOL_STATE.BLUR:
                this.getSymbolAsset(this.symbolFame[this._symbolInfo.type].BLUR);
                break;
            case SYMBOL_STATE.BINGO:
                this.bingoAp_2.stopAnimation();
                this.bingoAp_2.playAnimationOnce("newAnimation", null, true);
                break;
        }
    }
    
}