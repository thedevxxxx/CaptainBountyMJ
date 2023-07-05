import { _decorator, Component, Prefab } from 'cc';
import * as cc from 'cc';
import { commonVal } from './proxy-http_test';
import { Database } from './Database_test';
const { ccclass, property } = _decorator;

@ccclass('proxy_canvas_test')
export class proxy_canvas_test extends Component {
    @property(Prefab)
    public tianqi_viewPrefab: cc.Prefab | null = null;


    onLoad() {
        // console.log('gHandler.app.pinpai==', hqq.app.pinpai);
        commonVal.account_name = hqq.gameGlobal.player.account_name

        commonVal.package_id = hqq.gameGlobal.proxy.package_id

        //获取大厅音效开关状态 true开 false 关
        // if (gHandler.audioMgr) {
        //   Database.hall_sound = gHandler.audioMgr.getBgState();
        // }
        Database.hall_sound = true;//根据需求默认开启
        // "package_id": 1      特斯特游戏     100% 1
        // "package_id": 2      德比游戏        100% 1
        // "package_id": 3      杏吧娱乐    100%   1
        // "package_id": 6      渔鱼游戏      100%
        // "package_id": 8      新盛游戏     100%  1
        // "package_id": 9      新贵游戏      80%   0.8
        // "package_id": 10    富鑫II游戏     80%
        Database.base_dividend_discount = 0.8;
        let baseview = cc.instantiate(this.tianqi_viewPrefab)
        let curDR;

        var cvs = cc.find('Canvas').getComponent(cc.Canvas);
        //保存原始设计分辨率，供屏幕大小变化时使用
        if (!curDR) {
            curDR = cc.view.getDesignResolutionSize()
        }
        var dr = curDR;
        var s = cc.view.getFrameSize();
        var rw = s.width;
        var rh = s.height;

        if ((rw / rh) > (dr.width / dr.height)) {
            baseview.setScaleEx((rw / rh) / (dr.width / dr.height), 1, 1)
            baseview.getChildByName('leftSide').getChildByName('btn_box').setScaleEx(1, (rw / rh) / (dr.width / dr.height), 1);
            //!#zh: 是否优先将设计分辨率高度撑满视图高度。 */
            cc.view.setResolutionPolicy(cc.ResolutionPolicy.FIXED_HEIGHT)
            //如果更长，则用定高
        } else {
            /*!#zh: 是否优先将设计分辨率宽度撑满视图宽度。 */
            cc.view.setResolutionPolicy(cc.ResolutionPolicy.FIXED_WIDTH)
        }
        cc.find('Canvas').addChild(baseview)
        // let mas = cc.instantiate(this.massage)
        // cc.find('Canvas').addChild(mas)



    }

    onCopyClick(e: any, string: any) {
        //     //web平台复制到剪切板
        // var save = function(e) {
        //   e.clipboardData.setData("text/plain", "待复制本文");
        //   e.preventDefault();
        // }.bind(this);
        // document.addEventListener("copy", save);
        // document.execCommand("copy");
        // document.removeEventListener("copy", save);
        console.log('string===', string);

        //音效
        Database.clickSound(Database.hall_sound)

        if (hqq.reflect) {
            if (hqq.reflect.setClipboard(string)) {

                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "复制成功!")
            } else {

                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "复制失败!")

            }
        } else {

            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "操作失败!")

        }
        // gHandler.Reflect && gHandler.Reflect.setClipboard(string);
    }

    start() {
    }

    onExit() {
        //音效
        Database.clickSound(Database.hall_sound)
        Database.a_num = 0;
        hqq.eventMgr.dispatch(hqq.eventMgr.showJumpScene, "hall");
    }

}

/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// let gHandler = require('gHandler')
// let commonVal = require('./proxy-http_test')
// var Database = require("./Database_test");
//
//
// cc.Class({
//   extends: cc.Component,
//   properties: {
//     messagePrefab: {
//       type: cc.Prefab,
//       default: null
//     },
//
//     tianqi_viewPrefab:{
//       type: cc.Prefab,
//       default: null
//     },
//     massage: {
//       type: cc.Prefab,
//       default: null
//     }
//   },
//   onLoad() {
//     console.log('gHandler.app.pinpai==',gHandler.app.pinpai);
//     commonVal.account_name = gHandler.gameGlobal.player.account_name
//
//     commonVal.package_id = gHandler.gameGlobal.proxy.package_id
//
//     //获取大厅音效开关状态 true开 false 关
//     // if (gHandler.audioMgr) {
//     //   Database.hall_sound = gHandler.audioMgr.getBgState();
//     // }
//     Database.hall_sound = true;//根据需求默认开启
//     // "package_id": 1      特斯特游戏     100% 1
//     // "package_id": 2      德比游戏        100% 1
//     // "package_id": 3      杏吧娱乐    100%   1
//     // "package_id": 6      渔鱼游戏      100%
//     // "package_id": 8      新盛游戏     100%  1
//     // "package_id": 9      新贵游戏      80%   0.8
//     // "package_id": 10    富鑫II游戏     80%
//    if (gHandler.app.pinpai == 'chaofan') {
//       Database.base_dividend_discount = 0.8;
//       let baseview = cc.instantiate(this.tianqi_viewPrefab)
//       cc.find('Canvas').addChild(baseview)
//       let mas = cc.instantiate(this.massage)
//       cc.find('Canvas').addChild(mas)
//
//
//     } else {
//       Database.base_dividend_discount = 1;
//       let baseview = cc.instantiate(this.tianqi_viewPrefab)
//       cc.find('Canvas').addChild(baseview)
//       let mas = cc.instantiate(this.massage)
//       cc.find('Canvas').addChild(mas)
//     }
//   },
//   onMessagePrefabNeeded: function (e, string) {
//     cc.log('onMessagePrefabNeeded', e, string)
//     var message = cc.instantiate(this.messagePrefab)
//     //获取预制资源中的js组件，并作出相应操作
//     var messageScript = message.getComponent('proxy-messagePrefab_test')
//     //开始操作JS组件脚本
//     messageScript.setMessage(string) //开始为JS组件进行初始化操作,action 为自定义初始化方法
//     //将预制资源添加到父节点
//     cc.find('Canvas/message').addChild(message)
//   },
//   onCopyClick: function (e, string) {
//     //web平台复制到剪切板
//     // var save = function(e) {
//     //   e.clipboardData.setData("text/plain", "待复制本文");
//     //   e.preventDefault();
//     // }.bind(this);
//     // document.addEventListener("copy", save);
//     // document.execCommand("copy");
//     // document.removeEventListener("copy", save);
//
//     //音效
//     Database.clickSound(Database.hall_sound)
//
//     if (gHandler.reflect) {
//       if (gHandler.reflect.setClipboard(string)) {
//         // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制id成功");
//         // this.onMessagePrefabNeeded(null, '复制成功')
//         gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制成功!")
//       } else {
//         // gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制id失败");
//         // this.onMessagePrefabNeeded(null, '复制失败')
//         gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "复制失败!")
//
//       }
//     } else {
//       // this.onMessagePrefabNeeded(null, '操作失败')
//       gHandler.eventMgr.dispatch(gHandler.eventMgr.showTip, "操作失败!")
//
//     }
//     // gHandler.Reflect && gHandler.Reflect.setClipboard(string);
//   },
//   start() { },
//   onExit() {
//     //音效
//     Database.clickSound(Database.hall_sound)
//     Database.a_num = 0;
//     gHandler.eventMgr.dispatch(hqq.eventMgr.showJumpScene,"hall");
//   }
//
//   // update (dt) {},
// })
