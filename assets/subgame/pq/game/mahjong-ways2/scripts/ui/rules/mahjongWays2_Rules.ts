import { Color, Node, Size, Sprite, UITransform } from "cc";
import mahjongWays2_EventRepository from "../../../../../script/event/pq_EventRepository";
import mahjongWays2_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class mahjongWays2_Rules {

    public constructor(mahjongWays2_UIFactory: mahjongWays2_UIFactory, mahjongWays2_EventRepository: mahjongWays2_EventRepository) {
        mahjongWays2_EventRepository.onShowRules.Attach((node) => {
            this.createUI(node, mahjongWays2_UIFactory);
        });
    }

    private createUI(parent: Node, mahjongWays2_UIFactory: mahjongWays2_UIFactory) {
        const scrollViewSize = parent.getComponent(UITransform).contentSize;
        const scrollView = mahjongWays2_UIFactory.createScrollView(parent, {
            scroViewSize: scrollViewSize,
            contentHeight: scrollViewSize.height,
            barSpriteFramePath: "mahjong-ways2/images/mahjongWays2_default_scrollbar_vertical/spriteFrame",
            barColor: new Color(96, 96, 100),
            inertia: false,
            elastic: false,
        }, {
            top: 100
        });
        scrollView.verticalScrollBar.enableAutoHide = true;
        const scrollViewContent = scrollView.content;
        mahjongWays2_UIFactory.addVerticalLayout(scrollViewContent, 2);

        const origianlHeights = [628, 129, 201, 166, 897, 227];
        const origianlWidth = 305;
        for (let index = 0; index < 6; index++) {
            const scaleRate = (scrollViewSize.width / origianlWidth);
            const RulesPanel = mahjongWays2_UIFactory.createSprite({
                parent: scrollViewContent,
                name: "RulesPanel"
            }, {
                contentSize: new Size(scrollViewSize.width, (origianlHeights[index] * scaleRate)),
                type: Sprite.Type.SIMPLE,
                sizeMode: Sprite.SizeMode.CUSTOM,
                spriteFramePath: `mahjong-ways2/images/rule/mahjongWays2_rule${index}/spriteFrame`,
            });
        }
    }

    public destroy() {

    }
}