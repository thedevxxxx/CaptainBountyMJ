import { input, Input, EventKeyboard, KeyCode, Node, isValid, AudioClip } from "cc";
// import mahjongWays_DataRepository from "../data/mahjongWaysDataRepository";
// import mahjongWays_EventRepository from "../../../../script/event/pq_EventRepository";
import { isGoldenMahjong } from "../predictor/mahjongWaysPredictor";
import { delay } from "../../../../script/subgame/common/BaseTimer";
import { ReelResult, SymbolName } from "../../scripts/type/mahjongWays_Types";
import mahjongWays_GameState, { GameState } from "../../scripts/ui/gamestate/mahjongWays_GameState";
import mahjongWays_UIFactory from "../../../../script/ui/pq_UIFactory";
import { ClipPart, mahjongWaysAudio } from "./mahjongWaysAudio";
import mahjongWaysAudioPlayer from "./mahjongWaysAudioPlayer";
import { mahjongWaysNetManager as netMgr ,mahjongWaysEventType}  from "../network/mahjongWaysNetManager";

import { _decorator, Component } from 'cc';

const { ccclass,property } = _decorator;

@ccclass('mahjongWaysAudioController')
export class mahjongWaysAudioController extends Component {

    // private mahjongWays_DataRepository: mahjongWays_DataRepository;

    private mahjongWays_GameState: mahjongWays_GameState;

    private mahjongWaysAudio: mahjongWaysAudio;

    private spinAudioPlayer: mahjongWaysAudioPlayer;

    private winEffectAudioPlayer: mahjongWaysAudioPlayer;

    private clipParts: Array<ClipPart>;

    private isMute: boolean;

    private previousMultipleClipIndex: number;

    private afkTimeout: ReturnType<typeof setTimeout>;

    private isAFK: boolean;

    private previousRandomTalk: number;

    @property(AudioClip)
    trashTalkClip:AudioClip = null;

    @property(AudioClip)
    effects:AudioClip = null;

    @property(AudioClip)
    normalGamebackgroundMusic:AudioClip = null;

    @property(AudioClip)
    freeGamebackgroundMusic:AudioClip = null;

    start () {
        this.init();
        this.addEvent();
    }

    public init() {

        this.isAFK = true;
        this.mahjongWaysAudio = new mahjongWaysAudio(this.node);
        this.mahjongWaysAudio.playBGM(this.normalGamebackgroundMusic);

        this.clipParts = [
            { audioClip: this.trashTalkClip, name: "中三個以上的胡", startTime: 0, endTime: 2.3 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "double", startTime: 3, endTime: 3.7 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "triple", startTime: 4, endTime: 4.6 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "quadruple", startTime: 5, endTime: 5.7 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "sextuple", startTime: 6, endTime: 6.7 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "decuple", startTime: 7, endTime: 7.77 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "quintuple", startTime: 8, endTime: 8.63 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "二條", startTime: 9.12, endTime: 9.7 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "二筒", startTime: 10, endTime: 10.8 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "五條", startTime: 11.15, endTime: 11.69 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "五筒", startTime: 12.05, endTime: 13.4 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "八萬", startTime: 14.14, endTime: 14.78 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "白板", startTime: 15.12, endTime: 15.97 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "發財", startTime: 17, endTime: 17.54 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "紅中", startTime: 18.15, endTime: 19.05 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "全中", startTime: 20, endTime: 21.1 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "全中", startTime: 22, endTime: 23.1 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "語音:可以看到你的牌", startTime: 24, endTime: 26.55 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "語音:快一點等得花都謝??????????", startTime: 27.1, endTime: 29.95 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "語音:好歹讓我吃一個?????", startTime: 30.07, endTime: 31.77 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "語音:?????", startTime: 32, endTime: 33.7 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "語音:?????", startTime: 34.2, endTime: 36.7 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "語音:?????", startTime: 37, endTime: 38.6 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "語音:?????", startTime: 39, endTime: 40.5 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "語音:?????", startTime: 41, endTime: 42.8 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "語音:?????", startTime: 43, endTime: 43.92 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "語音:?????", startTime: 44, endTime: 46.15 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "語音:?????", startTime: 47, endTime: 49.8 },//oooooooooooook
            { audioClip: this.trashTalkClip, name: "語音:?????", startTime: 50, endTime: 52.75 },//oooooooooooook
            { audioClip: this.effects, name: "大獎特效跳數字", startTime: 0, endTime: 20.8 },//oooooooooooook
            { audioClip: this.effects, name: "大獎特效數字跳完", startTime: 20.994, endTime: 29.9 },//oooooooooooook
            { audioClip: this.effects, name: "freegame贏得免費旋轉頁面 接另一首背景音樂", startTime: 29.975, endTime: 32.2 },//oooooooooooook
            { audioClip: this.effects, name: "freegame結算跳數字", startTime: 33.001, endTime: 35.181 },//oooooooooooook
            { audioClip: this.effects, name: "freegame結算數字跳完", startTime: 35.976, endTime: 40.906 },//oooooooooooook
            { audioClip: this.effects, name: "freegame剩餘次數-1時", startTime: 40.978, endTime: 41.92 },//oooooooooooook
            { audioClip: this.effects, name: "胡咪牌沒中", startTime: 41.957, endTime: 42.929 },//oooooooooooook
            { audioClip: this.effects, name: "第三個胡咪牌", startTime: 42.96, endTime: 48.79 },//oooooooooooook
            { audioClip: this.effects, name: "中三個以上胡", startTime: 49.024, endTime: 51.815 },//oooooooooooook
            { audioClip: this.effects, name: "", startTime: 51.983, endTime: 52.316 },//38 像點擊的聲音
            { audioClip: this.effects, name: "跑馬燈贏得五倍以上", startTime: 53.172, endTime: 54.708 },//oooooooooooook
            { audioClip: this.effects, name: "", startTime: 54.974, endTime: 55.88 },//40 洞洞兩聲
            { audioClip: this.effects, name: "", startTime: 55.978, endTime: 58.181 },//41 像洞窟的聲音
            { audioClip: this.effects, name: "", startTime: 58.96, endTime: 59.576 },//42 低沉的射擊聲
            { audioClip: this.effects, name: "跑馬燈共贏得", startTime: 60.013, endTime: 61.049 },//oooooooooooook
            { audioClip: this.effects, name: "跑馬燈大獎共贏得", startTime: 62.002, endTime: 64.176 },//oooooooooooook
            { audioClip: this.effects, name: "跑馬燈共贏得跳數字", startTime: 64.97, endTime: 66.028 },//oooooooooooook
            { audioClip: this.effects, name: "跑馬燈共贏得跳數字結束", startTime: 66.977, endTime: 68.136 },//oooooooooooook
            { audioClip: this.effects, name: "2、4倍", startTime: 68.978, endTime: 70.449 },//oooooooooooook
            { audioClip: this.effects, name: "3、6倍", startTime: 70.976, endTime: 72.476 },//oooooooooooook
            { audioClip: this.effects, name: "5、10倍", startTime: 72.963, endTime: 74.688 },//oooooooooooook
            { audioClip: this.effects, name: "轉換成freegame賠率時", startTime: 74.966, endTime: 76.995 },
            { audioClip: this.effects, name: "連線全中", startTime: 76.974, endTime: 79.024 },//oooooooooooook
            { audioClip: this.effects, name: "連線", startTime: 79.006, endTime: 80.832 },//oooooooooooook
            { audioClip: this.effects, name: "一輪轉動時", startTime: 81, endTime: 82.493, isLoop: true },//oooooooooooook
            { audioClip: this.effects, name: "急停", startTime: 83.005, endTime: 83.396 },//oooooooooooook
            { audioClip: this.effects, name: "一輪轉完時", startTime: 83.998, endTime: 84.158 },//oooooooooooook
            { audioClip: this.effects, name: "下注按鈕點擊時", startTime: 84.981, endTime: 85.742 },//oooooooooooook
            { audioClip: this.effects, name: "麻將掉落", startTime: 85.988, endTime: 86.061 },//oooooooooooook
            { audioClip: this.effects, name: "停止旋轉時轉到胡", startTime: 87.212, endTime: 88.553 },//oooooooooooook
            { audioClip: this.effects, name: "連線後符號轉成錢瞬間", startTime: 89.189, endTime: 89.819 },//oooooooooooook
            { audioClip: this.effects, name: "金麻將轉成百搭時", startTime: 90.147, endTime: 91.335 },//oooooooooooook
            { audioClip: this.effects, name: "點擊符號顯示賠率時", startTime: 91.977, endTime: 92.112 },//oooooooooooook
            { audioClip: this.effects, name: "freegame領獎按鈕", startTime: 92.991, endTime: 93.855 },//oooooooooooook
            { audioClip: this.effects, name: "freegame開始按鈕", startTime: 93.971, endTime: 94.489 },//oooooooooooook
            { audioClip: this.effects, name: "", startTime: 95.080, endTime: 95.467 },//64 掠過的聲音
        ];
        // this.startCountdownAFK(3000);
    }


    protected addEvent() {
        netMgr.evRepo.register("onReelEffect", this, () => { this.mahjongWaysAudio.playByClipPart(this.clipParts[36]) });
        netMgr.evRepo.register("onStartMarqueeTweenToNumber", this, () => { this.mahjongWaysAudio.playByClipPart(this.clipParts[45]) });
        netMgr.evRepo.register("onMarqueeTweenToNumberFinished", this, () => { this.mahjongWaysAudio.playByClipPart(this.clipParts[46]) });
        
        netMgr.evRepo.register("onFreeGameSettle", this, () => { this.muteBGM(true); });
        netMgr.evRepo.register("onMute", this, (isMute) => {
            this.isMute = isMute;
            this.mahjongWaysAudio.muteAll(isMute);
        });

        netMgr.evRepo.register("onWinEffectTweenToNumberStarted", this, () => {
            this.muteBGM(true);
            if (this.winEffectAudioPlayer != null) {
                this.winEffectAudioPlayer.stop();
                this.winEffectAudioPlayer = null;
            }
            this.winEffectAudioPlayer = this.mahjongWaysAudio.playByClipPart(this.clipParts[29]);
        });

        netMgr.evRepo.register("onWinEffectTweenToNumberFinished", this, () => {
            this.muteBGM(false);
            if (this.winEffectAudioPlayer != null) {
                this.winEffectAudioPlayer.stop();
                this.winEffectAudioPlayer = null;
            }
            this.mahjongWaysAudio.playByClipPart(this.clipParts[30]);
        });

        netMgr.evRepo.register("onSpinButtonClicked", this, () => {
            this.mahjongWaysAudio.playByClipPart(this.clipParts[56]);
            this.isAFK = false;
            this.stopCountdownAFK();
        });

        netMgr.evRepo.register("onResultFinished", this,(isFreeGame) => {
            if (isFreeGame) {
                console.log(`[mahjongWaysAudioController] isFreeGame`);
                return;
            }
            this.isAFK = true;
            this.startCountdownAFK(3000);
        });

        netMgr.evRepo.register("onAllReelSpinStarted", this, () => {
            if (this.spinAudioPlayer != null) {
                this.spinAudioPlayer.stop();
                this.spinAudioPlayer = null;
            }
            this.spinAudioPlayer = this.mahjongWaysAudio.playByClipPart(this.clipParts[53]);
        });
        
        netMgr.evRepo.register("onAllReelSpinFinished", this, (data) => {
            if (this.spinAudioPlayer != null) {
                this.spinAudioPlayer.stop();
                this.spinAudioPlayer = null;
            }
            const isFreeGame = (data.freeGameCount > 0);
            if (data.isTurboOn && !isFreeGame) {
                this.mahjongWaysAudio.playByClipPart(this.clipParts[54]);
            }
            //this.checkSactters(reelResults);
        });

        netMgr.evRepo.register("onWinFreeGame", this,() => {
            this.mahjongWaysAudio.playByClipPart(this.clipParts[0]);
            this.mahjongWaysAudio.playByClipPart(this.clipParts[37]);
        });

        netMgr.evRepo.register("onReelSpinFinished", this, async (reelResult) => {
            this.playReelSpinFinishedEffect(reelResult);

            const hasScatter = reelResult.symbolResults.slice(4, 8).some(symbolResult => symbolResult.symbolName === SymbolName.Scatter);
            if (hasScatter) {
                await delay(200);
                this.mahjongWaysAudio.playByClipPart(this.clipParts[58]);
            }
        });

        netMgr.evRepo.register("onScatterFall", this,async (reelResult) => {
            await delay(200);
            this.mahjongWaysAudio.playByClipPart(this.clipParts[58]);
        });

        netMgr.evRepo.register("onSymbolFallFinished", this, (mahjongWays_Symbol) => {
            if (mahjongWays_Symbol.currentColumnIndex >= 4 && mahjongWays_Symbol.currentColumnIndex <= 7) {
                this.mahjongWaysAudio.playByClipPart(this.clipParts[57]);
            }
        });

        netMgr.evRepo.register("onMultiple", this, this.onMultiple.bind(this));

        netMgr.evRepo.register("onCombine", this, this.onCombine.bind(this));

        netMgr.evRepo.register("onFlip", this, (reelResults) => {
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
            this.mahjongWaysAudio.playByClipPart(this.clipParts[59]);

            let hasGoldenMajhon = false;
            symbolNameSet.forEach(symbolName => {
                if (isGoldenMahjong(symbolName)) {
                    hasGoldenMajhon = true;
                }
            });
            if (hasGoldenMajhon) {
                this.mahjongWaysAudio.playByClipPart(this.clipParts[60]);
            }
        });

        netMgr.evRepo.register("onSymbolGuiderShow", this, () => {
            this.mahjongWaysAudio.playByClipPart(this.clipParts[61]);
        });

        netMgr.evRepo.register("onStartFreeGameButtonClicked", this, () => {
            this.mahjongWaysAudio.playByClipPart(this.clipParts[63]);
        });

        netMgr.evRepo.register("onReceiveFreeGameRewardClicked", this, () => {
            this.muteBGM(false); 
            this.isAFK = true;
            this.startCountdownAFK(3000);

            this.mahjongWaysAudio.playByClipPart(this.clipParts[62]);
            this.mahjongWaysAudio.playBGM(this.normalGamebackgroundMusic);
        });

        netMgr.evRepo.register("onFreeGame", this,(freeGameParameter) => {
            this.mahjongWaysAudio.playByClipPart(this.clipParts[34]);
            this.mahjongWaysAudio.playBGM(this.freeGamebackgroundMusic);
        });
        
        netMgr.evRepo.register("onFreeGamePanelShow", this, async () => {
            this.mahjongWaysAudio.playByClipPart(this.clipParts[31]);
            await delay(2000);
            this.mahjongWaysAudio.playBGM(this.freeGamebackgroundMusic);
        });

        netMgr.evRepo.register("onFreeGameSettleStarted", this,() => {
            this.mahjongWaysAudio.playByClipPart(this.clipParts[32]);
        });

        netMgr.evRepo.register("onFreeGameSettleFinished", this, () => {
            this.mahjongWaysAudio.playByClipPart(this.clipParts[33]);
        });

        netMgr.evRepo.register("onTotalWinMoney", this, totalWinMoneyParameter => {
            const totalWinMoney = totalWinMoneyParameter.totalWinMoney;
            if (totalWinMoney > 0) {
                this.mahjongWaysAudio.playByClipPart(this.clipParts[43]);
            }
        });

        netMgr.evRepo.register("onQuintupleSkin", this, () => {
            this.mahjongWaysAudio.playByClipPart(this.clipParts[39]);
        });

        netMgr.evRepo.register("onTotalWinSkin", this,() => {
            this.mahjongWaysAudio.playByClipPart(this.clipParts[44]);
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
                this.mahjongWaysAudio.playByClipPart(this.clipParts[index]);
            }
            if (event.keyCode === KeyCode.KEY_C) {
                this.mahjongWaysAudio.stopAllAudioPlayers();
            }

            if (event.keyCode === KeyCode.KEY_Z) {
                this.mahjongWaysAudio.playBGM(this.normalGamebackgroundMusic);
            }

            if (event.keyCode === KeyCode.KEY_X) {
                this.mahjongWaysAudio.playBGM(this.freeGamebackgroundMusic);
            }
        });
    }

    onMultiple(mutilpleParameter){
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
                this.mahjongWaysAudio.playByClipPart(this.clipParts[multipleClipIndex]);
            }
            this.previousMultipleClipIndex = multipleClipIndex;
        } else {
            console.log(`[mahjongWaysAudioController] unknown multiple: ${mutiple}`);
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
            this.mahjongWaysAudio.playByClipPart(this.clipParts[effectClipIndex]);
        } else {
            console.log(`[mahjongWaysAudioController] unknown mutiple: ${mutiple}`);
        }
    }
    
    onCombine(reelResults){
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

        console.log(`[mahjongWaysAudioController] SymbolNameSet:`, symbolNameSet);
        this.mahjongWaysAudio.playByClipPart(this.clipParts[52]);
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
        console.log(`[mahjongWaysAudioController] clipIndexSet:`, clipIndexSet);
        if (clipIndexSet.size > 2) {
            const index = (Math.random() > 0.5) ? 15 : 16;
            this.mahjongWaysAudio.playByClipPart(this.clipParts[index]);
            this.mahjongWaysAudio.playByClipPart(this.clipParts[51]);
        } else {
            clipIndexSet.forEach(clipIndex => {
                this.mahjongWaysAudio.playByClipPart(this.clipParts[clipIndex]);
            });
        }
    }

    removeEvent(){
        netMgr.evRepo.unregister("onReelEffect", this);
        netMgr.evRepo.unregister("onStartMarqueeTweenToNumber", this);
        netMgr.evRepo.unregister("onMarqueeTweenToNumberFinished", this);

        netMgr.evRepo.unregister("onFreeGameSettle", this);
        netMgr.evRepo.unregister("onMute", this);
        netMgr.evRepo.unregister("onWinEffectTweenToNumberStarted", this);
        netMgr.evRepo.unregister("onWinEffectTweenToNumberFinished", this);

        netMgr.evRepo.unregister("onSpinButtonClicked", this);
        netMgr.evRepo.unregister("onResultFinished", this);

        netMgr.evRepo.unregister("onAllReelSpinStarted", this);
        netMgr.evRepo.unregister("onAllReelSpinFinished", this);

        netMgr.evRepo.unregister("onWinFreeGame", this);

        netMgr.evRepo.unregister("onReelSpinFinished", this);
        netMgr.evRepo.unregister("onScatterFall", this);
        netMgr.evRepo.unregister("onSymbolFallFinished", this);

        netMgr.evRepo.unregister("onMultiple", this);
        netMgr.evRepo.unregister("onCombine", this);
        netMgr.evRepo.unregister("onFlip", this);
        netMgr.evRepo.unregister("onSymbolGuiderShow", this);
        netMgr.evRepo.unregister("onStartFreeGameButtonClicked", this);

        netMgr.evRepo.unregister("onReceiveFreeGameRewardClicked", this);
        netMgr.evRepo.unregister("onFreeGame", this);
        netMgr.evRepo.unregister("onFreeGamePanelShow", this);
        netMgr.evRepo.unregister("onFreeGameSettleStarted", this);
        netMgr.evRepo.unregister("onFreeGameSettleFinished", this);

        netMgr.evRepo.unregister("onTotalWinMoney", this);
        netMgr.evRepo.unregister("onQuintupleSkin", this);
        netMgr.evRepo.unregister("onTotalWinSkin", this);


    }

    public onDestroy() {
        this.stopCountdownAFK();
        this.removeEvent();
        this.mahjongWaysAudio?.destroy();
        this.mahjongWaysAudio = null;
    } 

    private muteBGM(mute: boolean) {
        if (this.isMute) {
            return;
        }
        this.mahjongWaysAudio.muteBGM(mute);
    }

    private playReelSpinFinishedEffect(data) {
        const isFreegame = (data.freeGameCount > 0);
        if (!isFreegame && data.isTurboOn) {
            return;
        }
        this.mahjongWaysAudio.playByClipPart(this.clipParts[55]);
    }

    private playRandomTalk(data) {
        const shouldPlayRandomTalk = this.getShouldPlayRandomTalk(data)
        if (!shouldPlayRandomTalk) {
            this.stopCountdownAFK();
            return;
        }
        const randomTalkIndex = this.getRandomTalkIndex();
        console.log(`[mahjongWaysAudioController] play randomTalk: ${randomTalkIndex}`);
        this.mahjongWaysAudio.playByClipPart(this.clipParts[randomTalkIndex], () => {
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

    private getShouldPlayRandomTalk(data): boolean {
        if (data.isFreeGame) {
            console.log(`[mahjongWaysAudioController] getShouldPlayRandomTalk return false, isFreeGame`);
            return false;
        }
        if (data.isFreeGamePanelDisplaying) {
            console.log(`[mahjongWaysAudioController] getShouldPlayRandomTalk return false, isFreeGamePanelDisplaying`);
            return false;
        }
        if (data.isAutoSpin) {
            console.log(`[mahjongWaysAudioController] getShouldPlayRandomTalk return false, isAutoSpin`);
            return false;
        }
        if (this.mahjongWays_GameState.gameStateMachine.isState(GameState.Playing)) {
            console.log(`[mahjongWaysAudioController] getShouldPlayRandomTalk return false, Playing`);
            return false;
        }
        if (!this.isAFK) {
            console.log(`[mahjongWaysAudioController] getShouldPlayRandomTalk return false, isAFK:${this.isAFK}`);
            return false;
        }
        console.log(`[mahjongWaysAudioController] getShouldPlayRandomTalk return true`);
        return true;
    }

    private startCountdownAFK(millisecond: number) {
        return;
        this.stopCountdownAFK();
        console.log("[mahjongWaysAudioController] startCountdownAFK", millisecond);
        this.afkTimeout = setTimeout(() => {
            this.playRandomTalk(null);
        }, millisecond);
    }

    private stopCountdownAFK() {
        console.log("[mahjongWaysAudioController] stopCountdownAFK");
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

