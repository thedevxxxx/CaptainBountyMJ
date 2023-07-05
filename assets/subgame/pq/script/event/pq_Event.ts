
export default class pq_Event<T, TResult> {

    private observers: Array<((t: T) => TResult)> = [];

    public Attach(observer: ((t: T) => TResult)) {
        this.observers.push(observer);
    }

    public Detach(observer: ((t: T) => TResult)) {
        const index = this.observers.indexOf(observer, 0);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    public Notify(data: T): TResult {
        let result;
        this.observers.forEach(observer => {
            result = observer(data);
        });
        return result;
    }

    public Reset():void{
        this.observers = [];
    }
}