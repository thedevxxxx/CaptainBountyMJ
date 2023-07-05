
import { _decorator, Component } from 'cc';
import { CommonSymbolInfo } from '../../info/CommonSymbolInfo';
import { SYMBOL_STATE } from './CommonSymbol';
const { ccclass, property } = _decorator;
 
@ccclass('CommonSymbolEffect')
export class CommonSymbolEffect extends Component {

    protected symbolInfo: CommonSymbolInfo;

    start () {
    }

     /**
     * 更新符号
     * @param symbolInfo 
     */
    public updateSymbolInfo(symbolInfo: CommonSymbolInfo) {
        this.symbolInfo = symbolInfo;
    }

    /**
     * 设置状态
     * @param st 状态 SYMBOL_STATE
     * @param callback 符号状态完成时调用
     */
    setState(st: SYMBOL_STATE, callback?:Function) {
        console.log("这是CommonSymbolEffect的状态，子类没有覆写状态")
    }
}