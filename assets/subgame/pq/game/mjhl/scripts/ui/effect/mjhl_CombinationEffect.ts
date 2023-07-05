import { Animation, AnimationClip, Node, Tween, tween } from "cc";
import { } from "cc";
import mjhl_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class mjhl_CombinationEffect {

    private rootNode: Node;

    private lightAnimation: Animation;

    private lightAnimationName: string;

    private lightTween: Tween<Node>;

    public constructor(parent: Node, mjhl_UIFactory: mjhl_UIFactory) {
        this.createUI(parent, mjhl_UIFactory);
    }

    public destroy() {
        try {
            this.stopLightAnimation();
            this.stopLightTween();
        } catch (error) {
            console.log(`[mjhl_CombinationEffect] ${error}`);
        }
    }

    private createUI(parent: Node, mjhl_UIFactory: mjhl_UIFactory) {
        const rootNode = mjhl_UIFactory.createNode({
            parent: parent,
            name: "mjhl_CombinationEffect"
        });
        rootNode.setPosition(0, 5);
        this.rootNode = rootNode;

        this.lightAnimationName = "light";
        const lightAnimation = mjhl_UIFactory.createAnimationClipWithSpriteFrames(rootNode, [{
            pathes: [
                "mjhl/images/effects/mj_light/mjhl_light_01/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_02/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_03/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_04/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_05/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_06/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_07/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_08/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_09/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_10/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_11/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_12/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_13/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_14/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_15/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_16/spriteFrame",
                "mjhl/images/effects/mj_light/mjhl_light_17/spriteFrame"
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