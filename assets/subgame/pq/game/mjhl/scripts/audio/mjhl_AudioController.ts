import { input, Input, EventKeyboard, KeyCode, Node, isValid, AudioClip } from "cc";
import mjhl_DataRepository from "../data/mjhl_DataRepository";
import mjhl_EventRepository from "../../../../script/event/pq_EventRepository";
import { isGoldenMahjong } from "../predictor/mjhl_Predictor";
import { delay } from "../timer/mjhl_Timer";
import { ReelResult, SymbolName } from "../type/mjhl_Types";
import mjhl_GameState, { GameState } from "../ui/gamestate/mjhl_GameState";
import mjhl_UIFactory from "../../../../script/ui/pq_UIFactory";
import { ClipPart, mjhl_Audio } from "./mjhl_Audio";
import mjhl_AudioPlayer from "./mjhl_AudioPlayer";

export class mjhl_AudioController {

    private mjhl_DataRepository: mjhl_DataRepository;

    private mjhl_GameState: mjhl_GameState;

    private mjhl_Audio: mjhl_Audio;

    private node: Node;

    private spinAudioPlayer: mjhl_AudioPlayer;

    private winEffectAudioPlayer: mjhl_AudioPlayer;

    private clipParts: Array<ClipPart>;

    private isMute: boolean;

    private previousMultipleClipIndex: number;

    private afkTimeout: ReturnType<typeof setTimeout>;

    private isAFK: boolean;

    private previousRandomTalk: number;

    public constructor() {

    }

    public async init(mjhl_AudioControllerParameter: mjhl_AudioControllerParameter) {
        const parent = mjhl_AudioControllerParameter.parent;
        const mjhl_UIFactory = mjhl_AudioControllerParameter.mjhl_UIFactory;
        const mjhl_EventRepository = mjhl_AudioControllerParameter.mjhl_EventRepository;
        const mjhl_DataRepository = mjhl_AudioControllerParameter.mjhl_DataRepository;
        const mjhl_GameState = mjhl_AudioControllerParameter.mjhl_GameState;

        this.mjhl_DataRepository = mjhl_DataRepository;
        this.mjhl_GameState = mjhl_GameState;

        this.isAFK = true;

        const node = mjhl_UIFactory.createNode({
            parent: parent,
            name: "mjhl_AudioController"
        });
        this.node = node;

        this.mjhl_Audio = new mjhl_Audio(node);

        const trashTalkClip = await mjhl_UIFactory.assetRepository.getAsset<AudioClip>("mjhl/audio/trashTalk", AudioClip);
        const effects = await mjhl_UIFactory.assetRepository.getAsset<AudioClip>("mjhl/audio/effects", AudioClip);
        const normalGamebackgroundMusic = await mjhl_UIFactory.assetRepository.getAsset<AudioClip>("mjhl/audio/normalGamebackgroundMusic", AudioClip);
        const freeGamebackgroundMusic = await mjhl_UIFactory.assetRepository.getAsset<AudioClip>("mjhl/audio/freeGamebackgroundMusic", AudioClip);
        this.mjhl_Audio.playBGM(normalGamebackgroundMusic);

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

        mjhl_EventRepository.onReelEffect.Attach(() => {
            this.mjhl_Audio.playByClipPart(clipParts[36]);
        });
        mjhl_EventRepository.onEffectSpinNoScatters.Attach(() => {
            this.mjhl_Audio.playByClipPart(clipParts[35]);
        });

        mjhl_EventRepository.onStartMarqueeTweenToNumber.Attach(() => {
            this.mjhl_Audio.playByClipPart(clipParts[45]);
        });
        mjhl_EventRepository.onMarqueeTweenToNumberFinished.Attach(() => {
            this.mjhl_Audio.playByClipPart(clipParts[46]);
        });

        mjhl_EventRepository.onFreeGameSettle.Attach(() => {
            this.muteBGM(true);
        });

        mjhl_EventRepository.onReceiveFreeGameRewardClicked.Attach(() => {
            this.muteBGM(false);
        });

        mjhl_EventRepository.onWinEffectTweenToNumberStarted.Attach(() => {
            this.muteBGM(true);
        });

        mjhl_EventRepository.onWinEffectTweenToNumberFinished.Attach(() => {
            this.muteBGM(false);
        });

        mjhl_EventRepository.onMute.Attach((isMute) => {
            this.isMute = isMute;
            this.mjhl_Audio.muteAll(isMute);
        });

        mjhl_EventRepository.onWinEffectTweenToNumberStarted.Attach(() => {
            if (this.winEffectAudioPlayer != null) {
                this.winEffectAudioPlayer.stop();
                this.winEffectAudioPlayer = null;
            }
            this.winEffectAudioPlayer = this.mjhl_Audio.playByClipPart(clipParts[29]);
        });

        mjhl_EventRepository.onWinEffectTweenToNumberFinished.Attach(() => {
            if (this.winEffectAudioPlayer != null) {
                this.winEffectAudioPlayer.stop();
                this.winEffectAudioPlayer = null;
            }
            this.mjhl_Audio.playByClipPart(clipParts[30]);
        });

        mjhl_EventRepository.onSpinButtonClicked.Attach(() => {
            this.mjhl_Audio.playByClipPart(clipParts[56]);
            this.isAFK = false;
            this.stopCountdownAFK();
        });

        mjhl_EventRepository.onResultFinished.Attach(() => {
            if (this.mjhl_DataRepository.isFreeGame) {
                console.log(`[mjhl_AudioController] isFreeGame`);
                return;
            }
            this.isAFK = true;
            this.startCountdownAFK(3000);
        });

        mjhl_EventRepository.onReceiveFreeGameRewardClicked.Attach(() => {
            this.isAFK = true;
            this.startCountdownAFK(3000);
        });

        mjhl_EventRepository.onAllReelSpinStarted.Attach(() => {
            if (this.spinAudioPlayer != null) {
                this.spinAudioPlayer.stop();
                this.spinAudioPlayer = null;
            }
            this.spinAudioPlayer = this.mjhl_Audio.playByClipPart(clipParts[53]);
        });

        mjhl_EventRepository.onAllReelSpinFinished.Attach((reelResults) => {
            if (this.spinAudioPlayer != null) {
                this.spinAudioPlayer.stop();
                this.spinAudioPlayer = null;
            }
            const isFreeGame = (mjhl_DataRepository.freeGameCount > 0);
            if (mjhl_DataRepository.isTurboOn && !isFreeGame) {
                this.mjhl_Audio.playByClipPart(clipParts[54]);
            }
            //this.checkSactters(reelResults);
        });

        mjhl_EventRepository.onWinFreeGame.Attach(() => {
            this.mjhl_Audio.playByClipPart(clipParts[0]);
            this.mjhl_Audio.playByClipPart(clipParts[37]);
        });
        //mjhl_EventRepository.onAllReelFallFinished.Attach((reelResults) => {
        //    this.checkSactters(reelResults);
        //});

        mjhl_EventRepository.onReelSpinFinished.Attach(async (reelResult) => {
            this.playReelSpinFinishedEffect();

            const hasScatter = reelResult.symbolResults.slice(4, 8).some(symbolResult => symbolResult.symbolName === SymbolName.Scatter);
            if (hasScatter) {
                await delay(200);
                this.mjhl_Audio.playByClipPart(this.clipParts[58]);
            }
        });

        mjhl_EventRepository.onScatterFall.Attach(async (reelResult) => {
            await delay(200);
            this.mjhl_Audio.playByClipPart(this.clipParts[58]);
        });

        mjhl_EventRepository.onSymbolFallFinished.Attach((mjhl_Symbol) => {
            if (mjhl_Symbol.currentColumnIndex >= 4 && mjhl_Symbol.currentColumnIndex <= 7) {
                this.mjhl_Audio.playByClipPart(clipParts[57]);
            }
        });

        mjhl_EventRepository.onMultiple.Attach((mutilpleParameter) => {
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
                    this.mjhl_Audio.playByClipPart(clipParts[multipleClipIndex]);
                }
                this.previousMultipleClipIndex = multipleClipIndex;
            } else {
                console.log(`[mjhl_AudioController] unknown multiple: ${mutiple}`);
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
                this.mjhl_Audio.playByClipPart(clipParts[effectClipIndex]);
            } else {
                console.log(`[mjhl_AudioController] unknown mutiple: ${mutiple}`);
            }
        });

        mjhl_EventRepository.onCombine.Attach((reelResults) => {
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

            console.log(`[mjhl_AudioController] SymbolNameSet:`, symbolNameSet);
            this.mjhl_Audio.playByClipPart(clipParts[52]);
            const clipIndexSet = new Set<number>();
            symbolNameSet.forEach(symbolName => {
                switch (symbolName) {
                    case SymbolName.TwoOfBamboos:
                    case SymbolName.GoldenTwoOfBamboos:
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
            console.log(`[mjhl_AudioController] clipIndexSet:`, clipIndexSet);
            if (clipIndexSet.size > 2) {
                const index = (Math.random() > 0.5) ? 15 : 16;
                this.mjhl_Audio.playByClipPart(clipParts[index]);
                this.mjhl_Audio.playByClipPart(clipParts[51]);
            } else {
                clipIndexSet.forEach(clipIndex => {
                    this.mjhl_Audio.playByClipPart(clipParts[clipIndex]);
                });
            }
        });

        mjhl_EventRepository.onFlip.Attach((reelResults) => {
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
            this.mjhl_Audio.playByClipPart(clipParts[59]);

            let hasGoldenMajhon = false;
            symbolNameSet.forEach(symbolName => {
                if (isGoldenMahjong(symbolName)) {
                    hasGoldenMajhon = true;
                }
            });
            if (hasGoldenMajhon) {
                this.mjhl_Audio.playByClipPart(clipParts[60]);
            }
        });

        mjhl_EventRepository.onSymbolGuiderShow.Attach(() => {
            this.mjhl_Audio.playByClipPart(clipParts[61]);
        });

        mjhl_EventRepository.onStartFreeGameButtonClicked.Attach(() => {
            this.mjhl_Audio.playByClipPart(clipParts[63]);
        });

        mjhl_EventRepository.onReceiveFreeGameRewardClicked.Attach(() => {
            this.mjhl_Audio.playByClipPart(clipParts[62]);
            this.mjhl_Audio.playBGM(normalGamebackgroundMusic);
        });

        mjhl_EventRepository.onFreeGame.Attach((freeGameParameter) => {
            this.mjhl_Audio.playByClipPart(clipParts[34]);
            this.mjhl_Audio.playBGM(freeGamebackgroundMusic);
        });

        mjhl_EventRepository.onFreeGamePanelShow.Attach(async () => {
            this.mjhl_Audio.playByClipPart(clipParts[31]);
            await delay(2000);
            this.mjhl_Audio.playBGM(freeGamebackgroundMusic);
        });

        mjhl_EventRepository.onFreeGameSettleStarted.Attach(() => {
            this.mjhl_Audio.playByClipPart(clipParts[32]);
        });

        mjhl_EventRepository.onFreeGameSettleFinished.Attach(() => {
            this.mjhl_Audio.playByClipPart(clipParts[33]);
        });

        mjhl_EventRepository.onTotalWinMoney.Attach(totalWinMoneyParameter => {
            const totalWinMoney = totalWinMoneyParameter.totalWinMoney;
            if (totalWinMoney > 0) {
                this.mjhl_Audio.playByClipPart(clipParts[43]);
            }
        });

        mjhl_EventRepository.onQuintupleSkin.Attach(() => {
            this.mjhl_Audio.playByClipPart(clipParts[39]);
        });

        mjhl_EventRepository.onTotalWinSkin.Attach(() => {
            this.mjhl_Audio.playByClipPart(clipParts[44]);
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
                this.mjhl_Audio.playByClipPart(clipParts[index]);
            }
            if (event.keyCode === KeyCode.KEY_C) {
                this.mjhl_Audio.stopAllAudioPlayers();
            }

            if (event.keyCode === KeyCode.KEY_Z) {
                this.mjhl_Audio.playBGM(normalGamebackgroundMusic);
            }

            if (event.keyCode === KeyCode.KEY_X) {
                this.mjhl_Audio.playBGM(freeGamebackgroundMusic);
            }
        });

        return this;
    }

    public destroy() {
        this.stopCountdownAFK();
        this.mjhl_Audio.destroy();
        this.mjhl_Audio = null;
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
        this.mjhl_Audio.muteBGM(mute);
    }

    private playReelSpinFinishedEffect() {
        const mjhl_DataRepository = this.mjhl_DataRepository;
        const isFreegame = (mjhl_DataRepository.freeGameCount > 0);
        if (!isFreegame && mjhl_DataRepository.isTurboOn) {
            return;
        }
        this.mjhl_Audio.playByClipPart(this.clipParts[55]);
    }

    private playRandomTalk() {
        const shouldPlayRandomTalk = this.getShouldPlayRandomTalk()
        if (!shouldPlayRandomTalk) {
            this.stopCountdownAFK();
            return;
        }
        const randomTalkIndex = this.getRandomTalkIndex();
        console.log(`[mjhl_AudioController] play randomTalk: ${randomTalkIndex}`);
        this.mjhl_Audio.playByClipPart(this.clipParts[randomTalkIndex], () => {
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
        if (this.mjhl_DataRepository.isFreeGame) {
            console.log(`[mjhl_AudioController] getShouldPlayRandomTalk return false, isFreeGame`);
            return false;
        }
        if (this.mjhl_DataRepository.isFreeGamePanelDisplaying) {
            console.log(`[mjhl_AudioController] getShouldPlayRandomTalk return false, isFreeGamePanelDisplaying`);
            return false;
        }
        if (this.mjhl_DataRepository.isAutoSpin) {
            console.log(`[mjhl_AudioController] getShouldPlayRandomTalk return false, isAutoSpin`);
            return false;
        }
        if (this.mjhl_GameState.gameStateMachine.isState(GameState.Playing)) {
            console.log(`[mjhl_AudioController] getShouldPlayRandomTalk return false, Playing`);
            return false;
        }
        if (!this.isAFK) {
            console.log(`[mjhl_AudioController] getShouldPlayRandomTalk return false, isAFK:${this.isAFK}`);
            return false;
        }
        console.log(`[mjhl_AudioController] getShouldPlayRandomTalk return true`);
        return true;
    }

    private startCountdownAFK(millisecond: number) {
        this.stopCountdownAFK();
        console.log("[mjhl_AudioController] startCountdownAFK", millisecond);
        this.afkTimeout = setTimeout(() => {
            this.playRandomTalk();
        }, millisecond);
    }

    private stopCountdownAFK() {
        console.log("[mjhl_AudioController] stopCountdownAFK");
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

interface mjhl_AudioControllerParameter {
    parent: Node;
    mjhl_UIFactory: mjhl_UIFactory;
    mjhl_EventRepository: mjhl_EventRepository;
    mjhl_DataRepository: mjhl_DataRepository;
    mjhl_GameState: mjhl_GameState;
}