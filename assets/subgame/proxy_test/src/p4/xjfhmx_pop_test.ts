import { _decorator, Component, Node } from 'cc';
import { Database } from '../Database_test';
import * as cc from 'cc';
const { ccclass, property } = _decorator;

@ccclass('XjfhmxPopTest')
export class XjfhmxPopTest extends Component {
    @property(Node)
    public frame:cc.Node | null = null;
    @property(Node)
    public content:cc.Node | null = null;
    @property(Node)
    public mid:cc.Node | null = null;
    date = 'null';

    onLoad () {
    }

    setdata (date: any, obj: any) {
        cc.log("####", obj);
        this.date = date
        this.content.removeAllChildren();
        if (obj != null) {
           for (let index = 1; index < obj.length; index++) {
               let item = cc.instantiate(this.frame);
               item.active = true;
               let game;
               switch (obj[index].game_tag) {
                   case 1:
                       game = '棋牌'
                       break;
                   case 2:
                       game = '彩票'
                       break;
                   case 3:
                       game = '体育'
                       break;
                   case 4:
                       game = '视讯'
                       break;
                   default:
                       break;
               }
               cc.find("label1", item).getComponent(cc.Label).string = obj[index].date;
               cc.find("label2", item).getComponent(cc.Label).string = obj[index].id;
               cc.find("label3", item).getComponent(cc.Label).string = game;
               cc.find("label4", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(obj[index].statement);
               let dwb = obj[index].percent * 0.05 * 0.5 * 100
               cc.find("label5", item).getComponent(cc.Label).string = dwb + "";
               cc.find("label6", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(obj[index].money);
               this.content.addChild(item);
           }
        }
        this.node.active = true;
    }

    searchsetdata (obj: any) {
        cc.log("searchsetdata####", obj);
        this.content.removeAllChildren();
        if (obj != null) {
           for (let index = 0; index < obj.length; index++) {
               let item = cc.instantiate(this.frame);
               item.active = true;
               let game;
               switch (obj[index].game_tag) {
                   case 1:
                       game = '棋牌'
                       break;
                   case 2:
                       game = '彩票'
                       break;
                   case 3:
                       game = '体育'
                       break;
                   case 4:
                       game = '视讯'
                       break;
                   default:
                       break;
               }
               cc.find("label1", item).getComponent(cc.Label).string = obj[index].date;;
               cc.find("label2", item).getComponent(cc.Label).string = obj[index].id;
               cc.find("label3", item).getComponent(cc.Label).string = game;
               cc.find("label4", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(obj[index].amount));
               cc.find("label5", item).getComponent(cc.Label).string = obj[index].percent + "%";
               cc.find("label6", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(obj[index].money));
               this.content.addChild(item);
           }
        }
        this.node.active = true;
    }

    close () {
        Database.clickSound(Database.hall_sound)
        this.content.removeAllChildren();
        this.mid.active = false;
        this.node.active = false;
    }
    search () {
        // Database.clickSound(Database.hall_sound)
        //let scearchdata = this.Input.string;
        //cc.log('scearchdata', scearchdata, this.date);
        //let arr = Database.searchByIdAndDate(this.date, scearchdata);
        //this.searchsetdata(arr)
    }

    start () {
    }

}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var Database = require("../Database_test");
// cc.Class({
//     extends: cc.Component,
// 
//     properties: {
//         // Input :{
//         //     default: null,
//         //     type: cc.Label,
//         // },
//         // date: {
//         //     default: null,
//         //     type: cc.Label,
//         // },
//         // ID: {
//         //     default: null,
//         //     type: cc.Label,
//         // },
//         // money: {
//         //     default: null,
//         //     type: cc.Label,
//         // },
//         frame: {
//             default: null,
//             type: cc.Node,
//         },
//         content: {
//             default: null,
//             type: cc.Node,
//         },
//         mid: {
//             default: null,
//             type: cc.Node,
//         },
//         date: null,
//     },
// 
//     // LIFE-CYCLE CALLBACKS:
// 
//     onLoad() {
// 
//     },
// 
//     setdata(date, obj) {
//         cc.log("####", obj);
//         this.date = date
//         this.content.removeAllChildren();
//         if (obj != null) {
//             for (let index = 1; index < obj.length; index++) {
//                 let item = cc.instantiate(this.frame);
//                 item.active = true;
// 
//                 let game;
//                 switch (obj[index].game_tag) {
//                     case 1:
//                         game = '棋牌'
//                         break;
//                     case 2:
//                         game = '彩票'
//                         break;
//                     case 3:
//                         game = '体育'
//                         break;
//                     case 4:
//                         game = '视讯'
//                         break;
// 
//                     default:
//                         break;
//                 }
//                 //日期
//                 cc.find("label1", item).getComponent(cc.Label).string = obj[index].date;
//                 //id
//                 cc.find("label2", item).getComponent(cc.Label).string = obj[index].id;
//                 //游戏
//                 cc.find("label3", item).getComponent(cc.Label).string = game;
//                 //代理链总流水
//                 cc.find("label4", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(obj[index].statement);
//                 //我的挡位比
//                 let dwb = obj[index].percent * 0.05 * 0.5 * 100
//                 cc.find("label5", item).getComponent(cc.Label).string = dwb + "";
//                 //代理链分红
//                 cc.find("label6", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(obj[index].money);
//                 this.content.addChild(item);
// 
// 
//             }
//         }
// 
//         this.node.active = true;
// 
//     },
//     searchsetdata(obj) {
//         cc.log("searchsetdata####", obj);
//         this.content.removeAllChildren();
//         if (obj != null) {
//             for (let index = 0; index < obj.length; index++) {
//                 let item = cc.instantiate(this.frame);
//                 item.active = true;
//                 let game;
//                 switch (obj[index].game_tag) {
//                     case 1:
//                         game = '棋牌'
//                         break;
//                     case 2:
//                         game = '彩票'
//                         break;
//                     case 3:
//                         game = '体育'
//                         break;
//                     case 4:
//                         game = '视讯'
//                         break;
// 
//                     default:
//                         break;
//                 }
//                 //日期
//                 cc.find("label1", item).getComponent(cc.Label).string = obj[index].date;;
//                 //id
//                 cc.find("label2", item).getComponent(cc.Label).string = obj[index].id;
//                 //游戏
//                 cc.find("label3", item).getComponent(cc.Label).string = game;
//                 //代理链总流水
//                 cc.find("label4", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(obj[index].amount));
//                 //我的挡位比
//                 cc.find("label5", item).getComponent(cc.Label).string = obj[index].percent + "%";
//                 //代理链分红
//                 cc.find("label6", item).getComponent(cc.Label).string = Database.countCoinsShowLabel(parseFloat(obj[index].money));
//                 this.content.addChild(item);
// 
// 
//             }
//         }
// 
//         this.node.active = true;
// 
//     },
//     close() {
//          //音效
//          Database.clickSound(Database.hall_sound)
//         this.content.removeAllChildren();
//         this.mid.active = false;
//         this.node.active = false;
// 
//     },
//     search() {
//          //音效
//          Database.clickSound(Database.hall_sound)
//         //传来数据
//         let scearchdata = this.Input.string;
//         cc.log('scearchdata', scearchdata, this.date);
//         let arr = Database.searchByIdAndDate(this.date, scearchdata);
//         this.searchsetdata(arr)
// 
//     },
//     start() {
// 
//     },
// 
//     // update (dt) {},
// });
