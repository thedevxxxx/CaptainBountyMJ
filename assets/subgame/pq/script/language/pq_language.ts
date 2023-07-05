
export default class pq_language {//??
    // 资源UI
    private resMap: Map<string, object> = new Map();

    constructor() {
        let path: string = `language/${this.getCurLanguage()}`;
    }

    private language = {
        "CN": {
            0: "连接超时，请您返回游戏大厅后重新进入",
            1: "网络断开，正在努力连接中",
            2: "此账号已从其他地方登录！",
            // 后端讯息
            400: "停机维护中，预计维护时间为 20分钟，\n请维护结束后再进行游戏，感谢您参与！", // 踢人
            401: "非法数据",
            402: "尋找agent錯誤",
            403: "数据库读写失败",
            404: "用户不存在",
            405: "账号在其他设备登陆",
            406: "用户已被封锁",
            407: "停服维护中，请稍后再登录！",
            408: "407", // 伺服器更新
            409: "余额不能低于%n,当前余额%n",
            410: "", // 提示断线三次后 回大厅
            1000: "第三方未知错误: ",
            1006: "确定要离开此游戏吗?"
        },
    }

    /* PT 文件对应 =>
    BG 保加利亚语 CH 繁体中文 CS 捷克语 DA 丹麦语 DE 德语 EL 希腊语 EN 英语 ES 西班牙语
    ES-MX 墨西哥西班牙语 ET 爱沙尼亚语 FI 芬兰语 FR 法语 IT 意大利语 JA 日语 KO 韩文
    MS 马来语 NL 荷兰语 PL 波兰语 PT 葡萄牙语 RO 罗马尼亚语 RU 俄语 SK 斯洛伐克语
    SV 瑞典语 TH 泰语 ZH-CN 简体中文
    */
    public getSubGameLang(): string {
        let lang = { "CN": "ZH-CN", "EN": "EN" }[this.getCurLanguage()];
        return lang ? lang : "EN";
    }

    public getCurLanguage(): string {
        return "CN";
    }

    public destroy() {

    }
}

export const enum TextID {
    CONNECTION_TIME_OUT = 0,
    RECONNECT,
    REPEAT_LOGIN,
    CATEGORY_ALL,
    CATEGORY_BLACKJACK,
    CATEGORY_POKER,
    CATEGORY_BACCARAT,
    CATEGORY_TABLE,
    CATEGORY_ROULETTE,
    CATEGORY_SLOT,
    CATEGORY_JACKPOT,
    CATEGORY_SHOOTING = 11,
    TOUCH_EXIT = 1006,
    // 后端讯息
    KICK_PLAYER = 400,
    DATA_ILLEGAL,
    FIND_USER_BY_AGENT_ERROR,
    DATABASE_READ_WRITE_FAILED,
    USER_NOT_EXIST,
    OTHER_DEVICES_LOGIN,
    USER_DISABLE,
    SERVICE_PAUSE,
    SERVICE_UPDATE,
    LOGIN_BELOW_MINIMUM,
    KICK_API,
}
