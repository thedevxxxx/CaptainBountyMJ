
import { sp, _decorator} from 'cc';
import { CommonReelEffect } from '../../../../script/subgame/ui/game/CommonReelEffect';
import AnimationPlayer from '../../../../script/animations/AnimationPlayer';
import { UITransform } from 'cc';
import { MahjongWaysSymbolEffect } from './MahjongWaysSymbolEffect';
import { SYMBOL_STATE } from '../../../../script/subgame/ui/game/CommonSymbol';
import { SYMBOL_TYPE } from './MahjongWaysSymbol';
const { ccclass, property } = _decorator;
 
@ccclass('MahjongWaysReelEffect')
export class MahjongWaysReelEffect extends CommonReelEffect {

    @property(sp.Skeleton)
    private sp_1: sp.Skeleton;
    private ap_1: AnimationPlayer;

    @property(sp.Skeleton)//金框特效
    private sp_2: sp.Skeleton;
    private ap_2: AnimationPlayer;

    @property(sp.Skeleton)//金框特效
    private sp_3: sp.Skeleton;
    private ap_3: AnimationPlayer;

    @property(sp.Skeleton)//金框特效
    private sp_4: sp.Skeleton;
    private ap_4: AnimationPlayer;

    @property(sp.Skeleton)//金框特效
    private sp_5: sp.Skeleton;
    private ap_5: AnimationPlayer;

    public constructor() {
        super();
    }

    start () {
        super.start();
        this.ap_1 = new AnimationPlayer(this.sp_1);
        this.ap_2 = new AnimationPlayer(this.sp_2);
        this.ap_3 = new AnimationPlayer(this.sp_3);
        this.ap_4 = new AnimationPlayer(this.sp_4);
        this.ap_5 = new AnimationPlayer(this.sp_5);
    }

    onDestroy() {
        this.ap_1.stopAnimation();
        this.ap_1.destroy();
        this.ap_1 = null;

        this.ap_2.stopAnimation();
        this.ap_2.destroy();
        this.ap_2 = null;

        this.ap_3.stopAnimation();
        this.ap_3.destroy();
        this.ap_3 = null;

        this.ap_4.stopAnimation();
        this.ap_4.destroy();
        this.ap_4 = null;

        this.ap_5.stopAnimation();
        this.ap_5.destroy();
        this.ap_5 = null;
    }

    startSlowEffect() {
        this.ap_1.playAnimationLoop("animation")
        this.ap_2.playAnimationLoop("animation")
        this.ap_3.playAnimationLoop("animation")
        this.ap_4.playAnimationLoop("animation")
        this.ap_5.playAnimationLoop("animation")
    }

    stopSlowEffect() {
        this.ap_1.stopAnimation()
        this.ap_2.stopAnimation()
        this.ap_3.stopAnimation()
        this.ap_4.stopAnimation()
        this.ap_5.stopAnimation()
    }

    /**
     * 创建符号
     * @param maxRow 最大行数
     * @param symbolPrefab 符号预制件
     */
    createSymbolEffects(maxRow:number):void {
        console.log("createSymbolEffects01");
        super.createSymbolEffects(maxRow);
        this.fixSpacingY = -7;
        for (let i in this.effects) {
            var effect = this.effects[i];
            let y = Number(i) * (effect.getComponent(UITransform).height + this.fixSpacingY);
            effect.setPosition(effect.x, y, Number(i)); //按需求调整麻将之间的z轴深度
        }
    }

    //{reel: 0, symbol:[{index: 0, state: SYMBOL_STATE.ALPHA}, {index: 1, state: SYMBOL_STATE.ALPHA}]}
    setState(param:any, callback?:Function) {
        let finish:number = 0;
        let total:number = param.symbol.length;
        for (let symbolIndex in param.symbol) {
            let symbolData = param.symbol[symbolIndex];
            let effect = this.effects[symbolData.index];
            effect.active = true;
            effect.getComponent(MahjongWaysSymbolEffect).setState(symbolData.state, () => {
                finish++;
                if (finish == total) {
                    effect.getComponent(MahjongWaysSymbolEffect).hide();
                    callback && callback()
                }
            }, symbolData);
        }
    }

    /**
     * 显示胡特效
     */
    showHuEffect(param:any) {
        for (let symbolIndex in param.symbol) {
            let symbolData = param.symbol[symbolIndex];
            if (symbolData.type == SYMBOL_TYPE.HU) {
                let effect = this.effects[symbolData.index];
                effect.active = true;
                effect.getComponent(MahjongWaysSymbolEffect).setState(SYMBOL_STATE.TREASURE, null, symbolData);
            }
        }
    }

}