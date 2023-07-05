
import { _decorator, Component, Node, Color } from 'cc';
import { CommonHistoryUI, DISPLAY_STATE } from './CommonHistoryUI';
import STool, { DCom } from '../../common/STool';
import { Button } from 'cc';
import Tweens from '../../common/Tweens';
const { ccclass } = _decorator;

 
@ccclass('CommonHistoryItem')
export class CommonHistoryItem extends Component {
    static readonly BG_COLOR: Color[] = [
        new Color(29, 29, 29),
        new Color(42, 42, 42),
        new Color(90, 90, 90),
    ];

    private subNodes: {[idx: string]: DCom};
    private mgr: CommonHistoryUI;
    private bgColor: Color;

    setManager(parent: CommonHistoryUI): void {
        this.mgr = parent;
    }

    onLoad () {
        this.subNodes = STool.getAllNode([
            'bg',
            'label_time',
            'label_date',
            'label_id',
            'label_bet',
            'label_profit',
            'pqui_btn_arrow_right',
        ], this.node);

        this.addEvent();
    }

    onDestroy() {}

    updateInfo(data: any, idx: number) {
        this.subNodes['label_time'].label = data.time;
        this.subNodes['label_date'].label = data.date;
        this.subNodes['label_id'].label = data.id;
        this.subNodes['label_bet'].label = data.bet;
        this.subNodes['label_profit'].label = data.profit;

        this.bgColor = CommonHistoryItem.BG_COLOR[idx%2];
        this.subNodes['bg'].color = this.bgColor;
    }

    private addEvent() {
        this.node.on(Button.EventType.CLICK, this.onDetail.bind(this));
        this.node.on(Node.EventType.MOUSE_MOVE, this.onMouseMove.bind(this));
        this.node.on(Node.EventType.MOUSE_LEAVE, this.onMouseLeave.bind(this));
    }

    private onMouseMove(): void {
        Tweens.changeColorTween(this.subNodes['bg'].node, CommonHistoryItem.BG_COLOR[2]);
    }

    private onMouseLeave(): void {
        Tweens.changeColorTween(this.subNodes['bg'].node, this.bgColor);
    }

    private onDetail(): void {
        this.mgr.setState(DISPLAY_STATE.DETAIL);
    }
}