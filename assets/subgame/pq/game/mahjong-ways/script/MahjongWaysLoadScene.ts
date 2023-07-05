import { _decorator, Component, KeyCode,Node } from "cc";
import * as cc from 'cc';
import { PQAsset } from "../../../script/asset/PQAssetRepository";
import { mahjongWaysConfig } from "./config/MahjongWaysConfig";


const { ccclass ,property} = _decorator;
@ccclass
export class MahjongWaysLoadScene extends Component {
    private sceneName = "MahjongWays_Game";

    @property(Node)
    loading_progress_bar:Node = null;   //

    @property(Node)
    startBtn:Node = null;   //

    protected async onLoad() {
        console.log(`[mahjongWays] 0.0.3`);
        PQAsset.init('pq', true);
    }

    protected start() {
        this.loading_progress_bar.getComponent(cc.ProgressBar).progress = 0;
        this.loading_progress_bar.active = true;
        cc.director.preloadScene(this.sceneName, this.onLoadProgress.bind(this), this.onLoaded.bind(this));
        this.startBtn.active = false;   
    }

    onClickEnter() {
        console.log("开始游戏")
        cc.director.loadScene(this.sceneName);
    }

    //加载进度
    private onLoadProgress(completedCount: number, totalCount: number, item: any) {
        console.log(completedCount, totalCount)

            if (cc.isValid(this.loading_progress_bar) ) {

                let progress = completedCount / totalCount*0.95;
                this.loading_progress_bar.getComponent(cc.ProgressBar).progress = progress;
            }
        // if(cc.director.getScene().name == "PzbrnnRoom"){
        //     if (cc.isValid(this.loading_progress_bar) && cc.isValid(this.load_label)) {
        //         let progress = completedCount / totalCount;
        //         let percent = (progress * 100).toFixed(0);
        //         this.loading_progress_bar.getComponent(cc.ProgressBar).progress = progress;
        //         this.load_label.string = pzbrnnLang.getTextByID(42, percent);
        //     }
        // }
    }

    //静态加载完成
    private onLoaded() {
        console.log("静态资源加载完成")
        this.onPreLoadDynamic();
    }

    //预加载子游戏必须的动态资源
    private onPreLoadDynamic() {
        PQAsset.preloadAssetsDir(mahjongWaysConfig.SYMBOL_DIR, this.onPreLoadDynamicProgress.bind(this), this.onPreLoadDynamicComplete.bind(this));
    }

    //动态资源加载进度
    private onPreLoadDynamicProgress(finished:number, total: number, item) {
        // console.log("动态资源加载进度", finished, total, item);
    }

    //动态资源加载完成
    private onPreLoadDynamicComplete() {
        console.log("动态资源加载完成");
        this.loading_progress_bar.getComponent(cc.ProgressBar).progress = 1;
        this.scheduleOnce(() => {
            this.startBtn.active = true;
            this.loading_progress_bar.active = false;
        }, 0.3);

        // cc.director.loadScene(this.sceneName);
    }

    protected onDestroy() {
    }
}
