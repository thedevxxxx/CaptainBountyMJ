import { convertServerCodeToSymbolName } from "../converter/mjhl_Converter";
import mjhl_EventRepository from "../../../../script/event/pq_EventRepository";
import proto from "../../../../script/network/proto/PQproto_msg.js";
import { isGoldenMahjong, isScatter } from "../predictor/mjhl_Predictor";
import { ReelResult, RoundResult, SymbolName, SymbolResult } from "../type/mjhl_Types";
import mjhl_DataRepository from "./mjhl_DataRepository";
import { log } from "cc";

export default class mjhl_LotteryInfoConverter {

    private mjhl_DataRepository: mjhl_DataRepository;

    private mjhl_EventRepository: mjhl_EventRepository;

    private previousFinalFreeCount: number;

    public constructor(mjhl_EventRepository: mjhl_EventRepository, mjhl_DataRepository: mjhl_DataRepository) {
        this.mjhl_DataRepository = mjhl_DataRepository;
        this.mjhl_EventRepository = mjhl_EventRepository;
        mjhl_EventRepository.onLotteryInfo.Attach((lotteryInfo) => this.onLotteryInfo(lotteryInfo));
        mjhl_EventRepository.onReceiveFreeGameRewardClicked.Attach(() => this.previousFinalFreeCount = null);

    }

    public destroy() {

    }

    private getExtraFreeCount(finalFreeCount: number): number {
        if (finalFreeCount == null) {
            return null;
        }
        if (this.previousFinalFreeCount == null) {
            return null;
        }
        return finalFreeCount - this.previousFinalFreeCount;
    }

    private onLotteryInfo(lotteryInfo: proto.ILotteryInfo) {
        log('onLotteryInfo',lotteryInfo)
        const lotterys: Array<proto.IOneLotteryInfo> = JSON.parse(JSON.stringify(lotteryInfo.lotteryInfoList));//??

        const resultsOfSingleReelByReelIndex = this.convertGroupOfAllSymbolsToResultsOfSingleReel(lotterys.map(reel => reel.allSymbols));

        const roundResults = this.convertResultsOfSingleReelToRoundResults(resultsOfSingleReelByReelIndex);

        const betMoney = lotteryInfo.betMoney ?? 0;
        const finalFreeCount = lotteryInfo.finalFreeCount;
        const extraFreeCount = this.getExtraFreeCount(finalFreeCount);
        this.previousFinalFreeCount = finalFreeCount;
        const freeCount = Math.max(...lotterys.map(lottery => lottery.getFreeCount ?? 0));
        const isFirstFreeGame = ((finalFreeCount > 0) && (finalFreeCount === freeCount) && (betMoney > 0));
        const winMoneyList = lotterys.map(lottery => lottery.winMoney).slice().filter(Number);
        const accumulatedWins = winMoneyList.slice();
        for (let winMoneyIndex = 0; winMoneyIndex < winMoneyList.length; winMoneyIndex++) {
            for (let previousIndex = 0; previousIndex < winMoneyIndex; previousIndex++) {
                accumulatedWins[winMoneyIndex] += winMoneyList[previousIndex];
            }
        }
        const isFreeGame = (betMoney === 0);
        const origianlBalance = lotteryInfo.balance - lotteryInfo.offsetToPlayer - betMoney;
        const balances = new Array<number>();
        balances.push(origianlBalance);
        for (let index = 0; index < accumulatedWins.length; index++) {
            const win = accumulatedWins[index];
            balances.push(origianlBalance + win);
        }
        const multiplies = lotterys.map(lottery => lottery.winMultiplier);

        if (isFirstFreeGame) {
            this.mjhl_DataRepository.setFreeGameTotalWin(0);
        }
        if (isFreeGame) {
            const currentRoundTotalWin = (accumulatedWins.length) > 0 ? (accumulatedWins[accumulatedWins.length - 1]) : 0;
            if (currentRoundTotalWin > 0) {
                const freeGameTotalWin = (this.mjhl_DataRepository.freeGameTotalWin + currentRoundTotalWin);
                this.mjhl_DataRepository.setFreeGameTotalWin(freeGameTotalWin);
            }
        }

        const baseBet = lotteryInfo.baseBet;
        const betLevel = lotteryInfo.betLevel;
        const betSize = lotteryInfo.betSize;
        const totalWin = winMoneyList.reduce((sum, current) => sum + current, 0);
        const betAmount = (baseBet * betLevel * betSize);
        const totalWinMultiple = totalWin / betAmount;
        const bigWin = betAmount * 20;
        const megaWin = betAmount * 35;
        const superWin = betAmount * 50;
        const freeGameTotalWin = this.mjhl_DataRepository.freeGameTotalWin;
        this.mjhl_EventRepository.onResult.Notify({
            roundResults: roundResults,
            wins: winMoneyList.slice(),
            accumulatedWins: accumulatedWins,
            isFirstFreeGame: isFirstFreeGame,
            multiplies: multiplies,
            freeGames: finalFreeCount,
            balances: balances,
            isFreeGame: isFreeGame,
            freeGameTotalWin: freeGameTotalWin,
            totalWin: totalWin,
            totalWinMultiple: totalWinMultiple,
            bigWins: {
                bigWin: bigWin,
                megaWin: megaWin,
                superWin: superWin
            },
            betAmount: betAmount,
            extraFreeCount: extraFreeCount
        });
    }

    private convertGroupOfAllSymbolsToResultsOfSingleReel(groupOfAllSymbols: Array<Array<proto.OneLotteryInfo.ISymbolList>>): Array<Array<ReelResult>> {
        const resultsOfSingleReelByReelIndex = new Array<Array<ReelResult>>();
        const reelCount = 5;
        for (let index = 0; index < reelCount; index++) {
            const resultsOfSingleReel = new Array<ReelResult>();
            resultsOfSingleReelByReelIndex.push(resultsOfSingleReel);
        }
        for (let index = 0; index < groupOfAllSymbols.length; index++) {
            const reels = groupOfAllSymbols[index];
            for (let reelIndex = 0; reelIndex < reels.length; reelIndex++) {
                const reel = reels[reelIndex];
                //const symbols = reel.reelSymbols.reverse();//??
                const symbols = reel.reelSymbols;
                const reelResult: ReelResult = { symbolResults: [] };
                for (let symbolIndex = 0; symbolIndex < symbols.length; symbolIndex++) {//4
                    const symbol = symbols[symbolIndex];
                    const isGold = (symbol.isGold == null) ? false : symbol.isGold;
                    const isLucky = (symbol.isLucky == null) ? false : symbol.isLucky;
                    const symbolName = convertServerCodeToSymbolName(symbol.symbolId, isGold);
                    const symbolResult = {
                        symbolName: symbolName,
                        isCombinable: isLucky
                    };
                    reelResult.symbolResults.push(symbolResult);
                }
                resultsOfSingleReelByReelIndex[reelIndex].push(reelResult);
            }
            //log
            this.logEmoji(reels.map(x => x.reelSymbols.map(y => y.symbolId)), reels.map(x => x.reelSymbols.map(y => y.isGold)));
        }
        //console.error("resultsOfSingleReelByReelIndex", resultsOfSingleReelByReelIndex);
        return resultsOfSingleReelByReelIndex;
    }

    private convertResultsOfSingleReelToRoundResults(resultsOfSingleReelByReelIndex: Array<Array<ReelResult>>): Array<RoundResult> {
        //console.log("serverSymbolResults,", serverReelResultsArray[0].map(x => x.symbolResults));
        console.log("resultsOfSingleReelByReelIndex", resultsOfSingleReelByReelIndex);
        const roundResults = new Array<RoundResult>();
        const roundResultsOfSingleReelByReelIndex = new Array<Array<ReelResult>>();
        for (let index = 0; index < resultsOfSingleReelByReelIndex.length; index++) {
            const resultsOfSingleReel = resultsOfSingleReelByReelIndex[index].slice();
            const roundResultsOfSingleReel = this.convertResultsOfSingleReelToRoundResultsOfSingleReel(resultsOfSingleReel);
            roundResultsOfSingleReelByReelIndex.push(roundResultsOfSingleReel);
        }
        const roundResultCountPerReel = roundResultsOfSingleReelByReelIndex[0].length;//??
        for (let index = 0; index < roundResultCountPerReel; index++) {
            roundResults.push({
                reelResults: [
                    roundResultsOfSingleReelByReelIndex[0][index],
                    roundResultsOfSingleReelByReelIndex[1][index],
                    roundResultsOfSingleReelByReelIndex[2][index],
                    roundResultsOfSingleReelByReelIndex[3][index],
                    roundResultsOfSingleReelByReelIndex[4][index],
                ]
            });
        }
        return roundResults;
    }

    private convertResultsOfSingleReelToRoundResultsOfSingleReel(resultsOfSingleReel: Array<ReelResult>): Array<ReelResult> {
        const countOfResultsOfSingleReel = resultsOfSingleReel.length;
        const allRoundSymbolResultsPerReel = new Array<Array<SymbolResult>>();
        for (let index = 0; index < countOfResultsOfSingleReel; index++) {
            const oneRoundSymbolResultsPerReel = this.getOneRoundSymbolResultsPerReel(resultsOfSingleReel.slice(index, resultsOfSingleReel.length));
            allRoundSymbolResultsPerReel.push(oneRoundSymbolResultsPerReel);
        }
        //console.error(`allRoundSymbolResultsPerReel: `, allRoundSymbolResultsPerReel);

        const roundResultsOfSingleReel = new Array<ReelResult>();

        for (let reelIndex = 0; reelIndex < allRoundSymbolResultsPerReel.length; reelIndex++) {
            const oneRoundSymbolResultsPerReel = allRoundSymbolResultsPerReel[reelIndex];
            const symbolResults = new Array<SymbolResult>()
            const symbolName = (reelIndex === 0 || reelIndex === 4) ? this.getRandomSymbolNameWithoutWildAndGoldenMahjong() : this.getRandomSymbolNameWithoutWild();
            symbolResults.push({ symbolName: symbolName, isCombinable: false });
            const symbolDisplayCountPerReel = 9;
            const lackOfSymbolCount = (symbolDisplayCountPerReel - symbolResults.length);
            for (let index = 0; index < lackOfSymbolCount; index++) {
                const symbolResultsPerReel = oneRoundSymbolResultsPerReel[index];
                if (index < 4) {
                    symbolResults.push({ symbolName: symbolResultsPerReel.symbolName, isCombinable: symbolResultsPerReel.isCombinable });
                } else {
                    if (symbolResultsPerReel != null) {
                        symbolResults.push({ symbolName: symbolResultsPerReel.symbolName, isCombinable: false });
                    } else {
                        const symbolName = (reelIndex === 0 || reelIndex === 4) ? this.getRandomSymbolNameWithoutWildAndGoldenMahjong() : this.getRandomSymbolNameWithoutWild();
                        symbolResults.push({ symbolName: symbolName, isCombinable: false });
                    }
                }
            }
            symbolResults.reverse();
            const reelResult = { symbolResults: symbolResults };
            roundResultsOfSingleReel.push(reelResult);
        }

        //roundResultsOfSingleReel.forEach(x => x.symbolResults.forEach(y => y.debug = EmojiBySymbolName[y.symbolName]));
        //console.error(`roundResultsOfSingleReel: `, roundResultsOfSingleReel);

        return roundResultsOfSingleReel;
        // for (let index = 0; index < resultsOfSingleReel.length; index++) {
        //     const resultOfSingleReel = resultsOfSingleReel[index];
        //     const symbolResultsOfSingleReel = resultOfSingleReel.symbolResults;
        //     const symbolResults = new Array<SymbolResult>()
        //     symbolResults.push({ symbolName: this.getRandomSymbolNameWithoutWild(), isCombinable: false });
        //     symbolResults.push({ symbolName: symbolResultsOfSingleReel[0].symbolName, isCombinable: symbolResultsOfSingleReel[0].isCombinable });
        //     symbolResults.push({ symbolName: symbolResultsOfSingleReel[1].symbolName, isCombinable: symbolResultsOfSingleReel[1].isCombinable });
        //     symbolResults.push({ symbolName: symbolResultsOfSingleReel[2].symbolName, isCombinable: symbolResultsOfSingleReel[2].isCombinable });
        //     symbolResults.push({ symbolName: symbolResultsOfSingleReel[3].symbolName, isCombinable: symbolResultsOfSingleReel[3].isCombinable });
        //
        //     const secondIndex = (index + 1);
        //     const isSecondResultOfSingleReelExist = (secondIndex < resultsOfSingleReel.length);
        //     if (isSecondResultOfSingleReelExist) {
        //         const nextResultOfSingleReel = resultOfSingleReel[secondIndex];
        //
        //     }
        //
        //     symbolResults.reverse();
        //     const reelResult = { symbolResults: symbolResults };
        //     roundResultsOfSingleReel.push(reelResult);
        // }
        //return roundResultsOfSingleReel;
    }

    private getOneRoundSymbolResultsPerReel(resultsOfSingleReel: Array<ReelResult>): Array<SymbolResult> {
        const oneRoundSymbolResultsPerReel = new Array<SymbolResult>();
        for (let index = 0; index < resultsOfSingleReel.length; index++) {
            const resultOfSingleReel = resultsOfSingleReel[index];
            const symbolResultsOfSingleReel = resultOfSingleReel.symbolResults.slice();
            if (index === 0) {
                oneRoundSymbolResultsPerReel.push({ symbolName: symbolResultsOfSingleReel[0].symbolName, isCombinable: symbolResultsOfSingleReel[0].isCombinable });
                oneRoundSymbolResultsPerReel.push({ symbolName: symbolResultsOfSingleReel[1].symbolName, isCombinable: symbolResultsOfSingleReel[1].isCombinable });
                oneRoundSymbolResultsPerReel.push({ symbolName: symbolResultsOfSingleReel[2].symbolName, isCombinable: symbolResultsOfSingleReel[2].isCombinable });
                oneRoundSymbolResultsPerReel.push({ symbolName: symbolResultsOfSingleReel[3].symbolName, isCombinable: symbolResultsOfSingleReel[3].isCombinable });
            } else {
                const previousResultOfSingleReel = resultsOfSingleReel[index - 1];
                const previousIneliminableSymbolResults = previousResultOfSingleReel.symbolResults.slice().filter(symbolResult => (!symbolResult.isCombinable || isGoldenMahjong(symbolResult.symbolName)));
                previousIneliminableSymbolResults.forEach(ineliminableSymbolResult => {
                    let symbolName = ineliminableSymbolResult.symbolName;
                    if (ineliminableSymbolResult.isCombinable && isGoldenMahjong(symbolName)) {
                        symbolName = SymbolName.Wild;
                    }
                    const target = symbolResultsOfSingleReel.find(x => x.symbolName === symbolName);
                    symbolResultsOfSingleReel.splice(symbolResultsOfSingleReel.indexOf(target), 1);
                    if (target == null) {
                        console.error(`target [${symbolName}] not found`);
                    }
                });
                symbolResultsOfSingleReel.forEach(symbolResult => {
                    oneRoundSymbolResultsPerReel.push({ symbolName: symbolResult.symbolName, isCombinable: symbolResult.isCombinable });
                });
            }
        }
        return oneRoundSymbolResultsPerReel;
    }

    //private convertResultOfSingleReelToRoundResultsOfSingleReel(resultOfSingleReel: Array<ReelResult>): Array<ReelResult> {
    //    if (resultOfSingleReel.length === 1) {//??
    //        const symbolResults = resultOfSingleReel[0].symbolResults;
    //        return [{
    //            symbolResults: [
    //                { symbolName: this.getRandomSymbolNameWithoutWild(), isCombinable: false },
    //                { symbolName: this.getRandomSymbolNameWithoutWild(), isCombinable: false },
    //                { symbolName: this.getRandomSymbolNameWithoutWild(), isCombinable: false },
    //                { symbolName: this.getRandomSymbolNameWithoutWild(), isCombinable: false },
    //                symbolResults[3],
    //                symbolResults[2],
    //                symbolResults[1],
    //                symbolResults[0],
    //                { symbolName: this.getRandomSymbolNameWithoutWild(), isCombinable: false }
    //            ]
    //        }];
    //    }
    //
    //    const resultsOfSingleReel = new Array<ReelResult>();
    //    for (let resultIndex = 0; resultIndex < resultOfSingleReel.length; resultIndex++) {
    //        const secondIndex = resultIndex + 1;
    //        if (secondIndex === resultOfSingleReel.length) {
    //            break;
    //        }
    //        //??DRY
    //        const firstSymbolResults = resultOfSingleReel[resultIndex].symbolResults.slice();
    //        const secondSymbolResults = resultOfSingleReel[secondIndex].symbolResults.slice();
    //        secondSymbolResults.reverse();
    //        const firstIneliminableSymbolResults = firstSymbolResults.slice().filter(symbolResult => (!symbolResult.isCombinable || isGoldenMahjong(symbolResult.symbolName)));
    //        firstIneliminableSymbolResults.forEach(ineliminableSymbolResult => {
    //            let symbolName = ineliminableSymbolResult.symbolName;
    //            if (ineliminableSymbolResult.isCombinable && isGoldenMahjong(symbolName)) {
    //                symbolName = SymbolName.Wild;
    //            }
    //            const target = secondSymbolResults.find(x => x.symbolName === symbolName);
    //            secondSymbolResults.splice(secondSymbolResults.indexOf(target), 1);
    //            if (target == null) {
    //                console.error("????????");
    //            }
    //        });
    //        secondSymbolResults.reverse();
    //
    //        const symbolResults = new Array<SymbolResult>();
    //        symbolResults.push({ symbolName: this.getRandomSymbolNameWithoutWild(), isCombinable: false });
    //        symbolResults.push(firstSymbolResults[3])
    //        symbolResults.push(firstSymbolResults[2])
    //        symbolResults.push(firstSymbolResults[1])
    //        symbolResults.push(firstSymbolResults[0])
    //        secondSymbolResults.reverse().forEach(nextSymbolResult => symbolResults.push({ symbolName: nextSymbolResult.symbolName, isCombinable: false }));
    //
    //        //??DRY
    //        const thirdSymbolResults = resultOfSingleReel[secondIndex + 1]?.symbolResults.slice();
    //        if (thirdSymbolResults != null) {
    //            thirdSymbolResults.reverse();
    //            const secondIneliminableSymbolResult = resultOfSingleReel[secondIndex].symbolResults.slice().filter(symbolResult => (!symbolResult.isCombinable || GoldenSymbolNames.indexOf(symbolResult.symbolName) !== -1));
    //            secondIneliminableSymbolResult.forEach(ineliminableSymbolResult => {
    //                let symbolName = ineliminableSymbolResult.symbolName;
    //                if (ineliminableSymbolResult.isCombinable && isGoldenMahjong(symbolName)) {
    //                    symbolName = SymbolName.Wild;
    //                }
    //                const target = thirdSymbolResults.find(x => x.symbolName === symbolName);
    //                thirdSymbolResults.splice(thirdSymbolResults.indexOf(target), 1);
    //                if (target == null) {
    //                    console.error("!!!!!!!!");
    //                }
    //            });
    //            thirdSymbolResults.reverse();
    //        }
    //
    //        const symbolCountPerReel = 9;
    //        const lackCount = (symbolCountPerReel - symbolResults.length);
    //        if (thirdSymbolResults == null) {
    //            for (let i = 0; i < lackCount; i++) {
    //                symbolResults.push({ symbolName: this.getRandomSymbolNameWithoutWild(), isCombinable: false });
    //            }
    //        } else {
    //            thirdSymbolResults.reverse();
    //            for (let i = 0; i < lackCount; i++) {
    //                let symbolName = thirdSymbolResults[i]?.symbolName;
    //                if (symbolName == null) {
    //                    symbolName = SymbolName.Wild;
    //                }
    //                symbolResults.push({ symbolName: symbolName, isCombinable: false });
    //            }
    //        }
    //
    //        symbolResults.reverse();
    //
    //        resultsOfSingleReel.push({ symbolResults: symbolResults });
    //    }
    //    //console.log("convertToReelReseults", reelResults.map(x => x.symbolResults));
    //    return resultsOfSingleReel;
    //}

    private getRandomSymbolNameWithoutWild(): SymbolName {
        const symbolNames = [
            SymbolName.Scatter,
            SymbolName.GreenDragon,
            SymbolName.RedDragon,
            SymbolName.WhiteDragon,
            SymbolName.EightOfCharacters,
            SymbolName.FiveOfDots,
            SymbolName.FiveOfBamboos,
            SymbolName.TwoOfBamboos,
            SymbolName.TwoOfDots,
            SymbolName.GoldenGreenDragon,
            SymbolName.GoldenRedDragon,
            SymbolName.GoldenWhiteDragon,
            SymbolName.GoldenEightOfCharacters,
            SymbolName.GoldenFiveOfDots,
            SymbolName.GoldenFiveOfBamboos,
            SymbolName.GoldenTwoOfBamboos,
            SymbolName.GoldenTwoOfDots
        ]
        return symbolNames[Math.floor(Math.random() * symbolNames.length)]
    }

    private getRandomSymbolNameWithoutWildAndGoldenMahjong(): SymbolName {
        const symbolNames = [
            SymbolName.Scatter,
            SymbolName.GreenDragon,
            SymbolName.RedDragon,
            SymbolName.WhiteDragon,
            SymbolName.EightOfCharacters,
            SymbolName.FiveOfDots,
            SymbolName.FiveOfBamboos,
            SymbolName.TwoOfBamboos,
            SymbolName.TwoOfDots,
        ]
        return symbolNames[Math.floor(Math.random() * symbolNames.length)]
    }

    private logEmoji(symbolsByReelIndex: Array<Array<number>>, isGoldArray: Array<Array<boolean>>) {
        const emojis = ["", "🀪", "🀥", "🀅", "🀄︎", "🀆", "🀎", "🀝", "🀔", "🀚", "🀑", "🀅", "🀄︎", "🀆", "🀎", "🀝", "🀔", "🀚", "🀑"];
        let output = new Array<string>();
        let emojiStrings = "";
        const symbolCount = symbolsByReelIndex[0].length;
        const reelCount = symbolsByReelIndex.length;
        for (let index = (symbolCount - 1); index >= 0; index--) {
            for (let reelIndex = 0; reelIndex < reelCount; reelIndex++) {
                const emojiIndex = symbolsByReelIndex[reelIndex][index];
                const emoji = (reelIndex === reelCount - 1) ? (`%c${emojis[emojiIndex]}\n`) : (`%c${emojis[emojiIndex]}`);
                emojiStrings += emoji;
            }
        }
        output.push(emojiStrings);
        for (let index = (symbolCount - 1); index >= 0; index--) {
            for (let reelIndex = 0; reelIndex < reelCount; reelIndex++) {
                const emojiIndex = symbolsByReelIndex[reelIndex][index];
                const isGold = isGoldArray[reelIndex][index];
                output.push(isGold ? "font-size:50px;background:yellow" : "font-size:50px");
            }
        }
        console.log(output[0], output[1], output[2], output[3], output[4], output[5], output[6], output[7], output[8], output[9], output[10], output[11], output[12], output[13], output[14], output[15], output[16], output[17], output[18], output[19], output[20]);
    }

    //private getRandomSymbolResult(isCombination?: boolean): SymbolResult {
    //    const symbolNames = [
    //        SymbolName.Wild,
    //        //    SymbolName.Scatter,
    //        SymbolName.GreenDragon,
    //        SymbolName.RedDragon,
    //        SymbolName.WhiteDragon,
    //        SymbolName.EightOfCharacters,
    //        SymbolName.FiveOfDots,
    //        SymbolName.FiveOfBamboos,
    //        SymbolName.TwoOfBamboos,
    //        SymbolName.TwoOfDots,
    //        SymbolName.GoldenGreenDragon,
    //        SymbolName.GoldenRedDragon,
    //        SymbolName.GoldenWhiteDragon,
    //        SymbolName.GoldenEightOfCharacters,
    //        SymbolName.GoldenFiveOfDots,
    //        SymbolName.GoldenFiveOfBamboos,
    //        SymbolName.GoldenTwoOfBamboos,
    //        SymbolName.GoldenTwoOfDots
    //    ];
    //    const symbolName = symbolNames[Math.floor(Math.random() * symbolNames.length)];
    //    if (symbolName === SymbolName.Scatter) {
    //        isCombination = false;
    //    } else {
    //        isCombination = (isCombination == null) ? (Math.random() > 0.5 ? true : false) : isCombination;
    //    }
    //    const symbolResult: SymbolResult = {
    //        symbolName: symbolName,
    //        isCombinable: isCombination,
    //    }
    //    return symbolResult
    //}

    //private getReelResults(): Array<ReelResult> {
    //    const reelResults: Array<ReelResult> = new Array<ReelResult>();
    //    for (let index = 0; index < 5; index++) {
    //        const reelResult: ReelResult = {
    //            symbolResults: [
    //                this.getRandomSymbolResult(false),
    //                this.getRandomSymbolResult(false),
    //                this.getRandomSymbolResult(false),
    //                this.getRandomSymbolResult(false),
    //                this.getRandomSymbolResult(),
    //                this.getRandomSymbolResult(),
    //                this.getRandomSymbolResult(),
    //                this.getRandomSymbolResult(),
    //                this.getRandomSymbolResult(false)
    //            ]
    //        }
    //        reelResults.push(reelResult);
    //    }
    //    return reelResults;
    //}

    //private getRandomSymbolName() {
    //    const symbolNames = [
    //        //  SymbolName.Wild,
    //        // SymbolName.Scatter,
    //        SymbolName.GreenDragon,
    //        SymbolName.RedDragon,
    //        SymbolName.WhiteDragon,
    //        SymbolName.EightOfCharacters,
    //        SymbolName.FiveOfDots,
    //        SymbolName.FiveOfBamboos,
    //        SymbolName.TwoOfBamboos,
    //        SymbolName.TwoOfDots,
    //        SymbolName.GoldenGreenDragon,
    //        SymbolName.GoldenRedDragon,
    //        SymbolName.GoldenWhiteDragon,
    //        SymbolName.GoldenEightOfCharacters,
    //        SymbolName.GoldenFiveOfDots,
    //        SymbolName.GoldenFiveOfBamboos,
    //        SymbolName.GoldenTwoOfBamboos,
    //        SymbolName.GoldenTwoOfDots
    //    ]
    //    return symbolNames[Math.floor(Math.random() * symbolNames.length)]
    //}

    //private getRandomFakeServerReelResult() {
    //    const reelResultsGroup = new Array<ReelResult>();
    //    reelResultsGroup.push(this.getRandomSymbolResults());
    //    reelResultsGroup.push(this.getNextRandomSymbolResults(reelResultsGroup[0]));
    //    reelResultsGroup.push(this.getNextRandomSymbolResults(reelResultsGroup[1]));
    //    reelResultsGroup.push(this.getNextRandomSymbolResults(reelResultsGroup[2]));
    //    return reelResultsGroup;
    //}

    //private getRandomSymbolResults() {
    //    const reelResult: ReelResult = {
    //        symbolResults: [
    //            this.getRandomSymbolResult(),
    //            this.getRandomSymbolResult(),
    //            this.getRandomSymbolResult(),
    //            this.getRandomSymbolResult(),
    //        ]
    //    }
    //    return reelResult;
    //}

    //private getNextRandomSymbolResults(reelResult: ReelResult): ReelResult {
    //    console.error("getNextRandomSymbolResults input", reelResult.symbolResults.slice());
    //    let ineliminableSymbolResults = reelResult.symbolResults.slice();
    //    ineliminableSymbolResults = ineliminableSymbolResults.filter(symbolResult => !symbolResult.isCombinable || isGoldenMahjong(symbolResult.symbolName) || isScatter(symbolResult.symbolName));
    //
    //    ineliminableSymbolResults.forEach(x => console.log(x));
    //
    //
    //    for (let index = 0; index < ineliminableSymbolResults.length; index++) {
    //        const symbolResult = ineliminableSymbolResults[index];
    //        if (isGoldenMahjong(symbolResult.symbolName)) {
    //            symbolResult.symbolName = SymbolName.Wild;
    //        }
    //    }
    //
    //
    //    const lackCount = 4 - ineliminableSymbolResults.length;
    //    console.error("getNextRandomSymbolResults lackCount", lackCount);
    //    for (let index = 0; index < lackCount; index++) {
    //        const symbolResult = this.getRandomSymbolResult();
    //        console.error("getNextRandomSymbolResults randomSymbol", symbolResult);
    //        ineliminableSymbolResults.unshift(symbolResult);
    //    }
    //    console.error("getNextRandomSymbolResults output", ineliminableSymbolResults);
    //    return { symbolResults: ineliminableSymbolResults };
    //}

    //private getFakeServerReelResult() {
    //    const reelResult = [{
    //        symbolResults: [
    //            { symbolName: SymbolName.GoldenEightOfCharacters, isCombinable: true },
    //            { symbolName: SymbolName.GoldenFiveOfBamboos, isCombinable: true },
    //            { symbolName: SymbolName.GoldenFiveOfDots, isCombinable: true },
    //            { symbolName: SymbolName.GoldenGreenDragon, isCombinable: true },
    //        ]
    //    }, {
    //        symbolResults: [
    //            { symbolName: SymbolName.Wild, isCombinable: false },
    //            { symbolName: SymbolName.Wild, isCombinable: true },
    //            { symbolName: SymbolName.Wild, isCombinable: true },
    //            { symbolName: SymbolName.Wild, isCombinable: false },
    //        ]
    //    }, {
    //        symbolResults: [
    //            { symbolName: SymbolName.EightOfCharacters, isCombinable: true },
    //            { symbolName: SymbolName.FiveOfDots, isCombinable: true },
    //            { symbolName: SymbolName.Wild, isCombinable: false },
    //            { symbolName: SymbolName.Wild, isCombinable: false },
    //        ]
    //    }, {
    //        symbolResults: [
    //            { symbolName: SymbolName.RedDragon, isCombinable: true },
    //            { symbolName: SymbolName.FiveOfBamboos, isCombinable: false },
    //            { symbolName: SymbolName.Wild, isCombinable: false },
    //            { symbolName: SymbolName.Wild, isCombinable: false },
    //        ]
    //    }, {
    //        symbolResults: [
    //            { symbolName: SymbolName.TwoOfDots, isCombinable: false },
    //            { symbolName: SymbolName.FiveOfBamboos, isCombinable: true },
    //            { symbolName: SymbolName.Wild, isCombinable: true },
    //            { symbolName: SymbolName.Wild, isCombinable: true },
    //        ]
    //    }, {
    //        symbolResults: [
    //            { symbolName: SymbolName.GreenDragon, isCombinable: false },
    //            { symbolName: SymbolName.FiveOfDots, isCombinable: false },
    //            { symbolName: SymbolName.TwoOfDots, isCombinable: true },
    //            { symbolName: SymbolName.TwoOfDots, isCombinable: true },
    //        ]
    //    }, {
    //        symbolResults: [
    //            { symbolName: SymbolName.TwoOfDots, isCombinable: false },
    //            { symbolName: SymbolName.GreenDragon, isCombinable: false },
    //            { symbolName: SymbolName.GreenDragon, isCombinable: false },
    //            { symbolName: SymbolName.FiveOfDots, isCombinable: true },
    //        ]
    //    }, {
    //        symbolResults: [
    //            { symbolName: SymbolName.WhiteDragon, isCombinable: false },
    //            { symbolName: SymbolName.TwoOfDots, isCombinable: true },
    //            { symbolName: SymbolName.GreenDragon, isCombinable: false },
    //            { symbolName: SymbolName.GreenDragon, isCombinable: true },
    //        ]
    //    }, {
    //        symbolResults: [
    //            { symbolName: SymbolName.RedDragon, isCombinable: false },
    //            { symbolName: SymbolName.FiveOfBamboos, isCombinable: true },
    //            { symbolName: SymbolName.WhiteDragon, isCombinable: true },
    //            { symbolName: SymbolName.GreenDragon, isCombinable: false },
    //        ]
    //    }, {
    //        symbolResults: [
    //            { symbolName: SymbolName.TwoOfDots, isCombinable: true },
    //            { symbolName: SymbolName.FiveOfDots, isCombinable: false },
    //            { symbolName: SymbolName.RedDragon, isCombinable: false },
    //            { symbolName: SymbolName.GreenDragon, isCombinable: true },
    //        ]
    //    }, {
    //        symbolResults: [
    //            { symbolName: SymbolName.TwoOfDots, isCombinable: true },
    //            { symbolName: SymbolName.Scatter, isCombinable: false },
    //            { symbolName: SymbolName.FiveOfDots, isCombinable: true },
    //            { symbolName: SymbolName.RedDragon, isCombinable: false },
    //        ]
    //    }, {
    //        symbolResults: [
    //            { symbolName: SymbolName.TwoOfDots, isCombinable: false },
    //            { symbolName: SymbolName.FiveOfBamboos, isCombinable: false },
    //            { symbolName: SymbolName.Scatter, isCombinable: false },
    //            { symbolName: SymbolName.RedDragon, isCombinable: false },
    //        ]
    //    }];
    //    return reelResult;
    //}
}