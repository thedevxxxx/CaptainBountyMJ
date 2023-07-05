import mahjongWays_StateMachine from "../../state/mahjongWays_StateMachine";
import mahjongWays_EventRepository from "../../../../../script/event/pq_EventRepository";

export default class mahjongWays_GameState {

    public gameStateMachine: mahjongWays_StateMachine<GameState>;

    public constructor(mahjongWays_EventRepository: mahjongWays_EventRepository) {

        this.gameStateMachine = new mahjongWays_StateMachine(new Map([
            [GameState.Idle, () => { }],
            [GameState.Playing, () => { }]
        ]), new Map([
            [GameState.Idle, () => { }],
            [GameState.Playing, () => { }]
        ]));

        mahjongWays_EventRepository.onResultFinished.Attach(resultFinishedParameter => {
            this.gameStateMachine.setState(GameState.Idle);
        });

        mahjongWays_EventRepository.onSpinButtonClicked.Attach(() => {
            this.gameStateMachine.setState(GameState.Playing);
        });

        mahjongWays_EventRepository.onAutoSpinOnce.Attach(() => {
            this.gameStateMachine.setState(GameState.Playing);
        });

        mahjongWays_EventRepository.onFreeGame.Attach(() => {
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