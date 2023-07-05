import { Color, Node, Size, Sprite, UITransform } from "cc";
import mjhl_EventRepository from "../../../../../script/event/pq_EventRepository";
import mjhl_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class mjhl_Paytable {

    public constructor(mjhl_UIFactory: mjhl_UIFactory, mjhl_EventRepository: mjhl_EventRepository) {
        mjhl_EventRepository.onShowPaytable.Attach((node) => {
            this.createUI(node, mjhl_UIFactory);
        });
    }

    private createUI(parent: Node, mjhl_UIFactory: mjhl_UIFactory) {
        const scrollViewSize = parent.getComponent(UITransform).contentSize;
        const scrollView = mjhl_UIFactory.createScrollView(parent, {
            scroViewSize: scrollViewSize,
            contentHeight: scrollViewSize.height,
            barSpriteFramePath: "mjhl/images/mjhl_default_scrollbar_vertical/spriteFrame",
            barColor: new Color(96, 96, 100),
            inertia: false,
            elastic: false,
        }, {
            top: 100
        });
        scrollView.verticalScrollBar.enableAutoHide = true;
        const scrollViewContent = scrollView.content;
        mjhl_UIFactory.addVerticalLayout(scrollViewContent, 2);

        const origianlHeights = [537, 436, 250, 604, 700];
        const origianlWidth = 381;
        for (let index = 0; index < 5; index++) {
            const scaleRate = (scrollViewSize.width / origianlWidth);
            const paytablePanel = mjhl_UIFactory.createSprite({
                parent: scrollViewContent,
                name: "paytablePanel"
            }, {
                contentSize: new Size(scrollViewSize.width, (origianlHeights[index] * scaleRate)),
                type: Sprite.Type.SIMPLE,
                sizeMode: Sprite.SizeMode.CUSTOM,
                spriteFramePath: `mjhl/images/paytable/mjhl_paytable${index}/spriteFrame`,
            });
        }
    }

    public destroy() {

    }
}