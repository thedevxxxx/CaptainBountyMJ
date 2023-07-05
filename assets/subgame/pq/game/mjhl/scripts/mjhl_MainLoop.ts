import { _decorator, Component } from "cc";
import { pqui_MainLoop } from "../../../pqui/scripts/pqui_MainLoop";
import pqui_ServiceLocator from "../../../pqui/scripts/service/pqui_ServiceLocator";
import mjhl_AssetRepository from "../../../script/asset/pq_AssetRepository";
import { mjhl_AudioController } from "./audio/mjhl_AudioController";
import mjhl_Config from "./config/mjhl_Config";
import mjhl_DataRepository from "./data/mjhl_DataRepository";
import mjhl_LotteryInfoConverter from "./data/mjhl_LotteryInfoConverter";
import mjhl_Hqq from "../../../script/hqqhub/pq_Hqq";
import httpNetwork from "../../../script/network/pq_HttpNetwork";
import mjhl_Receiver from "./network/mjhl_Receiver";
import mjhl_Sender from "./network/mjhl_Sender";
import mjhl_Timer from "./timer/mjhl_Timer";
import mjhl_GameState from "./ui/gamestate/mjhl_GameState";
import mjhl_UI from "./ui/mjhl_UI";
import mjhl_EventRepository from "../../../script/event/pq_EventRepository";
import mjhl_UIFactory from "../../../script/ui/pq_UIFactory";
import { input } from "cc";
import { Input } from "cc";
import { EventKeyboard } from "cc";
import { mjhlNetMgr } from "./network/mjhl_NetManager";

const { ccclass } = _decorator;
@ccclass
export class mjhl_MainLoop extends Component {

    private mjhl_hqqHub: mjhl_Hqq;

    private mjhl_Config: mjhl_Config;

    private mjhl_DataRepository: mjhl_DataRepository;

    private mjhl_EventRepository: mjhl_EventRepository;

    private mjhl_AssetRepository: mjhl_AssetRepository;

    private mjhl_UIFactory: mjhl_UIFactory;

    private mjhl_Timer: mjhl_Timer;

    private mjhl_GameState: mjhl_GameState;

    private mjhl_UI: mjhl_UI;

    private pqui_ServiceLocator: pqui_ServiceLocator;

    private mjhl_LotteryInfoConverter: mjhl_LotteryInfoConverter;

    private mjhl_AudioController: mjhl_AudioController;

    protected async onLoad() {
        console.log(`[mjhl_MainLoop] 0.0.3`);
        this.mjhl_hqqHub = new mjhl_Hqq();

        this.pqui_ServiceLocator = await this.node.getChildByName("pqui_UI").addComponent(pqui_MainLoop).init();

        this.mjhl_EventRepository = mjhl_EventRepository.getInstance();
        
        this.mjhl_Config = new mjhl_Config(this.mjhl_hqqHub);
        
        this.mjhl_DataRepository = new mjhl_DataRepository(this.pqui_ServiceLocator, this.mjhl_EventRepository);
        this.mjhl_AssetRepository = await new mjhl_AssetRepository().init("mjhl", true);

        this.mjhl_UIFactory = new mjhl_UIFactory(this.mjhl_AssetRepository);
        this.mjhl_Timer = new mjhl_Timer();
        this.mjhl_GameState = new mjhl_GameState(this.mjhl_EventRepository);
        this.mjhl_UI = await new mjhl_UI().init(this.node, this.mjhl_UIFactory, this.mjhl_EventRepository, this.mjhl_GameState, this.mjhl_DataRepository);
        await this.mjhl_UI.initSpinButton(this.pqui_ServiceLocator.spinContainerNode);

        this.mjhl_AudioController = await new mjhl_AudioController().init({
            parent: this.node,
            mjhl_UIFactory: this.mjhl_UIFactory,
            mjhl_EventRepository: this.mjhl_EventRepository,
            mjhl_DataRepository: this.mjhl_DataRepository,
            mjhl_GameState: this.mjhl_GameState
        });

        httpNetwork.getInstance().setRefer(this.mjhl_Config, this.mjhl_EventRepository);
        mjhlNetMgr.init(
            new mjhl_Receiver(this.mjhl_Config, this.pqui_ServiceLocator, this.mjhl_DataRepository),
            new mjhl_Sender(this.mjhl_Config, this.mjhl_DataRepository)
        );

        this.mjhl_LotteryInfoConverter = new mjhl_LotteryInfoConverter(this.mjhl_EventRepository, this.mjhl_DataRepository);

        // add Event
        this.mjhl_EventRepository.onFreeGamePanelShow.Attach(() => {
            this.pqui_ServiceLocator.hideUI();
        });

        this.mjhl_EventRepository.onStartFreeGameButtonClicked.Attach(() => {
            this.pqui_ServiceLocator.showUI();
        });

        this.mjhl_EventRepository.onFreeGameSettle.Attach(() => {
            this.pqui_ServiceLocator.hideUI();
        });

        this.mjhl_EventRepository.onReceiveFreeGameRewardClicked.Attach(() => {
            this.pqui_ServiceLocator.showUI();
        });
        input.on(Input.EventType.KEY_DOWN, this.OnKeyDown, this);
    }


    private OnKeyDown(eventKeyboard: EventKeyboard) {
        this.mjhl_EventRepository.onKeyDown.Notify(eventKeyboard.keyCode);
    }

    protected start() {

    }

    protected onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.OnKeyDown, this);
        this.mjhl_AudioController.destroy?.();
        this.mjhl_LotteryInfoConverter?.destroy();
        mjhlNetMgr.destroy();
        this.mjhl_UI.destroy();
        this.mjhl_GameState.destroy();
        this.mjhl_Timer.destroy();
        this.mjhl_UIFactory.destroy();
        this.mjhl_AssetRepository.destroy();
        this.mjhl_EventRepository.destroy(false);
        this.mjhl_DataRepository.destroy();
        this.mjhl_Config.destroy();
    }
}
