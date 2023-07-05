import { _decorator, Component } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;

import { Language_pay } from "./payLanguage_1";

@ccclass('PayBankTipAlert1')
export default class PayBankTipAlert1 extends Component {
    @property
    app  = null;
    parentComponent = null;
    init(component){
        this.parentComponent = component
    }
    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        this.setLanguageResource()
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        //payBankDh
        this.parentComponent.showAccountAlert();
        this.node.removeFromParent();
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1);
        this.node.destroy();
    }
    setLanguageResource(){
        let src = Language_pay.Lg.getLgSrc()

        let btn1= cc.find('Canvas/BankTipAlert/Layout/btn1')
        let Label= cc.find('Canvas/BankTipAlert/Layout/Label').getComponent(cc.Label)

        console.log(this.app.UrlData.package_id)
        if(this.app.UrlData.package_id == 10){
            this.app.loadIconLg(`${src}/font/queding`,btn1.children[0])
        }else if(this.app.UrlData.package_id == 15|| this.app.UrlData.package_id == 20 || this.app.UrlData.package_id == 18 || this.app.UrlData.package_id == 16 || this.app.UrlData.package_id == 12 || this.app.UrlData.package_id == 22  || this.app.UrlData.package_id == 8){
        }else{
            this.app.loadIconLg(`${src}/btn/surecg`,btn1)
        }

        Label.string = Language_pay.Lg.ChangeByText('请完善银行卡绑定信息')
    }
    // update (dt) {}
}
