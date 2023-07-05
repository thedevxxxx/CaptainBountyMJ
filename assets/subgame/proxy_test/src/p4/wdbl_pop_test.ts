import { _decorator, Component, Node, Label } from 'cc';
import { Database } from '../Database_test';
import * as cc from 'cc';
import { commonVal } from '../proxy-http_test';
const { ccclass, property } = _decorator;

@ccclass('WdblPopTest')
export class WdblPopTest extends Component {
    @property(Node)
    public frame: cc.Node | null = null;
    @property(Label)
    public game_tag: cc.Label | null = null;
    @property(Node)
    public content: cc.Node | null = null;
    @property(Node)
    public mid: cc.Node | null = null;
    @property(Label)
    public tittle: cc.Label | null = null;

    chnNumChar = [];

    chnUnitSection = [];

    chnUnitChar = [];

    onLoad () {
    }

    getDividendRule (poxy_id: any) {
        let host = hqq.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("GET", host + `/proxy/user/getDividendRule?account_name=${hqq.gameGlobal.player.account_name}&token=${commonVal.token}&id=${poxy_id}&game_tag=${commonVal.gametags}&type=1`, true);
        xhr_test.send();
        xhr_test.onreadystatechange = () => {
           if (xhr_test.readyState == 4 && xhr_test.status === 200) {
               var resData = JSON.parse(xhr_test.responseText);
               cc.log("p4 我的/proxy/user/getDividendRule返回", resData);
               let data = resData.msg;
               this.setdata(data)
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

    setdata(obj: any) {
        this.chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        this.chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
        this.chnUnitChar = ["", "十", "百", "千"];
        switch (commonVal.gametags) {
            case '1':
                this.game_tag.string = '棋牌类游戏'
                break;
            case '2':
                this.game_tag.string = '彩票类游戏'
                break;
            case '3':
                this.game_tag.string = '体育类游戏'
                break;
            case '4':
                this.game_tag.string = '视讯类游戏'
                break;
            default:
                break;
        }
        this.content.removeAllChildren();
        if (obj != null) {
            obj = obj.sort(Database.compare("amount"))
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].game_tag == commonVal.gametags && obj[i].type == 1) {
                    let content = ''
                    if (obj[i].demand_type == 1) {
                        content = '流水'
                    }
                    if (obj[i].demand_type == 2) {
                        content = '亏损'
                    }
                    let tag = ''
                    if (obj[i].demand_tag == 1) {
                        tag = '当前游戏类型'
                    }
                    if (obj[i].demand_tag == 2) {
                        tag = '所有游戏类型'
                    }
                    this.tittle.string = '统计方式: ' + content + ', 统计范围: ' + tag + ". ";
                    let item = cc.instantiate(this.frame);
                    item.active = true;
                    let NUM = i + 1
                    let st = this.NumberToChinese(NUM)
                    let dwb = obj[i].percent * 0.05 * 0.5 * 100
                    item.getComponent(cc.Label).string = "规则" + st + "：周期量(日量)大于等于" + obj[i].amount + "元，每万分红 " + Database.countCoinsShowLabels(dwb) + "元"
                    this.content.addChild(item);
                }
            }
        }
        this.node.active = true;
    }

    close () {
        Database.clickSound(Database.hall_sound)
        this.content.removeAllChildren();
        this.mid.active =false;
        this.node.active = false;
    }

    start () {
    }

}


