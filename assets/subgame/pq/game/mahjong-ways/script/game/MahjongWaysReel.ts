
import { Node, Vec3, _decorator} from 'cc';
import { CommonReel } from '../../../../script/subgame/ui/game/CommonReel';
import { instantiate } from 'cc';
import { Prefab } from 'cc';
import { UITransform } from 'cc';
import { CommonSymbolInfo } from '../../../../script/subgame/info/CommonSymbolInfo';
import { MahjongWaysSymbol, SYMBOL_TYPE } from './MahjongWaysSymbol';
import { CommonSymbol, SYMBOL_STATE } from '../../../../script/subgame/ui/game/CommonSymbol';
import Tweens from '../../../../script/subgame/common/Tweens';
import { model } from '../data/MahjongWaysModel';
const { ccclass, property } = _decorator;
 
@ccclass('MahjongWaysReel')
export class MahjongWaysReel extends CommonReel {


    public constructor() {
        super();
    }

    start () {
        super.start();
    }


    /**
     * 创建符号
     * @param maxRow 最大行数
     */
    createSymbols(maxRow:number):void {
        console.log("createSymbols01");
        super.createSymbols(maxRow);
        this.fixSpacingY = -7;
        for (let i in this.symbols) {
            var symbol = this.symbols[i];
            let y = Number(i) * (symbol.getComponent(UITransform).height + this.fixSpacingY);
            symbol.setPosition(symbol.x, y); //按需求调整麻将之间的z轴深度
            symbol.zIndex = this.maxRow - 1 - Number(i);
        }
        this.endPos.y = this.symbols[0].getPosition().y - this.symbols[0].getComponent(UITransform).height + this.fixSpacingY;
    }

    /**
     * 重置坐标
     */
    resetPosition() {
        for (let i = 0; i < this.maxRow; i++ ) {
            let symbol:Node = this.symbols[i];
            symbol.y = i * (symbol.getComponent(UITransform).height + this.fixSpacingY);
        }
    }

    /**
     * 匹配与掉落
     * @param param 
     * @param callback 
     * @param arg 
     * @returns 
     */
    bingoAndFall(param:any, callback?:Function, arg?:any) {
        let fallTotal:number = 0;
        let fallCount:number = 0;
        let fixIndex:number = 1;   //客户端和服务端标记索引相差1，所以要补上
        let bingoTotal:number = 0;
        let delTemp:number[] = [];  //保存被消除的索引
        let goldTemp:number[] = [];   //保存被变成百搭的索引
        let height = this.symbols[0].getComponent(UITransform).height + this.fixSpacingY;
        for (let symbolIndex in param.symbol) {
            let symbolData = param.symbol[symbolIndex];
            if (symbolData.state == SYMBOL_STATE.BINGO && symbolData.type != SYMBOL_TYPE.HU) {//需要把中奖数量统计
                bingoTotal++;
            }
        }
        if (bingoTotal == 0) {
            //没找到需要消除的 直接回调
            this.updateSymbolInfoAfter(arg);    //掉落完成，更新所有符号
            this.playHuEffect(arg, callback);   //更新完后，再播放一次胡特效，如有则播放后回调，没有则直接回调
            return;
        }
        for (let symbolIndex in param.symbol) {
            let symbolData = param.symbol[symbolIndex];
            let symbol = this.symbols[symbolData.index + fixIndex];
            if (symbolData.state == SYMBOL_STATE.BINGO) {
                if (symbolData.type < 11) {//白牌的需要移除
                    if (symbolData.type != SYMBOL_TYPE.HU) { //不为胡的，都需要移除
                        delete this.symbols[symbolData.index + fixIndex];
                        delTemp.push(symbolData.index + fixIndex);
                        this.symbolLayer.removeChild(symbol);
                        this.symbols.push(symbol);
                        symbol.y = this.symbols.length * height;
                    }
                } else {
                    //黄金牌保存下来，等下用来变成百搭
                    symbol.active = false;  //隐藏符号
                    goldTemp.push(symbolData.index + fixIndex);
                }
            }
        }
        // console.log("symbols", this.symbols, "delTemp", delTemp, "goldTemp", goldTemp)
        //删除empty的数组
        for (let i = this.symbols.length - 1; i > 0; i--) {
            if (this.symbols[i] == undefined) {
                this.symbols.splice(i, 1);
            }
        }
        this.scheduleOnce(() => {
            if (goldTemp.length > 0 ) {//如果有黄金符号消除
                for (let g in goldTemp) {
                    let goldIndex = Number(goldTemp[g]);
                    for (let i in this.symbols) {
                        let goldSymbol = this.symbols[Number(i)];
                        if (Number(i) == goldIndex) {    //如发现索引等于黄金符号，进行变更符号
                            let symbolInfo = arg.symbol[goldIndex - fixIndex]
                            goldSymbol.active = true;
                            goldSymbol.getComponent(MahjongWaysSymbol).updateSymbolInfo(symbolInfo);
                            goldSymbol.getComponent(MahjongWaysSymbol).setState(SYMBOL_STATE.NORMAL);
                        }
                    }
                }
            }
            if (delTemp.length == 0) {
                //没有掉落 更新符号，直接退出判断
                this.updateSymbolInfoAfter(arg);    //掉落完成，更新所有符号
                this.playHuEffect(arg, callback);   //更新完后，再播放一次胡特效，如有则播放后回调，没有则直接回调
                return;
            }
            //如果有掉落的情况
            for (let i in this.symbols) {
                let fallSymbol = this.symbols[i];
                if (Number(i) >= delTemp[0]) {  //只要i大于被消除的索引，都需要执行掉落
                    fallTotal++;
                    let param = {
                        delay: 0.8,
                        target: new Vec3(0, Number(i) * height, 0),
                        callback: () => {
                            fallCount++;
                            if (fallCount == fallTotal) {
                                this.updateSymbolInfoAfter(arg);    //掉落完成，更新所有符号
                                this.playHuEffect(arg, callback);   //更新完后，再播放一次胡特效，如有则播放后回调，没有则直接回调
                            }
                        }
                    }
                    if (Number(i) > delTemp.length && Number(i) < this.maxRow - 1) {
                        let symbolInfo = arg.symbol[Number(i) - fixIndex]
                        fallSymbol.getComponent(MahjongWaysSymbol).updateSymbolInfo(symbolInfo);    //对即将要掉落的符号进行更新
                    }
                    this.symbolLayer.addChild(fallSymbol);
                    fallSymbol.active = true;
                    fallSymbol.getComponent(MahjongWaysSymbol).setState(SYMBOL_STATE.FALL, null, param);    //执行掉落状态
                }
            }
        }, 1.5)
    }


    /**
     * 在掉落后更新符号元素
     * @param arg 
     */
    private updateSymbolInfoAfter(arg:any) {
        if (!arg) return;
        for (let i = 0; i < arg.symbol.length; i++ ) {
            // console.log(i, arg.symbol[i])
            let symbolInfo:CommonSymbolInfo = arg.symbol[i];
            var symbol = this.symbols[i + 1];
            symbol.getComponent(MahjongWaysSymbol).updateSymbolInfo(symbolInfo);
            symbol.getComponent(MahjongWaysSymbol).setState(SYMBOL_STATE.NORMAL);
        }
    }

    
    /**
     * 播放胡特效
     * @param arg 
     * @callback   播放胡特效后回调
     */
    private playHuEffect(arg:any, callback?:Function) {
        if (model.huNum < 3) {
            callback && callback();
            return
        }
        for (let i = 1; i < this.maxRow; i++ ) {
            var symbol = this.symbols[i];
            if (symbol.getComponent(CommonSymbol).symbolInfo.type == SYMBOL_TYPE.HU) {
                symbol.getComponent(MahjongWaysSymbol).setState(SYMBOL_STATE.BINGO);
            }
        }
        this.scheduleOnce(() => {
            callback && callback();
        }, 0.5);
    }
}