import * as cc from 'cc';
import {gHandler} from "../common/gHandler";
import {hqqLanguage} from "../common/hqqLanguage";
import {hqqBase64} from "../common/hqqBase64";
import {myReflect} from "../app/myReflect";
import {appGlobal} from "../app/appGlobal";
import {IosReflect} from "../../base/app/iosReflect";
import {hqqHttp} from "../common/hqqHttp";
import {hqqEvent} from "../common/hqqEvent";
import {commonTools} from "../common/hqqCommonTools";
import {localStorage} from "../common/hqqLocalStorage";
import {logManager} from "../common/hqqLogMgr";
import {hqqViewCtr} from "../common/hqqViewCtr";
import {audioMgr} from "../common/hqqAudioMgr";
import {appLogin} from "../app/appLogin";
import * as JSEncrypt from "../../base/app/jsencrypt.js"
import { EDITOR } from 'cc/env';
import { WeChatPlugin } from '../WeChat/WeChatPlugin';
const { ccclass, property } = cc._decorator;
cc.dynamicAtlasManager.enabled = true;
@ccclass('loading')
export class loading extends cc.Component {
    @property(cc.Asset)
    public hallmanifest: cc.Asset = null;

    private tempTime:number = 0;
    private state:number = 0;
    private info:string = "";
    private progress:number = 0;
    private layer:cc.Node = null;
    private progressnode:cc.Node = null;
    private progressBar:cc.ProgressBar = null;
    private apkversion:cc.Node = null;
    private label:cc.Label = null;
    private bg:cc.Node = null;
    private ani:cc.sp.Skeleton = null;
    private isapkdown:boolean = false;
    private video:cc.Node = null;
    private progressicon:cc.Node = null;
    private guestloginbtn:cc.Node = null;
    private wechatloginbtn:cc.Node = null;
    private accountloginbtn:cc.Node = null;
    private weChatComponent:WeChatPlugin = null;
    private isWeChatClicked:boolean = false;    //判斷點擊過

    onLoad () {
        cc.log("======================== loading onLoad")
        this.initHQQ()

        this.layer = cc.find("Canvas/layer")
        this.progressnode = cc.find("Canvas/layer/progress")
        this.progressBar = this.progressnode.getComponent(cc.ProgressBar)
        this.apkversion = cc.find("Canvas/layer/apkversion")
        this.label = cc.find("Canvas/layer/layoutnode/infolabel").getComponent(cc.Label)
        this.bg = cc.find("Canvas/brandnode/bg")
        this.ani = cc.find("Canvas/brandnode/ani").getComponent(cc.sp.Skeleton)

        if(!cc.sys.isBrowser){
            this.UILoad();
        }
        this.tempTime = 0;
        this.state = 0;
        this.info = "";
        this.progress = 0
        if (!cc.sys.isBrowser && (!hqq.app.apkVersion || hqq.app.apkVersion == '1.0.0')) {
           !hqq.isDebug && hqq.logMgr.log('获取安装包固定信息失败')
           let appversionname = hqq.reflect && hqq.reflect.getAppVersion()
           if (appversionname && appversionname != "") {
               hqq.app.apkVersion = appversionname
           } else {
               !hqq.isDebug && hqq.logMgr.log("获取本地安装包版本失败");
               hqq.app.apkVersion = '1.0.0';
           }
        } else {
            let GeneralAgency = "";
            if( hqq.app.GeneralAgency[hqq.app.pinpai] )
            {
                if( hqq.app.GeneralAgency[hqq.app.pinpai][hqq.app.huanjin] )
                {
                    GeneralAgency=hqq.app.GeneralAgency[hqq.app.pinpai][hqq.app.huanjin]
                }
            }
            hqq.logMgr.log('getHqqPackageInfo 从app获得的品牌和环境', hqq.reflect.getHqqPackageInfo(hqq.app.pinpai,hqq.app.huanjin,hqq.app.apkVersion,GeneralAgency))
        }
        let mainversion = "   V:" + (hqq.localStorage.globalGet(hqq.app.versionKey) || "1.0.0")
        let os = ""
        if (hqq.app.packageInfo) {
           os = hqq.app.packageInfo.system + ","
        }
        this.apkversion.getComponent(cc.Label).string = os + "App:" + hqq.app.apkVersion + mainversion;
        if (hqq.app.idDownApk) {
           this.onclickDownApk()
           return
        }
        this.register()
        if (cc.sys.platform == cc.sys.Platform.MOBILE_BROWSER || cc.sys.platform == cc.sys.Platform.DESKTOP_BROWSER) { // 浏览器
           this.cocosWebOrientationChange()
           this.layer.active = true;
           let url = window.location.search;
           if (url.includes("params=")) { // 第三方加密链接
               hqq.isOtherGame = true
               this.getPrivateKey()
           } else { // 本地生成的简单链接
               if (url.includes("?")) {
                   let strs = url.split("?")[1].split("&");
                   for (let i = 0; i < strs.length; i++) {
                       let temp = strs[i].split("=")[1];
                       if (strs[i].split("=")[0] == "acconunt") {
                           hqq.webAcconunt = temp;
                       } else if (strs[i].split("=")[0] == "deviceid") {
                           hqq.webDeviceid = temp;
                       } else if (strs[i].split("=")[0] == "token") {
                           hqq.webToken = temp;
                       } else if (strs[i].split("=")[0] == "gametype") {
                            hqq.gameType = temp;
                            let tempname = "特斯特娱乐";
                            if(hqq.gameType === "098F6BCD4621D373CADE4E832627B4F6"){
                                hqq.app.packageID = 1;
                                hqq.app.pinpai = "test";
                                tempname = "特斯特娱乐";
                            } else if (hqq.gameType === "BF1C91F5E929CC247CBE0134B8F761CB" ) {
                                hqq.app.packageID = 2;
                                hqq.app.pinpai = "debi";
                                tempname = "金城娱乐";
                            } else if (hqq.gameType === "89F2C378D56A0ED2506DAE1DFF0D4BE4" ) {
                                hqq.app.packageID = 3;
                                if (hqq.app.huanjin == "dev") {
                                    hqq.app.packageID = 5;
                                }
                                hqq.app.pinpai = "xingba";
                                tempname = "杏吧娱乐";
                            } else if (hqq.gameType === "8AF50B801354F596D38B13E347BDF5C7" ) {
                                hqq.app.packageID = 6;
                                hqq.app.pinpai = "nineone";
                                tempname = "91游戏";
                            } else if (hqq.gameType === "8AF50B801354F596D38B13E347BDF5C7" ) {
                                hqq.app.packageID = 7;
                                hqq.app.pinpai = "nineone";
                                tempname = "91游戏";
                            } else if (hqq.gameType === "8B81ADFBC628FAF5A80FC96B2D618FAD" ) {
                                hqq.app.packageID = 8;
                                hqq.app.pinpai = "xinsheng";
                                tempname = "大喜发";
                            } else if (hqq.gameType === "28C6494F201454431951E43FE68D2EF9" ) {
                                hqq.app.packageID = 9;
                                hqq.app.pinpai = "xingui";
                                tempname = "新贵游戏";
                            } else if (hqq.gameType === "662715DC6F0BF27667AF8195D30A5F12" ) {
                                hqq.app.packageID = 10;
                                hqq.app.pinpai = "fuxin";
                                tempname = "富鑫II";
                            } else if (hqq.gameType === "F8BCAA7860791CDA345D64C43C549A19" ) {
                                hqq.app.packageID = 11;
                                hqq.app.pinpai = "xinhao";
                                tempname = "新豪游戏";
                            } else if (hqq.gameType === "C0D29760ED394A3FC7118712B1D4C412" ) {
                                hqq.app.packageID = 12;
                                hqq.app.pinpai = "xinlong";
                                tempname = "乐派游戏";
                            } else if (hqq.gameType === "2907DCE9947E733FBF0E45CEDF3FB58D" ) {
                                hqq.app.packageID = 13;
                                hqq.app.pinpai = "huangshi";
                                tempname = "皇室游戏";
                            } else if (hqq.gameType === "C4AC3F098675D060DC6EAD9EE45B7EA3" ) {
                                hqq.app.packageID = 15;
                                hqq.app.pinpai = "juding";
                                tempname = "聚鼎娱乐";
                            } else if (hqq.gameType === "4E241E999B6C7F337D5676EA5CC87174" ) {
                                hqq.app.packageID = 18;
                                hqq.app.pinpai = "huaxing";
                                tempname = "华兴娱乐";
                            } else if (hqq.gameType === "3C12C98821B343991E37565DC1D941CD" ) {
                                hqq.app.packageID = 16;
                                hqq.app.pinpai = "ninetwo";
                                tempname = "92游戏";
                            } else if (hqq.gameType === "885A7428D5262AC73FF7B2F53EE4A730" ) {
                                hqq.app.packageID = 21;
                                hqq.app.pinpai = "tianqi";
                                tempname = "天启游戏";
                            } else if (hqq.gameType === "923F8D377881B4C39BD364E5D9047E75" ) {
                                hqq.app.packageID = 19;
                                hqq.app.pinpai = "chaofan";
                                tempname = "超凡娱乐";
                            } else if (hqq.gameType === "89F5CD2534B7496C9EBDD1DFC2E440E2" ) {
                                hqq.app.packageID = 20
                                hqq.app.pinpai = "wansheng";
                                tempname = "万盛娱乐";
                            } else if (hqq.gameType === "0195E40836FFE10B58ED86DD8D64687D" ) {
                                hqq.app.packageID = 22;
                                hqq.app.pinpai = "jiaxing";
                                tempname = "嘉兴娱乐";
                            } else if (hqq.gameType === "69EBD32B7DEFAA9604051766954789C9" ) {
                                hqq.app.packageID = 23;
                                hqq.app.pinpai = "tetu";
                                tempname = "特兔游戏";
                            } else if (hqq.gameType === "A0D88DDBF513C846C8BBB23492EA71EC" ) {
                                hqq.app.packageID = 26;
                                hqq.app.pinpai = "fiveone";
                                tempname = "51游戏";
                            } else if (hqq.gameType === "A74881B9CCCFD093973ADEC92B06E911" ) {
                                hqq.app.packageID = 25;
                                hqq.app.pinpai = "letian";
                                tempname = "乐天游戏";
                            } else if (hqq.gameType === "85860DE96CF78ABE0E181012C68597C8" ) {
                                hqq.app.packageID = 28;
                                hqq.app.pinpai = "xingyao";
                                tempname = "杏耀娱乐";
                            } else if (hqq.gameType === "CD63923310AAA7652C89DB4292C73853" ) {
                                hqq.app.packageID = 31;
                                hqq.app.pinpai = "xingcai";
                                tempname = "杏彩娱乐";
                            } else if (hqq.gameType === "406AC9525B0F1CB3D972CDC61F7D51F9" ) {
                                hqq.app.packageID = 32;
                                hqq.app.pinpai = "xingbyx";
                                tempname = "杏吧游戏";
                            } else if (hqq.gameType === "2555D1C73FB0BF8742A8D0BF86839C9C" ) {
                                hqq.app.packageID = 33;
                                hqq.app.pinpai = "kgame";
                                tempname = "kgame";
                            } else if (hqq.gameType === "462B76D10FE77CF1A74AFF4BDD5B73AF" ) {
                                hqq.app.packageID = 30;
                                hqq.app.pinpai = "modeng";
                                tempname = "摩登娱乐";
                            } else if (hqq.gameType === "106604A7055810B8D673980E9465DA30" ) {
                                hqq.app.packageID = 35;
                                hqq.app.pinpai = "guanying";
                                tempname = "冠赢国际";
                            } else if (hqq.gameType === "4664d2f38d7aa4bc54da4fc07528ed96" ) {
                                hqq.app.packageID = 36;
                                hqq.app.pinpai = "quyou";
                                tempname = "趣游";
                            } else if (hqq.gameType === "c29730c37b28f3948239f07fcdc50c77" ) {
                                hqq.app.packageID = 37;
                                hqq.app.pinpai = "jinbei";
                                tempname = "金杯游戏";
                            } else if (hqq.gameType === "772b8c461ce851ab3ea6f1cc6e4b92f0" ) {
                                hqq.app.packageID = 38;
                                hqq.app.pinpai = "jinma";
                                tempname = "金马娱乐";
                            } else if(hqq.gameType === "526ea3b1b4a9c6934627be65ee31181f" ){
                                hqq.app.packageID = 41;
                                hqq.app.pinpai = "fucaiyule";
                                tempname = "富彩娱乐";
                            } else{
                                hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("b2bwebtip2") )
                                return;
                            }
                            hqq.app.packgeName = "com." + hqq.app.pinpai + "." + hqq.app.huanjin + ".android";
                            document.title = tempname;
                        }
                       cc.log(temp)
                   }
                   if (!hqq.localStorage.globalGet("noShowIosWebTip")) {
                    //    hqq.eventMgr.dispatch(hqq.eventMgr.showIosWebTip, null) // ios 网页提示添加桌面
                   }
               }
               this.setPinpaiRes()
               this.runApplogin()
           }
        } else {
           this.setPinpaiRes()
           this.layer.active = true;
           this.runApplogin()
        }
    }

    start () {
    }

    initHQQ () {
        //let _global = typeof window === 'undefined' ? global : window;
        window.hqq = {
            setFuxinHallIdType : gHandler.setFuxinHallIdType,
            setJudingHallIdType : gHandler.setJudingHallIdType,
            getSpriteFrame : gHandler.getSpriteFrame,
            imgLoad : gHandler.imgLoad,
            getTip : gHandler.getTip,
            btnLoad : gHandler.btnLoad,
            editboxTipLoad : gHandler.editboxTipLoad,
            skeletonLoad : gHandler.skeletonLoad,
            setWidget : gHandler.setWidget,
            addNode : gHandler.addNode,
            setSprite : gHandler.setSprite,
            setBtn : gHandler.setBtn,
            setLabel : gHandler.setLabel,
            setSkeleton : gHandler.setSkeleton,
            setEditbox : gHandler.setEditbox,
            setScrollView : gHandler.setScrollView,
            checkNode : gHandler.checkNode,
            setNode : gHandler.setNode,
            checkIsAgaSubgame : gHandler.checkIsAgaSubgame,
            circleBy : gHandler.circleBy,
            setToggle : gHandler.setToggle,
            setVideoPlayer : gHandler.setVideoPlayer,
        };
        window.hqq.isOtherGame = gHandler.isOtherGame;
        window.hqq.needShowNotice = gHandler.needShowNotice;
        window.hqq.language = gHandler.language;
        window.hqq.isDebug = gHandler.isDebug;
        window.hqq.gameGlobal = gHandler.gameGlobal;
        window.hqq.agaGame = gHandler.agaGame;
        window.hqq.agaSubGameList = gHandler.agaSubGameList;
        window.hqq.subGameList = gHandler.subGameList;
        window.hqq.hallConfig = gHandler.hallConfig;
        window.hqq.subModel = gHandler.subModel;
        window.hqq.oldGameList = gHandler.oldGameList;
        window.hqq.delaySub = gHandler.delaySub;
        window.hqq.pinpaiSubGameList = gHandler.pinpaiSubGameList;
        window.hqq.unusestrlist = gHandler.unusestrlist;
        window.hqq.game2to1 = gHandler.game2to1;
        window.hqq.game1to2 = gHandler.game1to2;
        window.hqq.resetNineTwoSort = gHandler.resetNineTwoSort;
        window.hqq.spriteResMap = gHandler.spriteResMap;
        window.hqq.isShowJumpScene = gHandler.isShowJumpScene;
        window.hqq.setFuxinHallIdType = gHandler.setFuxinHallIdType;
        window.hqq.setJudingHallIdType = gHandler.setJudingHallIdType;
        window.hqq.getSpriteFrame = gHandler.getSpriteFrame;
        window.hqq.imgLoad = gHandler.imgLoad;
        window.hqq.getTip = gHandler.getTip;
        window.hqq.btnLoad = gHandler.btnLoad;
        window.hqq.editboxTipLoad = gHandler.editboxTipLoad;
        window.hqq.skeletonLoad = gHandler.skeletonLoad;
        window.hqq.setWidget = gHandler.setWidget;
        window.hqq.addNode = gHandler.addNode;
        window.hqq.setSprite = gHandler.setSprite;
        window.hqq.setBtn = gHandler.setBtn;
        window.hqq.setLabel = gHandler.setLabel;
        window.hqq.setSkeleton = gHandler.setSkeleton;
        window.hqq.setEditbox = gHandler.setEditbox;
        window.hqq.setScrollView = gHandler.setScrollView;
        window.hqq.checkNode = gHandler.checkNode;
        window.hqq.setNode = gHandler.setNode;
        window.hqq.checkIsAgaSubgame = gHandler.checkIsAgaSubgame;
        window.hqq.circleBy = gHandler.circleBy;
        window.hqq.languageTip = hqqLanguage
        window.hqq.base64 = hqqBase64;
        window.hqq.reflect = myReflect;
        if (cc.sys.platform === cc.sys.Platform.ANDROID || cc.sys.os === cc.sys.OS.ANDROID) {
            window.hqq.app = appGlobal.init(0);
        } else if (cc.sys.platform === cc.sys.Platform.IOS || cc.sys.platform === cc.sys.Platform.MACOS
           || cc.sys.os === cc.sys.OS.IOS || cc.sys.os === cc.sys.OS.OSX) {
            window.hqq.app = appGlobal.init(0);
        } else if (cc.sys.platform === cc.sys.Platform.WIN32 || cc.sys.os === cc.sys.OS.WINDOWS) {
            window.hqq.app = appGlobal.init(2);
        } else {
            window.hqq.app = appGlobal.init(-1);
        }
        window.hqq.iosReflect = new IosReflect();
        window.hqq.http = hqqHttp;
        window.hqq.eventMgr = hqqEvent.init();
        window.hqq.commonTools = commonTools;
        window.hqq.eventMgr.register(window.hqq.eventMgr.loadHeadRes,"hqqCommonTools",window.hqq.commonTools.loadHeadRes2.bind(window.hqq.commonTools))
        window.hqq.localStorage = localStorage.init();
        window.hqq.logMgr = logManager.init();
        window.hqq.viewCtr = hqqViewCtr.init();
        window.hqq.audioMgr = audioMgr.init();
        window.hqq.eventMgr.register(hqq.eventMgr.playbg,"hqqAudioMgr",hqq.audioMgr.playBg2.bind(hqq.audioMgr))

        window.hqq.open_chongzhi = true;
        window.hqq.open_tixian = true;
        window.hqq.open_back_hall = true;
        window.hqq.open_im = true;
        window.hqq.open_proxy = true;

        cc.Node.prototype.setPositionEx = function () {
            if (arguments.length == 1) {
                let v = arguments[0];
                if (v instanceof cc.Vec2) {
                    //v2类型
                    this.setPosition(v.x, v.y, 0)
                }
                else if (v instanceof cc.Vec3) {
                    //v3类型
                    if (isNaN(v.z)) v.z = 0;
                    this.setPosition(v)
                }
                else if (v instanceof Number) {
                    //数字类型
                    this.setPosition(v, 0, 0)
                }
            } else if (arguments.length == 2) {
                this.setPosition(arguments[0], arguments[1])
            } else if (arguments.length == 3) {
                this.setPosition(arguments[0], arguments[1], arguments[2])
            }
        }
        cc.Node.prototype.setScaleEx = function () {
            if (arguments.length == 1) {
                let v = arguments[0];
                if (v instanceof cc.Vec2) {
                    //v2类型
                    this.setScale(v.x, v.y, 1)
                }
                else if (v instanceof cc.Vec3) {
                    //v3类型
                    if (isNaN(v.z)) v.z = 1;
                    this.setScale(v)
                }
                else if (typeof v === "number" ) {
                    //数字类型
                    this.setScale(arguments[0], arguments[0],1)
                }
            } else if (arguments.length == 2) {
                this.setScale(arguments[0], arguments[1],1)
            } else if (arguments.length == 3) {
                this.setScale(arguments[0], arguments[1], arguments[2])
            } 
        }
        Object.defineProperty(cc.Node.prototype, "zIndex", {
            get: function() {
                return this.getSiblingIndex();
            },
        
            set: function(priority) {
                this.setSiblingIndex(priority);
            },
            enumerable: true,
            configurable: true,
        })

        Object.defineProperty(cc.Node.prototype, "x", {
            get: function() {
                return this.getPosition().x;
            },
        
            set: function(priority) {
                this.setPosition(priority,this.getPosition().y);
            },
            enumerable: true,
            configurable: true,
        })

        Object.defineProperty(cc.Node.prototype, "y", {
            get: function() {
                return this.getPosition().y;
            },
        
            set: function(priority) {
                this.setPosition(this.getPosition().x,priority);
            },
            enumerable: true,
            configurable: true,
        })

        // Object.defineProperty(cc.Node.prototype, "width", {
        //     get: function() {
        //         return this.getComponent(cc.UITransform).width;
        //     },
        
        //     set: function(priority) {
        //         this.getComponent(cc.UITransform).width = priority;
        //     },
        //     enumerable: true,
        //     configurable: true,
        // })

        // Object.defineProperty(cc.Node.prototype, "height", {
        //     get: function() {
        //         return this.getComponent(cc.UITransform).height;
        //     },
        
        //     set: function(priority) {
        //         this.getComponent(cc.UITransform).height = priority;
        //     },
        //     enumerable: true,
        //     configurable: true,
        // })

        cc.Node.prototype.addChildEx = function (child:cc.Node, zIndex?:number, name?:string) {
            if(cc.isValid(child)){
                if (typeof name != undefined && name) {
                    child.name = name;
                }
                child.layer = this.layer;
                this.addChild(child);
                if (typeof zIndex != undefined ) {
                    child.zIndex = zIndex;
                }
            }
        }

        cc.Scene.prototype.addChildEx = function (child:cc.Node, zIndex?:number, name?:string) {
            if(cc.isValid(child)){
                if (typeof name != undefined && name) {
                    child.name = name;
                }
                if( this.layer ){
                    child.layer = this.layer;
                } else{
                    child.layer = 1;
                }
                let canvas = child.getComponent(cc.Canvas);
                if(!canvas){
                    canvas = child.addComponent(cc.Canvas);
                }
                this.addChild(child);
                if (typeof zIndex != undefined ) {
                    child.zIndex = zIndex;
                }
            }
        }

        Object.defineProperty(cc.Scene.prototype, "zIndex", {
            get: function() {
                return this.getSiblingIndex();
            },
        
            set: function(priority) {
                this.setSiblingIndex(priority);
            },
            enumerable: true,
            configurable: true,
        })
    }

    UILoad () {
        if(!cc.isValid(this.node)){
           console.log("loading UILoad 节点不存在")
           return;
        }
        let background = cc.find("Canvas/background")
        this.bg.removeAllChildren();
        if (hqq.app.pinpai == "xinhao") {
           hqq.setSprite(background, { path: "bigimg/xinhao/logo_hj" })
           hqq.setSprite(this.progressnode, { path: "base/img/jiazbg", active: false })
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/img/jiaz" })
        } else if (hqq.app.pinpai == "fuxin" ) {
           hqq.setSprite(background, { path: "bigimg/fuxin/bg" })
           hqq.setSprite(this.progressnode, { path: "base/fuxin/img/jd1", active: false })
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/fuxin/img/jd2" })
        } else if (hqq.app.pinpai == "xingui") {
           hqq.setSprite(background, { path: "bigimg/xingui/back" })
           hqq.addNode(background, { path: "base/language/" + hqq.language + "/xingui/logo", widget: { top: 70, left: 10 } })
           hqq.setSprite(this.progressnode, { path: "base/xingui/img/progressback", active: false })
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/xingui/img/progress" })
        } else if (hqq.app.pinpai == "xinsheng") {
           hqq.setSprite(background, { path: "bigimg/xinsheng/back" })
           hqq.setSprite(this.progressnode, { path: "base/xinsheng/img/panel1", active: false })
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/xinsheng/img/panel" })
        } else if (hqq.app.pinpai == "xinlong") {
           hqq.setSprite(background, { path: "bigimg/xinlong/back" })
           hqq.setSprite(this.progressnode, { path: "base/xinlong/img/jd1", active: false })
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/xinlong/img/jd2" })
        } else if (hqq.app.pinpai == "huangshi") {
           hqq.setSprite(background, { path: "bigimg/huangshi/bg" })
           hqq.setSprite(this.progressnode, { path: "base/img/jiazbg", active: false })
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/img/jiaz" })
        } else if (hqq.app.pinpai == "juding") {
           hqq.setSprite(background, { path: "bigimg/juding/loading" })
           hqq.setSprite(this.progressnode, { path: "base/juding/img/jd1", active: false })
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/juding/img/jd2" })
        } else if (hqq.app.pinpai == "huaxing") {
           hqq.setSprite(background, { path: "bigimg/huaxing/bg" })
           hqq.setSprite(this.progressnode, { path: "base/img/jiazbg", active: false })
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/img/jiaz" })
        } else if (hqq.app.pinpai == "ninetwo") {
           hqq.setSprite(background, { path: "bigimg/ninetwo/beijingtu" })
           hqq.setSprite(this.progressnode, { path: "base/ninetwo/img/loading_bar", active: false , y:-343})
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/ninetwo/img/shang" })
           this.progressicon = hqq.addNode(this.progressnode, { path: "base/ninetwo/img/touzi", x:-385.5 })
           let canvas = cc.find("Canvas");
           let scalex = cc.view.getVisibleSize().width / 1334;
           let scaley = cc.view.getVisibleSize().height / 690;
           if(scalex < scaley ){
               scalex = scaley;
           }
           this.video = hqq.addNode(canvas,{videopath:"base/ninetwo/92mv",width:1334*scalex,height:690*scalex,callback: "videocompleteListener", script: this})
           this.video.active = false;
        } else if (hqq.app.pinpai == "chaofan") {
           hqq.setSprite(background, { path: "bigimg/chaofan/jiaz" })
           hqq.setSprite(this.progressnode, { path: "base/img/jiazbg", active: false })
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/img/jiaz" })
        } else if(hqq.app.pinpai == "tianqi") {
           hqq.setSprite(background, { path: "bigimg/tianqi/loading" })
           hqq.setSprite(this.progressnode, { path: "base/tianqi/img/ditiao", active: false })
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/tianqi/img/shangitap" })
           let barEff = new cc.Node();
           barEff.name = "tianqi_barEff";
           let barEff_widget = barEff.addComponent(cc.Widget);
           this.progressnode.getChildByName('bar').addChildEx(barEff);
           hqq.setSprite(barEff, { path: "base/tianqi/img/loading_light"});
           barEff_widget.target = barEff_widget.node.parent;
           barEff_widget.isAlignTop = true; 
           barEff_widget.isAlignRight  = true; 
           barEff_widget.right = 0;
           barEff_widget.top = -26;
           barEff.setScaleEx(1,0.8);
           barEff.setPositionEx(0, 0);
           barEff.active = false;
        } else if(hqq.app.pinpai == "wansheng") {
           hqq.setSprite(background, { path: "bigimg/wansheng/loading" })
           this.progressnode.getComponent(cc.ProgressBar).totalLength = 745;
           hqq.setSprite(this.progressnode, { path: "base/wansheng/img/jd1", active: false , height:40})
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/wansheng/img/jd2", x: -370 })
           this.label.color = cc.color("#350058");
           this.apkversion.getComponent(cc.Label).color = cc.color("#350058");
        } else if(hqq.app.pinpai == "debi") {
           hqq.setSprite(background, { path: "bigimg/debi/d"});
           hqq.setSprite(this.progressnode, { path: "base/debi/img/ld1", active: false })
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/debi/img/ld2" })
        } else if (hqq.app.pinpai == "jiaxing") {
           hqq.setSprite(background, { path: "bigimg/jiaxing/bg" })
           hqq.setSprite(this.progressnode, { path: "bigimg/jiazbg", active: false , y:-343})
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "bigimg/jiaz" })
           this.progressicon = hqq.addNode(this.progressnode, { path: "base/img/touzi", x:-385.5 })
        } else if ( hqq.app.isB2BList() ) {
           hqq.setSprite(background, { path: "bigimg/tetu/loadingtu" })
           hqq.setSprite(this.progressnode, { path: "base/tetu/jindudi", active: false , y:-343})
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/tetu/jindushang" })
           this.progressicon = hqq.addNode(this.progressnode, { path: "base/tetu/guangdian", x:-385.5 })
        } else if (hqq.app.pinpai == "fiveone") {
           hqq.setSprite(background, { path: "bigimg/fiveone/bg" })
           hqq.setSprite(this.progressnode, { path: "bigimg/jiazbg", active: false , y:-343})
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "bigimg/jiaz" })
           this.progressicon = hqq.addNode(this.progressnode, { path: "base/img/touzi", x:-385.5 })
        } else if (hqq.app.pinpai == "letian") {
           hqq.setSprite(background, { path: "bigimg/letian/bg" })
           hqq.setSprite(this.progressnode, { path: "bigimg/jiazbg", active: false , y:-343})
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "bigimg/jiaz" })
           this.progressicon = hqq.addNode(this.progressnode, { path: "base/img/touzi", x:-385.5 })
        } else if (hqq.app.pinpai == "ninethree") {
            hqq.setSprite(background, { path: "bigimg/language/CN/pinpai/test/test_loading_bg" })
            hqq.setSprite(this.progressnode, { path: "bigimg/jiazbg", active: false , y:-343})
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "bigimg/jiaz" })
            this.progressicon = hqq.addNode(this.progressnode, { path: "base/img/touzi", x:-385.5 })
            let canvas = cc.find("Canvas");
            let scalex = cc.view.getVisibleSize().width / 1334;
            let scaley = cc.view.getVisibleSize().height / 690;
            if(scalex < scaley ){
                scalex = scaley;
            }
            this.video = hqq.addNode(canvas,{videopath:"base/ninethree/93mv",width:1334*scalex,height:690*scalex,callback: "videocompleteListener", script: this})
            this.video.active = false;
        } else if (hqq.app.pinpai == "guanying") {
            hqq.setSprite(background, { path: "bigimg/guanying/loadingdi" })
            hqq.setSprite(this.progressnode, { path: "bigimg/test/dikuang", active: false , y:-343})
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "bigimg/test/dikuanghang" })
            this.progressicon = hqq.addNode(this.progressnode, { path: "base/test/img/fjo", x:-385.5 })
        } else if (hqq.app.pinpai == "quyou") {
            hqq.eventMgr.register(hqq.eventMgr.showQuYouAccountUI,"loading",this.showaccountui.bind(this));
            hqq.setSprite(background, { path: "bigimg/quyou/bg" })
            hqq.setSprite(this.progressnode, { path: "bigimg/test/dikuang", active: false , y:-343})
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "bigimg/test/dikuanghang" ,active:false})
            this.progressicon = hqq.addNode(this.progressnode, { path: "base/test/img/fjo", x:-385.5 ,active:false})
            this.guestloginbtn = hqq.addNode(background,{normal:"base/language/" + hqq.language + "/quyou/img/1",x:-350,y:-174,callback:"guesctloginclick",script:this,active:false,width:186*1.5,height:87*1.5});
            this.wechatloginbtn = hqq.addNode(background,{normal:"base/language/" + hqq.language + "/quyou/img/2",x:0,y:-186,callback:"wechatloginclick",script:this,active:false,width:186*1.5,height:74*1.5});
            this.accountloginbtn = hqq.addNode(background,{normal:"base/language/" + hqq.language + "/quyou/img/3",x:350,y:-176,callback:"accountloginclick",script:this,active:false,width:186*1.5,height:87*1.5});
        } else if (hqq.app.pinpai == "jinma") {
            hqq.setSprite(background, { path: "bigimg/jinma/LOGO" })
            hqq.setSprite(this.progressnode, { path: "base/jinma/jopsdjfsd", active: false , y:-266,width:950,height:37})
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/jinma/nvnvb" ,x:-410,widht:825,height:21})
            // this.progressicon = hqq.addNode(this.progressnode, { path: "base/test/img/fjo", x:-385.5 })
        } else if (hqq.app.pinpai == "fucaiyule") {
            hqq.setSprite(background, { path: "bigimg/fucaiyule/bj" })
            hqq.addNode(background, { path: "base/language/" + hqq.language + "/fucaiyule/PNG" })
            hqq.setSprite(this.progressnode, { path: "bigimg/test/dikuang", active: false , y:-343})
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "bigimg/test/dikuanghang" ,active:false})
            this.progressicon = hqq.addNode(this.progressnode, { path: "base/test/img/fjo", x:-385.5 ,active:false})
        } else if (hqq.app.pinpai == "niuwang") {
            hqq.eventMgr.register(hqq.eventMgr.showQuYouAccountUI,"loading",this.showaccountui.bind(this));
            hqq.setSprite(background, { path: "bigimg/niuwang/bg" })
            hqq.setSprite(this.progressnode, { path: "base/niuwang/shangdi", active: false , y:-343})
            hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/niuwang/shang" ,active:false})
            hqq.addNode(this.bg,{path:"base/language/"+ hqq.language + "/niuwang/logo",y:66});
            this.progressicon = hqq.addNode(this.progressnode, { path: "base/tetu/guangdian", x:-385.5 });
            this.guestloginbtn = hqq.addNode(background,{normal:"base/language/" + hqq.language + "/quyou/img/1",x:-350,y:-174,callback:"guesctloginclick",script:this,active:false,width:186*1.5,height:87*1.5});
            this.wechatloginbtn = hqq.addNode(background,{normal:"base/language/" + hqq.language + "/quyou/img/2",x:0,y:-186,callback:"wechatloginclick",script:this,active:false,width:186*1.5,height:74*1.5});
            this.accountloginbtn = hqq.addNode(background,{normal:"base/language/" + hqq.language + "/quyou/img/3",x:350,y:-176,callback:"accountloginclick",script:this,active:false,width:186*1.5,height:87*1.5});
        } else {
           hqq.setSprite(this.progressnode, { path: "base/img/jiazbg", active: false })
           hqq.setSprite(this.progressnode.getChildByName('bar'), { path: "base/img/jiaz" })
        //    if (hqq.app.pinpai != "debi") {
        //        hqq.setSprite(background, { path: "bigimg/language/" + hqq.language + "/web_loading" })
        //    }
        }
    }

    showaccountui(){
        if(cc.isValid(this.guestloginbtn)){
            this.guestloginbtn.active = true;
            this.accountloginbtn.active = true;
            
            if(cc.sys.os == cc.sys.OS.ANDROID || cc.sys.os == cc.sys.OS.IOS){
                this.weChatComponent = this.node.addComponent(WeChatPlugin);
                this.weChatComponent.trueEvent = this.getWechatInfoTure.bind(this);
                this.weChatComponent.falseEvent = this.getWechatInfoFalse.bind(this);
                let b:boolean = this.weChatComponent.ChekcWX();
                this.wechatloginbtn.active = b;
            }else{
                this.wechatloginbtn.active = false;
            }
            // this.weChatComponent = this.node.addComponent(WeChatPlugin);
            // this.wechatloginbtn.active = true;
        }
    }

    guesctloginclick(){
        hqq.loginMgr.guestlogin();
    }

    wechatloginclick(){
        if(this.isWeChatClicked) return;
            this.isWeChatClicked = true; 
        this.weChatComponent.wechatLogin();
    }

    getWechatInfoTure(){
        console.log("取得微信資料");
        hqq.logMgr.log("取得微信資料");
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("wxShowTip0"));

        var msg = this.weChatComponent.userInfo;
        hqq.gameGlobal.player.open_id = msg.openid;
        hqq.gameGlobal.player.nick_name = msg.nickname;
        hqq.gameGlobal.player.head_img_url = msg.headimgurl;
        hqq.loginMgr.guestlogin();
    }

    getWechatInfoFalse(errCode){
        var tips = hqq.getTip("wxShowTip1") + " " + errCode;
        console.error("微信登入失敗, ", tips);
        hqq.logMgr.log("微信登入失敗, " + tips);
        hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, tips);
        this.isWeChatClicked = false; 
    }
    
    accountloginclick(){
        if(hqq.app.pinpai === "quyou" ){
            hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 4 })
        } else{
            hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer,{type:15,hideexitbtn:true,onlylogin:true});
        }
    }

    onWebviewEvent (webview: any, eventType: any) {
    }

    register () {
        hqq.eventMgr.register(hqq.eventMgr.hotCheckup, "loading", this.hotCheckup.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotFail, "loading", this.hotFail.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotProgress, "loading", this.progressCallback.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotFinish, "loading", this.hotFinish.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.hotCheck, "loading", this.hotCheck.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.showLoadingInfo, "loading", this.showLoadingInfo.bind(this))
        hqq.eventMgr.register(hqq.eventMgr.refreshLoading, "loading", this.refreshLoading.bind(this))
    }

    runApplogin () {
        try {
            hqq.loginMgr = appLogin;
            hqq.loginMgr.init({
                hallmanifest: this.hallmanifest,
            })
        } catch (error) {
           hqq.logMgr.logerror(error)
           hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, "error:" + error)
        }
    }

    setPinpaiRes () {
        if(!hqq.isOtherGame){
            this.UILoad();
        }
        if (hqq.app.pinpai != 'debi') {
           if (hqq.app.pinpai == "xinhao") {
           } else if (hqq.app.pinpai == "juding") {
           } else if (hqq.app.pinpai == "fuxin" ) {
           } else if (hqq.app.pinpai == "xingui") {
           } else if (hqq.app.pinpai == "xinsheng") {
           } else if (hqq.app.pinpai == 'xingba') {
               hqq.setSprite(this.bg, { path: "bigimg/language/" + hqq.language + "/pinpai/" + hqq.app.pinpai + "/xb_loading_bg" })
           } else {
               hqq.setSprite(this.bg, { path: "bigimg/language/" + hqq.language + "/pinpai/" + hqq.app.pinpai + "/test_loading_bg" })
           }
        }
        if (hqq.app.pinpai == "fuxin" ) {
           let node = new cc.Node()
           let sprite = node.addComponent(cc.Sprite)
           cc.resources.load("base/language/" + hqq.language + "/fuxin/logo/spriteFrame", cc.SpriteFrame, (err, frame) => {
               if (err) {
                   cc.log(" 加载图片失败", err)
                   return;
               }
               if(cc.isValid(sprite))
               {
                   sprite.spriteFrame = frame;
               }
           })
           this.bg.addChildEx(node)
        } else if (hqq.app.pinpai == "xinsheng") {
        } else if (hqq.app.pinpai == "juding") {
           let node = new cc.Node()
           let sprite = node.addComponent(cc.Sprite)
           cc.resources.load("base/language/" + hqq.language + "/juding/judinglogo/spriteFrame", cc.SpriteFrame, (err, frame) => {
               if (err) {
                   cc.log(" 加载图片失败", err)
                   return;
               }
               if(cc.isValid(sprite))
               {
                   sprite.spriteFrame = frame;
               }
           })
           this.bg.addChildEx(node)
        } else if (hqq.app.pinpai == "ninetwo"){
           hqq.addNode(this.bg,{path:"base/ninetwo/img/yuan"})
        } else if (hqq.app.pinpai == "chaofan"){
           hqq.addNode(this.bg,{path:"base/chaofan/img/1"})
        } else if(hqq.app.pinpai == "tianqi") {
           cc.resources.loadDir("bigimg/language/" + hqq.language + "/pinpai/" + hqq.app.pinpai, cc.sp.SkeletonData, (err, Data) => {
               if (err) {
                   cc.log("加载骨骼动画失败", err)
                   return;
               }
               for (let i = 0; i < Data.length; i++) {
                   if (cc.js.getClassName(Data[i]) == "sp.SkeletonData") {
                       this.ani.skeletonData = Data[i];
                       this.ani.setAnimation(0, "ani_enter", false);
                       this.ani.setCompleteListener(function() {
                           this.ani.setAnimation(0, "ani_loop", true);
                       }.bind(this));
                   }
               }
           });
        } else if(hqq.app.pinpai == "wansheng") {
           hqq.addNode(this.bg,{path:"base/wansheng/wansheng_logo", scale:1.8, widget:{top: 30, right: 30}});
        } else if(hqq.app.pinpai == "debi") {
           hqq.addNode(this.bg,{path:"base/debi/logo"});
           hqq.addNode(this.bg,{path:"base/debi/zi", widget:{top: 30, left: 40}});
        } else if(hqq.app.pinpai == "jiaxing") {
           hqq.addNode(this.bg,{path:"base/language/"+ hqq.language + "/jiaxing/logo",scale:1.8});
        } else if(hqq.app.pinpai == "letian") {
           hqq.addNode(this.bg,{path:"base/language/"+ hqq.language + "/letian/logo",scale:1.8});
        } else if (hqq.app.pinpai == "ninethree"){
            hqq.addNode(this.bg,{path:"base/language/"+ hqq.language + "/ninethree/logo"});
        } else {
           cc.resources.loadDir("bigimg/language/" + hqq.language + "/pinpai/" + hqq.app.pinpai, cc.sp.SkeletonData, (err, Data) => {
               if (err) {
                   cc.log("加载骨骼动画失败", err)
                   return;
               }
               for (let i = 0; i < Data.length; i++) {
                   if (cc.js.getClassName(Data[i]) == "sp.SkeletonData") {
                       this.ani.skeletonData = Data[i];
                       if (hqq.app.pinpai == 'debi') {
                           this.ani.setCompleteListener(this.completeListener.bind(this))
                           this.ani.setAnimation(0, "animation", false);
                       } else {
                           this.ani.setAnimation(0, "animation", true);
                       }
                   }
               }
           });
        }
    }

    completeListener () {
        this.ani.setCompleteListener(null);
        this.layer.active = true;
        if (hqq.isDebug) {
           hqq.eventMgr.dispatch(hqq.eventMgr.showJumpScene,"hall");
        } else {
           this.runApplogin()
        }
    }

    videocompleteListener (videoplayer: any, eventType: any, customEventData: any) {
        if(!cc.isValid(this.node))return;
        if(eventType == cc.VideoPlayer.EventType.COMPLETED){
           if(cc.isValid(this.video)){
               this.video.destroy();
               hqq.loginMgr.videoplayering = false;
               if(hqq.loginMgr.updatefininshed){
                   hqq.loginMgr.jumpToNextScene();
               }
           }
        } else if(eventType == cc.VideoPlayer.EventType.READY_TO_PLAY){
           if(cc.isValid( this.video ) ){
               this.video.getComponent(cc.VideoPlayer).play();
           }
        } else if(eventType == cc.VideoPlayer.EventType.CLICKED){
           if(cc.isValid(this.video)){
               this.video.destroy();
               hqq.loginMgr.videoplayering = false;
               if(hqq.loginMgr.updatefininshed){
                   hqq.loginMgr.jumpToNextScene();
               }
           }
        }
    }

    cocosWebOrientationChange () {
        // cc.view.oldfuncinit = cc.view._initFrameSize
        // cc.view._initFrameSize = () => {
        //    var locFrameSize = cc.view._frameSize;
        //    var w = cc.game.frame.clientWidth;
        //    var h = cc.game.frame.clientHeight;
        //    var isLandscape = w >= h;
        //    if (EDITOR ||
        //        (isLandscape && cc.view._orientation & cc.macro.ORIENTATION_LANDSCAPE) ||
        //        (!isLandscape && cc.view._orientation & cc.macro.ORIENTATION_PORTRAIT)) {
        //        locFrameSize.width = w;
        //        locFrameSize.height = h;
        //        cc.game.container.style['-webkit-transform'] = 'rotate(0deg)';
        //        cc.game.container.style.transform = 'rotate(0deg)';
        //        cc.view._isRotated = false;
        //    } else {
        //        locFrameSize.width = h;
        //        locFrameSize.height = w;
        //        let x = ((h + w) / 2 - h) + 0.5
        //        let y = w * 3 / 4 + 42
        //        cc.game.container.style['-webkit-transform'] = 'rotate(-90deg)';
        //        cc.game.container.style.transform = 'rotate(-90deg)';
        //        cc.game.container.style['-webkit-transform-origin'] = '-' + x + 'px ' + y + 'px' + ' 0px';
        //        cc.game.container.style.transformOrigin = '-' + x + 'px ' + y + 'px';
        //        cc.view._isRotated = true;
        //    }
        //    if (cc.view._orientationChanging) {
        //        setTimeout(function () {
        //            cc.view._orientationChanging = false;
        //        }, 1000);
        //    }
        // }
        // cc.view.oldconvertToLocationInView = cc.view.convertToLocationInView
        // cc.view.convertToLocationInView = (tx, ty, relatedPos, out) => {
        //    let result = out || cc.v2();
        //    let x = cc.view._devicePixelRatio * (tx - relatedPos.left);
        //    let y = cc.view._devicePixelRatio * (relatedPos.top + relatedPos.height - ty);
        //    if (cc.view._isRotated) {
        //        result.x = y;
        //        result.y = cc.game.canvas.height - x;
        //    } else {
        //        result.x = x;
        //        result.y = y;
        //    }
        //    return result;
        // }
    }

    clearLocalData () {
        let islocalstorageClear = false
        if (hqq.localStorage) {
           islocalstorageClear = hqq.localStorage.clear()
           if (hqq.app.huanjin == 'dev') {
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip19"), islocalstorageClear)
           }
        }
        if (cc.sys.isBrowser) {
           return
        }
        let directory = jsb.fileUtils.getWritablePath()
        let isok = jsb.fileUtils.removeDirectory(directory)
        return isok
    }

    onclickDownApk () {
        if (!this.isapkdown) {
           this.isapkdown = true
           if (this.clearLocalData()) {
               if (hqq.gameGlobal.player.account_name && hqq.app.packageID && hqq.gameGlobal.proxy.temp_host) {
                   hqq.app.downloadUrl = hqq.gameGlobal.proxy.temp_host + "?p=" + hqq.app.packageID + "&u=" + hqq.gameGlobal.player.account_name + "&m=" + hqq.app.huanjin;
                   cc.sys.openURL(hqq.app.downloadUrl)
               } else if (hqq.app.packageID && hqq.gameGlobal.proxy.temp_host) {
                   hqq.app.downloadUrl = hqq.gameGlobal.proxy.temp_host + "?p=" + hqq.app.packageID + "&u=" + hqq.app.getGeneralAgency() + "&m=" + hqq.app.huanjin;
                   hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 8 })
               } else {
                   if (hqq.app.pinpai == "test") {
                       cc.sys.openURL("https://temp.wepic666.com?p=1&u=442619406")
                   } else if (hqq.app.pinpai == "debi") {
                       cc.sys.openURL("https://temp.wepic666.com?p=2&u=770256905")
                   } else if (hqq.app.pinpai == "xingba") {
                       cc.sys.openURL("https://temp.wepic666.com?p=3&u=811425071")
                   } else if (hqq.app.pinpai == "xinsheng") {
                       cc.sys.openURL("https://temp.wepic666.com?p=8&u=779681851")
                   } else if (hqq.app.pinpai == "xingui") {
                       cc.sys.openURL("https://temp.wepic666.com?p=9&u=800242589")
                   } else if (hqq.app.pinpai == "fuxin" ) {
                       cc.sys.openURL("https://temp.wepic666.com?p=10&u=250188151")
                   } else if (hqq.app.pinpai == "xinhao") {
                       cc.sys.openURL("https://temp.wepic666.com?p=11&u=341292395")
                   } else if (hqq.app.pinpai == "xinlong") {
                       cc.sys.openURL("https://temp.wepic666.com?p=12&u=736282263")
                   } else if (hqq.app.pinpai == "nineone"){
                       cc.sys.openURL("https://temp.wepic666.com?p=6&u=541999022")
                   } else if (hqq.app.pinpai == "huangshi"){
                       cc.sys.openURL("https://temp.wepic666.com?p=13&u=195201705")
                   } else if (hqq.app.pinpai == "juding"){
                       cc.sys.openURL("https://temp.wepic666.com?p=15&u=855395847")
                   } else if (hqq.app.pinpai == "huaxing"){
                       cc.sys.openURL("https://temp.wepic666.com?p=18&u=657592379")
                   } else if (hqq.app.pinpai == "ninetwo"){
                       cc.sys.openURL("https://temp.wepic666.com?p=16&u=186959995")
                   }
               }
           }
        }
    }

    getAccess (privateKey: any) {
        let callback = (data) => {
           if (data.code != 200) {
               cc.log('getAccess error', data)
               return
           }
           var decrypt = new JSEncrypt();
           decrypt.setPrivateKey(privateKey);
           var uncrypted = decrypt.decrypt(data.data.split('=')[1]);
           cc.log("uncrypted", uncrypted)
           uncrypted = JSON.parse(uncrypted)
           cc.log("uncrypted.account", uncrypted.account)
           cc.log("uncrypted.password", uncrypted.password)
           cc.log("uncrypted.device_id", uncrypted.device_id)
           cc.log("uncrypted.superior_agent", uncrypted.superior_agent)
           hqq.webAcconunt = uncrypted.account
           hqq.webAcconuntPass = uncrypted.password
           hqq.webDeviceid = uncrypted.device_id
           hqq.webUpAgent = uncrypted.superior_agent
           if (!hqq.localStorage.globalGet("noShowIosWebTip")) {
               hqq.eventMgr.dispatch(hqq.eventMgr.showIosWebTip, null) // ios 网页提示添加桌面
           }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
           cc.log("getAccess failcallback", status)
        }
        hqq.http.sendXMLHttpRequest({
           method: "POST",
           urlto: "http://agpe.539316.com//b2b/api/agent/access",
           param: {
               platform: 1000,
               token: 1000,
               gameId: "a",
               params: ""
           },
           callback: callback,
           failcallback: failcallback,
           needJsonParse: true,
           timeout: 5000,
           failtimeout: 7000,
        });
    }

    getPrivateKey () {
        let hasreceive = false
        let callback = (data) => {
           if (hasreceive) {
               return
           }
           hasreceive = true
           this.browserDeal(data)
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
           cc.log("getPrivateKey failcallback", status)
        }
        let urllist = ["http://agpe.539316.com"]
        if (hqq.app.huanjin == 'dev') {
           urllist = ["http://agpe.539316.com"]
        } else if (hqq.app.huanjin == 'pre') {
           urllist = [
            "http://agpe.lymrmfyp.com",
            "http://agpe.ywtcgyp.com",
           ]
        } else {
           urllist = [
               "https://agpe.ahdmzx.com",
               "https://agpe.henanjiaze.com",
               "https://agpe.ahdmzx.com",
               "https://agpe.henanjiaze.com",
           ]
        }
        for (let i = 0; i < urllist.length; i++) {
           hqq.http.sendXMLHttpRequest({
               method: "GET",
               urlto: urllist[i] + "/b2b/api/agent/getDecryptionKey?token=982083",
               param: null,
               callback: callback,
               failcallback: failcallback,
               needJsonParse: false,
               timeout: 5000,
               failtimeout: 7000,
           });
        }
    }

    getPublicKey () {
        let callback = (data) => {
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
           cc.log("getPublicKey failcallback", status)
        }
        let url = "http://agpe.539316.com//b2b/api/agent/getEncryptionKey?token=1001&platform_id=1001"
        if (hqq.app.huanjin == 'dev') {
           url = "http://agpe.539316.com//b2b/api/agent/getEncryptionKey?token=1001&platform_id=1001"
        } else if (hqq.app.huanjin == 'pre') {
           url = "https://agpe.lymrmfyp.com//b2b/api/agent/getEncryptionKey?token=1001&platform_id=1001"
        } else {
        }
        hqq.http.sendXMLHttpRequest({
           method: "GET",
           urlto: url,
           param: null,
           callback: callback,
           failcallback: failcallback,
           needJsonParse: false,
           timeout: 5000,
           failtimeout: 7000,
        });
    }

    browserDeal (privateKey: any) {
        let url = window.location.search;
        var decrypt = new window.JSEncrypt();
        decrypt.setPrivateKey(privateKey);
        var uncrypted = decrypt.decryptLong2(url.split('=')[1]);
        uncrypted = JSON.parse(uncrypted)
        hqq.webAcconunt = uncrypted.account
        hqq.webAcconuntPass = uncrypted.password
        hqq.webDeviceid = uncrypted.device_id
        hqq.webUpAgent = uncrypted.superior_agent
        hqq.webGameID = uncrypted.game_id
        hqq.app.packgeName = uncrypted.package_name;
        hqq.open_chongzhi = uncrypted.open_chongzhi?true:false;
        hqq.open_tixian = uncrypted.open_tixian?true:false;
        hqq.open_back_hall = uncrypted.open_back_hall?true:false;
        hqq.open_im = uncrypted.open_im?true:false;
        hqq.open_proxy = uncrypted.open_proxy?true:false;
        let tempname = "特斯特娱乐";
        // if (hqq.app.packgeName === "com.test." + hqq.app.huanjin + ".android" ) {
        //     hqq.app.packageID = 1;
        //     hqq.app.pinpai = "test";
        //     tempname = "特斯特娱乐";
        // } else if (hqq.app.packgeName === "com.debi." + hqq.app.huanjin + ".android") {
        //     hqq.app.packageID = 2;
        //     hqq.app.pinpai = "debi";
        //     tempname = "金城娱乐";
        // } else if (hqq.app.packgeName === "com.xingba." + hqq.app.huanjin + ".android") {
        //     hqq.app.packageID = 3;
        //     if (hqq.app.huanjin == "dev") {
        //         hqq.app.packageID = 5;
        //     }
        //     hqq.app.pinpai = "xingba";
        //     tempname = "杏吧娱乐";
        // } else if (hqq.app.packgeName === "com.nineone." + hqq.app.huanjin + ".android" && (hqq.app.huanjin=="pre"||hqq.app.huanjin=="online")) {
        //     hqq.app.packageID = 6;
        //     hqq.app.pinpai = "nineone";
        //     tempname = "杏吧娱乐";
        // } else if (hqq.app.packgeName === "com.nineone." + hqq.app.huanjin + ".android" && hqq.app.huanjin=="dev" ) {
        //     hqq.app.packageID = 7;
        //     hqq.app.pinpai = "nineone";
        //     tempname = "91游戏";
        // } else if (hqq.app.packgeName === "com.xinsheng." + hqq.app.huanjin + ".android") {
        //     hqq.app.packageID = 8;
        //     hqq.app.pinpai = "xinsheng";
        //     tempname = "大喜发";
        // } else if (hqq.app.packgeName === "com.xingui." + hqq.app.huanjin + ".android") {
        //     hqq.app.packageID = 9;
        //     hqq.app.pinpai = "xingui";
        //     tempname = "新贵游戏";
        // } else if (hqq.app.packgeName === "com.fuxin." + hqq.app.huanjin + ".android") {
        //     hqq.app.packageID = 10;
        //     hqq.app.pinpai = "fuxin";
        //     tempname = "富鑫II";
        // } else if (hqq.app.packgeName === "com.xinhao." + hqq.app.huanjin + ".android") {
        //     hqq.app.packageID = 11;
        //     hqq.app.pinpai = "xinhao";
        //     tempname = "新豪游戏";
        // } else if (hqq.app.packgeName === "com.xinlong." + hqq.app.huanjin + ".android") {
        //     hqq.app.packageID = 12;
        //     hqq.app.pinpai = "xinlong";
        //     tempname = "乐派游戏";
        // } else if (hqq.app.packgeName === "com.huangshi." + hqq.app.huanjin + ".android") {
        //     hqq.app.packageID = 13;
        //     hqq.app.pinpai = "huangshi";
        //     tempname = "皇室游戏";
        // } else if (hqq.app.packgeName === "com.juding." + hqq.app.huanjin + ".android") {
        //     hqq.app.packageID = 15;
        //     hqq.app.pinpai = "juding";
        //     tempname = "聚鼎娱乐";
        // } else if (hqq.app.packgeName === "com.huaxing." + hqq.app.huanjin + ".android") {
        //     hqq.app.packageID = 18;
        //     hqq.app.pinpai = "huaxing";
        //     tempname = "华兴娱乐";
        // } else if (hqq.app.packgeName === "com.ninetwo." + hqq.app.huanjin + ".android") {
        //     hqq.app.packageID = 16;
        //     hqq.app.pinpai = "92游戏";
        // } else if (hqq.app.packgeName === "com.tianqi." + hqq.app.huanjin + ".android") {
        //     hqq.app.packageID = 21;
        //     hqq.app.pinpai = "tianqi";
        //     tempname = "天启游戏";
        // } else if (hqq.app.packgeName === "com.chaofan." + hqq.app.huanjin + ".android") {
        //     hqq.app.packageID = 19;
        //     hqq.app.pinpai = "chaofan";
        //     tempname = "超凡娱乐";
        // } else if (hqq.app.packgeName === "com.wansheng." + hqq.app.huanjin + ".android") {
        //     hqq.app.packageID = 20
        //     hqq.app.pinpai = "wansheng";
        //     tempname = "万盛娱乐";
        // } else if (hqq.app.packgeName === "com.jiaxing." + hqq.app.huanjin + ".android") {
            // hqq.app.packageID = 22;
            // hqq.app.pinpai = "jiaxing";
            // tempname = "嘉兴娱乐";
            if (hqq.app.packgeName === "com.tetu." + hqq.app.huanjin + ".android") {
                hqq.app.packageID = 23;
                hqq.app.pinpai = "tetu";
                tempname = "特兔游戏";
            // } else if (hqq.app.packgeName === "com.fiveone." + hqq.app.huanjin + ".android") {
            //     hqq.app.packageID = 26;
            //     hqq.app.pinpai = "fiveone";
            //     tempname = "51游戏";
            // } else if (hqq.app.packgeName === "com.letian." + hqq.app.huanjin + ".android") {
            //     hqq.app.packageID = 25;
            //     hqq.app.pinpai = "letian";
            //     tempname = "乐天游戏";
            // } else if (hqq.app.packgeName === "com.xingyao." + hqq.app.huanjin + ".android") {
                // hqq.app.packageID = 28;
                // hqq.app.pinpai = "xingyao";
                // tempname = "杏耀娱乐";
            } else if (hqq.app.packgeName === "com.xingcai." + hqq.app.huanjin + ".android") {
                hqq.app.packageID = 31;
                hqq.app.pinpai = "xingcai";
                tempname = "杏彩娱乐";
            } else if (hqq.app.packgeName === "com.xingbyx." + hqq.app.huanjin + ".android") {
                hqq.app.packageID = 32;
                hqq.app.pinpai = "xingbyx";
                tempname = "杏吧游戏";
            } else if (hqq.app.packgeName === "com.kgame." + hqq.app.huanjin + ".android") {
                hqq.app.packageID = 33;
                hqq.app.pinpai = "kgame";
                tempname = "kgame";
            } else if (hqq.app.packgeName === "com.modeng." + hqq.app.huanjin + ".android") {
                hqq.app.packageID = 30;
                hqq.app.pinpai = "modeng";
                tempname = "摩登娱乐";
            } else if (hqq.app.packgeName === "com.jinbei." + hqq.app.huanjin + ".android") {
                hqq.app.packageID = 37;
                hqq.app.pinpai = "jinbei";
                tempname = "金杯游戏";
            } else{
                hqq.eventMgr.dispatch(hqq.eventMgr.showLoadingInfo, hqq.getTip("b2bwebtip2") )
                return;
            }

        tempname = "特兔游戏";
        document.title = tempname;
        this.UILoad();
        if(uncrypted.language){
           hqq.language = uncrypted.language
        }
        this.runApplogin()
    }

    hotCheckup (bool: any, enname: any, isfail:boolean=false) {
        if (bool) { // 需要更新
           this.progressnode.active = true
           if (enname == "hall") {
               this.info = hqq.getTip("showtip61")
           } else if (enname == "apk") {
               this.isapkdown = true
               this.info = hqq.getTip("showtip73")
           } else {
               this.info = enname + hqq.getTip("showtip74")
           }
           this.label.string = this.info;
        } else {
           this.info = hqq.getTip("showtip63")
        }
    }

    hotFail (enname: any) {
        if (enname == 'hall') {
           hqq.logMgr.log("m更新失败");
           this.info = hqq.getTip("showtip75")
        } else if (enname == 'apk') {
           hqq.logMgr.log("安装包下载失败");
           this.info = hqq.getTip("showtip76")
           this.isapkdown = false
        } else {
           hqq.logMgr.log(enname + "更新失败");
           this.info = hqq.getTip("showtip75")
        }
        this.label.string = this.info;
    }

    progressCallback (progress: any, enname: any) {
        if (isNaN(progress) || progress == 0) {
           return
        }
        if (!this.progressnode.active) {
           this.progressnode.active = true
        }
        this.progressBar.progress = progress
        progress = progress * 100
        progress += ""
        if (progress.includes(".")) {
           progress = progress.substring(0, progress.indexOf("."))
        }
        progress += "%"
        this.progress = progress
        if (enname == "hall") {
           this.info = hqq.getTip("showtip77")
        } else if (enname == "apk") {
           this.info = hqq.getTip("showtip60")
        } else if (enname == "jiazai") {
           this.info = hqq.getTip("showtip78")
        } else if(enname === hqq.loginMgr.hallStr ){
           this.info = hqq.getTip("showtip86")
        } else if(enname === hqq.loginMgr.payStr ){
           this.info = hqq.getTip("showtip89")
        } else if(enname === hqq.loginMgr.proxyStr ){
           this.info = hqq.getTip("showtip92")
        } else if(enname === hqq.loginMgr.IMStr ){
           this.info = hqq.getTip("showtip95")
        } else {
           this.info = enname + hqq.getTip("showtip79")
        }
        this.label.string = this.info + " " + this.progress;
        if(cc.isValid(this.progressicon)){
            this.progressnode.active = true;
            this.progressnode.getChildByName('bar').active = true;
            this.progressicon.active = true;
            this.progressicon.setPositionEx( -385.5 + (this.progressBar.progress * this.progressnode.getComponent(cc.UITransform).width),this.progressicon.getPosition().y)
        }
        if(hqq.app.pinpai === "tianqi") {
           if(this.progressnode.getChildByName('bar').getChildByName('tianqi_barEff')) {
               let barEff_widget = this.progressnode.getChildByName('bar').getChildByName('tianqi_barEff').getComponent(cc.Widget);
               barEff_widget.updateAlignment();
               if(progress == 0 || progress == 1) {
                   barEff_widget.node.active = false;
               } else {
                   barEff_widget.node.active = true;
               }
           }
        }
    }

    hotFinish (enname: any) {
        this.info = hqq.getTip("showtip80")
        this.label.string = this.info;

        if(hqq.app.pinpai === "quyou"){
            this.progressnode.active = false;
            this.progressnode.getChildByName('bar').active = false;
            this.progressicon.active = false;
        }
    }

    hotCheck (enname: any) {
        this.info = hqq.getTip("showtip81")
        this.label.string = this.info;
    }

    showLoadingInfo (info: any) {
        if(hqq.isOtherGame) return;
        if(info === "showChoiceLimeLayer" ){
           if(cc.isValid(this.video)){
               this.video.setPositionEx(5000,5000);
               this.video.getComponent(cc.VideoPlayer).mute = true;
               this.video.getComponent(cc.VideoPlayer).pause();
           }
           return;
        }else if(info === "closeChoiceLimeLayer" ){
           if(cc.isValid(this.video)){
               this.video.active = true;
               this.video.setPositionEx(0,0);
               this.video.getComponent(cc.VideoPlayer).mute = false;
               if(this.video.getComponent(cc.VideoPlayer).isPlaying){
                   this.video.getComponent(cc.VideoPlayer).resume();
               } else{
                   this.video.getComponent(cc.VideoPlayer).play();
               }
           }
           return;
        }
        this.info = info
        this.label.string = this.info;
    }

    refreshLoading (info: any, region: any, api: any) {
        this.apkversion.getComponent(cc.Label).string += "\n" + api + ",ip:" + info + ",addr:" + region
    }

    onDestroy () {
        hqq.eventMgr.unregister(hqq.eventMgr.showSamlllayer, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.showTip, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.hotCheckup, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.hotFail, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.hotProgress, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.hotFinish, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.hotCheck, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.showLoadingInfo, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.refreshLoading, "loading")
        hqq.eventMgr.unregister(hqq.eventMgr.showQuYouAccountUI,"loading");
    }

}