import { KeyCode, Node, SpriteFrame } from "cc";
import { delay } from "../../timer/mahjongWays_Timer";
import { EliminableSymbolNames, GoldenSymbolNames, Lottery, ReelResult, RoundResult, SymbolName, SymbolResult } from "../../type/mahjongWays_Types";
// import mahjongWays_Reel from "./mahjongWays_Reel";
import mahjongWays_SymbolGuider from "../symbol/mahjongWays_SymbolGuider";
import mahjongWays_GameState from "../gamestate/mahjongWays_GameState";
import mahjongWays_DataRepository from "../../data/mahjongWays_DataRepository";
// import mahjongWays_WinEffect from "../effect/mahjongWays_WinEffect";
// import mahjongWays_FreeGameTitle from "../freegame/mahjongWays_FreeGameTitle";
import ReelEffect from "./ReelEffect";
import mahjongWays_EventRepository from "../../../../../script/event/pq_EventRepository";
import mahjongWays_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { mjhlNetMgr } from "../../network/mahjongWays_NetManager";

export default class mahjongWays_ReelRepository {

    private mahjongWays_EventRepository: mahjongWays_EventRepository;

    private mahjongWays_UIFactory: mahjongWays_UIFactory;

    private mahjongWays_DataRepository: mahjongWays_DataRepository;

    private mahjongWays_SymbolGuider: mahjongWays_SymbolGuider;

    private readonly reelCount: number;

    // private reels: Array<mahjongWays_Reel>;

    private parent: Node;

    private isFreeGame: boolean;

    private reelEffect: ReelEffect;

    public constructor() {
        this.reelCount = 5;
    }


    public async init(parent: Node, mahjongWays_UIFactory: mahjongWays_UIFactory, mahjongWays_EventRepository: mahjongWays_EventRepository, mahjongWays_GameState: mahjongWays_GameState, mahjongWays_DataRepository: mahjongWays_DataRepository) {
        this.mahjongWays_EventRepository = mahjongWays_EventRepository
        this.mahjongWays_DataRepository = mahjongWays_DataRepository
        this.mahjongWays_UIFactory = mahjongWays_UIFactory
        this.parent = parent;


        const canvasArea = parent;
        this.mahjongWays_SymbolGuider = new mahjongWays_SymbolGuider(canvasArea, mahjongWays_UIFactory, mahjongWays_GameState, mahjongWays_EventRepository, mahjongWays_DataRepository);

        await this.initReels(canvasArea, this.mahjongWays_SymbolGuider, mahjongWays_UIFactory);

        this.setDefaultRoundResult(this.getDefaultReelSymbolNames());

        mahjongWays_EventRepository.onResult.Attach(this.onResult);
        mahjongWays_EventRepository.onDefaultRoundResult.Attach(this.setDefaultRoundResult);
        // mahjongWays_EventRepository.onSpinFinished.Attach(() => this.resetAllSymbolsColor());
        // mahjongWays_EventRepository.onFlip.Attach(() => this.resetAllSymbolsColor());
        mahjongWays_EventRepository.onEffectSpinStarted.Attach(reelIndex => {
            this.playReelEffectByReelIndex(reelIndex);
        });
        mahjongWays_EventRepository.onEffectSpinFinished.Attach(reelIndex => {
            // const hasCombinationScatters = this.reels[reelIndex].hasCombinationScatters();
            // if (!hasCombinationScatters) {
            //     mahjongWays_EventRepository.onEffectSpinNoScatters.Notify();
            // }
            // this.reelEffect.stopEffects();
            // if (reelIndex < 4) {
            //     const nextReelIndex = reelIndex + 1;
            //     this.playReelEffectByReelIndex(nextReelIndex);
            // }
        });

        return this;
    }

    public destroy() {
        try {
            // this.reelEffect.destroy();
            // this.reelEffect = null;
            // this.reels.forEach(reel => reel.destroy());
            // this.reels.length = 0;
            // this.reels = null;
            this.mahjongWays_EventRepository.onResult.Detach(this.onResult);
            this.mahjongWays_EventRepository.onDefaultRoundResult.Detach(this.setDefaultRoundResult);
        } catch (error) {
            console.log(`[mahjongWays_ReelRepository] ${error}`);
        }
    }

    private async initReels(parent: Node, mahjongWays_SymbolGuider: mahjongWays_SymbolGuider, mahjongWays_UIFactory: mahjongWays_UIFactory) {
        const spriteFrameByName = new Map<string, SpriteFrame>();
        spriteFrameByName.set("mahjongWays_baida_blur", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_baida_blur/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_baida", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_baida/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_yuanbao_s_blur", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_yuanbao_s_blur/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_yuanbao", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_yuanbao/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_hu_blur", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_hu_blur/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_hu", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_hu/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_blank_gold", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_blank_gold/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_blank_gold_s_blur", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_blank_gold_s_blur/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_blank", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_blank/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_blank_s_blur", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_blank_s_blur/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_greenFa", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_greenFa/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_redMid", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_redMid/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_whiteBoard", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_whiteBoard/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_8characters", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_8characters/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_5dots", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_5dots/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_5bamboos", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_5bamboos/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_2bamboos", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_2bamboos/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_3dots", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_3dots/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_2dots", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_2dots/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_greenFa_blur", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_greenFa_blur/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_redMid_blur", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_redMid_blur/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_whiteBoard_blur", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_whiteBoard_blur/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_8characters_blur", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_8characters_blur/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_5dots_blur", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_5dots_blur/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_5bamboos_blur", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_5bamboos_blur/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_2bamboos_blur", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_2bamboos_blur/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_3dots_blur", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_3dots_blur/spriteFrame`, SpriteFrame));
        spriteFrameByName.set("mahjongWays_2dots_blur", await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(`mahjong-ways/images/symbols/mahjongWays_2dots_blur/spriteFrame`, SpriteFrame));

        // this.reels = new Array<mahjongWays_Reel>();
        // const reelCount = this.reelCount
        // for (let index = 0; index < reelCount; index++) {
        //     const reel = await new mahjongWays_Reel().init({
        //         parent: parent,
        //         reelIndex: index,
        //         mahjongWays_SymbolGuider: mahjongWays_SymbolGuider,
        //         mahjongWays_UIFactory: mahjongWays_UIFactory,
        //         spriteFrameByName: spriteFrameByName,
        //         mahjongWays_EventRepository: this.mahjongWays_EventRepository,
        //     });
        //     this.reels.push(reel);
        // }

        // const reelEffect = await new ReelEffect().init({
        //     parent: parent,
        //     mahjongWays_UIFactory: mahjongWays_UIFactory,
        // });
        // this.reelEffect = reelEffect;
    }

    // private resetAllSymbolsColor() {
    //     this.reels.forEach(reel => reel.resetAllSymbolsColor());
    // }

    private setDefaultRoundResult = (defaultRoundResult: Array<Array<SymbolName>>) => {
        for (let reelIndex = 0; reelIndex < defaultRoundResult.length; reelIndex++) {
            const symbolNames = defaultRoundResult[reelIndex];
            for (let symbolIndex = 0; symbolIndex < symbolNames.length; symbolIndex++) {
                const symbolName = symbolNames[symbolIndex];
                // this.reels[reelIndex].setSymbolNameAndSkin(symbolIndex, symbolName);
            }
        }
    }

    private onResult = async (lottery: Lottery) => {
        if (lottery == null) {
            console.log(`[mahjongWays_ReelRepository] lottery null`);
            return;
        }
        this.mahjongWays_SymbolGuider.hideInfo();
        const roundResults = lottery.roundResults;
        const roundCount = roundResults.length;
        const finalRoundResult = roundResults[roundCount - 1];
        const multiples = lottery.multiplies.slice();
        const wins = lottery.wins;
        const accumulatedWins = lottery.accumulatedWins;
        const balances = lottery.balances;
        const isFirstFreeGame = lottery.isFirstFreeGame;
        const freeGameTotalWin = lottery.freeGameTotalWin;
        const winMultiple = lottery.totalWinMultiple;
        const totalWin = lottery.totalWin;
        const totalWinMultiple = lottery.totalWinMultiple;
        const betAmount = lottery.betAmount;
        const isFreeGame = lottery.isFreeGame;
        const extraFreeCount = lottery.extraFreeCount;
        const freeGames = lottery.freeGames;

        this.isFreeGame = isFreeGame;

        console.log("[mahjongWays_ReelRepository]" +
            "\nbalances", balances,
            "\naccumulatedWins", accumulatedWins,
            "\nmultiples", multiples,
            "\nisFirstFreeGame", isFirstFreeGame,
            "\nfreeGames", freeGames,
            "\nfreeGameTotalWin", freeGameTotalWin,
            "\ntotalWin", totalWin,
            "\ntotalWinMultiple", totalWinMultiple,
            "\nextraFreeCount", extraFreeCount,
        );

        if (isFreeGame) {
            this.mahjongWays_EventRepository.onFreeGameCount.Notify({
                freeGameCount: freeGames,
                isFirstFreeGame: isFirstFreeGame
            });
        }

        let accumulatedWinMultiple = 0;
        for (let roundIndex = 0; roundIndex < roundResults.length; roundIndex++) {
            const roundResult = roundResults[roundIndex];
            const reelResults = roundResult.reelResults;
            const nextReelResults = roundResults[roundIndex + 1]?.reelResults;
            const isFirstRound = (roundIndex === 0);
            const hasCombination = reelResults.some(reelResult => reelResult.symbolResults.some(symboleResult => symboleResult.isCombinable));
            if (isFirstRound) {
                this.mahjongWays_EventRepository.onMultiple.Notify({
                    multiple: multiples.shift(),
                    isFreeGame: (isFirstFreeGame) ? false : isFreeGame,
                    isMute: false
                });
                this.mahjongWays_EventRepository.onBalanceChanged.Notify(balances.shift());
                await this.spin(reelResults);
                if (!isFreeGame) {
                    this.mahjongWays_EventRepository.onWinMoney.Notify({ winMoney: 0 });
                }
                this.mahjongWays_EventRepository.onSpinFinished.Notify();
            }
            if (hasCombination) {
                await this.combine(reelResults);
                this.mahjongWays_EventRepository.onBalanceChanged.Notify(balances.shift());
                const accumulatedWin = accumulatedWins.shift();
                const win = wins.shift();
                const accumulatedWinMoney = (isFreeGame) ? freeGameTotalWin : accumulatedWin;
                accumulatedWinMultiple = (accumulatedWin / betAmount);
                this.mahjongWays_EventRepository.onAccumulatedWinMoney.Notify(accumulatedWinMoney);
                this.mahjongWays_EventRepository.onWinMoney.Notify({ winMoney: win, accumulatedWinMutiple: accumulatedWinMultiple });
                this.mahjongWays_EventRepository.onMultiple.Notify({
                    multiple: multiples.shift(),
                    isFreeGame: (isFirstFreeGame) ? false : isFreeGame,
                    isMute: false
                });
                await this.flip(reelResults, nextReelResults);
                await this.shake(reelResults);
                await this.fall(reelResults);
            } else {
                console.log(`[mahjongWays_ReelRepository] no combination`);
            }
        }

        const bigWin = lottery.bigWins.bigWin;
        const megaWin = lottery.bigWins.megaWin;
        const superWin = lottery.bigWins.superWin;
        const isGreaterThanQuintuple = (winMultiple >= 5);
        const shouldWinEffect = (winMultiple >= 20);
        const isBigWin = (winMultiple >= 20 && winMultiple < 35);
        const isMegaWin = (winMultiple >= 35 && winMultiple < 50);
        const isSuperWin = (winMultiple >= 50);

        if (shouldWinEffect) {
            // this.mahjongWays_EventRepository.onWinEffectTweenToNumberStarted.Notify();
            // const winEffect = await new mahjongWays_WinEffect().init({
            //     parent: this.parent,
            //     mahjongWays_UIFactory: this.mahjongWays_UIFactory,
            //     mahjongWays_EventRepository: this.mahjongWays_EventRepository
            // });
            // if (isBigWin) {
            //     winEffect.bigWin();
            //     await winEffect.tweenToNumber(0, totalWin, 7.2);
            // }
            // if (isMegaWin) {
            //     winEffect.bigWin();
            //     await winEffect.tweenToNumber(0, megaWin, 7.2);
            //     winEffect.megaWin();
            //     await winEffect.tweenToNumber(megaWin, totalWin, 6.7);
            // }
            // if (isSuperWin) {
            //     winEffect.bigWin();
            //     await winEffect.tweenToNumber(0, megaWin, 7.2);
            //     winEffect.megaWin();
            //     await winEffect.tweenToNumber(megaWin, superWin, 6.7);
            //     winEffect.superWin();
            //     await winEffect.tweenToNumber(superWin, totalWin, 6.7);
            // }
            // this.mahjongWays_EventRepository.onWinEffectTweenToNumberFinished.Notify();
            // await delay(5000);
            // winEffect.destroy();
        }
        this.mahjongWays_EventRepository.onTotalWinMoney.Notify({ totalWinMoney: totalWin, accumulatedWinMutiple: accumulatedWinMultiple });

        const hasTotalWinEffect = (roundCount >= 2);
        if (hasTotalWinEffect) {
            await delay(1000);
            if (isGreaterThanQuintuple) {
                await delay(500);
            }
        }

        const finalReelResults = finalRoundResult.reelResults;
        const isWinFreeGame = this.getIsWinFreeGame(finalReelResults);
        if (isWinFreeGame) {
            this.mahjongWays_EventRepository.onWinFreeGame.Notify();
            const shouldShowFreeGameTitle = (extraFreeCount > 0 && !isFirstFreeGame);
            if (shouldShowFreeGameTitle) {
                // const freeGameTitle = new mahjongWays_FreeGameTitle({
                //     parent: this.parent,
                //     mahjongWays_UIFactory: this.mahjongWays_UIFactory,
                //     freeGameCount: extraFreeCount,
                //     lifeTimeSeconds: 3
                // });
                this.mahjongWays_EventRepository.onFreeGameCount.Notify({
                    freeGameCount: freeGames,
                    isFirstFreeGame: isFirstFreeGame
                });
                await delay(3000);
            }
        }

        if (freeGames > 0) {
            await delay(1000);
            const param = {
                freeGameCount: freeGames,
                isFirstFreeGame: isFirstFreeGame
            };

            this.mahjongWays_EventRepository.onFreeGame.Notify(param);
            mjhlNetMgr.onFreeGame(param);

            if (isFirstFreeGame) {
                this.mahjongWays_EventRepository.onFreeGameCount.Notify(param);
            }
        } else {
            if (isFreeGame) {
                await delay(2000);
                this.mahjongWays_EventRepository.onFreeGameSettle.Notify({ totalWin: lottery.freeGameTotalWin });//??
            }
        }
        this.mahjongWays_EventRepository.onResultFinished.Notify({ isFirstFreeGame: isFirstFreeGame });
    }

    private async spin(reelResults: Array<ReelResult>) {
        console.log(`[mahjongWays_ReelRepository] spin start`);
        console.log(reelResults);
        let baseDelay: number;
        let steps: Array<number>;
        let speed: number;
        const shouldTurboSping = this.getShouldTurbo();
        if (shouldTurboSping) {
            baseDelay = 0;
            steps = [9, 9, 9, 9, 9];
            speed = 5200;
        } else {
            baseDelay = 0.2
            steps = this.getStepsByReelReslts(reelResults);
            speed = 3200;
            console.log(`[mahjongWays_ReelRepository] steps:${steps}`);
        }
        const spinPromises = new Array<Promise<void>>();
        for (let reelResultIndex = 0; reelResultIndex < reelResults.length; reelResultIndex++) {
            const reelResult = reelResults[reelResultIndex];
            // const reel = this.reels[reelResultIndex];
            const delay = baseDelay * (reelResultIndex);
            // const spinPromise = reel.spin(steps[reelResultIndex], reelResult, delay, speed);
            // spinPromises.push(spinPromise);
        }
        this.mahjongWays_EventRepository.onAllReelSpinStarted.Notify();
        await Promise.all(spinPromises);
        this.mahjongWays_EventRepository.onAllReelSpinFinished.Notify(reelResults);
        console.log(`[mahjongWays_ReelRepository] spin end`);
    }

    private getStepsByReelReslts(reelResults: Array<ReelResult>): Array<number> {
        const combinableSymbolsByReelIndex = reelResults.map(reelResult => reelResult.symbolResults.slice(4, 8));
        const scatterCountByReelIndex = combinableSymbolsByReelIndex.map(symbolResult => symbolResult.filter(symbol => symbol.symbolName === SymbolName.Scatter).length);
        const steps = [27, (9 * 9), (9 * 18), (9 * 30), (9 * 40)];
        if (scatterCountByReelIndex[0] > 1) {
            return [steps[0], steps[1], steps[2], steps[3], steps[4]];
        }
        //
        if (scatterCountByReelIndex[0] === 1 && scatterCountByReelIndex[1] >= 1) {
            return [steps[0], steps[0], steps[1], steps[2], steps[3]]
        }
        if (scatterCountByReelIndex[0] === 0 && scatterCountByReelIndex[1] > 1) {
            return [steps[0], steps[0], steps[1], steps[2], steps[3]]
        }
        //
        if (scatterCountByReelIndex[0] === 1 && scatterCountByReelIndex[1] === 0 && scatterCountByReelIndex[2] >= 1) {
            return [steps[0], steps[0], steps[0], steps[1], steps[2]]
        }
        if (scatterCountByReelIndex[0] === 0 && scatterCountByReelIndex[1] === 1 && scatterCountByReelIndex[2] >= 1) {
            return [steps[0], steps[0], steps[0], steps[1], steps[2]]
        }
        if (scatterCountByReelIndex[0] === 0 && scatterCountByReelIndex[1] === 0 && scatterCountByReelIndex[2] > 1) {
            return [steps[0], steps[0], steps[0], steps[1], steps[2]]
        }
        //
        if (scatterCountByReelIndex[0] === 1 && scatterCountByReelIndex[1] === 0 && scatterCountByReelIndex[2] === 0 && scatterCountByReelIndex[3] >= 1) {
            return [steps[0], steps[0], steps[0], steps[0], steps[1]]
        }
        if (scatterCountByReelIndex[0] === 0 && scatterCountByReelIndex[1] === 1 && scatterCountByReelIndex[2] === 0 && scatterCountByReelIndex[3] >= 1) {
            return [steps[0], steps[0], steps[0], steps[0], steps[1]]
        }
        if (scatterCountByReelIndex[0] === 0 && scatterCountByReelIndex[1] === 0 && scatterCountByReelIndex[2] === 1 && scatterCountByReelIndex[3] >= 1) {
            return [steps[0], steps[0], steps[0], steps[0], steps[1]]
        }
        if (scatterCountByReelIndex[3] > 1) {
            return [steps[0], steps[0], steps[0], steps[0], steps[1]]
        }

        return [steps[0], steps[0], steps[0], steps[0], steps[0]]
    }

    private setCurrentSkin(reelResults: Array<ReelResult>) {
        for (let reelResultIndex = 0; reelResultIndex < reelResults.length; reelResultIndex++) {
            const reelResult = reelResults[reelResultIndex];
            // const reel = this.reels[reelResultIndex];

            const symbolResults = reelResult.symbolResults;
            for (let index = 0; index < symbolResults.length; index++) {
                const symbolResult = symbolResults[index];
                // reel.setSymbolNameAndSkin(index, symbolResult.symbolName);
            }
        }
    }

    private async combine(reelResults: Array<ReelResult>) {
        console.log(`[mahjongWays_ReelRepository] combine start`);
        const shouldTrbo = this.getShouldTurbo();
        const baseDelay = shouldTrbo ? 0 : 0.1;

        const combinePromises = new Array<Promise<void>>();
        for (let reelResultIndex = 0; reelResultIndex < reelResults.length; reelResultIndex++) {
            const reelResult = reelResults[reelResultIndex];
            const delay = baseDelay * (reelResultIndex);
            // const reel = this.reels[reelResultIndex];
            // const combinationIndexes = this.getCombinationIndexes(reelResult.symbolResults);
            // const combinePromise = reel.combineSymbols(combinationIndexes, delay);
            // combinePromises.push(combinePromise);
        }
        this.mahjongWays_EventRepository.onCombine.Notify(reelResults);
        await Promise.all(combinePromises);
        console.log(`[mahjongWays_ReelRepository] combine end`);
    }

    private async flip(reelResults: Array<ReelResult>, nextReelResults: Array<ReelResult>) {
        console.log(`[mahjongWays_ReelRepository] flip start`);

        const flipPromises = new Array<Promise<void>>();
        for (let reelResultIndex = 0; reelResultIndex < reelResults.length; reelResultIndex++) {
            const reelResult = reelResults[reelResultIndex];
            const delay = 0.1 * (reelResultIndex);
            // const reel = this.reels[reelResultIndex];
            const combinationIndexes = this.getCombinationIndexes(reelResult.symbolResults);
            const symbolNamesAfterFlip: Array<SymbolName> = [];//??
            const eliminableSymboleCount = this.getEliminableIndexes(reelResult.symbolResults).length;
            const hasEliminable = (eliminableSymboleCount > 0);
            if (hasEliminable) {
                if (nextReelResults != null) {
                    const nextSymbolResults = nextReelResults[reelResultIndex].symbolResults.slice();
                    const targetIndexesByEliminableSymboleCount = [//??
                        null,
                        [0],
                        [1, 0],
                        [2, 1, 0],
                        [3, 2, 1, 0]
                    ];
                    const targetIndexes = targetIndexesByEliminableSymboleCount[eliminableSymboleCount];
                    targetIndexes.forEach(targetIndex => {
                        const symboleNameAfterFlip = nextSymbolResults[targetIndex].symbolName;
                        symbolNamesAfterFlip.push(symboleNameAfterFlip);
                    })
                }
            }
            //console.error("symbolNamesAfterFlip", symbolNamesAfterFlip);
            // const flipPromise = reel.flipSymbols(combinationIndexes, symbolNamesAfterFlip, delay);
            // flipPromises.push(flipPromise);
        }
        this.mahjongWays_EventRepository.onFlip.Notify(reelResults);
        await Promise.all(flipPromises);
        console.log(`[mahjongWays_ReelRepository] flip end`);
    }


    private async shake(reelResults: Array<ReelResult>) {
        console.log(`[mahjongWays_ReelRepository] shake start`);
        const shakePromises = new Array<Promise<void>>();
        for (let reelResultIndex = 0; reelResultIndex < reelResults.length; reelResultIndex++) {
            const reelResult = reelResults[reelResultIndex];
            const eliminableIndexes = this.getEliminableIndexes(reelResult.symbolResults);
            if (eliminableIndexes.length > 0) {
                let floatingIndexes = this.getFloatingIndexes(reelResult.symbolResults).reverse();
                // const reel = this.reels[reelResultIndex];
                // const shakePromise = reel.shakeSymbols(floatingIndexes);
                // shakePromises.push(shakePromise);
            }
        }
        await Promise.all(shakePromises);
        console.log(`[mahjongWays_ReelRepository] shake end`);
    }

    private async fall(reelResults: Array<ReelResult>) {
        console.log("start fall", reelResults);
        const shouldTrbo = this.getShouldTurbo();
        const baseDelay = shouldTrbo ? 0 : 0.05;

        const fallPromises = new Array<Promise<void>>();
        for (let reelResultIndex = 0; reelResultIndex < reelResults.length; reelResultIndex++) {
            const reelResult = reelResults[reelResultIndex];
            const eliminableIndexes = this.getEliminableIndexes(reelResult.symbolResults);
            if (eliminableIndexes.length > 0) {
                let currentGroundIndex = eliminableIndexes[eliminableIndexes.length - 1];
                // console.error(`currentGroundIndex ${currentGroundIndex}`);
                let floatingIndexes = this.getFloatingIndexes(reelResult.symbolResults).reverse();
                floatingIndexes = floatingIndexes.filter(index => index < currentGroundIndex);
                const endIndexes = new Array<number>();
                for (let floatingIndex = 0; floatingIndex < floatingIndexes.length; floatingIndex++) {
                    endIndexes.push(currentGroundIndex);
                    currentGroundIndex--;
                }
                // const reel = this.reels[reelResultIndex];
                //console.error("eliminableIndexes ", eliminableIndexes);
                //console.error("floatingIndexes ", floatingIndexes);
                //console.error("endIndexes ", endIndexes);
                // const fallPromise = reel.fallSymbols(eliminableIndexes, floatingIndexes, endIndexes, baseDelay);
                // fallPromises.push(fallPromise);
            }
        }
        await Promise.all(fallPromises);
        this.mahjongWays_EventRepository.onAllReelFallFinished.Notify(reelResults);
        console.log("end fall");
    }

    private getCombinationIndexes(symbolResults: Array<SymbolResult>) {
        const combinationSymbols = symbolResults.filter(symbol => symbol.isCombinable);
        const combinationIndexes = new Array<number>();
        combinationSymbols.forEach(symbol => {
            combinationIndexes.push(symbolResults.indexOf(symbol));
        });
        return combinationIndexes;
    }

    private getFloatingIndexes(symbolResults: Array<SymbolResult>) {
        const floatingSymbols = symbolResults.filter(symbol => !symbol.isCombinable || (GoldenSymbolNames.indexOf(symbol.symbolName) !== -1));
        let floatingIndexes = new Array<number>();
        floatingSymbols.forEach(symbol => {
            floatingIndexes.push(symbolResults.indexOf(symbol));
        });
        floatingIndexes = floatingIndexes.filter(index => index < 7);
        return floatingIndexes;
    }

    private getEliminableIndexes(symbolResults: Array<SymbolResult>) {
        //console.error(`getEliminableIndexes symbolResults`, symbolResults);
        const eliminableSymbols = symbolResults.filter(symbol => (symbol.isCombinable && (EliminableSymbolNames.indexOf(symbol.symbolName) !== -1)));
        //console.error(`getEliminableIndexes eliminableSymbols`, eliminableSymbols);
        const eliminableIndexes = new Array<number>();
        eliminableSymbols.forEach(symbol => {
            eliminableIndexes.push(symbolResults.indexOf(symbol));
        });
        //console.error(`getEliminableIndexes eliminableIndexes`, eliminableIndexes);
        return eliminableIndexes;
    }

    private getRandomReelResults(): Array<ReelResult> {
        const reelResults: Array<ReelResult> = new Array<ReelResult>();
        for (let index = 0; index < 5; index++) {
            const reelResult: ReelResult = {
                symbolResults: [
                    this.getRandomReelResult(),
                    this.getRandomReelResult(),
                    this.getRandomReelResult(),
                    this.getRandomReelResult(),
                ]
            }
            reelResults.push(reelResult);
        }
        return reelResults;
    }

    private getRandomReelResult(): SymbolResult {
        return {
            symbolName: SymbolName.GoldenWhiteDragon,
            isCombinable: false
        }
        const symbolNames = [
            SymbolName.Scatter,
            SymbolName.GreenDragon,
            SymbolName.RedDragon,
            SymbolName.WhiteDragon,
            SymbolName.EightOfCharacters,
            SymbolName.FiveOfDots,
            SymbolName.FiveOfBamboos,
            SymbolName.TwoOfDots,
            SymbolName.TwoOfBamboos,
            SymbolName.GoldenGreenDragon,
            SymbolName.GoldenRedDragon,
            SymbolName.GoldenWhiteDragon,
            SymbolName.GoldenEightOfCharacters,
            SymbolName.GoldenFiveOfDots,
            SymbolName.GoldenFiveOfBamboos,
            SymbolName.GoldenTwoOfDots,
            SymbolName.GoldenTwoOfBamboos,
        ];
        const symbolResult: SymbolResult = {
            symbolName: symbolNames[Math.floor(Math.random() * symbolNames.length)],
            isCombinable: false,
        }
        return symbolResult
    }

    private getShouldTurbo() {
        if (this.isFreeGame) {
            return false;
        } else {
            return this.mahjongWays_DataRepository.isTurboOn;
        }
    }

    private getIsWinFreeGame(reelResults: Array<ReelResult>) {
        let scatterCount = 0;
        reelResults.forEach(reelResult => {
            const symbolResults = reelResult.symbolResults;
            for (let index = 0; index < symbolResults.length; index++) {
                const symbolResult = symbolResults[index];
                if (index >= 4 && index <= 7) {
                    if (symbolResult.symbolName === SymbolName.Scatter) {
                        scatterCount++;
                    }
                }
            }
        });
        const getIsWinFreeGame = (scatterCount >= 3);
        return getIsWinFreeGame;
    }

    private getDefaultReelSymbolNames() {
        return [[
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfDots,//start
            SymbolName.FiveOfBamboos,
            SymbolName.TwoOfDots,
            SymbolName.TwoOfBamboos,
            SymbolName.FiveOfBamboos,
        ], [
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.RedDragon,//start
            SymbolName.GreenDragon,
            SymbolName.GoldenRedDragon,
            SymbolName.Scatter,
            SymbolName.EightOfCharacters,
            SymbolName.RedDragon,
        ], [
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,//
            SymbolName.Wild,
            SymbolName.TwoOfDots,
            SymbolName.Wild,
            SymbolName.RedDragon,
        ], [
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.RedDragon,//
            SymbolName.GreenDragon,
            SymbolName.Scatter,
            SymbolName.GoldenWhiteDragon,
            SymbolName.EightOfCharacters,
            SymbolName.RedDragon,
        ], [
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfBamboos,
            SymbolName.FiveOfDots,//start
            SymbolName.FiveOfBamboos,
            SymbolName.TwoOfDots,
            SymbolName.TwoOfBamboos,
            SymbolName.EightOfCharacters,
        ]]
    }

    private playReelEffectByReelIndex(reelIndex: number) {
        this.reelEffect.setPositionByIndex(reelIndex);
        // this.reelEffect.stopEffects();
        // this.reelEffect.playEffects();
        // this.mahjongWays_EventRepository.onReelEffect.Notify();
        // for (let index = 0; index < reelIndex; index++) {
        //     const reel = this.reels[index];
        //     reel.addGrayToAllSymbolsExceptCombinableScatters();
        // }
    }
}