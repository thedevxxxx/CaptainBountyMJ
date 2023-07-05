import mahjongWays2_StateMachine from "../../state/mahjongWays2_StateMachine";
import mahjongWays2_EventRepository from "../../../../../script/event/pq_EventRepository";

export default class mahjongWays2_GameState {

    public gameStateMachine: mahjongWays2_StateMachine<GameState>;

    public constructor(mahjongWays2_EventRepository: mahjongWays2_EventRepository) {

        this.gameStateMachine = new mahjongWays2_StateMachine(new Map([
            [GameState.Idle, () => { }],
            [GameState.Playing, () => { }]
        ]), new Map([
            [GameState.Idle, () => { }],
            [GameState.Playing, () => { }]
        ]));

        mahjongWays2_EventRepository.onResultFinished.Attach(resultFinishedParameter => {
            this.gameStateMachine.setState(GameState.Idle);
        });

        mahjongWays2_EventRepository.onSpinButtonClicked.Attach(() => {
            this.gameStateMachine.setState(GameState.Playing);
        });

        mahjongWays2_EventRepository.onAutoSpinOnce.Attach(() => {
            this.gameStateMachine.setState(GameState.Playing);
        });

        mahjongWays2_EventRepository.onFreeGame.Attach(() => {
            this.gameStateMachine.setState(GameState.Playing);
        });

        this.gameStateMachine.setState(GameState.Idle);
    }

    public destroy() {

    }
}

export enum GameState {

    Idle,

    Playing
}