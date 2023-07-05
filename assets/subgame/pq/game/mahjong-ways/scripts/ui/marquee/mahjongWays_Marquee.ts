// import { Node, SpriteFrame, Sprite, Tween, Size, Mask, tween, UITransform, Layout, Label, Color, isValid, Vec3, TERRAIN_HEIGHT_BASE } from "cc";
// import { formatGold } from "../../../../../script/formatter/pq_Formatter";
// import AnimationPlayer from "../animations/mahjongWays_AnimationPlayer";
// import mahjongWays_EventRepository from "../../../../../script/event/pq_EventRepository";
// import mahjongWays_UIFactory from "../../../../../script/ui/pq_UIFactory";
// import { log } from "cc";
// import { sp } from "cc";

// export default class mahjongWays_Marquee {

//     private mahjongWays_UIFactory: mahjongWays_UIFactory;
//     5
//     private mahjongWays_EventRepository: mahjongWays_EventRepository;

//     private maskNode: Node;

//     private baseGameMarqueeTexts: Array<SpriteFrame>;

//     private marqueeSprite: Sprite;

//     private marqueeTween: Tween<Node>;

//     private backgroud: Sprite;

//     private winsLayout: Layout;

//     private winTextSprite: Sprite;

//     private totalWinTextSprite: Sprite;

//     private isMarqueeing: boolean;

//     private winLabel: Label;

//     private numberTween: Tween<{ value: number }>;

//     private particleAnimationPlayer: AnimationPlayer;

//     private effectAnimationPlayer: AnimationPlayer;

//     public constructor(mahjongWays_MarqueeParameter: mahjongWays_MarqueeParameter) {
//         this.init(mahjongWays_MarqueeParameter);
//     }

//     public destroy() {
//         this.particleAnimationPlayer.destroy();
//         this.particleAnimationPlayer = null;
//         this.effectAnimationPlayer.destroy();
//         this.effectAnimationPlayer = null;
//         this.stopMarquee();
//     }

//     private async init(mahjongWays_MarqueeParameter: mahjongWays_MarqueeParameter) {
//         const parent = mahjongWays_MarqueeParameter.parent;
//         const mahjongWays_UIFactory = mahjongWays_MarqueeParameter.mahjongWays_UIFactory;
//         const mahjongWays_EventRepository = mahjongWays_MarqueeParameter.mahjongWays_EventRepository;

//         this.mahjongWays_UIFactory = mahjongWays_UIFactory;
//         this.mahjongWays_EventRepository = mahjongWays_EventRepository;

//         await this.createUI(parent, mahjongWays_UIFactory, mahjongWays_EventRepository);

//         this.startMarquee();

//         mahjongWays_EventRepository.onResult.Attach(() => {
//             if (!this.isMarqueeing) {
//                 this.startMarquee();
//             }
//         });

//         mahjongWays_EventRepository.onWinMoney.Attach(winMoneyParameter => {
//             const winMoney = winMoneyParameter.winMoney;
//             const accumulatedWinMutiple = winMoneyParameter.accumulatedWinMutiple
//             const isGreaterThanQuintuple = (accumulatedWinMutiple >= 5);

//             if (winMoney <= 0) {
//                 return;
//             }

//             this.showWin(winMoney);

//             if (isGreaterThanQuintuple) {
//                 this.setQuintupleSkin();
//                 this.mahjongWays_EventRepository.onQuintupleSkin.Notify();
//             }
//         });

//         mahjongWays_EventRepository.onTotalWinMoney.Attach(totalWinMoneyParameter => {
//             const totalWinMoney = totalWinMoneyParameter.totalWinMoney;
//             const accumulatedWinMutiple = totalWinMoneyParameter.accumulatedWinMutiple

//             if (totalWinMoney <= 0) {
//                 return;
//             }
//             const isGreaterThanQuintuple = (accumulatedWinMutiple >= 5);
//             const isBigWin = (accumulatedWinMutiple >= 20);
//             if (isBigWin) {
//                 this.showBigTotalWin(totalWinMoney);
//             } else {
//                 if (isGreaterThanQuintuple) {
//                     this.showMoreThanQuintupleTotalWin(totalWinMoney);
//                 } else {
//                     this.showTotalWin(totalWinMoney);
//                 }
//             }
//         });
//     }

//     private async createUI(parent: Node, mahjongWays_UIFactory: mahjongWays_UIFactory, mahjongWays_EventRepository: mahjongWays_EventRepository) {
//         const backgroud = mahjongWays_UIFactory.createSprite({
//             parent: parent,
//             name: ""
//         }, {
//             contentSize: new Size(709, 97),
//             type: Sprite.Type.SIMPLE,
//             sizeMode: Sprite.SizeMode.CUSTOM,
//             spriteFramePath: "mahjong-ways/images/mahjongWays_display_bar1/spriteFrame",
//         }, {
//             bottom: 330
//         });
//         this.backgroud = backgroud;

//         const mask = mahjongWays_UIFactory.createNode({
//             parent: backgroud.node,
//             name: "mask"
//         }).addComponent(Mask);
//         const maskNode = mask.node;
//         maskNode.setPosition(-1.5, 3.5);
//         maskNode.getComponent(UITransform).setContentSize(570, 65);
//         this.maskNode = maskNode;

//         const marqueeSprite = mahjongWays_UIFactory.createSprite({
//             parent: maskNode,
//             name: ""
//         }, {
//             sizeMode: Sprite.SizeMode.CUSTOM,
//             type: Sprite.Type.SIMPLE
//         });
//         this.marqueeSprite = marqueeSprite;

//         const baseGameMarqueeTextSpriteFramesPaths = [
//             "mahjong-ways/images/text/marquee/mahjongWays_marquee_0/spriteFrame",
//             "mahjong-ways/images/text/marquee/mahjongWays_marquee_1/spriteFrame",
//             "mahjong-ways/images/text/marquee/mahjongWays_marquee_2/spriteFrame",
//             "mahjong-ways/images/text/marquee/mahjongWays_marquee_3/spriteFrame",
//         ];

//         this.baseGameMarqueeTexts = new Array<SpriteFrame>();
//         for (let index = 0; index < baseGameMarqueeTextSpriteFramesPaths.length; index++) {
//             const path = baseGameMarqueeTextSpriteFramesPaths[index];
//             const spriteFrame = await mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>(path, SpriteFrame);
//             this.baseGameMarqueeTexts.push(spriteFrame);
//         }

//         const winsLayoutNode = mahjongWays_UIFactory.createNode({
//             parent: backgroud.node,
//             name: "winsLayoutNode"
//         });
//         const winsLayout = mahjongWays_UIFactory.addHorizontalLayout(winsLayoutNode, {
//             resizeMode: Layout.ResizeMode.CONTAINER
//         });
//         this.winsLayout = winsLayout;
//         const winTextSprite = mahjongWays_UIFactory.createSprite({
//             parent: winsLayoutNode,
//             name: "winTextSprite"
//         }, {
//             contentSize: new Size(141 * 0.7, 66 * 0.7),
//             type: Sprite.Type.SIMPLE,
//             sizeMode: Sprite.SizeMode.CUSTOM,
//             spriteFramePath: "mahjong-ways/images/text/marquee/mahjongWays_marquee_5/spriteFrame",
//         });
//         this.winTextSprite = winTextSprite;
//         const totalWinTextSprite = mahjongWays_UIFactory.createSprite({
//             parent: winsLayoutNode,
//             name: "winTextSprite"
//         }, {
//             contentSize: new Size(196 * 0.7, 66 * 0.7),
//             type: Sprite.Type.SIMPLE,
//             sizeMode: Sprite.SizeMode.CUSTOM,
//             spriteFramePath: "mahjong-ways/images/text/marquee/mahjongWays_marquee_6/spriteFrame",
//         });
//         this.totalWinTextSprite = totalWinTextSprite;
//         const winLabel = mahjongWays_UIFactory.createLabel({
//             parent: winsLayoutNode,
//             name: "winLabel"
//         }, {
//             fontSize: 40,
//             spacingX: -15,
//             fontPath: "mahjong-ways/bigImage/text/num/a_mahjongWays_gold_num",
//             color: Color.WHITE
//         }, null, {
//             verticalCenter: 2
//         });
//         this.winLabel = winLabel;

//         log('info_vfx_a load')
//         const particleSkeletonNode = hqq.addNode(backgroud.node,{
//             Res:hqq['pq'],
//             skeleton:"game/mahjong-ways/animations/spines/info_vfx_a/",
//             name:"particleSkeleton",
//             timeScale: .5
//         }); 
//         this.particleAnimationPlayer = new AnimationPlayer(particleSkeletonNode.getComponent(sp.Skeleton));

//         log('info_vfx_c load')
//         const effectSkeletonNode = hqq.addNode(backgroud.node,{
//             Res:hqq['pq'],
//             skeleton:"game/mahjong-ways/animations/spines/info_vfx_c/",
//             name:"effectSkeleton",
//             timeScale: .7,scale:1.4
//         }); 
//         this.effectAnimationPlayer = new AnimationPlayer(effectSkeletonNode.getComponent(sp.Skeleton));
//     }

//     private startMarquee() {
//         this.stopMarquee();
//         this.hideWinsLayout();
//         this.showMarqueeSprite();
//         this.setMarqueeSkin();
//         const spriteFrame = this.baseGameMarqueeTexts[Math.floor(Math.random() * this.baseGameMarqueeTexts.length)];
//         const marqueeSprite = this.marqueeSprite;
//         const spriteFrameSize = new Size(spriteFrame.originalSize);
//         const marqueeSpriteTransform = marqueeSprite.getComponent(UITransform);
//         marqueeSprite.node.setPosition(0, 0);
//         marqueeSpriteTransform.setContentSize(spriteFrameSize.width * 0.7, spriteFrameSize.height * 0.7);
//         marqueeSprite.spriteFrame = spriteFrame;
//         let x = 0;
//         const spriteFrameWidth = marqueeSpriteTransform.width;
//         const maskTransform = this.maskNode.getComponent(UITransform);
//         if (spriteFrameWidth > maskTransform.width) {
//             marqueeSprite.node.setPosition((maskTransform.width * 0.5 * -1) + (spriteFrameWidth * 0.55), 0);
//             x = (maskTransform.width * 0.5 * -1) + (spriteFrameWidth * 0.5 * -1);
//         }
//         this.marqueeTween = tween(this.marqueeSprite.node)
//             .delay(1)
//             .to(6, { x: x })
//             .delay(1)
//             .call(() => this.startMarquee())
//             .start();

//         this.isMarqueeing = true;
//     }

//     private stopMarquee() {
//         if (this.marqueeTween != null) {
//             this.marqueeTween.stop();
//             this.marqueeTween = null;
//         }
//         this.hideMarqueeSprite();
//         this.isMarqueeing = false;
//     }

//     private showWin(win: number) {
//         this.stopMarquee();
//         this.hideTotalWinTextSprite();
//         this.setWinLabelString(formatGold(win));
//         this.showWinTextSprite();
//         this.showWinsLayout();
//         this.playGoldEffect();
//     }

//     private showTotalWin(totalWin: number) {
//         this.stopMarquee();
//         this.hideWinTextSprite();
//         this.setWinLabelString(formatGold(totalWin));
//         this.showTotalWinTextSprite();
//         this.showWinsLayout();
//         this.playGoldEffect();
//     }

//     private async showMoreThanQuintupleTotalWin(totalWin: number) {
//         this.stopMarquee();
//         this.hideWinTextSprite();
//         this.setWinLabelString("0");
//         this.showTotalWinTextSprite();
//         this.showWinsLayout();
//         await this.startTweenToNumber(0, totalWin, 1);
//     }

//     private showBigTotalWin(totalWin: number) {
//         this.stopMarquee();
//         this.hideWinTextSprite();
//         this.setWinLabelString(formatGold(totalWin));
//         this.showTotalWinTextSprite();
//         this.showWinsLayout();
//         this.setBigWinSkin();
//         this.mahjongWays_EventRepository.onTotalWinSkin.Notify();
//         this.playGoldEffect();
//         this.effectAnimationPlayer.playAnimationOnce("animation");
//     }

//     private async setMarqueeSkin() {
//         this.backgroud.spriteFrame = await this.mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>("mahjong-ways/images/mahjongWays_display_bar1/spriteFrame", SpriteFrame);
//     }

//     private async setQuintupleSkin() {
//         this.backgroud.spriteFrame = await this.mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>("mahjong-ways/images/mahjongWays_display_bar2/spriteFrame", SpriteFrame);
//     }

//     private async setBigWinSkin() {
//         this.backgroud.spriteFrame = await this.mahjongWays_UIFactory.assetRepository.getAsset<SpriteFrame>("mahjong-ways/images/mahjongWays_display_bar3/spriteFrame", SpriteFrame);
//     }

//     private showWinsLayout() {
//         this.winsLayout.node.active = true;
//     }

//     private hideWinsLayout() {
//         this.winsLayout.node.active = false;
//     }

//     private showMarqueeSprite() {
//         this.marqueeSprite.node.active = true;
//     }

//     private hideMarqueeSprite() {
//         if (isValid(this.marqueeSprite.node, true)) {
//             this.marqueeSprite.node.active = false;
//         }
//     }

//     private showWinTextSprite() {
//         this.winTextSprite.node.active = true;
//     }

//     private hideWinTextSprite() {
//         this.winTextSprite.node.active = false;
//     }

//     private showTotalWinTextSprite() {
//         this.totalWinTextSprite.node.active = true;
//     }

//     private hideTotalWinTextSprite() {
//         this.totalWinTextSprite.node.active = false;
//     }

//     private setWinLabelString(string: string) {
//         this.winLabel.string = string;
//     }

//     private async startTweenToNumber(startValue: number, endValue: number, duration: number) {
//         return new Promise<void>(resolve => {
//             console.log(`[mahjongWays_Marquee] startTweenToNumber ${endValue}`);
//             this.stopTweenToNumber();
//             const object = { value: startValue };
//             this.mahjongWays_EventRepository.onStartMarqueeTweenToNumber.Notify();
//             this.numberTween = tween(object)
//                 .to(duration, {
//                     value: endValue
//                 }, {
//                     progress: (start: number, end: number, current: number, ratio: number) => {
//                         const currentValue = formatGold(current);
//                         this.setWinLabelString(currentValue);
//                         return start + (end - start) * ratio;
//                     }
//                 })
//                 .call(() => {
//                     const value = formatGold(endValue);
//                     this.setWinLabelString(value);
//                     this.mahjongWays_EventRepository.onMarqueeTweenToNumberFinished.Notify();
//                     resolve();
//                 })
//                 .start();
//         });
//     }

//     private stopTweenToNumber() {
//         if (this.numberTween) {
//             this.numberTween.stop();
//             this.numberTween = null;
//         }
//     }

//     private playGoldEffect() {
//         this.particleAnimationPlayer.playAnimationOnce("animation");
//     }
// }

// interface mahjongWays_MarqueeParameter {
//     parent: Node;
//     mahjongWays_UIFactory: mahjongWays_UIFactory;
//     mahjongWays_EventRepository: mahjongWays_EventRepository;
// }