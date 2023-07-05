
import { _decorator, Component, Prefab, Node, UITransform, instantiate } from 'cc';
import { CommonBoxInfo } from '../../info/CommonBoxInfo';
import { CommonReelInfo } from '../../info/CommonReelInfo';
import { CommonGuider } from '../common/CommonGuider';
import { CommonReel } from './CommonReel';
import { CommonReelEffect } from './CommonReelEffect';
import { SYMBOL_STATE } from './CommonSymbol';
const { ccclass, property } = _decorator;
 
@ccclass('CommonBox')
export class CommonBox extends Component {

    protected boxInfo:CommonBoxInfo;

    protected maxCol:number;  //最大列数

    protected maxColEffect:number;  //最大特效列数

    protected maxRowEffect:number;  //最大特效行数

    protected reels:Node[];     //卷轴数组
    
    protected reelEffects:Node[]; //卷轴特效数组

    @property(Node)
    reelLayer:Node = null;      //卷轴层

    @property(Node)
    effectLayer:Node = null;     //卷轴特效层

    @property(Node)
    guiderLayer:Node = null;     //指引层

    @property(Node)
    guider:Node = null;   //指引预制件

    @property(Prefab)
    reelPrefab:Prefab = null;  //卷轴预制件

    @property(Prefab)
    reelEffectPrefab:Prefab = null;  //卷轴特效预制件

    public constructor() {
        super();
    }

    start () {
    }

    onDestroy() {
        this.unscheduleAllCallbacks();
    }

    /**
     * 创建卷轴
     * @param maxCol 最大列数
     * @param boxInfo 传入卷轴集合
     */
     createReels(maxCol:number, boxInfo:CommonBoxInfo) {
        this.maxCol = maxCol;
        this.boxInfo = boxInfo;
        this.reelLayer.removeAllChildren();
        this.reels = [];
        for (var i = 0; i < this.maxCol; i++ ) {
            var reel = instantiate(this.reelPrefab);
            reel.addComponent(UITransform);
            reel.getComponent(UITransform).height = this.node.getComponent(UITransform).height;
            reel.getComponent(UITransform).width = this.node.getComponent(UITransform).width / this.maxCol;
            this.reelLayer.addChild(reel);

            var reelInfo:CommonReelInfo = this.boxInfo.reelArr[i];
            reel.getComponent(CommonReel).createSymbols(reelInfo.quantity);
            this.reels.push(reel);
        }
        this.updateBox();
    }

    /**
     * 创建卷轴特效层
     * @param maxColEffect 最大列数
     * @param maxRowEffect 最大行数
     */
    createReelEffects(maxColEffect:number, maxRowEffect:number) {
        this.maxColEffect = maxColEffect;
        this.maxRowEffect = maxRowEffect;
        this.effectLayer.removeAllChildren();
        this.reelEffects = [];
        for (var i = 0; i < this.maxColEffect; i++ ) {
            var reel = instantiate(this.reelEffectPrefab);
            reel.addComponent(UITransform);
            reel.getComponent(UITransform).height = this.node.getComponent(UITransform).height;
            reel.getComponent(UITransform).width = this.node.getComponent(UITransform).width / this.maxColEffect;
            this.effectLayer.addChild(reel);

            reel.getComponent(CommonReelEffect).createSymbolEffects(this.maxRowEffect);
            this.reelEffects.push(reel);
        }
    }

    hideReelEffect() {
        for (let index in this.reelEffects) {
            var reelE:Node = this.reelEffects[index];
            reelE.getComponent(CommonReelEffect).hideSymbolEffects();
        }
    }

    /**
     * 传入卷轴集合
     * @param boxInfo 
     */
    updateBoxInfo(boxInfo:CommonBoxInfo) {
        this.boxInfo = boxInfo;
        this.updateBox();
    }
 
    /**
     * 更新画面
     */
    private updateBox() {
        for (var i = 0; i < this.maxCol; i++ ) {
            var reelInfo:CommonReelInfo = this.boxInfo.reelArr[i];
            var reel:Node = this.reels[i];
            reel.getComponent(CommonReel).updateReelInfo(reelInfo);
        }
        for (var i = 0; i < this.maxColEffect; i++ ) {
            var reelInfo:CommonReelInfo = this.boxInfo.reelArr[i];
            var reelE:Node = this.reelEffects[i];
            reelE.getComponent(CommonReelEffect).updateReelInfo(reelInfo);
        }
    }

    /**
     * 旋转所有卷轴
     * @param interval 每列转动间隔(秒)
     * @param callback 转动到目标次数后回调 返回(当前卷轴索引，总卷轴索引)
     * @param targetRound 目标次数，当到curRound达此次数时会触发回调函数，但并不会停止转动
     * @param speedMax 最大速度
     * @param speedUp  加速度
     */
    spin(interval:number, callback?: Function, targetRound: number = 6, speedMax:number = 40, speedUp:number = 5) {
        let index:number = 0;
        this.schedule(() => {
            this.spinSingle(index, callback, targetRound, speedMax, speedUp);
            index++;
        }, interval, this.maxCol - 1, 0);
    }

    /**
     * 旋转单个卷轴
     * @param index    卷轴索引
     * @param callback 转动到目标次数后回调 返回(当前卷轴索引，总卷轴索引)
     * @param targetRound 目标次数，当到curRound达此次数时会触发回调函数，但并不会停止转动
     * @param speedMax 最大速度
     * @param speedUp  加速度
     */
    spinSingle(index:number, callback?: Function, targetRound: number = 6, speedMax:number = 40, speedUp:number = 5) {
        var reel:Node = this.reels[index];
        reel.getComponent(CommonReel).spin(() => callback(index, this.maxCol - 1) , targetRound, speedMax, speedUp);
    }
    
    /**
     * 停止旋转所有卷轴
     * @param interval 每列转动间隔(秒)
     * @param callback 停止旋转所有卷轴后回调 返回(当前卷轴索引，总卷轴索引)
     */
    stop(interval:number, callback?: Function) {
        let index:number = 0;
        this.schedule(() => {
            this.stopSingle(index, callback);
            index++;
        }, interval, this.maxCol - 1, 0);
    }

    /**
     * 停止旋转单个卷轴
     * @param index 卷轴索引
     * @param callback 停止旋转单个卷轴后回调 返回(当前卷轴索引，总卷轴索引)
     */
    stopSingle(index:number, callback?: Function) {
        let reel:Node = this.reels[index];
        reel.getComponent(CommonReel).stop(() => callback && callback(index, this.maxCol - 1));
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
        reel.getComponent(CommonReel).stopSingleSlow(() => callback(index, this.maxCol - 1), targetRound, speedMin, speedDown);
    }

    /**
     * 设置所有符号的状态
     * @param st 
     */
    setStateAll(st: SYMBOL_STATE) {
        for (var i = 0; i < this.maxCol; i++ ) {
            var reel:Node = this.reels[i];
            reel.getComponent(CommonReel).setStateAll(st);
            if (this.maxColEffect > 0 && i < this.maxColEffect) {
                var reelE:Node = this.reelEffects[i];
                reelE.getComponent(CommonReelEffect).setStateAll(st);
            }
        }
    }

    /**
     * 设置符号状态
     * @param param [{reel: 0, symbol:[{index: 0, state: SYMBOL_STATE.ALPHA}, {index: 1, state: SYMBOL_STATE.ALPHA}]}]
     * @param callback 
     */
    setState(param:any[], callback?:Function) {
        this.setReelEffectState(param, (current_1, total_1)=>{
            if (current_1 == total_1) {
                this.setReelState(param,  (current_2, total_2)=> {
                    callback(current_2, total_2);
                });
            }
        })
    }

    setReelEffectState(param:any[], callback?: Function) {
        let current:number = 0;
        for (let index in this.reelEffects) {
            var reelE:Node = this.reelEffects[index];
            reelE.getComponent(CommonReelEffect).setState(param[index], () => {
                console.log("卷轴" + index + "特效层动画播放完成", param)
                current++;
                callback(current, this.maxColEffect);
            });
        }
    }

    setReelState(param:any[], callback?: Function) {
        let current:number = 0;
        for (let index in this.reels) {
            var reel:Node = this.reels[index];
            reel.getComponent(CommonReel).setState(param[index], () => {
                console.log("卷轴" + index + "symbol动画播放完成", param)
                current++;
                callback(current, this.maxCol);
            });
        }
    }


    /**
     * 显示指导
     * 
     */
    showGuider(data: any) {
        let symbolInfo = data.symbolInfo;
        this.guiderLayer.active = true;
        this.guider.getComponent(CommonGuider).updateSymbolInfo(symbolInfo);
    }

    hideGuider() {
        this.guiderLayer.active = false;
    }
}