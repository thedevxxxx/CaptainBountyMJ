/*
import { KeyCode, Node } from "cc";
import mahjongWays_FreeGamePanel from "./freegame/mahjongWays_FreeGamePanel";
import mahjongWays_FreeGameSettlePanel from "./freegame/mahjongWays_FreeGameSettlePanel";
// import mahjongWays_Marquee from "./marquee/mahjongWays_Marquee";
// import mahjongWays_Background from "./background/mahjongWays_Background";
import mahjongWays_BottomPanel from "./bottomPanel/mahjongWays_BottomPanel";
// import mahjongWays_ReelRepository from "./reel/mahjongWays_ReelRepository";
// import mahjongWays_SpinButton from "./spinbutton/mahjongWays_SpinButton";
import mahjongWays_TopPanel from "../../script/ui/toppanel/mahjongWays_TopPanel";
import mahjongWays_GameState from "./gamestate/mahjongWays_GameState";
import mahjongWays_Paytable from "./paytable/mahjongWays_Paytable";
import mahjongWays_Rules from "./rules/mahjongWays_Rules";
import mahjongWays_DataRepository from "../data/mahjongWays_DataRepository";
import mahjongWays_EventRepository,{FreeGameParameter,FreeGameSettleParameter} from "../../../../script/event/pq_EventRepository";
import mahjongWays_UIFactory from "../../../../script/ui/pq_UIFactory";
import { mjhlNetMgr } from "../network/mahjongWays_NetManager";

export default class mahjongWays_UI {

    public node: Node;

    private mahjongWays_UIFactory: mahjongWays_UIFactory;

    private mahjongWays_EventRepository: mahjongWays_EventRepository;

    private mahjongWays_GameState: mahjongWays_GameState;

    // private mahjongWays_Background: mahjongWays_Background;

    private mahjongWays_TopPanel: mahjongWays_TopPanel;

    private mahjongWays_BottomPanel: mahjongWays_BottomPanel;

    // private mahjongWays_ReelRepository: mahjongWays_ReelRepository;

    // private mahjongWays_SpinButton: mahjongWays_SpinButton;

    // private mahjongWays_Marquee: mahjongWays_Marquee;

    private mahjongWays_Paytable: mahjongWays_Paytable;

    private mahjongWays_Rules: mahjongWays_Rules;

    public constructor() {

    }

    public async init(parent: Node, mahjongWays_UIFactory: mahjongWays_UIFactory, mahjongWays_EventRepository: mahjongWays_EventRepository, mahjongWays_GameState: mahjongWays_GameState, mahjongWays_DataRepository: mahjongWays_DataRepository) {
        this.mahjongWays_UIFactory = mahjongWays_UIFactory;
        this.mahjongWays_EventRepository = mahjongWays_EventRepository;
        this.mahjongWays_GameState = mahjongWays_GameState;

        const node = parent.getChildByName("mahjongWays_UI");
        this.node = node;

        // this.mahjongWays_Background = new mahjongWays_Background(node.getChildByName("background"), this.mahjongWays_UIFactory, this.mahjongWays_EventRepository);
        // this.mahjongWays_ReelRepository = await new mahjongWays_ReelRepository().init(node.getChildByName("background"), this.mahjongWays_UIFactory, this.mahjongWays_EventRepository, mahjongWays_GameState, mahjongWays_DataRepository);
        // this.mahjongWays_TopPanel = await new mahjongWays_TopPanel().init({
        //     parent: node.getChildByName("topPanel"),
        //     mahjongWays_UIFactory: this.mahjongWays_UIFactory,
        //     mahjongWays_EventRepository: this.mahjongWays_EventRepository
        // });
        // this.mahjongWays_BottomPanel = await new mahjongWays_BottomPanel().init({
        //     parent: node.getChildByName("bottomPanel"),
        //     mahjongWays_UIFactory: this.mahjongWays_UIFactory,
        //     mahjongWays_EventRepository: this.mahjongWays_EventRepository,
        // });
        // this.mahjongWays_Marquee = new mahjongWays_Marquee({
        //     parent: node.getChildByName("marquee"),
        //     mahjongWays_UIFactory: this.mahjongWays_UIFactory,
        //     mahjongWays_EventRepository: this.mahjongWays_EventRepository,
        // });
        this.mahjongWays_Paytable = new mahjongWays_Paytable(this.mahjongWays_UIFactory, this.mahjongWays_EventRepository);
        this.mahjongWays_Rules = new mahjongWays_Rules(this.mahjongWays_UIFactory, this.mahjongWays_EventRepository);

        mahjongWays_EventRepository.onFreeGame.Attach((freeGameParameter:FreeGameParameter) => this.onFreeGame(freeGameParameter));
        mahjongWays_EventRepository.onFreeGameSettle.Attach((freeGameSettleParameter) => this.onFreeGameSettle(freeGameSettleParameter));

        return new Promise<typeof this>(resolve => resolve(this));
    }

    public async initSpinButton(spinContainerNode: Node) {
        // this.mahjongWays_SpinButton = await new mahjongWays_SpinButton().init({
        //     parent: spinContainerNode,
        //     mahjongWays_UIFactory: this.mahjongWays_UIFactory,
        //     mahjongWays_EventRepository: this.mahjongWays_EventRepository,
        //     mahjongWays_GameState: this.mahjongWays_GameState
        // });
    }

    public destroy() {
        this.mahjongWays_Rules.destroy();
        this.mahjongWays_Paytable.destroy();
        // this.mahjongWays_SpinButton.destroy();
        // this.mahjongWays_Marquee.destroy();
        this.mahjongWays_BottomPanel.destroy();
        this.mahjongWays_TopPanel.destroy();
        // this.mahjongWays_ReelRepository.destroy();
        // this.mahjongWays_Background.destroy();

        this.mahjongWays_Rules = null;
        this.mahjongWays_Paytable = null;
        // this.mahjongWays_SpinButton = null;
        // this.mahjongWays_SpinButton = null;
        this.mahjongWays_BottomPanel = null;
        this.mahjongWays_TopPanel = null;
        // this.mahjongWays_ReelRepository = null;
        // this.mahjongWays_Background = null;
    }

    private onFreeGame(freeGameParameter: FreeGameParameter) {
        if (freeGameParameter.isFirstFreeGame) {
            new mahjongWays_FreeGamePanel({
                parent: this.node,
                mahjongWays_UIFactory: this.mahjongWays_UIFactory,
                freeGameCount: freeGameParameter.freeGameCount,
                onButtonClickedCallback: () => {
                    this.mahjongWays_EventRepository.onStartFreeGameButtonClicked.Notify();
                    mjhlNetMgr.sendFreeSpin();
                }
            });
            this.mahjongWays_EventRepository.onFreeGamePanelShow.Notify();
        }
    }

    private async onFreeGameSettle(freeGameSettleParameter: FreeGameSettleParameter) {
        const totalWin = freeGameSettleParameter.totalWin;
        if (totalWin != null) {
            const freeGameSettlePanel = await new mahjongWays_FreeGameSettlePanel().init({
                parent: this.node,
                mahjongWays_UIFactory: this.mahjongWays_UIFactory,
                totalWin: totalWin,
                onButtonClickedCallback: () => {
                    this.mahjongWays_EventRepository.onReceiveFreeGameRewardClicked.Notify();
                    this.mahjongWays_EventRepository.onBaseGame.Notify();
                    this.mahjongWays_EventRepository.onMultiple.Notify({
                        multiple: 1,
                        isFreeGame: false,
                        isMute: false
                    });
                },
                mahjongWays_EventRepository: this.mahjongWays_EventRepository
            });
        }
    }
}
*/