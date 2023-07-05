import { _decorator, Component } from "cc";
import { pqui_MainLoop } from "../../../pqui/scripts/pqui_MainLoop";
import pqui_ServiceLocator from "../../../pqui/scripts/service/pqui_ServiceLocator";
import mahjongWays_AssetRepository from "../../../script/asset/pq_AssetRepository";
// import { mahjongWays_AudioController } from "./audio/mahjongWays_AudioController";
import mahjongWays_Config from "./config/mahjongWays_Config";
import mahjongWays_DataRepository from "./data/mahjongWays_DataRepository";
import mahjongWays_LotteryInfoConverter from "./data/mahjongWays_LotteryInfoConverter";
import mahjongWays_Hqq from "../../../script/hqqhub/pq_Hqq";
import httpNetwork from "../../../script/network/pq_HttpNetwork";
import mahjongWays_Receiver from "./network/mahjongWays_Receiver";
import mahjongWays_Sender from "./network/mahjongWays_Sender";
import mahjongWays_Timer from "./timer/mahjongWays_Timer";
import mahjongWays_GameState from "./ui/gamestate/mahjongWays_GameState";
// import mahjongWays_UI from "./ui/mahjongWays_UI";
import mahjongWays_EventRepository from "../../../script/event/pq_EventRepository";
import mahjongWays_UIFactory from "../../../script/ui/pq_UIFactory";
import { input } from "cc";
import { Input } from "cc";
import { EventKeyboard } from "cc";
import { mjhlNetMgr } from "./network/mahjongWays_NetManager";

import  pqui_DataRepository from '../../../pqui/scripts/data/pqui_DataRepository';


const { ccclass } = _decorator;
@ccclass
export class mahjongWays_MainLoop extends Component {

    private mahjongWays_hqqHub: mahjongWays_Hqq;

    private mahjongWays_Config: mahjongWays_Config;

    private mahjongWays_DataRepository: mahjongWays_DataRepository;

    private mahjongWays_EventRepository: mahjongWays_EventRepository;

    private mahjongWays_AssetRepository: mahjongWays_AssetRepository;

    private mahjongWays_UIFactory: mahjongWays_UIFactory;

    private mahjongWays_Timer: mahjongWays_Timer;

    private mahjongWays_GameState: mahjongWays_GameState;

    // private mahjongWays_UI: mahjongWays_UI;

    private pqui_ServiceLocator: pqui_ServiceLocator;

    private mahjongWays_LotteryInfoConverter: mahjongWays_LotteryInfoConverter;

s
    protected async onLoad() {

        console.log(`[mahjongWays_MainLoop] 0.0.3`);
        this.mahjongWays_hqqHub = new mahjongWays_Hqq();

        this.pqui_ServiceLocator = await this.node.getChildByName("pqui_UI").addComponent(pqui_MainLoop).init();


        this.mahjongWays_EventRepository = mahjongWays_EventRepository.getInstance();
        
        this.mahjongWays_Config = new mahjongWays_Config(this.mahjongWays_hqqHub);
        
        this.mahjongWays_DataRepository = new mahjongWays_DataRepository(this.pqui_ServiceLocator, this.mahjongWays_EventRepository);
        this.mahjongWays_AssetRepository = await new mahjongWays_AssetRepository().init("mjhl", true);

        this.mahjongWays_UIFactory = new mahjongWays_UIFactory(this.mahjongWays_AssetRepository);
        this.mahjongWays_Timer = new mahjongWays_Timer();
        this.mahjongWays_GameState = new mahjongWays_GameState(this.mahjongWays_EventRepository);
        // this.mahjongWays_UI = await new mahjongWays_UI().init(this.node, this.mahjongWays_UIFactory, this.mahjongWays_EventRepository, this.mahjongWays_GameState, this.mahjongWays_DataRepository);
        // await this.mahjongWays_UI.initSpinButton(this.pqui_ServiceLocator.spinContainerNode);

        // this.mahjongWays_AudioController = await new mahjongWays_AudioController().init({
        //     parent: this.node,
        //     mahjongWays_UIFactory: this.mahjongWays_UIFactory,
        //     mahjongWays_EventRepository: this.mahjongWays_EventRepository,
        //     mahjongWays_DataRepository: this.mahjongWays_DataRepository,
        //     mahjongWays_GameState: this.mahjongWays_GameState
        // });

        httpNetwork.getInstance().setRefer(this.mahjongWays_Config, this.mahjongWays_EventRepository);
        mjhlNetMgr.init(
            new mahjongWays_Receiver(this.mahjongWays_Config, this.pqui_ServiceLocator, this.mahjongWays_DataRepository),
            new mahjongWays_Sender(this.mahjongWays_Config, this.mahjongWays_DataRepository)
        );

        // this.mahjongWays_LotteryInfoConverter = new mahjongWays_LotteryInfoConverter(this.mahjongWays_EventRepository, this.mahjongWays_DataRepository);

        // add Event
        this.mahjongWays_EventRepository.onFreeGamePanelShow.Attach(() => {
            this.pqui_ServiceLocator.hideUI();
        });

        this.mahjongWays_EventRepository.onStartFreeGameButtonClicked.Attach(() => {
            this.pqui_ServiceLocator.showUI();
        });

        this.mahjongWays_EventRepository.onFreeGameSettle.Attach(() => {
            this.pqui_ServiceLocator.hideUI();
        });

        this.mahjongWays_EventRepository.onReceiveFreeGameRewardClicked.Attach(() => {
            this.pqui_ServiceLocator.showUI();
        });
        input.on(Input.EventType.KEY_DOWN, this.OnKeyDown, this);
    }


    private OnKeyDown(eventKeyboard: EventKeyboard) {
        this.mahjongWays_EventRepository.onKeyDown.Notify(eventKeyboard.keyCode);
    }

    protected start() {

    }

    protected onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.OnKeyDown, this);
        // this.mahjongWays_AudioController.destroy?.();
        this.mahjongWays_LotteryInfoConverter?.destroy();
        mjhlNetMgr.destroy();
        // this.mahjongWays_UI.destroy();
        this.mahjongWays_GameState.destroy();
        this.mahjongWays_Timer.destroy();
        this.mahjongWays_UIFactory.destroy();
        this.mahjongWays_AssetRepository.destroy();
        this.mahjongWays_EventRepository.destroy(false);
        this.mahjongWays_DataRepository.destroy();
        this.mahjongWays_Config.destroy();
    }
}
