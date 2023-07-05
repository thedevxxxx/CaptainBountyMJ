import { Color, Node, Size, Sprite, UITransform } from "cc";
import mahjongWays2_EventRepository from "../../../../../script/event/pq_EventRepository";
import mahjongWays2_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class mahjongWays2_Paytable {

    public constructor(mahjongWays2_UIFactory: mahjongWays2_UIFactory, mahjongWays2_EventRepository: mahjongWays2_EventRepository) {
        mahjongWays2_EventRepository.onShowPaytable.Attach((node) => {
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

        const origianlHeights = [537, 436, 250, 604, 700];
        const origianlWidth = 381;
        for (let index = 0; index < 5; index++) {
            const scaleRate = (scrollViewSize.width / origianlWidth);
            const paytablePanel = mahjongWays2_UIFactory.createSprite({
                parent: scrollViewContent,
                name: "paytablePanel"
            }, {
                contentSize: new Size(scrollViewSize.width, (origianlHeights[index] * scaleRate)),
                type: Sprite.Type.SIMPLE,
                sizeMode: Sprite.SizeMode.CUSTOM,
                spriteFramePath: `mahjong-ways2/images/paytable/mahjongWays2_paytable${index}/spriteFrame`,
            });
        }
    }

    public destroy() {

    }
}