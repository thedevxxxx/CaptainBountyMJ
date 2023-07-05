
import { _decorator, Component, Prefab, ScrollView, instantiate, UITransform, Color } from 'cc';
import STool, { DCom } from '../../../common/STool';
import { CommonHistoryUI, DISPLAY_STATE } from '../CommonHistoryUI';
import { CommonHistoryItem } from '../CommonHistoryItem';
import { EventType } from '../../../../event/CommonEventManage';
import { Button } from 'cc';
const { ccclass, property } = _decorator;
 
@ccclass('HistoryList')
export class HistoryList extends Component {
    @property(Prefab)
	listItem: Prefab = null;

    private subNodes: {[idx: string]: DCom};
    private page: number = 1;
    private mgr: CommonHistoryUI;

    setManager(parent: CommonHistoryUI): void {
        this.mgr = parent;
    }

    onLoad () {
        this.subNodes = STool.getAllNode([
            'ScrollView',
            'ScrollView/view/content',
            'title/Label',
            'title/pqui_icon_calendar',
            'pqui_btn_close2',
        ], this.node);

        this.addEvent();
    }

    renderList(listData: any[]) {
        const dnode = this.subNodes['ScrollView/view/content'].node;

        let listNum = dnode.children.length;
        if (listNum > listData.length) {
            dnode.removeAllChildren();
            dnode.getComponent(UITransform).height = 0;
        }
        for (let i = listNum; i < listData.length; i++) {
            const data = listData[i];
		    const listItem = instantiate(this.listItem);
		    dnode.addChild(listItem);
            listItem.getComponent(CommonHistoryItem).setManager(this.mgr);
			listItem.getComponent(CommonHistoryItem).updateInfo(data, i);
            dnode.getComponent(UITransform).height += listItem.getComponent(UITransform).height;
        }
    }

    updateColor(color: Color): void {
        this.subNodes['title/Label'].color = color;
    }

    show(bool: boolean = true): void {
        this.node.active = bool;
    }

    private addEvent(): void {
        this.subNodes['ScrollView'].on(ScrollView.EventType.BOUNCE_TOP, this.onBounceTop.bind(this));
        this.subNodes['ScrollView'].on(ScrollView.EventType.BOUNCE_BOTTOM, this.onBounceBottom.bind(this));
        this.subNodes['pqui_btn_close2'].on(Button.EventType.CLICK, this.onClose.bind(this));
        this.subNodes['title/pqui_icon_calendar'].on(Button.EventType.CLICK, this.onShowCalendar.bind(this));
    }


    private onBounceTop(): void {
        console.log("列表上拉刷新")
        this.page = 1;
        CommonHistoryUI.evRepo.dispatch(EventType.ON_UPDATE_HISTORY);
    }

    private onBounceBottom(): void {
        console.log("列表滚动到底部")
        this.page++;
        CommonHistoryUI.evRepo.dispatch(EventType.ON_UPDATE_HISTORY);
    }

    private onClose(): void {
        this.mgr.setState(DISPLAY_STATE.CLOSE);
    }

    private onShowCalendar(): void {
        this.mgr.setState(DISPLAY_STATE.RANGE);
    }
}