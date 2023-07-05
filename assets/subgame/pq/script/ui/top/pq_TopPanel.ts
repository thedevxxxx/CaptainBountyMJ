import { Vec2, Mask, Color, Widget } from "cc";
import { Label, Node, ScrollView, Size, Sprite, UITransform } from "cc";
import { hallNoticeBoard } from "../../../../../base/common/hallNoticeBoard";
import pq_Config from "../../config/pq_Config";
import pq_EventRepository from "../../event/pq_EventRepository";
import pq_UIFactory from "../pq_UIFactory";

export default class pq_TopPanel {

    private node: Node;

    private idLabel: Label;

    private timeLabel: Label;

    private versionLabel: Label;

    private trumpetNode: Node;

    private interval: ReturnType<typeof setInterval>;

    public constructor(parent: Node, pq_UIFactory: pq_UIFactory, pq_config: pq_Config, pq_EventRepository: pq_EventRepository) {
        this.createUI(parent, pq_UIFactory, pq_EventRepository);
        this.setID(pq_config.userId.toString());
        //this.setVersion(`${pq_config.version}\nv0.0.0`);
        this.setVersion(`${pq_config.version}-v0.0.0`);
        this.updateTime();

        this.startUpdateTime();
    }

    public destroy() {
        this.clearInterval();
    }

    public setID(id: string) {
        this.idLabel.string = `ID:${id}`;
    }

    public setVersion(content: string) {
        console.log(`[pq_TopPanel] version:${content}`);
        this.versionLabel.string = content;
    }

    public setScale(isProtrait: boolean) {
        if (isProtrait) {
            //this.node.scale = 0.56;
            this.trumpetNode.active = false;
        } else {
            //this.node.scale = 1;
            this.trumpetNode.active = true;
        }
    }

    private async createUI(parent: Node, pq_UIFactory: pq_UIFactory, pq_EventRepository: pq_EventRepository) {
        const background = pq_UIFactory.createSprite({
            parent: parent,
            name: ""
        }, {
            contentSize: new Size(1280, 84),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/bigImage/pq_banner_top/spriteFrame"
        }, {
            top: 0,
            left: 0,
            right: 0
        });
        this.node = background.node;

        const exitButoon = pq_UIFactory.createButton({
            parent: background.node,
            name: ""
        }, {
            contentSize: new Size(130, 80),
            onClick: () => pq_EventRepository.onExitButtonClick.Notify()
        }, null, null, {
            left: 0,
        });

        const trumpet = pq_UIFactory.createSprite({
            parent: background.node,
            name: ""
        }, {
            contentSize: new Size(400, 46),
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/images/pq_namebg/spriteFrame"
        }, {
            left: 240,
            top: 17
        });
        const scrollViewSprite = pq_UIFactory.createSprite({
            parent: trumpet.node,
            name: ""
        }, {
            position: new Vec2(0, 30),
            contentSize: new Size(340, 46)
        });
        const scrollView = scrollViewSprite.addComponent(ScrollView);
        scrollView.horizontal = false;
        scrollView.vertical = false;
        scrollView.inertia = true;
        scrollView.brake = 0.75;
        scrollView.elastic = true;
        scrollView.bounceDuration = 0.23;
        const view = pq_UIFactory.createNode({
            parent: scrollView.node,
            name: "view"
        });
        view.addComponent(UITransform).setContentSize(340, 46);
        view.addComponent(Mask);
        const content = pq_UIFactory.createNode({
            parent: view,
            name: "content"
        });
        content.addComponent(UITransform).setContentSize(340, 46);
        const richText = pq_UIFactory.createRichText(content, {
            string: "",
            horizontalAlign: Label.HorizontalAlign.LEFT,
            fontSize: 30,
            maxWidth: 0,
            lineHeight: 46
        });
        scrollView.content = content;
        if (false) {//??
            const noticeBoard = trumpet.addComponent(hallNoticeBoard);
            noticeBoard.label = richText;
            noticeBoard.noticeScroll = scrollView;
        }
        const trumpetIcon = pq_UIFactory.createSprite({
            parent: trumpet.node,
            name: ""
        }, {
            position: new Vec2(-170, 0.6),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.RAW,
            spriteFramePath: "pq/images/pq_sp_trumpet/spriteFrame"
        });

        const idLabel = pq_UIFactory.createLabel({
            parent: background.node,
            name: ""
        }, {
            contentSize: new Size(226, 67),
            horizontalAlign: Label.HorizontalAlign.CENTER,
            verticalAlign: Label.VerticalAlign.CENTER,
            fontSize: 30,
            lineHeight: 30,
            color: Color.WHITE
        }, null, {
            right: 500
        });
        this.idLabel = idLabel;

        const timeLabel = pq_UIFactory.createLabel({
            parent: background.node,
            name: ""
        }, {
            contentSize: new Size(330, 67),
            horizontalAlign: Label.HorizontalAlign.CENTER,
            verticalAlign: Label.VerticalAlign.CENTER,
            fontSize: 30,
            lineHeight: 30,
            color: Color.WHITE
        }, null, {
            right: 170
        });
        this.timeLabel = timeLabel;

        const versionLabel = pq_UIFactory.createLabel({
            parent: background.node,
            name: ""
        }, {
            contentSize: new Size(170, 67),
            horizontalAlign: Label.HorizontalAlign.CENTER,
            verticalAlign: Label.VerticalAlign.CENTER,
            fontSize: 30,
            lineHeight: 30,
            color: Color.WHITE
        }, null, {
            right: 0
        });
        this.versionLabel = versionLabel;

        const spineSkeleton = await pq_UIFactory.createSpineSkeletonAsync({
            nodeParameter: {
                parent: exitButoon.node
            },
            skeletonDataPath: "pq/animations/pq_eff_top_btn_back/pq_eff_top_btn_back",
        });
        spineSkeleton.node.setPosition(0, 3);
        spineSkeleton.setAnimation(0, "animation", true);
    }

    private startUpdateTime() {
        this.clearInterval();
        this.interval = setInterval(() => this.updateTime(), 1000);
    }

    private clearInterval() {
        if (this.interval != null) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    private updateTime() {
        if (this.timeLabel == null) {
            this.clearInterval();
            console.log(`[pq_Loading] clearInterval when timeLabel is null.`);
            return;
        }
        let date = this.getDate();
        //this.timeLabel.string = `${date.year}-${date.month}-${date.date}\n${date.hour}:${date.min}:${date.sec}`;
        this.timeLabel.string = `${date.year}-${date.month}-${date.date} ${date.hour}:${date.min}:${date.sec}`;
    }

    private getDate() {
        const date = new Date();
        return {
            year: date.getFullYear() + "",
            month: this.getDateFormat(date.getMonth() + 1),
            date: this.getDateFormat(date.getDate()),
            hour: this.getDateFormat(date.getHours()),
            min: this.getDateFormat(date.getMinutes()),
            sec: this.getDateFormat(date.getSeconds())
        }
    }

    private getDateFormat(n: number): string {
        return (n < 10) ? ("0" + n) : ("" + n);
    }
}