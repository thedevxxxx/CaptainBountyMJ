import { _decorator, Component, Label, Node, Prefab } from 'cc';
import * as cc from 'cc';

import { Database } from '../Database_test';
import { UIItemDayTest } from './UIItemDay_test';
const { ccclass, property } = _decorator;

@ccclass('UIDatePickerTest')
export class UIDatePickerTest extends Component {
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
        this.curtData.string = this.year + "/" + this.month + "/" + this.day
        Database.first_date = this.year + "-" + this.month + "-" + this.day;
        cc.log(Database.first_date);
        cc.log('updateDateyear', this.year, this.month, this.day);
        let date = new Date(this.year, this.month, 0);
        let totalDays = date.getDate();
        let yymmdd = this.year +','+ this.month+', 01'
        var myDate = new Date(yymmdd);
        let fromWeek = myDate.getDay();
        console.log('fromWeek=====',fromWeek,totalDays);
        for (let i = 0; i < this.pfgListDay.length; ++i) {
           let node = this.pfgListDay[i];
           if (i < totalDays) {
               node.active = true;
               let index = fromWeek + i;
               let row = Math.floor(index / 7);
               let col = (index % 7);
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
        console.log('onClickLeft');
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
        console.log('onClickRight');
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
