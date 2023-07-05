import { _decorator, Component } from "cc";
import { pqui_MainLoop } from "../../../pqui/scripts/pqui_MainLoop";
import pqui_ServiceLocator from "../../../pqui/scripts/service/pqui_ServiceLocator";
import pq_Config from "../../../script/config/pq_Config";
import pq_Hqq from "../../../script/hqqhub/pq_Hqq";
import pq_HttpNetwork from "../../../script/network/pq_HttpNetwork";
import pq_EventRepository from "../../../script/event/pq_EventRepository";
import example_Receiver from "./network/example_Receiver";
import example_Sender from "./network/example_Sender";

const { ccclass } = _decorator;
@ccclass
export class example_MainLoop extends Component {

    private pq_Hqq: pq_Hqq;

    private pq_Config: pq_Config;

    private eventRepository: pq_EventRepository;

    private pqui_ServiceLocator: pqui_ServiceLocator;

    private pq_HttpNetwork: pq_HttpNetwork;

    private example_Receiver: example_Receiver;

    private example_Sender: example_Sender;

    protected async onLoad() {
        console.log(`[example] 0.0.0`);
        // pqui - init
        this.pqui_ServiceLocator = await this.node.getChildByName("pqui_UI").addComponent(pqui_MainLoop).init();
        // event
        this.eventRepository = pq_EventRepository.getInstance();
        // config
        this.pq_Hqq = new pq_Hqq();
        this.pq_Config = new pq_Config(this.pq_Hqq);
        // network
        this.pq_HttpNetwork = pq_HttpNetwork.getInstance();
        this.pq_HttpNetwork.setRefer(this.pq_Config,this.eventRepository);
        this.example_Receiver = new example_Receiver(this.eventRepository, this.pq_Config);
        this.example_Sender = new example_Sender(this.pq_HttpNetwork, this.eventRepository, this.pq_Config, this.pqui_ServiceLocator);
    }

    protected start() {

    }

    protected onDestroy() {
        this.example_Sender?.destroy();
        this.example_Receiver?.destroy();
        this.eventRepository.destroy(false);
    }
}
