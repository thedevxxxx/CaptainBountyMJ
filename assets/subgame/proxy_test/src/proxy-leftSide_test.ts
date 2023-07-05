import { _decorator, Component, Node } from 'cc';
import * as cc from 'cc';

import { Database } from './Database_test';
import { ProxyPage1Test } from './proxy-page1_test';
import { ProxyPage6Test } from './proxy_page6_test';
import { ProxyPage4Test } from './proxy_page4_test';
import { ProxyPage16Test } from './proxy_page16_test';
import { ProxyPage17Test } from './proxy_page17_test';
const { ccclass, property } = _decorator;

@ccclass('ProxyLeftSideTest')
export class ProxyLeftSideTest extends Component {
  @property(Node)
  public btn_box: cc.Node | null = null;

  onLeftSideSwich(e: any, num: any) {
    cc.log(num, `btn${num}_active`);
    let btn_box = this.btn_box;
    //关闭所有按钮选项
    btn_box.getChildByName("btn1").getChildByName("btn1_active").active = false;
    btn_box.getChildByName("btn2").getChildByName("btn2_active").active = false;
    btn_box.getChildByName("btn3").getChildByName("btn3_active").active = false;
    btn_box.getChildByName("btn4").getChildByName("btn4_active").active = false;
    btn_box.getChildByName("btn5").getChildByName("btn5_active").active = false;
    btn_box.getChildByName("btn6").getChildByName("btn6_active").active = false;
cc.log('11111')


    btn_box.getChildByName("btn16").getChildByName("btn16_active").active = false;
    btn_box.getChildByName("btn17").getChildByName("btn17_active").active = false;
    btn_box.getChildByName("btn18").getChildByName("btn18_active").active = false;
    btn_box.getChildByName("btn19").getChildByName("btn19_active").active = false;
    btn_box.getChildByName("btn20").getChildByName("btn20_active").active = false;
 

    //打开选中按钮
    btn_box.getChildByName(`btn${num}`).getChildByName(`btn${num}_active`).active = true;
    cc.find("Canvas/baseView/home/page2/detailTable").removeAllChildren();
    cc.find("Canvas/baseView/home/page2/basePage").active = true;
    cc.find("Canvas/baseView/home/page1").getComponent(ProxyPage1Test).count = 0;
    //关闭打开所有页面
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page1`).active = false;
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page2`).active = false;
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page3`).active = false;
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page4`).active = false;
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page5`).active = false;
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page6`).active = false;

      cc.log('333333')
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page16`).active = false;
     
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page17`).active = false;
    
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page18`).active = false;
      
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page19`).active = false;

    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page20`).active = false;
 
    if (Database.loadview != null) {
      Database.loadview.active = false;
    }
    console.log('9');
    //打开所选页面
    this.node
      .getParent()
      .getChildByName("home")
      .getChildByName(`page${num}`).active = true
    Database.clickSound(Database.hall_sound)

    if (num == 6) {
      this.node.getParent().getChildByName("home").getChildByName(`page${num}`).getComponent(ProxyPage6Test).checkMyAgent(1, 1)

    }
    if (num == 4) {
      this.node.getParent().getChildByName("home").getChildByName(`page${num}`).getComponent(ProxyPage4Test).checkMyAgent(1, 1)

    }
    if (num == 16) {
      this.node.getParent().getChildByName("home").getChildByName(`page${num}`).getComponent(ProxyPage16Test).checkMyAgent(1, 1)

    }
    if (num == 17) {
      this.node.getParent().getChildByName("home").getChildByName(`page${num}`).getComponent(ProxyPage17Test).checkMyAgent(1, 1)

    }
    if (num == 18) {
      this.node.getParent().getChildByName("home").getChildByName(`page${num}`).getComponent(ProxyPage17Test).checkMyAgent(2, 2)

    }
    if (num == 19) {
      this.node.getParent().getChildByName("home").getChildByName(`page${num}`).getComponent(ProxyPage17Test).checkMyAgent(3, 3)

    }
    if (num == 20) {
      this.node.getParent().getChildByName("home").getChildByName(`page${num}`).getComponent(ProxyPage17Test).checkMyAgent(4, 4)

    }
    console.log('11');
  }

  start() {
  }

}



/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// let gHandler = require("gHandler");
// const Database = require('./Database_test');
// cc.Class({
//   extends: cc.Component,
//
//   properties: {
//     btn_box: {
//       type: cc.Node,
//       default: null,
//     },
//   },
//   onLeftSideSwich: function (e, num) {
//     cc.log(num, `btn${num}_active`);
//     let btn_box = this.btn_box;
//     //关闭所有按钮选项
//     btn_box.getChildByName("btn1").getChildByName("btn1_active").active = false;
//     btn_box.getChildByName("btn2").getChildByName("btn2_active").active = false;
//     btn_box.getChildByName("btn3").getChildByName("btn3_active").active = false;
//     btn_box.getChildByName("btn4").getChildByName("btn4_active").active = false;
//     btn_box.getChildByName("btn5").getChildByName("btn5_active").active = false;
//     btn_box.getChildByName("btn6").getChildByName("btn6_active").active = false;
//     if (hqq.app.pinpai == 'fuxin' || hqq.app.pinpai == 'xingui' || hqq.app.pinpai == 'yuyu' || hqq.app.pinpai == 'xinhao' || hqq.app.pinpai == 'xinlong' || hqq.app.pinpai == 'nineone' || hqq.app.pinpai == 'huangshi' || hqq.app.pinpai == 'juding' || hqq.app.pinpai == 'huaxing' || hqq.app.pinpai == 'ninetwo') {
//       btn_box.getChildByName("btn7").getChildByName("btn7_active").active = false;
//       btn_box.getChildByName("btn8").getChildByName("btn8_active").active = false;
//       btn_box.getChildByName("btn9").getChildByName("btn9_active").active = false;
//       btn_box.getChildByName("btn10").getChildByName("btn10_active").active = false;
//       if (hqq.app.pinpai == 'juding') {
//         btn_box.getChildByName("btn12").getChildByName("btn12_active").active = false;
//       }
//       if (hqq.app.pinpai == 'huaxing') {
//         btn_box.getChildByName("btn13").getChildByName("btn13_active").active = false;
//
//       }
//       if (hqq.app.pinpai == 'ninetwo') {
//         btn_box.getChildByName("btn14").getChildByName("btn14_active").active = false;
//         btn_box.getChildByName("btn15").getChildByName("btn15_active").active = false;
//
//       }
//
//
//     }
//     if (hqq.app.pinpai == 'test' || hqq.app.pinpai == 'tianqi' ) {
//       btn_box.getChildByName("btn16").getChildByName("btn16_active").active = false;
//       btn_box.getChildByName("btn17").getChildByName("btn17_active").active = false;
//
//     }
//     if (hqq.app.pinpai == 'xingui' || hqq.app.pinpai == 'xinhao' || hqq.app.pinpai == 'xinlong' || hqq.app.pinpai == 'nineone' || hqq.app.pinpai == 'huangshi' ) {
//       btn_box.getChildByName("btn11").getChildByName("btn11_active").active = false;
//     }
//     //打开选中按钮
//     btn_box.getChildByName(`btn${num}`).getChildByName(`btn${num}_active`).active = true;
//     cc.find("Canvas/baseView/home/page2/detailTable").removeAllChildren();
//     cc.find("Canvas/baseView/home/page2/basePage").active = true;
//     cc.find("Canvas/baseView/home/page1").getComponent("proxy-page1_test").count = 0;
//     //关闭打开所有页面
//     this.node
//       .getParent()
//       .getChildByName("home")
//       .getChildByName(`page1`).active = false;
//     this.node
//       .getParent()
//       .getChildByName("home")
//       .getChildByName(`page2`).active = false;
//     this.node
//       .getParent()
//       .getChildByName("home")
//       .getChildByName(`page3`).active = false;
//     this.node
//       .getParent()
//       .getChildByName("home")
//       .getChildByName(`page4`).active = false;
//     this.node
//       .getParent()
//       .getChildByName("home")
//       .getChildByName(`page5`).active = false;
//     this.node
//       .getParent()
//       .getChildByName("home")
//       .getChildByName(`page6`).active = false;
//     if (hqq.app.pinpai == 'xingui' || hqq.app.pinpai == 'xinhao' || hqq.app.pinpai == 'xinlong' || hqq.app.pinpai == 'nineone' || hqq.app.pinpai == 'huangshi' ) {
//       this.node
//         .getParent()
//         .getChildByName("home")
//         .getChildByName(`page11`).active = false;
//     }
//
//
//     if (hqq.app.pinpai == 'fuxin' || hqq.app.pinpai == 'xingui' || hqq.app.pinpai == 'yuyu' || hqq.app.pinpai == 'xinhao' || hqq.app.pinpai == 'xinlong' || hqq.app.pinpai == 'nineone' || hqq.app.pinpai == 'huangshi' || hqq.app.pinpai == 'juding' || hqq.app.pinpai == 'huaxing'|| hqq.app.pinpai == 'ninetwo' ) {
//       this.node
//         .getParent()
//         .getChildByName("home")
//         .getChildByName(`page7`).active = false;
//       this.node
//         .getParent()
//         .getChildByName("home")
//         .getChildByName(`page8`).active = false;
//       this.node
//         .getParent()
//         .getChildByName("home")
//         .getChildByName(`page9`).active = false;
//       this.node
//         .getParent()
//         .getChildByName("home")
//         .getChildByName(`page10`).active = false;
//     }
//     if (hqq.app.pinpai == 'juding' || hqq.app.pinpai == 'ninetwo') {
//       this.node
//         .getParent()
//         .getChildByName("home")
//         .getChildByName(`page12`).active = false;
//     }
//     if (hqq.app.pinpai == 'huaxing') {
//       this.node
//         .getParent()
//         .getChildByName("home")
//         .getChildByName(`page13`).active = false;
//         if (Database.loadview != null) {
//           Database.loadview.active = false;
//         }
//     }
//     if (hqq.app.pinpai == 'ninetwo') {
//       this.node
//         .getParent()
//         .getChildByName("home")
//         .getChildByName(`page14`).active = false;
//         if (Database.loadview != null) {
//           Database.loadview.active = false;
//         }
//         this.node
//         .getParent()
//         .getChildByName("home")
//         .getChildByName(`page15`).active = false;
//         if (Database.loadview != null) {
//           Database.loadview.active = false;
//         }
//     }
//     if (hqq.app.pinpai == 'test' || hqq.app.pinpai == 'tianqi') {
//       this.node
//         .getParent()
//         .getChildByName("home")
//         .getChildByName(`page16`).active = false;
//         if (Database.loadview != null) {
//           Database.loadview.active = false;
//         }
//         this.node
//         .getParent()
//         .getChildByName("home")
//         .getChildByName(`page17`).active = false;
//         if (Database.loadview != null) {
//           Database.loadview.active = false;
//         }
//     }
//     //打开所选页面
//     this.node
//       .getParent()
//       .getChildByName("home")
//       .getChildByName(`page${num}`).active = true
//     Database.clickSound(Database.hall_sound)
//     if (num == 4 || num == 5 || num == 6 || num == 8 || num == 9 || num == 10 || num == 12 || num == 14 || num == 15|| num == 16|| num == 17) {
//       this.node.getParent().getChildByName("home").getChildByName(`page${num}`).getComponent(`proxy_page${num}_test`).checkMyAgent(1, 1)
//     }
//   },
//   // onLoad () {},
//
//   start() { }
//
//   // update (dt) {},
// });
