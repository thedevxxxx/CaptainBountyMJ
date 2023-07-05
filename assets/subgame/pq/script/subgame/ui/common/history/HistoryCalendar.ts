
import { _decorator, Component, Color, Button } from 'cc';
import STool, { DCom } from '../../../common/STool';
import { CommonHistoryUI, DISPLAY_STATE } from '../CommonHistoryUI';
import { HistoryCalendarCombobox } from './HistoryCalendarCombobox';
import { EventType } from '../../../../event/CommonEventManage';
const { ccclass } = _decorator;
 
@ccclass('HistoryCalendar')
export class HistoryCalendar extends Component {
    private subNodes: {[idx: string]: DCom};
    private mgr: CommonHistoryUI;

    private year_from: HistoryCalendarCombobox;
    private month_from: HistoryCalendarCombobox;
    private day_from: HistoryCalendarCombobox;
    private year_to: HistoryCalendarCombobox;
    private month_to: HistoryCalendarCombobox;
    private day_to: HistoryCalendarCombobox;

    setManager(parent: CommonHistoryUI): void {
        this.mgr = parent;
    }

    onLoad () {
        this.subNodes = STool.getAllNode([
            'title/Label',
            'title/pqui_back',
            'left_view/label_from',
            'left_view/pqui_white_circle1',
            'left_view/pqui_white_circle2',
            'left_view/pqui_white_circle3',
            'left_view/pqui_white_circle4',
            'left_view/pqui_white_circle5',
            'left_view/label_to',
            'confirm_btn',
            'confirm_btn/tips/Label',
            'year_from',
            'month_from',
            'day_from',
            'year_to',
            'month_to',
            'day_to'
        ], this.node);

        this.year_from = this.subNodes['year_from'].node.getComponent(HistoryCalendarCombobox);
        this.month_from = this.subNodes['month_from'].node.getComponent(HistoryCalendarCombobox);
        this.day_from = this.subNodes['day_from'].node.getComponent(HistoryCalendarCombobox);
        this.year_to = this.subNodes['year_to'].node.getComponent(HistoryCalendarCombobox);
        this.month_to = this.subNodes['month_to'].node.getComponent(HistoryCalendarCombobox);
        this.day_to = this.subNodes['day_to'].node.getComponent(HistoryCalendarCombobox);

        this.year_from.setManager(this);
        this.month_from.setManager(this);
        this.day_from.setManager(this);
        this.year_to.setManager(this);
        this.month_to.setManager(this);
        this.day_to.setManager(this);

        this.addEvent();
    }

    start(): void {
        this.year_from.createList([2023]);
        this.month_from.createList([1,2,3,4,5,6]);
        this.day_from.createList([1,2,3,4,5,6,7,8,9,10]);
        this.year_to.createList([2023]);
        this.month_to.createList([1,2,3,4,5,6]);
        this.day_to.createList([1,2,3,4,5,6,7,8,9,10]);
    }

    updateColor(color: Color): void {
        this.subNodes['title/Label'].color = color;
        this.subNodes['title/pqui_back'].color = color;
        this.subNodes['left_view/label_from'].color = color;
        this.subNodes['left_view/pqui_white_circle1'].color = color;
        this.subNodes['left_view/pqui_white_circle2'].color = color;
        this.subNodes['left_view/pqui_white_circle3'].color = color;
        this.subNodes['left_view/pqui_white_circle4'].color = color;
        this.subNodes['left_view/pqui_white_circle5'].color = color;
        this.subNodes['left_view/label_to'].color = color;
        this.subNodes['confirm_btn'].color = color;
        this.subNodes['confirm_btn/tips/Label'].color = color;

        this.year_from.updateColor(color);
        this.month_from.updateColor(color);
        this.day_from.updateColor(color);
        this.year_to.updateColor(color);
        this.month_to.updateColor(color);
        this.day_to.updateColor(color);
    }

    show(bool: boolean = true): void {
        this.node.active = bool;
    }

    hideAllList(): void {
        this.year_from.hideList();
        this.month_from.hideList();
        this.day_from.hideList();
        this.year_to.hideList();
        this.month_to.hideList();
        this.day_to.hideList();
    }

    private addEvent():void {
        this.subNodes['title/pqui_back'].on(Button.EventType.CLICK, this.onClose.bind(this));
        this.subNodes['confirm_btn'].on(Button.EventType.CLICK, this.onSearch.bind(this));
    }

    private onClose(): void {
        this.mgr.setState(DISPLAY_STATE.LIST);
    }

    private onSearch(): void {
        this.mgr.setState(DISPLAY_STATE.LOAD);
        const startTime = `${this.year_from.label}-${this.month_from.label}-${this.day_from.label}`;
        const endTime = `${this.year_to.label}-${this.month_to.label}-${this.day_to.label}`;

        CommonHistoryUI.evRepo.dispatch(EventType.ON_UPDATE_HISTORY, {
            start_time: new Date(startTime).getTime(),
            end_time: new Date(endTime).getTime()
        });
    }
}