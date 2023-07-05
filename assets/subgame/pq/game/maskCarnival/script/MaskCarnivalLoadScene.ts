import { _decorator, Component, KeyCode } from "cc";
import * as cc from 'cc';
import { PQAsset } from "../../../script/asset/PQAssetRepository";
import { MaskCarnivalPreloadAssetConfig, MaskCarnivalPreloadConfig } from "./config/MaskCarnivalPreloadConfig";


const { ccclass } = _decorator;
@ccclass
export class MaskCarnivalLoadScene extends Component {

    protected async onLoad() {
        console.log(`[maskCarnival] 0.0.3`);
        PQAsset.init('pq', true);
    }


    // private OnKeyDown(eventKeyboard: EventKeyboard) {
    //     this.mjhl_EventRepository.onKeyDown.Notify(eventKeyboard.keyCode);
    // }

    protected start() {

    }

    onClickEnter() {
        console.log("开始游戏")
        let sceneName = "MaskCarnival_Game";
        cc.director.preloadScene(sceneName, this.onLoadProgress.bind(this), this.onLoaded.bind(this, sceneName));
    }

    //加载进度
    private onLoadProgress(completedCount: number, totalCount: number, item: any) {
        console.log(completedCount, totalCount)
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
    private onLoaded(sceneName) {
        console.log("静态资源加载完成")
        this.onPreLoadDynamic();
    }

    //预加载子游戏必须的动态资源
    private onPreLoadDynamic() {
        PQAsset.preloadAssetsDir(MaskCarnivalPreloadAssetConfig.SYMBOL_DIR, this.onPreLoadDynamicProgress.bind(this), this.onPreLoadDynamicComplete.bind(this));
    }

    //动态资源加载进度
    private onPreLoadDynamicProgress(finished:number, total: number, item) {
        console.log("动态资源加载进度", finished, total, item);
    }

    //动态资源加载完成
    private onPreLoadDynamicComplete() {
        console.log("动态资源加载完成");
        let sceneName = "MaskCarnival_Game";
        cc.director.loadScene(sceneName);
    }
    

    protected onDestroy() {
    }
}
