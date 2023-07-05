import { game } from "cc";

export default class pq_HotUpdate {

    private setProgressLabelString: Function;

    private setProgress: Function;

    private resolve: (value: void | PromiseLike<void>) => void;

    private reject: (reason?: any) => void;

    public constructor(hotUpdateParameter: HotUpdateParameter) {
        const setProgressLabelString = hotUpdateParameter.setProgressLabelString;
        const setProgress = hotUpdateParameter.setProgress;

        this.setProgressLabelString = setProgressLabelString;
        this.setProgress = setProgress;

        // this.register();
    }

    public destroy() {
        this.unregister();
    }

    public async startHotUpdate(enname: string) {
        return new Promise<void>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            hqq.loginMgr.requestVersionJson(() => {
                let mainversion = hqq.localStorage.globalGet(hqq.app.versionKey)
                mainversion = mainversion ? mainversion : ''
                if (mainversion != hqq.app.subGameVersion.hall) {
                    hqq.eventMgr.dispatch(hqq.eventMgr.showSamlllayer, {
                        type: 10,
                        msg: hqq.getTip("showtip69") + "\nlocalv:" + mainversion + "remotev:" + hqq.app.subGameVersion.hall,
                        ensurefunc: () => {
                            hqq.hallWebSocket.close();
                            hqq.audioMgr.stopBg();
                            hqq.audioMgr.stopEffect();
                            game.restart();
                        }
                    })
                } else {
                    let subgamern = enname;

                    let localsubv = hqq.localStorage.get(subgamern, "versionKey") || null;
                    if (hqq.pinpaiSubGameList[hqq.app.pinpai]) {
                        if (hqq.pinpaiSubGameList[hqq.app.pinpai][subgamern]) {
                            subgamern = subgamern + "_" + hqq.app.pinpai;
                        }
                    }
                    let upstate = hqq.hotUpdateMgr.checkUpdate({
                        subname: subgamern,
                        version: localsubv || "1.0.0",
                    });
                }
            });
        });
    }

    private register() {
        hqq.eventMgr.register(hqq.eventMgr.hotCheckup, "pq_HotUpdate", this.hotCheckup.bind(this));
        hqq.eventMgr.register(hqq.eventMgr.hotFail, "pq_HotUpdate", this.hotFail.bind(this));
        hqq.eventMgr.register(hqq.eventMgr.hotProgress, "pq_HotUpdate", this.hotProgress.bind(this));
        hqq.eventMgr.register(hqq.eventMgr.hotFinish, "pq_HotUpdate", this.hotFinish.bind(this));
        hqq.eventMgr.register(hqq.eventMgr.hotUp, "pq_HotUpdate", this.hotUp.bind(this));
        hqq.eventMgr.register(hqq.eventMgr.hotCheck, "pq_HotUpdate", this.hotCheck.bind(this));
        hqq.eventMgr.register(hqq.eventMgr.hotWait, "pq_HotUpdate", this.hotWait.bind(this));
    }

    private unregister() {
        hqq.eventMgr.unregister(hqq.eventMgr.hotCheckup, "pq_HotUpdate")
        hqq.eventMgr.unregister(hqq.eventMgr.hotFail, "pq_HotUpdate")
        hqq.eventMgr.unregister(hqq.eventMgr.hotProgress, "pq_HotUpdate")
        hqq.eventMgr.unregister(hqq.eventMgr.hotFinish, "pq_HotUpdate")
        hqq.eventMgr.unregister(hqq.eventMgr.hotUp, "pq_HotUpdate")
        hqq.eventMgr.unregister(hqq.eventMgr.hotCheck, "pq_HotUpdate")
        hqq.eventMgr.unregister(hqq.eventMgr.hotWait, "pq_HotUpdate")
    }

    private hotCheckup(hotCheckupAttribute: HotCheckupAttribute) {
        const shouldUpdate = hotCheckupAttribute.shouldUpdate;
        const name = hotCheckupAttribute.name;

        console.log("[pq_HotUpdate] hotCheckup");

        this.setProgressLabelString("检查热更新");

        if (!shouldUpdate) {
            this.resolve();
        }
    }

    private hotFail(hotFailAttribute: HotFailAttribute) {
        const name = hotFailAttribute.name;

        console.log("[pq_HotUpdate] hotFail");

        this.setProgressLabelString("热更新失败");

        this.reject();
    }

    private hotProgress(hotProgressAttribute: HotProgressAttribute) {
        const progress = hotProgressAttribute.progress;
        const name = hotProgressAttribute.name;

        console.log("[pq_HotUpdate] hotProgress");

        this.setProgressLabelString("热更新进度");
        this.setProgress(progress);
    }

    private hotFinish(hotFinishAttribute: HotFinishAttribute) {
        const name = hotFinishAttribute.name;

        console.log("[pq_HotUpdate] hotFinish");

        this.setProgressLabelString("热更新结束");

        this.resolve();
    }

    private hotUp(hotUpAttribute: HotUpAttribute) {
        const name = hotUpAttribute.name;

        console.log("[pq_HotUpdate] hotUp");

        this.setProgressLabelString("等待热更新文件下载");
    }

    private hotCheck(hotCheckAttribute: HotCheckAttribute) {
        const name = hotCheckAttribute.name;

        console.log("[pq_HotUpdate] hotCheck");

        this.setProgressLabelString("文件比对");
    }

    private hotWait(hotWaitAttribute: HotWaitAttribute) {
        const name = hotWaitAttribute.name;

        console.log("[pq_HotUpdate] hotWait");

        this.setProgressLabelString("等待热更新开始");
    }
}

interface HotUpdateParameter {

    setProgressLabelString: Function;

    setProgress: Function;
}

interface HotCheckupAttribute {

    shouldUpdate: boolean;

    name: string;
}

interface HotFailAttribute {

    name: string;
}

interface HotProgressAttribute {

    progress: number;

    name: string;
}

interface HotFinishAttribute {

    name: string;
}

interface HotUpAttribute {

    name: string;
}

interface HotCheckAttribute {

    name: string;
}

interface HotWaitAttribute {

    name: string;
}