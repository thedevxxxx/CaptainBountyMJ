
import { _decorator, Component, Node, Sprite } from 'cc';
import { PQAsset } from '../../../asset/PQAssetRepository';
import { CommonSymbolInfo } from '../../info/CommonSymbolInfo';
const { ccclass, property } = _decorator;
 
@ccclass('CommonSymbol')
export class CommonSymbol extends Component {

    protected _symbolInfo: CommonSymbolInfo;

    @property(Node)
    symbolSp:Node = null;      //符号


    reelIndex:number;

    start () {
    }

    /**
     * 更新符号
     * @param symbolInfo 
     */
    public updateSymbolInfo(symbolInfo: CommonSymbolInfo) {
        this._symbolInfo = symbolInfo;
    }

    get symbolInfo():CommonSymbolInfo {
        return this._symbolInfo;
    }

    public setReelIndex(index:number) {
        this.reelIndex = index;
    }

    /**
     * 获取符号资源
     */
    protected async getSymbolAsset(url: string) {
        this.symbolSp.getComponent(Sprite).spriteFrame = await PQAsset.loadSpriteFrame(`${url}/spriteFrame`);
    }

    /**
     * 设置状态
     * @param st 状态 SYMBOL_STATE
     * @param callback 符号状态完成时调用
     * @param param参数
     */
    setState(st: SYMBOL_STATE, callback?:Function, ...param:any[]) {
        console.log("这是CommonSymbol的状态，子类没有覆写状态")
    }

}

export interface SymbolRes {
    NORMAL: string;
    BLUR: string;
}

export enum SYMBOL_STATE {
    NORMAL = 'NORMAL',
    BLUR = 'BLUR', //馍糊
    BINGO = 'BINGO', //中奖
    EFFECT = 'EFFECT', //特效
    TREASURE = 'TREASURE', //夺宝
    FLIP = 'FLIP', //翻转
    SHAKE = 'SHAKE', //抖动
    FALL = 'FALL', //下落
    RESET = 'RESET', //重置
}