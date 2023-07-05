import { _decorator, Component } from 'cc';
import { Database } from './Database_test';
const { ccclass } = _decorator;

@ccclass('ExitTest')
export class ExitTest extends Component {

  start() {
  }


  onExit() {
    console.log('tuichu')
    Database.a_num = 0;
    hqq.eventMgr.dispatch(hqq.eventMgr.showJumpScene, "hall");

  }


  onfybl() {
    //         cc.log('返佣比例')
    //         let fybl = this.node.parent.getChildByName('n2_fybl')
    //         fybl.getComponent("n2_p1_fybl_test").onopen()
  }
  onlqyj() {
    //         cc.log('资金转入比例')
    //         let lqyj = this.node.parent.getChildByName('n2_lqyj')
    //         lqyj.getComponent("n2_p1_lqyj_test").onopen()
  }

}



/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var Database = require("./Database_test");
// let gHandler = require('gHandler');
// cc.Class({
//     extends: cc.Component,
//
//     properties: {
//         // foo: {
//         //     // ATTRIBUTES:
//         //     default: null,        // The default value will be used only when the component attaching
//         //                           // to a node for the first time
//         //     type: cc.SpriteFrame, // optional, default is typeof default
//         //     serializable: true,   // optional, default is true
//         // },
//         // bar: {
//         //     get () {
//         //         return this._bar;
//         //     },
//         //     set (value) {
//         //         this._bar = value;
//         //     }
//         // },
//     },
//
//     // LIFE-CYCLE CALLBACKS:
//
//     // onLoad () {},
//
//     start () {
//
//     },
//     onExit() {
//         cc.log('tuichu')
//         Database.a_num=0;
//         gHandler.eventMgr.dispatch(hqq.eventMgr.showJumpScene,"hall");
//       },
//       onfybl() {
//         cc.log('返佣比例')
//         let fybl = this.node.parent.getChildByName('n2_fybl')
//         fybl.getComponent("n2_p1_fybl_test").onopen()
//       } ,
//       onlqyj() {
//         cc.log('资金转入比例')
//         let lqyj = this.node.parent.getChildByName('n2_lqyj')
//         lqyj.getComponent("n2_p1_lqyj_test").onopen()
//       },
//     // update (dt) {},
// });
