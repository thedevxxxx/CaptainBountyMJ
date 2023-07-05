import { _decorator, Component, Prefab, Node } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

@ccclass('PayBankCardManage1')
export default class PayBankCardManage1 extends Component {
    @property(Prefab)
    BankCardItem: Prefab | null = null;
    @property(Node)
    BankCardList: Node | null = null;
    app = null;
    public data : any = {};
    public bankData = [];
    onLoad () {
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        this.fetchIndex()
    }
    public fetchIndex(){
        var url = `${this.app.UrlData.host}/api/with_draw/index?user_id=${this.app.UrlData.user_id}&package_id=${this.app.UrlData.package_id}`;
        this.app.ajax('GET',url,'',(response)=>{
            this.app.hideLoading();
            if(response.status == 0){
                this.data = response.data;
                this.renderList()
            }else{
                this.app.showAlert(response.msg)
            }
        },(errstatus)=>{
            this.app.showAlert(`网络错误`)
            this.app.hideLoading();
        })
    }
    renderList(){
        for(let i = 0 ;i < this.data.list.length ;i++){
            let data = this.data.list[i];
            if (data.type == 3){
                this.bankData.push(data)
            }
        }
        this.bankData.forEach((e)=>{
            let node = cc.instantiate(this.BankCardItem)
            this.BankCardList.addChild(node)
            node.getComponent("PayBankCardItem1").init(e.info)
        })
    }
    //显示绑定银行卡
    showAccountAlert(){
        this.node.getChildByName("bindBankAccount").active = true
        this.node.getChildByName("Bank").active = false
        this.node.getComponent("PayBankAccountAlert1").init({
            text:'设置银行卡',
            action:"add",
            itemId:0,
            parentComponent:this,
        })
    }
}
