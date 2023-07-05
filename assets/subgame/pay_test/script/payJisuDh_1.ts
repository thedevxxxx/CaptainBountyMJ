import { _decorator, Component, Prefab, Label, Node} from 'cc';
import * as cc from 'cc';
import {Language_pay} from './payLanguage_1';
const {ccclass, property} = _decorator;

@ccclass('PayJisuDh1')
export default class PayJisuDh1 extends Component {
    @property(Prefab)
    SelectItem : Prefab | null =null;
    @property(Prefab)
    CashAlert: Prefab | null = null;
    @property(Prefab)
    JisuCyjeAlert:Prefab | null = null;
    @property(Label)
    goldLabel: Label | null = null;
    @property(Label)
    amountLabel: Label | null = null;
    @property(Node)
    selectContent :Node | null = null;
    @property(Label)
    accountLabel: Label | null = null;
    @property(Node)
    accountBtn: Node | null = null;
    @property(Node)
    DhBtn: Node | null = null;
    @property(Node)
    JsQrAlert: Node | null = null;
    @property(Node)
    JsTimeOutAlert: Node | null = null;
    @property(Label)
    timerLabel: Label | null = null;
    @property(Node)
    hongliGroup:Node | null = null;
    @property(Label)
    depostLabel:Label | null = null;
    @property(Label)
    boundsLabel:Label | null = null;
    
    public data : any = {};
    public showSelect = false;
    public results= null ;
    public current = {channel_name: "银行卡1",
        channel_type: "2",
        max_amount: "40000",
        min_amount: "1"};
    //当前选择的银行卡信息
    public Info = {
        bank_name:'',
        branch_name:'',
        card_name:'',
        card_num:'',
        bank_province:'',
        bank_city:''
    };
    public bankData = [];
    public showBankSelect = false;
    public bankId = null;
    public action = 'add';
    app = null;
    timer = null;
    depostFee = 0.02 //保证金费率 
    depost = 0 //保证金
    order_id = ''//未完成的order_id
    countdown = 0 //倒计时
    withdraw_bonus = {}
    withdraw_countdown_time = 15//订单过期的时间，分钟
    channel = "极速兑换"//区分极速兑换 和极速兑换2
    amount_rule = []
    writeAmount = false
    payment_id = 0
    updated_at = 0
    init(channel){
        this.channel = channel
    }
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        this.fetchIndex();
        
        
        this.fetchgetHighSpeedWithdrawCountDown()
        this.fetchgetHighSpeedWithdrawSecurityRate()
        this.fetchgetHighSpeedWithdrawCountDownTime()
        if(this.channel == "极速兑换2"){
            this.fetchgetHighSpeedWithdrawRangeTwo()
        }
    }

    setAmount() {
        this.app.showAlert("请点击【常用金额】选择面值")
        // if(this.channel == "极速兑换"){
        //     this.app.showAlert("请点击【常用金额】选择面值")
        // }else{
        //     this.app.showKeyBoard(this.amountLabel,1,()=>{
        //         this.writeAmount = true
        //         this.setDepostLabel(this.amountLabel.string,0)
        //     });
        // }
    }
    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading();
            if(response.status == 0){
                self.data = response;
                self.initChannel();
                self.initRender();
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading();
        })
    }
    // 取得兑换确认倒数时间+獎勵%數
    public fetchgetHighSpeedWithdrawCountDown(){
        var url = `${this.app.UrlData.host}/api/with_draw/getHighSpeedWithdrawCountDown?`;
        if(this.channel == "极速兑换2"){
            url = `${this.app.UrlData.host}/api/with_draw/getHighSpeedWithdrawCountDownTwo?`;
        }
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading();
            if(response.status == 0){
                this.withdraw_bonus = response.data.withdraw_bonus
                this.hongliGroup.children[0].getComponent(cc.Label).string  = `加赠红利${this.withdraw_bonus[5]*100}%`
                this.hongliGroup.children[1].getComponent(cc.Label).string  = `加赠红利${this.withdraw_bonus[10]*100}%`
                this.hongliGroup.children[2].getComponent(cc.Label).string  = `加赠红利${this.withdraw_bonus[15]*100}%`
                this.boundsLabel.getComponent(cc.Label).string = `使用此渠道兑换成功加赠${this.withdraw_bonus[15]*100}%起`
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading();
        })
    }
    //倒计时新
    public fetchgetHighSpeedWithdrawCountDownTime(){
        var url = `${this.app.UrlData.host}/api/with_draw/getHighSpeedWithdrawCountDownTime?`;
        if(this.channel == "极速兑换2"){
            url = `${this.app.UrlData.host}/api/with_draw/getHighSpeedWithdrawCountDownTimeTwo?`;
        }
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                this.withdraw_countdown_time = Number(response.data.withdraw_countdown_time)
                this.fetchgetHighSpeedWithdrawOrder()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading();
        })
    }
    //获取保证金费率
    public fetchgetHighSpeedWithdrawSecurityRate(){
        var url = `${this.app.UrlData.host}/api/with_draw/getHighSpeedWithdrawSecurityRate?`;
        if(this.channel == "极速兑换2"){
            url = `${this.app.UrlData.host}/api/with_draw/getHighSpeedWithdrawSecurityRateTwo?`;
        }
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading();
            if(response.status == 0){
                this.depostFee = Number(response.data.security_rate)
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading();
        })
    }
    //取得訂單
    public fetchgetHighSpeedWithdrawOrder(){
        var url = `${this.app.UrlData.host}/api/with_draw/getHighSpeedWithdrawOrder`;
        if(this.channel == "极速兑换2"){
            url = `${this.app.UrlData.host}/api/with_draw/getHighSpeedWithdrawOrderTwo`;
        }
        let dataStr=`user_id=${this.app.UrlData.user_id}`
        let self = this;
        self.app.showLoading()
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                if(response.data.order.length > 0){
                    let time = parseInt(`${new Date().getTime()/1000}`) // 现在的时间
                    let daoqi = response.data.order[0].created_at+this.withdraw_countdown_time*60 // 到期时间
                    console.log(time,"到期时间",daoqi)
                    this.countdown = (daoqi - Number(time) )>0 ? (daoqi - Number(time)):0 //
                    this.openJsQrAlert()
                    //如果有订单，显示订单的金额的保证金
                    this.setDepostLabel(response.data.order[0].amount,response.data.order[0].id)
                    this.order_id = response.data.order[0].order_id
                    let btn = this.JsQrAlert.getChildByName("content").getChildByName("btn").getComponent(cc.Button)
                    if(response.data.order[0]["updated_at"] && response.data.order[0]["updated_at"] != 0 ){
                        btn.interactable = true
                        this.updated_at = response.data.order[0]["updated_at"]
                    }else{
                        btn.interactable = false
                    }
                }
            }else{
                self.app.showAlert(response.msg)
            }
            self.app.hideLoading()
        },(errstatus)=>{
            self.app.hideLoading()
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    //确认到账
    public fetchconfirmHighSpeedWithdraw(){
        var url = `${this.app.UrlData.host}/api/with_draw/confirmHighSpeedWithdraw`;
        if(this.channel == "极速兑换2"){
            url = `${this.app.UrlData.host}/api/with_draw/confirmHighSpeedWithdrawTwo`;
        }
        let dataStr=`order_id=${this.order_id}&wdr_status=1`
        let self = this;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                //确认到账后将order_id清空
                this.order_id = ''
                self.app.showAlert(response.msg)
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    initChannel(){
        if(this.channel == "极速兑换2"){
            this.results = this.data.data.withDraw_info.jisu_withdraw2.channel;
        }else{
            this.results = this.data.data.withDraw_info.jisu_withdraw.channel;
        }
        this.results.sort((a,b)=>a.sort-b.sort);
        for(let i = 0;i<this.results.length;i++){
            if(Number(this.results[i].is_close)>0){
                this.current = this.results[i];
                break;
            }
        }
        this.radioList();
    }

    //selectItem回调
    public initRender(){
        this.bankData = [];
        var data = this.data.data;
        for(let i = 0 ;i < data.list.length ;i++){
            let data = this.data.data.list[i];
            if (data.type == 3){
                this.bankData.push(data)
            }
        }
        
        if(this.bankData.length>0){
            let Info =JSON.parse(this.bankData[0].info)
            for (var k in Info) {
                this.Info[k] = Info[k]
            }
            this.bankId = this.bankData[0].id;
        }
        this.action = this.bankData.length != 0 ? 'edit' :'add';
        this.goldLabel.string = this.app.config.toDecimal(data.game_gold);

        //最小金额也需要根据package_id判断
        let withdraw_min_amount = JSON.parse(this.data.data.withdraw_min_amount)
        
        withdraw_min_amount['bank'].forEach(item => {
            //9.1日增加,兑换的最小金额，取渠道和支付方式相比，较大的最小兑换金额
            if(item.package_id == this.app.UrlData.package_id && Number(this.current.min_amount) <Number(item.min_amount)){
                this.current.min_amount = item.min_amount
            }
        });

        this.accountLabel.string = this.bankData.length != 0 ? this.app.config.testBankNum(this.Info.card_num) :Language_pay.Lg.ChangeByText('未设置');
        if(this.Info.bank_province == '' ||this.Info.bank_city =='' || this.Info.card_num == ''){
            this.accountBtn.active = true;
        }else{
            this.accountBtn.active = false;
        }
    }
    //极速兑换改为显示常用金额弹窗
    deleteAmount(){
        //按键音效
        this.app.loadMusic(1);
        var node = cc.instantiate(this.JisuCyjeAlert)
        node.getComponent("PayJisuCyjeAlert1").init(this.amountLabel,this.channel,this.setDepostLabel.bind(this))
        cc.find("Canvas").addChild(node)
        this.writeAmount = false
    }

    //兑换提示
    showCashAlert(){
        var node =null;
        node = cc.instantiate(this.CashAlert);
        var canvas = cc.find('Canvas');
        //检测是否已存在弹窗，避免重复显示
        if(!cc.find("Canvas/CashAlert")){
            canvas.addChild(node);
        }
        let cash = cc.find('Canvas/Cash').getComponent('PayCash1')
        let package_rate = JSON.parse(cash.results.data.package_rate)
        let package_rate_byPackage = "0"
        package_rate.list.forEach(e => {
            if(e.package_id == this.app.UrlData.package_id){
                package_rate_byPackage = e.rate
            }
        });
        let rate = package_rate_byPackage ?Number (package_rate_byPackage)  : 0;
        console.log('package_rate_byPackage',package_rate_byPackage)
        let rate2 =cash.results.data.channel_rate ?Number (cash.results.data.channel_rate)  : 0;
        let rateMount = (rate+rate2)*Number(this.amountLabel.string);
        node.getComponent('PayCashAlert1').init({
            parentComponent:this,
            rateMount: rateMount,
            amount:Number(this.amountLabel.string)
        })
    }
    //显示弹窗
    showAccountAlert(){
        this.app.showBankAccountAlert({
            text:this.bankData.length != 0  ?'修改银行卡' : '设置银行卡',
            action:this.action,
            itemId:this.bankId,
            parentComponent:this,
            //修改界面初始数据
            changeData:this.Info
        });
    }
    //兑换
    public fetchwithDrawApply(){
        var url = `${this.app.UrlData.host}/api/with_draw/withDrawApply`;
        let dataStr=''
        //如果proxy_name为“”，则不传
        if(this.app.UrlData.proxy_name == ""){
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&account_id=${this.bankId}&amount=${this.amountLabel.string}&order_type=${this.current.channel_type}&withdraw_type=${this.channel == "极速兑换"?"8":"10"}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&package_id=${this.app.UrlData.package_id}&payment_id=${this.payment_id}`
        }else{
            dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&account_id=${this.bankId}&amount=${this.amountLabel.string}&order_type=${this.current.channel_type}&withdraw_type=${this.channel == "极速兑换"?"8":"10"}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}&payment_id=${this.payment_id}`
        }
        let self = this;
        self.DhBtn.getComponent(cc.Button).interactable  = false;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                if(response.msg !="Success!"){
                    self.app.showAlert(response.msg.msg);
                }else{
                    this.countdown = this.withdraw_countdown_time*60 //超时时间
                    self.openJsQrAlert()
                }
                self.fetchIndex();
            }else{
                if(response.msg.substring(0,4) == "频繁操作"){
                    self.app.showAlert("操作频繁,请间隔30秒后重新提交")
                }else{
                    self.app.showAlert(response.msg)
                }
            }
            self.DhBtn.getComponent(cc.Button).interactable  = true;
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    public fetchgetHighSpeedWithdrawRangeTwo(){
        var url = `${this.app.UrlData.host}/api/with_draw/getHighSpeedWithdrawRangeTwo?`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                this.amount_rule = response.data.amount_rule
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    radioList(){
        this.selectContent.removeAllChildren();
        for( var i = 0 ; i < this.results.length ; i++){
            if(Number(this.results[i].is_close) > 0){
                var node = cc.instantiate(this.SelectItem);
                this.selectContent.addChild(node);
                node.getComponent('PaySelectItem1').init({
                    text:this.results[i].channel_name,
                    parentComponent:this,
                    index:i,
                    channel :'bank_pay'
                })
            }
         }
    }
    btn1Click(){
        //按键音效
        this.app.loadMusic(1);
        this.showAccountAlert()
    }
    onClick(){
        //按键音效
        if(this.order_id!= ""){
            this.openJsQrAlert()
            return
        }
        this.app.loadMusic(1);
        var amount = Number(this.amountLabel.string);

        if(this.results.length==0){
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('渠道未开放，请选择其他兑换方式!')}`)
        }else if(this.Info.bank_province == '' ||this.Info.bank_city =='' || this.Info.card_num == ''){
            this.app.showBankTipAlert(this)
        }else if(this.amountLabel.string == "请点击【常用金额】选择面值" || this.amountLabel.string == "点击输入"){
            this.app.showAlert(Language_pay.Lg.ChangeByText('兑换金额不能为空'))
        }else if(this.writeAmount){
            let amount = Number(this.amountLabel.string)
            let index = 0
            this.amount_rule.forEach((e,i)=>{
                if(amount>=Number(e.min) && amount<= Number(e.max)){
                    index = i
                    console.log(index)
                }
            })
            let range = this.amount_rule[index].range
            if(amount%range == 0){
                this.showCashAlert();
            }else{
                this.app.showAlert(`兑换金额必须是${range}的倍数`)
            }
        }else if(amount + this.depost > Number(this.goldLabel.string)){
            this.app.showAlert(Language_pay.Lg.ChangeByText('余额不足'))
        }else{
            this.showCashAlert();
        }
    }
    //点击确认到账
    qrdzClick(){
        if(this.order_id == ''){
            console.log("订单号为空，请等待订单号生成！")
            this.app.showAlert("订单号为空，请等待订单号生成！")
            return
        }
        this.fetchconfirmHighSpeedWithdraw()
        this.closeJsQrAlert()
    }
    closeJsQrAlert(){
        this.JsQrAlert.active = false
        clearInterval(this.timer)
    }
    closeJsTimeOutAlert(){
        this.JsTimeOutAlert.active = false
    }
    openJsQrAlert(){
        if(this.order_id == ''){
            this.fetchgetHighSpeedWithdrawOrder()
        }
        if(this.countdown <=0){
            this.openJsTimeOutAlert()
            return
        }
        this.JsQrAlert.active = true
        clearInterval(this.timer )
        this.timer = setInterval(() => {
            this.timerLabel.string =this.app.config.getTime3(this.countdown) 
            this.countdown -- 
            if(this.countdown%10 == 0 && this.updated_at == 0){
                this.fetchgetHighSpeedWithdrawOrder()
            }
            if(this.countdown < 0){
                //倒计时结束
                this.closeJsQrAlert()
                this.openJsTimeOutAlert()
                clearInterval(this.timer )
            }
        }, 1000);
    }
    openJsTimeOutAlert(){
        this.JsTimeOutAlert.active = true
    }
    setDepostLabel(amount,payment_id=0){
        this.depost = this.depostFee * Number(amount)
        this.depostLabel.string = `温馨提示：本次兑换保证金：${this.depost > 0 ? this.depost : 0} 元 \n您发起兑换后平台将会为您暂时冻结保证金，待兑换完成后保证金会返还您的账户，请您收到兑换后及时点击【确认到账】，否则保证金将暂时不会自动返还`
        this.app.setInputColor("2",this.amountLabel);
        this.payment_id = payment_id
    }
    onDestroy(){
        clearInterval(this.timer)
    }
}
