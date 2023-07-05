import { _decorator, Component, Node, Label } from 'cc';
import { Database } from '../Database_test';
import * as cc from 'cc';
import { commonVal } from '../proxy-http_test';
import { XjfhsdPopTest } from './xjfhsd_pop_test';
const { ccclass, property } = _decorator;

@ccclass('GzsdScriptTest')
export class GzsdScriptTest extends Component {
    @property(Node)
    public frame: cc.Node | null = null;
    @property(Node)
    public content: cc.Node | null = null;
    @property(Node)
    public edit1: cc.Node | null = null;
    @property(Node)
    public edit2: cc.Node | null = null;
    @property(Label)
    public amount: cc.Label | null = null;
    @property(Label)
    public percent: cc.Label | null = null;
    @property(Label)
    public XJID: cc.Label | null = null;
    @property(Label)
    public Rule: cc.Label | null = null;
    @property(Label)
    public infolabel: cc.Label | null = null;
    @property(Label)
    public infolabels: cc.Label | null = null;
    chnNumChar = [];
    chnUnitSection = [];
    chnUnitChar = [];
    gz_length = 1;
    now_id = 'null';
    demand_type = 2;

    onLoad () {
    }
    getDividendRule(poxy_id: any) {
        let host = hqq.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${hqq.gameGlobal.player.account_name}&token=${commonVal.token}&id=${poxy_id}&game_tag=${commonVal.gametags}&type=1`, true);
        let that = this
        xhr_test.send();
        xhr_test.onreadystatechange = function () {
            if (xhr_test.readyState == 4 && xhr_test.status === 200) {
                var resData = JSON.parse(xhr_test.responseText);
                cc.log("/proxy/user/getDividendRule返回", resData);
                let data = resData.msg;
                that.setdata()
            }
            xhr_test.abort();
        };
    }

    SectionToChinese (section: any) {
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        while (section > 0) {
           var v = section % 10;
           if (v === 0) {
               if (!zero) {
                   zero = true;
                   chnStr = this.chnNumChar[v] + chnStr;
               }
           } else {
               zero = false;
               strIns = this.chnNumChar[v];
               strIns += this.chnUnitChar[unitPos];
               chnStr = strIns + chnStr;
           }
           unitPos++;
           section = Math.floor(section / 10);
        }
        return chnStr;
    }

    NumberToChinese (num: any) {
        cc.log('mun', num);
        var unitPos = 0;
        var strIns = '', chnStr = '';
        var needZero = false;
        if (num == 0) {
           return this.chnNumChar[0];
        }
        while (num > 0) {
           var section = num % 10000;
           if (needZero) {
               chnStr = this.chnNumChar[0] + chnStr;
           }
           strIns = this.SectionToChinese(section);
           strIns += (section !== 0) ? this.chnUnitSection[unitPos] : this.chnUnitSection[0];
           chnStr = strIns + chnStr;
           needZero = (section < 1000) && (section > 0);
           num = Math.floor(num / 10000);
           unitPos++;
        }
        return chnStr;
    }

    setdata () {
        this.content.removeAllChildren();
        this.amount.string = ''
        this.percent.string = ''
        this.chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        this.chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
        this.chnUnitChar = ["", "十", "百", "千"];
        let gznew = this.NumberToChinese(this.gz_length)
        this.Rule.string = '规则' + gznew //规则显示
        this.XJID.string = this.now_id + ''
        let obj = Database.Allrule;
        if (obj != [] && obj != null) {
           obj = obj.sort(Database.compare("amount"))
           let tags_allrule = []
           cc.log('统计类型', commonVal.demand_type, '游戏分类', commonVal.gametags);
           for (let index = 0; index < obj.length; index++) {
               if (obj[index].game_tag == commonVal.gametags && obj[index].type == commonVal.demand_type) {
                   tags_allrule.push(obj[index])
               }
           }
           tags_allrule = tags_allrule.sort(Database.compare("amount"))
           for (let i = 0; i < tags_allrule.length; i++) {
               let item = cc.instantiate(this.frame);
               item.active = true;
               let NUM = i + 1
               let content = ''
               if (tags_allrule[i].demand_type == 1) {
                   content = '流水'
                   this.demand_type = 1//当前统计规则
               }
               if (tags_allrule[i].demand_type == 2) {
                   content = '亏损'
                   this.demand_type = 2//当前统计规则
               }
               this.infolabels.string = content;
               let st = this.NumberToChinese(NUM)//+content+
               let dwb = tags_allrule[i].percent * 0.05 * 0.5 * 100
               item.getComponent(cc.Label).string = "规则" + st + "：周期量(日量)大于等于" + tags_allrule[i].amount + "元，每万分红" + Database.countCoinsShowLabels(dwb) + " 元"
               this.content.addChild(item);
               Database.demand_tag = tags_allrule[i].demand_tag
               if (tags_allrule[i].demand_tag == 1) {
                   this.infolabel.string = "当前游戏类型"
               }
               if (tags_allrule[i].demand_tag == 2) {
                   this.infolabel.string = "全部游戏类型"
               }
           }
        }
        this.node.active = true;
    }

    savedata (a: any, b: any) {
        this.now_id = a;//当前下级用户id
        this.gz_length = b;// 用户所有规则长度
    }

    close () {
        Database.clickSound(Database.hall_sound)
        this.content.removeAllChildren();
        this.node.active = false;
        let xjfhsd_pop = this.node.parent.getChildByName('xjfhblsd_pop')
        xjfhsd_pop.active = true;
    }

    confirm () {
        Database.clickSound(Database.hall_sound)
        let xjid = this.now_id
        let game_tag = commonVal.gametags
        let demand_tag = Database.demand_tag
        let amounts = this.amount.string
        let percents = this.percent.string
        function isInteger(obj) {
           return obj % 1 === 0
        }
        if (parseFloat(percents) <= 0) {
           console.log('超出区间设置失败 点控 0');
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, '设置失败')
           return
        }
        if (hqq.app.pinpai == 'huangshi') {
           if (parseFloat(Database.hs_p4_gz) - parseFloat(percents) < 10) {
               console.log('超出区间设置失败 点控 10');
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, '设置失败')
               return
           } 
        }
        if (hqq.app.pinpai == 'tianqi') {
           if (parseFloat(Database.hs_p4_gz) - parseFloat(percents) < 5) {
               console.log('超出区间设置失败 点控 5');
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, '设置失败')
               return
           } 
        }
        if (isInteger(percents)) {
               let percentss = parseFloat(percents)  / 0.05 / 0.5 / 100
               this.createDividendRule(xjid, game_tag, demand_tag, amounts, percentss)
           }
    }

    createDividendRule (child_id: any, game_tag: any, demand_tag: any, amount: any, percent: any) {
        let host = hqq.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/createDividendRule", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var sendData = `account_name=${hqq.gameGlobal.player.account_name
           }&token=${commonVal.token}&child_id=${child_id}&type=1&game_tag=${game_tag}&demand_type=${this.demand_type}&demand_tag=${demand_tag}&amount=${amount}&percent=${percent}`;
        xhr_test.send(sendData);
        this.amount.string = ''
        this.percent.string = ''
        this.edit1.getComponent(cc.EditBox).string = ''
        this.edit2.getComponent(cc.EditBox).string = ''
        xhr_test.onreadystatechange = () => {
           if (xhr_test.readyState == 4 && xhr_test.status === 200) {
               var resData = JSON.parse(xhr_test.responseText);
               cc.log("/proxy/user/createDividendRule返回", resData);
               if (resData.code == 404) {
                   let txt = Database.Switchtext(resData.msg)
                   cc.log(txt);
                   hqq.eventMgr.dispatch(hqq.eventMgr.showTip, txt)
               }
               if (resData.code == 200) {
                   cc.log('规则+1');
                   let newgznew = this.NumberToChinese(this.gz_length + 1)
                   this.Rule.string = '规则' + newgznew //规则显示
                   let xjfhsd_pop = this.node.parent.getChildByName('xjfhblsd_pop')
                   xjfhsd_pop.getComponent(XjfhsdPopTest).getDividendRule(child_id)
                   hqq.eventMgr.dispatch(hqq.eventMgr.showTip, '规则设定成功')
                   this.node.active = false;
               }
           }
           xhr_test.abort();
        };
    }

    start () {
    }

}

