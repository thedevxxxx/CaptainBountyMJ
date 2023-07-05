
import { _decorator, Component, Node, director, CCObject, RenderComponent, Renderable2D } from 'cc';
import * as cc from 'cc';
const { ccclass, property } = _decorator;

type ICallBackFunc = () => Function;
type ICallBackFuncInt = (int) => Function;

/**微信errCode */
enum eWxErrCode{
    /** 用戶登入*/
    ERR_OK = 0,
    /** 一般錯誤*/
    ERR_COMM = -1,
    /** 用戶取消*/
    ERR_USER_CANCEL = -2,
    /** 發送錯誤*/
    ERR_SENT_FAILED = -3,
    /** 拒絕認證*/
    ERR_AUTH_DENIED = -4,
    /** 不支持的錯誤*/
    ERR_UNSUPPORT = -5,
    /** 禁止*/
    ERR_BAN = -6,
}

@ccclass('WeChatPlugin')
export class WeChatPlugin extends Component {

    public trueEvent: ICallBackFunc;
    public falseEvent: ICallBackFuncInt;
    /**儲存微信使用者訊息 */
    userInfo;

    private AppID: String = "wx6a2424acc9407666";
    private AppSecrect: String = "23a7b7e711a42d670f30376bde58cf58";
    /**要求code中 */
    private isRequesting: boolean = false;
    /**完成拿取資料 */
    private isFinished: boolean = false;

    /**確認登入是否完成 */
    public CheckWeChatLoginFinished(): boolean {
        return this.isRequesting && this.isFinished;
    }

    public GetUserWeChatInfo() {
        return this.userInfo;
    }

    public ChekcWX(): boolean {
        console.log("Cocos_WxLogin, " + "ChekcWX")
        let b = false;
        if (cc.sys.os == cc.sys.OS.IOS) {
            b = jsb.reflection.callStaticMethod("AppDelegate", "IsInstallWx");
        } else if (cc.sys.os == cc.sys.OS.ANDROID) {
            b = jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "isInstallWx", "()Z");
        }

        var str = b ? "有安裝微信" : "沒有安裝微信";
        console.log(str);
        return b;
    }

    //Not use
    public StartWxActivity() {
        console.log("Cocos_WxLogin, " + "Start Wx Activity");
        jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "startWxActivity", "()V");
    }

    //step 1
    public wechatLogin() {

        if (cc.sys.os != cc.sys.OS.ANDROID && cc.sys.os != cc.sys.OS.IOS) {
            console.log("微信 web測試");

            var response: string;
            // response = `{"openid":"OpenIdWxLoginTest","nickname":"木子囧尼","sex":0,"language":"","city":"","province":"","country":"","headimgurl":"https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Nw2U6Rm5ib8G0ODlmia4VicMu2NEzHGXicvKPeICSRrDV2jdDkgibeB9Ve09PLy0mibBSVicic5TXRibYzNibBZhOJjvJdow\/132",
            //     "privilege":[],"unionid":"oxpwT5202bUZzHv87UXUE2nm29c4"}`;

            response = `{"openid":"OpenIdWxLoginTest2","nickname":"海灣2號","sex":0,"language":"","city":"","province":"","country":"","headimgurl":"https://thirdwx.qlogo.cn/mmopen/vi_32/Nw2U6Rm5ib8G0ODlmia4VicMu2NEzHGXicvKPeICSRrDV2jdDkgibeB9Ve09PLy0mibBSVY1qcsSkdKMa80ZyVWLATicA/132",
                "privilege":[],"unionid":"oxpwT5202bUZzHv87UXUE2nm29c4"}`;

            var msg = JSON.parse(response);
            this.userInfo = msg;
            console.log("設定微信資料", msg.openid);
            this.isFinished = true;
            this.trueEvent();
            return;
        }

        if (this.isRequesting) {
            console.log("Cocos_WxLogin, 要求資料中");
            hqq.logMgr.log("Cocos_WxLogin, 要求資料中");
            return;
        }

        this.isRequesting = true;
        console.log("Cocos_WxLogin, Cocos Wechat Login");
        hqq.logMgr.log("Cocos_WxLogin, Cocos Wechat Login");

        if (cc.sys.os == cc.sys.OS.IOS) {
            console.log("Cocos_WxLogin, 要code");
            jsb.reflection.callStaticMethod("AppDelegate", "WxLogin");
        }
        else if (cc.sys.os == cc.sys.OS.ANDROID) {
            jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "wxLogin", "()V");//呼叫java程式碼進行微信登入
        }
        else {
            console.error("Cocos_WxLogin, 平台錯誤, ", cc.sys.os);
            hqq.logMgr.log("Cocos_WxLogin, 平台錯誤, ", cc.sys.os);
            return;
        }

        // 根據java返回的code獲得accessToken
        this.getAccessTokenByCode();
    }

    //獲取微信登入所必須的code
    public getWechatCode() {
        console.log("Cocos_WxLogin, " + "getWechatCode()");
        var self = this;
        var isGetCode;
        var code;
        var errCode;
        let countDown = 30; //等待微信登入時間

        //傳送獲得code的請求
        return new Promise(function (resolve, reject) {
            console.log("Cocos_WxLogin, 進入Promise");
            hqq.logMgr.log("Cocos_WxLogin, 進入Promise");
            //java端微信請求是有延遲的在這裡我們等待獲取code的狀態為true的時候在獲取code
            self.schedule(function () {

                if (cc.sys.os == cc.sys.OS.IOS) {
                    isGetCode = jsb.reflection.callStaticMethod("AppDelegate", "GetCodeSuccess");
                }
                else if (cc.sys.os == cc.sys.OS.ANDROID) {
                    isGetCode = jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "getCodeSuccess", "()Z");
                }
                else {
                    console.error("Cocos_WxLogin, 平台錯誤, ", cc.sys.os);
                    hqq.logMgr.log("Cocos_WxLogin, 平台錯誤, ", cc.sys.os);
                    self.unscheduleAllCallbacks();
                    return;
                }

                if (isGetCode) {
                    console.log("Cocos_WxLogin, " + "收到回覆", isGetCode);
                    hqq.logMgr.log("Cocos_WxLogin, " + "收到回覆", isGetCode);
                    //取消所有計時器
                    self.unscheduleAllCallbacks();

                    //取得errCode
                    if (cc.sys.os == cc.sys.OS.IOS) {
                        let _errCode = jsb.reflection.callStaticMethod("AppDelegate", "GetErrCode");
                        errCode = Number(_errCode);
                    }
                    else {
                        //改成 int
                        // errCode = jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "getErrCode", "()Ljava/lang/String;");
                        errCode = jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "getErrCodeNum", "()I");
                    }
                    self.SetWxLoginState(errCode);

                    //如果獲得code證明是成功獲得微信的響應
                    //code = jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "getCode", "()Ljava/lang/String;");
                    //console.log("Cocos_WxLogin, "  + "==============>>code is " + code);
                    resolve(code);
                } else {
                    countDown -= 0.5;
                    console.log("Cocos_WxLogin, " + "還沒收到回覆:");
                    hqq.logMgr.log("Cocos_WxLogin, " + "還沒收到回覆:");
                    if (countDown <= 0) {
                        countDown = 5;
                        console.error("Cocos_WxLogin, ", "登入超時")
                        hqq.logMgr.log("Cocos_WxLogin, ", "登入超時")
                        self.unscheduleAllCallbacks();
                        this.isRequesting = false;
                        this.falseEvent(202);
                        return;
                    }
                }
            }.bind(self), 0.5);
        });
    }

    private SetWxLoginState(errCode) {
        console.log("Cocos_WxLogin, errCode:" + errCode);
        hqq.logMgr.log("Cocos_WxLogin, errCode:" + errCode);

        switch (errCode) {
            case eWxErrCode.ERR_OK:
                var code = "";
                //如果獲得code證明是成功獲得微信的響應
                if (cc.sys.os == cc.sys.OS.IOS) {
                    code = jsb.reflection.callStaticMethod("AppDelegate", "GetCode");
                }
                else {
                    code = jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "getCode", "()Ljava/lang/String;");
                }
                this.getAccessToken(code);
                break;
            case eWxErrCode.ERR_USER_CANCEL:
                this.isRequesting = false;
                this.falseEvent(errCode);
                break;
            case eWxErrCode.ERR_AUTH_DENIED:
                this.isRequesting = false;
                this.falseEvent(errCode);
                break;
            case eWxErrCode.ERR_UNSUPPORT:
                this.isRequesting = false;
                this.falseEvent(errCode);
                break;
            default:
                this.isRequesting = false;
                this.falseEvent(errCode);
                break;
        }
    }

    private getAccessTokenByCode() {
        console.log("Cocos_WxLogin, " + "getAccessTokenByCode()");
        hqq.logMgr.log("Cocos_WxLogin, " + "getAccessTokenByCode()");
        var self = this;
        this.getWechatCode().then(function (code) { //獲取微信code的承諾返回了正常的結果
            console.log("Cocos_WxLogin, " + "已經獲得code, AccessTokenByCode: " + code);
            hqq.logMgr.log("Cocos_WxLogin, " + "已經獲得code, AccessTokenByCode: " + code);
            //self.getAccessToken(code);
        });
    }

    //要求WxToken
    private getAccessToken(code) {        //
        console.log("Cocos_WxLogin, " + "getAccessToken()");
        hqq.logMgr.log("Cocos_WxLogin, " + "getAccessToken()");

        var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + this.AppID + "&secret=" + this.AppSecrect + "&code=" + code + "&grant_type=authorization_code";
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                console.log("Cocos_WxLogin, " + "Token response===>>> ", response);
                hqq.logMgr.log("Cocos_WxLogin, " + "Token response===>>> ", response);
                var msg = JSON.parse(response);
                var access_token = msg.access_token;
                var refresh_token = msg.refresh_token;
                var openid = msg.openid;
                //如果超時進行重新重新整理accessToken
                if (msg.expires_in >= 7200) {
                    //重新整理accesstoken
                    self.freshAccessToken(refresh_token).then(function (data) {
                        console.log("Cocos_WxLogin, " + "重新整理accessToken 是", data);
                        hqq.logMgr.log("Cocos_WxLogin, " + "重新整理accessToken 是", data);
                        access_token = data;
                        self.getUserInfo(access_token, openid);
                    });
                    console.log("Cocos_WxLogin, " + "這個accessToken是刷新出來的token", access_token);
                    hqq.logMgr.log("Cocos_WxLogin, " + "這個accessToken是刷新出來的token", access_token);
                } else {
                    self.getUserInfo(access_token, openid);
                }

            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    }

    /**
     * 獲取使用者資訊 
     */
    private getUserInfo(access_token, openid) {
        // console.log("Cocos_WxLogin, " + "getUserInfo()");
        console.log("Cocos_WxLogin, ", "access_token:", access_token, " , openid:", openid);
        hqq.logMgr.log("Cocos_WxLogin, ", "access_token:", access_token, " , openid:", openid);
        var url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + access_token + "&openid=" + openid;
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                console.log("Cocos_WxLogin, " + "response===>>>", response);
                hqq.logMgr.log("Cocos_WxLogin, " + "response===>>>", response);
                var msg = JSON.parse(response);
                self.userInfo = msg;
                console.log("Cocos_WxLogin, " + "msg is ", msg);
                //console.log("Cocos_WxLogin, " + "openid is ", msg.openid);
                console.log("Cocos_WxLogin, " + "nickName is " + msg.nickname);
                console.log("Cocos_WxLogin, " + "city is " + msg.city);
                console.log("Cocos_WxLogin, " + "country " + msg.country);
                console.log("Cocos_WxLogin, " + "sex is  " + msg.sex);
                console.log("Cocos_WxLogin, " + "headimgurl  " + msg.headimgurl);
                //
                self.isRequesting = false;
                self.isFinished = true;
                self.trueEvent();
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    }

    private freshAccessToken(refresh_token) {
        console.log("Cocos_WxLogin, " + "freshAccessToken()");
        hqq.logMgr.log("Cocos_WxLogin, " + "freshAccessToken()");

        var url = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=" + this.AppID + "&grant_type=refresh_token&refresh_token=" + refresh_token;
        var self = this;
        var xhr = new XMLHttpRequest();
        var ac;
        return new Promise(function (resolve, reject) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = xhr.responseText;
                    console.log("Cocos_WxLogin, ", "fresh Token ===>>>", response);
                    hqq.logMgr.log("Cocos_WxLogin, ", "fresh Token ===>>>", response);
                    var msg = JSON.parse(response);
                    ac = msg.access_token;
                    console.log("ac is " + ac);
                    resolve(ac);
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        });
    }

    /**
     * 獲取微信頭像
     * @param headimgurl 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像）
     * ，用户没有头像时该项为空。若用户更换头像，原有头像 URL 将失效。
     */
    public getHeadImg(headimgurl: string): cc.SpriteFrame {
        console.log("Cocos_WxLogin, ", "getHeadImg");

        if (headimgurl == "" || headimgurl == null) {
            console.error("沒有微信頭像");
            return;
        }

        let url = headimgurl;
        url = url.replace('"', '').replace(/[\\]/g, ''); //處理\/

        var self = this;
        // 远程 url 不带图片后缀名，此时必须指定远程图片文件的类型
        cc.assetManager.loadRemote<cc.ImageAsset>(url, { ext: '.jpg', cacheEnabled: false }, function (err, texture) {
            if (!err) {
                let spriteFrame = new cc.SpriteFrame();
                const tex = new cc.Texture2D();
                tex.image = texture;
                spriteFrame.texture = tex;
                return spriteFrame;
                // self.icon.spriteFrame = spriteFrame;
                //console.log(`加载头像成功: ${err} , ${self.icon.spriteFrame.texture} , ${self.icon}`);
            }
            else {
                console.log(`加载头像错误: ${err}`);
                return null;
            }
        });
    }

    public callBackTest() {
        this.trueEvent();
    }

    /** 產生測試微信帳號 */
    public GetRandWeChatInfo() {
        var s = { openid: String, nickname: String, headimgurl: String };
    }
}