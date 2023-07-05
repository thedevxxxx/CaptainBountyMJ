import { _decorator, Component, ScrollView, Node } from 'cc';
import * as cc from 'cc';
import { Database } from '../Database_test';
const { ccclass, property } = _decorator;

@ccclass('P16FyblTest')
export class P16FyblTest extends Component {
    @property(ScrollView)
    public sv: cc.ScrollView | null = null;
    @property(Node)
    public mid:cc.Node | null = null;

    onLoad () {
    }

    close () {
        Database.clickSound(Database.hall_sound)
        this.sv.scrollToTop();
        this.mid.active = false;
        this.node.active = false;
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
//         sv: {
//             default: null,
//             type: cc.ScrollView,
//         },
//         mid: {
//             default: null,
//             type: cc.Node,
//         },
//        
//     },
// 
// 
// 
//     onLoad() {
// 
//     },
// 
// 
//     close() {
//         //音效
//         Database.clickSound(Database.hall_sound)
//         this.sv.scrollToTop();
//         this.mid.active = false;
//         this.node.active = false;
// 
//     },
// 
//     start() {
// 
//     },
// 
//     // update (dt) {},
// });
