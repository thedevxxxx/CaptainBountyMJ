import { Node, Size, Sprite, Widget } from "cc";
import pqui_EventRepository from "../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../script/ui/pq_UIFactory";

export default class pqui_BottomBackground {

    private pqui_EventRepository: pqui_EventRepository;

    public readonly rootNode: Node;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository) {
        this.pqui_EventRepository = pqui_EventRepository;
        const background = pqui_UIFactory.createSprite({
            parent: parent,
            name: ""
        }, {
            contentSize: new Size(750, 213),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_default_sprite_splash/spriteFrame"
        }, {
            bottom: 0,
        });
        this.rootNode = background.node;
        pqui_EventRepository.onShowBottomBackgroundUI.Attach(this.show);
        pqui_EventRepository.onHideBottomBackgroundUI.Attach(this.hide);
    }

    public destroy() {
        this.pqui_EventRepository.onShowBottomBackgroundUI.Detach(this.show);
        this.pqui_EventRepository.onHideBottomBackgroundUI.Detach(this.hide);
    }

    public show = () => {
        this.rootNode.active = true;
    }

    public hide = () => {
        this.rootNode.active = false;
    }
}