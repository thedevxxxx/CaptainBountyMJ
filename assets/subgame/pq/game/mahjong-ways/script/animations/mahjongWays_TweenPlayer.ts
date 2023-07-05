import { Tween } from "cc";

export default class mahjongWays_TweenPlayer<T> {

    public tween: Tween<T>;

    public constructor() {

    }

    public destroy() {
        this.stopTween();
    }

    public stopTween() {
        if (this.tween != null) {
            this.tween.stop();
            this.tween = null;
        }
    }
}