import { KeyCode, Node } from "cc";
import mjhl_FreeGamePanel from "./freegame/mjhl_FreeGamePanel";
import mjhl_FreeGameSettlePanel from "./freegame/mjhl_FreeGameSettlePanel";
import mjhl_Marquee from "./marquee/mjhl_Marquee";
import mjhl_Background from "./background/mjhl_Background";
import mjhl_BottomPanel from "./bottomPanel/mjhl_BottomPanel";
import mjhl_ReelRepository from "./reel/mjhl_ReelRepository";
import mjhl_SpinButton from "./spinbutton/mjhl_SpinButton";
import mjhl_TopPanel from "./toppanel/mjhl_TopPanel";
import mjhl_GameState from "./gamestate/mjhl_GameState";
import mjhl_Paytable from "./paytable/mjhl_Paytable";
import mjhl_Rules from "./rules/mjhl_Rules";
import mjhl_DataRepository from "../data/mjhl_DataRepository";
import mjhl_EventRepository,{FreeGameParameter,FreeGameSettleParameter} from "../../../../script/event/pq_EventRepository";
import mjhl_UIFactory from "../../../../script/ui/pq_UIFactory";
import { mjhlNetMgr } from "../network/mjhl_NetManager";

export default class mjhl_UI {

    public node: Node;

    private mjhl_UIFactory: mjhl_UIFactory;

    private mjhl_EventRepository: mjhl_EventRepository;

    private mjhl_GameState: mjhl_GameState;

    private mjhl_Background: mjhl_Background;

    private mjhl_TopPanel: mjhl_TopPanel;

    private mjhl_BottomPanel: mjhl_BottomPanel;

    private mjhl_ReelRepository: mjhl_ReelRepository;

    private mjhl_SpinButton: mjhl_SpinButton;

    private mjhl_Marquee: mjhl_Marquee;

    private mjhl_Paytable: mjhl_Paytable;

    private mjhl_Rules: mjhl_Rules;

    public constructor() {

    }

    public async init(parent: Node, mjhl_UIFactory: mjhl_UIFactory, mjhl_EventRepository: mjhl_EventRepository, mjhl_GameState: mjhl_GameState, mjhl_DataRepository: mjhl_DataRepository) {
        this.mjhl_UIFactory = mjhl_UIFactory;
        this.mjhl_EventRepository = mjhl_EventRepository;
        this.mjhl_GameState = mjhl_GameState;

        const node = parent.getChildByName("mjhl_UI");
        this.node = node;

        this.mjhl_Background = new mjhl_Background(node, this.mjhl_UIFactory, this.mjhl_EventRepository);
        this.mjhl_ReelRepository = await new mjhl_ReelRepository().init(node, this.mjhl_UIFactory, this.mjhl_EventRepository, mjhl_GameState, mjhl_DataRepository);
        this.mjhl_TopPanel = await new mjhl_TopPanel().init({
            parent: node,
            mjhl_UIFactory: this.mjhl_UIFactory,
            mjhl_EventRepository: this.mjhl_EventRepository
        });
        this.mjhl_BottomPanel = await new mjhl_BottomPanel().init({
            parent: node,
            mjhl_UIFactory: this.mjhl_UIFactory,
            mjhl_EventRepository: this.mjhl_EventRepository,
        });
        this.mjhl_Marquee = new mjhl_Marquee({
            parent: node,
            mjhl_UIFactory: this.mjhl_UIFactory,
            mjhl_EventRepository: this.mjhl_EventRepository,
        });
        this.mjhl_Paytable = new mjhl_Paytable(this.mjhl_UIFactory, this.mjhl_EventRepository);
        this.mjhl_Rules = new mjhl_Rules(this.mjhl_UIFactory, this.mjhl_EventRepository);

        mjhl_EventRepository.onFreeGame.Attach((freeGameParameter:FreeGameParameter) => this.onFreeGame(freeGameParameter));
        mjhl_EventRepository.onFreeGameSettle.Attach((freeGameSettleParameter) => this.onFreeGameSettle(freeGameSettleParameter));

        return new Promise<typeof this>(resolve => resolve(this));
    }

    public async initSpinButton(spinContainerNode: Node) {
        this.mjhl_SpinButton = await new mjhl_SpinButton().init({
            parent: spinContainerNode,
            mjhl_UIFactory: this.mjhl_UIFactory,
            mjhl_EventRepository: this.mjhl_EventRepository,
            mjhl_GameState: this.mjhl_GameState
        });
    }

    public destroy() {
        this.mjhl_Rules.destroy();
        this.mjhl_Paytable.destroy();
        this.mjhl_SpinButton.destroy();
        this.mjhl_Marquee.destroy();
        this.mjhl_BottomPanel.destroy();
        this.mjhl_TopPanel.destroy();
        this.mjhl_ReelRepository.destroy();
        this.mjhl_Background.destroy();

        this.mjhl_Rules = null;
        this.mjhl_Paytable = null;
        this.mjhl_SpinButton = null;
        this.mjhl_SpinButton = null;
        this.mjhl_BottomPanel = null;
        this.mjhl_TopPanel = null;
        this.mjhl_ReelRepository = null;
        this.mjhl_Background = null;
    }

    private onFreeGame(freeGameParameter: FreeGameParameter) {
        if (freeGameParameter.isFirstFreeGame) {
            new mjhl_FreeGamePanel({
                parent: this.node,
                mjhl_UIFactory: this.mjhl_UIFactory,
                freeGameCount: freeGameParameter.freeGameCount,
                onButtonClickedCallback: () => {
                    this.mjhl_EventRepository.onStartFreeGameButtonClicked.Notify();
                    mjhlNetMgr.sendFreeSpin();
                }
            });
            this.mjhl_EventRepository.onFreeGamePanelShow.Notify();
        }
    }

    private async onFreeGameSettle(freeGameSettleParameter: FreeGameSettleParameter) {
        const totalWin = freeGameSettleParameter.totalWin;
        if (totalWin != null) {
            const freeGameSettlePanel = await new mjhl_FreeGameSettlePanel().init({
                parent: this.node,
                mjhl_UIFactory: this.mjhl_UIFactory,
                totalWin: totalWin,
                onButtonClickedCallback: () => {
                    this.mjhl_EventRepository.onReceiveFreeGameRewardClicked.Notify();
                    this.mjhl_EventRepository.onBaseGame.Notify();
                    this.mjhl_EventRepository.onMultiple.Notify({
                        multiple: 1,
                        isFreeGame: false,
                        isMute: false
                    });
                },
                mjhl_EventRepository: this.mjhl_EventRepository
            });
        }
    }
}