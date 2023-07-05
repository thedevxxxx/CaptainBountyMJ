import { _decorator, Component, Node, Prefab } from 'cc';
import * as cc from 'cc';
import {Language_pay} from './payLanguage_1';
const {ccclass, property} = _decorator;

@ccclass('PayJisuCyjeAlert1')
export default class PayJisuCyjeAlert1 extends Component {
    @property(Node)
    content: Node | null = null;
    @property(Prefab)
    btnNum: Prefab | null = null;
    
    label = null;
    cash = null;
    app  = null;
    parentcallBack = null;
    channel = "极速兑换"
    init(label,channel,parentcallBack){
        this.parentcallBack = parentcallBack
        this.label = label;
        this.channel = channel;
    }
    onLoad(){
        this.cash = cc.find('Canvas/Cash').getComponent('PayCash1')
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        if(this.channel =="极速兑换2"){
            this.fetchgetHighSpeedWithdrawRangeTwo()
        }else{
            this.fetchgetHighSpeedWithdrawRange()
        }
    }
    public fetchgetHighSpeedWithdrawRange(){
        var url = `${this.app.UrlData.host}/api/with_draw/getHighSpeedWithdrawRange?`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                self.renderBtn(response.data.amount_list)
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    public fetchgetHighSpeedWithdrawRangeTwo(){
        var url = `${this.app.UrlData.host}/api/with_draw/getHighSpeedWithdrawRangeTwo?`;
        let self = this;
        this.app.ajax('GET',url,'',(response)=>{
            if(response.status == 0){
                let arr = []
                //优先选择10个有id的常用金额，
                if(response.data.available_list.length > 10){
                    arr = response.data.available_list.slice(0,10)
                }else{
                    arr = response.data.available_list
                }
                //剩下的从固定金额里面取
                response.data.availabfixed_listle_list.forEach(e=>{
                    if(arr.length <18){
                        arr.push({
                            id:0,
                            amount:Number(e)
                        })
                    }
                })
                this.renderBtn2(arr)
            }else{
                self.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            self.app.showAlert(`${Language_pay.Lg.ChangeByText('网络错误')}${errstatus}`)
        })
    }
    renderBtn(list){
        list.forEach((e) => {
            var node = cc.instantiate(this.btnNum)
            node.getComponent("PayBtnNum1").init(e,this.callBack.bind(this))
            this.content.addChild(node)
        });
    }
    renderBtn2(list){
        list.forEach((e) => {
            var node = cc.instantiate(this.btnNum)
            node.getComponent("PayBtnNum1").init(e.amount,this.callBack.bind(this),e.id)
            this.content.addChild(node)
        });
    }
    callBack(e,id){
        this.label.string = e.currentTarget.children[1].getComponent(cc.Label).string;
        this.parentcallBack(Number(this.label.string),id)
        this.node.removeFromParent();
    }
    removeSelf(){
        this.node.removeFromParent();
    }
}
