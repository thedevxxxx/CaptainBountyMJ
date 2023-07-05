// import { Node, Tween, Sprite, Size, Vec2, SpriteFrame, Vec3, tween, Animation, AnimationClip, TweenEasing, Button, Color, sp, KeyCode } from "cc";
// import mahjongWays2_StateMachine from "../../state/mahjongWays2_StateMachine";
// import { delay } from "../../timer/mahjongWays2_Timer";
// import { GoldenSymbolNames, SymbolName } from "../../type/mahjongWays2_Types";
// import AnimationPlayer from "../animations/mahjongWays2_AnimationPlayer";
// import TweenPlayer from "../animations/mahjongWays2_TweenPlayer";
// import mahjongWays2_CombinationEffect from "../effect/mahjongWays2_CombinationEffect";
// import mahjongWays2_SymbolGuider from "./mahjongWays2_SymbolGuider";
// import ScatterEffect from "./ScatterEffect";
// import mahjongWays2_EventRepository from "../../../../../script/event/pq_EventRepository";
// import mahjongWays2_UIFactory from "../../../../../script/ui/pq_UIFactory";
// import { log } from "cc";

// export default class mahjongWays2_Symbol {

//     public currentColumnIndex: number;

//     public symbolStateMachine: mahjongWays2_StateMachine<SymbolState>;

//     public symbolName: SymbolName;

//     private mahjongWays2_EventRepository: mahjongWays2_EventRepository;

//     private mahjongWays2_UIFactory: mahjongWays2_UIFactory;

//     private readonly symbolScale = new Vec3(0.88, 0.85);

//     private rootNode: Node;

//     private shakeTween: Tween<{ value: number }>;

//     private fallTween: Tween<Node>;

//     private spinTween: Tween<Node>;

//     private originalPositionBeforeShake: Vec3;

//     private mahjongWays2_CombinationEffect: mahjongWays2_CombinationEffect;
//     //
//     private mahjongSymbolSprite: Sprite;

//     private mahjongFlipAnimation: Animation;

//     private mahjongFlipAnimationName: string;

//     private goldenMahjongFlipAnimationName: string;

//     private mahjongTextSprite: Sprite;

//     private mahjonTextFlipTween: Tween<{ value: number }>;
//     //
//     private wildSymbolSprite: Sprite;

//     private wildFlipAnimation: Animation;

//     private wildFlipAnimationName: string;

//     private wildSymbolTextSprite: Sprite;

//     private wildSymbolIconSprite: Sprite;
//     //
//     private scatterBackground: Sprite;

//     private scatterSymbolSprite: Sprite;
//     //
//     private reelIndex: number;

//     private spriteFrameByName: Map<string, SpriteFrame>;

//     private auraAnimationPlayer: AnimationPlayer;

//     private combinationParticleAnimationPlayer: AnimationPlayer;

//     private coinAnimationPlayer: AnimationPlayer;

//     private flareSprite: Sprite;

//     private combinationGlowSprite: Sprite;

//     private particleAnimationPlayer: AnimationPlayer;

//     private scatterEffect: ScatterEffect;

//     private scatterBunceEffect: TweenPlayer<Node>;

//     private colorTween: TweenPlayer<Color>;

//     private fadeOutTween: TweenPlayer<Color>;

//     public constructor() {

//     }

//     public async init(symbolParameter: SymbolParameter) {
//         const parent = symbolParameter.parent;
//         const reelIndex = symbolParameter.reelIndex;
//         const mahjongWays2_SymbolGuider = symbolParameter.mahjongWays2_SymbolGuider;
//         const mahjongWays2_UIFactory = symbolParameter.mahjongWays2_UIFactory;
//         const mahjongWays2_EventRepository = symbolParameter.mahjongWays2_EventRepository;

//         this.mahjongWays2_EventRepository = mahjongWays2_EventRepository;
//         this.spriteFrameByName = symbolParameter.spriteFrameByName;
//         this.mahjongWays2_UIFactory = mahjongWays2_UIFactory;
//         this.reelIndex = reelIndex;

//         this.scatterBunceEffect = new TweenPlayer();
//         this.colorTween = new TweenPlayer();
//         this.fadeOutTween = new TweenPlayer();

//         await this.createUI(parent, mahjongWays2_SymbolGuider, mahjongWays2_UIFactory);

//         this.initState();

//         this.symbolStateMachine.setState(SymbolState.Idle);

//         this.hideMahjongAnimationNode();

//         this.hideWildAnimationNode();

//         this.mahjongFlipAnimation.on(Animation.EventType.FINISHED, this.onMahjongFlipAnimationFinished, this);

//         this.wildFlipAnimation.on(Animation.EventType.FINISHED, this.onWildFlipAnimationFinished, this);

//         return this;
//     }

//     public destroy() {
//         try {
//             this.fadeOutTween.destroy();
//             this.colorTween.destroy();
//             this.scatterEffect.destroy();
//             this.combinationParticleAnimationPlayer.destroy();
//             this.coinAnimationPlayer.destroy();
//             this.particleAnimationPlayer.destroy();
//             this.auraAnimationPlayer.destroy();
//             this.scatterBunceEffect.destroy();
//             this.fadeOutTween = null;
//             this.colorTween = null;
//             this.scatterEffect = null;
//             this.combinationParticleAnimationPlayer = null;
//             this.coinAnimationPlayer = null;
//             this.particleAnimationPlayer = null;
//             this.auraAnimationPlayer = null;
//             this.scatterBunceEffect = null;
//             this.wildFlipAnimation?.off(Animation.EventType.FINISHED, this.onWildFlipAnimationFinished, this);
//             this.mahjongFlipAnimation?.off(Animation.EventType.FINISHED, this.onMahjongFlipAnimationFinished, this);
//             this.stopShakeTween();
//             this.stopFallTween();
//             this.stopSpinTween();
//             this.stopMahjongFlipTween();
//             this.mahjongWays2_CombinationEffect?.destroy();
//             this.mahjongWays2_CombinationEffect = null;
//         } catch (error) {
//             console.log(`[mahjongWays2_Symbol] ${error}`);
//         }
//     }

//     public isGoldenMahjong() {
//         return (GoldenSymbolNames.indexOf(this.symbolName) !== -1);
//     }

//     public setPositionByIndex(index: number) {
//         this.currentColumnIndex = index;
//         this.rootNode.setPosition(this.rootNode.x, this.getPositionYByIndex(index));
//         //this.rootNode.setSiblingIndex(index);
//     }

//     public setSiblingIndex(index: number) {
//         this.rootNode.setSiblingIndex(index);
//     }

//     public setSymbolName(symbolName: SymbolName) {
//         this.symbolName = symbolName;
//     }

//     public addGray() {
//         const spirtes = this.rootNode.getComponentsInChildren(Sprite);
//         this.colorTween.stopTween();
//         const color = new Color(spirtes[0].color);
//         this.colorTween.tween = tween(color)
//             .to(0.3, {
//                 r: Color.GRAY.r,
//                 g: Color.GRAY.g,
//                 b: Color.GRAY.b
//             }, {
//                 onUpdate: () => {
//                     spirtes.forEach(sprite => {
//                         sprite.color = color;
//                     });
//                 },
//                 onComplete: () => {
//                     spirtes.forEach(sprite => {
//                         sprite.color = Color.GRAY;
//                     });
//                 }
//             })
//             .start();
//     }

//     public resetColor() {
//         const spirtes = this.rootNode.getComponentsInChildren(Sprite);
//         this.colorTween.stopTween();
//         const color = new Color(spirtes[0].color);
//         this.colorTween.tween = tween(color)
//             .to(0.6, {
//                 r: Color.WHITE.r,
//                 g: Color.WHITE.g,
//                 b: Color.WHITE.b
//             }, {
//                 onUpdate: () => {
//                     spirtes.forEach(sprite => {
//                         sprite.color = color;
//                     });
//                 },
//                 onComplete: () => {
//                     spirtes.forEach(sprite => {
//                         sprite.color = Color.WHITE;
//                     });
//                 }
//             })
//             .start();
//     }

//     private async createUI(parent: Node, mahjongWays2_SymbolGuider: mahjongWays2_SymbolGuider, mahjongWays2_UIFactory: mahjongWays2_UIFactory) {
//         const rootNode = mahjongWays2_UIFactory.createButton({
//             parent: parent,
//             name: "mahjongWays2_Symbol"
//         }, {
//             // contentSize: new Size(160, 187),
//             // contentSize: new Size(150, 171),
//             contentSize: new Size(150, 165),
//             onClick: () => {
//                 //const siblingIndex = this.rootNode.getSiblingIndex();
//                 //if (siblingIndex >= 4 && siblingIndex <= 7) {
//                 mahjongWays2_SymbolGuider.toggleInfo(rootNode, this.reelIndex, this.symbolName);
//                 //}
//             }
//         }).node;
//         this.rootNode = rootNode;
//         //
//         const mahjongSymbolSprite = mahjongWays2_UIFactory.createSprite({
//             parent: rootNode,
//             name: ""
//         }, {
//             name: "mahjongWays2_SymbolSprite",
//             spriteFramePath: "mahjong-ways2/images/symbols/mahjongWays2_blank/spriteFrame",
//             sizeMode: Sprite.SizeMode.RAW,
//             type: Sprite.Type.SIMPLE
//         });
//         mahjongSymbolSprite.node.setScale(this.symbolScale);
//         this.mahjongSymbolSprite = mahjongSymbolSprite;

//         const mahjongTextSprite = mahjongWays2_UIFactory.createSprite({
//             parent: mahjongSymbolSprite.node,
//             name: ""
//         }, {
//             name: "mahjongWays2_SkinSprite",
//             //spriteFramePath: "mahjong-ways2/images/symbols/mahjongWays2_8characters/spriteFrame",
//             sizeMode: Sprite.SizeMode.RAW,
//             type: Sprite.Type.SIMPLE
//         })
//         //mahjongTextSprite.node.is3DNode = true;//??
//         this.mahjongTextSprite = mahjongTextSprite;

//         this.mahjongFlipAnimationName = "flip1";
//         this.goldenMahjongFlipAnimationName = "flip2";
//         const flipAnimation = mahjongWays2_UIFactory.createAnimationClipWithSpriteFrames(rootNode, [{
//             pathes: [
//                 "mahjong-ways2/images/symbols/mahjongWays2_mj1/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_mj2/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_mj3/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_mj4/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_mj5/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_mj6/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_mj7/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_mj8/spriteFrame"
//             ],
//             clipName: this.mahjongFlipAnimationName,
//             wrapMode: AnimationClip.WrapMode.Normal,
//             speed: 2
//         }, {
//             pathes: [
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold1/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold2/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold3/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold4/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold5/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold6/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold7/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold8/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold9/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold10/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold11/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold12/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold13/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold14/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold15/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold16/spriteFrame",
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold17/spriteFrame",
//             ],
//             clipName: this.goldenMahjongFlipAnimationName,
//             wrapMode: AnimationClip.WrapMode.Normal
//         }]);
//         flipAnimation.node.setScale(this.symbolScale);
//         this.mahjongFlipAnimation = flipAnimation;
//         //
//         this.wildFlipAnimationName = "flip";

//         const wildSymbolSprite = mahjongWays2_UIFactory.createSprite({
//             parent: rootNode,
//             name: ""
//         }, {
//             contentSize: new Size(150, 165),
//             sizeMode: Sprite.SizeMode.CUSTOM,
//             type: Sprite.Type.SIMPLE
//         });
//         this.wildSymbolSprite = wildSymbolSprite;

//         const wildSymbolTextSprite = mahjongWays2_UIFactory.createSprite({
//             parent: wildSymbolSprite.node,
//             name: ""
//         }, {
//             position: new Vec2(0, 45),
//             name: "mahjongWays2_SymbolTextSprite",
//             spriteFramePath: "mahjong-ways2/images/symbols/mahjongWays2_baida/spriteFrame",
//             sizeMode: Sprite.SizeMode.RAW,
//             type: Sprite.Type.SIMPLE
//         });
//         this.wildSymbolTextSprite = wildSymbolTextSprite;

//         const wildSymbolIconSprite = mahjongWays2_UIFactory.createSprite({
//             parent: wildSymbolSprite.node,
//             name: ""
//         }, {
//             position: new Vec2(0, -34.45),
//             name: "mahjongWays2_SymbolIconSprite",
//             spriteFramePath: "mahjong-ways2/images/symbols/mahjongWays2_yuanbao/spriteFrame",
//             sizeMode: Sprite.SizeMode.RAW,
//             type: Sprite.Type.SIMPLE
//         });
//         this.wildSymbolIconSprite = wildSymbolIconSprite;

//         const wildFlipAnimation = mahjongWays2_UIFactory.createAnimationClipWithSpriteFrames(rootNode, [{
//             pathes: [
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold17/spriteFrame",//??
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold16/spriteFrame",//??
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold15/spriteFrame",//??
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold14/spriteFrame",//??
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold13/spriteFrame",//??
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold12/spriteFrame",//??
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold11/spriteFrame",//??
//                 "mahjong-ways2/images/symbols/mahjongWays2_gold10/spriteFrame",//??
//             ],
//             clipName: this.wildFlipAnimationName,
//             wrapMode: AnimationClip.WrapMode.Normal,
//             speed: 2
//         }]);
//         wildFlipAnimation.node.setPosition(0, 10);
//         wildFlipAnimation.node.setScale(this.symbolScale);
//         this.wildFlipAnimation = wildFlipAnimation;
//         //
//         const scatterBackground = mahjongWays2_UIFactory.createSprite({
//             parent: rootNode,
//             name: "scatterBackground",
//         }, {
//             spriteFramePath: "mahjong-ways2/images/effects/scatterEffect/scatter_bg/spriteFrame",
//             sizeMode: Sprite.SizeMode.RAW,
//             type: Sprite.Type.SIMPLE,
//             materialPath: "mahjong-ways2/materials/remove-black-material"
//         });
//         this.scatterBackground = scatterBackground;
//         const scatterSymbolSprite = mahjongWays2_UIFactory.createSprite({
//             parent: rootNode,
//             name: ""
//         }, {
//             name: "mahjongWays2_SymbolSprite",
//             spriteFramePath: "mahjong-ways2/images/symbols/mahjongWays2_hu/spriteFrame",
//             sizeMode: Sprite.SizeMode.RAW,
//             type: Sprite.Type.SIMPLE
//         });
//         this.scatterSymbolSprite = scatterSymbolSprite;

//         const scatterEffect = await new ScatterEffect().init({
//             parent: rootNode,
//             mahjongWays2_UIFactory: mahjongWays2_UIFactory
//         });
//         this.scatterEffect = scatterEffect;
        
//         log('scatter_vfx_c load')
//         const auraSkeletonNode = hqq.addNode(rootNode,{
//             Res:hqq['pq'],
//             skeleton:"game/mahjong-ways2/animations/spines/scatter_vfx_c/",
//             name:"auraSkeleton",
//             widget:{bottom:0},timeScale:.5
//         });
//         let auraSkeletonSkeleton = auraSkeletonNode.getComponent(sp.Skeleton);
//         this.auraAnimationPlayer = new AnimationPlayer(auraSkeletonSkeleton);
//         //
//         const flareSprite = mahjongWays2_UIFactory.createSprite({
//             parent: rootNode,
//             name: "",
//             scale: new Vec3(2, 2)
//         }, {
//             name: "flareSprite",
//             spriteFramePath: "mahjong-ways2/images/effects/win_glow/win_flare_b/spriteFrame",
//             sizeMode: Sprite.SizeMode.RAW,
//             type: Sprite.Type.SIMPLE,
//             materialPath: "mahjong-ways2/materials/remove-black-material"
//         });
//         this.flareSprite = flareSprite;
//         const combinationGlowSprite = mahjongWays2_UIFactory.createSprite({
//             parent: rootNode,
//             name: "flareSprite",
//             scale: new Vec3(2.25, 2.7)
//         }, {
//             spriteFramePath: "mahjong-ways2/images/effects/win_glow/win_glow_b/spriteFrame",
//             sizeMode: Sprite.SizeMode.RAW,
//             type: Sprite.Type.SIMPLE,
//             materialPath: "mahjong-ways2/materials/remove-black-material"
//         });
//         this.combinationGlowSprite = combinationGlowSprite;
//         //const symbolGlowSprite = mahjongWays2_UIFactory.createSprite({
//         //    parent: rootNode,
//         //    name: "",
//         //    scale: new Vec3(2, 1)
//         //}, {
//         //    name: "flareSprite",
//         //    spriteFramePath: "mahjong-ways2/images/effects/win_glow/win_glow_c/spriteFrame",
//         //    sizeMode: Sprite.SizeMode.RAW,
//         //    type: Sprite.Type.SIMPLE,
//         //    materialPath: "mahjong-ways2/materials/remove-black-material"
//         //});
//         this.hideGlow();


//         this.mahjongWays2_CombinationEffect = new mahjongWays2_CombinationEffect(rootNode, mahjongWays2_UIFactory);

//         log('combinationSkeleton load')
//         const combinationAnimationSkeletonNode = hqq.addNode(rootNode,{
//             Res:hqq['pq'],
//             skeleton:"game/mahjong-ways2/animations/spines/win_vfx_a_1x1/",
//             name:"combinationSkeleton",
//             scale:2,timeScale:.5
//         });
//         let combinationAnimationSkeleton = combinationAnimationSkeletonNode.getComponent(sp.Skeleton);
//         this.combinationParticleAnimationPlayer = new AnimationPlayer(combinationAnimationSkeleton);

//         log('coinSkeleton load')
//         const coinSkeletonNode = hqq.addNode(rootNode,{
//             Res:hqq['pq'],
//             skeleton:"game/mahjong-ways2/animations/spines/win_coin/",
//             name:"coinSkeleton",
//             scale:1.2,timeScale:1
//         });
//         let coinSkeleton = coinSkeletonNode.getComponent(sp.Skeleton);
//         this.coinAnimationPlayer = new AnimationPlayer(coinSkeleton);

//         log('particleSkeleton load')
//         const particleSkeletonNode = hqq.addNode(rootNode,{
//             Res:hqq['pq'],
//             skeleton:"game/mahjong-ways2/animations/spines/win_vfx_b/",
//             name:"particleSkeleton",
//             scale:1.2,timeScale:1
//         });
//         let particleSkeleton = particleSkeletonNode.getComponent(sp.Skeleton);
//         this.particleAnimationPlayer = new AnimationPlayer(particleSkeleton);
//     }

//     private initState() {
//         //@ts-ignore
//         this.symbolStateMachine = new mahjongWays2_StateMachine(new Map([
//             [SymbolState.Idle, () => this.playIdle()],
//             [SymbolState.Spin, (spinParameter) => this.playSpin(spinParameter)],
//             [SymbolState.Effect, () => this.playEffect()],
//             [SymbolState.Combination, (delay) => this.playCombination(delay)],
//             [SymbolState.Flip, (flipParamter) => this.playFlip(flipParamter)],
//             [SymbolState.Shake, () => this.playShake()],
//             [SymbolState.Fall, (fallParameter) => this.playFall(fallParameter)],
//             [SymbolState.Reset, () => this.reset()],
//         ]), new Map([
//             //[SymbolState.Idle, () => this.hideSymbolNode()],
//             [SymbolState.Spin, () => this.stopSpinTween()],
//             [SymbolState.Shake, () => this.stopShakeTween()],
//             [SymbolState.Fall, () => this.stopFallTween()],
//         ]));
//     }
//     //
//     private playIdle() {
//         const symbolName = this.symbolName;
//         this.setSkin(symbolName, false);
//         this.showSymbolDisplayer(symbolName);
//         if (symbolName === SymbolName.Scatter) {

//         } else if (symbolName === SymbolName.Wild) {

//         } else {
//             this.stopMahjongFlipTween();
//         }
//         this.checkButtonIinteractable();
//     }

//     private async playSpin(spinParameter: SpinParameter) {
//         await this.startSpinTween(spinParameter);
//     }

//     private async playEffect() {
//         await this.playScatterBounceEffect();
//         await this.scatterEffect.playEffect();
//     }

//     private async playCombination(delay: number) {
//         if (this.symbolName === SymbolName.Scatter) {
//             return;
//             //await this.scatterEffect.playCombinationEffect();
//         } else {
//             this.combinationParticleAnimationPlayer.playAnimationOnce("animation");
//             this.showGlow();
//             await this.mahjongWays2_CombinationEffect.playLightAnimation(delay)
//         }
//     }

//     private async playFlip(flipParamter: FlipParamter) {
//         const symbolName = this.symbolName;
//         if (symbolName === SymbolName.Scatter) {
//             return new Promise<void>(resolve => resolve());
//         }
//         this.coinAnimationPlayer.playAnimationOnce("animation");
//         this.particleAnimationPlayer.playAnimationOnce("animation");
//         this.hideGlow();
//         if (symbolName === SymbolName.Wild) {
//             await this.playWildFlipAnimation(flipParamter);
//         } else {
//             await this.playMahjongFlipAnimation(flipParamter);
//         }
//     }

//     private async playShake() {
//         this.stopShakeTween();
//         await this.startShakeTween();
//     }

//     private async playFall(fallParameter: FallParameter) {
//         await this.startFallTween(fallParameter)
//     }
//     //
//     private setSkin(symbolName: SymbolName, isBlur: boolean = false) {
//         if (symbolName == null) {
//             console.log(`[mahjongWays2_Symbol] setSkin null symbolName`);
//             return;
//         }
//         this.showSymbolDisplayer(symbolName);
//         if (symbolName === SymbolName.Wild) {
//             this.wildSymbolTextSprite.spriteFrame = this.spriteFrameByName.get((isBlur) ? "mahjongWays2_baida_blur" : "mahjongWays2_baida");
//             this.wildSymbolTextSprite.node.setScale(((isBlur) ? new Vec3(1.27, 1.27) : this.symbolScale));//??
//             this.wildSymbolIconSprite.spriteFrame = this.spriteFrameByName.get((isBlur) ? "mahjongWays2_yuanbao_s_blur" : "mahjongWays2_yuanbao");
//             this.wildSymbolIconSprite.node.setScale(((isBlur) ? new Vec3(1.27, 1.27) : this.symbolScale));//??
//             this.auraAnimationPlayer.playAnimationLoop("animation");
//         } else if (symbolName === SymbolName.Scatter) {
//             this.scatterSymbolSprite.spriteFrame = this.spriteFrameByName.get((isBlur) ? "mahjongWays2_hu_blur" : "mahjongWays2_hu");
//             this.scatterSymbolSprite.node.setScale(((isBlur) ? new Vec3(1.27, 1.27) : this.symbolScale));
//             this.auraAnimationPlayer.playAnimationLoop("animation");
//         } else {
//             let isGold = false;
//             let skinSpriteFrameName: string = null;
//             switch (symbolName) {
//                 case SymbolName.GreenDragon:
//                     skinSpriteFrameName = "mahjongWays2_greenFa";
//                     break;
//                 case SymbolName.RedDragon:
//                     skinSpriteFrameName = "mahjongWays2_redMid";
//                     break;
//                 case SymbolName.WhiteDragon:
//                     skinSpriteFrameName = "mahjongWays2_whiteBoard";
//                     break;
//                 case SymbolName.EightOfCharacters:
//                     skinSpriteFrameName = "mahjongWays2_8characters";
//                     break;
//                 case SymbolName.FiveOfDots:
//                     skinSpriteFrameName = "mahjongWays2_5dots";
//                     break;
//                 case SymbolName.FiveOfBamboos:
//                     skinSpriteFrameName = "mahjongWays2_5bamboos";
//                     break;
//                 case SymbolName.ThreeOfDots:
//                     skinSpriteFrameName = "mahjongWays2_3dots";
//                     break;
//                 case SymbolName.TwoOfDots:
//                     skinSpriteFrameName = "mahjongWays2_2dots";
//                     break;
//                 case SymbolName.TwoOfBamboos:
//                     skinSpriteFrameName = "mahjongWays2_2bamboos";
//                     break;
//                 case SymbolName.GoldenGreenDragon:
//                     skinSpriteFrameName = "mahjongWays2_greenFa";
//                     isGold = true;
//                     break;
//                 case SymbolName.GoldenRedDragon:
//                     skinSpriteFrameName = "mahjongWays2_redMid";
//                     isGold = true;
//                     break;
//                 case SymbolName.GoldenWhiteDragon:
//                     skinSpriteFrameName = "mahjongWays2_whiteBoard";
//                     isGold = true;
//                     break;
//                 case SymbolName.GoldenEightOfCharacters:
//                     skinSpriteFrameName = "mahjongWays2_8characters";
//                     isGold = true;
//                     break;
//                 case SymbolName.GoldenFiveOfDots:
//                     skinSpriteFrameName = "mahjongWays2_5dots";
//                     isGold = true;
//                     break;
//                 case SymbolName.GoldenFiveOfBamboos:
//                     skinSpriteFrameName = "mahjongWays2_5bamboos";
//                     isGold = true;
//                     break;
//                 case SymbolName.GoldenThreeOfDots:
//                     skinSpriteFrameName = "mahjongWays2_3dots";
//                     isGold = true;
//                     break;
//                 case SymbolName.GoldenTwoOfDots:
//                     skinSpriteFrameName = "mahjongWays2_2dots";
//                     isGold = true;
//                     break;
//                 case SymbolName.GoldenTwoOfBamboos:
//                     skinSpriteFrameName = "mahjongWays2_2bamboos";
//                     isGold = true;
//                     break;
//                 default:
//                     console.error(`[mahjongWays2_ReelRepository] ${symbolName}`);
//                     break;
//             }
//             let symbolSpriteFrameName = ((isGold) ? "mahjongWays2_blank_gold" : "mahjongWays2_blank");
//             if (isBlur) {
//                 skinSpriteFrameName = `${skinSpriteFrameName}_blur`;
//                 symbolSpriteFrameName = `${symbolSpriteFrameName}_s_blur`;
//             }
//             if (skinSpriteFrameName == null) {
//                 this.mahjongTextSprite.spriteFrame = null;
//             } else {
//                 const spriteFrame = this.spriteFrameByName.get(skinSpriteFrameName);
//                 this.mahjongTextSprite.spriteFrame = spriteFrame;
//             }
//             this.mahjongSymbolSprite.spriteFrame = this.spriteFrameByName.get(symbolSpriteFrameName);
//             this.mahjongSymbolSprite.node.setScale(((isBlur) ? new Vec3(1.27, 1.27) : this.symbolScale));//??
//             this.auraAnimationPlayer.stopAnimation();
//         }
//     }

//     private showSymbolDisplayer(symbolName: SymbolName) {
//         if (symbolName === SymbolName.Scatter) {
//             this.hideMahjongSymbolNode();
//             this.hideWildSymbolNode();
//             this.showScatterSymbolNode();
//             this.showScatterEffect();
//         } else if (symbolName === SymbolName.Wild) {
//             this.hideScatterSymbolNode();
//             this.hideScatterEffect();
//             this.hideMahjongSymbolNode();
//             this.resetWildSymbolTextColor();
//             this.showWildSymbolNode();
//         } else {
//             this.hideScatterSymbolNode();
//             this.hideScatterEffect();
//             this.hideWildSymbolNode();
//             this.showMahjongSymbolNode();
//         }
//     }

//     private getPositionYByIndex(index: number) {
//         const baseIndex = 6;
//         const ySpacing = 150;//160
//         const offset = 50;
//         const positionY = (((baseIndex - index) * ySpacing) + offset);
//         return positionY;
//     }

//     private reset() {
//         this.stopMahjongFlipTween();
//         this.stopShakeTween();
//         this.stopFallTween();
//         this.stopSpinTween();
//         this.setPositionByIndex(this.rootNode.getSiblingIndex());
//         this.symbolStateMachine.setState(SymbolState.Idle);
//     }

//     private startShakeTween() {
//         return new Promise<void>(resolve => {
//             const node = this.rootNode;
//             const originalPositionBeforeShake = new Vec3(node.x, node.y);
//             this.originalPositionBeforeShake = originalPositionBeforeShake;
//             let vibration = 2;
//             let shakePosition = new Vec3(node.x, node.y);
//             const obj = { value: vibration };
//             this.shakeTween = tween(obj)
//                 .to(1, { value: 0 }, {
//                     progress: (start, end, current, ratio) => {
//                         vibration = current;
//                         shakePosition.x = (originalPositionBeforeShake.x + ((Math.random() * vibration) * (((Math.random()) > 0.5) ? 1 : -1)));
//                         shakePosition.y = (originalPositionBeforeShake.y + ((Math.random() * vibration) * (((Math.random()) > 0.5) ? 1 : -1)));
//                         node.setPosition(shakePosition);
//                         return start + (end - start) * ratio;
//                     },
//                     //easing: "cubicOut"
//                 }).call(() => {
//                     node.setPosition(originalPositionBeforeShake);
//                     resolve();
//                 }).start();
//         });
//     }

//     private stopShakeTween() {
//         if (this.shakeTween != null) {
//             this.shakeTween.stop();
//             this.shakeTween = null;
//             this.rootNode.setPosition(this.originalPositionBeforeShake);
//         }
//     }

//     private async startFallTween(fallParameter: FallParameter) {
//         return new Promise<void>(resolve => {
//             const node = this.rootNode;
//             const index = fallParameter.endIndex;
//             const targetPosition = new Vec3(node.position.x, this.getPositionYByIndex(index), node.position.z);
//             const distance = node.position.y - targetPosition.y;
//             const speed = 500;
//             const time = distance / speed;
//             this.fallTween = tween(node)
//                 .delay(fallParameter.delay)
//                 .to(time, { position: targetPosition }, { easing: "bounceOut" })
//                 .call(() => {
//                     this.setPositionByIndex(index);
//                     this.checkButtonIinteractable();
//                     resolve();
//                     this.mahjongWays2_EventRepository.onSymbolFallFinished.Notify(this);
//                 })
//                 .start();
//         });
//     }

//     private stopFallTween() {
//         if (this.fallTween != null) {
//             this.fallTween.stop();
//             this.fallTween = null;
//         }
//     }

//     private async startSpinTween(spinParameter: SpinParameter, isFirstStep: boolean = true) {
//         return new Promise<void>(resolve => {
//             spinParameter.step -= 1;
//             let step = spinParameter.step;
//             const symbolNameBeforeSpin = this.symbolName;
//             const maxIndex = 8;
//             const node = this.rootNode;
//             const targetIndex = this.currentColumnIndex + 1;
//             const targetPosition = new Vec3(node.position.x, this.getPositionYByIndex(targetIndex));
//             const isFinishStep = (step === 0);
//             const isOverReel = targetIndex > maxIndex;
//             const distance = node.position.y - targetPosition.y;
//             const isEffectSpin = spinParameter.isEffectSpin;
//             const isFirstEffectReel = spinParameter.isFirstEffectReel;
//             let speed = spinParameter.speed;
//             if (isFirstStep) {
//                 speed *= 0.2;
//             } else if (step === 0) {
//                 speed *= 0.15;
//             } else if (isEffectSpin && step === 9) {
//                 speed *= 0.3;
//                 spinParameter.speed = speed;
//                 this.setSkin(this.symbolName, false);
//             }
//             const time = distance / speed;
//             let easing: TweenEasing = "linear";
//             if (isFirstStep) {
//                 easing = "backIn";
//             } else if (isFinishStep) {
//                 easing = "elasticOut";
//             }
//             if (isFirstEffectReel) {
//                 const shouldStartEffectSpin = (step === 50 && this.currentColumnIndex === 0);
//                 if (shouldStartEffectSpin) {
//                     this.mahjongWays2_EventRepository.onEffectSpinStarted.Notify(this.reelIndex);
//                 }
//             }
//             this.spinTween = tween(this.rootNode)
//                 .delay(spinParameter.delay)
//                 .to(time, { position: targetPosition }, { easing: easing })//"backOut";  
//                 .call(async () => {
//                     this.setPositionByIndex(targetIndex);
//                     if (isFirstStep) {
//                         spinParameter.delay = 0;
//                         this.setSkin(symbolNameBeforeSpin, true);
//                     }
//                     if (isOverReel) {
//                         this.setPositionByIndex(0);
//                         this.setSymbolName(spinParameter.symbolName);
//                         this.setSkin(this.symbolName, true);
//                     }
//                     if (isFinishStep) {
//                         this.symbolStateMachine.setState(SymbolState.Idle);
//                         if (isEffectSpin && this.currentColumnIndex === 0) {
//                             this.mahjongWays2_EventRepository.onEffectSpinFinished.Notify(this.reelIndex);
//                         }
//                         resolve();
//                     } else {
//                         resolve(this.startSpinTween(spinParameter, false));
//                         if (step === 2) {
//                             this.setSkin(this.symbolName, false);
//                         }
//                     }
//                 })
//                 .start();
//         });
//     }

//     private stopSpinTween() {
//         if (this.spinTween != null) {
//             this.spinTween.stop();
//             this.spinTween = null;
//         }
//     }
//     //
//     private onMahjongFlipAnimationFinished() {
//         this.hideMahjongAnimationNode();
//     }

//     private showMahjongAnimationNode() {
//         this.mahjongFlipAnimation.node.active = true;
//     }

//     private hideMahjongAnimationNode() {
//         this.mahjongFlipAnimation.node.active = false;
//     }

//     private async playMahjongFlipAnimation(flipParamter: FlipParamter) {
//         return new Promise<void>(resolve => {
//             const symbolNameAfterFlip = flipParamter.symbolNameAfterFlip;
//             const mahjongTextSpriteNode = this.mahjongTextSprite.node;
//             this.mahjongWays2_CombinationEffect.stopLightAnimation();
//             mahjongTextSpriteNode.setParent(this.mahjongFlipAnimation.node);
//             this.hideMahjongSymbolNode();
//             this.showMahjongAnimationNode();
//             this.mahjongFlipAnimation.once(Animation.EventType.FINISHED, async () => {
//                 if (this.isGoldenMahjong()) {
//                     this.setSymbolName(SymbolName.Wild);
//                     this.setSkin(SymbolName.Wild);
//                     this.symbolStateMachine.setState(SymbolState.Idle);
//                 } else {
//                     this.setPositionByIndex(flipParamter.endIndex);
//                     this.setSkin(symbolNameAfterFlip);
//                     this.setSymbolName(symbolNameAfterFlip);
//                     this.symbolStateMachine.setState(SymbolState.Idle);
//                 }
//                 mahjongTextSpriteNode.setParent(this.mahjongSymbolSprite.node);
//                 mahjongTextSpriteNode.eulerAngles = Vec3.ZERO;
//                 mahjongTextSpriteNode.setPosition(Vec3.ZERO);
//                 resolve();
//             }, this);
//             const flipAnimationName = (this.isGoldenMahjong()) ? this.goldenMahjongFlipAnimationName : this.mahjongFlipAnimationName;
//             this.mahjongFlipAnimation.play(flipAnimationName);
//             this.stopMahjongFlipTween();
//             this.startMahjongTextFlipTween();
//         });
//     }

//     private async startMahjongTextFlipTween() {
//         const skinNode = this.mahjongTextSprite.node;
//         const posX = [2, 4, 8.489, 13.806, 26.839, 29.071, 35, 35]//??
//         const angleY = [5, 10, 15, 30, 45, 65, 85, 90]//??
//         const timePerFrame = 0.095;//??
//         let nextTime = timePerFrame;
//         const obj = { value: 0 };
//         const isGoldenMahjong = this.isGoldenMahjong();
//         const duration = (isGoldenMahjong) ? 0.29 : 0.5;
//         this.mahjonTextFlipTween = tween(obj).to(duration, {
//             value: 1//??
//         }, {
//             progress: (start, end, current, ratio) => {
//                 if (current > nextTime) {
//                     nextTime += timePerFrame;
//                     skinNode.setPosition(posX.shift(), skinNode.y);
//                     skinNode.eulerAngles = new Vec3(skinNode.eulerAngles.x, angleY.shift(), skinNode.eulerAngles.z);
//                 }
//                 return start + (end - start) * ratio;
//             }
//         }).start();

//         if (isGoldenMahjong) {
//             await delay(650);
//             this.showWildSymbolNode();
//         }
//     }

//     private stopMahjongFlipTween() {
//         if (this.mahjonTextFlipTween != null) {
//             this.mahjonTextFlipTween.stop();
//             this.mahjonTextFlipTween = null;
//             const skinNode = this.mahjongTextSprite.node;
//             skinNode.eulerAngles = Vec3.ZERO;
//             skinNode.setPosition(Vec3.ZERO);
//         }
//     }

//     private showMahjongSymbolNode() {
//         this.mahjongSymbolSprite.node.active = true;
//     }

//     private hideMahjongSymbolNode() {
//         this.mahjongSymbolSprite.node.active = false;
//     }
//     //
//     private async playWildFlipAnimation(flipParamter: FlipParamter) {
//         return new Promise<void>(resolve => {
//             const endIndex = flipParamter.endIndex;
//             const symbolNameAfterFlip = flipParamter.symbolNameAfterFlip;
//             this.mahjongWays2_CombinationEffect.stopLightAnimation();
//             this.showWildAnimationNode();
//             this.startWildSymbolTextFadeOut();
//             this.wildFlipAnimation.once(Animation.EventType.FINISHED, () => {
//                 this.setPositionByIndex(endIndex);
//                 this.setSkin(symbolNameAfterFlip);
//                 this.setSymbolName(symbolNameAfterFlip);
//                 this.symbolStateMachine.setState(SymbolState.Idle);
//                 this.hideWildSymbolNode();
//                 resolve();
//             }, this);
//             this.wildFlipAnimation.play(this.wildFlipAnimationName);
//         });
//     }


//     private onWildFlipAnimationFinished() {
//         this.hideWildAnimationNode();
//     }

//     private showWildAnimationNode() {
//         this.wildFlipAnimation.node.active = true;
//     }

//     private hideWildAnimationNode() {
//         this.wildFlipAnimation.node.active = false;
//     }

//     private showWildSymbolNode() {
//         this.wildSymbolSprite.node.active = true;
//     }

//     private hideWildSymbolNode() {
//         this.wildSymbolSprite.node.active = false;
//     }

//     private resetWildSymbolTextColor() {
//         this.wildSymbolTextSprite.color = Color.WHITE;
//     }

//     private startWildSymbolTextFadeOut() {
//         this.fadeOutTween.stopTween();
//         const wildSymbolTextSprite = this.wildSymbolTextSprite
//         const color = new Color(wildSymbolTextSprite.color);
//         this.fadeOutTween.tween = tween(color)
//             .to(0.75, { a: 0 }, {
//                 onUpdate: () => {
//                     wildSymbolTextSprite.color = color;
//                 }
//             })
//             .start();
//     }
//     //
//     private showScatterSymbolNode() {
//         this.scatterSymbolSprite.node.active = true;
//     }

//     private hideScatterSymbolNode() {
//         this.scatterSymbolSprite.node.active = false;
//     }

//     private showScatterBackground() {
//         this.scatterBackground.node.active = true;
//     }

//     private hideScatterBackground() {
//         this.scatterBackground.node.active = false;
//     }

//     private showScatterEffect() {
//         this.showScatterBackground();
//         this.scatterEffect.show();
//     }

//     private hideScatterEffect() {
//         this.hideScatterBackground();
//         this.scatterEffect.hide();
//     }

//     private checkButtonIinteractable() {
//         const siblingIndex = this.rootNode.getSiblingIndex();
//         const button = this.rootNode.getComponent(Button);
//         if (siblingIndex >= 4 && siblingIndex <= 7) {
//             button.interactable = true;
//         } else {
//             button.interactable = false;
//         }
//     }

//     private showGlow() {
//         this.flareSprite.node.active = true;
//         this.combinationGlowSprite.node.active = true;
//     }

//     private hideGlow() {
//         this.flareSprite.node.active = false;
//         this.combinationGlowSprite.node.active = false;
//     }

//     private async playScatterBounceEffect() {
//         return new Promise<void>(resolve => {
//             const symbolScale = this.symbolScale;
//             const scales = new Array<Vec3>();
//             scales.push(new Vec3(symbolScale.x * 0.98, symbolScale.y * 0.98));
//             scales.push(new Vec3(symbolScale.x * 1.2, symbolScale.y * 1.2));
//             scales.push(new Vec3(symbolScale.x * 0.7, symbolScale.y * 0.7));
//             scales.push(new Vec3(symbolScale.x, symbolScale.y));
//             this.scatterBunceEffect.tween = tween(this.scatterSymbolSprite.node)
//                 .to(0.02, { scale: scales[0] })
//                 .to(0.18, { scale: scales[1] })
//                 .call(() => resolve())
//                 .to(0.1, { scale: scales[2] })
//                 .to(0.1, { scale: scales[3] })
//                 .start()
//         });
//     }
// }

// export enum SymbolState {

//     Idle,

//     Spin,

//     Effect,

//     Combination,

//     Flip,

//     Shake,

//     Fall,

//     Reset
// }

// export interface SpinParameter {

//     step: number;

//     symbolName: SymbolName;

//     isCombination: boolean;

//     delay: number;

//     speed: number;

//     isEffectSpin: boolean;

//     isFirstEffectReel: boolean;
// }

// export interface FallParameter {

//     delay: number;

//     endIndex: number;
// }

// export interface FlipParamter {

//     endIndex: number;

//     symbolNameAfterFlip: SymbolName;
// }

// export interface SymbolParameter {

//     parent: Node;

//     reelIndex: number;

//     mahjongWays2_SymbolGuider: mahjongWays2_SymbolGuider;

//     mahjongWays2_UIFactory: mahjongWays2_UIFactory;

//     spriteFrameByName: Map<string, SpriteFrame>;

//     mahjongWays2_EventRepository: mahjongWays2_EventRepository;
// }
