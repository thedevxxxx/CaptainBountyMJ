//充值子界面

import { _decorator, Component, Node, Label, Prefab } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;
import { Language_pay } from "./payLanguage_1";
@ccclass('PayJisu1')
export default class PayJisu1 extends Component {
    
    @property(Node)
    selectContent: Node | null =null;
    @property(Label)
    amountLabel: Label | null = null;
    @property(Node)
    neikuagn : Node | null = null;
    @property(Prefab)
    SelectItem: Prefab | null =null;
    @property(Prefab)
    BindBankAccountTipAlert : Prefab | null = null;
    @property(Prefab)
    btnNum : Prefab | null = null;
    @property(Prefab)
    JisuOrderAlert :Prefab | null = null;
    @property(Prefab)
    BeforePayOrderAlert :Prefab | null = null;
    
    public app  = null;
    public results : any = {};
    public current : any = {
        min_amount:0,
        max_amount:0
    };
    public channel  = 'alipay';
    conf_val = 0 // usdt充值汇率
    login_ip = ''
    IsBindBankAunt = false // 判断是否已经绑卡
    free_num = 0//免费次数
    handling_fee = 0//手续费
    first_min = 0//小额渠道显示的充值金额第一次
    second_min = 0//小额渠道显示的充值金额第二次
    handling_feeName = ""//需要显示手续费的渠道名
    game_gold = 0 // 余额
    showBaopeiTip = false
    payment_id = 0 // 极速充值payment_id
    amount_list = []//常用金额
    amount_rule = []//极速充值2，输入金额充值范围
    writeAmount  = false //极速充值2，判断是否是手动输入的
    order_id = ""//订单号
    init(channel){
        this.channel = channel
    }
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        //请求支付宝
        this.fetchZfb()
        if(hqq.gameGlobal.ipList) {
            this.login_ip = hqq.gameGlobal.ipList[0]
        }else{
            console.log("获取登陆ip失败!")
            this.app.showAlert("获取登陆ip失败!")
        }
        if(this.channel == "极速充值"){
            this.fetchgetHighSpeedTransferPayRange()
            cc.systemEvent.on('closeRechargeHistory',this.fetchgetHighSpeedTransferPayRange.bind(this))
        }else if(this.channel == "极速充值2"){
            this.fetchgetHighSpeedTransferPayRangeTwo()
            cc.systemEvent.on('closeRechargeHistory',this.fetchgetHighSpeedTransferPayRangeTwo.bind(this))
        }
    }
    setAmount() {
        if(this.channel == "极速充值"){
            this.app.showAlert("请点选充值金额")
        }else{
            this.app.showKeyBoard(this.amountLabel,1,()=>{
                this.writeAmount = true
                this.payment_id = 0
            });
        }
    }
    public fetchZfb(){
        var url = `${this.app.UrlData.host}/api/payment/aliPayPaymentIndex?user_id=${this.app.UrlData.user_id}`;
        let index = `0`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading()
            if(response.status == 0){
                let discount_rate = response.data.discount_rate
                if(this.channel == "极速充值2"){
                    self.results = response.data.pq_pay2;
                    this.setDiscount_rate(discount_rate.jisu_recharge2)
                }else{
                    self.results = response.data.pq_pay;
                    this.setDiscount_rate(discount_rate.jisu_recharge)
                }
                //验证有没有绑卡
                this.fetchIndex()
                self.current = self.results[0];
                self.handling_feeName = self.results[0]
                self.radioList();
                self.initRender(0);
            }else{
                self.app.hideLoading()
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading()
        })
    }
    public fetchgetHighSpeedTransferPayRange(){
        var url = `${this.app.UrlData.host}/api/payment/getHighSpeedTransferPayRange?user_id=${this.app.UrlData.user_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                //删除旧的选项
                this.neikuagn.removeAllChildren()
                this.amount_list = response.data.amount_list
                console.log("更新常用金额",response.data.amount_list,this.amount_list)
                if(response.data.amount_list.length > 18){
                    response.data.amount_list= response.data.amount_list.slice(0,18)
                }
                response.data.amount_list.forEach((e)=>{
                    var node = cc.instantiate(this.btnNum)
                    node.getComponent("PayBtnNum1").init(e.amount,this.addGold.bind(this),e.id)
                    this.neikuagn.addChild(node)
                })
                
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    //极速充值2 取得充值可用面額(不用帶值)
    public fetchgetHighSpeedTransferPayRangeTwo(){
        var url = `${this.app.UrlData.host}/api/payment/getHighSpeedTransferPayRangeTwo?user_id=${this.app.UrlData.user_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                //删除旧的选项
                this.neikuagn.removeAllChildren()
                let arr = []
                //优先选择10个有id的常用金额，
                if(response.data.available_list.length > 10){
                    arr = response.data.available_list.slice(0,10)
                }else{
                    arr = response.data.available_list
                }
                //剩下的从固定金额里面取
                response.data.fixed_list.forEach(e=>{
                    if(arr.length <18){
                        arr.push({
                            id:0,
                            amount:Number(e)
                        })
                    }
                })
                this.amount_list = arr
                arr.forEach((e)=>{
                    var node = cc.instantiate(this.btnNum)
                    node.getComponent("PayBtnNum1").init(e.amount,this.addGold.bind(this),e.id)
                    this.neikuagn.addChild(node)
                })
                this.amount_rule = response.data.amount_rule
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    setDiscount_rate(discount_rate_item) {
        let percent = 0
        let minAmount = 0
        let maxAmount = 0
        discount_rate_item.forEach( (e,i) => {
            if(e.package_id == this.app.UrlData.package_id) {
                percent = e.interval[0].percent
                minAmount = e.interval[0].min
                maxAmount = e.interval[0].max
            }
        });
    }
    public initRender(index){
        //根据选择的index不同，选择对应的渠道
        if(this.results[index].rate != "" && this.results[index].rate !="0.0000"){
            let rate = {}
            try{
                rate = JSON.parse(this.results[index].rate)
            }catch(err){
                console.log("err",err,"rate",this.results[index])
            }
            //当rate不为空时要根据渠道id判断是否需要显示
            let packageArr= []
            for(let k in rate){
                packageArr.push(Number(k))
            }
            if(packageArr.indexOf(this.app.UrlData.package_id)>-1){
                this.free_num = rate[this.app.UrlData.package_id].free_num
                this.handling_fee = rate[this.app.UrlData.package_id].handling_fee
                this.first_min = rate[this.app.UrlData.package_id].first_min
                this.second_min = rate[this.app.UrlData.package_id].second_min
                this.handling_feeName = this.results[index].name
            }
        }
    }
    public deleteAmount(){
        this.amountLabel.string = '';
        this.app.setInputColor("sum",this.amountLabel);
        this.writeAmount = false
    }

    //确认充值按钮回调
    public onClick(){
        //按键音效
        this.app.loadMusic(1);
        this.DelayBtn()
        if(this.showBaopeiTip){
            this.app.showAlert("您正在参加新用户包赔活动, 为了避免造成不必要的损失, 请您完成新用户包赔活动再进行充值（领取包赔金或兑换过即视为完成活动）！") 
            return
        }
        if((this.channel == 'bankcard_transfer' || this.channel =="bank_pay" )&& !this.IsBindBankAccount){
            this.showBindBankAccountTip()
            return
        }
        if(this.amountLabel.string == ''||this.amountLabel.string == '点击输入'){
            this.app.showAlert('充值金额不能为空!')
        }else if(this.writeAmount){
            let amount = Number(this.amountLabel.string)
            let index = 0
            let min = 100
            let max = 0
            this.amount_rule.forEach((e,i)=>{
                if(amount>=Number(e.min) && amount<= Number(e.max)){
                    index = i
                }
                if(Number(e.min)<min){
                    min = Number(e.min)
                }
                if(Number(e.max)>max){
                    max = Number(e.max)
                }
            })
            let range = this.amount_rule[index].range
            if(amount>max || amount<min){
                this.app.showAlert(`不符合充值范围(${min}-${max})`)
            }else if(amount%range == 0){
                this.fetchOrder();
            }else{
                this.app.showAlert(`充值金额必须是${range}的倍数`)
            }
        }else{
            this.fetchOrder();
        }
    }
    
    DelayBtn(){
        let czgoldbt1= cc.find("Canvas/Recharge/Content/Jisu/czgoldbt1").getComponent(cc.Button)
        czgoldbt1.interactable = false
        this.scheduleOnce(()=>{
            czgoldbt1.interactable = true
        },1)
    }
    fetchOrder(){
        let data = {
            amount:this.amountLabel.string,
            channel_id:this.current.channel_id,
            pay_type:this.current.pay_type,
            order_type:1,
            payment_id:this.payment_id
        };
        this.showJisuOrderAlert(1,data);
    }
    /**
     * 显示订单弹窗
     * @param type 
     * @param data 
     */
    public showJisuOrderAlert(type,data,beforePay = true){
        var node = null
        var beforePayOrder = null
        node = cc.instantiate(this.JisuOrderAlert);
        beforePayOrder = cc.instantiate(this.BeforePayOrderAlert);
        var canvas = cc.find('Canvas');
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/JisuOrderAlert")){
            canvas.addChild(node);
        }
        //弹出提示确认框
        if(beforePay){
             //检测是否已存在弹窗，避免重复显示
            if(!cc.find("Canvas/BeforePayOrderAlert")){
                canvas.addChild(beforePayOrder);
            }
        }
        node.getComponent('PayJisuOrderAlert1').init(type,data,()=>{},this.channel)
    }
    radioList(){
        this.selectContent.removeAllChildren();
        for( var i = 0 ; i < this.results.length ; i++){
            let show = false
            let package_ids = this.results[i].package_ids.split(",")
            package_ids.forEach(e=>{
                if(Number(e) == this.app.UrlData.package_id){
                    show = true
                }
            })
            console.log("this.results[i]",this.results[i])
            if(show){
                if(this.results[i].rate != "" && this.results[i].rate !="0.0000"){
                    let rate = {}
                    try{
                        rate = JSON.parse(this.results[i].rate)
                    }catch(err){
                        console.log("err",err,"rate",this.results[i])
                    }
                    //当rate不为空时要根据渠道id判断是否需要显示
                    let packageArr= []
                    for(let k in rate){
                        packageArr.push(Number(k))
                    }
                    if(packageArr.indexOf(this.app.UrlData.package_id)>-1){
                        var node = cc.instantiate(this.SelectItem);
                        this.selectContent.addChild(node);
                        node.getComponent('PaySelectItem1').init({
                            text:this.results[i].name,
                            parentComponent:this,
                            index:i,
                            channel:this.channel,
                            min_amount:this.current.min_amount,
                            max_amount:this.current.max_amount,
                            handling_fee:rate[this.app.UrlData.package_id].handling_fee,
                        })
                    }
                }else{
                    var node = cc.instantiate(this.SelectItem);
                    this.selectContent.addChild(node);
                    node.getComponent('PaySelectItem1').init({
                        text:this.results[i].name,
                        parentComponent:this,
                        index:i,
                        channel:this.channel,
                        min_amount:this.current.min_amount,
                        max_amount:this.current.max_amount,
                    })
                }
            }
        }
    }
    addGold(e,payment_id){
        //按键音效
        this.app.loadMusic(1);
        var string = e.currentTarget.children[1].getComponent(cc.Label).string;
        let amount = this.amountLabel.string == Language_pay.Lg.ChangeByText('点击输入') ? '0': this.amountLabel.string;
        var sum = Number(amount)+Number(string);
        this.amountLabel.string = string;
        this.app.setInputColor(sum,this.amountLabel);
        this.payment_id = payment_id
    }
    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                let bankData = [];
                let data = response.data;
                for(let i = 0 ;i < data.list.length ;i++){
                    let data = response.data.list[i];
                    if (data.type == 3){
                        bankData.push(data)
                    }
                }
                if(bankData.length == 0){
                    //提示绑卡
                    this.showBindBankAccountTip()
                }else{
                    this.IsBindBankAccount =true
                }
                this.game_gold = response.data.game_gold
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            this.app.hideLoading();
        })
    }
    showBindBankAccountTip(){
        let canvas = cc.find("Canvas")
        let node = null
        node = cc.instantiate(this.BindBankAccountTipAlert)
        node.getComponent("PayBindBankAccountTipAlert1").init(this)
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/BindBankAccountTipAlert")){
            canvas.addChild(node);
        }
    }
    //显示弹窗
    showAccountAlert(){
        this.app.showBankAccountAlert({
            text: '设置银行卡',
            action:"add",
            itemId:null,
            parentComponent:this,
            changeData:false
        });
    }
    //渠道16显示绑卡
    showAccountAlert_16(){
        this.node.getChildByName("bindBankAccount").active = true
        this.node.getChildByName("Bank").active = false
        if(this.node.name == "Jisu"){
            this.node.getChildByName("zi").active = false
        }
        this.node.getComponent("PayBankAccountAlert1").init({
            text:'设置银行卡',
            action:"add",
            itemId:null,
            parentComponent:this,
            //修改界面初始数据
            changeData:false
        })
    }
    onDestroy(){
        cc.systemEvent.off('closeRechargeHistory')
    }
}
