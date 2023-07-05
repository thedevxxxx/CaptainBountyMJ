import { Asset, assetManager, AssetManager, Button, Color, director, Label, Node, ProgressBar, screen, Size, Sprite, UITransform, view } from "cc";
import { JSB } from "cc/env";
import pq_EventRepository from "../event/pq_EventRepository";
import { GameConfig } from "../ui/gamelist/pq_GameList";
import pq_UIFactory from "../ui/pq_UIFactory";
import pq_HotUpdate from "./pq_HotUpdate";
import { SceneAsset } from "cc";

export default class pq_GameLoading {

    private pq_UIFactory: pq_UIFactory;

    private rootNode: Node;

    private background: Sprite;

    private gameBackground: Sprite;

    private progressBar: ProgressBar;

    private progressLabel: Label;

    private startGameButton: Button;

    private currentGameConfig: GameConfig;

    private writeablePath: string;

    public constructor() {
        this.setWriteablePath();
    }

    public async init(pq_GameLoadingParameter: pq_GameLoadingParameter) {
        await this.createUI(pq_GameLoadingParameter);

        this.hideGameLoading();

        const pq_EventRepository = pq_GameLoadingParameter.pq_EventRepository;
        pq_EventRepository.onEnterGame.Attach((gameConfig) => this.onEnterGame(gameConfig));
        view.setResizeCallback(() => this.fitVisibleSize());

        return this;
    }

    public destroy() {
        view.setResizeCallback(null);
    }

    private async createUI(pq_GameLoadingParameter: pq_GameLoadingParameter) {
        const pq_UIFactory = pq_GameLoadingParameter.pq_UIFactory;
        const parent = pq_GameLoadingParameter.parent;

        this.pq_UIFactory = pq_UIFactory;

        const rootNode = pq_UIFactory.createNode({
            parent: parent,
            name: "pq_GameLoading"
        });
        this.rootNode = rootNode;

        const background = pq_UIFactory.createSprite({
            parent: this.rootNode,
            name: "background"
        }, {
            contentSize: this.getOriginalWindowSize(), // view.getVisibleSize(),
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        });
        this.background = background;

        const gameBackground = pq_UIFactory.createSprite({
            parent: this.rootNode,
            name: "background"
        }, {
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE,
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            target: pq_UIFactory.canvasNode
        });
        this.gameBackground = gameBackground;

        const progressBar = await pq_UIFactory.createProgressBarAsync(gameBackground.node, {
            mode: ProgressBar.Mode.FILLED,
            size: new Size(307, 19),
            progressSpriteFramePath: "pq/images/gameloading/pq_loading_bar/spriteFrame",
            barSpriteFramePath: "pq/images/gameloading/pq_loading_progress/spriteFrame",
            barSpriteType: Sprite.Type.FILLED
        }, {
            verticalCenter: -300
        });
        this.progressBar = progressBar

        const progressLabel = pq_UIFactory.createLabel({
            parent: gameBackground.node,
            name: "label"
        }, {
            fontSize: 20,
            string: "",
            color: Color.WHITE
        }, null, {
            verticalCenter: -335
        });
        this.progressLabel = progressLabel;

        const startGameButton = pq_UIFactory.createButton({
            parent: gameBackground.node,
            name: "button"
        }, {
            onClick: () => this.onStartGameButtonClicked()
        }, {
            contentSize: new Size(190, 60),
            spriteFramePath: "pq/images/gameloading/pq_loading_button/spriteFrame",
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE
        }, {
            fontSize: 30,
            string: "開始",
            color: Color.WHITE
        }, {
            verticalCenter: -300
        });
        this.startGameButton = startGameButton;
    }

    private async onEnterGame(gameConfig: GameConfig) {

        this.setCurrentGameConfig(gameConfig);

        this.setBackgroundSpriteFrame(gameConfig.gameName);

        this.hideStartGameButton();

        this.showProgress();

        this.showGameLoading();

        await this.startLoadGame();

        this.hideProgress();

        this.showStartGameButton();
    }

    private async onStartGameButtonClicked() {
        const gameConfig = this.currentGameConfig;
        const gameName = gameConfig.gameName;
        const sceneName = gameConfig.sceneName;
        director.loadScene(sceneName);
    }

    private async startLoadGame() {
        console.log("[pg_GameLoading] startLoadGame");
        const gameConfig = this.currentGameConfig;
        const sceneName = gameConfig.sceneName;
        const writeablePath = this.writeablePath;
        //const gameZipPath = `${writeablePath}${gameName}.zip`;
        // const bundlePath = ((JSB) ? `${writeablePath}${gameName}` : gameName);

        // await this.startHotUpdate(gameName);

        //await this.downloadBinary(`?????/${gameName}`, gameName); //??

        //await this.unZip(gameZipPath, writeablePath);//??

        // const bundle = await this.loadBundle(bundlePath);

        this.setProgressLabelString("正在加載資源");

        await this.preloadAssets(sceneName);
    }

    private async startHotUpdate(gameName: string) {
        if (true) {
            return;
        }
        const hotUpdate = new pq_HotUpdate({
            setProgressLabelString: (progress) => this.setProgressLabelString(progress),
            setProgress: (progress) => this.setProgressLabelString(progress),
        });
        await hotUpdate.startHotUpdate(gameName);
    }

    private async downloadBinary(url: string, fileName: string) {
        console.log(`[pg_GameLoading] downloadBinary url:${url}, fileName:${fileName}`);
        if (!JSB) {
            console.log("[pg_GameLoading] no jsb");
            return;
        }
        return new Promise<void>((resolve, reject) => {
            const fullPath = this.writeablePath + fileName;

            const downloader = new jsb.Downloader();

            downloader.setOnFileTaskSuccess((task: jsb.DownloaderTask) => {
                console.log("[pg_GameLoading] setOnFileTaskSuccess", task.storagePath);
                resolve();
            });

            downloader.setOnTaskError((task: jsb.DownloaderTask, errorCode: number, errorCodeInternal: number, errorStr: string) => {
                console.log("[pg_GameLoading] setOnTaskError", errorStr);
                reject();
            });
            downloader.createDownloadFileTask(url, fullPath);
        });
    }

    private async unZip(targetPath: string, destinationPath: string) {
        console.log(`[pg_GameLoading] unZip targetPath:${targetPath}, destinationPath:${destinationPath}`);
        if (!JSB) {
            console.log("[pg_GameLoading] no jsb");
            return;
        }
        jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "unZip", "(Ljava/lang/String;Ljava/lang/String;)V", targetPath, destinationPath);
        return new Promise<void>(resolve => resolve());//??
        return new Promise<void>(resolve => setTimeout(() => resolve(), 5000));//??
    }

    private async loadBundle(bundlePath: string) {
        console.log(`[pg_GameLoading] loadBundle bundlePath:${bundlePath}`);
        return new Promise<AssetManager.Bundle>((resolve, reject) => {
            assetManager.loadBundle(bundlePath, (error, bundle) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(bundle);
                }
            });
        });
    }

    public async preloadAssets(sceneName: string) {
        console.log(`[pg_GameLoading] preloadAssets: ${sceneName}`);
        const onShowLoading = null;
        const onProgressLoading = (progress) => this.setProgress(progress);
        const onCloseLoading = null;

        if(hqq.isDebug){
            return true
        }else{
            onShowLoading?.();
            return new Promise<void>(resolve => {
                let currentProgress = 0,isLoading = false;
                let st = setInterval(()=>{
                    if(currentProgress > 100){
                        resolve();
                        onCloseLoading?.();
                        clearInterval(st);
                        return
                    }
                    if(currentProgress<90 || isLoading){
                        currentProgress = currentProgress>100? 100:currentProgress + (isLoading?10:2);
                    }
                    onProgressLoading?.(currentProgress/100);
                },50);
                director.preloadScene(sceneName,(err,ass:SceneAsset)=>{
                    isLoading = true;
                });
            });
        }
    }

    private setBackgroundSpriteFrame(gameName: string) {
        this.pq_UIFactory.setSpriteFrameByPathAsync(this.gameBackground, `pq/bigImage/gameloading/background/${gameName}_loding_background/spriteFrame`);
        this.pq_UIFactory.setSpriteFrameByPathAsync(this.background, `pq/images/gameloading/background/${gameName}_background/spriteFrame`);
        setTimeout(() => this.fitVisibleSize(), 0);
    }

    private showGameLoading() {
        this.rootNode.active = true;
    }

    private hideGameLoading() {
        this.rootNode.active = false;
    }

    private showStartGameButton() {
        this.startGameButton.node.active = true;
    }

    private hideStartGameButton() {
        this.startGameButton.node.active = false;
    }

    private showProgress() {
        this.progressBar.node.active = true;
        this.progressLabel.node.active = true;
    }

    private hideProgress() {
        this.progressBar.node.active = false;
        this.progressLabel.node.active = false;
    }

    private setCurrentGameConfig(gameConfig: GameConfig) {
        this.currentGameConfig = gameConfig;
    }

    private setWriteablePath() {
        if (JSB) {
            this.writeablePath = jsb.fileUtils.getWritablePath();
        } else {
            console.log("[pg_GameLoading] no jsb");
        }
    }

    private setProgress(progress: number) {
        this.progressBar.progress = progress;
    }

    private setProgressLabelString(content: string) {
        this.progressLabel.string = content;
    }

    private fitVisibleSize() {
        const size = this.getOriginalWindowSize();
        // this.background.getComponent(UITransform).setContentSize(size);
    }

    private getOriginalWindowSize() {
        return new Size(screen.windowSize.width / view.getScaleX(), screen.windowSize.height / view.getScaleY());
    }
}

interface pq_GameLoadingParameter {
    parent: Node;
    pq_UIFactory: pq_UIFactory;
    pq_EventRepository: pq_EventRepository;
}