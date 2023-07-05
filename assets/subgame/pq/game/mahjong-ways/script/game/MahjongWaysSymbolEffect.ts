
import { _decorator, sp, Sprite, Vec3, tween } from 'cc';
import { SYMBOL_STATE } from '../../../../script/subgame/ui/game/CommonSymbol';
import AnimationPlayer from '../../../../script/animations/AnimationPlayer';
import { CommonSymbolEffect } from '../../../../script/subgame/ui/game/CommonSymbolEffect';
import { Node} from 'cc';
import { PQAsset } from '../../../../script/asset/PQAssetRepository';
import Tweens from '../../../../script/subgame/common/Tweens';
import { mahjongWaysConfig } from '../config/MahjongWaysConfig';
import { SYMBOL_TYPE } from './MahjongWaysSymbol';
import TweenPlayer from '../../../../script/animations/TweenPlayer';
const { ccclass, property } = _decorator;
 
@ccclass('MahjongWaysSymbolEffect')
export class MahjongWaysSymbolEffect extends CommonSymbolEffect {

    @property(Node)
    symbolSp:Node = null;      //符号

    @property(Node)
    symbolBg:Node = null;      //背景图
    
    @property(Node)
    huBg:Node = null;          //胡背景图

    @property(sp.Skeleton)//金框特效
    private bingoSp_1:sp.Skeleton;
    private bingoAp_1: AnimationPlayer;

    @property(sp.Skeleton)//星星闪烁
    private bingoSp_2:sp.Skeleton;
    private bingoAp_2: AnimationPlayer;
    
    @property(sp.Skeleton)//白麻将翻牌
    private bingoSp_3:sp.Skeleton;
    private bingoAp_3: AnimationPlayer;

    @property(sp.Skeleton)//金麻将翻牌
    private bingoSp_4:sp.Skeleton;
    private bingoAp_4: AnimationPlayer;

    @property(sp.Skeleton)//胡牌特效
    private bingoSp_5a:sp.Skeleton;
    private bingoAp_5a: AnimationPlayer;

    @property(sp.Skeleton)//胡牌特效
    private bingoSp_5b:sp.Skeleton;
    private bingoAp_5b: AnimationPlayer;

    @property(sp.Skeleton)//胡牌特效
    private bingoSp_5c:sp.Skeleton;
    private bingoAp_5c: AnimationPlayer;
    
    @property(sp.Skeleton)//爆金币
    private bingoSp_6:sp.Skeleton;
    private bingoAp_6: AnimationPlayer;

    private scatterBunceEffect: TweenPlayer<Node>;

    start () {
        super.start();
        this.symbolBg.active = this.symbolSp.active = this.huBg.active = false;
        this.bingoAp_1 = new AnimationPlayer(this.bingoSp_1);
        this.bingoAp_2 = new AnimationPlayer(this.bingoSp_2);
        this.bingoAp_3 = new AnimationPlayer(this.bingoSp_3);
        this.bingoAp_4 = new AnimationPlayer(this.bingoSp_4);
        this.bingoAp_5a = new AnimationPlayer(this.bingoSp_5a);
        this.bingoAp_5b = new AnimationPlayer(this.bingoSp_5b);
        this.bingoAp_5c = new AnimationPlayer(this.bingoSp_5c);
        this.bingoAp_6 = new AnimationPlayer(this.bingoSp_6);
        this.scatterBunceEffect = new TweenPlayer();
    }

    private reset() {
        // this.symbolBg.getComponent(Sprite).spriteFrame = this.symbolSp.getComponent(Sprite).spriteFrame = null;
        this.symbolBg.active = this.symbolSp.active = this.huBg.active = false;
        this.bingoAp_1 && this.bingoAp_1.stopAnimation();
        this.bingoAp_2 && this.bingoAp_2.stopAnimation();
        this.bingoAp_3 && this.bingoAp_3.stopAnimation();
        this.bingoAp_4 && this.bingoAp_4.stopAnimation();
        this.bingoAp_5a && this.bingoAp_5a.stopAnimation();
        this.bingoAp_5b && this.bingoAp_5b.stopAnimation();
        this.bingoAp_5c && this.bingoAp_5c.stopAnimation();
        this.bingoAp_6 && this.bingoAp_6.stopAnimation();
    }

    onDestroy() {
        this.reset();

        this.bingoAp_1 && this.bingoAp_1.destroy();
        this.bingoAp_1 = null;

        this.bingoAp_2 && this.bingoAp_2.destroy();
        this.bingoAp_2 = null;

        this.bingoAp_3 && this.bingoAp_3.destroy();
        this.bingoAp_3 = null;

        this.bingoAp_4 && this.bingoAp_4.destroy();
        this.bingoAp_4 = null;

        this.bingoAp_5a && this.bingoAp_5a.destroy();
        this.bingoAp_5a = null;
        
        this.bingoAp_5b && this.bingoAp_5b.destroy();
        this.bingoAp_5b = null;
        
        this.bingoAp_5c && this.bingoAp_5c.destroy();
        this.bingoAp_5c = null;

        this.bingoAp_6 && this.bingoAp_6.destroy();
        this.bingoAp_6 = null;
    }

    /**
     * 获取符号资源
     */
     protected async getAsset(type:number) {
        // console.log("获取符号资源=====", type, stString)
        this.symbolSp.getComponent(Sprite).spriteFrame = await PQAsset.loadSpriteFrame(`${mahjongWaysConfig.symbolFame[type].NORMAL}/spriteFrame`);
        this.symbolSp.active = true;
        switch (type) {
            case SYMBOL_TYPE.BAIDA://百搭
            //没背景
                this.symbolBg.active = false;
                this.huBg.active = false;
            break;
            case SYMBOL_TYPE.HU://胡
                this.symbolBg.active = false;
                this.huBg.active = true;
                break;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                //白色背景
                this.symbolBg.getComponent(Sprite).spriteFrame = await PQAsset.loadSpriteFrame(`${mahjongWaysConfig.bgFame[0].NORMAL}/spriteFrame`);
                this.symbolBg.active = true;
                this.huBg.active = false;
                break;
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
                //黄金背景
                this.symbolBg.getComponent(Sprite).spriteFrame = await PQAsset.loadSpriteFrame(`${mahjongWaysConfig.bgFame[1].NORMAL}/spriteFrame`);
                this.symbolBg.active = true;
                this.huBg.active = false;
                break;
        }
    }

    /**
     * 设置状态
     * @param st 状态 SYMBOL_STATE
     * @param callback 符号状态完成时调用
     * @param arg 
     */
    async setState(st: SYMBOL_STATE, callback?:Function, ...arg:any[]) {
        this.reset();
        switch(st) {
            case SYMBOL_STATE.NORMAL:
                callback && callback();
                break;
            case SYMBOL_STATE.BLUR:
                break;
            case SYMBOL_STATE.BINGO:
                var type = arg[0].type;
                this.getAsset(type);
                if (type != SYMBOL_TYPE.HU) {
                    //不是胡特效
                    this.bingoAp_1.stopAnimation();
                    this.bingoAp_1.playAnimationOnce("Sprite", () => {
                        this.bingoAp_1.stopAnimation();
                        this.symbolBg.active = false;
                        if (type != SYMBOL_TYPE.BAIDA) {
                            if (type < 11) {
                                this.bingoAp_3.playAnimationOnce("Sprite");
                            } else {
                                this.bingoAp_4.playAnimationOnce("Sprite");
                            }
                        }
                        Tweens.startFilpTween(this.symbolSp, ()=> {
                            this.symbolSp.active = false;
                            this.bingoAp_6.playAnimationOnce("animation", ()=> {
                                callback && callback();
                            });
                        });
                    });
                    this.bingoAp_2.stopAnimation();
                    this.bingoAp_2.playAnimationOnce("animation");
                } else {
                    //胡特效
                    callback && this.playScatterBounceEffect(callback);
                }
                break;
            case SYMBOL_STATE.TREASURE:
                //胡特效
                var type = arg[0].type;
                this.getAsset(type);
                this.bingoAp_5a.stopAnimation();
                this.bingoAp_5b.stopAnimation();
                this.bingoAp_5c.stopAnimation();
                this.bingoAp_5a.playAnimationOnce("animation", () => {
                    callback && callback();
                });
                this.bingoAp_5b.playAnimationOnce("animation");
                this.bingoAp_5c.playAnimationOnce("animation");
                this.playScatterBounceEffect(callback);
                break;
                
        }
    }

    /**
     * 播放胡字特效
     * @returns 
     */
    private playScatterBounceEffect(callback:Function) {
        // console.log("播放胡字特效")
        return new Promise<void>(resolve => {
            const symbolScale = new Vec3(0.88, 0.85)
            const scales = new Array<Vec3>();
            scales.push(new Vec3(symbolScale.x * 0.98, symbolScale.y * 0.98));
            scales.push(new Vec3(symbolScale.x * 1.2, symbolScale.y * 1.2));
            scales.push(new Vec3(symbolScale.x * 0.7, symbolScale.y * 0.7));
            scales.push(new Vec3(symbolScale.x, symbolScale.y));
            this.scatterBunceEffect.tween = tween(this.symbolSp)
                .to(0.02, { scale: scales[0] })
                .to(0.18, { scale: scales[1] })
                .call(() => resolve())
                .to(0.1, { scale: scales[2] })
                .to(0.1, { scale: scales[3] })
                .start()
                .call(callback && callback())
        });
    }

    /**
     * 隐藏特效
     */
    hide() {
        this.reset();
        this.node.active = false;
    }


}
    
