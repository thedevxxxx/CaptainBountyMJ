import { _decorator, Component, Node, ScrollView, Label } from 'cc';
import { Database } from '../Database_test';
import * as cc from 'cc';
import { commonVal } from '../proxy-http_test';
import { p9_bdsz_script_test } from './p9_bdsz_script_test';
import { yjcx_p9_test } from './yjcx_p9_test';
const { ccclass, property } = _decorator;

@ccclass('P16DyszTest')
export class P16DyszTest extends Component {
    @property(Node)
    public Item: cc.Node | null = null;
    @property(Node)
    public pageItem: cc.Node | null = null;
    @property(ScrollView)
    public sv: cc.ScrollView | null = null;
    @property(Label)
    public totalPage: cc.Label | null = null;
    @property(Label)
    public nowdate: cc.Label | null = null;
    @property(Node)
    public pageLayout: cc.Node | null = null;
    @property(Node)
    public mid: cc.Node | null = null;
    @property(Label)
    public jumpIndex: cc.Label | null = null;
    @property(Label)
    public firstdate: cc.Label | null = null;
    @property(Label)
    public enddate: cc.Label | null = null;
    @property(Node)
    public xjbl_btn: cc.Node | null = null;
    @property
    public pageNodes = [];
    @property(Node)
    public page9_frame: cc.Node | null = null;
    @property(ScrollView)
    public page9_sv: cc.ScrollView | null = null;
    @property(Node)
    public page9_content: cc.Node | null = null;
    @property(Label)
    public page9_search_str: cc.Label | null = null;
    @property(Node)
    public page9_bdsz: cc.Node | null = null;
    @property
    public page9_btn = true;
    btn;
    data;
    currentPage;
    minPage;
    maxPage;
    currentMaxPage;
    currentMinPage;
    datapage;

    onLoad() {
    }
    checkMyAgent(event: any, num: any) {
        if (this.page9_btn) {
            this.page9_btn = false
            this.scheduleOnce(() => {
                this.page9_btn = true
            }, 0.6);
            if (hqq.app.pinpai == "juding") {
                if (Database.p9_dz_aumont == '100元。' && Database.p9_qp_aumont == '100元。') {
                    cc.log('无规则');
                    let agent_zjzr = cc.find('agent_wdwj/jd_agent_btn_zjzr', this.node)
                    let azhnhz = cc.find('agent_wdwj/jd_agent_btn_zhnhz', this.node)
                    agent_zjzr.active = false
                    azhnhz.active = false
                }
            }
            this.btn = true;
            Database.page9_wjmx = [];
            function check() {
                // this.currentPage = 1; //当前页码
                // this.minPage = 1; //最小页码
                //num 是页码
                return new Promise((resolve, reject) => {
                    commonVal.getallchilds9(commonVal.account_name, resolve, num)
                })
            }
            check().then(
                (value) => {
                    cc.log('p9-------------');
                    this.data = Database.page9_wjmx;
                    Database.page9_ids = [];
                    this.page9_sv.content.removeAllChildren();
                    this.page9_sv.scrollToTop();
                    cc.log('p9-------------1');
                    this.currentPage = 1; //当前页码
                    this.datapage = 1;//数据分页
                    this.minPage = 1; //最小页码
                    this.maxPage = Math.ceil(Database.zsxjwjzs / 8);
                    const promise1 = new Promise((resolve) => {
                        if (Database.page9_wjmx) {
                            for (let index = 0; index < Database.page9_wjmx.length; index++) {
                                Database.page9_ids.push(Database.page9_wjmx[index].id)
                            }
                            commonVal.getProxyUserNumber(Database.page9_ids, resolve)
                        }
                    });
                    Promise.all([promise1]).then((values) => {
                        cc.log('进来了1');
                        this.page9setPageData()
                        cc.log('进来了2');
                        this.page9setPageIndex();
                    })
                },
                function (error) {
                    console.error("出错了", error);
                },
            )
        }
    }

    checkMyAgents(num: any) {
        if (hqq.app.pinpai == "juding") {
            if (Database.p9_dz_aumont == '100元。' && Database.p9_qp_aumont == '100元。') {
                cc.log('无规则');
                let agent_zjzr = cc.find('agent_wdwj/jd_agent_btn_zjzr', this.node)
                let azhnhz = cc.find('agent_wdwj/jd_agent_btn_zhnhz', this.node)
                agent_zjzr.active = false
                azhnhz.active = false
            }
        }
        this.btn = true;
        Database.page9_wjmx = [];
        function check() {
            return new Promise((resolve, reject) => {
                commonVal.getallchilds9(commonVal.account_name, resolve, num)
            })
        }
        check().then(
            (value) => {
                this.data = Database.page9_wjmx;
                Database.page9_ids = [];
                this.page9_sv.content.removeAllChildren();
                this.page9_sv.scrollToTop();
                this.currentPage = 1; //当前页码
                this.datapage = 1;//数据分页
                this.minPage = 1; //最小页码
                this.maxPage = Math.ceil(Database.zsxjwjzs / 8);
                const promise1 = new Promise((resolve) => {
                    if (Database.page9_wjmx) {
                        for (let index = 0; index < Database.page9_wjmx.length; index++) {
                            Database.page9_ids.push(Database.page9_wjmx[index].id)
                        }
                        commonVal.getProxyUserNumber(Database.page9_ids, resolve)
                    }
                });
                Promise.all([promise1]).then((values) => {
                    this.page9setPageData()
                    this.page9setPageIndex();
                })
            },
            function (error) {
                console.error("出错了", error);
            },
        )
    }
    //page9 设置页面数据
    page9setPageData() {
        //this.data 是所有的个人信息 也就是每个日期的第一条数据
        let endIndex
        let startIndex
        endIndex = this.currentPage * 8;
        startIndex = (this.currentPage - 1) * 8
        endIndex = endIndex > Database.page9_wjmx.length ? Database.page9_wjmx.length : endIndex;
        this.page9_sv.content.removeAllChildren();
        this.page9_sv.scrollToTop();
        for (var i = startIndex; i < endIndex; ++i) {
            this.page9setItemData(Database.page9_wjmx[i]);
        }
    }
    //page9 翻页后设置页面数据
    page9ctsetPageData() {
        let currentP = this.currentPage - (this.datapage - 1) * 3
        let endIndex
        let startIndex
        //this.data 是所有的个人信息 也就是每个日期的第一条数据
        endIndex = currentP * 8;
        startIndex = (currentP - 1) * 8
        endIndex = endIndex > Database.page9_wjmx.length ? Database.page9_wjmx.length : endIndex;
        cc.log('startIndex===', startIndex, 'endIndex==', endIndex);
        this.page9_sv.content.removeAllChildren();
        this.page9_sv.scrollToTop();
        for (var i = startIndex; i < endIndex; ++i) {
            this.page9setItemData(Database.page9_wjmx[i]);
        }
    }
    //page9 设置单个条目数据
    page9setItemData(data: any) {
        console.log(data);
        let newItem = cc.instantiate(this.page9_frame);
        newItem.active = true;
        //注册时间
        let time = Database.format(parseInt(data.login_time) * 1000)
        if (hqq.app.pinpai == 'juding') {
            cc.find("label2", newItem).getComponent(cc.Label).string = data.proxy_nick
        } else {
            cc.find("label2", newItem).getComponent(cc.Label).string = time
        }
        //玩家id
        cc.find("label1", newItem).getComponent(cc.Label).string = data.id
        //直属人数
        cc.find("label3", newItem).getComponent(cc.Label).string = data.direct_number
        //团队人数
        if (data.count != undefined) {
            cc.find("label4", newItem).getComponent(cc.Label).string = data.count
        } else {
            cc.find("label4", newItem).getComponent(cc.Label).string = '0'
        }
        let btn = newItem.getChildByName("label5") // 棋牌
        let btn2 = newItem.getChildByName("label6") //电子
        let btn3 = newItem.getChildByName("label7") //查看详情
        //按钮1
        // var clickEventHandler = new cc.EventHandler();
        // clickEventHandler.target = cc.find("bdsz_pop", this.node); // 这个 node 节点是你的事件处理代码组件所属的节点
        // clickEventHandler.component = "p9_bdsz_script_test"; // 这个是代码文件名
        // clickEventHandler.handler = "setdata";
        // clickEventHandler.customEventData = data.id, 1;
        // var button = btn.getComponent(cc.Button);
        // button.clickEvents.push(clickEventHandler);

        btn.on("click", () => {
            cc.log('juding111111');
            Database.clickSound(Database.hall_sound)
            this.page9_bdsz.getComponent(p9_bdsz_script_test).setdata(data.id, 1) //棋牌
        })
        //按钮2
        // var clickEventHandler = new cc.EventHandler();
        // clickEventHandler.target = cc.find("bdsz_pop", this.node); // 这个 node 节点是你的事件处理代码组件所属的节点
        // clickEventHandler.component = "p9_bdsz_script_test"; // 这个是代码文件名
        // clickEventHandler.handler = "setdata";
        // clickEventHandler.customEventData = data.id, Database.p10_num;
        // var button = btn2.getComponent(cc.Button);
        // button.clickEvents.push(clickEventHandler);

        btn2.on("click", () => {
            Database.clickSound(Database.hall_sound)
            this.page9_bdsz.getComponent(p9_bdsz_script_test).setdata(data.id, Database.p10_num) //电子 等类型
        })
        //按钮3
        // var clickEventHandler = new cc.EventHandler();
        // clickEventHandler.target = cc.find("yjcx", this.node); // 这个 node 节点是你的事件处理代码组件所属的节点
        // clickEventHandler.component = "yjcx_p9_test"; // 这个是代码文件名
        // clickEventHandler.handler = "get_data";
        // clickEventHandler.customEventData = data.id;
        // var button = btn3.getComponent(cc.Button);
        // button.clickEvents.push(clickEventHandler);

        btn3.on("click", () => {
            cc.log('juding55555=', data.id);
            Database.clickSound(Database.hall_sound)
            let p9_yjcx = this.node.getChildByName('yjcx')
            p9_yjcx.active = true;
            p9_yjcx.getComponent(yjcx_p9_test).get_data(data.id)
        })
        if (hqq.app.pinpai == "juding") {
            if (Database.p9_qp_aumont == '100元。') {
                btn.active = false;
            }
            if (Database.p9_dz_aumont == '100元。') {
                btn2.active = false;
            }
        }
        if (hqq.app.pinpai == "huaxing") {
            if (Database.p9_qp_aumont == '160元。') {
                btn.active = false;
            }
            if (Database.p9_dz_aumont == '80元。') {
                btn2.active = false;
            }
        }
        this.page9_sv.content.addChild(newItem);
    }
    //page9 设置页码显示
    page9setPageIndex() {
        cc.log('page9setPageIndex设置页面');
        this.pageNodes = [];
        this.pageLayout.removeAllChildren();
        let pageNum = this.maxPage > 3 ? 3 : this.maxPage;
        this.currentMinPage = 1;
        this.currentMaxPage = pageNum;
        if (pageNum < 1) pageNum = 1;
        for (var i = 0; i < pageNum; ++i) {
            var pItem = cc.instantiate(this.pageItem);
            pItem.active = true;
            pItem.getChildByName("pageIndex").getComponent(cc.Label).string = (i + 1) + '';
            pItem.getChildByName("agent_di_chosen").active = (i == 0);
            this.pageLayout.addChild(pItem);
            this.pageNodes.push(pItem);
        }
    }
    // page9 翻页函数
    pageUporDown(event: any, flag: any) {
        Database.clickSound(Database.hall_sound)
        if (this.btn) {
            if (flag == "1") {
                if (this.currentPage >= this.maxPage) return;
                this.currentPage++;
            } else {
                if (this.currentPage <= this.minPage) return;
                this.currentPage--;
            }
            cc.log('this.currentPage====', this.currentPage, 'this.currentMinPage==', this.currentMinPage, 'this.maxPage====', this.maxPage);
            if (this.currentPage > this.currentMaxPage) {
                for (var i = 0; i < this.pageNodes.length; ++i) {
                    let pageNum = this.currentPage - this.pageNodes.length + 1 + i;
                    this.pageNodes[i].getChildByName("pageIndex").getComponent(cc.Label).string = pageNum;
                    this.pageNodes[this.pageNodes.length - 1].getChildByName("agent_di_chosen").active = true;
                }
                this.currentMaxPage = this.currentPage;
                this.currentMinPage++;
            } else if (this.currentPage < this.currentMinPage) {
                for (var i = 0; i < this.pageNodes.length; ++i) {
                    let pageNum = this.currentMaxPage - this.pageNodes.length + i;
                    this.pageNodes[i].getChildByName("pageIndex").getComponent(cc.Label).string = pageNum;
                    this.pageNodes[0].getChildByName("agent_di_chosen").active = true;
                }
                this.currentMinPage = this.currentPage;
                this.currentMaxPage--;
            } else {
                for (var i = 0; i < this.pageNodes.length; ++i) {
                    let index = (this.currentPage - this.currentMinPage);
                    this.pageNodes[i].getChildByName("agent_di_chosen").active = (i == index);
                }
            }
            this.page9ctsetPageData()
        }
    }
    //page9 页面数据查询
    page9search() {
        this.pageLayout.removeAllChildren();
        if (hqq.app.pinpai == 'huaxing' && Database.loadview != null) {
            Database.loadview.active = true;
        }
        Database.clickSound(Database.hall_sound)
        cc.log('id======', this.page9_search_str.string);
        this.page9_sv.content.removeAllChildren();
        this.page9_sv.scrollToTop();
        let strid = this.page9_search_str.string
        if (this.page9_search_str.string != '') {
            function check() {
                return new Promise((resolve, reject) => {
                    commonVal.p9_GetProxyUser(strid, resolve)
                })
            }
            check().then(
                (value) => {
                    if (hqq.app.pinpai == 'huaxing' && Database.loadview != null) {
                        Database.loadview.active = false;
                    }
                    const promise1 = new Promise((resolve) => {
                        commonVal.p9_getProxyUserNumber(strid, resolve)
                    });
                    Promise.all([promise1]).then((values) => {
                        cc.log('Database.page9_wjmx[1]===', Database.page9_wjmx[1]);
                        cc.log(' Database.p9_dlsj===', Database.p9_dlsj);
                        //if (Database.p9_dlsj != "proxy user is not found") {
                        this.page9setItemData(Database.p9_dlsj);
                        // }
                    })
                },
                function (error) {
                    console.error("出错了", error);
                },
            )
            let input = this.node.getChildByName("agent_wdwj").getChildByName('input').getChildByName("New EditBox")
            input.getComponent(cc.EditBox).string = '' //清空输入框最有效方法
            // if (Database.p9_dlsj != "proxy user is not found") {
            this.pageNodes = [];
            this.pageLayout.removeAllChildren();
            var pItem = cc.instantiate(this.pageItem);
            pItem.active = true;
            pItem.getChildByName("pageIndex").getComponent(cc.Label).string = 1 + '';
            pItem.getChildByName("agent_di_chosen").active = true;
            this.pageLayout.addChild(pItem);
            this.pageNodes.push(pItem);
            this.page9_search_str.string = ''
            this.btn = false;
            // }
        } else {
            this.checkMyAgents(1)
        }
    }

    setPageIndex() {
        cc.log('设置页面');
        this.pageNodes = [];
        this.pageLayout.removeAllChildren();
        let pageNum = this.maxPage > 3 ? 3 : this.maxPage;
        this.currentMinPage = 1;
        this.currentMaxPage = pageNum;
        if (pageNum < 1) pageNum = 1;
        for (var i = 0; i < pageNum; ++i) {
            var pItem = cc.instantiate(this.pageItem);
            pItem.active = true;
            pItem.getChildByName("pageIndex").getComponent(cc.Label).string = (i + 1) + '';
            pItem.getChildByName("agent_di_chosen").active = (i == 0);
            this.pageLayout.addChild(pItem);
            this.pageNodes.push(pItem);
        }
    }
    //跳转页面
    jumpToIndex() {
        let targetIndex = Number(this.jumpIndex.string);
        if (targetIndex > this.maxPage || targetIndex < 1) return;
        this.currentPage = targetIndex;
        this.currentMaxPage = targetIndex < 3 ? 3 : targetIndex;
        this.currentMinPage = targetIndex < 3 ? 1 : targetIndex - 2;
        for (var i = 0; i < this.pageNodes.length; ++i) {
            let pageNum = null;
            if (targetIndex < 3) {
                pageNum = 3 - 2 + i
                this.pageNodes[i].getChildByName("agent_di_chosen").active = (this.currentPage - 1) == i;
            } else {
                pageNum = this.currentPage - this.pageNodes.length + 1 + i;
                this.pageNodes[i].getChildByName("agent_di_chosen").active = (this.pageNodes.length - 1) == i;
            }
            this.pageNodes[i].getChildByName("pageIndex").getComponent(cc.Label).string = pageNum;
        }
        // this.setPageData();
    }
    //按日期查询接口
    searchByDate() {
        let firstdt = []
        let enddt = []
        if (this.firstdate.string != "年/月/日") {
            firstdt = this.firstdate.string.split("/")
        }
        enddt = this.enddate.string.split("/")
        let fristmonth = parseInt(firstdt[1]) < 10 ? "0" + firstdt[1] : firstdt[1]
        let firstday = parseInt(firstdt[2]) < 10 ? "0" + firstdt[2] : firstdt[2]
        let lastmonth = parseInt(enddt[1]) < 10 ? "0" + enddt[1] : enddt[1]
        let lasttday = parseInt(enddt[2]) < 10 ? "0" + enddt[2] : enddt[2]
        let myDate = new Date()
        let nowyear = myDate.getFullYear()
        let nowmonth = myDate.getMonth() + 1;
        let nowday = myDate.getDate();
        let data_d = new Date(firstdt[0], firstdt[1], 0);
        cc.log('data_d==', data_d);
        let data_num = data_d.getDate()
        cc.log('data_num==', data_num);
        let dds = 15 - 30 + data_num;
        cc.log(firstdt[0], firstdt[1], data_num, nowyear, nowmonth, nowday, 'dds==', dds);
        let fifteenDays = false;
        if (parseInt(firstdt[0]) == nowyear && parseInt(firstdt[1]) == nowmonth && nowday - parseInt(firstdt[2]) <= 15) {
            fifteenDays = true
        } else if (parseInt(firstdt[0]) == nowyear && parseInt(firstdt[1]) - nowmonth == -1 && parseInt(firstdt[2]) - nowday >= dds) {
            fifteenDays = true
        } else if (parseInt(firstdt[0]) - nowyear == -1 && parseInt(firstdt[1]) == 12 && nowmonth == 1 && parseInt(firstdt[2]) - nowday >= dds) {
            fifteenDays = true
        } else {
            cc.log("日期输入超过15天");
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "日期输入有误...")
        }
        if (fifteenDays) {
            if (parseInt(enddt[1]) - parseInt(firstdt[1]) == 1 && parseInt(firstdt[2]) - parseInt(enddt[2]) >= 0 && parseInt(firstdt[1]) != 0) {
                function check() {
                    return new Promise((resolve, reject) => {
                        let firstdate = firstdt[0] + "-" + fristmonth + "-" + firstday
                        let lastdate = enddt[0] + "-" + lastmonth + "-" + lasttday
                        commonVal.GetStatementDividendInfo(commonVal.gametags, commonVal.token, firstdate, lastdate, resolve)
                    })
                }
                check().then(
                    (value) => {
                        this.pageNodes = [];
                        this.data = Database.getData1();
                        this.currentPage = 1; //当前页码
                        this.minPage = 1; //最小页码
                        this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                        //this.setalldata();
                        //this.setPageData();
                        this.setPageIndex();
                    },
                    function (error) {
                        console.error("出错了", error);
                    },
                )
            } else if (parseInt(enddt[1]) - parseInt(firstdt[1]) == 0 && parseInt(enddt[2]) - parseInt(firstdt[2]) >= 0) {
                function check() {
                    return new Promise((resolve, reject) => {
                        let firstdate = firstdt[0] + "-" + fristmonth + "-" + firstday
                        let lastdate = enddt[0] + "-" + lastmonth + "-" + lasttday
                        commonVal.GetStatementDividendInfo(commonVal.gametags, commonVal.token, firstdate, lastdate, resolve)
                    })
                }
                check().then(
                    (value) => {
                        cc.log('得到前两列数据后请求后两列数据', this.data);
                        this.pageNodes = [];
                        this.data = Database.getData1();
                        this.currentPage = 1; //当前页码
                        this.minPage = 1; //最小页码
                        this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                        this.totalPage.string = "共 " + this.maxPage + " 页";
                        //this.setalldata();
                        //this.setPageData();
                        this.setPageIndex();
                    },
                    function (error) {
                        console.error("出错了", error);
                    },
                )
            } else if (parseInt(enddt[0]) - parseInt(firstdt[0]) == 1 && parseInt(enddt[1]) == 1 && parseInt(firstdt[1]) == 12 && parseInt(firstdt[2]) - parseInt(enddt[2]) >= 0) {
                function check() {
                    return new Promise((resolve, reject) => {
                        let firstdate = firstdt[0] + "-" + fristmonth + "-" + firstday
                        let lastdate = enddt[0] + "-" + lastmonth + "-" + lasttday
                        commonVal.GetStatementDividendInfo(commonVal.gametags, commonVal.token, firstdate, lastdate, resolve)
                    })
                }
                check().then(
                    (value) => {
                        cc.log('得到前两列数据后请求后两列数据', this.data);
                        this.pageNodes = [];
                        this.data = Database.getData1();
                        this.currentPage = 1; //当前页码
                        this.minPage = 1; //最小页码
                        this.maxPage = Math.ceil(this.data.length / 10); //最大页码
                        this.totalPage.string = "共 " + this.maxPage + " 页";
                        //this.setalldata();
                        //this.setPageData();
                        this.setPageIndex();
                    },
                    function (error) {
                        console.error("出错了", error);
                    },
                )
            } else if (parseInt(enddt[1]) - parseInt(firstdt[1]) == 0 && parseInt(enddt[2]) - parseInt(firstdt[2]) < 0) {
                cc.log("结束时间小于开始时间");
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "结束时间小于开始时间")
            } else {
                cc.log("日期输入有误...");
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "日期输入有误...")
            }
        } else {
            cc.log("日期输入超过15天...");
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "日期输入有误...")
        }
    }

    mybl() {
        // let wdbl_pop = this.node.getChildByName("wdbl_pop");
        // this.mid.active = true;
        // wdbl_pop.getComponent("wdbl_pop").getDividendRule(hqq.gameGlobal.player.account_name)
    }

    xjbl() {
        //this.mid.active = true;
        //let xjbl_pop = this.node.getChildByName("xjbl_pop");
        //xjbl_pop.getComponent("xjbl_pop").search()
    }

    zjzr() {
        //Database.clickSound(Database.hall_sound)
        //let zjzr_pop = this.node.getChildByName("zjzr_pop");
        //this.mid.active = true
        //cc.log('资金转入比例');
        //zjzr_pop.getComponent("zjzr_pop_p9").setData()
    }

    znzjhz() {
        //Database.clickSound(Database.hall_sound)
        //let num = (Database.balance + '').split(".")
        //let nums = num[0];
        //if (parseFloat(nums) < 500) {
        //    cc.log('佣金余额不足500');
        //    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, "佣金余额不足500金币, 无法转账")
        //} else {
        //    let znzjhz = this.node.getChildByName("znzjhz");
        //    this.mid.active = true
        //    cc.log('资金转入比例');
        //    znzjhz.getComponent("zhnhz_pop").setData()
        //}
    }

    OPenCalendar(event: any, num: any) {
        Database.clickSound(Database.hall_sound)
        if (num == "1") {
            let status = this.node.getChildByName("UIDatePicker1").active;
            this.node.getChildByName("UIDatePicker1").active = !status;
        }
        if (num == "2") {
            let status = this.node.getChildByName("UIDatePicker2").active;
            this.node.getChildByName("UIDatePicker2").active = !status;
        }
    }
    //点开日期选择
    n2_openchoose() {
        let status = this.node.getChildByName("btn_search");
        status.active = !status.active
    }

    search_p10(event: any, num: any) {
        let status = this.node.getChildByName("btn_search");
        status.active = false;
        let data_type = this.node.getChildByName("bg").getChildByName("btn_choose").getChildByName('type').getComponent(cc.Label);
        if (num == 0) {
            data_type.string = '今日预估'
            Database.n2_date_p9 = num
        } else if (num == -1) {
            data_type.string = '昨天'
            Database.n2_date_p9 = num
        } else if (num == 'week') {
            data_type.string = '本周'
            Database.n2_date_p9 = num
        } else if (num == 'lastweek') {
            data_type.string = '上周'
            Database.n2_date_p9 = num
        } else if (num == 'month') {
            data_type.string = '本月'
            Database.n2_date_p9 = num
        }
        this.checkMyAgents(1)
    }

    OPenguize() {
        Database.clickSound(Database.hall_sound)
        //let status = this.node.getChildByName("gz_pop");
        //status.getComponent("p9_gz_n2").setData()
    }

    close() {
        Database.clickSound(Database.hall_sound)
        this.sv.scrollToTop();
        this.sv.content.removeAllChildren();
        this.mid.active = false;
        this.node.active = false;
    }

}



