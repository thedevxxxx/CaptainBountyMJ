import mjhl_Symbol, { FallParameter, FlipParamter, SpinParameter, SymbolState } from "../symbol/mjhl_Symbol";
import { ReelResult, SymbolName, SymbolResult } from "../../type/mjhl_Types";
import { Node, SpriteFrame } from "cc";
import mjhl_SymbolGuider from "../symbol/mjhl_SymbolGuider";
import { isScatter } from "../../predictor/mjhl_Predictor";
import mjhl_EventRepository from "../../../../../script/event/pq_EventRepository";
import mjhl_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class mjhl_Reel {

    private mjhl_EventRepository: mjhl_EventRepository;

    private readonly symbolCountPerReel: number = 9

    private reelIndex: number;

    private symbols: Array<mjhl_Symbol>;

    private symbolResults: Array<SymbolResult>;

    public constructor() {

    }

    public async init(reelParameter: ReelParameter) {
        const parent = reelParameter.parent;
        const reelIndex = reelParameter.reelIndex;
        const spriteFrameByName = reelParameter.spriteFrameByName;
        const mjhl_SymbolGuider = reelParameter.mjhl_SymbolGuider;
        const mjhl_UIFactory = reelParameter.mjhl_UIFactory;
        const mjhl_EventRepository = reelParameter.mjhl_EventRepository;

        this.mjhl_EventRepository = mjhl_EventRepository;

        this.reelIndex = reelIndex;
        const node = mjhl_UIFactory.createNode({
            parent: parent,
            name: "mjhl_Reel"
        });
        this.symbols = new Array<mjhl_Symbol>();
        for (let index = 0; index < this.symbolCountPerReel; index++) {
            const symbol = await new mjhl_Symbol().init({
                parent: node,
                reelIndex: reelIndex,
                mjhl_SymbolGuider: mjhl_SymbolGuider,
                mjhl_UIFactory: mjhl_UIFactory,
                spriteFrameByName: spriteFrameByName,
                mjhl_EventRepository: mjhl_EventRepository
            });
            this.symbols.push(symbol);
            symbol.setPositionByIndex(index);
        }

        const baseIndex = 2;
        const spacingX = 140;
        const positionX = ((baseIndex - reelIndex) * spacingX) * -1;

        node.setPosition(positionX, node.y);

        return this;
    }

    public destroy() {
        try {
            this.symbols.forEach(symbol => symbol.destroy());
            this.symbols.length = 0;
            this.symbols = null;
        } catch (error) {
            console.log(`[mjhl_Reel] ${error}`);
        }
    }

    public async spin(step: number, reelResult: ReelResult, delay: number, speed: number) {
        this.orderSymbolsBySymbolSiblingIndex();
        this.setSymbolsSiblingIndexByCurrentOrder();
        const symbols = this.symbols;
        const spinPromises = new Array<Promise<void>>();
        const symbolResults = reelResult.symbolResults
        this.symbolResults = symbolResults;
        for (let index = 0; index < symbols.length; index++) {
            const symbol = symbols[index];
            const symbolResult = symbolResults[index];
            const isEffectSpin = (step > 27);
            const isFirstEffectReel = (step === 81);
            const spinPromise = symbol.symbolStateMachine.setState<SpinParameter>(SymbolState.Spin, {
                step: step,
                symbolName: symbolResult.symbolName,
                isCombination: symbolResult.isCombinable,
                delay: delay,
                speed: speed,
                isEffectSpin: isEffectSpin,
                isFirstEffectReel: isFirstEffectReel
            });
            spinPromises.push(spinPromise);
        }
        await Promise.all(spinPromises);
        this.mjhl_EventRepository.onReelSpinFinished.Notify(reelResult);
        this.orderSymbolsBySymbolSiblingIndex();//??
        this.setSymbolsSiblingIndexByCurrentOrder();

        const scatterIndexes = symbolResults.slice(4, 8).filter(symbol => symbol.symbolName === SymbolName.Scatter).map(symbolResult => symbolResults.indexOf(symbolResult));
        this.effect(scatterIndexes);
    }

    public async effect(indexes: Array<number>) {
        indexes.forEach(index => {
            if (index > 3 && index < 8) {
                this.symbols[index].symbolStateMachine.setState<number>(SymbolState.Effect);
            }
        });
    }

    public async combineSymbols(combinationIndexes: Array<number>, delay: number) {
        const combinePromises = new Array<Promise<void>>();
        for (let index = 0; index < this.symbols.length; index++) {
            const symbol = this.symbols[index];
            if (combinationIndexes.indexOf(index) !== -1) {
                const combinePromise = symbol.symbolStateMachine.setState<number>(SymbolState.Combination, delay);
                combinePromises.push(combinePromise);
            } else {
                symbol.addGray();
            }
        }
        await Promise.all(combinePromises);
    }

    public async flipSymbols(symbolIndexes: Array<number>, symbolNamesAfterFlip: Array<SymbolName>, delay: number) {
        const flipPromises = new Array<Promise<void>>();//-1 -2 -3 -4
        const endIndexes = [//??
            null,
            [-4],
            [-3, -4],
            [-2, -3, -4],
            [-1, -2, -3, -4]
        ];

        for (let index = 0; index < symbolIndexes.length; index++) {
            const symbolIndex = symbolIndexes[index];
            const symbol = this.symbols[symbolIndex];
            const symbolNameAfterFlip = (symbol.isGoldenMahjong()) ? null : symbolNamesAfterFlip.shift();
            const flipPromise = symbol.symbolStateMachine.setState<FlipParamter>(SymbolState.Flip, { endIndex: endIndexes[symbolIndexes.length][index], symbolNameAfterFlip: symbolNameAfterFlip });
            flipPromises.push(flipPromise);
        }
        await Promise.all(flipPromises);
        // this.orderSymbolsBySymbolSiblingIndex();
        // this.setSymbolsSiblingIndexByCurrentOrder();
        //const flipPromises = new Array<Promise<void>>();
        //for (let index = 0; index < symbolIndexes.length; index++) {
        //    const symbolIndex = symbolIndexes[index];
        //    const flipPromise = this.symbols[symbolIndex].symbolStateMachine.setState<FlipParamter>(SymbolState.Flip, { endIndex: (index - 4), symbolNameAfterFlip: symbolNamesAfterFlip[index] });
        //    flipPromises.push(flipPromise);
        //}
        //await Promise.all(flipPromises);

    }

    public async shakeSymbols(floatingIndexes: Array<number>) {
        const shakePromises = new Array<Promise<void>>();
        for (let index = 0; index < floatingIndexes.length; index++) {
            const symbol = this.symbols[floatingIndexes[index]];
            const shakePromise = symbol.symbolStateMachine.setState(SymbolState.Shake);
            shakePromises.push(shakePromise);
        };
        await Promise.all(shakePromises);
    }

    public async fallSymbols(eliminableIndexes: Array<number>, floatingIndexes: Array<number>, endIndexes: Array<number>, baseDelay: number) {
        let hasScatterFall = false;
        let delayIndex = 0;
        const getDelay = () => {
            const delay = baseDelay * delayIndex;
            delayIndex++;
            return delay;
        };
        const fallPromises = new Array<Promise<void>>();
        for (let index = 0; index < floatingIndexes.length; index++) {
            const delay = getDelay();
            const symbol = this.symbols[floatingIndexes[index]];
            const endIndex = endIndexes[index];
            //console.error(`${symbol.currentColumnIndex} → ${endIndexes[index]}`);
            const fallPromise = symbol.symbolStateMachine.setState<FallParameter>(SymbolState.Fall, { delay: delay, endIndex: endIndex });
            fallPromises.push(fallPromise);
            if (symbol.symbolName === SymbolName.Scatter && symbol.currentColumnIndex < 4 && endIndex >= 4) {
                hasScatterFall = true;
            }
        }
        const eliminableEndIndexes = [//??
            null,
            [0],
            [1, 0],
            [2, 1, 0],
            [3, 2, 1, 0]
        ];
        for (let index = 0; index < eliminableIndexes.length; index++) {//??
            const delay = getDelay();
            const symbol = this.symbols[eliminableIndexes[index]];
            //console.error(`${symbol.currentColumnIndex} → ${eliminableEndIndexes[eliminableIndexes.length][index]}`);
            const fallPromise = symbol.symbolStateMachine.setState<FallParameter>(SymbolState.Fall, { delay: delay, endIndex: eliminableEndIndexes[eliminableIndexes.length][index] });
            fallPromises.push(fallPromise);
        }
        //for (let index = 0; index < eliminableIndexes.length; index++) {//??
        //    const delay = getDelay();
        //    const symbol = this.symbols[eliminableIndexes[index]];
        //    const fallPromise = symbol.symbolStateMachine.setState<FallParameter>(SymbolState.Fall, { delay: delay, endIndex: index });
        //    fallPromises.push(fallPromise);
        //}
        //this.orderSymbolsBySymbolSiblingIndex();
        //this.setSymbolsSiblingIndexByCurrentOrder();
        await Promise.all(fallPromises);
        this.orderSymbolsBySymbolSiblingIndex();
        this.setSymbolsSiblingIndexByCurrentOrder();
        if (hasScatterFall) {
            this.mjhl_EventRepository.onScatterFall.Notify();
        }
    }


    public resetSymbols() {
        for (let index = 0; index < this.symbolCountPerReel; index++) {
            const symbol = this.symbols[index]
            symbol.symbolStateMachine.setState(SymbolState.Reset);
        }
    }

    public setSymbolNameAndSkin(symbolIndex: number, symbolName: SymbolName) {
        const symbol = this.symbols[symbolIndex];
        symbol.setSymbolName(symbolName);
        symbol.symbolStateMachine.setState(SymbolState.Idle);
    }

    public addGrayToAllSymbolsExceptCombinableScatters() {
        this.symbols.forEach(symbol => {
            if (isScatter(symbol.symbolName)) {
                const isCombinable = (symbol.currentColumnIndex >= 4 && symbol.currentColumnIndex <= 7);
                if (!isCombinable) {
                    symbol.addGray();
                }
            } else {
                symbol.addGray();
            }
        });
    }

    public resetAllSymbolsColor() {
        this.symbols.forEach(symbol => {
            symbol.resetColor();
        });
    }

    public hasCombinationScatters() {
        return this.symbolResults.slice(4, 8).some(symbolResult => isScatter(symbolResult.symbolName));
    }

    private orderSymbolsBySymbolSiblingIndex() {
        this.symbols = this.symbols.sort((a, b) => a.currentColumnIndex > b.currentColumnIndex ? 1 : -1);
    }

    private setSymbolsSiblingIndexByCurrentOrder() {
        for (let index = 0; index < this.symbols.length; index++) {
            const symbol = this.symbols[index];
            symbol.setSiblingIndex(index);
        }
    }
}

export interface ReelParameter {

    parent: Node;

    reelIndex: number;

    spriteFrameByName: Map<string, SpriteFrame>;

    mjhl_SymbolGuider: mjhl_SymbolGuider;

    mjhl_UIFactory: mjhl_UIFactory;

    mjhl_EventRepository: mjhl_EventRepository;
}