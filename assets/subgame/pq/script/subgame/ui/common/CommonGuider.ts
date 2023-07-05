
import { _decorator, Component, Node, Sprite } from 'cc';
import { CommonSymbolInfo } from '../../info/CommonSymbolInfo';
const { ccclass, property } = _decorator;

 
@ccclass('CommonGuider')
export class CommonGuider extends Component {

    @property(Node)
    symbolSp:Node = null;      //符号

    @property(Node)
    symbolBg:Node = null;      //背景图

    start () {
        // [3]
    }

    public updateSymbolInfo(symbolInfo:CommonSymbolInfo) {
        console.log("子类没有重写updateSymbolInfo方法")
    }

    protected async getAsset(symbolInfo:CommonSymbolInfo) {
        console.log("子类没有重写getAsset方法")
    }
}