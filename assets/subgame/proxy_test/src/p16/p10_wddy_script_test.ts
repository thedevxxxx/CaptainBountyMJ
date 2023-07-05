import { _decorator, Component, Label } from 'cc';
import { Database } from '../Database_test';
import * as cc from 'cc';
import { commonVal } from '../proxy-http_test';
const { ccclass, property } = _decorator;

@ccclass('P10WddyScriptTest')
export class P10WddyScriptTest extends Component {
    @property(Label)
    public Dy_Amount: cc.Label | null = null;

    onLoad() {
    }

    openself_pop(num: any) {
        if (hqq.app.pinpai == 'juding' && this.node.active == true) {
            this.node.active = false;
        } else {
            Database.clickSound(Database.hall_sound)
            this.node.active = true;
            if (hqq.app.pinpai == 'juding' || hqq.app.pinpai == 'huaxing' || hqq.app.pinpai == 'test' || hqq.app.pinpai == 'tianqi') {
                if (num == 1) {
                    this.Dy_Amount.string = Database.p9_qp_aumont + ''
                }
                if (num == 2) {
                    this.Dy_Amount.string = Database.p9_cp_aumont + ''
                }
                if (num == 3) {
                    this.Dy_Amount.string = Database.p9_ty_aumont + ''
                }
                if (num == 4) {
                    this.Dy_Amount.string = Database.p9_sx_aumont + ''
                }
                if (num == 5) {
                    this.Dy_Amount.string = Database.p9_dz_aumont + ''
                }
            } else {
                function check() {
                    return new Promise((resolve, reject) => {
                        commonVal.GetBaseDividendRule(resolve)
                    })
                }
                check().then(
                    (value) => {
                        this.Dy_Amount.string = Database.page9_plaumont + ''
                        this.node.active = true;
                    })
            }
        }
    }

    close() {
        Database.clickSound(Database.hall_sound)
        this.node.active = false;
    }

    start() {
    }

}

/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var Database = require("../Database_test");
// var gHandler = require("gHandler");
// var commonVal = require("../proxy-http_test");
// cc.Class({
//     extends: cc.Component,
//
//     properties: {
//         Dy_Amount: {//我的待遇pop
//             default: null,
//             type: cc.Label,
//         },
//
//
//     },
//
//     onLoad() {
//
//     },
//
//     //打开自己规则pop
//     openself_pop(num) {
//         if (gHandler.app.pinpai == 'juding' && this.node.active == true) {
//             this.node.active = false;
//         } else {
//             //音效
//             Database.clickSound(Database.hall_sound)
//
//
//             this.node.active = true;
//             if (gHandler.app.pinpai == 'juding'  || gHandler.app.pinpai == 'huaxing' || gHandler.app.pinpai == 'test'|| gHandler.app.pinpai == 'tianqi') {
//                 if(num == 1){
//                     this.Dy_Amount.string = Database.p9_qp_aumont + ''
//                 }
//                 if(num ==5){
//                     this.Dy_Amount.string = Database.p9_dz_aumont + ''
//                 }
//
//
//             } else {
//                 function check() {
//                     return new Promise((resolve, reject) => {
//                         commonVal.GetBaseDividendRule(resolve)
//                     })
//
//
//                 }
//                 check().then(
//                     (value) => {
//                         this.Dy_Amount.string = Database.page9_plaumont + ''
//                         this.node.active = true;
//
//                     })
//             }
//
//         }
//
//
//
//     },
//
//
//
//
//
//     close() {
//         //音效
//         Database.clickSound(Database.hall_sound)
//         // this.content.removeAllChildren();
//         this.node.active = false;
//         // let xjfhsd_pop = this.node.parent.getChildByName('xjfhblsd_pop')
//         // xjfhsd_pop.active = true;
//
//     },
//
//
//     start() {
//     },
// });
