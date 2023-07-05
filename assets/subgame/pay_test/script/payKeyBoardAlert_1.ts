import { _decorator, Component, Label, Node } from 'cc';
import * as cc from 'cc';
const {ccclass, property} = _decorator;
import { Language_pay } from "./payLanguage_1";
import Utils from './payUtils_1'

@ccclass('PayKeyBoardAlert1')
export default class PayKeyBoardAlert1 extends Component {
    @property(Label)
    inputlabel: Label | null = null;
    @property(Node)
    lowerContent :Node | null = null;
    @property(Node)
    CapContent :Node | null = null;
    
    label = null;
    isCap = true;
    type = null;
    app = null;
    callBack = null;
    init(label,type,callBack){
        this.label = label;
        if(label.string == '点击输入'){
            this.inputlabel.string = '';
        }else{
            this.inputlabel.string = label.string;
        }
        
        this.type = type;
        this.callBack = callBack
    }

    onLoad(){
        this.app = cc.find('Canvas/Main').getComponent('PayMain1');
        let dom = document.getElementById('GameCanvas');
        let self = this;
        dom.onkeydown = (e)=>{
            if(e.key.length>1){
                switch(e.key){
                    case 'Backspace':
                        self.deleteString();
                        break;
                    case 'Enter':
                        self.onClick();
                        break;
                    default:
                        break;
                }
            }else{
                self.inputlabel.string = self.inputlabel.string+e.key
            }
        }
        this.setLanguageResource()
        var Node2 = ["Q","W","E","R","T","Y","U","I","O","P"]
        var Node3 = ["A","S","D","F","G","H","J","K","L"]
        var Node4 = ["shift","Z","X","C","V","B","N","M","delete"]
        for(var i = 0 ; i<10 ;i++){
            this.addBtnHandler(`capContent/Node1/${i}`)
            this.addBtnHandler(`capContent/Node2/${Node2[i]}`)
            if(i < 9){
                this.addBtnHandler(`capContent/Node3/${Node3[i]}`)
                this.addBtnHandler(`capContent/Node4/${Node4[i]}`)
            }
        }
        this.addBtnHandler("capContent/Node5/wancheng")
        this.addBtnHandler("input/deleteall")
        this.addBtnHandler("input/wancheng")
    }
    add1(e){
        //按键音效
        this.app.loadMusic(1);

        let font  = e.target.children[0].getComponent(cc.Label).string;
        this.inputlabel.string = this.inputlabel.string+font;
        if(this.type == 4){
            this.inputlabel.string = this.inputlabel.string.substring(0,4)
        }
    }
    deleteString(){
        //按键音效
        this.app.loadMusic(1);

        this.inputlabel.string = this.inputlabel.string.substr(0,this.inputlabel.string.length-1);
    }

    deleteAll(){
        //按键音效
        this.app.loadMusic(1);

        this.inputlabel.string ='';
    }

    toCap(){
        //按键音效
        this.app.loadMusic(1);

        if(this.isCap){
            this.CapContent.active = false;
            this.lowerContent.active = true;
            this.isCap = false;
        }else{
            this.CapContent.active = true;
            this.lowerContent.active = false;
            this.isCap = true;
        }
    }
    public addBtnHandler(btnName: string): void {
        var btn = cc.find('Canvas/KeyBoardAlert/Content/' + btnName)
        this.app.loadPublicIcon(`oldpay/internal/default_panel`,btn)
        Utils.addClickEvent(btn, this.node, 'PayKeyBoardAlert1', 'onBtnClicked')
    }
    private onBtnClicked(event: cc.Event): void {
        var btnName = event.target.name
        console.log("onBtnClicked btnName",btnName)
        if(btnName == "wancheng"){
            this.onClick()
        }else if(btnName == "delete"){
            this.deleteString()
        }else if(btnName == "deleteall"){
            this.deleteAll()
        }else if(btnName == "shift"){
        }else{
            this.add1(event)
        }
    }
    onClick(){
        //按键音效
        this.app.loadMusic(1);
        let string = this.app.labelType(this.inputlabel.string,this.type);
        if(string == ''){
            string = '点击输入'
            this.app.setInputColor("",this.label);
        }else{
            this.app.setInputColor("2",this.label);
        }
        this.label.string = string;
        this.callBack(Number(string))
        this.node.removeFromParent();
    }

    removeSelf(){
        //按键音效
        this.app.loadMusic(1);
        
        this.node.removeFromParent();
    }
    setLanguageResource(){
        if(this.app.UrlData.package_id != 16){
            let wancheng_label= this.node.getChildByName('Content').getChildByName('input').getChildByName('wancheng').getChildByName('label').getComponent(cc.Label)
            wancheng_label.string = Language_pay.Lg.ChangeByText('完成')
        }
    }
}
