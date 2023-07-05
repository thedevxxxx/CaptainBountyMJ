import { _decorator, Component, Node, Prefab } from 'cc';
import * as cc from 'cc';
import { commonVal } from './proxy-http_test';
import { Database } from './Database_test';
import { proxy_canvas_test } from './proxy_canvas_test';
const { ccclass, property } = _decorator;

@ccclass('ProxyPage1Test')
export class ProxyPage1Test extends Component {
    @property(Node)
    public btn2: cc.Node | null = null;
    @property(Node)
    public btn3: cc.Node | null = null;
    @property(Node)
    public btn4: cc.Node | null = null;
    @property(Node)
    public btn5: cc.Node | null = null;
    @property(Node)
    public btn6: cc.Node | null = null;
    @property(Node)
    public btn7: cc.Node | null = null;
    @property(Node)
    public btn8: cc.Node | null = null;
    @property(Node)
    public btn9: cc.Node | null = null;
    @property(Node)
    public btn10: cc.Node | null = null;
    @property(Node)
    public grid_db: cc.Node | null = null;
    @property(Node)
    public grid_all: cc.Node | null = null;
    @property(Node)
    public dataTable_all: cc.Node | null = null;

    @property
    public btn_pp = true;
    @property
    public acc = true;
    @property(Prefab)
    public page3: cc.Prefab | null = null;
    @property(Prefab)
    public page4: cc.Prefab | null = null;
    @property(Prefab)
    public page5: cc.Prefab | null = null;
    @property(Prefab)
    public page6: cc.Prefab | null = null;
    @property(Prefab)
    public page7: cc.Prefab | null = null;
    @property(Prefab)
    public page8: cc.Prefab | null = null;
    @property(Prefab)
    public page9: cc.Prefab | null = null;
    @property(Prefab)
    public page10: cc.Prefab | null = null;
    @property(Prefab)
    public page11: cc.Prefab | null = null;
    @property(Prefab)
    public page12: cc.Prefab | null = null;
    @property(Prefab)
    public page13: cc.Prefab | null = null;
    @property(Prefab)
    public page14: cc.Prefab | null = null;
    @property(Prefab)
    public page15: cc.Prefab | null = null;
    @property(Prefab)
    public page16: cc.Prefab | null = null;
    @property(Prefab)
    public page17: cc.Prefab | null = null;
    @property(Prefab)
    public jiazai: cc.Prefab | null = null;

    count = 0;
    myURL = '';
    timer;
    toFloat(num: any) {
        if (!num) return "0.00"
        var newnum = num.toFixed(7);
        return (Math.floor(newnum * 100) / 100).toFixed(2);
    }
    ntwo_updata() {
        if (this.btn_pp) {
            Database.n2_jrygj_qp = 0
            Database.n2_jrygj_dz = 0
            Database.n2_zsyj_qp = 0
            Database.n2_zsyj_dz = 0
            Database.n2_tdyj_qp = 0
            Database.n2_tdyj_dz = 0
            Database.n2_zrzyj_qp = 0
            Database.n2_zrzyj_dz = 0
            Database.n2_bzzyj_qp = 0
            Database.n2_bzzyj_dz = 0
            Database.loadview.active = true
            this.scheduleOnce(() => {
                Database.loadview.active = false;
            }, 2);
            let shuxian = this.node.getChildByName('tgzq_bg').getChildByName('shuaxin')
            this.scheduleOnce(() => {
                cc.Tween.stopAllByTarget(shuxian);
                // @ts-ignore
                shuxian.rotation = 0
                this.btn_pp = true
            }, 2)
            cc.tween(shuxian)
                .by(0.01, { angle: -6 })
                .repeatForever()
                .start();
            cc.log('进刷新界面功能');
            let table = this.node.getChildByName('ninetwo')//.getComponent(cc.Label)
            let jrygj = table.getChildByName('jryg').getComponent(cc.Label)
            let zsyj = table.getChildByName('zsyj').getComponent(cc.Label)
            let tdyj = table.getChildByName('tdyj').getComponent(cc.Label)
            let zrzyj = table.getChildByName('zrzyj').getComponent(cc.Label)
            let bzzyj = table.getChildByName('bzzyj').getComponent(cc.Label)
            this.btn_pp = false
            const promise1 = new Promise((resolve) => {
                commonVal.n2_today_GetBaseDividendInfo2(0, resolve, 1)
            });
            const promise2 = new Promise((resolve) => {
                commonVal.n2_today_GetBaseDividendInfo2(0, resolve, 5)
            });
            const promise3 = new Promise((resolve) => {
                commonVal.n2_today_GetBaseDividendInfo2(-1, resolve, 1)
            });
            const promise4 = new Promise((resolve) => {
                commonVal.n2_today_GetBaseDividendInfo2(-1, resolve, 5)
            });
            const promise5 = new Promise((resolve) => {
                commonVal.n2_today_GetBaseDividendInfo2('week', resolve, 1)
            });
            const promise6 = new Promise((resolve) => {
                commonVal.n2_today_GetBaseDividendInfo2('week', resolve, 5)
            });
            Promise.all([promise1, promise2, promise3, promise4, promise5, promise6]).then((values) => {
                jrygj.string = Database.countCoinsShowLabel(Database.n2_jrygj_qp + Database.n2_jrygj_dz)//92 今日预估金 
                zsyj.string = Database.countCoinsShowLabel(Database.n2_zsyj_qp + Database.n2_zsyj_dz)//92 直属佣金 
                tdyj.string = Database.countCoinsShowLabel(Database.n2_tdyj_qp + Database.n2_tdyj_dz)//92 团队佣金 
                zrzyj.string = Database.countCoinsShowLabel(Database.n2_zrzyj_qp + Database.n2_zrzyj_dz)
                bzzyj.string = Database.countCoinsShowLabel(Database.n2_bzzyj_qp + Database.n2_bzzyj_dz)
                let dataTable = this.node.getChildByName("middle").getChildByName("rwer2");
                let urls
                urls = hqq.gameGlobal.proxy.proxy_host + `/proxy/user/GetProxyUserNumber?account_name=${hqq.gameGlobal.player.account_name}&token=${commonVal.token}&ids=[${hqq.gameGlobal.player.account_name}]`
                let xhr4 = new XMLHttpRequest(); //readyState===0
                xhr4.open("GET", urls, true); //readyState===1
                xhr4.send(); //readyState===2
                xhr4.onreadystatechange = () => {
                    if (xhr4.readyState == 4 && xhr4.status === 200) {
                        const res = JSON.parse(xhr4.responseText);
                        if (res.code === 200) {
                            if (!res.msg) {
                                dataTable.getChildByName("tdzwj").getComponent(cc.Label).string = '0';
                            } else {
                                dataTable.getChildByName("tdzwj").getComponent(cc.Label).string = '' + res.msg[0].count;
                            }
                        }
                        this.scheduleOnce(() => {
                            console.log('this.btn_pp true');
                            this.btn_pp = true
                        }, 0.1);
                    }
                    xhr4.abort();
                };
            })
        }
    }


    onLoad() {
        console.log('版本号0.0.1');

        let package_id = hqq.gameGlobal.proxy.package_id;

        this.scheduleOnce(() => {
            let apage3 = cc.instantiate(this.page3);
            let apage4 = cc.instantiate(this.page4);
            let apage5 = cc.instantiate(this.page5);
            let apage6 = cc.instantiate(this.page6);
            let apage7 = cc.instantiate(this.page7);
            let apage8 = cc.instantiate(this.page8);
            let apage9 = cc.instantiate(this.page9);
            let apage10 = cc.instantiate(this.page10);
            let apage11 = cc.instantiate(this.page11);
            let apage16 = cc.instantiate(this.page16);
            let apage17 = cc.instantiate(this.page17);
            let apage13 = cc.instantiate(this.page13);
            let apage14 = cc.instantiate(this.page14);
            let apage15 = cc.instantiate(this.page15);

            apage3.active = false
            apage4.active = false
            apage5.active = false
            apage6.active = false

            apage7.active = false
            apage8.active = false
            apage9.active = false
            apage10.active = false
            apage11.active = false
            apage16.active = false
            apage17.active = false

            apage13.active = false
            apage14.active = false
            apage15.active = false

            cc.find("Canvas/baseView/home").addChild(apage3);
            cc.find("Canvas/baseView/home").addChild(apage4);
            cc.find("Canvas/baseView/home").addChild(apage5);
            cc.find("Canvas/baseView/home").addChild(apage6);

            cc.find("Canvas/baseView/home").addChild(apage7);
            cc.find("Canvas/baseView/home").addChild(apage8);
            cc.find("Canvas/baseView/home").addChild(apage9);
            cc.find("Canvas/baseView/home").addChild(apage10);
            cc.find("Canvas/baseView/home").addChild(apage11);
            cc.find("Canvas/baseView/home").addChild(apage16);
            cc.find("Canvas/baseView/home").addChild(apage17);

            cc.find("Canvas/baseView/home").addChild(apage13);
            cc.find("Canvas/baseView/home").addChild(apage14);
            cc.find("Canvas/baseView/home").addChild(apage15);

            //  渲染二维码的uid
            this.node.parent.parent.getChildByName('templatePage').getChildByName('img1').getChildByName('n2label').getComponent(cc.Label).string = "邀请码:" + hqq.gameGlobal.player.account_name;
            this.node.parent.parent.getChildByName('templatePage').getChildByName('img2').getChildByName('n2label').getComponent(cc.Label).string = "邀请码:" + hqq.gameGlobal.player.account_name;
            this.node.parent.parent.getChildByName('templatePage').getChildByName('img3').getChildByName('n2label').getComponent(cc.Label).string = "邀请码:" + hqq.gameGlobal.player.account_name;

        }, 0.01)
        cc.log('active 1');
        // this.grid_db.active = false;
        // this.grid_all.active = true;
        // this.dataTable_all.active = true;




        let account_name = hqq.gameGlobal.player.account_name;
        let myID = account_name.toString();
        var canvasScript = cc.find("Canvas").getComponent(proxy_canvas_test);
        this.node
            .getChildByName("bottom")
            .getChildByName("myID")
            .getChildByName("ID")
            .getComponent(cc.Label).string = myID;
        // @ts-ignore
        var clickEventHandler =  new cc.EventHandler();
        clickEventHandler.target = cc.find("Canvas"); // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "proxy_canvas_test"; // 这个是代码文件名
        clickEventHandler.handler = "onCopyClick";
        clickEventHandler.customEventData = myID;
        var button = this.node
            .getChildByName("bottom")
            .getChildByName("myID")
            .getChildByName("copy")
            .getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
        cc.log('hqq.gameGlobal.proxy.temp_host====', hqq.gameGlobal.proxy.temp_host)
        let temp_host = hqq.gameGlobal.proxy.temp_host;
        let myURL =
            temp_host +
            "/?p=" +
            package_id +
            "&u=" +
            account_name +
            "&m=" +
            hqq.gameGlobal.huanjin;
        if (hqq.gameGlobal) {
            let huanjin = hqq.gameGlobal.huanjin;
            if (huanjin == "online") {
                myURL = temp_host + "/?p=" + package_id + "&u=" + account_name;
            }
        }
        this.myURL = myURL;
        this.node
            .getChildByName("bottom")
            .getChildByName("myURL")
            .getChildByName("URL")
            .getComponent(cc.Label).string = myURL;
        this.node
            .getChildByName("bottom")
            .getChildByName("myURL")
            .getChildByName("URL")
            .getComponent(cc.Label)
            .markForUpdateRenderData(true);
        this.node
            .getChildByName("bottom")
            .getChildByName("myURL")
            .getChildByName("URL")
            .getChildByName("IM")
            .active = false;
        // @ts-ignore
        var URLEventHandler = new cc.EventHandler();
        URLEventHandler.target = cc.find("Canvas"); // 这个 node 节点是你的事件处理代码组件所属的节点
        URLEventHandler.component = "proxy_canvas_test"; // 这个是代码文件名
        URLEventHandler.handler = "onCopyClick";
        URLEventHandler.customEventData = myURL;
        var button2 = this.node
            .getChildByName("bottom")
            .getChildByName("myURL")
            .getChildByName("URL")
            .getChildByName("copy")
            .getComponent(cc.Button);
        button2.clickEvents.push(URLEventHandler);
        this.init(myURL);
        let host = hqq.gameGlobal.proxy.proxy_host;
        let dataTable;
        if (hqq.app.pinpai == 'test') {
            console.log('2');
            if (hqq.app.pinpai == 'fuxin') {
                console.log('3');
                dataTable = this.node.getChildByName("middle").getChildByName("rwer2");
            } else {
                dataTable = this.node.getChildByName("middle").getChildByName("grid");
            }
            let url = host + "/Proxy/User/login";
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                cc.log("------/Proxy/User/ login  xhr.status:", xhr.status);
                if (xhr.readyState == 4 && xhr.status === 200) {
                    var resData = JSON.parse(xhr.responseText);
                    cc.log("/Proxy/User/login返回:", resData);
                    if (resData.code === 200) {

                        Database.balance = resData.msg.proxy_user.balance
                        commonVal.token = resData.msg.token;
                        commonVal.balance = resData.msg.proxy_user.balance
                        cc.log('Database.balance ===', Database.balance);

                        console.log('5');
                        function a() {
                            cc.log('2拿到了棋牌规则');
                        }
                        function b() {
                            cc.log('2拿到了电子规则');
                        }
                        function c() {
                            cc.log('2拿到了电子规则');
                        }
                        function d() {
                            cc.log('3拿到了电子规则');
                        }
                        function e() {
                            cc.log('4拿到了电子规则');
                        }

                        commonVal.jd_p9_GetBaseDividendRule(1, a)
                        commonVal.jd_p9_GetBaseDividendRule(5, b)
                        commonVal.jd_p9_GetBaseDividendRule(2, c)
                        commonVal.jd_p9_GetBaseDividendRule(3, d)
                        commonVal.jd_p9_GetBaseDividendRule(4, e)


                        // function check() {
                        //     return new Promise((resolve, reject) => {
                        //         commonVal.getDividendRule(account_name, resolve)//获取所有的规则
                        //     })
                        // }
                        // check().then(//此处暂时不通
                        //     (value: any) => {
                        //         cc.log('1   value====', value)
                        //        // @ts-ignore
                        //         if (value  && value != null) {
                        //             for (let i = 0; i < value.length; i++) {
                        //                 if (hqq.app.pinpai == 'test' || hqq.app.pinpai == 'tianqi') {
                        //                     console.log('6');
                        //                     if (value[i].type == 1) {
                        //                         cc.log('test 打开流水分红');
                        //                         this.btn4.active = true;
                        //                     }
                        //                     if (value[i].type == 3) {
                        //                         cc.log('test 打开亏损差分红');
                        //                         this.btn6.active = true;
                        //                     }
                        //                 }
                        //             }
                        //         }
                        //     }
                        // )
                        //取得佣金余额
                        cc.find("Canvas/baseView/home/page1/modal/balance/label").getComponent(cc.Label).string = Database.countCoinsShowLabel(resData.msg.proxy_user.balance);
                        //上级id
                        dataTable.getChildByName("sjid").getComponent(cc.Label).string = resData.msg.proxy_user.proxy_pid;
                        //直属下级玩家数
                        dataTable.getChildByName("xjwjs").getComponent(cc.Label).string = resData.msg.proxy_user.direct_number;

                        Database.zsxjwjzs = parseInt(resData.msg.proxy_user.direct_number)
                        //更新佣金余额
                        //如果是科学计数法的极小数
                        if (Database.balance < 0.001) {
                            Database.balance = 0.0;
                        }
                        dataTable.getChildByName("yjye").getComponent(cc.Label).string = Database.countCoinsShowLabel(Database.balance);
                        url =
                            host +
                            `/Proxy/User/getAggregation?account_name=${account_name}&ids=[${account_name}]&token=${resData.msg.token}`;
                        var xhr2 = new XMLHttpRequest(); //readyState===0
                        xhr2.onreadystatechange = () => {
                            if (xhr2.readyState == 4 && xhr2.status === 200) {
                                const res = JSON.parse(xhr2.responseText);
                                cc.log("getAggregation返回数据", res);
                                if (res.code === 200 && res.msg) {
                                    const { history_income, children, tax_total } = res.msg[0];
                                    let player_sum = 0;
                                    for (const key in children) {
                                        player_sum += children[key];
                                    }
                                    let sum_income = 0;
                                    for (const key in history_income) {
                                        sum_income += history_income[key];
                                    }
                                    dataTable.getChildByName("lszyj").getComponent(cc.Label).string = sum_income
                                        ? this.toFloat(sum_income)
                                        : "0.00";
                                }
                            }
                            xhr2.abort();
                        };
                        xhr2.open("GET", url, true); //readyState===1
                        xhr2.send(); //readyState===2
                        //服务器响应，正在接收响应ing readyState===3
                        //完成响应readyState===4

                        // 请求第四列数据
                        url =
                            host +
                            `/Proxy/User/getProxyUserInductionListGroupByDate?account_name=${account_name}&page=1&limit=2&token=${resData.msg.token}`;
                        let xhr3 = new XMLHttpRequest(); //readyState===0
                        xhr3.open("GET", url, true); //readyState===1
                        xhr3.send(); //readyState===2
                        xhr3.onreadystatechange = () => {
                            if (xhr3.readyState == 4 && xhr3.status === 200) {
                                const res = JSON.parse(xhr3.responseText);
                                if (res.code === 200 && res.msg) {
                                    let today = new Date();
                                    today.setDate(today.getDate() - 1);
                                    let month = today.getMonth() + 1;
                                    let day = today.getDate();
                                    let arr = res.msg.map((item) => {
                                        return {
                                            date: item.date.split("-").map(Number),
                                            statement_income: item.statement_income,
                                        };
                                    });
                                    cc.log(arr, "昨日日期", month, day);
                                    arr.forEach((ele) => {
                                        if (ele.date[1] === month && ele.date[2] === day) {
                                            dataTable.getChildByName("zryj").getComponent(cc.Label).string = this.toFloat(ele.statement_income);
                                        }
                                    });
                                }
                            }
                            xhr3.abort();
                        };
                        // 请求团队总人数数据 测试时屏蔽
                        let urls
                        urls = hqq.gameGlobal.proxy.proxy_host + `/proxy/user/GetProxyUserNumber?account_name=${hqq.gameGlobal.player.account_name}&token=${commonVal.token}&ids=[${hqq.gameGlobal.player.account_name}]`
                        cc.log(urls);
                        let xhr4 = new XMLHttpRequest(); //readyState===0
                        xhr4.open("GET", urls, true); //readyState===1
                        xhr4.send(); //readyState===2
                        xhr4.onreadystatechange = () => {
                            if (xhr4.readyState == 4 && xhr4.status === 200) {
                                const res = JSON.parse(xhr4.responseText);
                                cc.log(url, "4444  GetProxyUserNumber 返回数据", res);
                                if (res.code === 200) {
                                    if (!res.msg) {
                                        dataTable.getChildByName("tdzwj").getComponent(cc.Label).string = '0';
                                    } else {
                                        dataTable.getChildByName("tdzwj").getComponent(cc.Label).string = '' + res.msg[0].count;
                                    }
                                }
                            }
                            xhr4.abort();
                        };
                    } else {
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "获取数据失败");
                        xhr.abort();
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        //测试登录用 需改ghandler account //889223867gHandler.gameGlobal.player.account_name  616417114 jd        671627403 qt  818123207 - 富鑫II顶级号
        // 671627403  91顶级号
        // 649506476  聚鼎顶级号 794600583

        //上级ID 319010216

        //  var sendData = `account_name=${319010216}&password=123456`;
        //正式 149672574
        var sendData = `account_name=${hqq.gameGlobal.player.account_name}&token=${hqq.gameGlobal.token}`
        cc.log('login sendData', host + "/Proxy/User/login", sendData);
        xhr.send(sendData);
        let label2node;
        if (hqq.app.pinpai == 'test') {
            console.log('10');
            label2node = dataTable.getChildByName("xjwjs");
        } else {
            label2node = dataTable.getChildByName("label2");
        }
        if (hqq.app.pinpai != 'test') {
            // @ts-ignore
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = cc.find("Canvas/baseView/home/page1"); // 这个node节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = "proxy-page1_test"; // 这个是代码文件名
            clickEventHandler.handler = "checkCustomers";
            clickEventHandler.customEventData = account_name;
            var button3 = label2node.getComponent(cc.Button);
            button3.clickEvents.push(clickEventHandler);
        }
    }
    //领取佣金 
    moveBalanceToGame() {
        Database.clickSound(Database.hall_sound)
        if (Database.moveBalanceToGames) {
            Database.moveBalanceToGames = false
            var self = this;
            let balances = Math.floor(parseFloat(commonVal.balance) * 100) / 100;
            let token = commonVal.token;
            var canvasScript = cc.find("Canvas").getComponent("proxy-canvas");
            let currentBalance = parseFloat(
                self.node.getChildByName("middle").getChildByName("grid").getChildByName("yjye").getComponent(cc.Label).string
            );
            cc.log("moveBalanceToGame", balances, currentBalance);
            if (balances == 0 && currentBalance == 0) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "暂无可领取佣金，快去推广赚佣金吧！");
                Database.moveBalanceToGames = true
            } else {
                let nineone_balances;
                if (typeof balances == 'undefined') {
                    nineone_balances = currentBalance
                } else {
                    nineone_balances = balances
                }
                if (hqq.app.pinpai == 'nineone' && nineone_balances <= 0) {
                    cc.log("佣金不足，快去推广赚佣金吧！");
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "佣金不足，快去推广赚佣金吧！");
                    Database.moveBalanceToGames = true
                } else {
                    let url = hqq.gameGlobal.proxy.proxy_host + "/Proxy/User/moveBalanceToGameUser";
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                            var response = xhr.responseText;
                            var resData = JSON.parse(response);
                            cc.log("http data返回:", resData);
                            Database.moveBalanceToGames = true
                            if (resData.code === 200) {
                                if (resData.msg.game_gold) {
                                    hqq.gameGlobal.player.gold = resData.msg.game_gold
                                }
                                if (typeof balances !== 'undefined') {
                                    if (hqq.app.pinpai != 'ninetwo') {
                                        commonVal.p1_SaveEmailDetail(commonVal.account_name, balances)
                                    }
                                } else {
                                    if (hqq.app.pinpai != 'ninetwo') {
                                        commonVal.p1_SaveEmailDetail(commonVal.account_name, currentBalance)
                                    }
                                }
                                Database.balance = 0
                                commonVal.balance = 0 + ''
                                self.node.getChildByName("middle").getChildByName("grid").getChildByName("yjye").getComponent(cc.Label).string = "0.00";
                                if (hqq.app.pinpai == 'fuxin' || hqq.app.pinpai == 'yuyu' || hqq.app.pinpai == 'juding' || hqq.app.pinpai == 'huaxing' || hqq.app.pinpai == 'ninetwo') {
                                    console.log('11');
                                    self.node.getChildByName("middle").getChildByName("rwer2").getChildByName("yjye").getComponent(cc.Label).string = "0.00";
                                    Database.balance = 0
                                }
                                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "领取成功");
                            } else {
                                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "领取失败");
                            }
                        }
                        xhr.abort();
                    };
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    let sendData
                    if (typeof balances !== 'undefined' && balances !== 0) {
                        sendData = `account_name=${commonVal.account_name}&token=${token}&money=${balances}`;
                    } else {
                        sendData = `account_name=${commonVal.account_name}&token=${token}&money=${currentBalance}`;
                    }
                    cc.log("领取余额发送的数据:", sendData);
                    xhr.send(sendData);
                }
            }
        }
    }

    lookDetails() {
        Database.clickSound(Database.hall_sound)
        let p1_nowdate = Database.Sb_DATA(1);
        let start_date = Database.Sb_DATA(7);
        let str = Database.getUnixtimestamp0(start_date);
        let end = Database.getUnixtimestamp0(p1_nowdate);
        function check() {
            if (hqq.app.pinpai == 'xinlong') {
                return new Promise((resolve, reject) => {
                    commonVal.GetProxyUserLinkstatement(str, end, resolve)
                })
            } else {
                return new Promise((resolve, reject) => {
                    commonVal.GetProxyUserLinkBet(str, end, resolve)
                })
            }
        }
        check().then(
            (value) => {
                cc.log('p1七天成功了');
                let seven_view = this.node.getChildByName("proxy-seven_fx");
                seven_view.active = true
                //    seven_view.getComponent('proxy1-seven_test').setview();
            },
            function (error) {
                cc.log("出错了", error);
            },
        )
    }

    checkCustomers(e: any, id: any) {
        if (hqq.app.pinpai == 'fuxin' || hqq.app.pinpai == 'juding' || hqq.app.pinpai == 'test') {
            console.log('2');
            return
        } else {
            this.count++;
            cc.log(this.count, id);
        }
    }

    closeCheckCustomers() {
        this.count--;
        let others = cc.find("Canvas/baseView/home/page1/others");
        cc.log("closeCheckCustomers,count", this.count);
        if (this.count === 0) {
            cc.find("Canvas/baseView/home/page1").active = true;
        }
    }

    popup_transfermoney_modal(e: any, id: any) {
        this.node
            .getChildByName("modal")
            .getChildByName("user")
            .getChildByName("label")
            .getComponent(cc.Label).string = id;
        this.node.getChildByName("popup").active = true;
        this.node.getChildByName("modal").active = true;
    }

    close_transfermoney_modal() {
        this.node.getChildByName("popup").active = false;
        this.node.getChildByName("modal").active = false;
    }

    transfermoney() {
        let host = hqq.gameGlobal.proxy.proxy_host;
        let id = parseInt(
            this.node
                .getChildByName("modal")
                .getChildByName("user")
                .getChildByName("label")
                .getComponent(cc.Label).string,
        );
        let canvasScript = cc.find("Canvas").getComponent("proxy-canvas_test");
        let money = this.node
            .getChildByName("modal")
            .getChildByName("input")
            .getChildByName("New EditBox")
            .getComponent(cc.EditBox).string;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", host + "/proxy/user/moveBalanceToProxy", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var sendData = `platform_key=123456&account_name=${hqq.gameGlobal.player.account_name}&token=${commonVal.token}&money=${money}&id=${id}`;
        cc.log("/proxy/user/moveBalanceToProxy请求:", sendData);
        xhr.send(sendData);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status === 200) {
                var resData = JSON.parse(xhr.responseText);
                cc.log("/proxy/user/moveBalanceToProxy返回:", resData);
                if (resData.code === 200) {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "转账成功");
                    cc
                        .find("Canvas/baseView/home/page1/modal/balance/label")
                        .getComponent(cc.Label).string = resData.msg.balance.toFixed(2);
                } else {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "转账失败");
                }
            }
            xhr.abort();
        };
        this.node
            .getChildByName("modal")
            .getChildByName("input")
            .getChildByName("New EditBox")
            .getComponent(cc.EditBox).string = "";

    }

    popupIM() {
        Database.clickSound(Database.hall_sound)
        var canvasScript = cc.find("Canvas").getComponent("proxy-canvas-chaofan");
        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "跳转中...")
        let im_host = hqq.gameGlobal.im_host;
        let url = `${im_host}/im/api/universalAgent`;
        let reqData = {
            user_id: hqq.gameGlobal.player.id.toString(),
            token: "c7a9d6g21v87s",
            user_ip: hqq.gameGlobal.ipList[0],
            user_ping: "-",
            user_link: '',
        };
        reqData.user_link =
            hqq.gameGlobal.proxy.temp_host +
            "/?p=" +
            hqq.gameGlobal.proxy.package_id +
            "&u=" +
            hqq.gameGlobal.player.account_name +
            "&m=" +
            hqq.gameGlobal.huanjin;
        if (hqq.gameGlobal) {
            let huanjin = hqq.gameGlobal.huanjin;
            if (huanjin == "online") {
                reqData.user_link =
                    hqq.gameGlobal.proxy.temp_host +
                    "/?p=" +
                    hqq.gameGlobal.proxy.package_id +
                    "&u=" +
                    hqq.gameGlobal.player.account_name;
            }
        }
        var xhr = new XMLHttpRequest(); //readyState===0
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status === 200) {
                cc.log("IM调出接口返回数据：", JSON.parse(xhr.responseText));
                const res = JSON.parse(xhr.responseText);
                if (
                    res.code === 0
                ) {
                    hqq.gameGlobal.imReceive = 0;
                    hqq.reflect && hqq.reflect.setOrientation("portrait", 750, 1334);
                    cc.director.loadScene(hqq.subModel.im.lanchscene);
                } else {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "操作失败!")
                }
            } else if (xhr.status !== 200) {
                cc.log(xhr.statusText);
            }
            xhr.abort();
        };
        let ret = "";
        for (let it in reqData) {
            ret += encodeURIComponent(it) + "=" + encodeURIComponent(reqData[it]) + "&";
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        cc.log("客服接口的请求数据:", reqData);
        xhr.send(ret);
    }

     //保存二维码按钮事件
     saveQRcode() {
        //音效
        Database.clickSound(Database.hall_sound)
        //保存功能
        cc.log("saveQRcodeAction");

        //保存功能
        if (cc.sys.os == cc.sys.OS.IOS) {
            cc.log("ios tragger");
            let targetNode;
            for (let i = 1; i < 4; i++) {
                if (cc.find(`Canvas/baseView/templatePage/img${i}/yjfx_gouxuan`).active) {
                    targetNode = cc.find(`Canvas/baseView/templatePage/img${i}`);
                }
            }
            targetNode.getChildByName("yjfx_gouxuan").active = false;
            this.screenShot(targetNode);
            this.timer = setTimeout(() => {
                targetNode.getChildByName("yjfx_gouxuan").active = true;
            }, 400);
        } else {
            let isPermitted = hqq.reflect && hqq.reflect.getPermission();
            if (isPermitted) {
                let targetNode;
                for (let i = 1; i < 4; i++) {
                    if (cc.find(`Canvas/baseView/templatePage/img${i}/yjfx_gouxuan`).active) {
                        targetNode = cc.find(`Canvas/baseView/templatePage/img${i}`);
                    }
                }
                targetNode.getChildByName("yjfx_gouxuan").active = false;
                this.screenShot(targetNode);
                this.timer = setTimeout(() => {
                    targetNode.getChildByName("yjfx_gouxuan").active = true;
                }, 400);
            }
        }
    }

    onPopupClose(e: any) {
        Database.clickSound(Database.hall_sound)
        this.node.getChildByName("popup").active = !this.node.getChildByName("popup").active;
        this.node.getChildByName("guide").active = !this.node.getChildByName("guide").active;
    }

    onMobanPopupClose(e: any) {
        Database.clickSound(Database.hall_sound)
        if (cc.find("Canvas/baseView/templatePage").active == false && Database.a_num == 0) {
            Database.a_num++;
            cc.log('绘制二维码', this.myURL)
            var qrcodes = [];
            for (let i = 1; i < 4; i++) {
                qrcodes[i] = cc.find(`Canvas/baseView/templatePage/img${i}/qrcode`);
                qrcodes[i].active = true
                this.QRCreate(qrcodes[i].addComponent(cc.Graphics), this.myURL);
            }
        }
        cc.find("Canvas/baseView/templatePage").active = !cc.find("Canvas/baseView/templatePage").active;
    }

    onTemplateImgBeClicked(e: any, num: any) {
        if (this.acc) {
            this.acc = false
            for (let i = 1; i < 4; i++) {
                cc.find(`Canvas/baseView/templatePage/img${i}/yjfx_gouxuan`).active = false;
            }
            cc.find(`Canvas/baseView/templatePage/img${num}/yjfx_gouxuan`).active = true;
            this.scheduleOnce(() => {
                this.acc = true
            }, 0.4)
        }
    }

    init(url: any) {
        cc.log("initurl begin!!!", url);
        var qrcode0 = this.node
            .getChildByName("bottom")
            .getChildByName("qrImage")
            .getChildByName("qrcode");
        var ctx = qrcode0.addComponent(cc.Graphics);
        if (typeof url !== "string") {
            cc.log("url is not string", url);
            return;
        }
        this.QRCreate(ctx, url);
    }

    QRCreate(ctx: any, url: any) {
        var self = this.node
            .getChildByName("bottom")
            .getChildByName("qrImage")
            .getChildByName("qrcode");
        cc.log("QRcreate start!!", ctx, url);
        // @ts-ignore
        var qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
        qrcode.addData(url);
        qrcode.make();
        ctx.fillColor = cc.Color.BLACK;
        var tileW = self.getComponent(cc.UITransform).width / qrcode.getModuleCount();
        var tileH = self.getComponent(cc.UITransform).height / qrcode.getModuleCount();
        cc.log('tileW=', tileW, 'tileH', tileH);
        for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
                if (qrcode.isDark(row, col)) {
                    var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
                    var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
                    ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
                    ctx.fill();
                }
            }
        }
    }

    screenShot(target, fileName?) {
        cc.log("screenShot start!", target, fileName);
        let rt = new cc.RenderTexture();
        let  buffer: ArrayBufferView = null;
        rt.reset({
            width: cc.view.getVisibleSize().width,
            height: cc.view.getVisibleSize().height,
        })

        cc.find("Canvas").getComponent(cc.Canvas).cameraComponent.targetTexture = rt;

        setTimeout(() => {
            var width = target.getComponent(cc.UITransform).width;
            var height = target.getComponent(cc.UITransform).height;
            var worldPos = target.getWorldPosition();
            buffer = rt.readPixels(Math.round(worldPos.x - (width / 2)) , Math.round(worldPos.y - (height / 2)), width, height);
            cc.find("Canvas").getComponent(cc.Canvas).cameraComponent.targetTexture = null;
            //倒轉貼圖
            let length = buffer.byteLength;
            let reverseBuff = new Uint8Array(length);
            for(let i = 0; i < length; i++){
                let row02 = parseInt( i / (4*width) + "");
                let row01 = height - row02 - 1;
                let index = row01 * width * 4 + i % (4 * width);
                reverseBuff[i] = buffer[index];
            }
            this.saveImageToDevice(reverseBuff, width, height, fileName);
            //TEST
            //this.showImage(width, height, reverseBuff);
        }, 300);
    }
 
    onDestroy() {
        clearTimeout(this.timer);
    }

    onDisable() {
        cc.find("Canvas/baseView/home/page1/others").removeAllChildren();
    }

    ceshi() {
        //commonVal.SaveEmailDetail(123123, 500)
    }
    saveImageToDevice(buffer: ArrayBufferView, width, height, fileName) {
        var date = new Date().getTime();
        var fileName = fileName || `cocosScreenShot${date}.png`;

        var fullPath = "/storage/emulated/0/" + fileName;
        if (cc.sys.os == cc.sys.OS.IOS) {
            fullPath = jsb.fileUtils.getWritablePath() + fileName;
        }

        if (cc.sys.isNative) {
            //@ts-ignore
            if (jsb.saveImageData) {
                //@ts-ignore
                let success = jsb.saveImageData(buffer, width, height, fullPath);
                if (success) {
                    console.log("save image data success, file: " + fullPath);
                    hqq.reflect && hqq.reflect.saveTextureToLocal(fullPath);
                    // canvasScript.onMessagePrefabNeeded(null, "保存二维码到相册成功!");
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "保存二维码到相册成功!")
                }
                else {
                    console.error("save image data failed!");
                    console.log("保存图片失败")
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "保存二维码到相册失败!")

                }
            }
        } else {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "Web端不支援此功能!")
        }
        
    }
}


