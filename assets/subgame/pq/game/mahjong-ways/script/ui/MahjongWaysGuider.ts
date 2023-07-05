
import { _decorator, Component, Node, Sprite, Label } from 'cc';
import { PQAsset } from '../../../../script/asset/PQAssetRepository';
import { CommonSymbolInfo } from '../../../../script/subgame/info/CommonSymbolInfo';
import { CommonGuider } from '../../../../script/subgame/ui/common/CommonGuider';
import { mahjongWaysConfig } from '../config/MahjongWaysConfig';
import { SYMBOL_TYPE } from '../game/MahjongWaysSymbol';
const { ccclass, property } = _decorator;
 
@ccclass('MahjongWaysGuider')
export class MahjongWaysGuider extends CommonGuider {

    @property(Node)
    desc:Node = null;      //描述

    @property(Node)
    rates:Node = null;      //赔率

    start () {
        super.start();
    }

    public updateSymbolInfo(symbolInfo:CommonSymbolInfo) {
        this.getAsset(symbolInfo);
        this.getDesc(symbolInfo);
    }

    protected async getAsset(symbolInfo:CommonSymbolInfo) {
        this.symbolSp.getComponent(Sprite).spriteFrame = await PQAsset.loadSpriteFrame(`${mahjongWaysConfig.symbolFame[symbolInfo.type]["NORMAL"]}/spriteFrame`);
        switch (symbolInfo.type) {
            case SYMBOL_TYPE.BAIDA://百搭
                //没背景
                this.symbolBg.active = false;
                break;
            case SYMBOL_TYPE.HU://胡
                this.symbolBg.active = false;
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
                this.symbolBg.getComponent(Sprite).spriteFrame = await PQAsset.loadSpriteFrame(`${mahjongWaysConfig.bgFame[0]["NORMAL"]}/spriteFrame`);
                this.symbolBg.active = true;
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
                this.symbolBg.getComponent(Sprite).spriteFrame = await PQAsset.loadSpriteFrame(`${mahjongWaysConfig.bgFame[1]["NORMAL"]}/spriteFrame`);
                this.symbolBg.active = true;
                break;
        }
    }


    private getDesc(symbolInfo:CommonSymbolInfo) {
        let data = mahjongWaysConfig.symbolRates[symbolInfo.type];
        if (Array.isArray(data)) {
            this.rates.active = true;
            this.desc.active = false;
            for (let i in this.rates.children) {
                let label = this.rates.children[Number(i)];
                label.getComponent(Label).string = data[Number(i)];
            }
        } else {
            this.rates.active = false;
            this.desc.active = true;
            this.desc.getComponent(Label).string = data;
        }
    }
}