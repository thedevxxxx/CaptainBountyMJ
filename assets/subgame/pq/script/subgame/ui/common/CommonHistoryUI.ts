
import { _decorator, Component, Color } from 'cc';
import { commonEvent, CommonEventManage, EventType } from '../../../event/CommonEventManage';
import { HistoryList } from './history/HistoryList';
import { HistoryLoad } from './history/HistoryLoad';
import { HistoryRange } from './history/HistoryRange';
import { HistoryCalendar } from './history/HistoryCalendar';
import { HistoryDetail } from './history/HistoryDetail';
const { ccclass } = _decorator;
 
@ccclass('CommonHistoryUI')
export class CommonHistoryUI extends Component {
     /**
     * 预留更换事件监听对象方法
     */
     static get evRepo(): CommonEventManage {
        return commonEvent;
    }

    private loadPanel: HistoryLoad;         //加载面板
    private listPanel: HistoryList;         //列表面板
    private rangePanel: HistoryRange;        //范围面板
    private calendarPanel: HistoryCalendar;     //日历面板
    private detailPanel: HistoryDetail;       //详情面板

    onLoad () {
        this.loadPanel = this.node.getChildByName('HistoryLoad').getComponent(HistoryLoad);
        this.listPanel = this.node.getChildByName('HistoryList').getComponent(HistoryList);
        this.rangePanel = this.node.getChildByName('HistoryRange').getComponent(HistoryRange);
        this.calendarPanel = this.node.getChildByName('HistoryCalendar').getComponent(HistoryCalendar);
        this.detailPanel = this.node.getChildByName('HistoryDetail').getComponent(HistoryDetail);

        this.loadPanel.setManager(this);
        this.listPanel.setManager(this);
        this.rangePanel.setManager(this);
        this.calendarPanel.setManager(this);
        this.detailPanel.setManager(this);

        this.showAllPage();
        this.addEvent();
    }

    start() {
        this.setState(DISPLAY_STATE.LOAD);
    }

    onDestroy() {
        this.removeEvent();
    }

    open() {
        this.node.active = true;
        this.setState(DISPLAY_STATE.LOAD);
        CommonHistoryUI.evRepo.dispatch(EventType.ON_UPDATE_HISTORY)
    }

    close() {
        this.node.active = false;
    }

    /**
     * 更新label颜色
     */
     updateColor(color:Color) {
        this.listPanel.updateColor(color);
        this.rangePanel.updateColor(color);
        this.calendarPanel.updateColor(color);
        this.detailPanel.updateColor(color);
    }

    /**
     * 更新历史数据
     * @param listData 历史数据列表
     */
    updateList(listData:any[]) {
        console.log("获取服务端数据:", listData)

        if (!this.node.active) return;

        this.setState(DISPLAY_STATE.LIST);
        this.listPanel.renderList(listData);
    }

    setState(idx: DISPLAY_STATE): void {
        this.showAllPage(false);
        switch(idx) {
            case DISPLAY_STATE.LOAD:
                this.loadPanel.show();
                break;
            case DISPLAY_STATE.LIST:
                this.listPanel.show();
                break;
            case DISPLAY_STATE.RANGE:
                this.listPanel.show();
                this.rangePanel.show();
                break;
            case DISPLAY_STATE.CALENDAR:
                this.listPanel.show();
                this.calendarPanel.show();
                break;
            case DISPLAY_STATE.DETAIL:
                this.detailPanel.show();
                break;
            case DISPLAY_STATE.CLOSE:
                this.close();
                commonEvent.dispatch(EventType.MENU_UI_OPEN);
                break;
        }
    }

    private showAllPage(bool: boolean = true): void {
        this.loadPanel.show(bool);
        this.listPanel.show(bool);
        this.rangePanel.show(bool);
        this.calendarPanel.show(bool);
        this.detailPanel.show(bool);
    }

    private addEvent() {
        commonEvent.register(EventType.HIST_UI_OPEN, this, this.open.bind(this));
        commonEvent.register(EventType.HIST_UI_CLOSE, this, this.close.bind(this));
    }

    private removeEvent() {
        commonEvent.unregister(EventType.HIST_UI_OPEN, this);
        commonEvent.unregister(EventType.HIST_UI_CLOSE, this);
    }
}


export enum DISPLAY_STATE {
    LOAD,
    LIST,
    RANGE,
    CALENDAR,
    DETAIL,
    CLOSE,
}