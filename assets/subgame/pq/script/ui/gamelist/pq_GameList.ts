import { Button, director, Layout, Node, Size, Sprite } from "cc";
import pq_EventRepository from "../../event/pq_EventRepository";
import pq_UIFactory from "../pq_UIFactory";
import * as cc from 'cc';

export let gameConfigs: Array<GameConfig> = [
    //{ gameName: "mjhl", sceneName: "mjhl_main", spriteFrameName: "pq_game_mjhl" },
    //{ gameName: "maskCarnival", sceneName: "MaskCarnival_Load", spriteFrameName: "pq_game_maskCarnival" },
    //{ gameName: "example", sceneName: "example_main", spriteFrameName: "pq_game_example" },
    //{ gameName: "mahjong-ways2", sceneName: "MahjongWays2_Load", spriteFrameName: "pq_game_mahjong-ways2" },
    { gameName: "mahjong-ways", sceneName: "MahjongWays_Load", spriteFrameName: "pq_game_mjhl" },

];

export default class pq_GameList {

    private pq_UIFactory: pq_UIFactory;

    private pq_EventRepository: pq_EventRepository;

    public constructor(parent: Node, pq_UIFactory: pq_UIFactory, pq_EventRepository: pq_EventRepository) {
        this.pq_EventRepository = pq_EventRepository;
        this.pq_UIFactory = pq_UIFactory;
        if(!hqq.isDebug){ // 删除example
            let index = gameConfigs.findIndex(e=>e.gameName=='example');
            if(index!=-1) gameConfigs.splice(index,1);
        }
        this.createUI(parent, pq_UIFactory);
    }

    public destroy() {

    }

    private createUI(parent: Node, pq_UIFactory: pq_UIFactory) {
        const scrollView = pq_UIFactory.createScrollView(parent, {
            scroViewSize: new Size(1084, 670),
            contentHeight: 670,
            //scrollViewSpriteFramePath: "pq/images/pq_default_btn_normal/spriteFrame"
        }, {
            top: 80,
            bottom: 0,
            left: 250,
            right: 0
        });
        pq_UIFactory.addGridLayout(scrollView.content, {
            resizeMode: Layout.ResizeMode.CONTAINER,
            startAxis: Layout.AxisDirection.HORIZONTAL,
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 30,
            paddingBottom: 30,
            spacingX: 30,
            spacingY: 30,
            verticalDirection: Layout.VerticalDirection.TOP_TO_BOTTOM,
            horizontalDirection: Layout.HorizontalDirection.LEFT_TO_RIGHT,
            affectedByScale: false

        });
        pq_UIFactory.addWidget(scrollView.content, { left: 0, right: 0 });

        const gameConfigCount = gameConfigs.length;
        for (let index = 0; index < gameConfigCount; index++) {
            const gameConfig = gameConfigs[index];
            const spriteFrameName = gameConfig.spriteFrameName;

            pq_UIFactory.createButton({
                parent: scrollView.content,
                name: ""
            }, {
                transition: Button.Transition.NONE,
                onClick: () => this.onGameButtonClick(gameConfig)
            }, {
                type: Sprite.Type.SIMPLE,
                sizeMode: Sprite.SizeMode.RAW,
                spriteFramePath: `pq/images/icons/${spriteFrameName}/spriteFrame`
            });
        }
    }

    private async onGameButtonClick(gameConfig: GameConfig) {
        hqq.reflect.setOrientation("portrait");
        cc.director.preloadScene(gameConfig.sceneName, this.onLoadProgress.bind(this), this.onLoaded.bind(this, gameConfig));
        // this.pq_EventRepository.onEnterGame.Notify(gameConfig);
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
    private onLoaded(gameConfig:GameConfig) {
        console.log("加载完成")
        cc.director.loadScene(gameConfig.sceneName);
        // if(cc.director.getScene().name == "PzbrnnRoom"){
        //     hqq.eventMgr.dispatch(hqq.eventMgr.showSubGamePanel, { });
        //     if (cc.isValid(this.loadpanl)) this.loadpanl.active = false;
        // }
    }
}

export interface GameConfig {

    gameName: string;

    sceneName: string;

    spriteFrameName: string;
}