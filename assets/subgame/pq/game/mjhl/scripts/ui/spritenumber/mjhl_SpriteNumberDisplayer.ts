import { Layout, Node, Size, Sprite, SpriteFrame, tween, Tween, Widget } from "cc";
import { formatGold } from "../../../../../script/formatter/pq_Formatter";
import mjhl_UIFactory,{WidgetParameter} from "../../../../../script/ui/pq_UIFactory";

export default class mjhl_SpriteNumberDisplayer {

    public layoutNode: Node;

    private mjhl_UIFactory: mjhl_UIFactory;

    private spriteNumberDisplayerParameter: SpriteNumberDisplayerParameter;

    private numberTween: Tween<{ value: number }>

    private onStartTweenToNumber: Function;

    private onTweenToNumberFinished: Function;

    private resolve: (value: void | PromiseLike<void>) => void;

    public constructor(spriteNumberDisplayerParameter: SpriteNumberDisplayerParameter) {
        this.spriteNumberDisplayerParameter = spriteNumberDisplayerParameter;
        const parent = spriteNumberDisplayerParameter.parent;
        const mjhl_UIFactory = spriteNumberDisplayerParameter.mjhl_UIFactory;
        const onStartTweenToNumber = spriteNumberDisplayerParameter.onStartTweenToNumber;
        const onTweenToNumberFinished = spriteNumberDisplayerParameter.onTweenToNumberFinished;

        this.mjhl_UIFactory = mjhl_UIFactory;
        this.onStartTweenToNumber = onStartTweenToNumber;
        this.onTweenToNumberFinished = onTweenToNumberFinished;

        const layoutNode = mjhl_UIFactory.createNode({
            parent: parent,
            name: "layout"
        });
        mjhl_UIFactory.addHorizontalLayout(layoutNode, {
            resizeMode: Layout.ResizeMode.CONTAINER,
            spacingX: -10
        });
        mjhl_UIFactory.addWidget(layoutNode, spriteNumberDisplayerParameter.widgetParameter);
        this.layoutNode = layoutNode;
    }

    public destroy() {
        this.stopTweenToNumber();
    }

    public async startTweenToNumber(tweenToNumberParameter: TweenToNumberParameter) {
        return new Promise<void>(resolve => {
            const startValue = tweenToNumberParameter.startValue;
            const endValue = tweenToNumberParameter.endValue;
            const duration = tweenToNumberParameter.duration;
            const onCompleted = tweenToNumberParameter.onCompleted;

            console.log(`[mjhl_FreeGameSettlePanel] mjhl_SpriteNumberDisplayer ${endValue}`);

            this.resolve = resolve;

            this.stopTweenToNumber();

            const object = { value: startValue };

            this.onStartTweenToNumber?.();

            this.numberTween = tween(object)
                .to(duration, {
                    value: endValue
                }, {
                    progress: (start: number, end: number, current: number, ratio: number) => {
                        const value = formatGold(current);
                        this.setSpriteNumber(+value);
                        return start + (end - start) * ratio;
                    }
                })
                .call(() => {
                    this.finishTweenToNumber(endValue);
                    onCompleted?.();
                })
                .start();
        });
    }

    public finishTweenToNumber(endValue: number) {
        const value = formatGold(endValue);
        this.setSpriteNumber(+value);
        this.onTweenToNumberFinished?.();
        this.resolve?.();
        this.resolve = null;
    }

    public stopTweenToNumber() {
        if (this.numberTween) {
            this.numberTween.stop();
            this.numberTween = null;
        }
    }

    public async setSpriteNumber(number: number) {
        let spriteFrameNames: Array<string>;
        const hasComma = this.spriteNumberDisplayerParameter.hasComma;
        if (hasComma) {
            spriteFrameNames = number.toFixed(2).toLocaleString().split("");
        } else {
            spriteFrameNames = Math.floor(number).toString().split("");
        }
        let sprites = this.layoutNode.getComponentsInChildren(Sprite);
        if (spriteFrameNames.length !== sprites.length) {
            if (spriteFrameNames.length > sprites.length) {
                const lack = (spriteFrameNames.length - sprites.length);
                for (let index = 0; index < lack; index++) {
                    const sprite = this.mjhl_UIFactory.createSprite({
                        parent: this.layoutNode,
                        name: ""
                    }, {
                        name: "digits",
                        sizeMode: Sprite.SizeMode.RAW,
                        type: Sprite.Type.SIMPLE
                    });
                }
            } else {
                const redundantCount = (sprites.length - spriteFrameNames.length)
                for (let index = 0; index < redundantCount; index++) {
                    const child = this.layoutNode.children[0];
                    child.setParent(null);
                    child.destroy();
                }
            }
        }
        sprites = this.layoutNode.getComponentsInChildren(Sprite);
        for (let index = 0; index < spriteFrameNames.length; index++) {
            const sprite = sprites[index];
            const node = sprite.node;
            let spriteFrameName = spriteFrameNames[index];
            if (hasComma) {
                let y = 0;
                if (spriteFrameName === ".") {
                    spriteFrameName = "dot";
                    y = -50;
                } else if (spriteFrameName === ",") {
                    spriteFrameName = "comma";
                    y = -50;
                }
                node.setPosition(node.position.x, y);
            }
            sprite.spriteFrame = await this.mjhl_UIFactory.assetRepository.getAsset<SpriteFrame>(`mjhl/images/freegame/num/mjhl_num_gold_guang_${spriteFrameName}/spriteFrame`, SpriteFrame);
        }
    }

    public updateWidgetAlignment() {
        this.layoutNode.getComponent(Widget).updateAlignment();
    }
}

export interface SpriteNumberDisplayerParameter {

    parent: Node;

    mjhl_UIFactory: mjhl_UIFactory;

    hasComma: boolean;

    widgetParameter: WidgetParameter;

    onStartTweenToNumber?: Function;

    onTweenToNumberFinished?: Function;
}

export interface TweenToNumberParameter {

    startValue: number;

    endValue: number;

    duration: number;

    onCompleted?: Function;
}