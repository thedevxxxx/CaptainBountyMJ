import { FreeGameParameter } from "../event/pq_EventRepository";
import pq_HttpNetwork from "../network/pq_HttpNetwork";

export class NetManagerBase {
    protected httpNetwork: pq_HttpNetwork;
    protected receiver: IReceiver;
    protected sender: ISender;
    private gameCode: string = '';

    constructor(gameCode: string) {
        this.gameCode = gameCode;
    }

    init(receiver: IReceiver, sender: ISender): void {
        this.httpNetwork = pq_HttpNetwork.getInstance();
        this.receiver = receiver;
        this.sender = sender;

        this.receiver.setSender(this.sender);
        this.sender.setGameCode(this.gameCode);
    }

    async sendSpin(): Promise<void> {
        console.log('-----------------普通旋转-----------------')
        await this.sender.startSpinOnce(0);
    }

    async sendAutoSpin(): Promise<void> {
        console.log('-----------------自动旋转-----------------')
        await this.sender.startSpinOnce(0);
    }

    async sendFreeSpin(): Promise<void> {
        console.log('-----------------免费旋转-----------------')
        await this.sender.startSpinOnce(3000);
    }

    async onFreeGame(param: FreeGameParameter): Promise<void> {
        if (param.isFirstFreeGame) {
            console.log(`[Sender] isFirstFreeGame`);
            return;
        }
        await this.sender.startSpinOnce(1000);
    }

    destroy(): void {
        this.sender?.destroy();
        this.receiver?.destroy();
    }
}

export interface IReceiver {
    destroy():void;
    setSender(sender: ISender):void;
}

export interface ISender {
    destroy():void;
    startSpinOnce(sec: number): Promise<void>;
    onPoorNetwork(count: number): Promise<void>;
    onFreeGame(param: FreeGameParameter): Promise<void>;
    setGameCode(code: string): void;
    startRefreshToken(): void;
}