
import { _decorator, Component, Prefab, Node, UITransform } from 'cc';
import { CommonBoxInfo } from '../../../../script/subgame/info/CommonBoxInfo';
import { MahjongWaysReel } from './MahjongWaysReel';
import{ MahjongWaysReelEffect } from './MahjongWaysReelEffect';
import { CommonBox } from '../../../../script/subgame/ui/game/CommonBox';
import { CommonReel } from '../../../../script/subgame/ui/game/CommonReel';
import { model } from '../data/MahjongWaysModel';
import { SYMBOL_STATE } from '../../../../script/subgame/ui/game/CommonSymbol';
const { ccclass, property } = _decorator;
 
@ccclass('MahjongWaysBox')
export class MahjongWaysBox extends CommonBox {

    public constructor() {
        super();
    }

    start () {
        super.start();
        // this.guiderLayer.active = false;
    }
    /**
     * 创建卷轴
     * @param maxCol 最大列数
     * @param boxInfo 传入卷轴集合
     */
    createReels(maxCol:number, boxInfo:CommonBoxInfo) {
        super.createReels(maxCol, boxInfo);
        let x= [18,9,0,-9,-18];
        for (var i = 0; i < this.maxCol; i++ ) {
            let reel = this.reels[i];
            reel.x = -300 + i * reel.getComponent(UITransform).width+x[i];
        }
    }

    /**
     * 创建卷轴特效层
     * @param maxColEffect 最大列数
     * @param maxRowEffect 最大行数
     */
    createReelEffects(maxColEffect:number, maxRowEffect:number) {
        super.createReelEffects(maxColEffect, maxRowEffect);
        let x= [18,9,0,-9,-18];
        for (var i = 0; i < this.maxCol; i++ ) {
            let reel = this.reelEffects[i];
            reel.x = -300 + i * reel.getComponent(UITransform).width+x[i];
        }
    }

    /**
     * 停止旋转单个卷轴
     * @param index 卷轴索引
     * @param callback 停止旋转单个卷轴后回调 返回(当前卷轴索引，总卷轴索引)
     */
    stopSingle(index:number, callback?: Function) {
        let reel:Node = this.reels[index];
        reel.getComponent(MahjongWaysReel).setStateAll(SYMBOL_STATE.NORMAL);
        reel.getComponent(MahjongWaysReel).stop(() => callback && callback(index, this.maxCol - 1));
    }

    /**
     * 停止单个卷轴特效
     * @param param 
     * @param index 
     * @param callback 
     */
    stopSingleEffect(param:any[], index:number, callback?: Function) {
        var reelE:Node = this.reelEffects[index];
        reelE.getComponent(MahjongWaysReelEffect).stopSlowEffect(); //停止播放慢特效
        reelE.getComponent(MahjongWaysReelEffect).showHuEffect(param[index]);
        
        let reel:Node = this.reels[index];
        reel.getComponent(MahjongWaysReel).showMask();
    }

    
    /**
     * 减速停止旋转单个卷轴
     * @param index 
     * @param callback 
     * @param targetRound 目标次数，当到curRound达此次数时,卷轴停止转动
     * @param speedMin 最小速度
     * @param speedDown 减速速度
     */
     stopSingleSlow(index:number, callback?: Function, targetRound: number = 6, speedMin:number = 5, speedDown:number = 1) {
        let reel:Node = this.reels[index];
        reel.getComponent(MahjongWaysReel).stopSingleSlow(() => callback(index, this.maxCol - 1), targetRound, speedMin, speedDown);
        var reelE:Node = this.reelEffects[index];
        reelE.getComponent(MahjongWaysReelEffect).startSlowEffect();
    }

    /**
     * 设置符号状态
     * @param interval 每列表现状态特效的间隔
     * @param param [{reel: 0, symbol:[{index: 0, state: SYMBOL_STATE.ALPHA}, {index: 1, state: SYMBOL_STATE.ALPHA}]}]
     * @param callback 
     */
    setState(param:any[], callback?:Function, arg?:any[]) {
        this.setReelEffectState(param, (current_1, total_1)=>{
            if (current_1 == total_1) {
                this.hideMaskAll();         //特效层播放完毕后，隐藏遮罩层
                this.hideReelEffect();      //特效层播放完毕后，隐藏列特效层
            }
        })
        this.setReelState(param, (current, total)=> {
            callback(current, total);       //符号状态播放完毕，回调到scene画面
        }, arg);
    }

    /**
     * 设置卷轴特效状态
     * @param param 
     * @param callback 
     */
    setReelEffectState(param:any[], callback?: Function) {
        let current:number = 0;
        for (let index in this.reelEffects) {
            var reelE:Node = this.reelEffects[index];
            reelE.getComponent(MahjongWaysReelEffect).setState(param[index], () => {
                // console.log("卷轴" + index + "特效层动画播放完成", param)
                current++;
                callback(current, this.maxColEffect);
            });
        }
    }

    /**
     * 设置卷轴状态
     * @param param 
     * @param callback 
     * @param arg 
     */
    setReelState(param:any[], callback?: Function, arg?:any[]) {
        let current:number = 0;
        // console.log("model.isBingo", model.isBingo)
        for (let index in this.reels) {
            var reel:Node = this.reels[index];
            model.isBingo ? reel.getComponent(MahjongWaysReel).showMask() : reel.getComponent(MahjongWaysReel).hideMask();
            reel.getComponent(MahjongWaysReel).bingoAndFall(param[index], () => {
                // console.log("卷轴" + index + "symbol动画播放完成", param)
                current++;
                callback(current, this.maxCol);
            }, arg && arg[index]);
        }
    }

    /**
     * 隐藏所有遮罩
     */
    private hideMaskAll() {
        for (let index in this.reels) {
            var reel:Node = this.reels[index];
            reel.getComponent(MahjongWaysReel).hideMask();
        }
    }

    /**
     * 显示指导
     * 
     */
     showGuider(data: any) {
        super.showGuider(data);
        let symbolInfo = data.symbolInfo;
        let reelIndex = data.reelIndex;
        if (reelIndex < 3) {
            this.guider.x = 144 * reelIndex - this.guider.getComponent(UITransform).width;
        } else {
            this.guider.x = 144 * reelIndex - this.guider.getComponent(UITransform).width * 1.6;
        }
        this.guider.y = 170 * symbolInfo.index - this.guider.getComponent(UITransform).height + 10;
    }

}