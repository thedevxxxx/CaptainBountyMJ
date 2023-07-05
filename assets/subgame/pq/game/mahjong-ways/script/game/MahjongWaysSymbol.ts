
import { _decorator, Node, Sprite, sp, } from 'cc';
import { CommonSymbol, SYMBOL_STATE } from '../../../../script/subgame/ui/game/CommonSymbol';
import { CommonSymbolInfo } from '../../../../script/subgame/info/CommonSymbolInfo';
import { PQAsset } from '../../../../script/asset/PQAssetRepository';
import Tweens from '../../../../script/subgame/common/Tweens';
import { mahjongWaysConfig } from '../config/MahjongWaysConfig';
import { Vec3 } from 'cc';
import { tween } from 'cc';
import TweenPlayer from '../../../../script/animations/TweenPlayer';
import AnimationPlayer from '../../../../script/animations/AnimationPlayer';
import { commonEvent, EventType } from '../../../../script/event/CommonEventManage';
const { ccclass, property } = _decorator;

@ccclass('MahjongWaysSymbol')
export class MahjongWaysSymbol extends CommonSymbol {

    @property(Node)
    symbolBg:Node = null;      //背景图

    @property(Node)
    huBg:Node = null;          //胡背景图

    @property(sp.Skeleton)      //星星特效
    private bingoSp_1:sp.Skeleton;
    private bingoAp_1: AnimationPlayer;


    private scatterBunceEffect: TweenPlayer<Node>;


    start () {
        super.start();
        this.scatterBunceEffect = new TweenPlayer();
        this.bingoAp_1 = new AnimationPlayer(this.bingoSp_1);
    }

    onDestroy() {
        this.reset();

        this.bingoAp_1.destroy();
        this.bingoAp_1 = null;
    }

    private reset() {
        this.bingoAp_1 && this.bingoAp_1.stopAnimation();

    }

    public updateSymbolInfo(info: CommonSymbolInfo) {
        super.updateSymbolInfo(info)
    }


    /**
     * 获取符号资源
     */
    protected async getAsset(type:number, st:SYMBOL_STATE) {
        let stString = "NORMAL";
        if (st == SYMBOL_STATE.BLUR) {
            stString = "BLUR";
        } else {
            stString = "NORMAL";
        }
        // console.log("获取符号资源=====", type, stString)
        this.symbolSp.getComponent(Sprite).spriteFrame = await PQAsset.loadSpriteFrame(`${mahjongWaysConfig.symbolFame[type][stString]}/spriteFrame`);
        switch (type) {
            case SYMBOL_TYPE.BAIDA://百搭
                //没背景
                this.symbolBg.active = false;
                this.huBg.active = false;
                this.bingoAp_1.playAnimationLoop("animation");
                break;
            case SYMBOL_TYPE.HU://胡
                this.symbolBg.active = false;
                this.huBg.active = true;
                this.bingoAp_1.playAnimationLoop("animation");
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
                this.symbolBg.getComponent(Sprite).spriteFrame = await PQAsset.loadSpriteFrame(`${mahjongWaysConfig.bgFame[0][stString]}/spriteFrame`);
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
                this.symbolBg.getComponent(Sprite).spriteFrame = await PQAsset.loadSpriteFrame(`${mahjongWaysConfig.bgFame[1][stString]}/spriteFrame`);
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
     setState(st: SYMBOL_STATE, callback?:Function, ...arg:any[]) {
        this.reset();
        switch(st) {
            case SYMBOL_STATE.NORMAL:
                this.getAsset(this._symbolInfo.type, st);
                // console.log("NORMAL", this.symbolInfo)
                callback && callback();
                // this.bingoAp_2.stopAnimation();
                break;
            case SYMBOL_STATE.BLUR:
                this.getAsset(this._symbolInfo.type, st);
                // console.log("BLUR", this.symbolInfo.type)
                break;
            case SYMBOL_STATE.BINGO:
                let type = this.symbolInfo.type;
                if (type > 10 && type <= 18) {
                    this.getAsset(type, st);
                    callback && callback();
                } else if (type == SYMBOL_TYPE.HU) {
                    this.playScatterBounceEffect(callback);
                }
                break;
            case SYMBOL_STATE.FALL:
                // console.log("参数", arg[0])
                this.getAsset(this._symbolInfo.type, st);
                Tweens.stopShakeTween(this.node);
                Tweens.startShakeTween(this.node, ()=>{
                    Tweens.stopFallTween(this.node);
                    Tweens.startFallTween(this.node, arg[0]);
                });
                break;
        }
    }

    /**
     * 播放胡字特效
     * @returns 
     */
    private playScatterBounceEffect(callback:Function) {
        console.log("播放胡字特效")
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
     * 点击符号
     */
    clickSymbol() {
        let data = {
            reelIndex: this.reelIndex,
            symbolInfo: this._symbolInfo
        }
        commonEvent.dispatch(EventType.CLICK_SYMBOL, data);
        console.log("正常模式下点击了符号", data)
    }
}

export enum SYMBOL_TYPE {
    BAIDA = 1,
    HU = 2
}