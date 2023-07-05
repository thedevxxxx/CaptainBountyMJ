import * as cc from 'cc';
import {subGameList_test} from "./hqqGameList_test"
const { ccclass, property } = cc._decorator;

@ccclass("hqqSubgamePanel_test")
export class hqqSubgamePanel_test extends cc.Component {
    private secondHallPrefab:cc.Prefab = null;
    private secondHallPanel:cc.Node = null;
    private isSecondHallSubBtnClicked:boolean = false;
    private secondHallSubgame:cc.Node = null;
    private jiazai:cc.Node = null;

    onLoad() {
        this.isSecondHallSubBtnClicked = false;
        let sortArray = [];
        for (let i = 0; i < Object.getOwnPropertyNames(subGameList_test).length; i++) {
            for (let key in hqq.subGameList) {
                if (i+49 == hqq.subGameList[key].hallid) {
                    sortArray.push(key);
                    break;
                }
            }
        }
        let content = cc.find("fdfsd/ScrollView/view/content",this.node)
        for (let i = 0; i < sortArray.length; i++) {
            let key = sortArray[i];
            this.scheduleOnce(()=>{
                if(hqq.subGameList[key].isDown){
                    hqq.addNode(content,{Res: hqq["hall_" + hqq.app.pinpai],normal:"language/" + hqq.language + "/clubgameicon/" + hqq.subGameList[key].enname+"2",callback:"clubgameclick",script:this,custom:key,name:key});
                } else{
                    hqq.addNode(content,{Res: hqq["hall_" + hqq.app.pinpai],normal:"language/" + hqq.language + "/clubgameicon/" + hqq.subGameList[key].enname,callback:"clubgameclick2",script:this,custom:key,name:key});
                }
            },0.01*i);
        }

        this.jiazai = cc.find("jiazaiPanel",this.node);
        hqq.setSkeleton(this.jiazai.getChildByName("jiazai"),{skeleton:"base/language/"+hqq.language+"/jiazai"})
    }

    start(){

    }

    init() {

    }
    
    clubgameclick(e:cc.Event,customEventData:string){
        if(hqq.isShowJumpScene)return;
        if(!cc.isValid(this.node))return;
        if(this.isSecondHallSubBtnClicked)return;
        this.isSecondHallSubBtnClicked = true;
        if(cc.isValid(this.jiazai)){
            this.jiazai.active = true;
        }
        hqq.eventMgr.dispatch(hqq.eventMgr.secondHallChangeSubgmae,null);
        hqq.eventMgr.dispatch(hqq.eventMgr.showJumpScene,customEventData);
    }

    clubgameclick2(e:cc.Event,customEventData:string){
        if(this.isSecondHallSubBtnClicked)return;
        this.isSecondHallSubBtnClicked = true;
        hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer,{type:10,msg:hqq.getTip("showtip101")
            ,ensurefunc:()=>{
                if(cc.isValid(this.jiazai)){
                    this.jiazai.active = true;
                }
                hqq.eventMgr.dispatch(hqq.eventMgr.secondHallChangeSubgmae,null);
                hqq.eventMgr.dispatch(hqq.eventMgr.showJumpScene,"hall");
            },
            exitfunc:()=>{
            this.isSecondHallSubBtnClicked = false;
        }});
    }
}
