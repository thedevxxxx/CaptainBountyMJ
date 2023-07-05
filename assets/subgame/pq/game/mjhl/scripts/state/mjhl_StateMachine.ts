
export default class mjhl_StateMachine<State extends string | number> {

    private state: State;

    private beginByState: Map<State, Function>;

    private endByState: Map<State, Function>;

    constructor(beginByState: Map<State, Function>, endByState?: Map<State, Function>) {
        this.beginByState = beginByState;
        this.endByState = endByState;
    }

    public addBeginState(state: State, method: Function) {
        this.beginByState.set(state, method);
    }

    public async setState<T>(state: State, t?: T) {
        this.endByState?.get(this.state)?.(t);
        this.state = state;
        await this.beginByState.get(state)?.(t);
    }

    public isState(state: State) {
        return this.state === state
    }
}
