import { ResolutionPolicy } from "cc";
import { screen, Size, view } from "cc";

export default class pq_Hqq implements pq_IHqq {
    private userID;
    private password;
    private token;
    private gameID;
    private serverUrl;
    private isNewGame = true;
    private preTestID = [
        272936863,
        232138305,
        179287270,
        201597404,
        882476167,
        383718681
    ];

    public constructor() {
        if(hqq.isDebug){
            this.userID = this.getTestID();
            this.userID = 405579016;
            this.password = "123456";
            this.token = null;
            this.gameID = "5b1f3a3cb76a451e211229";
            this.serverUrl = "https://game.lymrmfyp.com/pq";
            // this.serverUrl = "http://webgame_pq_pre.0717996.com";
             this.serverUrl = "https://game.0717996.com/pq";
            // this.serverUrl = "http://10.41.100.122:3388";
            // this.serverUrl = "http://localhost:3388";
        }else{
            this.userID = hqq.gameGlobal.player.id;
            this.password = hqq.gameGlobal.token;
            this.token = hqq.gameGlobal.token;
            this.gameID = hqq.subGameList.pq.game_id;
            let url: string = hqq.subGameList.pq.serverUrl;
            this.serverUrl = `https://${(url.split("://"))[1]}`;
        }
    }

    public destroy() {

    }

    public getUserId() {
        return this.userID
    }

    public getPassword() {
        return this.password
    }

    public getToken() {
        return this.token
    }

    public getGameId() {
        return this.gameID
    }

    public getServerUrl() {
        return this.serverUrl;
    }

    public backToHall() {
        hqq?.eventMgr.dispatch(hqq.eventMgr.showJumpScene, "hall");
    }

    public setPortrait() {
        console.log(`[pq_Hqq] setPortrait`);
        if(this.isNewGame){
            hqq.reflect.setOrientation("portrait");
        }else{
            hqq.reflect.setOrientation("portrait", 750, 1334);
            view.setDesignResolutionSize(750, 1334, ResolutionPolicy.SHOW_ALL);
        }
    }

    public setLandscape() {
        console.log(`[pq_Hqq] setLandscape`);
        if(this.isNewGame){
            hqq.reflect.setOrientation("landscape");
        }else{
            hqq.reflect.setOrientation("landscape", 1334, 750);
            view.setDesignResolutionSize(1334, 750, ResolutionPolicy.FIXED_HEIGHT);
        }
    }

    public getOriginalWindowSize() {
        return new Size(screen.windowSize.width / view.getScaleX(), screen.windowSize.height / view.getScaleY());
    }

    private getTestID(){
        // 测试端 - 注意DEV与PRE账号密码Token问题
        let urlPara = location.search.slice(1);
        // app.UserID = this.preTestID[urlPara] || app.preID[0];
        let num = Number.parseInt(urlPara);
        if(num>999){
            console.log('[PQ] 自定输入账号');
            return num;
        }else if(num>-1){
            console.log('[PQ] 特定测试账号');
            return this.preTestID[num];
        }else{
            console.log('[PQ] 乱数测试账号');
            return this.preTestID[Math.floor(Math.random()*this.preTestID.length)];
        }
    }
}

export interface pq_IHqq {

    getUserId: () => number;

    getPassword: () => string;

    getToken: () => string;

    getGameId: () => string;

    getServerUrl: () => string;

    backToHall: () => void;

    setPortrait: () => void;

    setLandscape: () => void;
}