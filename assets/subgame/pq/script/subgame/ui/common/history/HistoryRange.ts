
import { _decorator, Component, Color } from 'cc';
import STool, { DCom } from '../../../common/STool';
import { CommonHistoryUI, DISPLAY_STATE } from '../CommonHistoryUI';
import { Button } from 'cc';
import { EventType } from '../../../../event/CommonEventManage';
const { ccclass } = _decorator;
 
@ccclass('HistoryRange')
export class HistoryRange extends Component {

    private subNodes: {[idx: string]: DCom};
    private mgr: CommonHistoryUI;

    setManager(parent: CommonHistoryUI): void {
        this.mgr = parent;
    }

    onLoad () {
        this.subNodes = STool.getAllNode([
            'title/pqui_back',
            'title/Label',
            'btn_list/button_1',
            'btn_list/button_2',
            'btn_list/button_3',
            'btn_list/button_1/Label',
            'btn_list/button_2/Label',
            'btn_list/button_3/Label',
        ], this.node);

        this.addEvent();
    }

    updateColor(color: Color): void {
        this.subNodes['title/pqui_back'].color = color;
        this.subNodes['title/Label'].color = color;
        this.subNodes['btn_list/button_1/Label'].color = color;
        this.subNodes['btn_list/button_2/Label'].color = color;
        this.subNodes['btn_list/button_3/Label'].color = color;
    }

    show(bool: boolean = true): void {
        this.node.active = bool;
    }

    private addEvent(): void {
        this.subNodes['btn_list/button_1'].on(Button.EventType.CLICK, this.onTodayClick.bind(this));
        this.subNodes['btn_list/button_2'].on(Button.EventType.CLICK, this.onWeekClick.bind(this));
        this.subNodes['btn_list/button_3'].on(Button.EventType.CLICK, this.onCalendarClick.bind(this));
        this.subNodes['title/pqui_back'].on(Button.EventType.CLICK, this.onClose.bind(this));
    }

    private onTodayClick(): void {
        this.mgr.setState(DISPLAY_STATE.LOAD);
        CommonHistoryUI.evRepo.dispatch(EventType.ON_UPDATE_HISTORY);
    }

    private onWeekClick(): void {
        this.mgr.setState(DISPLAY_STATE.LOAD);
        CommonHistoryUI.evRepo.dispatch(EventType.ON_UPDATE_HISTORY);
    }

    private onCalendarClick(): void {
        this.mgr.setState(DISPLAY_STATE.CALENDAR);
    }

    private onClose(): void {
        this.mgr.setState(DISPLAY_STATE.LIST);
    }
}