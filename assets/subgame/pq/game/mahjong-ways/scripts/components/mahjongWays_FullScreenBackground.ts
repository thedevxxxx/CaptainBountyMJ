
import { _decorator, Component, UITransform, Size, screen, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('mahjongWays_FullScreenBackground')
export class mahjongWays_FullScreenBackground extends Component {

    protected start() {
        this.fitVisibleSize();
        view.setResizeCallback(() => this.fitVisibleSize());
    }

    protected onDestroy() {
        view.setResizeCallback(null);
    }

    private fitVisibleSize() {
        const size = this.getOriginalWindowSize();
        this.node.getComponent(UITransform).setContentSize(size);
    }

    private getOriginalWindowSize() {
        return new Size(screen.windowSize.width / view.getScaleX(), screen.windowSize.height / view.getScaleY());
    }

}