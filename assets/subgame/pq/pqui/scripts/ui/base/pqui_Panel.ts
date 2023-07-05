import { Vec3, Tween, Button, Sprite, BlockInputEvents, tween, Color, Node, UITransform, Size } from "cc";
import pqui_UIFactory from "../../../../script/ui/pq_UIFactory";

export default class pqui_Panel {

    public backgroundNode: Node;

    private pqui_UIFactory: pqui_UIFactory;

    private rootNode: Node;

    private tween: Tween<Node>;

    private closeCallback: Function;

    public constructor(pqui_PanelParameter: pqui_PanelParamter) {
        const pqui_UIFactory = pqui_PanelParameter.pqui_UIFactory;
        this.pqui_UIFactory = pqui_UIFactory;

        const canvasArea = pqui_UIFactory.createNode({
            parent: pqui_PanelParameter.parent,
            name: "pqui_Panel"
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            target: pqui_UIFactory.canvasNode
        });
        this.rootNode = canvasArea;

        this.closeCallback = pqui_PanelParameter.onClose;
        const blockButton = pqui_UIFactory.createButton({
            parent: canvasArea,
            name: ""
        }, {
            transition: Button.Transition.NONE,
            onClick: async () => this.close()
        }, {
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_default_sprite_splash/spriteFrame"
        }, null, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        });

        const background = pqui_UIFactory.createSprite({
            parent: blockButton.node,
            name: ""
        }, {
            contentSize: pqui_PanelParameter.panelContentSize,
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            color: pqui_PanelParameter.color,
            spriteFramePath: pqui_PanelParameter.backgroundSpriteFramePath
        });
        background.node.addComponent(BlockInputEvents);
        this.backgroundNode = background.node;

        const close = pqui_UIFactory.createButton({
            parent: background.node,
            name: ""
        }, {
            transition: Button.Transition.NONE,
            onClick: async () => this.close()
        }, {
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.RAW,
            spriteFramePath: pqui_PanelParameter.closeButtonSpriteFramePath
        }, null, {
            right: 20,
            top: 20
        });

        this.fadeIn();
    }

    public destroy() {
        try {
            this.stopTween();
            if (this.rootNode != null) {
                this.rootNode.destroy();
            }
        } catch (error) {
            console.log(`[pqui_Panel]${error}`);
        }
    }

    public async close() {
        await this.fadeOut();
        this.closeCallback();
        this.destroy();
    }

    private fadeIn() {
        this.hide();
        const node = this.backgroundNode;
        const backgroundNodeHeight = node.getComponent(UITransform).height;
        const canvasNodeHeight = this.pqui_UIFactory.canvasNode.getComponent(UITransform).height;
        const finalPosition = new Vec3(node.position.x, ((((canvasNodeHeight * 0.5) - (backgroundNodeHeight * 0.5))) * -1));
        this.moveTo(finalPosition);
    }

    private async fadeOut() {
        this.show();
        const node = this.backgroundNode;
        const backgroundNodeHeight = node.getComponent(UITransform).height;
        const canvasNodeHeight = this.pqui_UIFactory.canvasNode.getComponent(UITransform).height;
        const finalPosition = new Vec3(node.position.x, ((((canvasNodeHeight * 0.5) + (backgroundNodeHeight * 0.5))) * -1));
        await this.moveTo(finalPosition);
    }

    private moveTo(position: Vec3) {
        return new Promise<void>(resolve => {
            const node = this.backgroundNode;
            this.stopTween();
            this.tween = tween(node)
                .to(0.2, { position: position })
                .call(() => resolve())
                .start();
        });
    }

    private show() {
        const node = this.backgroundNode;
        const backgroundNodeHeight = node.getComponent(UITransform).height;
        const canvasNodeHeight = this.pqui_UIFactory.canvasNode.getComponent(UITransform).height;
        node.setPosition(node.x, ((((canvasNodeHeight * 0.5) - (backgroundNodeHeight * 0.5))) * -1));
    }

    private hide() {
        const node = this.backgroundNode;
        const backgroundNodeHeight = node.getComponent(UITransform).height;
        const canvasNodeHeight = this.pqui_UIFactory.canvasNode.getComponent(UITransform).height;
        node.setPosition(node.x, ((((canvasNodeHeight * 0.5) + (backgroundNodeHeight * 0.5))) * -1));
    }

    private stopTween() {
        if (this.tween != null) {
            this.tween.stop();
            this.tween = null;
        }
    }
}

export interface pqui_PanelParamter {
    parent: Node;
    panelContentSize: Size;
    backgroundSpriteFramePath: string;
    closeButtonSpriteFramePath: string;
    onClose: Function;
    color?: Color;
    pqui_UIFactory: pqui_UIFactory;
}
