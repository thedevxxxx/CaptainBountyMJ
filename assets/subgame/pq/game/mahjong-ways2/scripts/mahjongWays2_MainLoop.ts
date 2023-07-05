import { _decorator, Component } from "cc";
import { pqui_MainLoop } from "../../../pqui/scripts/pqui_MainLoop";
import pqui_ServiceLocator from "../../../pqui/scripts/service/pqui_ServiceLocator";
import mahjongWays2_AssetRepository from "../../../script/asset/pq_AssetRepository";
import { mahjongWays2_AudioController } from "./audio/mahjongWays2_AudioController";
import mahjongWays2_Config from "./config/mahjongWays2_Config";
import mahjongWays2_DataRepository from "./data/mahjongWays2_DataRepository";
import mahjongWays2_LotteryInfoConverter from "./data/mahjongWays2_LotteryInfoConverter";
import mahjongWays2_Hqq from "../../../script/hqqhub/pq_Hqq";
import httpNetwork from "../../../script/network/pq_HttpNetwork";
import mahjongWays2_Receiver from "./network/mahjongWays2_Receiver";
import mahjongWays2_Sender from "./network/mahjongWays2_Sender";
import mahjongWays2_Timer from "./timer/mahjongWays2_Timer";
import mahjongWays2_GameState from "./ui/gamestate/mahjongWays2_GameState";
// import mahjongWays2_UI from "./ui/mahjongWays2_UI";
import mahjongWays2_EventRepository from "../../../script/event/pq_EventRepository";
import mahjongWays2_UIFactory from "../../../script/ui/pq_UIFactory";
import { input } from "cc";
import { Input } from "cc";
import { EventKeyboard } from "cc";
import { mjhlNetMgr } from "./network/mahjongWays2_NetManager";

import  pqui_DataRepository from '../../../pqui/scripts/data/pqui_DataRepository';


const { ccclass } = _decorator;
@ccclass
export class mahjongWays2_MainLoop extends Component {

    private mahjongWays2_hqqHub: mahjongWays2_Hqq;

    private mahjongWays2_Config: mahjongWays2_Config;

    private mahjongWays2_DataRepository: mahjongWays2_DataRepository;

    private mahjongWays2_EventRepository: mahjongWays2_EventRepository;

    private mahjongWays2_AssetRepository: mahjongWays2_AssetRepository;

    private mahjongWays2_UIFactory: mahjongWays2_UIFactory;

    private mahjongWays2_Timer: mahjongWays2_Timer;

    private mahjongWays2_GameState: mahjongWays2_GameState;

    // private mahjongWays2_UI: mahjongWays2_UI;

    private pqui_ServiceLocator: pqui_ServiceLocator;

    private mahjongWays2_LotteryInfoConverter: mahjongWays2_LotteryInfoConverter;

    private mahjongWays2_AudioController: mahjongWays2_AudioController;

    protected async onLoad() {

        console.log(`[mahjongWays2_MainLoop] 0.0.3`);
        this.mahjongWays2_hqqHub = new mahjongWays2_Hqq();

        this.pqui_ServiceLocator = await this.node.getChildByName("pqui_UI").addComponent(pqui_MainLoop).init();


        this.mahjongWays2_EventRepository = mahjongWays2_EventRepository.getInstance();
        
        this.mahjongWays2_Config = new mahjongWays2_Config(this.mahjongWays2_hqqHub);
        
        this.mahjongWays2_DataRepository = new mahjongWays2_DataRepository(this.pqui_ServiceLocator, this.mahjongWays2_EventRepository);
        this.mahjongWays2_AssetRepository = await new mahjongWays2_AssetRepository().init("mjhl", true);

        this.mahjongWays2_UIFactory = new mahjongWays2_UIFactory(this.mahjongWays2_AssetRepository);
        this.mahjongWays2_Timer = new mahjongWays2_Timer();
        this.mahjongWays2_GameState = new mahjongWays2_GameState(this.mahjongWays2_EventRepository);
        // this.mahjongWays2_UI = await new mahjongWays2_UI().init(this.node, this.mahjongWays2_UIFactory, this.mahjongWays2_EventRepository, this.mahjongWays2_GameState, this.mahjongWays2_DataRepository);
        // await this.mahjongWays2_UI.initSpinButton(this.pqui_ServiceLocator.spinContainerNode);

        this.mahjongWays2_AudioController = await new mahjongWays2_AudioController().init({
            parent: this.node,
            mahjongWays2_UIFactory: this.mahjongWays2_UIFactory,
            mahjongWays2_EventRepository: this.mahjongWays2_EventRepository,
            mahjongWays2_DataRepository: this.mahjongWays2_DataRepository,
            mahjongWays2_GameState: this.mahjongWays2_GameState
        });

        httpNetwork.getInstance().setRefer(this.mahjongWays2_Config, this.mahjongWays2_EventRepository);
        mjhlNetMgr.init(
            new mahjongWays2_Receiver(this.mahjongWays2_Config, this.pqui_ServiceLocator, this.mahjongWays2_DataRepository),
            new mahjongWays2_Sender(this.mahjongWays2_Config, this.mahjongWays2_DataRepository)
        );

        // this.mahjongWays2_LotteryInfoConverter = new mahjongWays2_LotteryInfoConverter(this.mahjongWays2_EventRepository, this.mahjongWays2_DataRepository);

        // add Event
        this.mahjongWays2_EventRepository.onFreeGamePanelShow.Attach(() => {
            this.pqui_ServiceLocator.hideUI();
        });

        this.mahjongWays2_EventRepository.onStartFreeGameButtonClicked.Attach(() => {
            this.pqui_ServiceLocator.showUI();
        });

        this.mahjongWays2_EventRepository.onFreeGameSettle.Attach(() => {
            this.pqui_ServiceLocator.hideUI();
        });

        this.mahjongWays2_EventRepository.onReceiveFreeGameRewardClicked.Attach(() => {
            this.pqui_ServiceLocator.showUI();
        });
        input.on(Input.EventType.KEY_DOWN, this.OnKeyDown, this);
    }


    private OnKeyDown(eventKeyboard: EventKeyboard) {
        this.mahjongWays2_EventRepository.onKeyDown.Notify(eventKeyboard.keyCode);
    }

    protected start() {

    }

    protected onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.OnKeyDown, this);
        this.mahjongWays2_AudioController.destroy?.();
        this.mahjongWays2_LotteryInfoConverter?.destroy();
        mjhlNetMgr.destroy();
        // this.mahjongWays2_UI.destroy();
        this.mahjongWays2_GameState.destroy();
        this.mahjongWays2_Timer.destroy();
        this.mahjongWays2_UIFactory.destroy();
        this.mahjongWays2_AssetRepository.destroy();
        this.mahjongWays2_EventRepository.destroy(false);
        this.mahjongWays2_DataRepository.destroy();
        this.mahjongWays2_Config.destroy();
    }
}
