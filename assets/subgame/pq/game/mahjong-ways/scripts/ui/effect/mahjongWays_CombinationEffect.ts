import { Animation, AnimationClip, Node, Tween, tween } from "cc";
import { } from "cc";
import mahjongWays_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class mahjongWays_CombinationEffect {

    private rootNode: Node;

    private lightAnimation: Animation;

    private lightAnimationName: string;

    private lightTween: Tween<Node>;

    public constructor(parent: Node, mahjongWays_UIFactory: mahjongWays_UIFactory) {
        this.createUI(parent, mahjongWays_UIFactory);
    }

    public destroy() {
        try {
            this.stopLightAnimation();
            this.stopLightTween();
        } catch (error) {
            console.log(`[mahjongWays_CombinationEffect] ${error}`);
        }
    }

    private createUI(parent: Node, mahjongWays_UIFactory: mahjongWays_UIFactory) {
        const rootNode = mahjongWays_UIFactory.createNode({
            parent: parent,
            name: "mahjongWays_CombinationEffect"
        });
        rootNode.setPosition(0, 5);
        this.rootNode = rootNode;

        this.lightAnimationName = "light";
        const lightAnimation = mahjongWays_UIFactory.createAnimationClipWithSpriteFrames(rootNode, [{
            pathes: [
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_01/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_02/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_03/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_04/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_05/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_06/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_07/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_08/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_09/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_10/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_11/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_12/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_13/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_14/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_15/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_16/spriteFrame",
                "mahjong-ways/images/effects/mj_light/mahjongWays_light_17/spriteFrame"
            ],
            clipName: this.lightAnimationName,
            wrapMode: AnimationClip.WrapMode.Loop

        }]);
        lightAnimation.node.setScale(1.3, 1.3);
        this.lightAnimation = lightAnimation;
    }

    public async playLightAnimation(delay: number) {
        return new Promise<void>(resolve => {
            this.stopLightTween();
            this.lightTween = tween(this.rootNode)
                .delay(delay)
                .call(() => {
                    this.showLightAnimationNode();
                    this.lightAnimation.play(this.lightAnimationName);
                })
                .delay(1)
                .call(() => resolve())
                .start();
        });
    }

    public stopLightAnimation() {
        this.lightAnimation.stop();
        this.hideLightAnimationNode();
    }

    private showRootNode() {
        this.rootNode.active = true;
    }

    private hideRootNode() {
        this.rootNode.active = false;
    }

    private showLightAnimationNode() {
        this.lightAnimation.node.active = true;
    }

    private hideLightAnimationNode() {
        this.lightAnimation.node.active = false;
    }

    private stopLightTween() {
        if (this.lightTween != null) {
            this.lightTween.stop();
            this.lightTween = null;
        }
    }
}