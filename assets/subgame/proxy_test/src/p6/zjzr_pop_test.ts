import { _decorator, Component, Node, Label } from 'cc';
import { Database } from '../Database_test';
import * as cc from 'cc';
import { commonVal } from '../proxy-http_test';
const { ccclass, property } = _decorator;

@ccclass('ZjzrPopTest')
export class ZjzrPopTest extends Component {
    @property(Node)
    public mid:cc.Node | null = null;
    @property(Label)
    public geme_money: cc.Label | null = null;
    @property(Label)
    public account_money: cc.Label | null = null;
    @property(Label)
    public input_money: cc.Label | null = null;
    @property(Label)
    public p1_money: cc.Label | null = null;

    onLoad () {
    }

    setData () {
        this.geme_money.string = '';
        this.account_money.string = '';
        this.input_money.string = '';
        cc.log('hqq.gameGlobal.player.gold==',hqq.gameGlobal.player.gold);
        let gamenum = (hqq.gameGlobal.player.gold + '').split(".")
        this.geme_money.string = gamenum[0];
        let num = (Database.balance + '').split(".")
        this.account_money.string = num[0] + '';
        this.node.active = true;
    }

    close () {
        Database.clickSound(Database.hall_sound)
        this.geme_money.string = '';
        this.account_money.string = '';
        this.input_money.string = '';
        this.mid.active = false;
        this.node.active = false;
    }

    confirm (eve: any, num: any) {
        Database.clickSound(Database.hall_sound)
        let a = parseInt(this.input_money.string)
        if (a > 0 && a) {
           this.input_money.string = a + parseInt(num)+''
        } else {
           this.input_money.string = parseInt(num)+''
        }
    }

    sureconfirm () {
        Database.clickSound(Database.hall_sound)
        let num = parseInt(this.input_money.string)
        if (num > 0 && num) {
           this.MoveBalanceToGameUser(num)
        }
    }

    cancelconfirm () {
        Database.clickSound(Database.hall_sound)
        this.input_money.string = ''
    }

    start () {
    }

    MoveBalanceToGameUser (num: any) {
        let host = hqq.gameGlobal.proxy.proxy_host
        var xhr_test = new XMLHttpRequest();
        xhr_test.open("POST", host + "/proxy/user/MoveBalanceToProxyUser", true);
        xhr_test.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var sendData = `account_name=${hqq.gameGlobal.player.account_name
           }&token=${commonVal.token}&money=${num}`;
        cc.log("/proxy/user/MoveBalanceToProxyUser:", host + "/proxy/user/MoveBalanceToProxyUser", sendData);
        xhr_test.send(sendData);
        xhr_test.onreadystatechange = () => {
           if (xhr_test.readyState == 4 && xhr_test.status === 200) {
               var resData = JSON.parse(xhr_test.responseText);
               cc.log("/proxy/user/MoveBalanceToProxyUser返回", resData);
               if (resData.code == 200) {
                   let gamenum = (resData.msg.game_gold + '').split(".")
                   this.geme_money.string = gamenum[0];
                   cc.log('resData.msg===', resData.msg.balance);
                   let num = (resData.msg.balance + '').split(".")
                   this.account_money.string = num[0] + '';
                   this.node.parent.parent.getChildByName('page1').getChildByName('middle').getChildByName('grid').getChildByName('yjye').getComponent(cc.Label).string = num[0] + '';
                   Database.balance = resData.msg.balance;
                   commonVal.balance = resData.msg.balance;
                   hqq.gameGlobal.player.gold = resData.msg.game_gold
                   hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "资金转入成功")
               }
               if (resData.code == 404) {
                   let txt = Database.Switchtext(resData.msg)
                   cc.log(txt);
                   hqq.eventMgr.dispatch(hqq.eventMgr.showTip, txt)
               }
           }
           xhr_test.abort();
        };
    
    }

}


