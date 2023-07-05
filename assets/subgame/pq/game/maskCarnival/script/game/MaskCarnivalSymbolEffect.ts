
import { _decorator, UIOpacity, sp } from 'cc';
import { SYMBOL_STATE } from '../../../../script/subgame/ui/game/CommonSymbol';
import { CommonSymbolInfo } from '../../../../script/subgame/info/CommonSymbolInfo';
import AnimationPlayer from '../../../../script/animations/AnimationPlayer';
import { CommonSymbolEffect } from '../../../../script/subgame/ui/game/CommonSymbolEffect';
const { ccclass, property } = _decorator;
 
@ccclass('MaskCarnivalSymbolEffect')
export class MaskCarnivalSymbolEffect extends CommonSymbolEffect {

    @property(sp.Skeleton)
    private bingoSp_1:sp.Skeleton;
    private bingoAp_1: AnimationPlayer;

    @property(sp.Skeleton)
    private bingoSp_2:sp.Skeleton;
    private bingoAp_2: AnimationPlayer;

    @property(sp.Skeleton)
    private bingoSp_3:sp.Skeleton;
    private bingoAp_3: AnimationPlayer;

    @property(sp.Skeleton)
    private bingoSp_4:sp.Skeleton;
    private bingoAp_4: AnimationPlayer;
    

    start () {
        super.start();
        this.bingoAp_1 = new AnimationPlayer(this.bingoSp_1);
        this.bingoAp_2 = new AnimationPlayer(this.bingoSp_2);
        this.bingoAp_3 = new AnimationPlayer(this.bingoSp_3);
        // this.bingoAp_4 = new AnimationPlayer(this.bingoSp_4);
    }

    onDestroy() {
        this.bingoAp_1.stopAnimation();
        this.bingoAp_1.destroy();
        this.bingoAp_1 = null;

        this.bingoAp_2.stopAnimation();
        this.bingoAp_2.destroy();
        this.bingoAp_2 = null;

        this.bingoAp_3.stopAnimation();
        this.bingoAp_3.destroy();
        this.bingoAp_3 = null;

        this.bingoAp_4.stopAnimation();
        this.bingoAp_4.destroy();
        this.bingoAp_4 = null;
    }

    /**
     * 设置状态
     * @param st 状态 SYMBOL_STATE
     * @param callback 符号状态完成时调用
     */
     setState(st: SYMBOL_STATE, callback?:Function) {
        switch(st) {
            case SYMBOL_STATE.NORMAL:
                this.bingoAp_1.stopAnimation();
                this.bingoAp_2.stopAnimation();
                break;
            case SYMBOL_STATE.BLUR:
                break;
            case SYMBOL_STATE.MASK:
                break;
            case SYMBOL_STATE.BINGO:
                this.bingoAp_1.stopAnimation();
                this.bingoAp_1.playAnimationOnce("newAnimation", () => {
                    this.bingoAp_2.stopAnimation();
                    this.bingoAp_2.playAnimationLoop("newAnimation");
                    // this.bingoAp_3.stopAnimation();
                    // this.bingoAp_3.playAnimationLoop("newAnimation");
                    // this.bingoAp_3.stopAnimation();
                    // this.bingoAp_3.playAnimationLoop("newAnimation");
                    // this.bingoAp_4.stopAnimation();
                    // this.bingoAp_4.playAnimationLoop("newAnimation");
                    callback();
                });
                
                break;
        }
    }
    
}