import { CommonEventManage } from "../../event/CommonEventManage";
import pq_EventRepository, { FreeGameParameter } from "../../event/pq_EventRepository";
import pq_HttpNetwork from "../../network/pq_HttpNetwork";
import { PQItem } from "./ModelBase";

export class NetManagerBase implements INetManager {
    protected httpNetwork: pq_HttpNetwork;
    protected receiver: IReceiver;
    protected sender: ISender;
    protected _model: IModel;
    private gameCode: string = '';

    constructor(gameCode: string) {
        this.gameCode = gameCode;
    }

    init(receiver: IReceiver, sender: ISender, model: IModel, evRepo: CommonEventManage): void {
        this.httpNetwork = pq_HttpNetwork.getInstance();
        this.httpNetwork.setRefer(model, pq_EventRepository.getInstance());
        this.receiver = receiver;
        this.sender = sender;
        this._model = model;

        this.receiver.init(this.sender, this._model, evRepo);
        this.sender.init(this._model, this.gameCode);
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
        console.log('-----------------在免费游戏-----------------')
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

export interface INetManager {
    destroy():void;
    init(receiver: IReceiver, sender: ISender, model: IModel, evRepo: CommonEventManage): void;
    sendSpin(): Promise<void>;
    sendAutoSpin(): Promise<void>;
    sendFreeSpin(): Promise<void>;
    onFreeGame(param: FreeGameParameter): Promise<void>;
}

export interface IReceiver {
    destroy():void;
    init(sender: ISender, model: IModel, eveRepo: CommonEventManage):void;
}

export interface ISender {
    destroy():void;
    startSpinOnce(sec: number): Promise<void>;
    onPoorNetwork(count: number): Promise<void>;
    onFreeGame(param: FreeGameParameter): Promise<void>;
    startRefreshToken(): void;
    init(model: IModel, gamecode: string): void;
}

export interface IModel {
    readonly userId: number;
    readonly password: string;
    readonly token: string;
    readonly gameId: string;
    readonly serverUrl: string

    betAmount: number;
    betAmounts: number[];
    betMutiple: number;
    baseBet: number;
    totalBetAmount: number;
    isTurboOn: boolean;
    pqToken: string;
    freeGameCount: number;
    freeGameTotalWin: number;
    isAutoSpin: boolean;
    isFreeGame: boolean;
    isFreeGamePanelDisplaying: boolean;
    pqItem: PQItem;

    setPQToken(pqToken: string): void;
    setPQBalance(pqBalance: number): void;
}

export const enum NetEventType {
    ON_SPINE_RESP = 'onspineresp',
    ON_ENTER_GAME = 'onentergame',
    ON_FREE_GAME = 'onfreegame',
    ON_CONNECT_RETRY = 'onconnentretry',
    ON_CONNECT_FAIL = 'onconnectfail',
    ON_POINT_ENOUGH = 'onpointenough',
    ON_OTHER_FAIL = 'onotherfail',
}