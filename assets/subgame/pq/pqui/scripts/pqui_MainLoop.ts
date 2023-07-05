import pqui_AssetRepository from "../../script/asset/pq_AssetRepository";
import pqui_UI from "./ui/pqui_UI";
import pqui_DataRepository from "./data/pqui_DataRepository";
import pqui_ServiceLocator from "./service/pqui_ServiceLocator";
import { _decorator, Component } from "cc";
import pqui_EventRepository from "../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../script/ui/pq_UIFactory";
import pqui_HqqHub from "../../script/hqqhub/pq_Hqq";

const { ccclass } = _decorator;
@ccclass
export class pqui_MainLoop extends Component {

    private pqui_ServiceLocator: pqui_ServiceLocator;

    private pqui_EventRepository: pqui_EventRepository;

    private pqui_DataRepository: pqui_DataRepository;

    private pqui_AssetRepository: pqui_AssetRepository;

    private pqui_UIFactory: pqui_UIFactory;

    private pqui_UI: pqui_UI;

    private pqui_HqqHub: pqui_HqqHub;

    public async init() {
        console.log(`[pqui_MainLoop] 0.0.3`);
        this.pqui_EventRepository = pqui_EventRepository.getInstance();
        this.pqui_DataRepository = new pqui_DataRepository(this.pqui_EventRepository);
        this.pqui_AssetRepository = await new pqui_AssetRepository().init("mjhl", true);//??
        this.pqui_UIFactory = new pqui_UIFactory(this.pqui_AssetRepository);
        this.pqui_UI = await new pqui_UI().init(this.node, this.pqui_UIFactory, this.pqui_EventRepository, this.pqui_DataRepository);
        this.pqui_ServiceLocator = new pqui_ServiceLocator(this.pqui_DataRepository, this.pqui_UI, this.pqui_EventRepository);
        this.pqui_HqqHub = new pqui_HqqHub();
        return new Promise<pqui_ServiceLocator>(resolve => { resolve(this.pqui_ServiceLocator); });
    }

    protected oLoad() {

    }

    protected start() {
        hqq.audioMgr.stopBg();
    }

    protected onDestroy() {
        this.pqui_HqqHub.destroy();
        this.pqui_UI.destroy();
        this.pqui_UIFactory.destroy();
        this.pqui_AssetRepository.destroy();
        this.pqui_DataRepository.destroy();
        this.pqui_EventRepository.destroy(false);

        this.pqui_HqqHub = null;
        this.pqui_UI = null;
        this.pqui_UIFactory = null;
        this.pqui_AssetRepository = null;
        this.pqui_DataRepository = null;
        this.pqui_EventRepository = null;
    }
}
