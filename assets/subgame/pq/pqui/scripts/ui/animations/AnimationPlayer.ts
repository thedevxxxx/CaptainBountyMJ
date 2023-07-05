import { isValid, Node, sp } from "cc";

export default class AnimationPlayer {

    private skeleton: sp.Skeleton;

    public constructor(skeleton: sp.Skeleton) {
        this.skeleton = skeleton;
        this.stopAnimation()
    }

    public destroy() {

    }

    public async playAnimationOnce(animationName: string, timeScale?: number) {
        return new Promise<void>((resolve, reject) => {
            const skeleton = this.skeleton;
            if (!isValid(skeleton.node, true)) {
                reject();
                return;
            }
            if (this.isPlaying()) {
                reject();
                return;
            }
            skeleton.node.active = true;
            skeleton.setCompleteListener(() => {
                this.stopAnimation()
                resolve();
            });
            if (timeScale != null) {
                skeleton.timeScale = timeScale;
            }
            skeleton.setAnimation(0, animationName, false);
        });
    }

    public playAnimationLoop(animationName: string) {
        const skeleton = this.skeleton;
        if (!isValid(skeleton.node, true)) {
            return;
        }
        if (this.isPlaying()) {
            return;
        }
        skeleton.node.active = true;
        skeleton.setCompleteListener(() => { });
        skeleton.setAnimation(0, animationName, true);
    }

    public stopAnimation() {
        const skeleton = this.skeleton;
        if (!isValid(skeleton.node, true)) {
            return;
        }
        if (!this.isPlaying()) {
            return;
        }
        skeleton.clearTracks();
        skeleton.node.active = false;
    }

    public isPlaying() {
        return this.skeleton.node.active;
    }

    public setParent(node: Node) {
        this.skeleton.node.setParent(node);
    }
}