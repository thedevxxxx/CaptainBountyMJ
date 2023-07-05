
import { _decorator, Component, Node, Prefab, instantiate, Layers, UITransform} from 'cc';
import { CommonReelInfo } from '../../info/CommonReelInfo';
import { CommonSymbolInfo } from '../../info/CommonSymbolInfo';
import { SYMBOL_STATE } from './CommonSymbol';
import { CommonSymbolEffect } from './CommonSymbolEffect';
const { ccclass, property } = _decorator;
 
@ccclass('CommonReelEffect')
export class CommonReelEffect extends Component {

    @property(Prefab)
    protected effectPrefab:Prefab;    //传入各游戏皮肤的symbolEffect预制件

    @property(Node)
    effectLayer:Node = null;   //特效层

    protected reelInfo:CommonReelInfo;

    protected maxRow:number;  //最大行数

    protected effects:Node[]; //symbol数组

    protected fixSpacingY:number = 0;   //符号Y轴的修正值

    public constructor() {
        super();

    }

    onLoad () {
    }

    start () {
        this.reset();
    }

    onDestroy() {
    }

    /**
     * 重置
     */
    private reset() {
        this.hideSymbolEffects();
    }
    
    /**
     * 传入卷轴
     * @param reelInfo 
     */
    updateReelInfo(reelInfo:CommonReelInfo) {
        this.reelInfo = reelInfo;
        this.updateReelEffect();
    }

    
    /**
     * 更新画面
     */
    protected updateReelEffect() {
        for (let i = 0; i < this.maxRow; i++ ) {
            let symbolInfo:CommonSymbolInfo = this.reelInfo.symbolArr[i];
            var effect = this.effects[i];
            effect.getComponent(CommonSymbolEffect).updateSymbolInfo(symbolInfo);
        }
    }


    /**
     * 创建符号
     * @param maxRow 最大行数
     *
     */
    createSymbolEffects(maxRow:number):void {
        this.maxRow = maxRow;
        this.effects = [];
        for (let i = 0; i < this.maxRow; i++ ) {
            var effect = instantiate(this.effectPrefab);
            this.effectLayer.addChild(effect);
            effect.y = this.effects.length * effect.getComponent(UITransform).height;
            this.effects.push(effect);
        }
    }

    hideSymbolEffects() {
        for (let i = 0; i < this.maxRow; i++ ) {
            var effect = this.effects[i];
            effect.active = false;
        }
    }

    ///////////////////////////////////////////////状态和效果//////////////////////////////////////////////////

    setStateAll(st: SYMBOL_STATE) {
        for (let i = 0; i < this.maxRow; i++ ) {
            this.setStateSingle(i, st);
        }
    }


    setStateSingle(index:number, st: SYMBOL_STATE, callback?:Function) {
        // console.log("这是设置CommonReel的状态，子类没有覆写状态")
        var effect = this.effects[index];
        effect.active = true;
        effect.getComponent(CommonSymbolEffect).setState(st, () => callback&&callback(index));
    }

    //{reel: 0, symbol:[{index: 0, state: SYMBOL_STATE.ALPHA}, {index: 1, state: SYMBOL_STATE.ALPHA}]}
    setState(param:any, callback?:Function) {
        let finish:number = 0;
        let total:number = param.symbol.length;
        for (let symbolIndex in param.symbol) {
            let symbolData = param.symbol[symbolIndex];
            let effect = this.effects[symbolData.index];
            effect.active = true;
            effect.getComponent(CommonSymbolEffect).setState(symbolData.state, () => {
                finish++;
                if (finish == total) {
                    callback()
                }
            },);
            
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////


}