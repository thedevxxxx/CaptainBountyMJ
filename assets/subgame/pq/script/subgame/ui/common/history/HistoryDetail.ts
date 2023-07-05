
import { _decorator, Component } from 'cc';
import STool, { DCom } from '../../../common/STool';
import { CommonHistoryUI, DISPLAY_STATE } from '../CommonHistoryUI';
import { Color } from 'cc';
import { Button } from 'cc';
const { ccclass } = _decorator;
 
@ccclass('HistoryDetail')
export class HistoryDetail extends Component {
    private subNodes: {[idx: string]: DCom};
    private mgr: CommonHistoryUI;

    setManager(parent: CommonHistoryUI): void {
        this.mgr = parent;
    }

    onLoad () {
        this.subNodes = STool.getAllNode([
            'title/pqui_icon_back',
            'title/Label',
            'header/lab_d_id',
            'header/lab_d_bet',
            'header/lab_d_bound',
            'header/lab_d_bal',
            'header/lab_id',
            'header/lab_bet',
            'header/lab_bound',
            'header/lab_bal',
        ], this.node);

        this.addEvent();
    }

    updateColor(color: Color): void {
        this.subNodes['title/pqui_icon_back'].color = color;
        this.subNodes['title/Label'].color = color;
        this.subNodes['header/lab_d_id'].color = color;
        this.subNodes['header/lab_d_bet'].color = color;
        this.subNodes['header/lab_d_bound'].color = color;
        this.subNodes['header/lab_d_bal'].color = color;
    }

    show(bool: boolean = true): void {
        this.node.active = bool;
    }

    private addEvent(): void {
        this.subNodes['title/pqui_icon_back'].on(Button.EventType.CLICK, this.onClose.bind(this));
    }

    private onClose(): void {
        this.mgr.setState(DISPLAY_STATE.LIST);
    }
}