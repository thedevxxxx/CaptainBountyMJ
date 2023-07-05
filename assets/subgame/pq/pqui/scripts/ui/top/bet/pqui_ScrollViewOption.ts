import { Size, ScrollView, Tween, Label, Color, Vec2, Button, tween, Node, UITransform, Vec3 } from "cc";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class pqui_ScrollViewOption {

    public get currentValue() { return this.valueByItemIndex[this.currentItemIndex] }

    public get maxValue() { return this.valueByItemIndex[this.valueByItemIndex.length - 1] }

    public valueByItemIndex: Array<number>;

    private scrollView: ScrollView;

    private yPositionByItemIndex: Array<number>;

    private tween: Tween<Node>;

    private currentItemIndex: number;

    public constructor(parent: Node, scollViewOptionParamter: ScollViewOptionParameter, pqui_UIFactory: pqui_UIFactory) {
        this.currentItemIndex = 0;
        this.createUI(parent, scollViewOptionParamter, pqui_UIFactory);
    }

    public destroy() {
        try {
            this.stopMoveTween();
        } catch (error) {
            console.log(`[pqui_ScrollViewOption] ${error}`);
        }
    }

    public moveToByValue(value: number) {
        const index = this.valueByItemIndex.indexOf(value);
        this.currentItemIndex = index;
        this.startMoveTween(index);
    }

    private createUI(parent: Node, scollViewOptionParameter: ScollViewOptionParameter, pqui_UIFactory: pqui_UIFactory) {
        const rootNode = pqui_UIFactory.createNode({
            parent: parent,
            name: "pqui_ScrollViewOption"
        });
        rootNode.setPosition(scollViewOptionParameter.position);
        const rootNodeTransform = rootNode.addComponent(UITransform);
        rootNodeTransform.setContentSize(scollViewOptionParameter.contentSize);

        const titleLabel = pqui_UIFactory.createLabel({
            parent: rootNode,
            name: ""
        }, {
            string: scollViewOptionParameter.title,
            verticalAlign: Label.VerticalAlign.CENTER,
            horizontalAlign: Label.HorizontalAlign.CENTER,
            color: scollViewOptionParameter.labelColor ? scollViewOptionParameter.labelColor : Color.WHITE,
            fontSize: 30
        }, null, {
            top: 30
        });

        const rootNodeSize = rootNodeTransform.contentSize;
        const buttonSize = new Size(rootNodeSize.width, ((rootNodeSize.height * 0.8) / 5));
        const scrollView = pqui_UIFactory.createScrollView(rootNode, {
            scroViewSize: new Size(rootNodeSize.width, rootNodeSize.height * 0.8),
            contentHeight: rootNodeSize.height * 0.8,
            inertia: false,
            elastic: false
            //scrollViewSpriteFramePath: "pq/pqui/images/pqui_white/spriteFrame",
        }, {
            bottom: 0
        });
        this.scrollView = scrollView;

        scrollView.node.on("scroll-ended", (scrollView) => {
            this.onScrollEnded(scrollView);
            scollViewOptionParameter.onValueChangeByTouchUp();
        }, this);

        this.createEmptyButton(scrollView.content,
            new Vec2(0, ((buttonSize.height * 0.5 * -1) - (buttonSize.height * 0))),
            buttonSize,
            scollViewOptionParameter.extraButtonLabelContents[0],
            scollViewOptionParameter.labelColor,
            pqui_UIFactory
        );
        this.createEmptyButton(scrollView.content,
            new Vec2(0, ((buttonSize.height * 0.5 * -1) - (buttonSize.height * 1))),
            buttonSize,
            scollViewOptionParameter.extraButtonLabelContents[1],
            scollViewOptionParameter.labelColor,
            pqui_UIFactory
        );
        this.yPositionByItemIndex = new Array<number>();
        this.valueByItemIndex = new Array<number>();
        const baseY = scrollView.getContentPosition().y;
        const itemCountBeforeLoop = 2;
        const values = scollViewOptionParameter.values;
        for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
            const value = values[valueIndex].toFixed(scollViewOptionParameter.fractionDigits);
            this.valueByItemIndex.push(+value);
            pqui_UIFactory.createButton({
                parent: scrollView.content,
                name: ""
            }, {
                position: new Vec2(0, ((buttonSize.height * 0.5 * -1) - (buttonSize.height * (valueIndex + itemCountBeforeLoop)))),
                contentSize: buttonSize,
                transition: Button.Transition.NONE,
                onClick: () => {
                    this.onItemClick(valueIndex);
                    scollViewOptionParameter.onValueChangeByTouchUp();
                }
            }, null, {
                string: `${scollViewOptionParameter.itemStringPrefix}${value}`,
                color: scollViewOptionParameter.labelColor
            })
            this.yPositionByItemIndex.push(baseY + (buttonSize.height * valueIndex));
        }
        this.createEmptyButton(scrollView.content,
            new Vec2(0, ((buttonSize.height * 0.5 * -1) - (buttonSize.height * (values.length + 2)))),
            buttonSize,
            scollViewOptionParameter.extraButtonLabelContents[2],
            scollViewOptionParameter.labelColor,
            pqui_UIFactory);
        this.createEmptyButton(scrollView.content,
            new Vec2(0, ((buttonSize.height * 0.5 * -1) - (buttonSize.height * (values.length + 3)))),
            buttonSize,
            scollViewOptionParameter.extraButtonLabelContents[3],
            scollViewOptionParameter.labelColor,
            pqui_UIFactory);

        const extraButtonCount = 4;
        const contentTransform = scrollView.content.getComponent(UITransform);
        contentTransform.setContentSize(contentTransform.contentSize.width, (values.length + extraButtonCount) * buttonSize.height);
    }

    private createEmptyButton(parent: Node, position: Vec2, contentSize: Size, labelContent: string, labelColor: Color, pqui_UIFactory: pqui_UIFactory) {
        pqui_UIFactory.createButton({
            parent: parent,
            name: ""
        }, {
            position: position,
            contentSize: contentSize,
            transition: Button.Transition.NONE,
        }, null, {
            string: labelContent,
            color: labelColor
        });
    }

    private onScrollEnded(scrollView: ScrollView) {
        const currentY = scrollView.getContentPosition().y;
        const distances = new Array<number>()
        this.yPositionByItemIndex.forEach(itemY => {
            distances.push(Math.abs(currentY - itemY));
        });
        const minDistance = Math.min.apply(null, distances);
        const minDistanceIndex = distances.indexOf(minDistance);
        this.currentItemIndex = minDistanceIndex;
        this.stopMoveTween();
        this.startMoveTween(minDistanceIndex);
    }

    private onItemClick(itemIndex: number) {
        this.currentItemIndex = itemIndex;
        this.stopMoveTween();
        this.startMoveTween(itemIndex);
    }

    private startMoveTween(index: number) {
        const y = this.yPositionByItemIndex[index];
        this.tween = tween(this.scrollView.content)
            //  .delay(0.5)
            .to(0.1, { y: y })
            .start();
    }

    private stopMoveTween() {
        if (this.tween != null) {
            this.tween.stop();
            this.tween = null;
        }
    }
}

export interface ScollViewOptionParameter {
    position: Vec3;
    contentSize: Size;
    title: string;
    labelColor: Color;
    values: Array<number>;
    extraButtonLabelContents: Array<string>;
    itemStringPrefix: string;
    fractionDigits: number;
    onValueChangeByTouchUp: Function;
}