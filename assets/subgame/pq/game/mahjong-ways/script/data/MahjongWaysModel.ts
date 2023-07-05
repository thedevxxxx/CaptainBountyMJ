
import { _decorator, Component, Node } from 'cc';
import { CommonAmountInfo } from '../../../../script/subgame/info/CommonAmountInfo';
import { CommonBoxInfo } from '../../../../script/subgame/info/CommonBoxInfo';
import { CommonModeInfo } from '../../../../script/subgame/info/CommonModeInfo';
import { SYMBOL_STATE } from '../../../../script/subgame/ui/game/CommonSymbol';
import { SYMBOL_TYPE } from '../game/MahjongWaysSymbol';
const { ccclass, property } = _decorator;
 
@ccclass('MahjongWaysModel')
export class MahjongWaysModel extends Component {

    private static _instance: MahjongWaysModel;

    
    public amountInfo:CommonAmountInfo = new CommonAmountInfo();
    public modeInfo:CommonModeInfo;
    public boxInfo:CommonBoxInfo;

    public maxReel:number = 5; //最大列数
    public resultIndex = 0;    //开奖结果index
    public results = [];       //每轮结果
    public isBingo:boolean;    //每轮开奖是否有匹配
    public huNum:number = 0;   //每轮胡的个数
    public huReelIndexArr:number[];//胡所在的卷轴索引

    public static getInstance(): MahjongWaysModel {
        this._instance || (this._instance = new MahjongWaysModel());
        return this._instance;
    }

    public reset() {
        this.isBingo = false;
        this.huNum = 0;
        this.huReelIndexArr = [];
        this.results = [];
        this.resultIndex = 0;
    }

    //本地数据替换成服务端返回的数据
    public updateResultInfo() {
        // console.log("每轮数据=================")
        let results = this.results[this.resultIndex];
        this.isBingo = false;
        this.huNum = 0;
        this.huReelIndexArr = [];
        for(let r in results) {
            let reelData = results[r];
            let reelInfo = this.boxInfo.reelArr[r];
            for (let s in reelData.symbol) {
                let symbolData = reelData.symbol[s];
                let symbolInfo = reelInfo.symbolArr[Number(s) + 1];
                symbolInfo.type = symbolData.type;
                if (symbolData.state == SYMBOL_STATE.BINGO) {
                    this.isBingo = true;    //统计是否有中奖
                }
                if (symbolData.type == SYMBOL_TYPE.HU) {
                    this.huNum++;   //统计该回合有多少个胡
                    if (this.huReelIndexArr.indexOf(reelData.reel) == -1) { //统计有胡所在的卷轴索引
                        this.huReelIndexArr.push(reelData.reel);
                    }
                }
            }
        }
        // console.log("是否有中奖", this.isBingo)
        // console.log("===========================")
    }

    ////////////////////////////////////////////////////////以下为测试数据

    public getTestResult():void {
        this.results = [this.result_1];
    }

    private result_1 = [
        {
            reel: 0, 
            symbol: [
                {index: 0, type:2, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:8, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
        {
            reel: 1, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:8, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:2, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
        {
            reel: 2, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:2, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:8, state: SYMBOL_STATE.NORMAL},
            ]
        },
        {
            reel: 3, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
        {
            reel: 4, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
    ];
    private result_2 = [
        {
            reel: 0, 
            symbol: [
                {index: 0, type:2, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:4, state: SYMBOL_STATE.NORMAL},
            ]
        },
        {
            reel: 1, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:2, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
        {
            reel: 2, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:2, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:5, state: SYMBOL_STATE.NORMAL},
            ]
        },
        {
            reel: 3, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
        {
            reel: 4, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
    ];
    private result_3 = [
        {
            reel: 0, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:1, state: SYMBOL_STATE.BINGO},
            ]
        },
        {
            reel: 1, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
        {
            reel: 2, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
        {
            reel: 3, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
        {
            reel: 4, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
    ];
    private result_4 = [
        {
            reel: 0, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
        {
            reel: 1, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
        {
            reel: 2, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
        {
            reel: 3, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
        {
            reel: 4, 
            symbol: [
                {index: 0, type:3, state: SYMBOL_STATE.NORMAL}, 
                {index: 1, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 2, type:3, state: SYMBOL_STATE.NORMAL},
                {index: 3, type:3, state: SYMBOL_STATE.NORMAL},
            ]
        },
    ];
}

export const model = MahjongWaysModel.getInstance();