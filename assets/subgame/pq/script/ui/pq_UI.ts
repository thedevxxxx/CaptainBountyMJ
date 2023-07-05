import pq_Config from "../config/pq_Config";
import pq_EventRepository from "../event/pq_EventRepository";
import pq_Background from "./background/pq_Background";
import pq_GameList from "./gamelist/pq_GameList";
import pq_Loading from "./loading/pq_Loading";
import pq_Menu from "./menu/pq_Menu";
import pq_UIFactory from "./pq_UIFactory";
import pq_TopPanel from "./top/pq_TopPanel";
import pq_Warner from "./warner/pq_Warner";
import { Node } from "cc";
import pq_GameLoading from "../gameloading/pq_GameLoading";

export default class pq_UI {

    private pq_Warner: pq_Warner;

    private pq_Background: pq_Background;

    private pq_GameList: pq_GameList;

    private pq_Menu: pq_Menu;

    private pq_TopPanel: pq_TopPanel;

    private pq_Loading: pq_Loading;

    private pq_GameLoading: pq_GameLoading;

    public constructor() {

    }

    public async init(parent: Node, pq_UIFactory: pq_UIFactory, pq_EventRepository: pq_EventRepository, pq_Config: pq_Config) {
        const node = pq_UIFactory.createNode({
            parent: parent,
            name: "pq_UI"
        });
        pq_UIFactory.addWidget(node, { top: 0, bottom: 0, left: 0, right: 0, target: parent.parent });

        this.pq_Background = new pq_Background(node, pq_UIFactory);

        this.pq_Menu = new pq_Menu(node, pq_UIFactory);

        this.pq_GameList = new pq_GameList(node, pq_UIFactory, pq_EventRepository);

        this.pq_TopPanel = new pq_TopPanel(node, pq_UIFactory, pq_Config, pq_EventRepository);

        this.pq_Loading = new pq_Loading({
            parent: node,
            pq_UIFactory: pq_UIFactory,
            pq_EventRepository: pq_EventRepository
        });

        this.pq_Warner = new pq_Warner(node, pq_UIFactory);

        //this.pq_Loading.hideLoading();//??

        this.pq_GameLoading = await new pq_GameLoading().init({ parent: node, pq_UIFactory: pq_UIFactory, pq_EventRepository: pq_EventRepository });

        return this;
    }

    public destroy() {
        this.pq_Warner.destroy();
        this.pq_Loading.destroy();
        this.pq_TopPanel.destroy();
        this.pq_Menu.destroy();
        this.pq_GameList.destroy();
        this.pq_Background.destroy();

        this.pq_Warner = null;
        this.pq_Loading = null;
        this.pq_TopPanel = null;
        this.pq_Menu = null;
        this.pq_GameList = null;
        this.pq_Background = null;
    }
}