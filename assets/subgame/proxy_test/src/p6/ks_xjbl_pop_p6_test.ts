import { _decorator, Component, Node, Label } from 'cc';
import { Database } from '../Database_test';
import { commonVal } from '../proxy-http_test';
import * as cc from 'cc';
import { KsxjfhsdPopP6Test } from './ksxjfhsd_pop_p6_test';
const { ccclass, property } = _decorator;

@ccclass('KsXjblPopP6Test')
export class KsXjblPopP6Test extends Component {
    @property(Node)
    public mid: cc.Node | null = null;
    @property(Label)
    public Input: cc.Label | null = null;
    @property(Node)
    public edbox1: cc.Node | null = null;
    @property(Node)
    public frame: cc.Node | null = null;
    @property(Node)
    public content: cc.Node | null = null;
    @property(Node)
    public sbuicnmtit: cc.Node | null = null;
    @property(Node)
    public sbuicnmcon: cc.Node | null = null;
    @property(Node)
    public sbui: cc.Node | null = null;
    @property(Node)
    public scr: cc.Node | null = null;
    @property
    public date = 'null';

    onLoad () {
    }

    add0(m) { return m < 10 ? '0' + m : m }

    format (shijianchuo: any) {
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        return y + '-' + this.add0(m) + '-' + this.add0(d)
    }

    setItemData () {
        this.Input.string = '';
        this.edbox1.getComponent(cc.EditBox).string = ''
        let data = Database.xjdlmx
        cc.log('setItemData==============', data);
        this.content.removeAllChildren();
        if (data != [] && data != null && data.length != 0) {
           this.sbui.active = false;
           this.sbuicnmtit.active = true;
           this.sbuicnmcon.active = true;
           for (let index = 0; index < data.length; index++) {
               let newdates = this.format(parseInt(data[index].login_time) * 1000)
               let newItem = cc.instantiate(this.frame);
               newItem.active = true;
               cc.find("cell2", newItem).getComponent(cc.Label).string = newdates //日期
               cc.find("cell1", newItem).getComponent(cc.Label).string = data[index].id;//下级ID
               let btn = newItem.getChildByName("cell3")
               btn.on("touchend", () => {
                   let xjfhsd_pop = this.node.parent.getChildByName('xjfhblsd_pop')
                   xjfhsd_pop.getComponent(KsxjfhsdPopP6Test).getDividendRule(data[index].id)
               })
               this.content.addChild(newItem);
           }
        } else {
           this.sbuicnmtit.active = false;
           this.sbuicnmcon.active = false;
           this.sbui.active = true;
        }
        this.node.active = true;
    }
    searchsetdata (obj: any) {
        cc.log("searchsetdata####", obj);
        this.content.removeAllChildren();
        if (obj != [] && obj != null) {
           for (let index = 0; index < obj.length; index++) {
               let item = cc.instantiate(this.frame);
               item.active = true;
               let newdates = this.format(parseInt(obj[index].login_time) * 1000)
               cc.find("cell2", item).getComponent(cc.Label).string = newdates;
               cc.find("cell1", item).getComponent(cc.Label).string = obj[index].id;
               let btn = item.getChildByName("cell3")
               btn.on("touchend", () => {
                   let xjfhsd_pop = this.node.parent.getChildByName('xjfhblsd_pop')
                   xjfhsd_pop.getComponent(KsxjfhsdPopP6Test).getDividendRule(obj[index].id)
               })
               this.content.addChild(item);
           }
        }
        this.node.active = true;
    }


    close () {
        Database.clickSound(Database.hall_sound)
        this.scr.getComponent(cc.ScrollView).stopAutoScroll();
        this.scr.getComponent(cc.ScrollView).scrollToTop();
        this.Input.string = '';
        this.edbox1.getComponent(cc.EditBox).string = '';
        this.content.removeAllChildren();
        this.mid.active = false;
        this.sbuicnmtit.active = true;
        this.sbuicnmcon.active = true;
        this.node.active = false;
        this.sbui.active = false;
    }
    search () {
        Database.clickSound(Database.hall_sound)
        let scearchdata = this.Input.string;
        this.content.removeAllChildren();
        if (!scearchdata) {
           function check() {
               return new Promise((resolve, reject) => {
                   cc.log('请求第一页数据');
                   commonVal.getchild(hqq.gameGlobal.player.account_name, resolve)
               })
           }
           check().then(
               (value) => {
                   cc.log('获取新的下级id信息成功',);
                   this.setItemData();
               }
           )
        } else {
           function check() {
               return new Promise((resolve, reject) => {
                   cc.log('请求第一页数据');
                   commonVal.getchilder(scearchdata, resolve)
               })
           }
           check().then(
               (value) => {
                   cc.log('获取新的下级id信息成功',);
                   this.setItemData();
               }
           )
        }
    }

    start () {
    }

    agentDetails (event: any) {
        if (event.getScrollOffset().y > (1200 * Database.page) - 260) {
           cc.log('大于', (1200 * Database.page) - 260);
           Database.page++;
           function check() {
               return new Promise((resolve, reject) => {
                   cc.log('请求第一页数据');
                   let host = hqq.gameGlobal.proxy.proxy_host;
                   let account_name = commonVal.account_name;
                   let token = commonVal.token;
                   let urlsss = host + `/Proxy/User/getChildren?id=${account_name}&account_name=${account_name}&&page=${Database.page}&limit=30&token=${token}`;
                   cc.log('得到下级2', urlsss);
                   var xhr = new XMLHttpRequest(); //readyState===0
                   xhr.onreadystatechange = () => {
                       if (xhr.readyState == 4 && xhr.status === 200) {
                           const res = JSON.parse(xhr.responseText);
                           if (res.code === 200) {
                               cc.log("getchild 2返回内容", res.msg);
                               if (res.msg != null) {
                                   resolve(res.msg)
                               }
                           } else {
                               Database.page--;
                           }
                       }
                   };
                   xhr.open("GET", urlsss, true); //readyState===1
                   xhr.send(); //readyState===2
               })
           }
           check().then(
               (value:any) => {
                   cc.log('获取新的下级id信息成功', value);
                   if (value.length != 0) {
                       let data = value;
                       for (let index = 0; index < data.length; index++) {
                           let newdates = this.format(parseInt(data[index].login_time) * 1000)
                           let newItem = cc.instantiate(this.frame);
                           newItem.active = true;
                           cc.find("cell2", newItem).getComponent(cc.Label).string = newdates //日期
                           cc.find("cell1", newItem).getComponent(cc.Label).string = data[index].id;//下级ID
                           let btn = newItem.getChildByName("cell3")
                           btn.on("touchend", () => {
                               let xjfhsd_pop = this.node.parent.getChildByName('xjfhblsd_pop')
                               xjfhsd_pop.getComponent(KsxjfhsdPopP6Test).getDividendRule(data[index].id)
                           })
                           this.content.addChild(newItem);
                       }
                   }
               }
           )
        }
    }


}

/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// var Database = require("../Database_test");
// let commonVal = require("../proxy-http_test");
// let gHandler = require("gHandler");
// cc.Class({
//     extends: cc.Component,
// 
//     properties: {
//         mid: {
//             default: null,
//             type: cc.Node,
//         },
//         Input: {
//             default: null,
//             type: cc.Label,
//         },
//         edbox1: {
//             default: null,
//             type: cc.Node,
//         },
//         frame: {
//             default: null,
//             type: cc.Node,
//         },
//         content: {
//             default: null,
//             type: cc.Node,
//         },
//         sbuicnmtit: {
//             default: null,
//             type: cc.Node,
//         },
//         sbuicnmcon: {
//             default: null,
//             type: cc.Node,
//         },
//         sbui: {
//             default: null,
//             type: cc.Node,
//         },
//         scr: {
//             default: null,
//             type: cc.Node,
//         },
//         date: null,
// 
//     },
// 
//     // LIFE-CYCLE CALLBACKS:
// 
//     onLoad() {
// 
//         // this.agentDetails(1);
// 
//     },
//     //获取时间戳函数
//     add0(m) { return m < 10 ? '0' + m : m },
//     format(shijianchuo) {
//         //shijianchuo是整数，否则要parseInt转换
//         var time = new Date(shijianchuo);
//         var y = time.getFullYear();
//         var m = time.getMonth() + 1;
//         var d = time.getDate();
// 
//         return y + '-' + this.add0(m) + '-' + this.add0(d)
//     },
//     //设置条目数据
//     setItemData() {
//         this.Input.string = '';
//         this.edbox1.getComponent(cc.EditBox).string = ''
//         let data = Database.xjdlmx
//         cc.log('setItemData==============', data);
//         this.content.removeAllChildren();
//         if (data != [] && data != null && data.length != 0) {
//             this.sbui.active = false;
//             this.sbuicnmtit.active = true;
//             this.sbuicnmcon.active = true;
//             for (let index = 0; index < data.length; index++) {
// 
//                 let newdates = this.format(parseInt(data[index].login_time) * 1000)
//                 let newItem = cc.instantiate(this.frame);
//                 newItem.active = true;
//                 cc.find("cell2", newItem).getComponent(cc.Label).string = newdates //日期
//                 cc.find("cell1", newItem).getComponent(cc.Label).string = data[index].id;//下级ID
// 
//                 let btn = newItem.getChildByName("cell3")
//                 btn.on("touchend", () => {
//                     //比例设定界面
// 
//                     let xjfhsd_pop = this.node.parent.getChildByName('xjfhblsd_pop')
// 
//                     // 正常用这个
//                     xjfhsd_pop.getComponent("ksxjfhsd_pop_p6_test").getDividendRule(data[index].id)
// 
// 
//                 })
//                 this.content.addChild(newItem);
//             }
//         } else {
//             this.sbuicnmtit.active = false;
//             this.sbuicnmcon.active = false;
//             this.sbui.active = true;
//         }
// 
//         this.node.active = true;
// 
//     },
//     searchsetdata(obj) {
//         cc.log("searchsetdata####", obj);
//         this.content.removeAllChildren();
//         if (obj != [] && obj != null) {
//             for (let index = 0; index < obj.length; index++) {
//                 let item = cc.instantiate(this.frame);
//                 item.active = true;
//                 let newdates = this.format(parseInt(obj[index].login_time) * 1000)
// 
//                 //日期
//                 cc.find("cell2", item).getComponent(cc.Label).string = newdates;
//                 //id
//                 cc.find("cell1", item).getComponent(cc.Label).string = obj[index].id;
// 
//                 let btn = item.getChildByName("cell3")
//                 btn.on("touchend", () => {
//                     //比例设定界面
//                     //let xjfhmx_pop = this.node.getChildByName("xjfhmx_pop");
//                     let xjfhsd_pop = this.node.parent.getChildByName('xjfhblsd_pop')
// 
//                     // 正常用这个
//                     xjfhsd_pop.getComponent("ksxjfhsd_pop_p6_test").getDividendRule(obj[index].id)
// 
//                     //测试用
//                     // xjfhsd_pop.getComponent("xjfhsd_pop").setdata(data[index].id)
//                     // let allData = Database.getAllData()
// 
//                 })
//                 this.content.addChild(item);
// 
// 
// 
//             }
//         }
// 
//         this.node.active = true;
// 
//     },
//     close() {
//         //音效
//         Database.clickSound(Database.hall_sound)
//         this.scr.getComponent('cc.ScrollView').stopAutoScroll();
//         this.scr.getComponent('cc.ScrollView').scrollToTop();
//         this.Input.string = '';
//         this.edbox1.getComponent(cc.EditBox).string = '';
//         this.content.removeAllChildren();
//         this.mid.active = false;
//         this.sbuicnmtit.active = true;
//         this.sbuicnmcon.active = true;
//         this.node.active = false;
//         this.sbui.active = false;
//     },
//     search() {
//         //音效
//         Database.clickSound(Database.hall_sound)
//         //传来数据
//         let scearchdata = this.Input.string;
//         this.content.removeAllChildren();
//         // cc.log('scearchdata=======', scearchdata);
//         if (!scearchdata) {
//             // cc.log('悟空悟空');
//             function check() {
//                 return new Promise((resolve, reject) => {
//                     cc.log('请求第一页数据');
//                     //默认请求 第一页 棋牌
//                     commonVal.getchild(gHandler.gameGlobal.player.account_name, resolve)
//                 })
//             }
//             //得到前两列数据后请求后两列数据
//             check().then(
//                 (value) => {
//                     cc.log('获取新的下级id信息成功',);
//                     this.setItemData();
// 
//                 }
//             )
// 
//         } else {
//     
//             function check() {
//                 return new Promise((resolve, reject) => {
//                     cc.log('请求第一页数据');
//                     //默认请求 第一页 棋牌
// 
//                     commonVal.getchilder(scearchdata, resolve)
//                 })
//             }
//             //得到前两列数据后请求后两列数据
//             check().then(
//                 (value) => {
//                     cc.log('获取新的下级id信息成功',);
//                     this.setItemData();
// 
//                 }
//             )
// 
//             //  this.searchsetdata(arr)
// 
//         }
// 
// 
//     },
//     start() {
// 
//     },
// 
//     agentDetails(event) {
//         // let scrollOffsetHeight = scrollView.getScrollOffset().y;
//         // cc.log('滚动了', event.getScrollOffset().y);//940
//         if (event.getScrollOffset().y > (1200 * Database.page) - 260) {
// 
//             cc.log('大于', (1200 * Database.page) - 260);
//             Database.page++;
//             function check() {
//                 return new Promise((resolve, reject) => {
//                     cc.log('请求第一页数据');
//                     //默认请求 第一页 棋牌
//                     let host = gHandler.gameGlobal.proxy.proxy_host;
// 
//                     let account_name = commonVal.account_name;
// 
//                     let token = commonVal.token;
// 
// 
//                     let urlsss = host + `/Proxy/User/getChildren?id=${account_name}&account_name=${account_name}&&page=${Database.page}&limit=30&token=${token}`;
//                     cc.log('得到下级2', urlsss);
//                     var xhr = new XMLHttpRequest(); //readyState===0
//                     xhr.onreadystatechange = () => {
//                         if (xhr.readyState == 4 && xhr.status === 200) {
//                             const res = JSON.parse(xhr.responseText);
//                             if (res.code === 200) {
//                                 cc.log("getchild 2返回内容", res.msg);
//                                 // resolve(res.msg);
//                                 if (res.msg != null) {
//                                     resolve(res.msg)
//                                 }
//                             } else {
//                                 Database.page--;
//                             }
// 
//                         }
// 
//                     };
//                     xhr.open("GET", urlsss, true); //readyState===1
//                     xhr.send(); //readyState===2
// 
// 
//                 })
//             }
//             //得到前两列数据后请求后两列数据
//             check().then(
//                 (value) => {
//                     cc.log('获取新的下级id信息成功', value);
//                     if (value.length != 0) {
//                         let data = value;
//                         for (let index = 0; index < data.length; index++) {
// 
//                             let newdates = this.format(parseInt(data[index].login_time) * 1000)
//                             let newItem = cc.instantiate(this.frame);
//                             newItem.active = true;
//                             cc.find("cell2", newItem).getComponent(cc.Label).string = newdates //日期
//                             cc.find("cell1", newItem).getComponent(cc.Label).string = data[index].id;//下级ID
// 
//                             let btn = newItem.getChildByName("cell3")
//                             btn.on("touchend", () => {
//                                 //比例设定界面
// 
//                                 let xjfhsd_pop = this.node.parent.getChildByName('xjfhblsd_pop')
// 
//                                 // 正常用这个
//                                 xjfhsd_pop.getComponent("ksxjfhsd_pop_p6_test").getDividendRule(data[index].id)
// 
// 
//                             })
//                             this.content.addChild(newItem);
//                         }
//                     }
// 
// 
//                 }
//             )
// 
//         }
// 
// 
// 
//     },
//     // update (dt) {},
// });
