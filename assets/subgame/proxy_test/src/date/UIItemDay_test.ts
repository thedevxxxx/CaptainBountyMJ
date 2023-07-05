import { _decorator, Component, Label, Sprite } from 'cc';
import * as cc from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIItemDayTest')
export class UIItemDayTest extends Component {
    @property(Label)
    public lbDay: cc.Label | null = null;
    @property(Sprite)
    public spSel:  cc.Sprite | null = null;
    cb;
    index;day;

    setDay (index: any, day: any, sel: any, cb: any) {
        this.index = index;
        this.day = day;
        this.cb = cb;
        this.lbDay.string = day;
        this.spSel.enabled = sel;
    }

    onClickItem () {
        if (this.cb) {
           this.cb(this.index, this.day);
        }
    }

}

/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// cc.Class({
//     extends: cc.Component,
// 
//     properties: {
//         lbDay: cc.Label,
//         spSel: cc.Sprite,
//     },
// 
//     setDay(index, day, sel, cb) {
//         this.index = index;
//         this.day = day;
//         this.cb = cb;
// 
//         this.lbDay.string = day;
//         this.spSel.enabled = sel;
//     },
// 
//     onClickItem() {
//         if (this.cb) {
//             this.cb(this.index, this.day);
//         }
//     },
// });
