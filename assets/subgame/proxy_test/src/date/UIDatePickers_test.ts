import { _decorator, Component, Label, Node, Prefab } from 'cc';
import * as cc from 'cc';
import { UIItemDayTest } from './UIItemDay_test';
const { ccclass, property } = _decorator;

@ccclass('UIDatePickersTest')
export class UIDatePickersTest extends Component {
    @property(Label)
    public lbYearMonth:cc.Label | null = null;
    @property(Node)
    public ndDays:cc.Node | null = null;
    @property(Prefab)
    public pfbDay: Prefab | null = null;
    @property(Label)
    public curtData: cc.Label | null = null;
    date;
    year;
    month;
    day;
    pfgListDay;
    cb;
   

    onLoad () {
        this.initData();
        this.updateDate();
    }

    initData () {
        cc.log('initData', this.year, 'month', this.month, 'day', this.day);
        this.date = this.date ? this.date : new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.day = this.date.getDate();
        this.pfgListDay = [];
        for (let i = 0; i < 31; ++i) {
           let node = cc.instantiate(this.pfbDay);
           node.parent = this.ndDays;
           this.pfgListDay.push(node);
        }
    }

    setDate (year: any, month: any, day: any) {
        cc.log('setDate', this.year, 'month', this.month, 'day', this.day);
        this.date = new Date(year, month, day);
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();
    }

    updateDate () {
        this.lbYearMonth.string = cc.js.formatStr("%s年%s月", this.year, this.month);
        this.curtData.string = this.year + "-" + this.month
        let date = new Date(this.year, this.month, 0);
        let totalDays = date.getDate();
        let yymmdd = this.year + ',' + this.month + ', 01'
        var myDate = new Date(yymmdd);
        let fromWeek = myDate.getDay();
        for (let i = 0; i < this.pfgListDay.length; ++i) {
           let node = this.pfgListDay[i];
           if (i < totalDays) {
               node.active = true;
               let index = fromWeek + i;
               let row = Math.floor(index / 7);
               let col = index % 7;
               let x = -(this.ndDays.getComponent(cc.UITransform).width - node.width) * 0.5 + col * node.width;
               let y = (this.ndDays.getComponent(cc.UITransform).height - node.height) * 0.5 - row * node.height;
               node.setPosition(x, y);
               let script = node.getComponent(UIItemDayTest);
               script.setDay(i, i + 1, this.day === i + 1, (selIndex, selDay) => {
                   this.day = selDay;
                   this.updateDate();
               });
           } else {
               node.active = false;
           }
        }
    }

    onClickLeft () {
        console.log('1s onClickLeft');
        if (this.month > 1) {
           this.month -= 1;
        } else {
           this.month = 12;
           this.year -= 1;
        }
        this.date.setFullYear(this.year);
        this.date.setMonth(this.month);
        this.updateDate();
    }

    onClickRight () {
        console.log('1s onClickRight');
        if (this.month < 12) {
           this.month += 1;
        } else {
           this.month = 1;
           this.year += 1;
        }
        this.date.setFullYear(this.year);
        this.date.setMonth(this.month);
        this.updateDate();
    }

    setPickDateCallback (cb: any) {
        this.cb = cb;
    }

    onClickClose () {
        if (this.cb) {
           this.cb(this.year, this.month, this.day);
        }
        this.node.parent = null;
    }

}

/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// /** 
//  * 日期组件
//  */
// cc.Class({
//     extends: cc.Component,
// 
//     properties: {
//         lbYearMonth: cc.Label,
//         ndDays: cc.Node,
//         pfbDay: cc.Prefab,
//         curtData: {
//             default: null,
//             type: cc.Label,
//         }
//     },
// 
//     onLoad() {
//         this.initData();
//         this.updateDate();
//     },
// 
//     initData() {
//         cc.log('initData', this.year, 'month', this.month, 'day', this.day);
//         this.date = this.date ? this.date : new Date();
//         this.year = this.date.getFullYear();
//         this.month = this.date.getMonth() + 1;
//         this.day = this.date.getDate();
// 
//         this.pfgListDay = [];
//         for (let i = 0; i < 31; ++i) {
//             let node = cc.instantiate(this.pfbDay);
//             node.parent = this.ndDays;
//             this.pfgListDay.push(node);
//         }
//     },
// 
//     // 设置显示的日志，默认为当前日期
//     setDate(year, month, day) {
//         cc.log('setDate', this.year, 'month', this.month, 'day', this.day);
//         this.date = new Date(year, month, day);
//         this.year = this.date.getFullYear();
//         this.month = this.date.getMonth();
//         this.day = this.date.getDate();
// 
// 
//     },
// 
//     updateDate() {
//         this.lbYearMonth.string = cc.js.formatStr("%s年%s月", this.year, this.month);
//         // first_date 开始时间(2020 - 05 - 18)
//         this.curtData.string = this.year + "-" + this.month
//         let date = new Date(this.year, this.month, 0);
//         let totalDays = date.getDate();
//         //当前年份月份 第一天周几
//         let yymmdd = this.year + ',' + this.month + ', 01'
//         var myDate = new Date(yymmdd);
//         let fromWeek = myDate.getDay();
// 
//         for (let i = 0; i < this.pfgListDay.length; ++i) {
//             let node = this.pfgListDay[i];
//             if (i < totalDays) {
//                 node.active = true;
//                 let index = fromWeek + i;
//                 let row = Math.floor(index / 7);
//                 let col = index % 7;
//                 let x = -(this.ndDays.width - node.width) * 0.5 + col * node.width;
//                 let y = (this.ndDays.height - node.height) * 0.5 - row * node.height;
//                 node.setPosition(x, y);
//                 let script = node.getComponent("UIItemDay_test");
//                 script.setDay(i, i + 1, this.day === i + 1, (selIndex, selDay) => {
//                     this.day = selDay;
//                     this.updateDate();
//                 });
//             } else {
//                 node.active = false;
//             }
//         }
//     },
// 
//     onClickLeft() {
//         console.log('1s onClickLeft');
//         if (this.month > 1) {
//             this.month -= 1;
//         } else {
//             this.month = 12;
//             this.year -= 1;
//         }
//         this.date.setFullYear(this.year);
//         this.date.setMonth(this.month);
//         this.updateDate();
// 
//     },
// 
//     onClickRight() {
//         console.log('1s onClickRight');
// 
//         if (this.month < 12) {
//             this.month += 1;
//         } else {
//             this.month = 1;
//             this.year += 1;
//         }
//         this.date.setFullYear(this.year);
//         this.date.setMonth(this.month);
//         this.updateDate();
//     },
// 
//     // 设置选中日期之后的回调
//     setPickDateCallback(cb) {
//         this.cb = cb;
// 
//     },
// 
//     onClickClose() {
//         if (this.cb) {
//             this.cb(this.year, this.month, this.day);
//         }
//         this.node.parent = null;
//     },
// });
