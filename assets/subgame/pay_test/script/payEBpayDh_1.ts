import { _decorator, Component, Prefab, Label, Node ,EditBox} from 'cc';
import * as cc from 'cc';
import { Language_pay } from "./payLanguage_1";
const {ccclass, property} = _decorator;

@ccclass('PayEBpayDh1')
export default class PayEBpayDh1 extends cc.Component {
    @property(cc.Prefab)
    SelectItem : cc.Prefab =null;

    @property(cc.Label)
    amountLabel: cc.Label = null;

    @property(cc.Label)
    czArea: cc.Label = null;

    @property(cc.Label)
    accountLabel: cc.Label = null;

    @property(cc.Node)
    accountBtn: cc.Node = null;

    @property(cc.Node)
    selectContent :cc.Node = null;

    @property(cc.Label)
    goldLabel: cc.Label = null;

    @property(cc.Prefab)
    CashAlert: cc.Prefab = null;

    @property(cc.Node)
    DhBtn: cc.Node = null;

    @property(cc.Node)
    feeLabel :cc.Node = null;

    @property(cc.Slider)
    slider : cc.Slider = null;

    @property(cc.ProgressBar)
    progressBar : cc.ProgressBar = null;

    @property
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
    public action = 'add';
    app = null;
    bankIndex = 0
    ebpayAccount = ''
    dhType = ""
    bankId = null
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        this.fetchIndex();
        this.changeSlider(this.slider,this.progressBar);
    }
    init(type){
        this.dhType = type
    }
    setAmount() {
        this.app.showKeyBoard(this.amountLabel,1);
    }
    public fetchEbpayAccount(){
        var url = ""
        if(this.dhType == "EBpay兑换"){
            url = `${this.app.UrlData.host}/api/with_draw/ebpay/account?user_id=${this.app.UrlData.user_id}&withdraw_type=${this.data.data.withDraw_info.ebpay.withdraw_type}`;
        }else if(this.dhType == "TOpay兑换"){
            url = `${this.app.UrlData.host}/api/with_draw/topay/account?user_id=${this.app.UrlData.user_id}&withdraw_type=${this.data.data.withDraw_info.topay.withdraw_type}`;
        }else if(this.dhType == "OKpay兑换"){
            url = `${this.app.UrlData.host}/api/with_draw/okpay/account?user_id=${this.app.UrlData.user_id}&withdraw_type=${this.data.data.withDraw_info.okpay.withdraw_type}`;
        }
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                this.ebpayAccount = response.data.account
                this.bankId = response.data.id
                this.initRender()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            self.app.hideLoading();
            if(response.status == 0){
                self.data = response;
                self.channelinit();
                self.fetchEbpayAccount()
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
            self.app.hideLoading();
        })
    }
    changeSlider(s,p){
        let self = this;
        let slider = s;
        let progressbar = p;
        if(slider == null || progressbar == null){
            return;
        }
        progressbar.progress = slider.progress;
        slider.node.on('slide', function(event){
            progressbar.progress = slider.progress;
            self.amountLabel.string = `${Math.floor(Number(self.goldLabel.string)*slider.progress)}`;
        }, this);
    }
    channelinit(){
        if(this.dhType == "EBpay兑换"){
            this.results = this.data.data.withDraw_info.ebpay.channel
        }else if(this.dhType == "TOpay兑换"){
            this.results = this.data.data.withDraw_info.topay.channel
        }else if(this.dhType == "OKpay兑换"){
            this.results = this.data.data.withDraw_info.okpay.channel
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
        var data = this.data.data;
        this.goldLabel.string = this.app.config.toDecimal(data.game_gold);
        //最小金额也需要根据package_id判断
        let withdraw_min_amount = JSON.parse(this.data.data.withdraw_min_amount)
        
        withdraw_min_amount['bank'].forEach(item => {
            //9.1日增加,兑换的最小金额，取渠道和支付方式相比，较大的最小兑换金额
            if(item.package_id == this.app.UrlData.package_id && Number(this.current.min_amount) <Number(item.min_amount)){
                this.current.min_amount = item.min_amount
            }
        });
        this.czArea.string = `${Language_pay.Lg.ChangeByText('兑换范围')}:(${this.current? this.current.min_amount:100} - ${this.current?this.current.max_amount:10000})`;
        this.accountLabel.string = this.ebpayAccount != "" ? this.app.config.testEbpayNum(this.ebpayAccount) :"未绑定";
        if(this.ebpayAccount == "" ){
            this.accountBtn.active = true;
        }else{
            this.accountBtn.active = false;
        }
    }
    //点击最大
    allGoldClick(){
        //按键音效
      this.app.loadMusic(1);
      this.amountLabel.string = `${Math.floor(Number(this.goldLabel.string))}`;
      this.slider.progress = 1;
      this.progressBar.progress = 1;
  }
    deleteAmount(){
        //按键音效
        this.app.loadMusic(1);

        this.amountLabel.string = Language_pay.Lg.ChangeByText('点击输入');
        this.app.setInputColor('',this.amountLabel);
        this.slider.progress = 0;
        this.progressBar.progress = 0;
    }
    //显示弹窗
    showAccountAlert(){
        this.app.showEBpayAccountAlert(this,this.dhType);
    }
    //兑换
    public fetchwithDrawApply(){
        var url = ``
        var withdraw_type = 22
        if(this.dhType == "EBpay兑换"){
            withdraw_type = 22
            url = `${this.app.UrlData.host}/api/with_draw/ebpay/withDrawApply`
        }else if(this.dhType == "TOpay兑换"){
            withdraw_type = 23
            url = `${this.app.UrlData.host}/api/with_draw/topay/withDrawApply`
        }else if(this.dhType == "OKpay兑换"){
            withdraw_type = 24
            url = `${this.app.UrlData.host}/api/with_draw/okpay/withDrawApply`
        }
        let dataStr=''
        //如果proxy_name为“”，则不传x
        dataStr = `user_id=${this.app.UrlData.user_id}&user_name=${decodeURI(this.app.UrlData.user_name)}&account_id=${this.bankId}&amount=${this.amountLabel.string}&order_type=${this.current.channel_type}&withdraw_type=${withdraw_type}&client=${this.app.UrlData.client}&proxy_user_id=${this.app.UrlData.proxy_user_id}&proxy_name=${decodeURI(this.app.UrlData.proxy_name)}&package_id=${this.app.UrlData.package_id}`
        let self = this;
        self.DhBtn.getComponent(cc.Button).interactable  = false;
        this.app.ajax('POST',url,dataStr,(response)=>{
            if(response.status == 0){
                if(response.msg !="Success!"){
                    self.app.showAlert(response.msg.msg);
                }else{
                    self.app.showAlert(Language_pay.Lg.ChangeByText('申请成功!'));
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
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        var amount = Number(this.amountLabel.string);

        var minAmount = Number(this.current?this.current.min_amount:100);
        var maxAmount = Number(this.current?this.current.max_amount:10000);
        //增加渠道对于兑换金额和倍数的判断
        var multiple_amount = 1;
        let withdraw_min_amount = JSON.parse(this.data.data.withdraw_min_amount)
        withdraw_min_amount['bank'].forEach(item => {
            if(item.package_id == this.app.UrlData.package_id ){    
                minAmount = minAmount < Number(item.min_amount) ? Number(item.min_amount):Number(minAmount)
                multiple_amount = item.multiple_amount
            }
        });

        if(this.results.length==0){
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('渠道未开放，请选择其他兑换方式!')}`)
        }else if(this.amountLabel.string == Language_pay.Lg.ChangeByText('点击输入')){
            this.app.showAlert(Language_pay.Lg.ChangeByText('兑换金额不能为空'))
        }else if(Number(this.amountLabel.string)%multiple_amount != 0 && amount != minAmount ){
            this.app.showAlert(`${Language_pay.Lg.ChangeByText('兑换金额必须为')}${multiple_amount}${Language_pay.Lg.ChangeByText('的倍数')}！`)
        }
        else if(amount >Number(this.goldLabel.string)){
            this.app.showAlert(Language_pay.Lg.ChangeByText('余额不足'))
        }else if(amount < minAmount || amount >maxAmount){
            this.app.showAlert(Language_pay.Lg.ChangeByText('超出兑换范围'))
        }else{
            this.showCashAlert();
        }
    }
    // update (dt) {}
}
