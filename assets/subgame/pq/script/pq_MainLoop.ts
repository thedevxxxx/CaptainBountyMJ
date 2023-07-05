import { Component, _decorator } from "cc";
import pq_AssetRepository from "./asset/pq_AssetRepository";
import pq_Config from "./config/pq_Config";
import pq_EventRepository from "./event/pq_EventRepository";
import pq_HqqHub from "./hqqhub/pq_Hqq";
import pq_HttpNetwork from "./network/pq_HttpNetwork";
import pq_Receiver from "./network/pq_Receiver";
import pq_Sender from "./network/pq_Sender";
import pq_UI from "./ui/pq_UI";
import pq_UIFactory from "./ui/pq_UIFactory";

const { ccclass } = _decorator;

@ccclass
export default class pq_MainLoop extends Component {

    private pq_Config: pq_Config;

    private pq_HqqHub: pq_HqqHub;

    private pq_EventRepository: pq_EventRepository;

    private pq_AssetRepository: pq_AssetRepository;

    private pq_UIFactory: pq_UIFactory;

    private pq_UI: pq_UI;

    private pq_HttpNetwork: pq_HttpNetwork;

    private pq_Receiver: pq_Receiver;

    private pq_Sender: pq_Sender;

    protected async onLoad() {
        this.pq_HqqHub = new pq_HqqHub();

        this.pq_EventRepository = new pq_EventRepository();
        this.pq_Config = new pq_Config(this.pq_HqqHub);
        this.pq_Config.init(this.pq_EventRepository);
        this.pq_AssetRepository = await new pq_AssetRepository().init("pq", true);
        this.pq_UIFactory = new pq_UIFactory(this.pq_AssetRepository);
        this.pq_UI = await new pq_UI().init(this.node, this.pq_UIFactory, this.pq_EventRepository, this.pq_Config);

        this.pq_HttpNetwork = pq_HttpNetwork.getInstance();
        this.pq_HttpNetwork.init(this.pq_Config, this.pq_EventRepository);

        this.pq_Receiver = new pq_Receiver(this.pq_EventRepository);
        this.pq_Sender = new pq_Sender(this.pq_HttpNetwork, this.pq_Config, this.pq_EventRepository);

        this.pq_EventRepository.onLogoutSucceeded.Attach(() => this.backToHall());//??
        this.pq_EventRepository.onLogoutFailed.Attach(() => this.backToHall());//??
        this.pq_EventRepository.onExitLoadingButtonClick.Attach(() => this.backToHall());//??
        this.pq_EventRepository.onEnterGame.Attach(() => this.pq_HqqHub.setPortrait());//??
    }

    protected start() {
        hqq.audioMgr.stopBg();
    }

    protected onDestroy() {
        this.pq_HqqHub.destroy();
        this.pq_Sender.destroy();
        this.pq_Receiver.destroy();
        this.pq_UI.destroy();
        this.pq_UIFactory.destroy();
        this.pq_AssetRepository.destroy();
        this.pq_Config.destroy();
        this.pq_EventRepository.destroy(false);

        this.pq_HqqHub = null;
        this.pq_Sender = null;
        this.pq_Receiver = null;
        this.pq_HttpNetwork = null;
        this.pq_UI = null;
        this.pq_UIFactory = null;
        this.pq_AssetRepository = null;
        this.pq_Config = null;
        this.pq_EventRepository = null;
    }

    private backToHall() {
        pq_Config.isLogin = false;
        this.pq_HqqHub.backToHall();
        this.destroy();
        this.pq_HttpNetwork?.destroy();
        this.pq_EventRepository.destroy(true);
    }
}
