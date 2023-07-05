import { isValid, Node, sp } from "cc";

export default class AnimationPlayer {

    private skeleton: sp.Skeleton;

    public constructor(skeleton: sp.Skeleton) {
        this.skeleton = skeleton;
        this.stopAnimation()
    }

    public destroy() {

    }

    /**
     * 播放一次
     * @param animationName 动画名称
     * @param callback      播放完成执行回调
     * @param stopEnd       播放完成是否继续显示动画
     * @param timeScale     时间缩放
     * @returns 
     */
    public async playAnimationOnce(animationName: string, callback?:Function, stopEnd?:boolean, timeScale?: number) {
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
                this.stopAnimation(stopEnd);
                callback && callback()
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

    public stopAnimation(stopEnd?:boolean) {
        const skeleton = this.skeleton;
        if (!isValid(skeleton.node, true)) {
            return;
        }
        if (!this.isPlaying()) {
            return;
        }
        skeleton.clearTracks();
        if (!stopEnd) skeleton.node.active = false;
    }

    public isPlaying() {
        return this.skeleton.node.active;
    }

    public setParent(node: Node) {
        this.skeleton.node.setParent(node);
    }
}