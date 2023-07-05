/*
import { KeyCode, Node } from "cc";
import mahjongWays2_FreeGamePanel from "./freegame/mahjongWays2_FreeGamePanel";
import mahjongWays2_FreeGameSettlePanel from "./freegame/mahjongWays2_FreeGameSettlePanel";
// import mahjongWays2_Marquee from "./marquee/mahjongWays2_Marquee";
// import mahjongWays2_Background from "./background/mahjongWays2_Background";
import mahjongWays2_BottomPanel from "./bottomPanel/mahjongWays2_BottomPanel";
// import mahjongWays2_ReelRepository from "./reel/mahjongWays2_ReelRepository";
// import mahjongWays2_SpinButton from "./spinbutton/mahjongWays2_SpinButton";
import mahjongWays2_TopPanel from "../../script/ui/toppanel/mahjongWays2_TopPanel";
import mahjongWays2_GameState from "./gamestate/mahjongWays2_GameState";
import mahjongWays2_Paytable from "./paytable/mahjongWays2_Paytable";
import mahjongWays2_Rules from "./rules/mahjongWays2_Rules";
import mahjongWays2_DataRepository from "../data/mahjongWays2_DataRepository";
import mahjongWays2_EventRepository,{FreeGameParameter,FreeGameSettleParameter} from "../../../../script/event/pq_EventRepository";
import mahjongWays2_UIFactory from "../../../../script/ui/pq_UIFactory";
import { mjhlNetMgr } from "../network/mahjongWays2_NetManager";

export default class mahjongWays2_UI {

    public node: Node;

    private mahjongWays2_UIFactory: mahjongWays2_UIFactory;

    private mahjongWays2_EventRepository: mahjongWays2_EventRepository;

    private mahjongWays2_GameState: mahjongWays2_GameState;

    // private mahjongWays2_Background: mahjongWays2_Background;

    private mahjongWays2_TopPanel: mahjongWays2_TopPanel;

    private mahjongWays2_BottomPanel: mahjongWays2_BottomPanel;

    // private mahjongWays2_ReelRepository: mahjongWays2_ReelRepository;

    // private mahjongWays2_SpinButton: mahjongWays2_SpinButton;

    // private mahjongWays2_Marquee: mahjongWays2_Marquee;

    private mahjongWays2_Paytable: mahjongWays2_Paytable;

    private mahjongWays2_Rules: mahjongWays2_Rules;

    public constructor() {

    }

    public async init(parent: Node, mahjongWays2_UIFactory: mahjongWays2_UIFactory, mahjongWays2_EventRepository: mahjongWays2_EventRepository, mahjongWays2_GameState: mahjongWays2_GameState, mahjongWays2_DataRepository: mahjongWays2_DataRepository) {
        this.mahjongWays2_UIFactory = mahjongWays2_UIFactory;
        this.mahjongWays2_EventRepository = mahjongWays2_EventRepository;
        this.mahjongWays2_GameState = mahjongWays2_GameState;

        const node = parent.getChildByName("mahjongWays2_UI");
        this.node = node;

        // this.mahjongWays2_Background = new mahjongWays2_Background(node.getChildByName("background"), this.mahjongWays2_UIFactory, this.mahjongWays2_EventRepository);
        // this.mahjongWays2_ReelRepository = await new mahjongWays2_ReelRepository().init(node.getChildByName("background"), this.mahjongWays2_UIFactory, this.mahjongWays2_EventRepository, mahjongWays2_GameState, mahjongWays2_DataRepository);
        // this.mahjongWays2_TopPanel = await new mahjongWays2_TopPanel().init({
        //     parent: node.getChildByName("topPanel"),
        //     mahjongWays2_UIFactory: this.mahjongWays2_UIFactory,
        //     mahjongWays2_EventRepository: this.mahjongWays2_EventRepository
        // });
        // this.mahjongWays2_BottomPanel = await new mahjongWays2_BottomPanel().init({
        //     parent: node.getChildByName("bottomPanel"),
        //     mahjongWays2_UIFactory: this.mahjongWays2_UIFactory,
        //     mahjongWays2_EventRepository: this.mahjongWays2_EventRepository,
        // });
        // this.mahjongWays2_Marquee = new mahjongWays2_Marquee({
        //     parent: node.getChildByName("marquee"),
        //     mahjongWays2_UIFactory: this.mahjongWays2_UIFactory,
        //     mahjongWays2_EventRepository: this.mahjongWays2_EventRepository,
        // });
        this.mahjongWays2_Paytable = new mahjongWays2_Paytable(this.mahjongWays2_UIFactory, this.mahjongWays2_EventRepository);
        this.mahjongWays2_Rules = new mahjongWays2_Rules(this.mahjongWays2_UIFactory, this.mahjongWays2_EventRepository);

        mahjongWays2_EventRepository.onFreeGame.Attach((freeGameParameter:FreeGameParameter) => this.onFreeGame(freeGameParameter));
        mahjongWays2_EventRepository.onFreeGameSettle.Attach((freeGameSettleParameter) => this.onFreeGameSettle(freeGameSettleParameter));

        return new Promise<typeof this>(resolve => resolve(this));
    }

    public async initSpinButton(spinContainerNode: Node) {
        // this.mahjongWays2_SpinButton = await new mahjongWays2_SpinButton().init({
        //     parent: spinContainerNode,
        //     mahjongWays2_UIFactory: this.mahjongWays2_UIFactory,
        //     mahjongWays2_EventRepository: this.mahjongWays2_EventRepository,
        //     mahjongWays2_GameState: this.mahjongWays2_GameState
        // });
    }

    public destroy() {
        this.mahjongWays2_Rules.destroy();
        this.mahjongWays2_Paytable.destroy();
        // this.mahjongWays2_SpinButton.destroy();
        // this.mahjongWays2_Marquee.destroy();
        this.mahjongWays2_BottomPanel.destroy();
        this.mahjongWays2_TopPanel.destroy();
        // this.mahjongWays2_ReelRepository.destroy();
        // this.mahjongWays2_Background.destroy();

        this.mahjongWays2_Rules = null;
        this.mahjongWays2_Paytable = null;
        // this.mahjongWays2_SpinButton = null;
        // this.mahjongWays2_SpinButton = null;
        this.mahjongWays2_BottomPanel = null;
        this.mahjongWays2_TopPanel = null;
        // this.mahjongWays2_ReelRepository = null;
        // this.mahjongWays2_Background = null;
    }

    private onFreeGame(freeGameParameter: FreeGameParameter) {
        if (freeGameParameter.isFirstFreeGame) {
            new mahjongWays2_FreeGamePanel({
                parent: this.node,
                mahjongWays2_UIFactory: this.mahjongWays2_UIFactory,
                freeGameCount: freeGameParameter.freeGameCount,
                onButtonClickedCallback: () => {
                    this.mahjongWays2_EventRepository.onStartFreeGameButtonClicked.Notify();
                    mjhlNetMgr.sendFreeSpin();
                }
            });
            this.mahjongWays2_EventRepository.onFreeGamePanelShow.Notify();
        }
    }

    private async onFreeGameSettle(freeGameSettleParameter: FreeGameSettleParameter) {
        const totalWin = freeGameSettleParameter.totalWin;
        if (totalWin != null) {
            const freeGameSettlePanel = await new mahjongWays2_FreeGameSettlePanel().init({
                parent: this.node,
                mahjongWays2_UIFactory: this.mahjongWays2_UIFactory,
                totalWin: totalWin,
                onButtonClickedCallback: () => {
                    this.mahjongWays2_EventRepository.onReceiveFreeGameRewardClicked.Notify();
                    this.mahjongWays2_EventRepository.onBaseGame.Notify();
                    this.mahjongWays2_EventRepository.onMultiple.Notify({
                        multiple: 1,
                        isFreeGame: false,
                        isMute: false
                    });
                },
                mahjongWays2_EventRepository: this.mahjongWays2_EventRepository
            });
        }
    }
}
*/