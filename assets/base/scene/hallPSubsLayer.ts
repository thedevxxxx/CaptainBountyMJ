import * as cc from 'cc';
import { JSB } from 'cc/env';
import hqqSlider from "../common/hqqSlider";

const { ccclass, property } = cc._decorator;

@ccclass("hallPSubsLayer")
export class hallPSubsLayer extends cc.Component {
    public usdtnode:cc.Node | null = null;
    public proxycode:cc.Node | null = null;
    public register:cc.Node | null = null;
    public changehead:cc.Node | null = null;
    public bindalipay:cc.Node | null = null;
    public nickchange:cc.Node | null = null;
    public login:cc.Node | null = null;
    public nologin:cc.Node | null = null;
    public download:cc.Node | null = null;
    public tiplayer:cc.Node | null = null;
    public tiplayerinfo:cc.Label | null = null;
    public imnode:cc.Node | null = null;
    public exitbtn:cc.Node | null = null;
    public surecg:cc.Node | null = null;
    public headscroll:cc.ScrollView | null = null;
    public headitem:cc.Node | null = null;
    public weblogin:cc.Node | null = null;
    public setting:cc.Node | null = null;
    public login2:cc.Node | null = null;
    public loading:cc.Node | null = null;

    private back:cc.Node = null;
    private usdtadress:cc.Node = null;
    private usdttype:cc.Node = null;
    private headpanelinit:boolean = false;
    private data:any = null;
    private headindex:string = "";
    private itemlist:Array<cc.Node> = [];

    private onMusicChangeTimer:any = null;
    private onSoundChangeTimer:any = null;

    private sliderBGM:hqqSlider = null;
    private sliderSound:hqqSlider = null;

    private dlmmtabindex:number = null;

    private temptex:cc.Texture2D = null;

    private captchaimg:cc.Sprite = null;
    private captchaimg2:cc.Sprite = null;

    private timer:any = null;

    private num0:number = 0;
    private num1:number = 0;

    private versionlabel:cc.Label = null;

    private captureans:string = null;
    getClassName(){
        return "hallPSubsLayer";
    }

    onLoad () {
        this.usdtnode = cc.find("smallsublayer/bindusdt");
        this.proxycode = cc.find("smallsublayer/proxycode");
        this.register = cc.find("smallsublayer/register");
        this.changehead = cc.find("smallsublayer/changehead");
        this.bindalipay = cc.find("smallsublayer/bindalipay");
        this.nickchange = cc.find("smallsublayer/nickchange");
        this.login = cc.find("smallsublayer/login");
        this.nologin = cc.find("smallsublayer/nologin");
        this.download = cc.find("smallsublayer/download");
        this.tiplayer = cc.find("smallsublayer/tiplayer");
        this.tiplayerinfo = cc.find("smallsublayer/tiplayer/info").getComponent(cc.Label);
        this.imnode = cc.find("smallsublayer/imnode");
        this.exitbtn = cc.find("smallsublayer/p_close");
        this.surecg = cc.find("smallsublayer/surecg");
        this.headscroll = cc.find("smallsublayer/changehead/headscroll").getComponent(cc.ScrollView);
        this.headitem = cc.find("smallsublayer/changehead/item");
        this.weblogin = cc.find("smallsublayer/weblogin");
        this.setting = cc.find("smallsublayer/setting");
        this.login2 = cc.find("smallsublayer/login2");
    }

    start () {
    }

    UILoad () {
        if(!cc.isValid(this.node)){
           console.log("hallPSubsLayer UILoad 节点不存在")
           return;
        }
        this.back = cc.find("smallsublayer/p_bandalibg")
        let closebtn = cc.find("smallsublayer/p_close")
        let surecg = cc.find("smallsublayer/surecg")
        let title_changehead = cc.find("smallsublayer/changehead/title_changehead")
        let titile_tip = cc.find("smallsublayer/nickchange/titile_tip")
        let inputurnickname = cc.find("smallsublayer/nickchange/inputurnickname")
        let nickeditbox = cc.find("smallsublayer/nickchange/nickeditbox")
        if(hqq.app.pinpai==="juding"){
           hqq.editboxTipLoad(nickeditbox, "changenickname")
        } else{
           hqq.editboxTipLoad(nickeditbox, "largelen")
        }
        let title_login = cc.find("smallsublayer/login/title_login")
        let txt_forgetpwd = cc.find("smallsublayer/login/txt_forgetpwd")
        let login_form = cc.find("smallsublayer/login/login_form")
        let phoneeditboxnode = cc.find("smallsublayer/login/phoneeditbox")
        let passeditboxnode = cc.find("smallsublayer/login/passeditbox")
        hqq.editboxTipLoad(phoneeditboxnode, "enteridorphone")
        hqq.editboxTipLoad(passeditboxnode, "enterpass")
        let label = cc.find("smallsublayer/nologin/label")
        label.getComponent(cc.Label).string = hqq.getTip("accontloginother")
        let copybtn = cc.find("smallsublayer/download/copybtn")
        let downlabel = cc.find("smallsublayer/download/downlabel")
        downlabel.getComponent(cc.Label).string = hqq.getTip("reinstall")
        let downlabel2 = cc.find("smallsublayer/download/downlabel2")
        downlabel2.getComponent(cc.Label).string = hqq.getTip("downtip")
        let btnlabel = cc.find("smallsublayer/download/copybtn/btnlabel")
        btnlabel.getComponent(cc.Label).string = hqq.getTip("copy")
        let title = cc.find("smallsublayer/imnode/title")
        let weblabel = cc.find("smallsublayer/imnode/web/weblabel")
        let applabel = cc.find("smallsublayer/imnode/app/applabel")
        let webbtn = cc.find("smallsublayer/imnode/web")
        let appbtn = cc.find("smallsublayer/imnode/app")
        let accountnode = cc.find("smallsublayer/register/account")
        hqq.editboxTipLoad(accountnode, "enteraccount")
        let pass0node = cc.find("smallsublayer/register/pass0")
        hqq.editboxTipLoad(pass0node, "pass0")
        let pass1node = cc.find("smallsublayer/register/pass1")
        hqq.editboxTipLoad(pass1node, "pass1")
        let registertitle = cc.find("smallsublayer/register/title")
        registertitle.getComponent(cc.Label).string = hqq.getTip("registertitle")
        let title0 = cc.find("smallsublayer/register/title0")
        title0.getComponent(cc.Label).string = hqq.getTip("account")
        let tip0 = cc.find("smallsublayer/register/tip0")
        tip0.getComponent(cc.Label).string = hqq.getTip("tip0")
        let title1 = cc.find("smallsublayer/register/title1")
        title1.getComponent(cc.Label).string = hqq.getTip("title1")
        let tip1 = cc.find("smallsublayer/register/tip1")
        tip1.getComponent(cc.Label).string = hqq.getTip("tip1")
        let title2 = cc.find("smallsublayer/register/title2")
        title2.getComponent(cc.Label).string = hqq.getTip("title2")
        let info = cc.find("smallsublayer/proxycode/info")
        info.getComponent(cc.Label).string = hqq.getTip("proxy")
        let codeeditboxnode = cc.find("smallsublayer/proxycode/codeeditbox")
        hqq.editboxTipLoad(codeeditboxnode, "enterproxy")
        let usdttitle = cc.find("smallsublayer/bindusdt/title_usdt")
        let usdteditboxback = cc.find("smallsublayer/bindusdt/popup_usdt_frame")
        this.usdtadress = cc.find("smallsublayer/bindusdt/adress")
        hqq.editboxTipLoad(this.usdtadress, "usdtaddress")
        this.usdtadress.getComponent(cc.EditBox).maxLength = 42;
        let usdttip = cc.find("smallsublayer/bindusdt/tishi")
        usdttip.getComponent(cc.Label).string = hqq.getTip("usdttip")
        this.usdttype = cc.find("smallsublayer/bindusdt/type")
        hqq.setBtn(cc.find("login",this.weblogin),{callback:"weblogin_login",script:this});
        hqq.setBtn(cc.find("register",this.weblogin),{callback:"weblogin_register",script:this});
        hqq.setBtn(surecg, { callback:"onClickSure",script:this})
        hqq.setBtn(closebtn, {callback:"onClickExit",script:this})
        hqq.setBtn(txt_forgetpwd, { callback:"onClickForgetPass",script:this})

        hqq.setToggle(cc.find("smallsublayer/setting/btncontainer/ylsz"),{callback:"onSettingMenuClick",script:this,custom:1});
        hqq.setToggle(cc.find("smallsublayer/setting/btncontainer/ylsz/checkmark/yjks/yylxradio/toggle1"),{callback:"onPlayBG",script:this,custom:1});
        hqq.setToggle(cc.find("smallsublayer/setting/btncontainer/ylsz/checkmark/yjks/yylxradio/toggle2"),{callback:"onPlayBG",script:this,custom:2});
        hqq.setToggle(cc.find("smallsublayer/setting/btncontainer/ylsz/checkmark/yjks/yylxradio/toggle3"),{callback:"onPlayBG",script:this,custom:3});
        hqq.setBtn(cc.find("smallsublayer/setting/btncontainer/ylsz/checkmark/yjks/settinganiu"),{callback:"onSettingChangeAccountCallback",script:this});
        hqq.setBtn(cc.find("smallsublayer/setting/btncontainer/ylsz/checkmark/yjks/yy"),{callback:"onClicktxt_bgm",script:this});
        hqq.setBtn(cc.find("smallsublayer/setting/btncontainer/ylsz/checkmark/yjks/yx"),{callback:"onClicktxt_se",script:this});

        hqq.setToggle(cc.find("smallsublayer/setting/btncontainer/dlmm"),{callback:"onSettingMenuClick",script:this,custom:2});
        hqq.setToggle(cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1"),{callback:"onSettingDLMMTabCallback",script:this,custom:1});
        hqq.setBtn(cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark/yjks/settinganiu"),{callback:"resetpassEnsure",script:this})
        hqq.setBtn(cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark/yjks/mmxg/getcodebtn"),{callback:"onClickGetCaptcha2",script:this,custom:1})
        hqq.setBtn(cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark/yjks/mmxg/imgback/captchaimg"),{callback:"onClickCaptcha",script:this})
        
        hqq.setToggle(cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle2"),{callback:"onSettingDLMMTabCallback",script:this,custom:2});
        hqq.setBtn(cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle2/checkmark/yjks/settinganiu"),{callback:"onSettingAQMCallback",script:this})
        hqq.setBtn(cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle2/checkmark/yjks/mmxg/getcodebtn"),{callback:"onClickGetCaptcha2",script:this,custom:2})
        hqq.setBtn(cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle2/checkmark/yjks/mmxg/imgback/captchaimg"),{callback:"onClickCaptcha",script:this})
        
        hqq.setToggle(cc.find("smallsublayer/setting/btncontainer/appgx"),{callback:"onSettingMenuClick",script:this,custom:4});
        
        hqq.setToggle(cc.find("smallsublayer/login2/tabToggleContainer/toggle1"),{callback:"onSettingLoginTabCallback",script:this,custom:1});
        hqq.setToggle(cc.find("smallsublayer/login2/tabToggleContainer/toggle2"),{callback:"onSettingLoginTabCallback",script:this,custom:2});
        hqq.setBtn(cc.find("smallsublayer/login2/settinganiu"),{callback:"onSettingLoginCallback",script:this,custom:4})
        hqq.setBtn(cc.find("smallsublayer/login2/forgetpass"),{callback:"onClickForgetPass",script:this,custom:4})
        
        tip0.getComponent(cc.Label).fontSize = 28
        tip0.getComponent(cc.Label).lineHeight = 28
        tip1.getComponent(cc.Label).fontSize = 28
        tip1.getComponent(cc.Label).lineHeight = 28
        if (hqq.app.pinpai == "fuxin" ) {
            tip0.getComponent(cc.Label).fontSize = 28
            tip0.getComponent(cc.Label).lineHeight = 28
            tip1.getComponent(cc.Label).fontSize = 28
            tip1.getComponent(cc.Label).lineHeight = 28
            let bpath = "base/fuxin/img/"
            let blpath = "base/language/" + hqq.language + "/fuxin/"
            hqq.addNode(this.back, { path: bpath + "tck", width: 420, anchorX: 1, type: cc.Sprite.Type.SLICED })
            hqq.addNode(this.back, { path: bpath + "tck", width: 420, anchorX: 1, scaleX: -1, type: cc.Sprite.Type.SLICED })

            hqq.setBtn(surecg, { path: bpath + "anniu4" ,x:0})
            hqq.addNode(surecg, { path: blpath + "qr" })
            hqq.setBtn(closebtn, { path: bpath + "guanbi", x: 400, y: 250 })
             
            hqq.setSprite(title_changehead, { path: blpath + "txxg", y: 250 })
            let changehead_di = cc.find("smallsublayer/changehead/changehead_di")
            changehead_di.active = false

            hqq.setSprite(titile_tip, { path: blpath + "denglubiaoti", y: 250 })
            hqq.setSprite(inputurnickname, { path: bpath + "srk", y: 20, width: 600, type: cc.Sprite.Type.SLICED })

            hqq.setSprite(title_login, { path: blpath + "denglubiaoti", y: 250 })
            login_form.active = false
            let login = cc.find("smallsublayer/login")
            login.active = true;
            hqq.addNode(login, { path: bpath + "srk", zIndex: 0, width: 560, y: 100, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { path: bpath + "srk", zIndex: 0, width: 560, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { path: bpath + "1", x: -250, y: 100, })
            hqq.addNode(login, { path: bpath + "2", x: -250, y: 0, })
            hqq.setBtn(txt_forgetpwd, { path: blpath + "wjmm" })

            hqq.setBtn(copybtn, { path: bpath + "anniu4" })
            btnlabel.active = false;
            hqq.addNode(copybtn, { path: blpath + "fuxinqr" })
            // hqq.setNode(btnlabel, { color: cc.color(187, 187, 187,255) })
            login.active = false;

            hqq.setSprite(title, { path: blpath + "kefubiaoti", y: 245 })
            hqq.setBtn(webbtn, { path: bpath + "anniu3" })
            hqq.setBtn(appbtn, { path: bpath + "anniu3", active: false })
            weblabel.getComponent(cc.Label).color = cc.color(255, 255, 255,255)
            applabel.getComponent(cc.Label).color = cc.color(255, 255, 255,255)
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")

            let rlogin_form = cc.find("smallsublayer/register/login_form")
            rlogin_form.active = false
            let login_form1 = cc.find("smallsublayer/register/login_form1")
            login_form1.active = false
            let register = cc.find("smallsublayer/register")
            register.active = true;
            hqq.addNode(register, { path: bpath + "srk", zIndex: 0, width: 460, x: 40, y: 105, type: cc.Sprite.Type.SLICED })
            hqq.addNode(register, { path: bpath + "srk", zIndex: 0, width: 460, x: 40, y: 5, type: cc.Sprite.Type.SLICED })
            hqq.addNode(register, { path: bpath + "srk", zIndex: 0, width: 460, x: 40, y: -95, type: cc.Sprite.Type.SLICED })
            hqq.setNode(registertitle, { y: 250, color: cc.color(255, 255, 255,255) })
            register.active = false;

            let proxycodechangehead_di = cc.find("smallsublayer/proxycode/changehead_di")
            hqq.setSprite(proxycodechangehead_di, { path: bpath + "srk", width: 550, type: cc.Sprite.Type.SLICED })

            let bindusdt = cc.find("smallsublayer/bindusdt")
            bindusdt.active = true;
            hqq.addNode(bindusdt, { path: bpath + "srk", zIndex: 0, width: 570, x: 80, y: 105, type: cc.Sprite.Type.SLICED })
            hqq.addNode(bindusdt, { path: bpath + "srk", zIndex: 0, width: 460, x: 25, y: -15, type: cc.Sprite.Type.SLICED })
            hqq.setSprite(usdttitle, { path: blpath + "usdtbiaoti", x:0 , y: 250 })
            hqq.addNode(bindusdt, { path: blpath + "llx", x: -250, y: -15 })
            hqq.addNode(bindusdt, { path: blpath + "qbdz", x: -260, y: 105 })
            bindusdt.active = false;

            info.getComponent(cc.Label).string = hqq.getTip("proxy2")
            
        } else if (hqq.app.pinpai == "xingui") {
            let bpath = "base/xingui/img/"
            let blpath = "base/language/" + hqq.language + "/xingui/"
            hqq.setSprite(this.back, { path: "base/xingui/img/d_tc", size: { width: 880 } })
            hqq.setBtn(surecg, { path: "base/xingui/img/btn_1" ,x:0})
            hqq.addNode(surecg, { path: blpath + "qued" })
            hqq.setBtn(closebtn, { path: bpath + "btn_x", position: { x: 395, y: 215 } })

            hqq.setBtn(copybtn, { path: "base/xingui/img/btn_1" });
            btnlabel.active = false;
            hqq.addNode(copybtn, { path: blpath + "xinguiqr" });

            hqq.setSprite(title_changehead, { path: blpath + "txxg", position: { x: 0, y: 220 } })

            hqq.setSprite(title_login, { path: blpath + "dengl", position: { x: 0, y: 220 } })
            hqq.setBtn(txt_forgetpwd, { path: "base/language/" + hqq.language + "/img/txt_forgetpwd" })

            hqq.setBtn(webbtn, { path: "base/xingui/img/btn_1" })
            hqq.setBtn(appbtn, { path: "base/xingui/img/btn_1", active: false })
            weblabel.getComponent(cc.Label).color = cc.color(255, 255, 255,255)
            applabel.getComponent(cc.Label).color = cc.color(255, 255, 255,255)

            hqq.setSprite(usdttitle, { path: blpath + "bd", y: 220 })
            hqq.setSprite(usdteditboxback, { path: blpath + "z1" })

            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")
        } else if (hqq.app.pinpai == "xinsheng") {
            let xpath = "base/xinsheng/img/"
            let xlpath = "base/language/" + hqq.language + "/xinsheng/"
            hqq.setSprite(this.back, { path: xpath + "back1", size: { width: 880 } })
            // hqq.setBtn(surecg, { path: xpath + "btnback" })
            hqq.setBtn(closebtn, { path: xpath + "exit", position: { x: 395, y: 225 } })
            let node = new cc.Node();
            hqq.setLabel(node, { string:"qr",y:10 , fontSize:45,lineHeight:40})
            node.getComponent(cc.Label).color = cc.color(0,0,0,255);
            let tempshadow = node.addComponent(cc.LabelShadow);
            tempshadow.offset = cc.v2(1,1);
            tempshadow.blur = 2;
            tempshadow.color = cc.color(40,26,26,255);
            surecg.addChildEx(node)
            if( this.data.type === 8 ){
                hqq.setBtn(surecg, { path: xpath + "btnback", position: { x: 0, y: -10 } })
            } else{
                hqq.setBtn(surecg, { path: xpath + "btnback", position: { x: 0, y: -210 } })
            }

            hqq.setSprite(title_changehead, { path: xlpath + "txxg", position: { x: -250, y: 216 } })

            // hqq.setSprite(title_bdali, { path: blpath + "title_bdali" })
            // hqq.setSprite(bdali_form, { path: blpath + "bdali_form" })

            // hqq.setSprite(titile_tip, { path: blpath + "titile_tip" })
            // hqq.setSprite(inputurnickname, { path: blpath + "inputurnickname" })
            hqq.setBtn(copybtn, { path: xpath + "btnback" });
            btnlabel.setPositionEx(btnlabel.getPosition().x , 10 );

            hqq.setSprite(title_login, { path: xlpath + "denglu", position: { x: -300, y: 235 } })
            hqq.setBtn(txt_forgetpwd, { path: xlpath + "wjmm" })

            hqq.setBtn(webbtn, { path: xpath + "btnback" })
            hqq.setBtn(appbtn, { path: xpath + "btnback" })

            hqq.setSprite(usdttitle, { path: xlpath + "title_usdt" ,x:-160,y:235})
            hqq.setSprite(usdteditboxback, { path: xlpath + "popup_usdt_frame" })

            title.setPositionEx(title.getPosition().x , 235 );
            title.getComponent(cc.Label).string = hqq.getTip("imchoice")
            weblabel.setPositionEx(weblabel.getPosition().x , 10 );
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.setPositionEx(applabel.getPosition().x , 10 );
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")
        } else if (hqq.app.pinpai == "xinlong") {
            // let bpath = "xinlong/img/"
            // let blpath = "base/language/" + hqq.language + "/xinlong/"
            // let hpath = "xinlong/img/"
            // let hlpath = "language/" + hqq.language + "/xinlong/"
            // tip0.getComponent(cc.Label).fontSize = 28
            // tip0.getComponent(cc.Label).lineHeight = 28
            // tip1.getComponent(cc.Label).fontSize = 28
            // tip1.getComponent(cc.Label).lineHeight = 28
            // hqq.setSprite(this.back, { Res:hqq["hall_"+hqq.app.pinpai], path: bpath + "jd_p_bandalibg_1", width: 857, height: 529 })
            // hqq.setBtn(closebtn, { Res:hqq["hall_"+hqq.app.pinpai], path: bpath + "jd_popup_btn_close", x: 365, y: 221 , width:119, height:70})
            // hqq.addNode(surecg, { string: "qr",fontSize:32,color:cc.color(148,81,10,255),y:-10,bold:true })

            tip0.getComponent(cc.Label).fontSize = 28
            tip0.getComponent(cc.Label).lineHeight = 28
            tip1.getComponent(cc.Label).fontSize = 28
            tip1.getComponent(cc.Label).lineHeight = 28
            let bpath = "base/xinlong/img/"
            // let blpath = "base/language/" + hqq.language + "/juding/"
            let hpath = "xinlong/img/"
            let hlpath = "language/" + hqq.language + "/xinlong/"
            hqq.setSprite(this.back, { path: bpath + "jd_p_bandalibg_1", width: 857, height: 529 })
            hqq.setBtn(surecg, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_btn_1_3" , x:0})
            hqq.addNode(surecg, { string: "qr",fontSize:32,color:cc.color(148,81,10,255),y:-10,bold:true })
            hqq.setBtn(closebtn, { path: bpath + "jd_popup_btn_close", x: 365, y: 221 , width:119, height:70})
            
            hqq.setSprite(title_changehead, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "jd_popup_title_profile", x:-315,y: 225 })
            let changehead_di = cc.find("smallsublayer/changehead/changehead_di")
            changehead_di.active = false

            hqq.setSprite(titile_tip, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "jd_popup_title_changeNickname", x:-315,y: 225 })
            hqq.setSprite(inputurnickname, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_inputBox_1", y: 20, width: 600, type: cc.Sprite.Type.SLICED })

            hqq.setSprite(title_login, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "denglu", x:-320,y: 230 })
            login_form.active = false
            let login = cc.find("smallsublayer/login")
            login.active = true;
            hqq.addNode(login, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_inputBox_1", zIndex: 0, width: 560, widget:{closetop: true, closeleft: true, closeright: true, closebottom:true}, y: 100, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_inputBox_1", zIndex: 0, width: 560, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "shoujid", x: -250, y: 100, })
            hqq.addNode(login, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "suotou", x: -250, y: 0, })
            hqq.setBtn(txt_forgetpwd, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "wjmm" })
            login.getChildByName("phoneeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("phoneeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            login.getChildByName("phoneeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("phoneeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            login.getChildByName("passeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("passeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            login.getChildByName("passeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("passeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;


            hqq.setBtn(copybtn, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_btn_1_3" })
            hqq.setNode(btnlabel, { color: cc.color(187, 187, 187,255) })

            hqq.addNode(this.imnode, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "kffkxz", x:-280,y: 230 })
            hqq.setBtn(webbtn, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_btn_1_1" })
            hqq.setBtn(appbtn, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_btn_1_1", active: false })
            weblabel.getComponent(cc.Label).color = cc.color(255, 255, 255,255)
            applabel.getComponent(cc.Label).color = cc.color(255, 255, 255,255)
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")

            let rlogin_form = cc.find("smallsublayer/register/login_form")
            rlogin_form.active = false
            let login_form1 = cc.find("smallsublayer/register/login_form1")
            login_form1.active = false
            let register = cc.find("smallsublayer/register")
            hqq.addNode(register,{Res:hqq["hall_"+hqq.app.pinpai],path:hlpath+"jd_popup_form_signUp"});
            hqq.addNode(register,{Res:hqq["hall_"+hqq.app.pinpai],path:hlpath+"jd_popup_title_signUp",x:-350,y:225});
            registertitle.active = false;
            title0.active = false;
            title1.active = false;
            title2.active = false;
            accountnode.setPositionEx(120,115);
            accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass0node.setPositionEx(120,5);
            pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass1node.setPositionEx(120,-105);
            pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            tip0.getComponent(cc.Label).color = cc.color(236,105,65,255)
            tip0.getComponent(cc.Label).fontSize = 24;
            tip0.getComponent(cc.Label).string = hqq.getTip("tip2")
            tip1.getComponent(cc.Label).color = cc.color(236,105,65,255)
            tip1.getComponent(cc.Label).fontSize = 24;
            tip1.getComponent(cc.Label).string = hqq.getTip("tip3")

            let proxycodechangehead_di = cc.find("smallsublayer/proxycode/changehead_di")
            hqq.setSprite(proxycodechangehead_di, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_inputBox_1", width: 550, type: cc.Sprite.Type.SLICED })
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            let bindusdt = cc.find("smallsublayer/bindusdt")
            bindusdt.active = true;
            hqq.addNode(bindusdt, { Res:hqq["hall_"+hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: 0, width: 570, x: 80, y: 105, type: cc.Sprite.Type.SLICED })
            hqq.addNode(bindusdt, { Res:hqq["hall_"+hqq.app.pinpai], path: hpath + "jd_p_inputBox_1", zIndex: 0, width: 460, x: 25, y: -15, type: cc.Sprite.Type.SLICED })
            hqq.setSprite(usdttitle, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "UST", x:-270,y: 225 })
            hqq.addNode(bindusdt, { string: "usdtllx", x: -260, y: -15 ,fontSize:32,color:cc.color(72,94,154,255),bold:true})
            hqq.addNode(bindusdt, { string: "usdtqbdz", x: -270, y: 105 ,fontSize:32,color:cc.color(72,94,154,255),bold:true})
            bindusdt.getChildByName("type").getComponent(cc.Label).color = cc.color(84,98,119,255);
            bindusdt.getChildByName("type").getComponent(cc.Label).horizontalAlign = cc.Label.HorizontalAlign.LEFT;
            bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            bindusdt.active = false;

            info.getComponent(cc.Label).color = cc.color(11,52,96,255)
            info.getComponent(cc.Label).string = hqq.getTip("proxy2")
            this.tiplayerinfo.color = cc.color(11,52,96,255)
            this.tiplayerinfo.node.setPositionEx(this.tiplayerinfo.node.getPosition().x , this.tiplayerinfo.node.getPosition().y - 30);

            downlabel.getComponent(cc.Label).color = cc.color(84,98,119,255);
            downlabel2.getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.active = false;

        } else if (hqq.app.pinpai == "juding" ) {
            tip0.getComponent(cc.Label).fontSize = 28
            tip0.getComponent(cc.Label).lineHeight = 28
            tip1.getComponent(cc.Label).fontSize = 28
            tip1.getComponent(cc.Label).lineHeight = 28
            let bpath = "base/juding/img/"
            let blpath = "base/language/" + hqq.language + "/juding/"
            let hpath = "juding/img/"
            let hlpath = "language/" + hqq.language + "/juding/"
            hqq.setSprite(this.back, { path: bpath + "jd_p_bandalibg_1", width: 857, height: 529 })
            hqq.setBtn(surecg, { path: bpath + "jd_p_btn_1_3" , x:0})
            hqq.addNode(surecg, { string: "qr",fontSize:32,lineHeight:35,color:cc.color(148,81,10,255),y:0,bold:true })
            hqq.setBtn(closebtn, { path: bpath + "jd_popup_btn_close", x: 365, y: 221 , width:119, height:70})
            
            hqq.setSprite(title_changehead, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "jd_popup_title_profile", x:-315,y: 225 })
            let changehead_di = cc.find("smallsublayer/changehead/changehead_di")
            changehead_di.active = false

            hqq.setSprite(titile_tip, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "jd_popup_title_changeNickname", x:-315,y: 225 })
            hqq.setSprite(inputurnickname, { path: bpath + "jd_p_inputBox_1", y: 20, width: 600, type: cc.Sprite.Type.SLICED })

            hqq.setSprite(title_login, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "denglu", x:-320,y: 230 })
            login_form.active = false
            let login = cc.find("smallsublayer/login")
            login.active = true;
            hqq.addNode(login, { path: bpath + "jd_p_inputBox_1", zIndex: 0, width: 560, y: 100, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { path: bpath + "jd_p_inputBox_1", zIndex: 0, width: 560, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "shoujid", x: -250, y: 100, })
            hqq.addNode(login, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "suotou", x: -250, y: 0, })
            hqq.setBtn(txt_forgetpwd, { path: blpath + "wjmm" })
            login.getChildByName("phoneeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("phoneeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            login.getChildByName("phoneeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("phoneeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            login.getChildByName("passeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("passeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            login.getChildByName("passeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("passeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            login.active = false;


            hqq.setBtn(copybtn, { path: bpath + "jd_p_btn_1_3" })
            hqq.setLabel(btnlabel, { fontSize:32,lineHeight:35,color:cc.color(148,81,10,255),y:0,bold:true })

            hqq.addNode(this.imnode, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "kffkxz", x:-280,y: 230 })
            hqq.setBtn(webbtn, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_btn_1_1" })
            hqq.setBtn(appbtn, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_p_btn_1_1", active: false })
            weblabel.getComponent(cc.Label).color = cc.color(255, 255, 255,255)
            applabel.getComponent(cc.Label).color = cc.color(255, 255, 255,255)
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")

            let rlogin_form = cc.find("smallsublayer/register/login_form")
            rlogin_form.active = false
            let login_form1 = cc.find("smallsublayer/register/login_form1")
            login_form1.active = false
            let register = cc.find("smallsublayer/register")
            hqq.addNode(register,{Res:hqq["hall_"+hqq.app.pinpai],path:hlpath+"jd_popup_form_signUp"});
            hqq.addNode(register,{Res:hqq["hall_"+hqq.app.pinpai],path:hlpath+"jd_popup_title_signUp",x:-350,y:225});
            registertitle.active = false;
            title0.active = false;
            title1.active = false;
            title2.active = false;
            accountnode.setPositionEx(120,115);
            accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass0node.setPositionEx(120,5);
            pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass1node.setPositionEx(120,-105);
            pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            tip0.getComponent(cc.Label).color = cc.color(236,105,65,255)
            tip0.getComponent(cc.Label).fontSize = 24;
            tip0.getComponent(cc.Label).string = hqq.getTip("tip2")
            tip1.getComponent(cc.Label).color = cc.color(236,105,65,255)
            tip1.getComponent(cc.Label).fontSize = 24;
            tip1.getComponent(cc.Label).string = hqq.getTip("tip3")

            let proxycodechangehead_di = cc.find("smallsublayer/proxycode/changehead_di")
            hqq.setSprite(proxycodechangehead_di, { path: bpath + "jd_p_inputBox_1", width: 550, type: cc.Sprite.Type.SLICED })
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            let bindusdt = cc.find("smallsublayer/bindusdt")
            bindusdt.active = true;
            hqq.addNode(bindusdt, { path: bpath + "jd_p_inputBox_1", zIndex: 0, width: 570, x: 80, y: 105, type: cc.Sprite.Type.SLICED })
            hqq.addNode(bindusdt, { path: bpath + "jd_p_inputBox_1", zIndex: 0, width: 460, x: 25, y: -15, type: cc.Sprite.Type.SLICED })
            hqq.setSprite(usdttitle, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "UST", x:-270,y: 225 })
            hqq.addNode(bindusdt, { string: "usdtllx", x: -260, y: -15 ,fontSize:32,color:cc.color(72,94,154,255),bold:true})
            hqq.addNode(bindusdt, { string: "usdtqbdz", x: -270, y: 105 ,fontSize:32,color:cc.color(72,94,154,255),bold:true})
            bindusdt.getChildByName("type").getComponent(cc.Label).color = cc.color(84,98,119,255);
            bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            bindusdt.active = false;

            info.getComponent(cc.Label).color = cc.color(11,52,96,255)
            info.getComponent(cc.Label).string = hqq.getTip("proxy2")
            this.tiplayerinfo.color = cc.color(11,52,96,255)
            this.tiplayerinfo.node.setPositionEx(this.tiplayerinfo.node.getPosition().x,this.tiplayerinfo.node.getPosition().y-30);

            label.getComponent(cc.Label).color = cc.color(11,52,96,255)

            downlabel.getComponent(cc.Label).color = cc.color(84,98,119,255);
            downlabel2.getComponent(cc.Label).color = cc.color(84,98,119,255);
        } else if (hqq.app.pinpai == "huaxing" ) {
            tip0.getComponent(cc.Label).fontSize = 28
            tip0.getComponent(cc.Label).lineHeight = 28
            tip1.getComponent(cc.Label).fontSize = 28
            tip1.getComponent(cc.Label).lineHeight = 28
            let bpath = "base/huaxing/img/"
            let blpath = "base/language/" + hqq.language + "/huaxing/"
            let hpath = "huaxing/img/"
            let hlpath = "language/" + hqq.language + "/huaxing/"
            hqq.setSprite(this.back, { path: bpath + "d_ggtc", width: 857, height: 529 , type: cc.Sprite.Type.SLICED})
            hqq.addNode(this.back, { path: "base/huaxing/img/d_tit" , y:260})
            hqq.setBtn(surecg, { path: bpath + "btn_2" ,x:0})
            hqq.addNode(surecg, { string: "qr",fontSize:32,lineHeight:35,color:cc.color(255,255,255,255),y:0,bold:true })
            hqq.setBtn(closebtn, { path: bpath + "btn_x", x: 420, y: 260 , width:78, height:78})
            hqq.setSprite(title_changehead, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "17", x:0,y: 260 })
            let changehead_di = cc.find("smallsublayer/changehead/changehead_di")
            changehead_di.active = false

            // hqq.setSprite(titile_tip, { path: hlpath + "jd_popup_title_changeNickname", x:-315,y: 225 })
            titile_tip.active = false;
            hqq.addNode(cc.find("smallsublayer/nickchange"),{string:"nickchangetitle",x:0,y:255,bold:true,fontSize:45,lineHeight:50,color:cc.color(242,222,149)})
            hqq.setSprite(inputurnickname, { path: bpath + "4", y: 20, width: 600, type: cc.Sprite.Type.SLICED })

            hqq.setSprite(title_login, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "15", x:0,y: 260 })
            login_form.active = false
            let login = cc.find("smallsublayer/login")
            hqq.addNode(login, { path: bpath + "4", zIndex: 0, width: 560, y: 100, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { path: bpath + "4", zIndex: 0, width: 560, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { path: bpath + "19", x: -250, y: 100, })
            hqq.addNode(login, { path: bpath + "18", x: -250, y: 0, })
            hqq.setBtn(txt_forgetpwd, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "25" })
            // login.getChildByName("phoneeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("phoneeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // login.getChildByName("phoneeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("phoneeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            // login.getChildByName("passeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("passeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // login.getChildByName("passeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("passeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;


            hqq.setBtn(copybtn, { path: bpath + "btn_2" ,x:0})
            hqq.setLabel(copybtn.getChildByName("btnlabel"), { string: "copy",fontSize:32,lineHeight:35,color:cc.color(255,255,255,255),y:0,bold:true })
            // hqq.setNode(btnlabel, { color: cc.color(187, 187, 187,255) })

            hqq.addNode(this.imnode, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "tit_kffk", x:0,y: 260 })
            hqq.setBtn(webbtn, { path: bpath + "btn_2" })
            hqq.setBtn(appbtn, { path: bpath + "btn_2", active: false })
            weblabel.getComponent(cc.Label).color = cc.color(255, 255, 255,255)
            applabel.getComponent(cc.Label).color = cc.color(255, 255, 255,255)
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")

            let rlogin_form = cc.find("smallsublayer/register/login_form")
            rlogin_form.active = false
            let login_form1 = cc.find("smallsublayer/register/login_form1")
            login_form1.active = false
            let register = cc.find("smallsublayer/register")
            register.active = true;
            // hqq.addNode(register,{path:hlpath+"jd_popup_form_signUp"});
            hqq.addNode(register,{ path:blpath+"6",x:0,y:260});
            hqq.addNode(register, { path: bpath + "4", zIndex: 0, width: 630,height:64, x: 25, y: 150, type: cc.Sprite.Type.SLICED })
            hqq.addNode(register, { path: bpath + "4", zIndex: 0, width: 630,height:64, x: 25, y: 40, type: cc.Sprite.Type.SLICED })
            hqq.addNode(register, { path: bpath + "4", zIndex: 0, width: 630,height:64, x: 25, y: -70, type: cc.Sprite.Type.SLICED })
            hqq.addNode(register, { path: bpath + "19", zIndex: 0, x: -250, y: 150 })
            hqq.addNode(register, { path: bpath + "21", zIndex: 0, x: -250, y: 40 })
            hqq.addNode(register, { path: bpath + "18", zIndex: 0, x: -250, y: -70 })

            registertitle.active = false;
            title0.active = false;
            title1.active = false;
            title2.active = false;
            accountnode.setPositionEx(0,150);
            // accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass0node.setPositionEx(0,40);
            // pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            passeditboxnode.setPositionEx(0,-70);
            // pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            // tip0.color = cc.color(236,105,65,255)
            tip0.getComponent(cc.Label).fontSize = 24;
            tip0.getComponent(cc.Label).string = hqq.getTip("tip2")
            tip0.setPositionEx(tip0.getPosition().x,95);
            // tip1.color = cc.color(236,105,65,255)
            tip1.getComponent(cc.Label).fontSize = 24;
            tip1.getComponent(cc.Label).string = hqq.getTip("tip3")
            tip1.setPositionEx(tip1.getPosition().x,-15);
            register.active = false;

            let proxycodechangehead_di = cc.find("smallsublayer/proxycode/changehead_di")
            hqq.setSprite(proxycodechangehead_di, { path: bpath + "4", width: 550, type: cc.Sprite.Type.SLICED })
            // cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            let bindusdt = cc.find("smallsublayer/bindusdt");
            bindusdt.active = true;
            hqq.addNode(bindusdt, { path: bpath + "4", zIndex: 0, width: 570, x: 90, y: 95, type: cc.Sprite.Type.SLICED })
            hqq.addNode(bindusdt, { path: bpath + "4", zIndex: 0, width: 460, x: 35, y: -25, type: cc.Sprite.Type.SLICED })
            hqq.setSprite(usdttitle, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "13", x:0,y: 260 })
            hqq.addNode(bindusdt, { string: "usdtllx", x: -280, y: -25 ,fontSize:32,color:cc.color(232,169,98),bold:true})
            hqq.addNode(bindusdt, { string: "usdtqbdz", x: -290, y: 95 ,fontSize:32,color:cc.color(232,169,98),bold:true})
            // bindusdt.getChildByName("type").color = cc.color(84,98,119,255);
            // bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            bindusdt.getChildByName("type").setPositionEx(-120,-20);

            bindusdt.getChildByName("adress").setPositionEx(-170,95);
            bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            bindusdt.active = false;
            // info.color = cc.color(11,52,96,255)
            info.getComponent(cc.Label).string = hqq.getTip("proxy2")
            // this.tiplayerinfo.node.color = cc.color(11,52,96,255)
            this.tiplayerinfo.node.setPositionEx(this.tiplayerinfo.node.getPosition().x,this.tiplayerinfo.node.getPosition().y-30);

            // downlabel.color = cc.color(84,98,119,255);
            // downlabel2.color = cc.color(84,98,119,255);
        } else if (hqq.app.pinpai == "ninetwo"   || hqq.app.pinpai == "ninethree"|| hqq.app.pinpai == "guanying") {
            tip0.getComponent(cc.Label).fontSize = 28
            tip0.getComponent(cc.Label).lineHeight = 28
            tip1.getComponent(cc.Label).fontSize = 28
            tip1.getComponent(cc.Label).lineHeight = 28
            let bpath = "base/ninetwo/img/"
            let blpath = "base/language/" + hqq.language + "/ninetwo/img/"
            let blpath2 = "base/language/" + hqq.language + "/ninetwo/"
            let hpath = "ninetwo/img/"
            let hlpath = "language/" + hqq.language + "/ninetwo/img/"
            let hlpath2 = "language/" + hqq.language + "/ninetwo/"
            if( this.data.type == 10 ){
                if(this.data.msg.length>50){
                    hqq.setSprite(this.back, { path: bpath + "kuangti3", width: 835, height: 400,type: cc.Sprite.Type.SLICED})
                    this.surecg = hqq.addNode(this.node, { Res:hqq["hall_"+hqq.app.pinpai],normal: blpath2 + "setting_btn_ok/",aniname:"animation",loop:true,timeScale:0.95 , x:0,y:-150 , callback:"onClickSure" , script:this})
                    hqq.addNode(this.tiplayer,{Res:hqq["hall_"+hqq.app.pinpai],path:hlpath+"title_tips",y:115});
                } else{
                    hqq.setSprite(this.back, { path: bpath + "kuangti3", width: 835, height: 296})
                    this.surecg = hqq.addNode(this.node, { Res:hqq["hall_"+hqq.app.pinpai],normal: blpath2 + "setting_btn_ok/",aniname:"animation",loop:true,timeScale:0.95 , x:0,y:-120 , callback:"onClickSure" , script:this})
                    hqq.addNode(this.tiplayer,{Res:hqq["hall_"+hqq.app.pinpai],path:hlpath+"title_tips",y:115});
                }
                hqq.setBtn(closebtn, { path: bpath + "guanbi", x: 410, y: 145 , width:71, height:72})
                surecg.active = false;
                
            } else if( this.data.type == 4  || this.data.type == 5){
                hqq.setSprite(this.back, { path: bpath + "kuangti3", width: 835, height: 296})
                hqq.setBtn(closebtn, { path: bpath + "guanbi", x: 410, y: 145 , width:71, height:72})
                surecg.active = false;
                this.surecg = hqq.addNode(this.node, { Res:hqq["hall_"+hqq.app.pinpai],normal: blpath2 + "setting_btn_ok/",aniname:"animation",loop:true,timeScale:0.95 , x:0,y:-120 , callback:"onClickSure" , script:this})
                hqq.addNode(this.tiplayer,{Res:hqq["hall_"+hqq.app.pinpai],path:hlpath+"title_tips",y:115});
            } else if( this.data.type == 16 ){
                hqq.setSprite(this.back, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "popup_win_setUp_bg", width: 942, height: 577})
                hqq.addNode(this.setting, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "titlesetup", y:245});
                hqq.setBtn(closebtn, { path: bpath + "guanbi", x: 470, y: 280 , width:71, height:72})
                this.captchaimg = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark/yjks/mmxg/imgback/captchaimg").getComponent(cc.Sprite);
                this.captchaimg2 = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle2/checkmark/yjks/mmxg/imgback/captchaimg").getComponent(cc.Sprite);
                surecg.active = false;
                this.dlmmtabindex = 1;
            } else if( this.data.type == 8 ){
                hqq.setSprite(this.back, { path: bpath + "d", width: 814, height: 563})
                hqq.setBtn(closebtn, { path: bpath + "guanbi", x: 400, y: 280 , width:71, height:72})
                this.surecg = hqq.addNode(this.node, { normal: blpath2 + "dating_btn_confirm/",aniname:"animation",loop:true,timeScale:0.95 , x:0,y:-10 , callback:"onClickSure" , script:this})
            } else if( this.data.type == 12 ){
                hqq.setSprite(this.back, { path: bpath + "d", width: 814, height: 563})
                hqq.setBtn(closebtn, { path: bpath + "guanbi", x: 400, y: 280 , width:71, height:72})
                this.surecg = hqq.addNode(this.node, { normal: blpath2 + "setting_btn_ok/",aniname:"animation",loop:true,timeScale:0.95 , x:0,y:-180 , callback:"onClickSure" , script:this})
            } else if( this.data.type == 13 ){
                hqq.setSprite(this.back, { path: bpath + "popup_win_bg3", width: 673, height: 464})
                hqq.addNode(this.back, { path: bpath + "kuangti1"})
                hqq.setBtn(closebtn, { path: bpath + "guanbi", x: 400, y: 280 , width:71, height:72})
                hqq.setBtn(surecg, { path: blpath + "quedingbangding" , x:0,y:-195})
                hqq.addNode(this.back,{path:blpath+"titlebindagent",y:200})
            } else if( this.data.type === 17 ) {
                hqq.setSprite(this.back, { path: bpath + "popup_win_bg3", width: 813, height: 562})
                hqq.setBtn(closebtn, { path: bpath + "guanbi", x: 400, y: 275 , width:71, height:72})
                let login2account = cc.find("smallsublayer/login2/account");
                login2account.setPositionEx(40,login2account.getPosition().y);
                let login2pass = cc.find("smallsublayer/login2/pass");
                login2pass.setPositionEx(40,login2pass.getPosition().y);
                surecg.active = false;
            } else if ( this.data.type === 9 ) {
                hqq.setSprite(this.back, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "kuangti2", width: 673, height: 464})
                hqq.setBtn(closebtn, { path: bpath + "guanbi", x: 335, y: 225 , width:71, height:72})
                surecg.active = false;
                this.surecg = hqq.addNode(this.node, { normal: blpath2 + "setting_btn_ok/",aniname:"animation",loop:true,timeScale:0.95 , x:0,y:-180 , callback:"onClickSure" , script:this})
                hqq.addNode(this.tiplayer,{Res:hqq["hall_"+hqq.app.pinpai],path:hlpath+"title_tips",y:200});
            } else if ( this.data.type === 1 ) {
                hqq.setSprite(this.back, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "popup_win_bg1", width: 812, height: 445})
                hqq.setBtn(closebtn, { path: bpath + "guanbi", x: 400, y: 215 , width:71, height:72})
                surecg.active = false;
                this.surecg = hqq.addNode(this.node, { normal: blpath2 + "setting_btn_ok/",aniname:"animation",loop:true,timeScale:0.95 , x:0,y:-190 , callback:"onClickSure" , script:this})
            } else if( this.data.type === 18){

            } else {
                // surecg.active = true;
                hqq.setSprite(this.back, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "kuangti2", width: 673, height: 464})
                hqq.setBtn(closebtn, { path: bpath + "guanbi", x: 335, y: 225 , width:71, height:72})
                surecg.active = false;
                this.surecg = hqq.addNode(this.node, { normal: blpath2 + "setting_btn_ok/",aniname:"animation",loop:true,timeScale:0.95 , x:0,y:-180 , callback:"onClickSure" , script:this })
            }
            // hqq.addNode(surecg, { string: "login",fontSize:10,color:cc.color(59,31,11),y:-10,bold:true })
            
            hqq.setSprite(title_changehead, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "titleggtx", x:0,y: 180 })
            let changehead_di = cc.find("smallsublayer/changehead/changehead_di")
            hqq.setSprite(changehead_di,{path:bpath+"kuangti1",width:576,height:273,x:0,y:-10});
            let headscroll = cc.find("smallsublayer/changehead/headscroll");
            hqq.setNode(headscroll,{width:576,height:273,x:0,y:5});
            hqq.setNode(headscroll.getComponent(cc.ScrollView).content.parent,{width:576,height:273});
            hqq.setNode(headscroll.getComponent(cc.ScrollView).content,{width:576,height:273,x:0,y:136});
            hqq.setSprite(this.headitem,{Res:hqq["hall_"+hqq.app.pinpai],path:hpath+"dtxk",width:105,height:159})
            hqq.setNode(this.headitem.getChildByName("masknode"),{width:101,height:155});
            // hqq.setSprite(this.headitem.getChildByName("selectsp"),{path:hpath+"dtxk2",width:105,height:159,x:0,y:0})
            // hqq.setSprite(titile_tip, { path: hlpath + "jd_popup_title_changeNickname", x:-315,y: 225 })
            titile_tip.active = false;
            hqq.addNode(cc.find("smallsublayer/nickchange"),{string:"nickchangetitle",x:0,y:190,bold:true,fontSize:45,lineHeight:50,color:cc.color(242,222,149)})
            hqq.setSprite(inputurnickname, {path: bpath + "yjks", y: 20, width: 600, type: cc.Sprite.Type.SLICED })

            hqq.setSprite(title_login, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "titledl", x:0,y: 110 })
            login_form.active = false
            let login = cc.find("smallsublayer/login")
            hqq.addNode(login, {path: bpath + "kuangti1", zIndex: 0, width: 576,height:150, x: 0, y: -10, type: cc.Sprite.Type.SLICED })
            let input1 = hqq.addNode(login, {path: bpath + "yjks", zIndex: 0, width: 513,height:36, x: 0, y: 20, type: cc.Sprite.Type.SLICED })
            hqq.addNode(input1,{path:bpath + "shouji",x:-240})
            let input4 = hqq.addNode(login, {path: bpath + "yjks", zIndex: 0, width: 513,height:36, x: 0, y: -40, type: cc.Sprite.Type.SLICED })
            hqq.addNode(input4,{path:bpath + "gfdsg",x:-240})

            let phoneeditbox = cc.find("smallsublayer/login/phoneeditbox");
            hqq.setNode(phoneeditbox,{width:480,height:36,x:17,y:20});
            hqq.setNode(phoneeditbox.getChildByName("BACKGROUND_SPRITE"),{width:480,height:36});
            hqq.setNode(phoneeditbox.getChildByName("TEXT_LABEL"),{width:480,height:36});
            hqq.setNode(phoneeditbox.getChildByName("PLACEHOLDER_LABEL"),{width:480,height:36,color:cc.color(129,129,126,255)});

            let passeditbox = cc.find("smallsublayer/login/passeditbox");
            hqq.setNode(passeditbox,{width:480,height:36,x:17,y:-40});
            hqq.setNode(passeditbox.getChildByName("BACKGROUND_SPRITE"),{width:480,height:36});
            hqq.setNode(passeditbox.getChildByName("TEXT_LABEL"),{width:480,height:36});
            hqq.setNode(passeditbox.getChildByName("PLACEHOLDER_LABEL"),{width:480,height:36,color:cc.color(129,129,126,255)});


            hqq.addNode(this.download,{normal: blpath2 + "ani_dating_btn_copy/",aniname:"animation",loop:true,timeScale:0.95,x:0,y:-203,callback:"onClickCopyDownurl",script:this})
            copybtn.active = false;
            // hqq.setNode(btnlabel, { color: cc.color(59,31,11) })

            // hqq.addNode(this.imnode, { path: hlpath + "tit_kffk", x:0,y: 260 })
            // hqq.setBtn(webbtn, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "btn_2" })
            // hqq.setBtn(appbtn, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "btn_2", active: false })
            weblabel.getComponent(cc.Label).color = cc.color(255, 255, 255,255)
            applabel.getComponent(cc.Label).color = cc.color(255, 255, 255,255)
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")

            let rlogin_form = cc.find("smallsublayer/register/login_form")
            rlogin_form.active = false
            let login_form1 = cc.find("smallsublayer/register/login_form1")
            login_form1.active = false
            let register = cc.find("smallsublayer/register")
            register.active = true;
            hqq.addNode(register, {path: bpath + "kuangti1", zIndex: 0, width: 750,height:300, x: 0, y:30, type: cc.Sprite.Type.SLICED })
            let registerinput1 = hqq.addNode(register, { path: bpath + "yjks", zIndex: 0, width: 400,height:45, x: -80, y: 135 })
            hqq.addNode(registerinput1,{path:bpath + "shouji",x:-170})
            let registerinput2 = hqq.addNode(register, { path: bpath + "yjks", zIndex: 0, width: 400,height:45, x: -80, y: 30 })
            hqq.addNode(registerinput2,{path:bpath + "gfdsg",x:-170})
            let registerinput3 = hqq.addNode(register, { path: bpath + "yjks", zIndex: 0, width: 400,height:45, x: -80, y: -60 })
            hqq.addNode(registerinput3,{path:bpath + "gfdsg",x:-170})
            register.active = false;

            hqq.setNode(accountnode,{width:480,height:36,x:17,y:135});
            hqq.setNode(accountnode.getChildByName("BACKGROUND_SPRITE"),{width:480,height:36});
            hqq.setNode(accountnode.getChildByName("TEXT_LABEL"),{width:480,height:36});
            hqq.setNode(accountnode.getChildByName("PLACEHOLDER_LABEL"),{width:480,height:36,color:cc.color(129,129,126,255)});

            hqq.setNode(pass0node,{width:480,height:36,x:17,y:30});
            hqq.setNode(pass0node.getChildByName("BACKGROUND_SPRITE"),{width:480,height:36});
            hqq.setNode(pass0node.getChildByName("TEXT_LABEL"),{width:480,height:36});
            hqq.setNode(pass0node.getChildByName("PLACEHOLDER_LABEL"),{width:480,height:36,color:cc.color(129,129,126,255)});

            hqq.setNode(pass1node,{width:480,height:36,x:17,y:-60});
            hqq.setNode(pass1node.getChildByName("BACKGROUND_SPRITE"),{width:480,height:36});
            hqq.setNode(pass1node.getChildByName("TEXT_LABEL"),{width:480,height:36});
            hqq.setNode(pass1node.getChildByName("PLACEHOLDER_LABEL"),{width:480,height:36,color:cc.color(129,129,126,255)});

            registertitle.getComponent(cc.Label).string = "";
            registertitle.setPositionEx(0,240);
            hqq.addNode(registertitle,{path:blpath+"titlezczszh"});
            title0.active = false;
            title1.active = false;
            title2.active = false;
            
            // tip0.color = cc.color(236,105,65,255)
            tip0.getComponent(cc.Label).fontSize = 24;
            tip0.getComponent(cc.Label).string = hqq.getTip("tip4")
            tip0.setPositionEx(tip0.getPosition().x,95);
            // tip1.color = cc.color(236,105,65,255)
            tip1.getComponent(cc.Label).fontSize = 24;
            tip1.getComponent(cc.Label).string = hqq.getTip("tip5")
            tip1.setPositionEx(tip1.getPosition().x, -15);

            let proxycodechangehead_di = cc.find("smallsublayer/proxycode/changehead_di")
            hqq.setSprite(proxycodechangehead_di, { path: bpath + "shurukuang", width: 251,height:36,x:90,y:-10, type: cc.Sprite.Type.SLICED })
            let codeeditbox = cc.find("smallsublayer/proxycode/codeeditbox");
            hqq.setNode(codeeditbox,{width:251,height:36,x:90,y:-10})
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(129,129,126,255);
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(129,129,126,255);
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            cc.find("smallsublayer/proxycode/headfram").active = false;
            hqq.setLabel(info,{string:hqq.getTip("enterproxy"),x:-133.007,y:-9.275,fontSize:27,color:cc.color(217,194,130,255)})

            let bindusdt = cc.find("smallsublayer/bindusdt")
            hqq.addNode(bindusdt, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "4", zIndex: 0, width: 570, x: 90, y: 95, type: cc.Sprite.Type.SLICED })
            hqq.addNode(bindusdt, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "4", zIndex: 0, width: 460, x: 35, y: -25, type: cc.Sprite.Type.SLICED })
            // hqq.setSprite(usdttitle, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "13", x:0,y: 260 })
            hqq.addNode(bindusdt, { string: "usdtllx", x: -280, y: -25 ,fontSize:32,color:cc.color(232,169,98),bold:true})
            hqq.addNode(bindusdt, { string: "usdtqbdz", x: -290, y: 95 ,fontSize:32,color:cc.color(232,169,98),bold:true})
            // bindusdt.getChildByName("type").color = cc.color(84,98,119,255);
            // bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            bindusdt.getChildByName("adress").setPositionEx(-163,bindusdt.getChildByName("adress").getPosition().y);
            bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            // this.tiplayerinfo.node.color = cc.color(11,52,96,255)
            this.tiplayerinfo.node.setPositionEx(this.tiplayerinfo.node.getPosition().x,this.tiplayerinfo.node.getPosition().y - 40 );
            hqq.addNode(this.nologin,{Res:hqq["hall_"+hqq.app.pinpai],path:hlpath+"title_tips",y:200});
            hqq.addNode(this.download,{Res:hqq["hall_"+hqq.app.pinpai],path:hlpath+"title_tips",y:240});

            this.num0 = 0;
            this.num1 = 0;
            this.versionlabel = cc.find("smallsublayer/setting/btncontainer/ylsz/checkmark/yjks/versionlabel").getComponent(cc.Label);

            hqq.setSprite(cc.find("login2/titledl",this.node),{path:"base/language/"+hqq.language+"/ninetwo/img/titledl"});

            hqq.setSkeleton(cc.find("login2/tabToggleContainer/toggle1/Background",this.node),{path:"base/ninetwo/setting_tabunselect/",aniname:"animation",loop:true,timeScale:0.95});
            hqq.setSkeleton(cc.find("login2/tabToggleContainer/toggle1/checkmark/setting_menu_btn_selected",this.node),{path:"base/ninetwo/setting_tabselect/",aniname:"animation",loop:true,timeScale:0.95});

            hqq.setSprite(cc.find("login2/tabToggleContainer/toggle1/txt_accountLogin",this.node),{path:"base/language/"+hqq.language+"/ninetwo/img/txt_accountLogin"});

            hqq.setSkeleton(cc.find("login2/tabToggleContainer/toggle2/Background",this.node),{path:"base/ninetwo/setting_tabunselect/",aniname:"animation",loop:true,timeScale:0.95});
            hqq.setSkeleton(cc.find("login2/tabToggleContainer/toggle2/checkmark/setting_tabselect",this.node),{path:"base/ninetwo/setting_tabselect/",aniname:"animation",loop:true,timeScale:0.95});

            hqq.setSprite(cc.find("login2/tabToggleContainer/toggle2/txt_mobileLogin",this.node),{path:"base/language/"+hqq.language+"/ninetwo/img/txt_mobileLogin"});
            hqq.setSprite(cc.find("login2/txt_account",this.node),{path:"base/language/"+hqq.language+"/ninetwo/img/txt_account"});
            hqq.setSprite(cc.find("login2/txt_pwd",this.node),{path:"base/language/"+hqq.language+"/ninetwo/img/txt_pwd"});

            hqq.setSkeleton(cc.find("login2/settinganiu",this.node),{path:"base/language/"+hqq.language+"/ninetwo/setting_btn_login/",aniname:"animation",loop:true,timeScale:0.95});
            hqq.setSprite(cc.find("setting/btncontainer/appgx/checkmark/setting_divLine",this.node),{path:"base/ninetwo/img/setting_divLine2"});

            hqq.setSprite(cc.find("loginform",this.login2),{path:"base/language/"+hqq.language+"/ninetwo/img/login_frame2"})
        } else if(hqq.app.pinpai == "tianqi") {
            let blpath = "base/language/" + hqq.language + "/img/"
            hqq.setSprite(this.back, { path: "base/tianqi/img/p_bandalibg2" })
            hqq.setBtn(closebtn, { path: "base/tianqi/img/p_close" , y:270})
            hqq.setBtn(surecg, { path: blpath + "surecg" ,x:0})

            hqq.setSprite(title_changehead, { path: blpath + "title_changehead", y:235})

            // hqq.setSprite(title_bdali, { path: blpath + "title_bdali" })
            // hqq.setSprite(bdali_form, { path: blpath + "bdali_form" })
            title.setPositionEx(title.getPosition().x,235);
            hqq.setSprite(titile_tip, { path: blpath + "titile_tip" })
            hqq.setSprite(inputurnickname, { path: blpath + "inputurnickname" })

            hqq.setBtn(copybtn, { path: "base/img/getcodebtn" })

            hqq.setSprite(title_login, { path: blpath + "title_login" , y:235})
            hqq.setBtn(txt_forgetpwd, { path: blpath + "txt_forgetpwd" })

            hqq.setBtn(webbtn, { path: "base/img/getcodebtn" })
            hqq.setBtn(appbtn, { path: "base/img/getcodebtn", active: false })

            hqq.setSprite(usdttitle, { path: blpath + "title_usdt" ,y:235})
            hqq.setSprite(usdteditboxback, { path: blpath + "popup_usdt_frame" })
            let bindusdtAddress = cc.find("smallsublayer/bindusdt/adress")
            bindusdtAddress.getChildByName("TEXT_LABEL").getComponent(cc.Widget).left = 0;
            bindusdtAddress.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Widget).left = 0;

            registertitle.setPositionEx(registertitle.getPosition().x,235);

            title.getComponent(cc.Label).string = hqq.getTip("imchoice")
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")
        } else if(hqq.app.pinpai == "wansheng") {
            tip0.getComponent(cc.Label).fontSize = 28
            tip0.getComponent(cc.Label).lineHeight = 28
            tip1.getComponent(cc.Label).fontSize = 28
            tip1.getComponent(cc.Label).lineHeight = 28
            let bpath = "base/wansheng/img/"
            let blpath = "base/language/" + hqq.language + "/wansheng/"
            let hpath = "wansheng/img/"
            let hlpath = "language/" + hqq.language + "/wansheng/"
            hqq.setSprite(this.back, { path: bpath + "jd_p_bandalibg_2", width: 857, height: 529 })
            hqq.setBtn(surecg, { path: bpath + "jd_p_btn_1_3" , x:0})
            hqq.addNode(surecg, { string: "qr",fontSize:32,lineHeight:35,color:cc.color(148,81,10,255),y:0,bold:true })
            hqq.setBtn(closebtn, { path: bpath + "jd_popup_btn_close", x: 365, y: 221 , width:119, height:70})

            hqq.setBtn(copybtn, { path: bpath + "jd_p_btn_1_3" })
            hqq.setLabel(btnlabel, { fontSize:32,lineHeight:35,color:cc.color(148,81,10,255),y:0,bold:true })
            
            let proxycodechangehead_di = cc.find("smallsublayer/proxycode/changehead_di")
            hqq.setSprite(proxycodechangehead_di, { path: bpath + "jd_p_inputBox_1", width: 550, type: cc.Sprite.Type.SLICED })
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            info.getComponent(cc.Label).color = cc.color(11,52,96,255)
            info.getComponent(cc.Label).string = hqq.getTip("proxy2")
            this.tiplayerinfo.color = cc.color(11,52,96,255)
            this.tiplayerinfo.node.setPositionEx(this.tiplayerinfo.node.getPosition().x,this.tiplayerinfo.node.getPosition().y-30);

            downlabel.getComponent(cc.Label).color = cc.color(84,98,119,255);
            downlabel2.getComponent(cc.Label).color = cc.color(84,98,119,255);

            //正式注册页 调整
            let rlogin_form = cc.find("smallsublayer/register/login_form")
            rlogin_form.active = false
            let login_form1 = cc.find("smallsublayer/register/login_form1")
            login_form1.active = false
            let register = cc.find("smallsublayer/register")
            hqq.addNode(register,{path: blpath+"jd_popup_form_signUp"});
            hqq.addNode(register,{path: blpath+"jd_popup_title_signUp",x:-350,y:225});
            registertitle.active = false;
            title0.active = false;
            title1.active = false;
            title2.active = false;
            accountnode.setPositionEx(120,115);
            accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass0node.setPositionEx(120,5);
            pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass1node.setPositionEx(120,-105);
            pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            tip0.getComponent(cc.Label).color = cc.color(236,105,65,255)
            tip0.getComponent(cc.Label).fontSize = 24;
            tip0.getComponent(cc.Label).string = hqq.getTip("tip2")
            tip1.getComponent(cc.Label).color = cc.color(236,105,65,255)
            tip1.getComponent(cc.Label).fontSize = 24;
            tip1.getComponent(cc.Label).string = hqq.getTip("tip3")

        } else if (hqq.app.pinpai == "jiaxing" || hqq.app.pinpai === "jinma" ) {
            tip0.getComponent(cc.Label).fontSize = 28
            tip0.getComponent(cc.Label).lineHeight = 28
            tip0.getComponent(cc.Label).color = cc.color(255,160,71,255);
            tip1.getComponent(cc.Label).fontSize = 28
            tip1.getComponent(cc.Label).lineHeight = 28
            tip1.getComponent(cc.Label).color = cc.color(255,160,71,255);
            let bpath = "base/jiaxing/img/"
            let blpath = "base/language/" + hqq.language + "/jiaxing/"
            let hpath = "jiaxing/img/"
            let hlpath = "language/" + hqq.language + "/img/"
            hqq.setSprite(this.back, { path: bpath + "d_ggtc", width: 857, height: 529 , type: cc.Sprite.Type.SLICED})
            hqq.addNode(this.back, { path: "base/jiaxing/img/d_tit" , y:260,name:"d_tit"})
            hqq.setBtn(surecg, { path: bpath + "btn_2" ,x:0})
            hqq.addNode(surecg, { string: "qr",fontSize:32,lineHeight:35,color:cc.color(255,255,255,255),y:0,bold:true })
            hqq.setBtn(closebtn, { path: bpath + "btn_x", x: 420, y: 260 , width:78, height:78})
            hqq.setSprite(title_changehead, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "17", x:0,y: 260 })
            let changehead_di = cc.find("smallsublayer/changehead/changehead_di")
            changehead_di.active = false

            // hqq.setSprite(titile_tip, { path: hlpath + "jd_popup_title_changeNickname", x:-315,y: 225 })
            titile_tip.active = false;
            hqq.addNode(cc.find("smallsublayer/nickchange"),{string:"nickchangetitle",x:0,y:255,bold:true,fontSize:45,lineHeight:50,color:cc.color(242,222,149)})
            hqq.setSprite(inputurnickname, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "4", y: 20, width: 600, type: cc.Sprite.Type.SLICED })

            hqq.setSprite(title_login, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "15", x:0,y: 260 })
            login_form.active = false
            let login = cc.find("smallsublayer/login")
            hqq.addNode(login, { path: bpath + "4", zIndex: 0, width: 560, y: 100, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { path: bpath + "4", zIndex: 0, width: 560, type: cc.Sprite.Type.SLICED })
            hqq.addNode(login, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "19", x: -250, y: 100, })
            hqq.addNode(login, { Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "18", x: -250, y: 0, })
            hqq.setBtn(txt_forgetpwd, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "25" })
            // login.getChildByName("phoneeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("phoneeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // login.getChildByName("phoneeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("phoneeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            // login.getChildByName("passeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("passeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // login.getChildByName("passeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            login.getChildByName("passeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;


            hqq.setBtn(copybtn, { path: bpath + "btn_2" ,x:0})
            hqq.setLabel(copybtn.getChildByName("btnlabel"), { string: "copy",fontSize:32,lineHeight:35,color:cc.color(255,255,255,255),y:0,bold:true })
            // hqq.setNode(btnlabel, { color: cc.color(187, 187, 187,255) })

            hqq.addNode(this.imnode, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "tit_kffk", x:0,y: 260 })
            hqq.setBtn(webbtn, { path: bpath + "btn_2" })
            hqq.setBtn(appbtn, { path: bpath + "btn_2", active: false })
            weblabel.getComponent(cc.Label).color = cc.color(255, 255, 255,255)
            applabel.getComponent(cc.Label).color = cc.color(255, 255, 255,255)
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")

            let rlogin_form = cc.find("smallsublayer/register/login_form")
            rlogin_form.active = false
            let login_form1 = cc.find("smallsublayer/register/login_form1")
            login_form1.active = false
            let register = cc.find("smallsublayer/register")
            register.active = true;
            // hqq.addNode(register,{path:hlpath+"jd_popup_form_signUp"});
            hqq.addNode(register,{ path:blpath+"6",x:0,y:260});
            hqq.addNode(register, { path: bpath + "4", zIndex: 0, width: 630,height:64, x: 25, y: 150, type: cc.Sprite.Type.SLICED })
            hqq.addNode(register, { path: bpath + "4", zIndex: 0, width: 630,height:64, x: 25, y: 40, type: cc.Sprite.Type.SLICED })
            hqq.addNode(register, { path: bpath + "4", zIndex: 0, width: 630,height:64, x: 25, y: -70, type: cc.Sprite.Type.SLICED })
            hqq.addNode(register, { path: bpath + "19", zIndex: 0, x: -250, y: 150 })
            hqq.addNode(register, { path: bpath + "21", zIndex: 0, x: -250, y: 40 })
            hqq.addNode(register, { path: bpath + "18", zIndex: 0, x: -250, y: -70 })

            registertitle.active = false;
            title0.active = false;
            title1.active = false;
            title2.active = false;
            accountnode.setPositionEx(0,150);
            // accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass1node.setPositionEx(0,40);
            // pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass1node.setPositionEx(0,-70);
            // pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            // tip0.color = cc.color(236,105,65,255)
            tip0.getComponent(cc.Label).fontSize = 24;
            tip0.getComponent(cc.Label).string = hqq.getTip("tip2")
            tip0.setPositionEx(tip0.getPosition().x,95);
            // tip1.color = cc.color(236,105,65,255)
            tip1.getComponent(cc.Label).fontSize = 24;
            tip1.getComponent(cc.Label).string = hqq.getTip("tip3")
            tip1.setPositionEx(tip1.getPosition().x,-15);

            register.active = false;

            let proxycodechangehead_di = cc.find("smallsublayer/proxycode/changehead_di")
            hqq.setSprite(proxycodechangehead_di, { path: bpath + "4", width: 550, type: cc.Sprite.Type.SLICED })
            // cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            let bindusdt = cc.find("smallsublayer/bindusdt")
            hqq.addNode(bindusdt, { path: bpath + "4", zIndex: 0, width: 570, x: 90, y: 95, type: cc.Sprite.Type.SLICED })
            hqq.addNode(bindusdt, { path: bpath + "4", zIndex: 0, width: 460, x: 90, y: -25, type: cc.Sprite.Type.SLICED })
            hqq.setSprite(usdttitle, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "13", x:0,y: 260 })
            hqq.addNode(bindusdt, { string: "usdtllx", x: -280, y: -25 ,fontSize:32,color:cc.color(232,169,98),bold:true})
            hqq.addNode(bindusdt, { string: "usdtqbdz", x: -290, y: 95 ,fontSize:32,color:cc.color(232,169,98),bold:true})
            // bindusdt.getChildByName("type").color = cc.color(84,98,119,255);
            // bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            bindusdt.getChildByName("adress").setPositionEx(-163,bindusdt.getChildByName("adress").getPosition().y);
            bindusdt.getChildByName("adress").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            // bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            bindusdt.getChildByName("adress").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            // info.color = cc.color(11,52,96,255)
            info.getComponent(cc.Label).string = hqq.getTip("proxy2")
            // this.tiplayerinfo.node.color = cc.color(11,52,96,255)
            this.tiplayerinfo.node.setPositionEx(this.tiplayerinfo.node.getPosition().x,this.tiplayerinfo.node.getPosition().y-30);

            // downlabel.color = cc.color(84,98,119,255);
            // downlabel2.color = cc.color(84,98,119,255);
        } else if(hqq.app.pinpai == "debi") {
            let blpath = "base/language/" + hqq.language + "/img/"
            hqq.setSprite(this.back, { path: "base/debi/p_bandalibg2" })
            hqq.setBtn(closebtn, { path: "base/debi/p_close" , y:274})
            hqq.setBtn(surecg, { path: "base/debi/btn11" ,x:0, y:-201})
            hqq.addNode(surecg, { string: "qr",fontSize:32,lineHeight:35,color:cc.color(148,81,10,255),y:0,bold:true })
            hqq.setSprite(title_login, { path: blpath + "title_login" , y:239})
            hqq.setBtn(txt_forgetpwd, { path: blpath + "txt_forgetpwd" })

            title.setPositionEx(title.getPosition().x,239);
        } else if(hqq.app.pinpai == "letian") {
            tip0.getComponent(cc.Label).fontSize = 28
            tip0.getComponent(cc.Label).lineHeight = 28
            tip1.getComponent(cc.Label).fontSize = 28
            tip1.getComponent(cc.Label).lineHeight = 28
            let bpath = "base/letian/img/"
            let blpath = "base/language/" + hqq.language + "/letian/"
            let hpath = "letian/img/"
            let hlpath = "language/" + hqq.language + "/letian/"
            hqq.setSprite(this.back, { path: bpath + "jd_p_bandalibg_2", width: 857, height: 529 })
            hqq.setBtn(surecg, { path: bpath + "jd_p_btn_1_3" , x:0})
            hqq.addNode(surecg, { string: "qr",fontSize:32,lineHeight:35,color:cc.color(148,81,10,255),y:0,bold:true })
            hqq.setBtn(closebtn, { path: bpath + "jd_popup_btn_close", x: 365, y: 221 , width:119, height:70})

            hqq.setBtn(copybtn, { path: bpath + "jd_p_btn_1_3" })
            hqq.setLabel(btnlabel, { fontSize:32,lineHeight:35,color:cc.color(148,81,10,255),y:0,bold:true })
            
            let proxycodechangehead_di = cc.find("smallsublayer/proxycode/changehead_di")
            hqq.setSprite(proxycodechangehead_di, { path: bpath + "jd_p_inputBox_1", width: 550, type: cc.Sprite.Type.SLICED })
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            info.getComponent(cc.Label).color = cc.color(11,52,96,255)
            info.getComponent(cc.Label).string = hqq.getTip("proxy2")
            this.tiplayerinfo.color = cc.color(11,52,96,255)
            this.tiplayerinfo.node.setPositionEx(this.tiplayerinfo.node.getPosition().x,this.tiplayerinfo.node.getPosition().y-30);

            downlabel.getComponent(cc.Label).color = cc.color(84,98,119,255);
            downlabel2.getComponent(cc.Label).color = cc.color(84,98,119,255);

            //正式注册页 调整
            let rlogin_form = cc.find("smallsublayer/register/login_form")
            rlogin_form.active = false
            let login_form1 = cc.find("smallsublayer/register/login_form1")
            login_form1.active = false
            let register = cc.find("smallsublayer/register")
            hqq.addNode(register,{path: blpath+"jd_popup_form_signUp"});
            hqq.addNode(register,{path: blpath+"jd_popup_title_signUp",x:-350,y:225});
            registertitle.active = false;
            title0.active = false;
            title1.active = false;
            title2.active = false;
            accountnode.setPositionEx(120,115);
            accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass0node.setPositionEx(120,5);
            pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass1node.setPositionEx(120,-105);
            pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            tip0.getComponent(cc.Label).color = cc.color(236,105,65,255)
            tip0.getComponent(cc.Label).fontSize = 24;
            tip0.getComponent(cc.Label).string = hqq.getTip("tip2")
            tip1.getComponent(cc.Label).color = cc.color(236,105,65,255)
            tip1.getComponent(cc.Label).fontSize = 24;
            tip1.getComponent(cc.Label).string = hqq.getTip("tip3")

        } else if(hqq.app.pinpai === "quyou"){
            let blpath = "base/language/" + hqq.language + "/img/"
            let bpath = "base/quyou/"

            hqq.setSprite(this.back, { path: "base/quyou/small",width:746,height:510 })
            if(!this.back.getChildByName("vxcvxc")){
                hqq.addNode(this.back,{path:"base/quyou/vxcvxc",width:650,height:260,zindex:0,name:"vxcvxc"});
            }
            hqq.setBtn(closebtn, { path: bpath+"bcdrrere" ,x:340,y:210,width:78,height:78})
            if(this.data){
                if(this.data.type === 8 ){
                    hqq.setSprite(surecg, { path: bpath + "vcbdfer" ,x:0,y:-105})
                } else{
                    hqq.setSprite(surecg, { path: bpath + "vcbdfer" ,x:0,y:-180})
                }
            } else{
                hqq.setSprite(surecg, { path: bpath + "vcbdfer" ,x:0,y:-180})
            }
            
            let surecglabel =hqq.addNode(surecg,{string:"showtip105",fontSize:35,lineHeight:40,bold:true,color:cc.color(0,0,0,255),y:5});
            let surecglabelshadow = surecglabel.addComponent(cc.LabelShadow);
            surecglabelshadow.color = cc.color("#291A1A");
            surecglabelshadow.offset = new cc.Vec2(1, 1);
            surecglabelshadow.blur = 2;

            hqq.setSprite(title_changehead, { path: blpath + "title_changehead",y:230 })

            // hqq.setSprite(title_bdali, { path: blpath + "title_bdali" })
            // hqq.setSprite(bdali_form, { path: blpath + "bdali_form" })

            hqq.setSprite(titile_tip, { path: blpath + "titile_tip" })
            hqq.setSprite(inputurnickname, { path: blpath + "inputurnickname" })

            hqq.setBtn(copybtn, { path: "base/quyou/vcbdfer" ,y:60})

            hqq.setBtn(webbtn, { path: "base/quyou/vcbdfer" })
            hqq.setBtn(appbtn, { path: "base/quyou/vcbdfer", active: false })

            hqq.setSprite(usdttitle, { path: blpath + "title_usdt" ,y:230})
            hqq.setSprite(usdteditboxback, { path: blpath + "popup_usdt_frame" })

            let login = cc.find("smallsublayer/login")
            login.active = true;
            login.getChildByName("login_form").active = false;

            // hqq.setSprite(title_login, { path: blpath + "title_login" , y:230})
            hqq.setBtn(txt_forgetpwd, { path: blpath + "fdsfdstttr" })

            let loginvfxgfx1 = hqq.addNode(login,{path:bpath+"vfxgfx",x:0,y:76,zIndex:1});
            hqq.addNode(loginvfxgfx1,{path:bpath+"gfdgf",x:-228})
            let loginvfxgfx2 = hqq.addNode(login,{path:bpath+"vfxgfx",x:0,y:-24,zIndex:1});
            hqq.addNode(loginvfxgfx2,{path:bpath+"jyuyt",x:-228})

            login.getChildByName("phoneeditbox").setPositionEx(49.778,74.412)
            login.getChildByName("phoneeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
            login.getChildByName("phoneeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            login.getChildByName("phoneeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
            login.getChildByName("phoneeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;

            login.getChildByName("passeditbox").setPositionEx(49.778,-24.588)
            login.getChildByName("passeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
            login.getChildByName("passeditbox").getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            login.getChildByName("passeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84, 98, 119, 255);
            login.getChildByName("passeditbox").getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            login.active = false;

            let rlogin_form = cc.find("smallsublayer/register/login_form")
            rlogin_form.active = false
            let login_form1 = cc.find("smallsublayer/register/login_form1")
            login_form1.active = false
            let register = cc.find("smallsublayer/register")
            register.active = true;
            let vfxgfx1 = hqq.addNode(register,{path:bpath+"vfxgfx",x:60,y:115,zIndex:1});
            hqq.addNode(vfxgfx1,{path:bpath+"gfdgf",x:-228})
            let vfxgfx2 = hqq.addNode(register,{path:bpath+"vfxgfx",x:60,y:5,zIndex:1});
            hqq.addNode(vfxgfx2,{path:bpath+"jyuyt",x:-228})
            let vfxgfx3 = hqq.addNode(register,{path:bpath+"vfxgfx",x:60,y:-105,zIndex:1});
            hqq.addNode(vfxgfx3,{path:bpath+"jyuyt",x:-228})
            registertitle.active = false;
            title0.active = false;
            title1.active = false;
            title2.active = false;
            accountnode.setPositionEx(60,115);
            accountnode.getChildByName("TEXT_LABEL").active = true;
            accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            accountnode.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            accountnode.getChildByName("TEXT_LABEL").active = false;
            accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            accountnode.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass0node.setPositionEx(60,5);
            pass0node.getChildByName("TEXT_LABEL").active = true;
            pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass0node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            pass0node.getChildByName("TEXT_LABEL").active = false;
            pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass0node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            pass1node.setPositionEx(60,-105);
            pass1node.getChildByName("TEXT_LABEL").active = true;
            pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass1node.getChildByName("TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            pass1node.getChildByName("TEXT_LABEL").active = false;
            pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            pass1node.getChildByName("PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            tip0.getComponent(cc.Label).color = cc.color(236,105,65,255)
            tip0.getComponent(cc.Label).fontSize = 22;
            tip0.getComponent(cc.Label).string = hqq.getTip("tip2")
            tip1.getComponent(cc.Label).color = cc.color(236,105,65,255)
            tip1.getComponent(cc.Label).fontSize = 22;
            tip1.getComponent(cc.Label).string = hqq.getTip("tip3")

            register.active = false;

            cc.find("smallsublayer/proxycode/").active = true;
            let changehead_di = cc.find("smallsublayer/proxycode/changehead_di")
            hqq.editboxTipLoad(codeeditboxnode, "proxy4")
            hqq.setSprite(changehead_di,{path:bpath + "vfxgfx",widht:532,height:68});
            info.getComponent(cc.Label).string = hqq.getTip("proxy3")
            info.getComponent(cc.Label).color = cc.color(255,240,118,255);
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            cc.find("smallsublayer/proxycode/codeeditbox/TEXT_LABEL").getComponent(cc.Label).fontSize = 28;
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
            cc.find("smallsublayer/proxycode/codeeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).fontSize = 28;
            cc.find("smallsublayer/proxycode/headfram").active = false;
            cc.find("smallsublayer/proxycode/").active = false;

            title.setPositionEx(title.getPosition().x,235);
            title.getComponent(cc.Label).string = hqq.getTip("imchoice")
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")

            // info.getComponent(cc.Label).color = cc.color(11,52,96,255)
            // info.getComponent(cc.Label).string = hqq.getTip("proxy2")
            this.tiplayerinfo.color = cc.color(255,240,118,255)
            this.tiplayerinfo.node.setPositionEx(this.tiplayerinfo.node.getPosition().x,this.tiplayerinfo.node.getPosition().y-30);
            this.tiplayerinfo.node.getComponent(cc.UITransform).width = 620;

            label.getComponent(cc.Label).color = cc.color(11,52,96,255)

            this.download.active = true;
            btnlabel.setPositionEx(btnlabel.getPosition().x,5);
            btnlabel.getComponent(cc.Label).fontSize = 35;
            downlabel.getComponent(cc.Label).color = cc.color(255,240,118,255);
            downlabel.setPositionEx(downlabel.getPosition().x,110);
            hqq.setNode(downlabel2,{color:cc.color(255,240,118,255),y:-20,width:640})
            this.download.active = false;
        } else {
            let blpath = "base/language/" + hqq.language + "/img/"
            hqq.setSprite(this.back, { path: "base/img/p_bandalibg",width:845,height:516 })
            hqq.setBtn(closebtn, { path: "base/img/p_close" , y:270})
            hqq.setBtn(surecg, { path: blpath + "surecg" ,x:0})

            hqq.setSprite(title_changehead, { path: blpath + "title_changehead",y:230 })

            // hqq.setSprite(title_bdali, { path: blpath + "title_bdali" })
            // hqq.setSprite(bdali_form, { path: blpath + "bdali_form" })

            hqq.setSprite(titile_tip, { path: blpath + "titile_tip" })
            hqq.setSprite(inputurnickname, { path: blpath + "inputurnickname" })

            hqq.setBtn(copybtn, { path: "base/img/getcodebtn" })

            hqq.setSprite(title_login, { path: blpath + "title_login" , y:230})
            hqq.setBtn(txt_forgetpwd, { path: blpath + "txt_forgetpwd" })

            hqq.setBtn(webbtn, { path: "base/img/getcodebtn" })
            hqq.setBtn(appbtn, { path: "base/img/getcodebtn", active: false })

            hqq.setSprite(usdttitle, { path: blpath + "title_usdt" ,y:230})
            hqq.setSprite(usdteditboxback, { path: blpath + "popup_usdt_frame" })

            title.setPositionEx(title.getPosition().x,235);
            title.getComponent(cc.Label).string = hqq.getTip("imchoice")
            weblabel.getComponent(cc.Label).string = hqq.getTip("weblabel")
            applabel.getComponent(cc.Label).string = hqq.getTip("applabel")
        }
    }

    init (data: any) {
        this.headpanelinit = false
        this.changehead.active = false
        this.bindalipay.active = false
        this.nickchange.active = false
        this.login.active = false
        this.nologin.active = false
        this.tiplayer.active = false
        this.download.active = false
        this.weblogin.active = false;
        this.imnode.active = false;
        this.register.active = false;
        this.proxycode.active = false;
        this.usdtnode.active = false;
        this.setting.active = false;
        this.login2.active = false;
        this.data = data;
        this.onMusicChangeTimer = null;
        this.onSoundChangeTimer = null;

        this.UILoad();

        switch (data.type) {
            case 1: // 修改头像
                this.changehead.active = true
                if (!this.headpanelinit) {
                    this.headpanelinit = true
                    this.changeheadInit()
                }
                if(hqq.app.pinpai == "juding"){
                    let hpath = "juding/img/"
                    hqq.addNode(this.back,{Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_popup_inBg"});
                } else if(hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path: "base/huaxing/img/d_tit" , y:260})
                } /* else if(hqq.app.pinpai == "test"){
                    this.exitbtn.y = 270;
                } */
                break;
            case 2: // 绑定支付宝
                this.bindalipay.active = true
                break;
            case 3: // 修改昵称
                this.nickchange.active = true
                if(hqq.app.pinpai=="juding"){
                    let editboxEventHandler = new cc.EventHandler();
                    editboxEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
                    editboxEventHandler.component = this.getClassName()
                    editboxEventHandler.handler = "onnickchangetextChanged";

                    this.nickchange.getChildByName("nickeditbox").getComponent(cc.EditBox).editingDidEnded.push(editboxEventHandler);
                    this.nickchange.getChildByName("nickeditbox").getComponent(cc.EditBox).maxLength = 12;
                    cc.find("smallsublayer/nickchange/nickeditbox/TEXT_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
                    cc.find("smallsublayer/nickchange/nickeditbox/PLACEHOLDER_LABEL").getComponent(cc.Label).color = cc.color(84,98,119,255);
                }  else if(hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path:"base/huaxing/img/d_tit" , y:260})
                }
                break;
            case 4: // 切换账号
                this.login.active = true
                if( hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path: "base/huaxing/img/d_tit" , y:260})
                } /* else{
                    this.exitbtn.y = 260;
                } */
                break;
            case 5: // 切换账号 自动加 id 
                this.login.active = true
                if (hqq.gameGlobal.player.id) {
                    this.login.getChildByName("phoneeditbox").getComponent(cc.EditBox).string = hqq.gameGlobal.player.id
                }
                if( hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path: "base/huaxing/img/d_tit" , y:260})
                } /* else if(hqq.app.pinpai == "test"){
                    this.exitbtn.y = 240;
                } */
                break;
            case 6: // 账号掉线
                this.nologin.active = true
                this.exitbtn.active = false
                if (hqq.app.pinpai == "fuxin" ||hqq.app.pinpai == "juding") {
                    this.surecg.setPositionEx(this.surecg.getPosition().x,-220);
                } else {
                    this.surecg.setPositionEx(this.surecg.getPosition().x,-140);
                }
                /* if(hqq.app.pinpai == "test"){
                    this.exitbtn.y = 240;
                } */
                break;
            case 7: // 账号掉线 加自动登录
                this.login.active = true
                if(hqq.app.pinpai == "tianqi") {
                    if (this.login.getChildByName("txt_autologin")) {
                        this.login.getChildByName("txt_autologin").active = false;
                    }
                } else {
                    if (this.login.getChildByName("txt_autologin")) {
                        this.login.getChildByName("txt_autologin").active = true
                    }
                }
                if (this.login.getChildByName("txt_forgetpwd")) {
                    this.login.getChildByName("txt_forgetpwd").active = false
                }
                if (hqq.gameGlobal.player.id) {
                    this.login.getChildByName("phoneeditbox").getComponent(cc.EditBox).string = hqq.gameGlobal.player.id
                }
               /*  if(hqq.app.pinpai == "test"){
                    this.exitbtn.y = 240;
                } */
                break;
            case 8: // 安装包跳转下载
                this.download.active = true
                if (data.msg) {
                    let label = this.download.getChildByName('downlabel').getComponent(cc.Label)
                    label.string = data.msg || hqq.getTip("reinstall")
                }
                this.exitbtn.active = false
                this.surecg.setPositionEx(this.surecg.getPosition().x,-10);
                if(hqq.app.pinpai ==="huaxing" || hqq.app.pinpai === "jiaxing" || hqq.app.pinpai === "jinma"){
                    hqq.addNode(this.back, { string: "下载" , y:260, bold:true,color:cc.color(240,220,143)})
                }
                // this.clearLocalData()
                break;
            case 9: // 跳转浏览器网页客户端
                this.tiplayerinfo.string = data.msg || hqq.getTip("jumptoweb")
                this.tiplayer.active = true
                if (hqq.app.pinpai == "fuxin" ||hqq.app.pinpai == "juding" ) {
                    this.surecg.setPositionEx(this.surecg.getPosition().x,-220);
                } else {
                    this.surecg.setPositionEx(this.surecg.getPosition().x,-140);
                    /* if(hqq.app.pinpai == "test"){
                        this.exitbtn.y = 240;
                    } */
                }
                break;
            case 10: // 任意提示信息
                this.tiplayerinfo.string = data.msg || hqq.getTip("goldlack")
                if (data.fontSize) {
                    this.tiplayerinfo.fontSize = data.fontSize
                    this.tiplayerinfo.lineHeight = data.fontSize * 1.3
                }
                if(data.fontcolor){
                    this.tiplayerinfo.color = data.fontcolor;
                }
                if(data.horizontalAlign){
                    this.tiplayerinfo.horizontalAlign = data.horizontalAlign;
                }
                this.tiplayer.active = true
                if (hqq.app.pinpai == "fuxin") {
                    let blpath = "base/language/" + hqq.language + "/fuxin/";
                    hqq.addNode(this.tiplayerinfo.node, { path: blpath + "gonggaobiaoti2", y: 200, type: cc.Sprite.Type.SLICED })
                    this.surecg.setPositionEx(this.surecg.getPosition().x,-220);
                } else if(hqq.app.pinpai == "juding"){
                    let hlpath = "language/" + hqq.language + "/juding/";
                    hqq.addNode(this.tiplayerinfo.node, { Res:hqq["hall_"+hqq.app.pinpai],path: hlpath + "gg", x:-350,y: 205, type: cc.Sprite.Type.SLICED })
                    this.surecg.setPositionEx(this.surecg.getPosition().x,-205);
                    let hpath = "juding/img/"
                    hqq.addNode(this.back,{Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_popup_inBg"});
                } else if(hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path: "base/huaxing/img/d_tit" , y:260})
                    hqq.addNode(this.back,{string:"gg",y:255,bold:true,fontSize:45,lineHeight:50,color:cc.color(242,222,149)})
                } else if(hqq.app.pinpai == "jiaxing"  || hqq.app.pinpai === "jinma"){
                    hqq.addNode(this.back, { path: "base/jiaxing/img/d_tit" , y:260})
                    hqq.addNode(this.back,{string:"gg",y:255,bold:true,fontSize:45,lineHeight:50,color:cc.color(242,222,149)})
                } else if(hqq.app.pinpai == "quyou"){
                    hqq.addNode(this.back,{path:"base/language/"+hqq.language+"/quyou/img/gdgdf",y:180})
                    this.surecg.setPositionEx(this.surecg.getPosition().x, -180);
                }else {
                    this.surecg.setPositionEx(this.surecg.getPosition().x,-140);
                    /* if(hqq.app.pinpai == "test"){
                        this.exitbtn.y = 240;
                    } */
                }
                break;
            case 11: // im选择
                this.imnode.active = true
                this.surecg.active = false
                if (hqq.app.pinpai == "xingui") {
                    hqq.addNode(this.back, { path: "base/language/" + hqq.language + "/xingui/kffk", y: 220 })
                } else if( hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path: "base/huaxing/img/d_tit" , y:260})
                }
                this.initImNode()
                /* if(hqq.app.pinpai == "test"){
                    this.exitbtn.y = 240;
                } */
                break;
            case 12: // 注册
                this.register.active = true
                if( hqq.app.pinpai == "huaxing" ){
                    this.back.getComponent(cc.UITransform).width = 897;
                    this.back.getComponent(cc.UITransform).height = 609;
                    hqq.addNode(this.back, { path: "base/huaxing/img/d_tit" , y:260})
                } else if(hqq.app.pinpai === "quyou"){
                    this.back.getChildByName("vxcvxc").getComponent(cc.UITransform).width = 670;
                    this.back.getChildByName("vxcvxc").getComponent(cc.UITransform).height = 310
                }
                break;
            case 13: // 输入上级ID
                this.proxycode.active = true
                if(hqq.app.pinpai == "juding "){
                    let hpath = "juding/img/"
                    hqq.addNode(this.back,{Res:hqq["hall_"+hqq.app.pinpai],path: hpath + "jd_popup_inBg"});
                } else if( hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path: "base/huaxing/img/d_tit" , y:260})
                    hqq.addNode(this.back,{string:"proxytitle",y:255,bold:true,fontSize:45,lineHeight:50,color:cc.color(242,222,149)})
                } else if( hqq.app.pinpai == "jiaxing"  || hqq.app.pinpai === "jinma"){
                    hqq.addNode(this.back,{string:"proxytitle",y:255,bold:true,fontSize:45,lineHeight:50,color:cc.color(242,222,149)})
                } /* else if(hqq.app.pinpai == "test"){
                    this.exitbtn.y = 240;
                } */
                break;
            case 14: // usdt
                this.usdtnode.active = true
                if(hqq.app.pinpai == "huaxing" ){
                    hqq.addNode(this.back, { path: "base/huaxing/img/d_tit" , y:260})
                } /* else if(hqq.app.pinpai == "test"){
                    this.exitbtn.y = 240;
                } */
                break;
            case 15: // web登入
                this.back.active = false;
                this.surecg.removeAllChildren();
                this.surecg.active = false;
                this.scheduleOnce(()=>{
                    if(!cc.isValid(this.node))return;
                    this.back.removeAllChildren();
                    hqq.setSprite(this.back, { path: "base/img/web_sign_bg", size: { width: 700,height:470 } ,active:true})
                    this.weblogin.active = true;
                    let global = hqq.localStorage.getGlobal();
                    let url = window.location.search;
                    let accountstr = "";
                    let passstr = "";
                    if (url.includes("?")){
                        let strs = url.split("?")[1].split("&");
                        for (let i = 0; i < strs.length; i++) {
                            let temp = strs[i].split("=")[1];
                            if (strs[i].split("=")[0] == "account") {
                                accountstr = temp;
                            } else if (strs[i].split("=")[0] == "pass") {
                                passstr = temp;
                            } else if (strs[i].split("=")[0] == "webloginparam") {
                                var uncrypted = hqq.base64.decode(decodeURIComponent(temp));
                                uncrypted = JSON.parse(uncrypted)
                                accountstr = uncrypted.account;
                                passstr = uncrypted.password;
                            } else if (strs[i].split("=")[0] == "proxyID") {
                                hqq.gameGlobal.player.code = temp;
                            }
                            console.log(temp)
                        }
                    }

                    console.log("==============hqq.gameGlobal.player.code=",hqq.gameGlobal.player.code);
                    if(accountstr!= "" && passstr != "" ){
                        if ((!hqq.app.deviceID || hqq.app.deviceID == "empty")){
                            hqq.app.deviceID = this.randDeviceID();
                        }
                        hqq.loginMgr.accountChange(accountstr, passstr, (issucess) => {
                            if (issucess) {
                                let tempurl = new window.URL(window.location.href);
                                var encrypted = hqq.base64.encode(JSON.stringify({
                                    'account': accountstr,
                                    'password': passstr,
                                }));
                                tempurl.searchParams.set("webloginparam",encrypted);
                                // hqq.gameGlobal.player.account_name = accountstr;
                                hqq.gameGlobal.player.account_pass = passstr;
                                hqq.gameGlobal.player.uuid = hqq.app.deviceID;
                                hqq.localStorage.globalSet(hqq.gameGlobal.playerKey, hqq.gameGlobal.player);
                                history.pushState({},"",tempurl.href);
                                this.onClickExit()
                            } else {
                                this.weblogin_login();
                            }
                        })
                        return;
                    } else if( hqq.gameGlobal.player.code ){
                        //hqq.app.deviceID = this.randDeviceID();
                        this.weblogin_register();
                        return
                    }
                    if(data.onlylogin){
                        cc.find("register",this.weblogin).active = false;
                        this.weblogin_login();
                    } else if( data.onlyregister){
                        cc.find("login",this.weblogin).active = false;
                        this.weblogin_register();
                    } else if(global.playerKey != null && global.playerKey.account_name!=""&&global.playerKey.account_pass!=""){
                        this.weblogin_login();
                    } else{
                        this.weblogin_register();
                    }
                },0.5)
                break;
            case 16: // 设置
                this.setting.active = true;
                this.onSettingMenuClick(cc.find("smallsublayer/setting/btncontainer/ylsz").getComponent(cc.Toggle),1);
                this.panelInit(1)
                break;
            case 17:
                this.login2.active = true;
                break;
            case 18:
                if(data.closeloading){
                    this.onClickExit();
                } else{
                    this.loading.active = true;
                }
                break;
        }
        if (data.hideexitbtn) {
            this.exitbtn.active = false
        }
        if (data.exitfunc) {
            this.onClickExit = () => {
                this.node.destroy()
                data.exitfunc()
            }
        }
    }

    randDeviceID():string {
        let randID = ""
        for (let i = 0; i < 3; i++) {
           let s = Math.random().toString(36)
           randID += s.substring(s.indexOf(".") + 1)
        }
        return randID
    }

    registerTextEndCheck (event:cc.EditBox, customEventData: any) {
        cc.log("registerTextEndCheck event=",event)
        let text:string = event.string.toString();
        if (text.length < 6) {
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("tooshort"))
           return
        }
        if (text.length > 12) {
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("toolong"))
           return
        }
        cc.log("registerTextEndCheck text=",text)
        cc.log("registerTextEndCheck match=",text.match(/[0-9a-zA-Z]/g))
        if (!text.match(/[0-9a-zA-Z]/g) || text.match(/[0-9a-zA-Z]/g).length != text.length) {
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("notcontain"))
           return
        }
    }

    registerAccount () {
        let account = this.register.getChildByName("account").getComponent(cc.EditBox).string
        let pass0 = this.register.getChildByName("pass0").getComponent(cc.EditBox).string
        let pass1 = this.register.getChildByName("pass1").getComponent(cc.EditBox).string
        if (account.length < 6) {
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("accountshort"))
           return
        }
        if (account.length > 12) {
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("accountlong"))
           return
        }
        if (account.match(/[0-9a-zA-Z]/g).length != account.length) {
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("accountnotcontain"))
           return
        }
        if (pass0.length < 6 || pass1.length < 6) {
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passshort"))
           return
        }
        if (pass0.length > 12) {
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passlong"))
           return
        }
        if (pass0 != pass1) {
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passdiff"))
           return
        }
        if (pass0.match(/[0-9a-zA-Z]/g).length != pass0.length) {
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passnotcontain"))
           return
        }
        let randid = this.randDeviceID()
        let callback = (data, url) => {
           if (data.code == 200) {
               this.onClickExit()
               hqq.gameGlobal.player.deviceid = randid
               hqq.app.deviceID = randid
               hqq.loginMgr.setPlayerInfo(data)
           } else {
               if (data.code == 404 && data.msg == "uuid is exists") {
                   randid = this.randDeviceID()
                   hqq.http.sendXMLHttpRequest({
                       method: 'POST',
                       urlto: hqq.app.server,
                       endurl: hqq.app.getIpPostEndUrl(9),
                       callback: callback,
                       failcallback: failcallback,
                       needJsonParse: true,
                       param: {
                           uuid: randid,
                           os: hqq.app.os,
                           package_name: hqq.app.packgeName,
                           account_pass: pass1,
                           game_nick: account,
                           role_name: account,
                           proxy_user_id: hqq.gameGlobal.player.code,
                       }
                   })
               } else {
                   hqq.logMgr.log("注册失败:" + data.code + ",信息:" + data, data.msg)
                   hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("registerfail1") + data.code + hqq.getTip("registerfail2") + data.msg)
               }
           }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
           hqq.logMgr.log("注册失败:" + status + ",错误:" + err, readyState)
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("registerfail1") + status + hqq.getTip("registerfail3") + err)
        }
        if (!hqq.gameGlobal.player.code) {
           hqq.gameGlobal.player.code = hqq.app.getGeneralAgency()
        }
        hqq.http.sendXMLHttpRequest({
           method: 'POST',
           urlto: hqq.app.server,
           endurl: hqq.app.getIpPostEndUrl(9),
           callback: callback,
           failcallback: failcallback,
           needJsonParse: true,
           param: {
               uuid: randid,
               os: hqq.app.os,
               package_name: hqq.app.packgeName,
               account_pass: pass1,
               role_name: account,
               proxy_user_id: hqq.gameGlobal.player.code,
           }
        })
    }

    initImNode () {
        let web = this.imnode.getChildByName("web")
        var webclickEventHandler = new cc.EventHandler();
        webclickEventHandler.target = this.node;
        webclickEventHandler.component = this.getClassName();
        webclickEventHandler.handler = "onClickImWeb";
        let webbutton = web.getComponent(cc.Button);
        webbutton.clickEvents.push(webclickEventHandler);
        let app = this.imnode.getChildByName("app")
        if (hqq.app.huanjin != "online") {
           app.active = true
        }
        var appclickEventHandler = new cc.EventHandler();
        appclickEventHandler.target = this.node;
        appclickEventHandler.component = this.getClassName();
        appclickEventHandler.handler = "onCLlickImApp";
        let appbutton = app.getComponent(cc.Button);
        appbutton.clickEvents.push(appclickEventHandler);
    }

    onClickImWeb () {
        if(hqq.app.versionJson[hqq.app.pinpai]){
            if(hqq.app.versionJson[hqq.app.pinpai].live_service){
                if(hqq.app.versionJson[hqq.app.pinpai].live_service.url1){
                    cc.sys.openURL(hqq.app.versionJson[hqq.app.pinpai].live_service.url1);
                    return;
                }
            }
        }
        cc.sys.openURL(hqq.app.versionJson.live_service.url1);
    }

    onCLlickImApp () {
        if (hqq.subModel.im.lanchscene != "") {
           hqq.gameGlobal.imReceive = 0;
           hqq.reflect && hqq.reflect.setOrientation("portrait")
           cc.director.loadScene(hqq.subModel.im.lanchscene)
        } else {
           console.log("请配置im场景")
        }
    }

    clearLocalData () {
        let islocalstorageClear = false
        if (hqq.localStorage) {
           islocalstorageClear = hqq.localStorage.clear()
           if (hqq.app.huanjin == 'dev') {
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("deletelocalstorage"), islocalstorageClear)
           }
        }
        if (cc.sys.isBrowser) {
           return
        }
        let directory = jsb.fileUtils.getWritablePath()
        let isok = jsb.fileUtils.removeDirectory(directory)
        return isok
    }

    downLoadCallback () {
        if (hqq.app.downloadUrl) {
           cc.sys.openURL(hqq.app.downloadUrl)
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
           }  else if (hqq.app.pinpai == "xinlong") {
               cc.sys.openURL("https://temp.wepic666.com?p=12&u=736282263")
           } else if (hqq.app.pinpai == "nineone"){
               cc.sys.openURL("https://temp.wepic666.com?p=6&u=541999022")
           } else if (hqq.app.pinpai == "huangshi"){
               cc.sys.openURL("https://temp.wepic666.com?p=13&u=195201705")
           } else if (hqq.app.pinpai == "juding"){
               cc.sys.openURL("https://temp.wepic666.com?p=15&u=855395847")
           } else {
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("downloadurlerr"))
           }
        }
    }

    nologinCallback () {
        if(hqq.app.pinpai === "ninetwo" ){
            this.node.destroy()
            if (cc.director.getScene().name == "hall" || cc.director.getScene().name == "New Node" ){
                setTimeout(() => {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 17 , hideexitbtn:true})
                }, 500);
            } else{
                hqq.eventMgr.dispatch(hqq.eventMgr.refreshHallChongFuDenLu, null)
            }
        }else{
            this.node.destroy()
            if (cc.director.getScene().name == "hall" || cc.director.getScene().name == "New Node" ){
                setTimeout(() => {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 7 })
                }, 500);
            } else{
                hqq.eventMgr.dispatch(hqq.eventMgr.refreshHallChongFuDenLu, null)
            }  
        }      
    }

    changeheadCallback () {
        let callback = (data, url) => {
           if (data.code == 200) {
               hqq.app.setGameInfo({ game_img: data.msg, })
               this.onClickExit()
           } else {
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("revisefail") + data.msg)
           }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + ",err:" + err, readyState)
        }
        let endurl = hqq.app.getIpPostEndUrl(8)
        let data = {
           id: hqq.gameGlobal.player.id,
           token: hqq.gameGlobal.token,
           image: this.headindex + ".png",
        }
        hqq.http.sendXMLHttpRequest({
           method: 'POST',
           urlto: hqq.app.server + endurl,
           param: data,
           callback: callback,
           failcallback: failcallback,
           needJsonParse: true,
        })
    }

    alipayInputCheck (event: any) {
        let str = ''
        for (let i = 0; i < event.string.length; i++) {
           let input = event.string[i]
           if (!isNaN(input) || ((input >= 'A' && input <= 'Z') || (input >= 'a' && input <= 'z')) || input == "@" || input == ".") {
               str += event.string[i]
           } else if (/[^\u4e00-\u9fa5]/.test(event.string.charCodeAt(i))) { // @ 字符在里面
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("alipaynotsupport"))
           } else {
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("alipayonlysupport"))
           }
        }
        this.bindalipay.getChildByName("alipayeditbox").getComponent(cc.EditBox).string = str
    }

    bindalipayCallback () {
        let url = hqq.gameGlobal.pay.pay_host + "/api/payment_account/saveAccount"
        let alipayaccount = this.bindalipay.getChildByName("alipayeditbox").getComponent(cc.EditBox).string
        if (alipayaccount.length == 0) {
           return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("alipayaccount"))
        }
        for (let i = 0; i < alipayaccount.length; i++) {
           let input = alipayaccount[i]
           if (!isNaN(Number(input)) || ((input >= 'A' && input <= 'Z') || (input >= 'a' && input <= 'z')) || input == "@" || input == ".") {
           } else {
               return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("alipayonlysupport"))
           }
        }
        let shoukuanren = this.bindalipay.getChildByName("shoukuanren").getComponent(cc.EditBox).string
        if (shoukuanren.length == 0) {
           return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("receivername"))
        }
        let obj = {};
        obj = {
           account_card: alipayaccount,
           account_name: shoukuanren,
        };
        let info = JSON.stringify(obj);
        let dataStr = "user_id=" + hqq.gameGlobal.pay.user_id
        dataStr += "&user_name=" + hqq.gameGlobal.pay.user_name
        dataStr += "&action=add&withdraw_type=1&type=2"
        dataStr += "&info=" + info
        dataStr += "&client=" + hqq.gameGlobal.pay.client
        dataStr += "&proxy_user_id=" + hqq.gameGlobal.pay.proxy_user_id
        dataStr += "&proxy_name=" + hqq.gameGlobal.pay.proxy_name
        dataStr += "&package_id=" + hqq.gameGlobal.pay.package_id
        dataStr += "&token=e40f01afbb1b9ae3dd6747ced5bca532"
        dataStr += "&version=1"
        dataStr += "&center_auth=" + hqq.gameGlobal.token
        let callback = (response) => {
           if (response.status == 0) {
               hqq.eventMgr.dispatch(hqq.eventMgr.getPayInfo)
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("actsuccess"))
               this.onClickExit()
           } else {
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, response.msg)
           }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + hqq.getTip("registerfail3") + err, readyState)
        }
        hqq.http.sendXMLHttpRequest({
           method: 'POST',
           urlto: url,
           param: dataStr,
           callback: callback,
           needJsonParse: true,
           failcallback: failcallback,
        })
    }

    nickchangeCallback () {
        let callback = (data, url) => {
           if (data.code == 200) {
               hqq.eventMgr.dispatch(hqq.eventMgr.refreshPlayerinfo, { game_nick: data.msg })
               this.onClickExit()
           } else {
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("revisefail") + data.msg)
           }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + hqq.getTip("registerfail3") + err, readyState)
        }
        let nick = this.nickchange.getChildByName("nickeditbox").getComponent(cc.EditBox).string
        if (nick == "") {
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("usefulnick"))
           return
        }
        let tempstr = nick.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,'');
        let strlength = 0;
        let i = 0;
        for( i = 0;i<tempstr.length;i++){
           let a = tempstr.charAt(i);
           strlength++;
           if( a.match(/\p{sc=Han}/gu) ){
               strlength++;
           }
        }
        if(strlength>12){
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("changenickname"))
           return
        }
        for( i = 0;i < hqq.unusestrlist.length;i++){
           if(tempstr.match(hqq.unusestrlist[i])){
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("changenicknamefail"))
               return;
           }
        }
        nick = tempstr;
        let endurl = hqq.app.getIpPostEndUrl(1)
        let data = {
           id: hqq.gameGlobal.player.id,
           token: hqq.gameGlobal.token,
           game_nick: nick,
        }
        cc.log(hqq.app.server + endurl)
        hqq.http.sendXMLHttpRequest({
           method: 'POST',
           urlto: hqq.app.server + endurl,
           param: data,
           callback: callback,
           failcallback: failcallback,
           needJsonParse: true,
        })
    }

    loginCallback () {
        let account = this.login.getChildByName("phoneeditbox").getComponent(cc.EditBox).string
        let pass = this.login.getChildByName("passeditbox").getComponent(cc.EditBox).string
        if ((!hqq.app.deviceID || hqq.app.deviceID == "empty")){
            hqq.app.deviceID = this.randDeviceID();
        }
        hqq.loginMgr.accountChange(account, pass, (issucess) => {
           if (issucess) {
                hqq.gameGlobal.player.account_pass = pass;
                hqq.gameGlobal.player.uuid = hqq.app.deviceID;
                hqq.localStorage.globalSet(hqq.gameGlobal.playerKey, hqq.gameGlobal.player);
                this.onClickExit()
           } else {
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("changeaccountfail"))
           }
        })
    }

    changeheadInit () {
        this.itemlist = []
        this.headindex = "1"
        let headlen = 10
        if(hqq.app.pinpai == "ninetwo"  || hqq.app.pinpai == "ninethree" || hqq.app.pinpai == "guanying" ){
            headlen = 4;
        }
        this.headscroll.content.getComponent(cc.UITransform).height = Math.floor(headlen / 5) * 155
        let player = hqq.gameGlobal.player
        let headid = parseInt(player.headurl.substring(0, player.headurl.indexOf(".")))
        headid = headid % 10
        for (let i = 0; i < headlen; i++) {
            let headitem = cc.instantiate(this.headitem)
            let tempbool = headitem.active;
            if(!tempbool){
                headitem.active = true;
            }
            if (hqq.app.pinpai == "fuxin" ) {
                let select = headitem.getChildByName("selectsp")
                hqq.setSprite(select, { path: "base/fuxin/img/xz" })
            } else if (hqq.app.pinpai == "xingui") {
                let select = headitem.getChildByName("selectsp")
                hqq.setSprite(select, { path: "base/xingui/img/gou" })
            } else if (hqq.app.pinpai == "juding" ) {
                let select = headitem.getChildByName("selectsp")
                hqq.setSprite(select, { Res:hqq["hall_"+hqq.app.pinpai],path: "juding/img/jd_personal_select" })
            } else if (hqq.app.pinpai == "huaxing" ) {
                let select = headitem.getChildByName("selectsp")
                hqq.setSprite(select, { Res:hqq["hall_"+hqq.app.pinpai],path: "huaxing/img/9" })
            } else if (hqq.app.pinpai == "ninetwo"  || hqq.app.pinpai == "ninethree" || hqq.app.pinpai == "guanying" ) {
                let select = headitem.getChildByName("selectsp")
                hqq.setSprite(select, { Res:hqq["hall_"+hqq.app.pinpai],path: "ninetwo/img/dtxk2",x:0,y:0 })
            }
            if(!tempbool){
                headitem.active = false;
            }
            let head = headitem.getChildByName("masknode").getChildByName("head").getComponent(cc.Sprite)
            
            let x = i % 5
            let y = Math.floor(i / 5)
            
            let headconver = [0,3,6,8];
            if(hqq.app.pinpai == "ninetwo"  || hqq.app.pinpai == "ninethree" || hqq.app.pinpai == "guanying" ){
                hqq.commonTools.loadHeadRes(headconver[i], head,101)
                headitem.setPositionEx( 140 * (i - 1.5) , -130 )
            } else{
                hqq.commonTools.loadHeadRes(i, head,101)
                headitem.setPositionEx(156 * (x - 2), 155 * (-0.5 - y))
            }
            headitem.active = true
            this.itemlist.push(headitem)
            let clickEventHandler = new cc.EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = this.getClassName();
            clickEventHandler.customEventData = i.toString();
            clickEventHandler.handler = "onClickHeadItem";
            let button = headitem.getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);

            this.headscroll.content.addChildEx(headitem)
            if(hqq.app.pinpai == "ninetwo"  || hqq.app.pinpai == "ninethree" || hqq.app.pinpai == "guanying" ){
                if (headid == headconver[i]) {
                    this.onClickHeadItem({ target: headitem }, i)
                }
            }else{
                if (headid == i) {
                    this.onClickHeadItem({ target: headitem }, headid)
                }
            }
        }
    }

    onClickHeadItem (event: any, custom: any) {
        this.headindex = custom + "";
        if(hqq.app.pinpai == "ninetwo"  || hqq.app.pinpai == "ninethree" || hqq.app.pinpai == "guanying"){
            let headconver = [0,3,6,8];
            this.headindex = headconver[Number(custom)] + "";
        }
        event.target.getChildByName("selectsp").active = true
        for (let i = 0; i < this.itemlist.length; i++) {
           if (custom == i) {
           } else {
               this.itemlist[i].getChildByName("selectsp").active = false
           }
        }
    }

    onClickForgetPass () {
        hqq.eventMgr.dispatch(hqq.eventMgr.showBiglayer, 1)
        this.onClickExit()
    }

    onClickAutoLogin () {
        hqq.loginMgr.autoLogin()
    }

    onClickCopyDownurl () {
        if (hqq.reflect) {
           if (hqq.reflect.setClipboard(hqq.app.downloadUrl)) {
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("copyurlsuccess"))
           } else {
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("copyurlfail"))
           }
        }
    }

    onClickExit () {
        if (JSB) {
            let fullPath = jsb.fileUtils.getWritablePath() + "yanzhenma.png";
            jsb.fileUtils.isFileExist(fullPath) && jsb.fileUtils.removeFile(fullPath);
            if (this.temptex) {
                this.temptex.decRef();
                cc.assetManager.releaseAsset(this.temptex);
            }
        }
        this.node.destroy()
    }

    charCodeAddress (s:string):boolean{
        let ret = false;
        for (var i = 0; i < s.length; i++) {//遍历每一个文本字符bai
           if (s.charCodeAt(i) >= 10000) {
               ret = true
           }
        }
        if (s.charCodeAt(0) != 48 || s.charCodeAt(1) != 120) {
           ret = true
        }
        if (s.length != 42) {
           ret = true
        }
        return ret
    }

    onClickUSDT () {
        let address = this.usdtadress.getComponent(cc.EditBox).string
        if (address == '') {
           return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("needaddress"))
        } else if (this.charCodeAddress(address)) {
           return hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("wrongaddress"))
        } else {
           var url = hqq.gameGlobal.pay.pay_host + `/api/payment_account/saveAccount`;
           let obj = {
               wallet_addr: address,
               protocol: this.usdttype.getComponent(cc.Label).string,
           };
           let info = JSON.stringify(obj);
           let dataStr = "user_id=" + hqq.gameGlobal.pay.user_id
           dataStr += "&user_name=" + hqq.gameGlobal.pay.user_name
           dataStr += "&action=add&type=4"
           dataStr += "&info=" + info
           dataStr += "&client=" + hqq.gameGlobal.pay.client
           dataStr += "&proxy_user_id=" + hqq.gameGlobal.pay.proxy_user_id
           dataStr += "&proxy_name=" + hqq.gameGlobal.pay.proxy_name
           dataStr += "&package_id=" + hqq.gameGlobal.pay.package_id
           dataStr += "&token=e40f01afbb1b9ae3dd6747ced5bca532"
           dataStr += "&version=1"
           dataStr += "&center_auth=" + hqq.gameGlobal.token
           let callback = (response) => {
               if (response.status == 0) {
                   hqq.eventMgr.dispatch(hqq.eventMgr.getPayInfo)
                   hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("actsuccess"))
                   this.onClickExit()
               } else {
                   hqq.eventMgr.dispatch(hqq.eventMgr.showTip, response.msg)
               }
           }
           let failcallback = (status, forcejump, url, err, readyState) => {
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + hqq.getTip("registerfail3") + err, readyState)
           }
           hqq.http.sendXMLHttpRequest({
               method: 'POST',
               urlto: url,
               param: dataStr,
               callback: callback,
               needJsonParse: true,
               failcallback: failcallback,
           })
        }
    }

    onClickSure () {
        switch (this.data.type) {
            case 1: // 修改头像
                this.changeheadCallback()
                break;
            case 2: // 绑定支付宝
                this.bindalipayCallback()
                break;
            case 3: // 修改昵称
                this.nickchangeCallback()
                break;
            case 4: // 切换账号
                this.loginCallback()
                break;
            case 5: // 切换账号 自动加 id 
                this.loginCallback()
                break;
            case 6: // 账号掉线
                this.nologinCallback()
                break;
            case 7: // 账号掉线 加自动登录
                this.loginCallback()
                break;
            case 8: // 安装包跳转下载
                this.downLoadCallback()
                break;
            case 9: // 跳转浏览器网页客户端
                // this.openUrl()
                break;
            case 10: // 任意提示信息
            case 11: // im选择
                if (this.data.ensurefunc) {
                    this.data.ensurefunc()
                }
                this.onClickExit();
                break
            case 12: // 注册
                if (this.data.ensurefunc) {
                    this.data.ensurefunc()
                    this.onClickExit();
                } else {
                    this.registerAccount()
                }
                break;
            case 13: // 输入上级ID
                let code = this.proxycode.getChildByName("codeeditbox").getComponent(cc.EditBox).string
                let matchlist = code.match(/[0-9]/g)
                if (!matchlist || matchlist.length != code.length) {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("onlynumber"))
                    return
                }
                this.node.destroy()
                if (this.data.ensurefunc) {
                    this.data.ensurefunc(code)
                } else {
                    hqq.gameGlobal.player.code = code
                    hqq.loginMgr.firstLogin()
                }
                break;
            case 14: // usdt
                this.onClickUSDT()
                break;
            case 15: // 网页版登入
                this.weblogin_click();
                break;
        }
    }

    weblogin_login () {
        hqq.setSprite(cc.find("login",this.weblogin),{path:"base/language/"+hqq.language+"/img/btn_signIn_1"});
        hqq.setSprite(cc.find("register",this.weblogin),{path:"base/language/"+hqq.language+"/img/btn_signUp_0"});

        hqq.setSprite(cc.find("form",this.weblogin),{path:"base/language/"+hqq.language+"/img/web_signIn_form",width:590,height:172});
        let account = cc.find("account",this.weblogin);
        account.getComponent(cc.UITransform).width = 520;
        account.getComponent(cc.UITransform).height = 65;
        account.setPosition(35,118);
        let url = window.location.search;
        let accountstr = null;
        let passstr = null;
        let global = hqq.localStorage.getGlobal();
        if( global.playerKey && global.playerKey.account_name != "" && global.playerKey.account_pass != "" ){
            accountstr = global.playerKey.account_name;
            passstr = global.playerKey.account_pass;
        } else if (url.includes("?")){
            let strs = url.split("?")[1].split("&");
            for (let i = 0; i < strs.length; i++) {
                let temp = strs[i].split("=")[1];
                if (strs[i].split("=")[0] == "account") {
                    accountstr = temp;
                } else if (strs[i].split("=")[0] == "pass") {
                    passstr = temp;
                }  else if (strs[i].split("=")[0] == "webloginparam") {
                    var uncrypted = hqq.base64.decode(decodeURIComponent(temp));
                    uncrypted = JSON.parse(uncrypted)
                    accountstr = uncrypted.account;
                    passstr = uncrypted.password;
                }
                console.log(temp)
            }
        }
        if(accountstr){
            account.getComponent(cc.EditBox).string = accountstr;
        }
        let pass0 = cc.find("pass0",this.weblogin);
        pass0.getComponent(cc.UITransform).width = 520;
        pass0.getComponent(cc.UITransform).height = 65;
        pass0.setPosition(35,13);
        if(passstr){
            pass0.getComponent(cc.EditBox).string = passstr;
        }
        cc.find("pass1",this.weblogin).active = false;
        cc.find("capture",this.weblogin).active = false;
        cc.find("playercode",this.weblogin).active = false;
        cc.find("capturelabel",this.weblogin).active = false;

        hqq.setBtn(this.surecg, { path: "base/language/"+hqq.language+"/img/web_signIn" ,active:true,x:0,y:-180})
    }

    weblogin_register () {
        hqq.setSprite(cc.find("login",this.weblogin),{path:"base/language/"+hqq.language+"/img/btn_signIn_0"});
        hqq.setSprite(cc.find("register",this.weblogin),{path:"base/language/"+hqq.language+"/img/btn_signUp_1"});

        hqq.setSprite(cc.find("form",this.weblogin),{path:"base/language/"+hqq.language+"/img/web_signUp_form",width:590,height:317});
        let account = cc.find("account",this.weblogin);
        account.getComponent(cc.UITransform).width = 520;
        account.getComponent(cc.UITransform).height = 55;
        account.setPosition(35,122);
        account.getComponent(cc.EditBox).string = "";
        let pass0 = cc.find("pass0",this.weblogin);
        pass0.getComponent(cc.UITransform).width = 520;
        pass0.getComponent(cc.UITransform).height = 55;
        pass0.setPosition(35,59);
        pass0.getComponent(cc.EditBox).string = "";
        let pass1 = cc.find("pass1",this.weblogin);
        pass1.getComponent(cc.UITransform).width = 520;
        pass1.getComponent(cc.UITransform).height = 55;
        pass1.setPosition(35,-6);
        pass1.active = true;
        cc.find("capture",this.weblogin).active = true;
        cc.find("playercode",this.weblogin).active = true;
        cc.find("capturelabel",this.weblogin).active = true;
        this.captureans = Math.floor(Math.random()*100)+1 + "";
        let tempquestion = Math.floor(Math.random()*100)+1;
        let tempquestion2 = Math.floor(Math.random()*100)+1;
        if(hqq.gameGlobal.player.code){
            this.weblogin.getChildByName("playercode").getComponent(cc.EditBox).string = hqq.gameGlobal.player.code;
        }
        if(Number(this.captureans)>tempquestion){
            cc.find("capturelabel",this.weblogin).getComponent(cc.Label).string = tempquestion + "+" + (Number(this.captureans)-tempquestion)+"=?"
        } else{
            cc.find("capturelabel",this.weblogin).getComponent(cc.Label).string = tempquestion + "-" + (tempquestion-Number(this.captureans))+"=?"
        }
        hqq.setBtn(this.surecg, { path: "base/language/"+hqq.language+"/img/web_signUp" , active:true,x:0,y:-203})
    }

    weblogin_click () {
        if(this.weblogin.getChildByName("pass1").active){// 注册
            if(this.surecg.getComponent(cc.Button).interactable===false){
                return;
            }
            
            let account = this.weblogin.getChildByName("account").getComponent(cc.EditBox).string
            let pass0 = this.weblogin.getChildByName("pass0").getComponent(cc.EditBox).string
            let pass1 = this.weblogin.getChildByName("pass1").getComponent(cc.EditBox).string
            let capture = this.weblogin.getChildByName("capture").getComponent(cc.EditBox).string
            let playercode = this.weblogin.getChildByName("playercode").getComponent(cc.EditBox).string
            if (account.length < 6) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("accountshort"))
                return
            }
            if (account.length > 12) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("accountlong"))
                return
            }
            if (account.match(/[0-9a-zA-Z]/g).length != account.length) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("accountnotcontain"))
                return
            }
            if (pass0.length < 6 || pass1.length < 6) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passshort"))
                return
            }
            if (pass0.length > 12) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passlong"))
                return
            }
            if (pass0 != pass1) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passdiff"))
                return
            }
            if (pass0.match(/[0-9a-zA-Z]/g).length != pass0.length) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("passnotcontain"))
                return
            }
            if(this.captureans != capture){
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip107"))
                return
            }
            if(playercode.length == 0 ){
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip102"))
                return
            }
            this.surecg.getComponent(cc.Button).interactable = false;
            let randid = this.randDeviceID()
            let callback = (data, url) => {
                if (data.code == 200) {
                    hqq.logMgr.log("h5注册成功: data=" + JSON.stringify(data) + ",url:" + url);
                    this.onClickExit()
                    hqq.gameGlobal.player.deviceid = randid
                    hqq.app.deviceID = randid
                    let tempurl = new window.URL(window.location.href);
                    var encrypted = hqq.base64.encode(JSON.stringify({
                        'account': account,
                        'password': pass0,
                    }));
                    tempurl.searchParams.set("webloginparam",encrypted);
                    // hqq.gameGlobal.player.account_name = account;
                    hqq.gameGlobal.player.account_pass = pass0;
                    hqq.localStorage.globalSet(hqq.gameGlobal.playerKey, hqq.gameGlobal.player);
                    history.pushState({},"",tempurl.href);

                    hqq.loginMgr.setPlayerInfo(data)
                } else {
                    if (data.code == 404 && data.msg == "uuid is exists") {
                        randid = this.randDeviceID()
                        hqq.http.sendXMLHttpRequest({
                            method: 'POST',
                            urlto: hqq.app.server,
                            endurl: hqq.app.getIpPostEndUrl(9),
                            callback: callback,
                            failcallback: failcallback,
                            needJsonParse: true,
                            param: {
                                uuid: randid,
                                os: hqq.app.os,
                                package_name: hqq.app.packgeName,
                                account_pass: pass0,
                                game_nick: account,
                                role_name: account,
                                proxy_user_id: hqq.gameGlobal.player.code,
                            }
                        })
                    } else {
                        if(cc.isValid(this.surecg)){
                            this.surecg.getComponent(cc.Button).interactable = true;
                        }
                        hqq.logMgr.log("注册失败:" + data.code + ",信息:" + data, data.msg)
                        hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("registerfail1") + data.code + hqq.getTip("registerfail2") + data.msg)
                    }
                }
            }
            let failcallback = (status, forcejump, url, err, readyState) => {
                if(cc.isValid(this.surecg)){
                    this.surecg.getComponent(cc.Button).interactable = true;
                }
                hqq.logMgr.log("注册失败:" + status + ",错误:" + err, readyState)
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("registerfail1") + status + hqq.getTip("registerfail3") + err)
            }
            if (!hqq.gameGlobal.player.code) {
                hqq.gameGlobal.player.code = hqq.app.getGeneralAgency()
             }
            hqq.http.sendXMLHttpRequest({
                method: 'POST',
                urlto: hqq.app.server,
                endurl: hqq.app.getIpPostEndUrl(9),
                callback: callback,
                failcallback: failcallback,
                needJsonParse: true,
                param: {
                    uuid: randid,
                    os: hqq.app.os,
                    package_name: hqq.app.packgeName,
                    account_pass: pass1,
                    role_name: account,
                    proxy_user_id: hqq.gameGlobal.player.code,
                }
            })
        } else{// 登入
            let account = this.weblogin.getChildByName("account").getComponent(cc.EditBox).string
            let pass = this.weblogin.getChildByName("pass0").getComponent(cc.EditBox).string
            if ((!hqq.app.deviceID || hqq.app.deviceID == "empty")){
                hqq.app.deviceID = this.randDeviceID();
            }
            hqq.loginMgr.accountChange(account, pass, (issucess) => {
                if (issucess) {
                    let tempurl = new window.URL(window.location.href);
                    var encrypted = hqq.base64.encode(JSON.stringify({
                        'account': account,
                        'password': pass,
                    }));
                    tempurl.searchParams.set("webloginparam",encrypted);
                    // hqq.gameGlobal.player.account_name = account;
                    hqq.gameGlobal.player.account_pass = pass;
                    hqq.localStorage.globalSet(hqq.gameGlobal.playerKey, hqq.gameGlobal.player);
                    history.pushState({},"",tempurl.href);
                    this.onClickExit()
                } else {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("changeaccountfail"))
                }
            })
        }
    }

    onnickchangetextChanged (event: any, custom: any) {
        let tempstr = event.string.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,'');
        let strlength = 0;
        let i = 0;
        for( i = 0;i<tempstr.length;i++){
           let a = tempstr.charAt(i);
           strlength++;
           if( a.match(/\p{sc=Han}/gu) ){
               strlength++;
           }
        }
        if(strlength>12){
           hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("changenickname"))
           return
        }
        for( i = 0;i < hqq.unusestrlist.length;i++){
           if(tempstr.match(hqq.unusestrlist[i])){
               hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("changenicknamefail"))
               return;
           }
        }
        event.string = tempstr;
    }
    onMusicChange(value)
    {
        if(this.onMusicChangeTimer){
            clearTimeout(this.onMusicChangeTimer)
        }
        this.onMusicChangeTimer = setTimeout(() => {
            hqq.audioMgr.setBgVolume(value);
        }, 100);
    }

    onSoundChange(value)
    {
        if(this.onSoundChangeTimer){
            clearTimeout(this.onSoundChangeTimer)
        }
        this.onSoundChangeTimer = setTimeout(() => {
            hqq.audioMgr.setEffectVolume(value);
        }, 100);
    }

    onPlayBG(event,customEventData){
        hqq.audioMgr.playBg( "hallbg" , null , Number(customEventData) );
    }
    onSettingMenuClick( toggle , customEventData ){
        
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/Background",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/d_menu"});
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/Background/zi",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"language/"+hqq.language+"/ninetwo/img/ylsz1"});
        
        hqq.setSkeleton(cc.find("setting/btncontainer/ylsz/checkmark/dating_menu_btn_selected",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/setting_menu_btn_selected/",aniname:"animation",loop:true,timeScale:0.95});
        
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/zi",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"language/"+hqq.language+"/ninetwo/img/ylsz2"});
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks",this.node),{path:"base/ninetwo/img/yjks",width:630,height:380, type: cc.Sprite.Type.SLICED});
        
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks/sliderBGM/Background",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/19"});
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks/sliderBGM/progressBar",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/19"});
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks/sliderBGM/progressBar/bar",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/18"})
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks/sliderBGM/Handle",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/11"});

        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks/sliderSound/Background",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/19"});
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks/sliderSound/progressBar",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/19"});
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks/sliderSound/progressBar/bar",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/18"});
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks/sliderSound/Handle",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/11"});

        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks/setting_divLine",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/setting_divLine"});

        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks/yylxradio/toggle1/Background",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/15"});
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks/yylxradio/toggle1/checkmark",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/14"});
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks/yylxradio/toggle2/Background",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/15"});
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks/yylxradio/toggle2/checkmark",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/14"});
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks/yylxradio/toggle3/Background",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/15"});
        hqq.setSprite(cc.find("setting/btncontainer/ylsz/checkmark/yjks/yylxradio/toggle3/checkmark",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/14"});

        hqq.setSkeleton(cc.find("setting/btncontainer/ylsz/checkmark/yjks/settinganiu",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"language/"+hqq.language+"/ninetwo/setting_btn_quitAccount/",aniname:"animation",loop:true,timeScale:0.95});

        hqq.setSprite(cc.find("setting/btncontainer/dlmm/Background",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/d_menu"});
        hqq.setSprite(cc.find("setting/btncontainer/dlmm/Background/zi",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"language/"+hqq.language+"/ninetwo/img/dlmm1"});

        // cc.find("setting/btncontainer/dlmm/checkmark",this.node).active = true;
        hqq.setSkeleton(cc.find("setting/btncontainer/dlmm/checkmark/dating_menu_btn_selected",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/setting_menu_btn_selected/",aniname:"animation",loop:true,timeScale:0.95});
        
        hqq.setSprite(cc.find("setting/btncontainer/dlmm/checkmark/zi",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"language/"+hqq.language+"/ninetwo/img/dlmm2"});
        
        hqq.setSprite(cc.find("setting/btncontainer/appgx/Background",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/d_menu"});
        hqq.setSprite(cc.find("setting/btncontainer/appgx/Background/zi",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"language/"+hqq.language+"/ninetwo/img/appgx1"});

        // cc.find("setting/btncontainer/appgx/checkmark",this.node).active = true;
        hqq.setSkeleton(cc.find("setting/btncontainer/appgx/checkmark/dating_menu_btn_selected",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/setting_menu_btn_selected/",aniname:"animation",loop:true,timeScale:0.95});

        hqq.setSprite(cc.find("setting/btncontainer/appgx/checkmark/zi",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"language/"+hqq.language+"/ninetwo/img/appgx2"});
        hqq.setSprite(cc.find("setting/btncontainer/appgx/checkmark/setting_divLine",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/setting_divLine"});

        // cc.find("setting/btncontainer/appgx/checkmark",this.node).active = false;

        if( Number( customEventData) === 1 ){
            this.sliderBGM = cc.find("smallsublayer/setting/btncontainer/ylsz/checkmark/yjks/sliderBGM").getComponent(hqqSlider);
            this.sliderSound = cc.find("smallsublayer/setting/btncontainer/ylsz/checkmark/yjks/sliderSound").getComponent(hqqSlider);
            this.sliderBGM.setCallBackOnChange(this.onMusicChange.bind(this))
            this.sliderSound.setCallBackOnChange(this.onSoundChange.bind(this))
            if(hqq.audioMgr.getBgState()){
                this.sliderBGM.setProgress(hqq.audioMgr.getBgVolume());
            } else{
                this.sliderBGM.setProgress(0);
            }
            if(hqq.audioMgr.getEffectState()){
                this.sliderSound.setProgress(hqq.audioMgr.getEffectVolume());
            } else{
                this.sliderSound.setProgress(0);
            }
            let musicindex = hqq.localStorage.globalGet( "musiceIndexKey" );
            cc.find("smallsublayer/setting/btncontainer/ylsz/checkmark/yjks/yylxradio/toggle" + musicindex ).getComponent(cc.Toggle).setIsCheckedWithoutNotify(true);
        } else if( Number( customEventData ) === 2){
            cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark/yjks/mmxg/getcodebtn/btnlabel").getComponent(cc.Label).string = hqq.getTip("sendcode");
            cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle2/checkmark/yjks/mmxg/getcodebtn/btnlabel").getComponent(cc.Label).string = hqq.getTip("sendcode");
            cc.find("setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1",this.node).getComponent(cc.Toggle).setIsCheckedWithoutNotify(true);
            this.onSettingLoginTabCallback(cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1").getComponent(cc.Toggle),1);
        } else if( Number( customEventData) === 4 ){
            let appversion = cc.find("btncontainer/appgx/checkmark/appbbhvalue",this.setting);
            appversion.getComponent(cc.Label).string = hqq.app.apkVersion;
            let zybbbhvalue = cc.find("btncontainer/appgx/checkmark/zybbbhvalue",this.setting);
            zybbbhvalue.getComponent(cc.Label).string = (hqq.localStorage.globalGet(hqq.app.versionKey) || "1.0.0");
            let hcdxvalue = cc.find("btncontainer/appgx/checkmark/hcdxvalue",this.setting);
            hcdxvalue.getComponent(cc.Label).string = hqq.localStorage.getSize();
        }
        // if(cc.isValid(toggle)){
        //     toggle.setIsCheckedWithoutNotify(true);
        // }
    }
    onSettingLoginSaveAccountCallback() {
        let checkbox = cc.find("20/17",this.login2 );
        checkbox.active = !checkbox.active;
        hqq.localStorage.globalSet("SettingSaveAccount",checkbox.active)
    }

    onSettingLoginCallback() {
        let account = cc.find("account",this.login2).getComponent(cc.EditBox).string
        let pass = cc.find("pass",this.login2).getComponent(cc.EditBox).string
        hqq.loginMgr.accountChange(account, pass, (issucess) => {
            if (issucess) {
                hqq.gameGlobal.player.account_pass = pass;
                hqq.gameGlobal.player.uuid = hqq.app.deviceID;
                hqq.localStorage.globalSet(hqq.gameGlobal.playerKey, hqq.gameGlobal.player);
                this.onClickExit()
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("changeaccountfail"))
            }
        })
    }

    onSettingLoginTabCallback(toggle,customEventData) {
        hqq.setSkeleton(cc.find("setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/Background",this.node),{path:"base/ninetwo/setting_tabunselect/",aniname:"animation",loop:true,timeScale:0.95});
        
        // cc.find("setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark",this.node).active = true;
        
        hqq.setSkeleton(cc.find("setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark/setting_menu_btn_selected",this.node),{path:"base/ninetwo/setting_tabselect/",aniname:"animation",loop:true,timeScale:0.95});
        
        hqq.setSprite(cc.find("setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark/yjks",this.node),{path:"base/ninetwo/img/yjks",width:630,height:380, type: cc.Sprite.Type.SLICED});
        hqq.setSprite(cc.find("setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark/yjks/mmxg",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/mmxg",width:607.68,height:276,y:33.637});

        hqq.setSkeleton(cc.find("setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark/yjks/mmxg/getcodebtn",this.node),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/setting_btn_sendCode/",aniname:"animation",loop:true,timeScale:0.95});
        hqq.setSkeleton(cc.find("setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark/yjks/settinganiu",this.node),{path:"base/language/"+hqq.language+"/ninetwo/setting_btn_ok/",aniname:"animation",loop:true,timeScale:0.95});

        // cc.find("setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark",this.node).active = false;

        hqq.setSkeleton(cc.find("setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle2/Background",this.node),{path:"base/ninetwo/setting_tabunselect/",aniname:"animation",loop:true,timeScale:0.95});
        hqq.setSkeleton(cc.find("setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle2/checkmark/setting_tabselect",this.node),{path:"base/ninetwo/setting_tabselect/",aniname:"animation",loop:true,timeScale:0.95});
        
        let toggle2checkmark =cc.find("setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle2/checkmark",this.node);
        let tempbool = toggle2checkmark.active;
        if(!tempbool){
            toggle2checkmark.active = true
        }
        hqq.setSprite(cc.find("yjks",toggle2checkmark),{path:"base/ninetwo/img/yjks",width:630,height:380, type: cc.Sprite.Type.SLICED});
        hqq.setSprite(cc.find("yjks/mmxg",toggle2checkmark),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/img/mmxg",width:607.68,height:276,y:33.637});

        hqq.setSkeleton(cc.find("yjks/mmxg/getcodebtn",toggle2checkmark),{Res:hqq["hall_"+hqq.app.pinpai],path:"ninetwo/setting_btn_sendCode/",aniname:"animation",loop:true,timeScale:0.95});
        hqq.setSkeleton(cc.find("yjks/settinganiu",toggle2checkmark),{path:"base/language/"+hqq.language+"/ninetwo/setting_btn_ok/",aniname:"animation",loop:true,timeScale:0.95});
        
        if(!tempbool){
            toggle2checkmark.active = false
        }

        let tabIndex = Number(customEventData);
        if(tabIndex === 1 ){
            // hqq.setSprite(cc.find("loginform",this.login2),{Res:hqq["hall_"+hqq.app.pinpai],path:"language/"+hqq.language+"/ninetwo/img/loginform"})
            cc.find("account/PLACEHOLDER_LABEL",this.login2).getComponent(cc.Label).string = hqq.getTip("enteraccount");
        } else if( tabIndex === 2 ){
            // hqq.setSprite(cc.find("loginform",this.login2),{Res:hqq["hall_"+hqq.app.pinpai],path:"language/"+hqq.language+"/ninetwo/img/loginform2"})
            cc.find("account/PLACEHOLDER_LABEL",this.login2).getComponent(cc.Label).string = hqq.getTip("showtip32");
        }
        
        // if(cc.isValid(toggle)){
        //     toggle.setIsCheckedWithoutNotify(true);
        // }
    }

    onSettingChangeAccountCallback() {
        this.onClickExit();
        setTimeout(() => {
            hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, { type: 17 }); 
        }, 500);
    }

    onSettingAQMCallback() {
        let resetsurebtn = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle2/checkmark/yjks/settinganiu").getComponent(cc.Button);
        let phonenum = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle2/checkmark/yjks/mmxg/account").getComponent(cc.EditBox).string
        let yanzhenmanum = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle2/checkmark/yjks/mmxg/captcha").getComponent(cc.EditBox).string
        let capchanum = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle2/checkmark/yjks/mmxg/phone").getComponent(cc.EditBox).string
        let passnum = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle2/checkmark/yjks/mmxg/password").getComponent(cc.EditBox).string
        if (phonenum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip32"))
            return
        }
        if( hqq.gameGlobal.player.phonenum == "" ){
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip71"))
            return
        }
        if( hqq.gameGlobal.player.phonenum != phonenum ){
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip33"))
            return
        }
        if (yanzhenmanum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("entercode"))
            return
        }
        if (capchanum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("capchaed"))
            return
        }
        
        if(passnum.length != 4 ){
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("aqmnotcontain"))
            return
        }
        resetsurebtn.interactable = false
        let url = hqq.gameGlobal.pay.pay_host + "/api/user_funds_password/updatePassword";
        let callback = (response) => {
            cc.log("onSettingAQMCallback callback response=",response)
            if (response.status == 0) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("xgaqmsucess"))
                this.onClickExit();
            } else{
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, response.msg)
                if(cc.isValid(resetsurebtn)){
                    resetsurebtn.interactable = true
                }
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            cc.log("status=",status," forcejump=",forcejump," url=",url," err=",err," readyState=",readyState)
            if(cc.isValid(resetsurebtn)){
                resetsurebtn.interactable = true
            }
        }
        let dataStr = "user_id=" + hqq.gameGlobal.pay.user_id
        dataStr += "&package_id=" + hqq.gameGlobal.pay.package_id
        dataStr += "&token=e40f01afbb1b9ae3dd6747ced5bca532"
        dataStr += "&center_auth=" + hqq.gameGlobal.token
        dataStr += "&code=" + capchanum;
        dataStr += "&password=" + passnum
        hqq.http.sendXMLHttpRequest({
            method: 'POST',
            urlto: url,
            param: dataStr,
            callback: callback,
            needJsonParse: true,
            failcallback: failcallback,
        })
    }
    onSettingAPPGXCallback() {
        if (hqq.localStorage) {
            hqq.localStorage.clear()
        }
        let hcdxvalue = cc.find("btncontainer/appgx/checkmark/hcdxvalue",this.setting);
        hcdxvalue.getComponent(cc.Label).string = hqq.localStorage.getSize();
    }

    onSettingDLMMTabCallback(toggle,customEventData) {
        cc.log("onSettingDLMMTabCallback this.dlmmtabindex=",this.dlmmtabindex," customEventData=",customEventData)
        if(this.dlmmtabindex === Number(customEventData))return;
        this.dlmmtabindex = Number(customEventData);
        this.panelInit(0)
    }

    onClickCaptcha() {
        this.panelInit(0)
    }

    // 注册正式账号初始化
    panelInit(mtype) {
        if (JSB) {
            let fullPath = jsb.fileUtils.getWritablePath() + "yanzhenma.png";
            jsb.fileUtils.isFileExist(fullPath) && jsb.fileUtils.removeFile(fullPath);
            if (this.temptex) {
                cc.assetManager.releaseAsset(this.temptex);
            }
        }

        if (!hqq.app.gameUser) {
            console.log("没有中心服数据")
            return
        }
        let imgurl = ''
        if (hqq.app.server.indexOf("http:") == -1 && hqq.app.server.indexOf("https:") == -1) {
            imgurl = "http://" + hqq.app.server + "/Game/Verify/createCaptcha?"
        } else {
            imgurl = hqq.app.server + "/Game/Verify/createCaptcha?"
        }
        imgurl += "id=" + hqq.app.gameUser.id;
        imgurl += "&token=" + hqq.gameGlobal.token;
        let self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("get", imgurl, true);
        if (JSB) {
            xhr.responseType = "arraybuffer";
        } else {
            xhr.responseType = "blob";
        }
        xhr.onload = function () {
            if (this.status == 200) {
                if (JSB) {
                    var fullPath = jsb.fileUtils.getWritablePath() + "yanzhenma.png";
                    if (jsb.fileUtils.isFileExist(fullPath) && jsb.fileUtils.removeFile(fullPath)) {
                        if (jsb.fileUtils.writeDataToFile(new Uint8Array(this.response), fullPath)) {
                            cc.assetManager.loadRemote(fullPath,{reloadAsset:true}, function (err, data:cc.ImageAsset) {
                                if (err) {
                                    cc.error(err);
                                } else {
                                    if(!cc.isValid(self.captchaimg)&&!cc.isValid(self.captchaimg2))return;
                                    let tex = new cc.Texture2D();
                                    tex.image = data;
                                    self.temptex = tex;
                                    let mspriteFrame = new cc.SpriteFrame();
                                    mspriteFrame.texture = tex;
                                    self.captchaimg.spriteFrame = mspriteFrame;
                                    self.captchaimg2.spriteFrame = mspriteFrame;
                                    self.temptex.addRef();
                                }
                            });
                        } else {
                            cc.log('Remote write file failed.');
                        }
                    } else {
                        if (jsb.fileUtils.writeDataToFile(new Uint8Array(this.response), fullPath)) {
                            cc.assetManager.loadRemote(fullPath,{reloadAsset:true}, function (err, data:cc.ImageAsset) {
                                if (err) {
                                    cc.error(err);
                                } else {
                                    if(!cc.isValid(self.captchaimg)&&!cc.isValid(self.captchaimg2))return;
                                    let tex = new cc.Texture2D();
                                    tex.image = data;
                                    self.temptex = tex;
                                    let mspriteFrame = new cc.SpriteFrame();
                                    mspriteFrame.texture = tex;
                                    self.captchaimg.spriteFrame = mspriteFrame;
                                    self.captchaimg2.spriteFrame = mspriteFrame;
                                    self.temptex.addRef();
                                }
                            });
                        } else {
                            cc.log('Remote write file failed.');
                        }
                    }
                } else {
                    var blob = this.response;
                    let oFileReader = new FileReader();
                    oFileReader.onloadend = function (e) {
                        let base64 = e.target.result;
                        var img = new Image();
                        img.src = base64.toString();
                        img.onload = function () {
                            if(!cc.isValid(self.captchaimg)&&!cc.isValid(self.captchaimg2))return;
                            let imgAsset = new cc.ImageAsset();//重置此图像资源使用的原始图像源
                            imgAsset.reset(img);
                            var texture = new cc.Texture2D();
                            texture.image = imgAsset;
                            var newframe = new cc.SpriteFrame();
                            newframe.texture=texture;
                            self.captchaimg.spriteFrame = newframe;
                            self.captchaimg2.spriteFrame = newframe;
                        }
                    };
                    oFileReader.readAsDataURL(blob);
                }
                xhr.abort()
            }
        }
        xhr.ontimeout = () => {
            xhr.abort()
        }
        xhr.onerror = () => {
            xhr.abort()
        }
        xhr.send();
    }
    // 获取手机短信验证码
    onClickGetCaptcha(event, custom) {
        let phonenum
        let yanzhenmanum
        phonenum = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle"+custom+"/checkmark/yjks/mmxg/account").getComponent(cc.EditBox).string
        yanzhenmanum = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle"+custom+"/checkmark/yjks/mmxg/captcha").getComponent(cc.EditBox).string
        if (phonenum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip32"))
            return
        }
        if (phonenum[0] != "1") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip33"))
            return
        }
        if (yanzhenmanum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("entercode"))
            return
        }
        let self = this
        let callback = (data) => {
            if (data.code == 200) {
                let btn = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle"+custom+"/checkmark/yjks/mmxg/getcodebtn").getComponent(cc.Button)
                
                btn.interactable = false
                let btnlabel = btn.node.getChildByName('btnlabel')
                let la = btnlabel.getComponent(cc.Label)
                la.string = hqq.getTip("str0") + "（60）"
                let lao = btnlabel.getComponent(cc.LabelOutline)
                la.color = cc.color(67, 67, 67)
                lao.color = cc.color(67, 67, 67)
                let time2 = 0
                this.timer = setInterval(() => {
                    if(!cc.isValid(this.node))return;
                    if(!cc.isValid(la))return;
                    time2++
                    let t = 60 - time2
                    la.string = hqq.getTip("str0") + "（" + t + "）"
                    if (time2 >= 60) {
                        clearInterval(this.timer);
                        btn.interactable = true
                        la.string = hqq.getTip("sendcode")
                        la.color = cc.color(67, 0, 0)
                        lao.color = cc.color(67, 0, 0)
                    }
                }, 1000)
            } else {
                if (data.code == 203 && data.msg == "图片验证码错误") {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip34"))
                } else if( data.msg == "can only be sent once in 60s"){
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip35") + hqq.getTip("smstoomany"))
                } else {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip35") + data.msg)
                }
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("onClickGetCaptcha failcallback", status, forcejump, url, err, readyState)
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + ",err:" + err)
        }
        let endurl = hqq.app.getIpPostEndUrl(7);
        let data = {
            id: hqq.gameGlobal.player.id,
            token: hqq.gameGlobal.token,
            phone_number: phonenum,
            captcha: yanzhenmanum,
        }
        hqq.http.sendXMLHttpRequest({
            method: 'POST',
            urlto: hqq.app.server + endurl,
            param: data,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        })
    }

    // 获取手机短信验证码
    onClickGetCaptcha2(event, custom) {
        let phonenum
        let yanzhenmanum
        phonenum = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle"+custom+"/checkmark/yjks/mmxg/account").getComponent(cc.EditBox).string
        yanzhenmanum = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle"+custom+"/checkmark/yjks/mmxg/captcha").getComponent(cc.EditBox).string
        if (phonenum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip32"))
            return
        }
        if (phonenum[0] != "1") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip33"))
            return
        }
        if (yanzhenmanum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("entercode"))
            return
        }
        let self = this
        let callback = (data) => {
            if (data.status === 0) {
                let btn = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle"+custom+"/checkmark/yjks/mmxg/getcodebtn").getComponent(cc.Button)
                
                btn.interactable = false
                let btnlabel = btn.node.getChildByName('btnlabel')
                let la = btnlabel.getComponent(cc.Label)
                la.string = hqq.getTip("str0") + "（60）"
                let lao = btnlabel.getComponent(cc.LabelOutline)
                la.color = cc.color(67, 67, 67)
                lao.color = cc.color(67, 67, 67)
                let time2 = 0
                this.timer = setInterval(() => {
                    if(!cc.isValid(this.node))return;
                    if(!cc.isValid(la))return;
                    time2++
                    let t = 60 - time2
                    la.string = hqq.getTip("str0") + "（" + t + "）"
                    if (time2 >= 60) {
                        clearInterval(this.timer);
                        btn.interactable = true
                        la.string = hqq.getTip("sendcode")
                        la.color = cc.color(67, 0, 0)
                        lao.color = cc.color(67, 0, 0)
                    }
                }, 1000)
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip35") + data.msg)
            }
        }
        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("onClickGetCaptcha failcallback", status, forcejump, url, err, readyState)
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + ",err:" + err)
        }
        let data = {
            user_id: hqq.gameGlobal.player.id,
            token:"e40f01afbb1b9ae3dd6747ced5bca532",
        }
        hqq.http.sendXMLHttpRequest({
            method: 'POST',
            urlto: hqq.gameGlobal.pay.pay_host + "/api/user_funds_password/sendPhoneMessage",
            param: data,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        })
    }

    passJudge(str) {
        if (str.length < 6 || str.length > 12 || !str.match(/[0-9]/g) || !str.match(/[a-zA-Z]/g)) {
            return true
        }
        return false
    }
    // 重置账号密码 确定
    resetpassEnsure() {
        let resetsurebtn = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark/yjks/settinganiu").getComponent(cc.Button);
        let phonenum = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark/yjks/mmxg/account").getComponent(cc.EditBox).string
        let yanzhenmanum = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark/yjks/mmxg/captcha").getComponent(cc.EditBox).string
        let capchanum = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark/yjks/mmxg/phone").getComponent(cc.EditBox).string
        let passnum = cc.find("smallsublayer/setting/btncontainer/dlmm/checkmark/tabToggleContainer/toggle1/checkmark/yjks/mmxg/password").getComponent(cc.EditBox).string
        if (phonenum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip32"))
            return
        }
        if (yanzhenmanum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("entercode"))
            return
        }
        if (capchanum == "") {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("capchaed"))
            return
        }
        if (passnum == "" || this.passJudge(passnum)) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip36"))
            return
        }
        resetsurebtn.interactable = false
        let callback = (data) => {
            if (data.code == 200) {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip41"))
                this.onClickExit()
            } else {
                hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("showtip42") + data.msg)
                if(cc.isValid(resetsurebtn)){
                    resetsurebtn.interactable = true
                }
            }
        }

        let failcallback = (status, forcejump, url, err, readyState) => {
            hqq.logMgr.log("officeloginEnsure failcallback", status, forcejump, url, err, readyState)
            if(cc.isValid(resetsurebtn)){
                resetsurebtn.interactable = true
            }
            hqq.eventMgr.dispatch(hqq.eventMgr.showTip, hqq.getTip("requestfail") + status + ",err:" + err)
        }

        let endurl = hqq.app.getIpPostEndUrl(4)
        let data = {
            phone_number: phonenum,
            id: hqq.gameGlobal.player.id,
            code: capchanum,
            password: passnum,
            captcha: yanzhenmanum,
            token: hqq.gameGlobal.token,
        }
        hqq.http.sendXMLHttpRequest({
            method: 'POST',
            urlto: hqq.app.server + endurl,
            param: data,
            callback: callback,
            failcallback: failcallback,
            needJsonParse: true,
        })
    }
    onClicktxt_se() {
        this.num0++
        if (this.num0 > 10 && this.num1 > 10) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showConsole, null)
        }

        if( this.num0 > 15 && this.num1 > 15 )
        {
            let str = ""
            if (cc.sys.isNative && cc.sys.os != "Windows" && hqq.reflect.getClipboard()) {
                str += "\n剪切板：" + hqq.reflect.getClipboard()
            }
            if (hqq.app.reginIpData) {
                str += "\n注册ip-api:" + hqq.app.reginIpData.query + ",地址:" + hqq.app.reginIpData.regionName
            }
            if (hqq.app.reginIpData2) {
                str += "\n注册ipinfo:" + hqq.app.reginIpData2.ip + "地址:" + hqq.app.reginIpData2.region
            }
            if (hqq.gameGlobal.ipapiData) {
                str += "\n登陆ip-api:" + hqq.gameGlobal.ipapiData.query + ",地址" + hqq.gameGlobal.ipapiData.regionName
            }
            if (hqq.gameGlobal.ipinfoData) {
                str += "\n登陆ipinfo:" + hqq.gameGlobal.ipinfoData.ip + ",地址" + hqq.gameGlobal.ipinfoData.region
            }
            str += "\n大厅版号:" + hqq.app.hallVersion;
            this.versionlabel.string = str
        }
    }
    onClicktxt_bgm() {
        this.num1++
        if (this.num0 > 10 && this.num1 > 10) {
            hqq.eventMgr.dispatch(hqq.eventMgr.showConsole, null)
        }

        if( this.num0 > 15 && this.num1 > 15 )
        {
            let str = ""
            if (cc.sys.isNative && cc.sys.os != "Windows" && hqq.reflect.getClipboard()) {
                str += "\n剪切板：" + hqq.reflect.getClipboard()
            }
            if (hqq.app.reginIpData) {
                str += "\n注册ip-api:" + hqq.app.reginIpData.query + ",地址:" + hqq.app.reginIpData.regionName
            }
            if (hqq.app.reginIpData2) {
                str += "\n注册ipinfo:" + hqq.app.reginIpData2.ip + "地址:" + hqq.app.reginIpData2.region
            }
            if (hqq.gameGlobal.ipapiData) {
                str += "\n登陆ip-api:" + hqq.gameGlobal.ipapiData.query + ",地址" + hqq.gameGlobal.ipapiData.regionName
            }
            if (hqq.gameGlobal.ipinfoData) {
                str += "\n登陆ipinfo:" + hqq.gameGlobal.ipinfoData.ip + ",地址" + hqq.gameGlobal.ipinfoData.region
            }
            str += "\n大厅版号:" + hqq.app.hallVersion;
            this.versionlabel.string = str
        }
    }
}
