import mjhl_StateMachine from "../../state/mjhl_StateMachine";
import mjhl_EventRepository from "../../../../../script/event/pq_EventRepository";

export default class mjhl_GameState {

    public gameStateMachine: mjhl_StateMachine<GameState>;

    public constructor(mjhl_EventRepository: mjhl_EventRepository) {

        this.gameStateMachine = new mjhl_StateMachine(new Map([
            [GameState.Idle, () => { }],
            [GameState.Playing, () => { }]
        ]), new Map([
            [GameState.Idle, () => { }],
            [GameState.Playing, () => { }]
        ]));

        mjhl_EventRepository.onResultFinished.Attach(resultFinishedParameter => {
            this.gameStateMachine.setState(GameState.Idle);
        });

        mjhl_EventRepository.onSpinButtonClicked.Attach(() => {
            this.gameStateMachine.setState(GameState.Playing);
        });

        mjhl_EventRepository.onAutoSpinOnce.Attach(() => {
            this.gameStateMachine.setState(GameState.Playing);
        });

        mjhl_EventRepository.onFreeGame.Attach(() => {
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