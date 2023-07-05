// import { Node, Vec3 } from "cc";
// import AnimationPlayer from "../animations/mahjongWays2_AnimationPlayer";
// import mahjongWays2_UIFactory from "../../../../../script/ui/pq_UIFactory";
// import { sp } from "cc";
// import { log } from "cc";

// export default class ScatterEffect {

//     private rootNode: Node;

//     private particleAnimationPlayer: AnimationPlayer;

//     private explosionAnimationPlayer: AnimationPlayer;

//     private reflectionAnimationPlayer: AnimationPlayer;

//     public constructor() {

//     }

//     public async init(scatterEffectParameter: ScatterEffectParameter) {
//         const mahjongWays2_UIFactory = scatterEffectParameter.mahjongWays2_UIFactory;
//         const parent = scatterEffectParameter.parent;

//         const rootNode = mahjongWays2_UIFactory.createNode({
//             parent: parent,
//             name: "ScatterEffect",
//         });
//         this.rootNode = rootNode;

//         log('scatter_vfx_b load')
//         const particleSkeletonNode = hqq.addNode(rootNode,{
//             Res:hqq['pq'],
//             skeleton:"game/mahjong-ways2/animations/spines/scatter_vfx_b/",
//             name:"particleSkeleton"
//         }); 
//         this.particleAnimationPlayer = new AnimationPlayer(particleSkeletonNode.getComponent(sp.Skeleton));
        
//         log('scatter_vfx_d load')
//         const explosionSkeletonNode = hqq.addNode(rootNode,{
//             Res:hqq['pq'],
//             skeleton:"game/mahjong-ways2/animations/spines/scatter_vfx_d/",
//             name:"explosionSkeleton"
//         }); 
//         this.explosionAnimationPlayer = new AnimationPlayer(explosionSkeletonNode.getComponent(sp.Skeleton));

//         log('scatter_vfx_a load')
//         const reflectionSkeletonNode = hqq.addNode(rootNode,{
//             Res:hqq['pq'],
//             skeleton:"game/mahjong-ways2/animations/spines/scatter_vfx_a/",
//             name:"reflectionSkeleton",
//             scale:1.3
//         }); 
//         this.reflectionAnimationPlayer = new AnimationPlayer(reflectionSkeletonNode.getComponent(sp.Skeleton));

//         return this;
//     }

//     public destroy() {
//         this.particleAnimationPlayer.destroy();
//         this.explosionAnimationPlayer.destroy();
//         this.reflectionAnimationPlayer.destroy();

//         this.particleAnimationPlayer = null;
//         this.explosionAnimationPlayer = null;
//         this.reflectionAnimationPlayer = null;
//     }


//     public async playEffect() {
//         this.particleAnimationPlayer.stopAnimation();
//         this.explosionAnimationPlayer.stopAnimation();
//         this.reflectionAnimationPlayer.stopAnimation();

//         this.particleAnimationPlayer.playAnimationOnce("animation");
//         await this.explosionAnimationPlayer.playAnimationOnce("animation", 2);
//         await this.reflectionAnimationPlayer.playAnimationOnce("animation");
//     }

//     public show() {
//         this.rootNode.active = true;
//     }

//     public hide() {
//         this.rootNode.active = false;
//     }
// }

// interface ScatterEffectParameter {

//     mahjongWays2_UIFactory: mahjongWays2_UIFactory;

//     parent: Node;
// }