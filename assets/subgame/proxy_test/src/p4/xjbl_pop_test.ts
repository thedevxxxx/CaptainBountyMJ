import { _decorator, Component, Label, Node } from 'cc';
import { Database } from '../Database_test';
import { commonVal } from '../proxy-http_test';
import * as cc from 'cc';
import { XjfhsdPopTest } from './xjfhsd_pop_test';
const { ccclass, property } = _decorator;

@ccclass('XjblPopTest')
export class XjblPopTest extends Component {
    @property(Label)
    public Input:cc.Label | null = null;
    @property(Node)
    public sbuicnmtit:cc.Node | null = null;
    @property(Node)
    public edbox1:cc.Node | null = null;
    @property(Node)
    public sbuicnmcon:cc.Node | null = null;
    @property(Node)
    public sbui:cc.Node | null = null;
    @property(Node)
    public frame:cc.Node | null = null;
    @property(Node)
    public mid:cc.Node | null = null;
    @property(Node)
    public content:cc.Node | null = null;
    @property(Node)
    public scr:cc.Node | null = null;
    date = 'null';


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
           cc.log('数据不为空');
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
                   xjfhsd_pop.getComponent(XjfhsdPopTest).getDividendRule(data[index].id)
               })
               this.content.addChild(newItem);
           }
        } else {
           cc.log('进入数据为空');
           this.sbuicnmtit.active = false;
           this.sbuicnmcon.active = false;
           this.sbui.active = true;
        }
        this.node.active = true;
    }

    setdata (date: any, obj: any) {
        cc.log("####", date, obj);
        this.date = date
        this.content.removeAllChildren();
        if (obj != null) {
           for (let index = 1; index < obj.length; index++) {
               let item = cc.instantiate(this.frame);
               item.active = true;
               cc.find("label1", item).getComponent(cc.Label).string = obj[index].date;;
               cc.find("label2", item).getComponent(cc.Label).string = obj[index].id;
               cc.find("label3", item).getComponent(cc.Label).string = obj[index].money;
               this.content.addChild(item);
           }
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
                   xjfhsd_pop.getComponent(XjfhsdPopTest).getDividendRule(obj[index].id)
                   xjfhsd_pop.getComponent(XjfhsdPopTest).getmyDividendRule(hqq.gameGlobal.player.account_name)
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
        this.edbox1.getComponent(cc.EditBox).string = ''
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
                               xjfhsd_pop.getComponent(XjfhsdPopTest).getDividendRule(data[index].id)
                           })
                           this.content.addChild(newItem);
                       }
                   }
               }
           )
        }
    }

}
