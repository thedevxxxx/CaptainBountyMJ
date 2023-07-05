import pqui_EventRepository from "../../../script/event/pq_EventRepository";

export default class pqui_DataRepository {

    public betAmount: number;

    public betMutiple: number;

    public baseBetAmount: number;

    public totalBetAmount: number;

    public totalBets: Array<number>;

    public betAmounts: Array<number>;

    public betMutiples: Array<number>;

    public balance: number;

    public winMoney: number;

    public autoSpinCount: number;

    public constructor(pqui_EventRepository: pqui_EventRepository) {
        this.betAmount = 0.01;
        this.betMutiple = 9;
        this.baseBetAmount = 20;
        this.totalBetAmount = 1.8;
        this.totalBets = [0.2, 0.4, 0.6, 1, 1.8, 2, 3, 6, 10, 20, 100, 200, 500, 1000];
        this.betAmounts = [0.01, 0.03, 0.1, 1, 5];
        this.betMutiples = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.balance = 0;
        this.winMoney = 0;

        pqui_EventRepository.onBetAmountChangedUI.Attach((betAmount) => this.betAmount = betAmount);
        pqui_EventRepository.onBetMutipleChangedUI.Attach((betMutiple) => this.betMutiple = betMutiple);
        pqui_EventRepository.onTotalBetAmountChangedUI.Attach((totalBetAmount) => this.totalBetAmount = totalBetAmount);
        pqui_EventRepository.onBalanceChangedUI.Attach((balance) => this.balance = balance);
        pqui_EventRepository.onAutoSpin.Attach((autoSpinCount) => this.autoSpinCount = autoSpinCount);
    }

    public destroy() {

    }
}