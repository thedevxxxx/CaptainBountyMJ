import { _decorator, Component, KeyCode } from "cc";
import * as cc from 'cc';
import { PQAsset } from "../../../script/asset/PQAssetRepository";


const { ccclass } = _decorator;
@ccclass
export class MahjongWays2LoadScene extends Component {

    protected async onLoad() {
        console.log(`[mahjongWays2] 0.0.3`);
        PQAsset.init('pq', true);
    }


    // private OnKeyDown(eventKeyboard: EventKeyboard) {
    //     this.mjhl_EventRepository.onKeyDown.Notify(eventKeyboard.keyCode);
    // }

    protected start() {

    }

    onClickEnter() {
        console.log("开始游戏")
        let sceneName = "MahjongWays2_Game";
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

    //加载完成
    private onLoaded(sceneName) {
        console.log("加载完成")
        cc.director.loadScene(sceneName);
        // if(cc.director.getScene().name == "PzbrnnRoom"){
        //     hqq.eventMgr.dispatch(hqq.eventMgr.showSubGamePanel, { });
        //     if (cc.isValid(this.loadpanl)) this.loadpanl.active = false;
        // }
    }

    protected onDestroy() {
    }
}
