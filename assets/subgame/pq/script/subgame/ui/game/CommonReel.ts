
import { _decorator, Component, Node, Prefab, instantiate, Layers, UITransform, Vec3 } from 'cc';
import { CommonReelInfo } from '../../info/CommonReelInfo';
import { CommonSymbolInfo } from '../../info/CommonSymbolInfo';
import { CommonSymbol, SYMBOL_STATE } from './CommonSymbol';
const { ccclass, property } = _decorator;
 
@ccclass('CommonReel')
export class CommonReel extends Component implements IReel {

    @property(Prefab)
    protected symbolPrefab:Prefab;    //传入各游戏皮肤的symbol预制件

    @property(Node)
    symbolLayer:Node = null;    //symbol层
    
    @property(Node)
    maskLayer:Node = null;     //遮罩层

    protected reelInfo:CommonReelInfo;

    protected symbols:Node[]; //symbol数组

    protected maxRow:number;  //最大行数

    protected roundRow:number; //每圈转动的符号数，用于统计是否完整转完一圈

    protected targetRound:number; //目标次数，当到curRound达此次数时会触发回调函数，但并不会停止转动

    protected speedMax: number;   //最大速度

    protected speedUp: number;    //加速速度

    protected speedMin: number;   //最小速度

    protected speedDown: number;    //减速速度

    protected curRound: number;   //当前转动次数

    protected speed:number;       //当前速度

    protected endPos:Vec3 = new Vec3();        //符号动画结束位置

    protected startPos:Vec3 = new Vec3();      //符号动画开始位置

    protected reelState:string;       //卷轴状态

    protected spinCallback:Function;    //转动到目标次数后回调

    protected stopCallback:Function;    //停止转动后回调

    protected fixSpacingY:number = 0;   //符号Y轴的修正值

    public constructor() {
        super();

    }

    onLoad () {
    }

    start () {
        this.node.getComponent(UITransform).anchorY = 0;
        this.node.layer = Layers.Enum.UI_2D;
        this.reset();
    }

    onDestroy() {
    }

    /**
     * 重置
     */
    private reset() {
        this.maskLayer && this.hideMask();
        this.reelState = REEL_STATE.IDEL;
        this.curRound = 0;
        this.targetRound = 0;
        this.speedMax = 0;
        this.speedUp = 0;
        this.speed = 0;
        this.roundRow = 0;
        this.speedMin = 0;
        this.speedDown = 0;
    }

    /**
     * 创建符号
     * @param maxRow 最大行数
     */
    createSymbols(maxRow:number):void {
        this.maxRow = maxRow;
        this.symbols = [];
        for (let i = 0; i < this.maxRow; i++ ) {
            var symbol = instantiate(this.symbolPrefab);
            this.symbolLayer.addChild(symbol);
            symbol.y = this.symbols.length * symbol.getComponent(UITransform).height;
            this.symbols.push(symbol);
        }
        this.endPos.y = this.symbols[0].getPosition().y - this.symbols[0].getComponent(UITransform).height;
        this.fixSpacingY = 0;
    }

    /**
     * 传入卷轴
     * @param reelInfo 
     */
    updateReelInfo(reelInfo:CommonReelInfo) {
        this.reelInfo = reelInfo;
        this.updateReel();
    }

    /**
     * 获取卷轴索引
     */
    get index():number {
        return this.reelInfo.index;
    }

    /**
     * 更新画面
     */
    protected updateReel() {
        for (let i = 0; i < this.maxRow; i++ ) {
            let symbolInfo:CommonSymbolInfo = this.reelInfo.symbolArr[i];
            var symbol = this.symbols[i];
            symbol.getComponent(CommonSymbol).updateSymbolInfo(symbolInfo);
            symbol.getComponent(CommonSymbol).setState(SYMBOL_STATE.NORMAL);
            symbol.getComponent(CommonSymbol).setReelIndex(this.reelInfo.index);
        }
    }

    /**
     * 旋转
     * @param targetRound 目标次数，当到curRound达此次数时会触发回调函数，但并不会停止转动
     * @param speedMax 最大速度
     * @param speedUp  加速度
     * @param callback 转动到目标次数后回调
     */
    spin(callback: Function, targetRound: number, speedMax:number, speedUp:number) {
        this.reset();
        this.targetRound = targetRound;
        this.speedMax = speedMax;
        this.speedUp = speedUp;
        this.spinCallback = callback;
        this.reelState = REEL_STATE.SPIN;
    }
    
    /**
     * 停止
     */
    stop(callback: Function) {
        this.reelState = REEL_STATE.IDEL;
        this.stopCallback = callback;
        this.resetPosition();
        this.reset();
        this.setStateAll(SYMBOL_STATE.NORMAL);
        this.stopCallback && this.stopCallback();
    }

    /**
     * 减速停止
     * @param callback 停止后回调函数
     * @param targetRound 目标次数，当到curRound达此次数时,卷轴停止转动
     * @param speedMin 最小速度
     * @param speedDown 减速速度
     */
    stopSingleSlow(callback: Function, targetRound: number, speedMin:number, speedDown:number) {
        this.curRound = 0;
        this.targetRound = targetRound;
        this.stopCallback = callback;
        this.speedMin = speedMin;
        this.speedDown = speedDown;
        this.reelState = REEL_STATE.SLOW;
    }

    /**
     * 重置坐标
     */
    protected resetPosition() {
        for (let i = 0; i < this.maxRow; i++ ) {
            let symbol:Node = this.symbols[i];
            symbol.y = i * symbol.getComponent(UITransform).height;
        }
    }

    update() {
        this.updateSpin();
    }

    /**
     * 旋转帧频刷新
     */
    updateSpin() {
        if (this.reelState == REEL_STATE.SPIN) {
            this.speed += this.speedUp;
            if (this.speed > this.speedMax) this.speed = this.speedMax;
            for (var i in this.symbols) {
                let symbol:Node = this.symbols[i];
                symbol.y -= this.speed;
                if (symbol.y <= this.endPos.y) {
                    let indexPre:number = Number(i) - 1;
                    if (indexPre < 0) {
                        indexPre = this.maxRow - 1;
                    }
                    let symbolPre:Node = this.symbols[indexPre];
                    symbol.y = symbolPre.y + symbolPre.getComponent(UITransform).height + this.fixSpacingY;
                    if (Number(i) == 0) {
                        symbol.y -= this.speed;
                    }
                    this.roundRow++;
                    if (this.roundRow >= this.maxRow) {
                        this.roundRow = 0;
                        this.curRound ++;
                        if (this.curRound == this.targetRound) {
                            //到达目标次数 触发回调函数
                            this.spinCallback && this.spinCallback();
                        }
                    }
                }
            }
        } else if (this.reelState == REEL_STATE.SLOW) {
            this.speed -= this.speedDown;
            if (this.speed < this.speedMin) this.speed = this.speedMin;
            for (var i in this.symbols) {
                let symbol:Node = this.symbols[i];
                symbol.y -= this.speed;
                if (symbol.y <= this.endPos.y) {
                    let indexPre:number = Number(i) - 1;
                    if (indexPre < 0) {
                        indexPre = this.maxRow - 1;
                    }
                    let symbolPre:Node = this.symbols[indexPre];
                    symbol.y = symbolPre.y + symbolPre.getComponent(UITransform).height + this.fixSpacingY;
                    if (Number(i) == 0) {
                        symbol.y -= this.speed;
                    }
                    this.roundRow++;
                    if (this.roundRow >= this.maxRow) {
                        this.roundRow = 0;
                        this.curRound ++;
                        if (this.curRound >= this.targetRound) {
                            if (Number(i) == this.maxRow - 1) {
                                //到达目标次数 触发回调函数
                                this.stopCallback && this.stopCallback();
                            }
                        }
                    }
                }
            }
        }
    }

    
    /**
     * 显示遮罩
     */
    showMask() {
        this.maskLayer.active = true;
    }

    /**
     * 隐藏遮罩
     */
    hideMask() {
        this.maskLayer.active = false;
    }

    ///////////////////////////////////////////////状态和效果//////////////////////////////////////////////////

    setStateAll(st: SYMBOL_STATE) {
        for (let i = 0; i < this.maxRow; i++ ) {
            this.setStateSingle(i, st);
        }
    }


    setStateSingle(index:number, st: SYMBOL_STATE, callback?:Function) {
        // console.log("这是设置CommonReel的状态，子类没有覆写状态")
        var symbol = this.symbols[index];
        symbol.getComponent(CommonSymbol).setState(st, () => callback && callback(index));
    }

    //{reel: 0, symbol:[{index: 0, state: SYMBOL_STATE.ALPHA}, {index: 1, state: SYMBOL_STATE.ALPHA}]}
    setState(param:any, callback?:Function) {
        let lastIndex = param.symbol[param.symbol.length - 1].index;
        for (let symbolIndex in param.symbol) {
            let symbolData = param.symbol[symbolIndex];
            let symbol = this.symbols[symbolData.index];
            symbol.getComponent(CommonSymbol).setState(symbolData.state, () => {
                if (symbolData.index == lastIndex) {
                    callback(symbolData.index, lastIndex)
                }
            });
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////


}

export enum REEL_STATE {
    IDEL = 'IDEL',  //待机
    SPIN = 'SPIN',  //转动
    SLOW = 'SLOW',  //慢转
}

export interface IReel {
    updateSpin():void;
}