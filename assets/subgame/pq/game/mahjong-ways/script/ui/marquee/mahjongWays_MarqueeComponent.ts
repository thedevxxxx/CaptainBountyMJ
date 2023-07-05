import { Node, SpriteFrame, Sprite, Tween, Size, Mask, tween, UITransform, Layout, Label, Color, isValid, Vec3, TERRAIN_HEIGHT_BASE } from "cc";
import { formatGold } from "../../../../../script/formatter/pq_Formatter";
import AnimationPlayer from "../../animations/mahjongWays_AnimationPlayer";
// import mahjongWays_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { PQAsset } from "../../../../../script/asset/PQAssetRepository";
import { mahjongWaysNetManager as netMgr ,mahjongWaysEventType}  from "../../network/mahjongWaysNetManager";

import { log,sp,_decorator, Component } from "cc";
const { ccclass,property } = _decorator;


@ccclass('mahjongWays_MarqueeComponent')
export default class mahjongWays_MarqueeComponent extends Component {

    @property(Sprite)
    backgroud:Sprite = null;
    
    @property(Node)
    maskNode:Node = null;

    @property(Node)
    marqueeSpriteNode:Node = null;

    @property(SpriteFrame)
    baseGameMarqueeTexts:SpriteFrame[] = [];

    @property(Node)
    winsLayoutNode:Node = null;

    @property(Node)
    particleSkeletonNode:Node = null;

    @property(Node)
    effectSkeletonNode:Node = null;

    @property(Node)
    winTextSpriteNode:Node = null;

    @property(Node)
    totalWinTextSpriteNode:Node = null;

    @property(Node)
    winLabelNode:Node = null;

    private marqueeSprite: Sprite;

    private marqueeTween: Tween<Node>;

    // private winsLayout: Layout;

    private isMarqueeing: boolean;

    private numberTween: Tween<{ value: number }>;

    private particleAnimationPlayer: AnimationPlayer;

    private effectAnimationPlayer: AnimationPlayer;


    onLoad(){
         this.init();
    }

    start() {
        this.startMarquee();
    }

    onDestroy() {
        this.particleAnimationPlayer.destroy();
        this.particleAnimationPlayer = null;
        this.effectAnimationPlayer.destroy();
        this.effectAnimationPlayer = null;
        this.stopMarquee();
        this.removeEvent();
    }

    private async init() {
        await this.initUI();
        this.addEvent();
    }

    private async initUI() {
        this.particleAnimationPlayer = new AnimationPlayer(this.particleSkeletonNode.getComponent(sp.Skeleton));
        this.effectAnimationPlayer = new AnimationPlayer(this.effectSkeletonNode.getComponent(sp.Skeleton));
    }

    addEvent() {
        netMgr.evRepo.register("onResult", this, this.onResult.bind(this));
        netMgr.evRepo.register("onWinMoney", this, this.onWinMoney.bind(this));
        netMgr.evRepo.register("onTotalWinMoney", this, this.onTotalWinMoney.bind(this));
    }

    removeEvent() {
        netMgr.evRepo.unregister("onResult", this);
        netMgr.evRepo.unregister("onWinMoney", this);
        netMgr.evRepo.unregister("onTotalWinMoney", this);
    }

    onResult() {
        if (!this.isMarqueeing) {
            this.startMarquee();
        }
    }

    onWinMoney(winMoneyParameter) {
            const winMoney = winMoneyParameter.winMoney;
            const accumulatedWinMutiple = winMoneyParameter.accumulatedWinMutiple
            const isGreaterThanQuintuple = (accumulatedWinMutiple >= 5);
            if (winMoney <= 0) {
                return;
            }
            this.showWin(winMoney);
            if (isGreaterThanQuintuple) {
                this.setQuintupleSkin();
                // mahjongWays_EventRepository.getInstance().onQuintupleSkin.Notify();
                netMgr.evRepo.dispatch("onQuintupleSkin", this);

            }
    }

     onTotalWinMoney(totalWinMoneyParameter) {
            const totalWinMoney = totalWinMoneyParameter.totalWinMoney;
            const accumulatedWinMutiple = totalWinMoneyParameter.accumulatedWinMutiple

            if (totalWinMoney <= 0) {
                return;
            }
            const isGreaterThanQuintuple = (accumulatedWinMutiple >= 5);
            const isBigWin = (accumulatedWinMutiple >= 20);
            if (isBigWin) {
                this.showBigTotalWin(totalWinMoney);
            } else {
                if (isGreaterThanQuintuple) {
                    this.showMoreThanQuintupleTotalWin(totalWinMoney);
                } else {
                    this.showTotalWin(totalWinMoney);
                }
            }
    }

    startMarquee() {
        this.stopMarquee();
        this.hideWinsLayout();
        this.showMarqueeSprite();
        this.setMarqueeSkin();
        const spriteFrame = this.baseGameMarqueeTexts[Math.floor(Math.random() * this.baseGameMarqueeTexts.length)];
        const marqueeSprite = this.marqueeSpriteNode;
        const spriteFrameSize = new Size(spriteFrame.originalSize);
        const marqueeSpriteTransform = marqueeSprite.getComponent(UITransform);
        marqueeSprite.setPosition(0, 0);
        marqueeSpriteTransform.setContentSize(spriteFrameSize.width * 0.7, spriteFrameSize.height * 0.7);
        marqueeSprite.getComponent(Sprite).spriteFrame  = spriteFrame;
        let x = 0;
        const spriteFrameWidth = marqueeSpriteTransform.width;
        const maskTransform = this.maskNode.getComponent(UITransform);
        if (spriteFrameWidth > maskTransform.width) {
            marqueeSprite.setPosition((maskTransform.width * 0.5 * -1) + (spriteFrameWidth * 0.55), 0);
            x = (maskTransform.width * 0.5 * -1) + (spriteFrameWidth * 0.5 * -1);
        }
        this.marqueeTween = tween(this.marqueeSpriteNode)
            .delay(1)
            .to(6, { x: x })
            .delay(1)
            .call(() => this.startMarquee())
            .start();

        this.isMarqueeing = true;
    }

    stopMarquee() {
        if (this.marqueeTween != null) {
            this.marqueeTween.stop();
            this.marqueeTween = null;
        }
        this.hideMarqueeSprite();
        this.isMarqueeing = false;
    }

    showWin(win: number) {
        this.stopMarquee();
        this.hideTotalWinTextSprite();
        this.setWinLabelString(formatGold(win));
        this.showWinTextSprite();
        this.showWinsLayout();
        this.playGoldEffect();
    }

    showTotalWin(totalWin: number) {
        this.stopMarquee();
        this.hideWinTextSprite();
        this.setWinLabelString(formatGold(totalWin));
        this.showTotalWinTextSprite();
        this.showWinsLayout();
        this.playGoldEffect();
    }

    private async showMoreThanQuintupleTotalWin(totalWin: number) {
        this.stopMarquee();
        this.hideWinTextSprite();
        this.setWinLabelString("0");
        this.showTotalWinTextSprite();
        this.showWinsLayout();
        await this.startTweenToNumber(0, totalWin, 1);
    }

    private showBigTotalWin(totalWin: number) {
        this.stopMarquee();
        this.hideWinTextSprite();
        this.setWinLabelString(formatGold(totalWin));
        this.showTotalWinTextSprite();
        this.showWinsLayout();
        this.setBigWinSkin();
        // mahjongWays_EventRepository.getInstance().onTotalWinSkin.Notify();
        netMgr.evRepo.dispatch("onTotalWinSkin", this);
        this.playGoldEffect();
        this.effectAnimationPlayer.playAnimationOnce("animation");
    }

    private async setMarqueeSkin() {
        if(!this.backgroud){
            this.backgroud = this.node.getChildByName("backgroud").getComponent(Sprite);
        }
        this.backgroud.spriteFrame = 
            await PQAsset.loadSpriteFrame("game/mahjong-ways/images/mjhl_display_bar1/spriteFrame");
    }

    private async setQuintupleSkin() {
        if(!this.backgroud){
            this.backgroud = this.node.getChildByName("backgroud").getComponent(Sprite);
        }
        this.backgroud.spriteFrame =  
                   await PQAsset.loadSpriteFrame("game/mahjong-ways/images/mjhl_display_bar2/spriteFrame");
    }

    private async setBigWinSkin() {
        if(!this.backgroud){
            this.backgroud = this.node.getChildByName("backgroud").getComponent(Sprite);
        }
        this.backgroud.spriteFrame = 
                    await PQAsset.loadSpriteFrame("game/mahjong-ways/images/mjhl_display_bar3/spriteFrame");
    }

    private showWinsLayout() {
        if(this.winsLayoutNode)
        this.winsLayoutNode.active = true;
    }

    private hideWinsLayout() {
        if(this.winsLayoutNode)
        this.winsLayoutNode.active = false;
    }

    private showMarqueeSprite() {
        if(this.marqueeSpriteNode)
        this.marqueeSpriteNode.active = true;
    }

    private hideMarqueeSprite() {
        if (isValid(this.marqueeSpriteNode, true)) {
            this.marqueeSpriteNode.active = false;
        }
    }

    private showWinTextSprite() {
        this.winTextSpriteNode.active = true;
    }

    private hideWinTextSprite() {
        this.winTextSpriteNode.active = false;
    }

    private showTotalWinTextSprite() {
        this.totalWinTextSpriteNode.active = true;
    }

    private hideTotalWinTextSprite() {
        this.totalWinTextSpriteNode.active = false;
    }

    private setWinLabelString(string: string) {
        this.winLabelNode.getComponent(Label).string = string;
    }

    private async startTweenToNumber(startValue: number, endValue: number, duration: number) {
        return new Promise<void>(resolve => {
            console.log(`[mahjongWays_Marquee] startTweenToNumber ${endValue}`);
            this.stopTweenToNumber();
            const object = { value: startValue };

            // mahjongWays_EventRepository.getInstance().onStartMarqueeTweenToNumber.Notify();
            netMgr.evRepo.dispatch("onStartMarqueeTweenToNumber", null);

            this.numberTween = tween(object)
                .to(duration, {
                    value: endValue
                }, {
                    progress: (start: number, end: number, current: number, ratio: number) => {
                        const currentValue = formatGold(current);
                        this.setWinLabelString(currentValue);
                        return start + (end - start) * ratio;
                    }
                })
                .call(() => {
                    const value = formatGold(endValue);
                    this.setWinLabelString(value);
                    // mahjongWays_EventRepository.getInstance().onMarqueeTweenToNumberFinished.Notify();
                    netMgr.evRepo.dispatch("onMarqueeTweenToNumberFinished", null);


                    resolve();
                })
                .start();
        });
    }

    private stopTweenToNumber() {
        if (this.numberTween) {
            this.numberTween.stop();
            this.numberTween = null;
        }
    }

    private playGoldEffect() {
        this.particleAnimationPlayer.stopAnimation();
        this.particleAnimationPlayer.playAnimationOnce("animation");
    }
}

// 