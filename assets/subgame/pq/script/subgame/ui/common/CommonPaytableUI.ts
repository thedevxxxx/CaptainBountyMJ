
import { _decorator, Component, Node, Sprite, UITransform, Layers } from 'cc';
import { PQAsset } from '../../../asset/PQAssetRepository';
import { commonEvent, EventType } from '../../../event/CommonEventManage';
const { ccclass, property } = _decorator;
 
@ccclass('CommonPaytableUI')
export class CommonPaytableUI extends Component {

    @property(Node)
    scrollView:Node = null;

    @property(Node)
    content:Node = null;

    private contentPics:string[];

    private loaded:boolean = false;

    onLoad () {
        this.addEvent();
    }

    onDestroy() {
        this.removeEvent();
    }

    private addEvent() {
        commonEvent.register(EventType.PAYTABLE_UI_OPEN, this, this.open.bind(this));
        commonEvent.register(EventType.PAYTABLE_UI_CLOSE, this, this.close.bind(this));
    }

    private removeEvent() {
        commonEvent.unregister(EventType.PAYTABLE_UI_OPEN, this);
        commonEvent.unregister(EventType.PAYTABLE_UI_CLOSE, this);
    }

    clickCloseBtn() {
        console.log("点击关闭按钮")
        this.close();
        commonEvent.dispatch(EventType.MENU_UI_OPEN);
    }

    open() {
        this.node.active = true;
        this.updateView();
    }

    close() {
        this.node.active = false;
    }

    public updateContent(urls:string[]) {
        this.contentPics = urls;
        
    }

    private async updateView() {
        if (this.loaded) {
            return;
        }
        this.loaded = true;
        this.content.getComponent(UITransform).height = 0;
        for (var i = 0; i < this.contentPics.length; i++) {
            let url = this.contentPics[i];
            var node = new Node;
            node.layer = Layers.Enum.UI_2D;
            node.addComponent(Sprite)
            node.getComponent(Sprite).spriteFrame = await PQAsset.loadSpriteFrame(url);
            this.content.addChild(node);
            let scale = this.content.getComponent(UITransform).width / node.getComponent(UITransform).width;
            node.getComponent(UITransform).width = node.getComponent(UITransform).width * scale;
            node.getComponent(UITransform).height = node.getComponent(UITransform).height * scale;
            this.content.getComponent(UITransform).height += node.getComponent(UITransform).height;
        }
    }




}