
import { Node, Vec3 } from "cc";
// import AnimationPlayer from "../animations/mahjongWays_AnimationPlayer";
import mahjongWays_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { sp } from "cc";
import { log } from "cc";

export default class ReelEffect {

    // private animationPlayers: Array<AnimationPlayer>;

    private rootNode: Node;

    public constructor() {

    }

    // public async init(reelEffectParameter: ReelEffectParameter) {
    //     const mahjongWays_UIFactory = reelEffectParameter.mahjongWays_UIFactory;
    //     const parent = reelEffectParameter.parent;

    //     // this.animationPlayers = new Array<AnimationPlayer>();

    //     const rootNode = mahjongWays_UIFactory.createNode({
    //         name: "ReelEffect",
    //         parent: parent,
    //     });
    //     this.rootNode = rootNode;

    //     log('fast_vfx_b load')
    //     const particleMiddleNode = hqq.addNode(rootNode,{
    //         Res:hqq['pq'],
    //         skeleton:"game/mahjong-ways/animations/spines/fast_vfx_b/",
    //         name:"particleMiddle"
    //     }); 
    //     const particleMiddleAnimationPlayer = new AnimationPlayer(particleMiddleNode.getComponent(sp.Skeleton));
        
    //     log('fast_vfx_c load')
    //     const particleRightNode = hqq.addNode(rootNode,{
    //         Res:hqq['pq'],
    //         skeleton:"game/mahjong-ways/animations/spines/fast_vfx_c/",
    //         name:"particleRight",
    //         scaleX: -1.5, scaleY:1.5,x:150,y:0 
    //     }); 
    //     const particleRightAnimationPlayer = new AnimationPlayer(particleRightNode.getComponent(sp.Skeleton));
        
    //     log('fast_vfx_c load')
    //     const particleLeftNode = hqq.addNode(rootNode,{
    //         Res:hqq['pq'],
    //         skeleton:"game/mahjong-ways/animations/spines/fast_vfx_c/",
    //         name:"particleLeft",
    //         scaleX:1.5, scaleY:1.5,x:-150,y:0 
    //     }); 
    //     const particleLeftAnimationPlayer = new AnimationPlayer(particleLeftNode.getComponent(sp.Skeleton));

    //     log('fast_vfx_d load')
    //     const towingNode = hqq.addNode(rootNode,{
    //         Res:hqq['pq'],
    //         skeleton:"game/animations/spines/fast_vfx_d/",
    //         name:"towing",
    //         scale:1.5
    //     }); 
    //     const towingAnimationPlayer = new AnimationPlayer(towingNode.getComponent(sp.Skeleton));

    //     log('fast_vfx_a load')
    //     const lightEffectRightNode = hqq.addNode(rootNode,{
    //         Res:hqq['pq'],
    //         skeleton:"game/mahjong-ways/animations/spines/fast_vfx_a/",
    //         name:"lightEffectRight",
    //         scale:1.5,x:175,y:0
    //     }); 
    //     const lightEffectRightAnimationPlayer = new AnimationPlayer(lightEffectRightNode.getComponent(sp.Skeleton));

    //     log('fast_vfx_a2 load')
    //     const lightEffectLeftNode = hqq.addNode(rootNode,{
    //         Res:hqq['pq'],
    //         skeleton:"game/mahjong-ways/animations/spines/fast_vfx_a/",
    //         name:"lightEffectLeft",
    //         scaleX:-1.5,scaleY:1.5,x:-175,y:0
    //     }); 
    //     const lightEffectLeftAnimationPlayer = new AnimationPlayer(lightEffectLeftNode.getComponent(sp.Skeleton));

    //     this.animationPlayers.push(lightEffectRightAnimationPlayer);
    //     this.animationPlayers.push(lightEffectLeftAnimationPlayer);
    //     this.animationPlayers.push(particleMiddleAnimationPlayer);
    //     this.animationPlayers.push(particleRightAnimationPlayer);
    //     this.animationPlayers.push(particleLeftAnimationPlayer);
    //     this.animationPlayers.push(towingAnimationPlayer);

    //     return this;
    // }

    // public destroy() {
    //     this.animationPlayers.forEach(animationPlayer => {
    //         animationPlayer.destroy();
    //     })
    //     this.animationPlayers.length = 0;
    //     this.animationPlayers = null;
    // }

    // public async playEffects() {
    //     this.animationPlayers.forEach(animationPlayer => {
    //         animationPlayer.stopAnimation();
    //         animationPlayer.playAnimationLoop("animation");
    //     });
    // }

    // public stopEffects() {
    //     this.animationPlayers.forEach(animationPlayer => {
    //         animationPlayer.stopAnimation();
    //     });
    // }

    public setPositionByIndex(index: number) {
        const baseIndex = 2;
        const spacingX = 140;
        const positionX = ((baseIndex - index) * spacingX) * -1;
        this.rootNode.setPosition(new Vec3(positionX, 150));
    }
}

interface ReelEffectParameter {

    mahjongWays_UIFactory: mahjongWays_UIFactory;

    parent: Node;
}