import { input, Input, EventKeyboard, KeyCode, Node, isValid, AudioClip } from "cc";
import mahjongWays2_DataRepository from "../data/mahjongWays2_DataRepository";
import mahjongWays2_EventRepository from "../../../../script/event/pq_EventRepository";
import { isGoldenMahjong } from "../predictor/mahjongWays2_Predictor";
import { delay } from "../timer/mahjongWays2_Timer";
import { ReelResult, SymbolName } from "../type/mahjongWays2_Types";
import mahjongWays2_GameState, { GameState } from "../ui/gamestate/mahjongWays2_GameState";
import mahjongWays2_UIFactory from "../../../../script/ui/pq_UIFactory";
import { ClipPart, mahjongWays2_Audio } from "./mahjongWays2_Audio";
import mahjongWays2_AudioPlayer from "./mahjongWays2_AudioPlayer";

export class mahjongWays2_AudioController {

    private mahjongWays2_DataRepository: mahjongWays2_DataRepository;

    private mahjongWays2_GameState: mahjongWays2_GameState;

    private mahjongWays2_Audio: mahjongWays2_Audio;

    private node: Node;

    private spinAudioPlayer: mahjongWays2_AudioPlayer;

    private winEffectAudioPlayer: mahjongWays2_AudioPlayer;

    private clipParts: Array<ClipPart>;

    private isMute: boolean;

    private previousMultipleClipIndex: number;

    private afkTimeout: ReturnType<typeof setTimeout>;

    private isAFK: boolean;

    private previousRandomTalk: number;

    public constructor() {

    }

    public async init(mahjongWays2_AudioControllerParameter: mahjongWays2_AudioControllerParameter) {
        const parent = mahjongWays2_AudioControllerParameter.parent;
        const mahjongWays2_UIFactory = mahjongWays2_AudioControllerParameter.mahjongWays2_UIFactory;
        const mahjongWays2_EventRepository = mahjongWays2_AudioControllerParameter.mahjongWays2_EventRepository;
        const mahjongWays2_DataRepository = mahjongWays2_AudioControllerParameter.mahjongWays2_DataRepository;
        const mahjongWays2_GameState = mahjongWays2_AudioControllerParameter.mahjongWays2_GameState;

        this.mahjongWays2_DataRepository = mahjongWays2_DataRepository;
        this.mahjongWays2_GameState = mahjongWays2_GameState;

        this.isAFK = true;

        const node = mahjongWays2_UIFactory.createNode({
            parent: parent,
            name: "mahjongWays2_AudioController"
        });
        this.node = node;

        this.mahjongWays2_Audio = new mahjongWays2_Audio(node);

        const trashTalkClip = await mahjongWays2_UIFactory.assetRepository.getAsset<AudioClip>("mahjong-ways2/audio/trashTalk", AudioClip);
        const effects = await mahjongWays2_UIFactory.assetRepository.getAsset<AudioClip>("mahjong-ways2/audio/effects", AudioClip);
        const normalGamebackgroundMusic = await mahjongWays2_UIFactory.assetRepository.getAsset<AudioClip>("mahjong-ways2/audio/normalGamebackgroundMusic", AudioClip);
        const freeGamebackgroundMusic = await mahjongWays2_UIFactory.assetRepository.getAsset<AudioClip>("mahjong-ways2/audio/freeGamebackgroundMusic", AudioClip);
        this.mahjongWays2_Audio.playBGM(normalGamebackgroundMusic);

        const clipParts = [
            { audioClip: trashTalkClip, name: "中三個以上的胡", startTime: 0, endTime: 2.3 },//oooooooooooook
            { audioClip: trashTalkClip, name: "double", startTime: 3, endTime: 3.7 },//oooooooooooook
            { audioClip: trashTalkClip, name: "triple", startTime: 4, endTime: 4.6 },//oooooooooooook
            { audioClip: trashTalkClip, name: "quadruple", startTime: 5, endTime: 5.7 },//oooooooooooook
            { audioClip: trashTalkClip, name: "sextuple", startTime: 6, endTime: 6.7 },//oooooooooooook
            { audioClip: trashTalkClip, name: "decuple", startTime: 7, endTime: 7.77 },//oooooooooooook
            { audioClip: trashTalkClip, name: "quintuple", startTime: 8, endTime: 8.63 },//oooooooooooook
            { audioClip: trashTalkClip, name: "二條", startTime: 9.12, endTime: 9.7 },//oooooooooooook
            { audioClip: trashTalkClip, name: "二筒", startTime: 10, endTime: 10.8 },//oooooooooooook
            { audioClip: trashTalkClip, name: "五條", startTime: 11.15, endTime: 11.69 },//oooooooooooook
            { audioClip: trashTalkClip, name: "五筒", startTime: 12.05, endTime: 13.4 },//oooooooooooook
            { audioClip: trashTalkClip, name: "八萬", startTime: 14.14, endTime: 14.78 },//oooooooooooook
            { audioClip: trashTalkClip, name: "白板", startTime: 15.12, endTime: 15.97 },//oooooooooooook
            { audioClip: trashTalkClip, name: "發財", startTime: 17, endTime: 17.54 },//oooooooooooook
            { audioClip: trashTalkClip, name: "紅中", startTime: 18.15, endTime: 19.05 },//oooooooooooook
            { audioClip: trashTalkClip, name: "全中", startTime: 20, endTime: 21.1 },//oooooooooooook
            { audioClip: trashTalkClip, name: "全中", startTime: 22, endTime: 23.1 },//oooooooooooook
            { audioClip: trashTalkClip, name: "語音:可以看到你的牌", startTime: 24, endTime: 26.55 },//oooooooooooook
            { audioClip: trashTalkClip, name: "語音:快一點等得花都謝??????????", startTime: 27.1, endTime: 29.95 },//oooooooooooook
            { audioClip: trashTalkClip, name: "語音:好歹讓我吃一個?????", startTime: 30.07, endTime: 31.77 },//oooooooooooook
            { audioClip: trashTalkClip, name: "語音:?????", startTime: 32, endTime: 33.7 },//oooooooooooook
            { audioClip: trashTalkClip, name: "語音:?????", startTime: 34.2, endTime: 36.7 },//oooooooooooook
            { audioClip: trashTalkClip, name: "語音:?????", startTime: 37, endTime: 38.6 },//oooooooooooook
            { audioClip: trashTalkClip, name: "語音:?????", startTime: 39, endTime: 40.5 },//oooooooooooook
            { audioClip: trashTalkClip, name: "語音:?????", startTime: 41, endTime: 42.8 },//oooooooooooook
            { audioClip: trashTalkClip, name: "語音:?????", startTime: 43, endTime: 43.92 },//oooooooooooook
            { audioClip: trashTalkClip, name: "語音:?????", startTime: 44, endTime: 46.15 },//oooooooooooook
            { audioClip: trashTalkClip, name: "語音:?????", startTime: 47, endTime: 49.8 },//oooooooooooook
            { audioClip: trashTalkClip, name: "語音:?????", startTime: 50, endTime: 52.75 },//oooooooooooook
            { audioClip: effects, name: "大獎特效跳數字", startTime: 0, endTime: 20.8 },//oooooooooooook
            { audioClip: effects, name: "大獎特效數字跳完", startTime: 20.994, endTime: 29.9 },//oooooooooooook
            { audioClip: effects, name: "freegame贏得免費旋轉頁面 接另一首背景音樂", startTime: 29.975, endTime: 32.2 },//oooooooooooook
            { audioClip: effects, name: "freegame結算跳數字", startTime: 33.001, endTime: 35.181 },//oooooooooooook
            { audioClip: effects, name: "freegame結算數字跳完", startTime: 35.976, endTime: 40.906 },//oooooooooooook
            { audioClip: effects, name: "freegame剩餘次數-1時", startTime: 40.978, endTime: 41.92 },//oooooooooooook
            { audioClip: effects, name: "胡咪牌沒中", startTime: 41.957, endTime: 42.929 },//oooooooooooook
            { audioClip: effects, name: "第三個胡咪牌", startTime: 42.96, endTime: 48.79 },//oooooooooooook
            { audioClip: effects, name: "中三個以上胡", startTime: 49.024, endTime: 51.815 },//oooooooooooook
            { audioClip: effects, name: "", startTime: 51.983, endTime: 52.316 },//38 像點擊的聲音
            { audioClip: effects, name: "跑馬燈贏得五倍以上", startTime: 53.172, endTime: 54.708 },//oooooooooooook
            { audioClip: effects, name: "", startTime: 54.974, endTime: 55.88 },//40 洞洞兩聲
            { audioClip: effects, name: "", startTime: 55.978, endTime: 58.181 },//41 像洞窟的聲音
            { audioClip: effects, name: "", startTime: 58.96, endTime: 59.576 },//42 低沉的射擊聲
            { audioClip: effects, name: "跑馬燈共贏得", startTime: 60.013, endTime: 61.049 },//oooooooooooook
            { audioClip: effects, name: "跑馬燈大獎共贏得", startTime: 62.002, endTime: 64.176 },//oooooooooooook
            { audioClip: effects, name: "跑馬燈共贏得跳數字", startTime: 64.97, endTime: 66.028 },//oooooooooooook
            { audioClip: effects, name: "跑馬燈共贏得跳數字結束", startTime: 66.977, endTime: 68.136 },//oooooooooooook
            { audioClip: effects, name: "2、4倍", startTime: 68.978, endTime: 70.449 },//oooooooooooook
            { audioClip: effects, name: "3、6倍", startTime: 70.976, endTime: 72.476 },//oooooooooooook
            { audioClip: effects, name: "5、10倍", startTime: 72.963, endTime: 74.688 },//oooooooooooook
            { audioClip: effects, name: "轉換成freegame賠率時", startTime: 74.966, endTime: 76.995 },
            { audioClip: effects, name: "連線全中", startTime: 76.974, endTime: 79.024 },//oooooooooooook
            { audioClip: effects, name: "連線", startTime: 79.006, endTime: 80.832 },//oooooooooooook
            { audioClip: effects, name: "一輪轉動時", startTime: 81, endTime: 82.493, isLoop: true },//oooooooooooook
            { audioClip: effects, name: "急停", startTime: 83.005, endTime: 83.396 },//oooooooooooook
            { audioClip: effects, name: "一輪轉完時", startTime: 83.998, endTime: 84.158 },//oooooooooooook
            { audioClip: effects, name: "下注按鈕點擊時", startTime: 84.981, endTime: 85.742 },//oooooooooooook
            { audioClip: effects, name: "麻將掉落", startTime: 85.988, endTime: 86.061 },//oooooooooooook
            { audioClip: effects, name: "停止旋轉時轉到胡", startTime: 87.212, endTime: 88.553 },//oooooooooooook
            { audioClip: effects, name: "連線後符號轉成錢瞬間", startTime: 89.189, endTime: 89.819 },//oooooooooooook
            { audioClip: effects, name: "金麻將轉成百搭時", startTime: 90.147, endTime: 91.335 },//oooooooooooook
            { audioClip: effects, name: "點擊符號顯示賠率時", startTime: 91.977, endTime: 92.112 },//oooooooooooook
            { audioClip: effects, name: "freegame領獎按鈕", startTime: 92.991, endTime: 93.855 },//oooooooooooook
            { audioClip: effects, name: "freegame開始按鈕", startTime: 93.971, endTime: 94.489 },//oooooooooooook
            { audioClip: effects, name: "", startTime: 95.080, endTime: 95.467 },//64 掠過的聲音
        ];
        this.clipParts = clipParts;

        this.startCountdownAFK(3000);

        mahjongWays2_EventRepository.onReelEffect.Attach(() => {
            this.mahjongWays2_Audio.playByClipPart(clipParts[36]);
        });
        mahjongWays2_EventRepository.onEffectSpinNoScatters.Attach(() => {
            this.mahjongWays2_Audio.playByClipPart(clipParts[35]);
        });

        mahjongWays2_EventRepository.onStartMarqueeTweenToNumber.Attach(() => {
            this.mahjongWays2_Audio.playByClipPart(clipParts[45]);
        });
        mahjongWays2_EventRepository.onMarqueeTweenToNumberFinished.Attach(() => {
            this.mahjongWays2_Audio.playByClipPart(clipParts[46]);
        });

        mahjongWays2_EventRepository.onFreeGameSettle.Attach(() => {
            this.muteBGM(true);
        });

        mahjongWays2_EventRepository.onReceiveFreeGameRewardClicked.Attach(() => {
            this.muteBGM(false);
        });

        mahjongWays2_EventRepository.onWinEffectTweenToNumberStarted.Attach(() => {
            this.muteBGM(true);
        });

        mahjongWays2_EventRepository.onWinEffectTweenToNumberFinished.Attach(() => {
            this.muteBGM(false);
        });

        mahjongWays2_EventRepository.onMute.Attach((isMute) => {
            this.isMute = isMute;
            this.mahjongWays2_Audio.muteAll(isMute);
        });

        mahjongWays2_EventRepository.onWinEffectTweenToNumberStarted.Attach(() => {
            if (this.winEffectAudioPlayer != null) {
                this.winEffectAudioPlayer.stop();
                this.winEffectAudioPlayer = null;
            }
            this.winEffectAudioPlayer = this.mahjongWays2_Audio.playByClipPart(clipParts[29]);
        });

        mahjongWays2_EventRepository.onWinEffectTweenToNumberFinished.Attach(() => {
            if (this.winEffectAudioPlayer != null) {
                this.winEffectAudioPlayer.stop();
                this.winEffectAudioPlayer = null;
            }
            this.mahjongWays2_Audio.playByClipPart(clipParts[30]);
        });

        mahjongWays2_EventRepository.onSpinButtonClicked.Attach(() => {
            this.mahjongWays2_Audio.playByClipPart(clipParts[56]);
            this.isAFK = false;
            this.stopCountdownAFK();
        });

        mahjongWays2_EventRepository.onResultFinished.Attach(() => {
            if (this.mahjongWays2_DataRepository.isFreeGame) {
                console.log(`[mahjongWays2_AudioController] isFreeGame`);
                return;
            }
            this.isAFK = true;
            this.startCountdownAFK(3000);
        });

        mahjongWays2_EventRepository.onReceiveFreeGameRewardClicked.Attach(() => {
            this.isAFK = true;
            this.startCountdownAFK(3000);
        });

        mahjongWays2_EventRepository.onAllReelSpinStarted.Attach(() => {
            if (this.spinAudioPlayer != null) {
                this.spinAudioPlayer.stop();
                this.spinAudioPlayer = null;
            }
            this.spinAudioPlayer = this.mahjongWays2_Audio.playByClipPart(clipParts[53]);
        });

        mahjongWays2_EventRepository.onAllReelSpinFinished.Attach((reelResults) => {
            if (this.spinAudioPlayer != null) {
                this.spinAudioPlayer.stop();
                this.spinAudioPlayer = null;
            }
            const isFreeGame = (mahjongWays2_DataRepository.freeGameCount > 0);
            if (mahjongWays2_DataRepository.isTurboOn && !isFreeGame) {
                this.mahjongWays2_Audio.playByClipPart(clipParts[54]);
            }
            //this.checkSactters(reelResults);
        });

        mahjongWays2_EventRepository.onWinFreeGame.Attach(() => {
            this.mahjongWays2_Audio.playByClipPart(clipParts[0]);
            this.mahjongWays2_Audio.playByClipPart(clipParts[37]);
        });
        //mahjongWays2_EventRepository.onAllReelFallFinished.Attach((reelResults) => {
        //    this.checkSactters(reelResults);
        //});

        mahjongWays2_EventRepository.onReelSpinFinished.Attach(async (reelResult) => {
            this.playReelSpinFinishedEffect();

            const hasScatter = reelResult.symbolResults.slice(4, 8).some(symbolResult => symbolResult.symbolName === SymbolName.Scatter);
            if (hasScatter) {
                await delay(200);
                this.mahjongWays2_Audio.playByClipPart(this.clipParts[58]);
            }
        });

        mahjongWays2_EventRepository.onScatterFall.Attach(async (reelResult) => {
            await delay(200);
            this.mahjongWays2_Audio.playByClipPart(this.clipParts[58]);
        });

        mahjongWays2_EventRepository.onSymbolFallFinished.Attach((mahjongWays2_Symbol) => {
            if (mahjongWays2_Symbol.currentColumnIndex >= 4 && mahjongWays2_Symbol.currentColumnIndex <= 7) {
                this.mahjongWays2_Audio.playByClipPart(clipParts[57]);
            }
        });

        mahjongWays2_EventRepository.onMultiple.Attach((mutilpleParameter) => {
            let multipleClipIndex: number = null;
            const mutiple = mutilpleParameter.multiple;
            const isFreeGame = mutilpleParameter.isFreeGame;
            const isMute = mutilpleParameter.isMute;
            if (isMute) {
                return;
            }
            switch (mutiple) {
                case 2:
                    multipleClipIndex = 1;
                    break;
                case 3:
                    multipleClipIndex = 2;
                    break;
                case 4:
                    multipleClipIndex = 3;
                    break;
                case 5:
                    multipleClipIndex = 6;
                    break;
                case 6:
                    multipleClipIndex = 4;
                    break;
                case 10:
                    multipleClipIndex = 5;
                    break;
            }
            if (multipleClipIndex != null) {
                if (isFreeGame && multipleClipIndex === 1 && this.previousMultipleClipIndex === 1) {

                } else {
                    this.mahjongWays2_Audio.playByClipPart(clipParts[multipleClipIndex]);
                }
                this.previousMultipleClipIndex = multipleClipIndex;
            } else {
                console.log(`[mahjongWays2_AudioController] unknown multiple: ${mutiple}`);
            }

            let effectClipIndex: number = null;
            if (isFreeGame) {
                switch (mutiple) {
                    case 4:
                        effectClipIndex = 47;
                        break;
                    case 6:
                        effectClipIndex = 48;
                        break;
                    case 10:
                        effectClipIndex = 49;
                        break;
                }
            } else {
                switch (mutiple) {
                    case 2:
                        effectClipIndex = 47;
                        break;
                    case 3:
                        effectClipIndex = 48;
                        break;
                    case 5:
                        effectClipIndex = 49;
                        break;
                }
            }
            if (effectClipIndex != null) {
                this.mahjongWays2_Audio.playByClipPart(clipParts[effectClipIndex]);
            } else {
                console.log(`[mahjongWays2_AudioController] unknown mutiple: ${mutiple}`);
            }
        });

        mahjongWays2_EventRepository.onCombine.Attach((reelResults) => {
            const symbolNameSet = new Set<SymbolName>();
            reelResults.forEach(reelResult => {
                reelResult.symbolResults.forEach(symbolResult => {
                    if (symbolResult.symbolName === SymbolName.Wild || symbolResult.symbolName === SymbolName.Scatter) {
                        return;
                    }
                    if (symbolResult.isCombinable) {
                        symbolNameSet.add(symbolResult.symbolName);
                    }
                });
            });

            console.log(`[mahjongWays2_AudioController] SymbolNameSet:`, symbolNameSet);
            this.mahjongWays2_Audio.playByClipPart(clipParts[52]);
            const clipIndexSet = new Set<number>();
            symbolNameSet.forEach(symbolName => {
                switch (symbolName) {
                    case SymbolName.TwoOfDots:
                    case SymbolName.GoldenTwoOfDots:
                        clipIndexSet.add(7);
                        break;
                    case SymbolName.TwoOfBamboos:
                    case SymbolName.GoldenTwoOfBamboos:
                        clipIndexSet.add(8);
                        break;
                    case SymbolName.FiveOfBamboos:
                    case SymbolName.GoldenFiveOfBamboos:
                        clipIndexSet.add(9);
                        break;
                    case SymbolName.FiveOfDots:
                    case SymbolName.GoldenFiveOfDots:
                        clipIndexSet.add(10);
                        break;
                    case SymbolName.EightOfCharacters:
                    case SymbolName.GoldenEightOfCharacters:
                        clipIndexSet.add(11);
                        break;
                    case SymbolName.WhiteDragon:
                    case SymbolName.GoldenWhiteDragon:
                        clipIndexSet.add(12);
                        break;
                    case SymbolName.GreenDragon:
                    case SymbolName.GoldenGreenDragon:
                        clipIndexSet.add(13);
                        break;
                    case SymbolName.RedDragon:
                    case SymbolName.GoldenRedDragon:
                        clipIndexSet.add(14);
                        break;
                }
            });
            console.log(`[mahjongWays2_AudioController] clipIndexSet:`, clipIndexSet);
            if (clipIndexSet.size > 2) {
                const index = (Math.random() > 0.5) ? 15 : 16;
                this.mahjongWays2_Audio.playByClipPart(clipParts[index]);
                this.mahjongWays2_Audio.playByClipPart(clipParts[51]);
            } else {
                clipIndexSet.forEach(clipIndex => {
                    this.mahjongWays2_Audio.playByClipPart(clipParts[clipIndex]);
                });
            }
        });

        mahjongWays2_EventRepository.onFlip.Attach((reelResults) => {
            const symbolNameSet = new Set<SymbolName>();
            reelResults.forEach(reelResult => {
                reelResult.symbolResults.forEach(symbolResult => {
                    if (symbolResult.symbolName === SymbolName.Wild || symbolResult.symbolName === SymbolName.Scatter) {
                        return;
                    }
                    if (symbolResult.isCombinable) {
                        symbolNameSet.add(symbolResult.symbolName);
                    }
                });
            });
            this.mahjongWays2_Audio.playByClipPart(clipParts[59]);

            let hasGoldenMajhon = false;
            symbolNameSet.forEach(symbolName => {
                if (isGoldenMahjong(symbolName)) {
                    hasGoldenMajhon = true;
                }
            });
            if (hasGoldenMajhon) {
                this.mahjongWays2_Audio.playByClipPart(clipParts[60]);
            }
        });

        mahjongWays2_EventRepository.onSymbolGuiderShow.Attach(() => {
            this.mahjongWays2_Audio.playByClipPart(clipParts[61]);
        });

        mahjongWays2_EventRepository.onStartFreeGameButtonClicked.Attach(() => {
            this.mahjongWays2_Audio.playByClipPart(clipParts[63]);
        });

        mahjongWays2_EventRepository.onReceiveFreeGameRewardClicked.Attach(() => {
            this.mahjongWays2_Audio.playByClipPart(clipParts[62]);
            this.mahjongWays2_Audio.playBGM(normalGamebackgroundMusic);
        });

        mahjongWays2_EventRepository.onFreeGame.Attach((freeGameParameter) => {
            this.mahjongWays2_Audio.playByClipPart(clipParts[34]);
            this.mahjongWays2_Audio.playBGM(freeGamebackgroundMusic);
        });

        mahjongWays2_EventRepository.onFreeGamePanelShow.Attach(async () => {
            this.mahjongWays2_Audio.playByClipPart(clipParts[31]);
            await delay(2000);
            this.mahjongWays2_Audio.playBGM(freeGamebackgroundMusic);
        });

        mahjongWays2_EventRepository.onFreeGameSettleStarted.Attach(() => {
            this.mahjongWays2_Audio.playByClipPart(clipParts[32]);
        });

        mahjongWays2_EventRepository.onFreeGameSettleFinished.Attach(() => {
            this.mahjongWays2_Audio.playByClipPart(clipParts[33]);
        });

        mahjongWays2_EventRepository.onTotalWinMoney.Attach(totalWinMoneyParameter => {
            const totalWinMoney = totalWinMoneyParameter.totalWinMoney;
            if (totalWinMoney > 0) {
                this.mahjongWays2_Audio.playByClipPart(clipParts[43]);
            }
        });

        mahjongWays2_EventRepository.onQuintupleSkin.Attach(() => {
            this.mahjongWays2_Audio.playByClipPart(clipParts[39]);
        });

        mahjongWays2_EventRepository.onTotalWinSkin.Attach(() => {
            this.mahjongWays2_Audio.playByClipPart(clipParts[44]);
        });

        let index = -1;
        input.on(Input.EventType.KEY_DOWN, (event: EventKeyboard) => {
            if (event.keyCode === KeyCode.KEY_A) {
                index++;
                console.log(index);
            }

            if (event.keyCode === KeyCode.KEY_S) {
                index--;
                console.error(index);
            }
            if (event.keyCode === KeyCode.KEY_D) {
                this.mahjongWays2_Audio.playByClipPart(clipParts[index]);
            }
            if (event.keyCode === KeyCode.KEY_C) {
                this.mahjongWays2_Audio.stopAllAudioPlayers();
            }

            if (event.keyCode === KeyCode.KEY_Z) {
                this.mahjongWays2_Audio.playBGM(normalGamebackgroundMusic);
            }

            if (event.keyCode === KeyCode.KEY_X) {
                this.mahjongWays2_Audio.playBGM(freeGamebackgroundMusic);
            }
        });

        return this;
    }

    public destroy() {
        this.stopCountdownAFK();
        this.mahjongWays2_Audio.destroy();
        this.mahjongWays2_Audio = null;
        if (isValid(this.node, true)) {
            if (this.node != null) {
                this.node.destroy();
                this.node = null;
            }
        }
    }

    private muteBGM(mute: boolean) {
        if (this.isMute) {
            return;
        }
        this.mahjongWays2_Audio.muteBGM(mute);
    }

    private playReelSpinFinishedEffect() {
        const mahjongWays2_DataRepository = this.mahjongWays2_DataRepository;
        const isFreegame = (mahjongWays2_DataRepository.freeGameCount > 0);
        if (!isFreegame && mahjongWays2_DataRepository.isTurboOn) {
            return;
        }
        this.mahjongWays2_Audio.playByClipPart(this.clipParts[55]);
    }

    private playRandomTalk() {
        const shouldPlayRandomTalk = this.getShouldPlayRandomTalk()
        if (!shouldPlayRandomTalk) {
            this.stopCountdownAFK();
            return;
        }
        const randomTalkIndex = this.getRandomTalkIndex();
        console.log(`[mahjongWays2_AudioController] play randomTalk: ${randomTalkIndex}`);
        this.mahjongWays2_Audio.playByClipPart(this.clipParts[randomTalkIndex], () => {
            const isAFK = this.isAFK;
            if (isAFK) {
                this.startCountdownAFK(6000);
            } else {
                this.stopCountdownAFK();
            }
        });

    }

    private getRandomTalkIndex(): number {
        let randomTalkIndex = this.previousRandomTalk;
        while (randomTalkIndex === this.previousRandomTalk) {
            randomTalkIndex = this.getRandomIntInclusive(17, 28);
        }
        this.previousRandomTalk = randomTalkIndex
        return randomTalkIndex;
    }

    private getShouldPlayRandomTalk(): boolean {
        if (this.mahjongWays2_DataRepository.isFreeGame) {
            console.log(`[mahjongWays2_AudioController] getShouldPlayRandomTalk return false, isFreeGame`);
            return false;
        }
        if (this.mahjongWays2_DataRepository.isFreeGamePanelDisplaying) {
            console.log(`[mahjongWays2_AudioController] getShouldPlayRandomTalk return false, isFreeGamePanelDisplaying`);
            return false;
        }
        if (this.mahjongWays2_DataRepository.isAutoSpin) {
            console.log(`[mahjongWays2_AudioController] getShouldPlayRandomTalk return false, isAutoSpin`);
            return false;
        }
        if (this.mahjongWays2_GameState.gameStateMachine.isState(GameState.Playing)) {
            console.log(`[mahjongWays2_AudioController] getShouldPlayRandomTalk return false, Playing`);
            return false;
        }
        if (!this.isAFK) {
            console.log(`[mahjongWays2_AudioController] getShouldPlayRandomTalk return false, isAFK:${this.isAFK}`);
            return false;
        }
        console.log(`[mahjongWays2_AudioController] getShouldPlayRandomTalk return true`);
        return true;
    }

    private startCountdownAFK(millisecond: number) {
        this.stopCountdownAFK();
        console.log("[mahjongWays2_AudioController] startCountdownAFK", millisecond);
        this.afkTimeout = setTimeout(() => {
            this.playRandomTalk();
        }, millisecond);
    }

    private stopCountdownAFK() {
        console.log("[mahjongWays2_AudioController] stopCountdownAFK");
        if (this.afkTimeout != null) {
            clearTimeout(this.afkTimeout);
            this.afkTimeout = null;
        }
    }

    private getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

interface mahjongWays2_AudioControllerParameter {
    parent: Node;
    mahjongWays2_UIFactory: mahjongWays2_UIFactory;
    mahjongWays2_EventRepository: mahjongWays2_EventRepository;
    mahjongWays2_DataRepository: mahjongWays2_DataRepository;
    mahjongWays2_GameState: mahjongWays2_GameState;
}