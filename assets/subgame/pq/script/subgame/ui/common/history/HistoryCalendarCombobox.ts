
import { _decorator, Component, Prefab, instantiate, UITransform, Color } from 'cc';
import STool, { DCom } from '../../../common/STool';
import { HistoryCalendarItem } from './HistoryCalendarItem';
import { HistoryCalendar } from './HistoryCalendar';
const { ccclass, property } = _decorator;
 
@ccclass('HistoryCalendarCombobox')
export class HistoryCalendarCombobox extends Component {
    @property(Prefab)
	listItem: Prefab = null;

    private subNodes: {[idx: string]: DCom};
    private dataItem: HistoryCalendarItem;
    private mgr: HistoryCalendar;
    private _color: Color;

    onLoad () {
        this.subNodes = STool.getAllNode([
            'data_item',
            'ScrollView',
            'ScrollView/view/content'
        ], this.node);

        this.subNodes['ScrollView'].show(false);
        this.dataItem = this.subNodes['data_item'].node.getComponent(HistoryCalendarItem);
        this.dataItem.setClickCallback(this.onClick.bind(this));
    }

    updateColor(color: Color): void {
        this._color = color;

        this.dataItem.updateColor(color);
    }

    createList(data: number[]): void {
        const dnode = this.subNodes['ScrollView/view/content'].node;
        dnode.removeAllChildren();
        dnode.getComponent(UITransform).height = 0;

        for (let i = 0; i < data.length; i++) {
		    const listItem = instantiate(this.listItem);
            const cItem = listItem.getComponent(HistoryCalendarItem);
		    dnode.addChild(listItem);
            cItem.updateColor(this._color);
            cItem.label = `${data[i]}`;
            cItem.setClickCallback(this.onListItemClick.bind(this));
            dnode.getComponent(UITransform).height += listItem.getComponent(UITransform).height;
        }
    }

    hideList(): void {
        this.subNodes['ScrollView'].show(false);
    }

    setManager(parent: HistoryCalendar): void {
        this.mgr = parent;
    }

    get label(): string {
        return this.dataItem.label;
    }

    get labelNum(): number {
        return Number(this.dataItem.label);
    }

    private onListItemClick(str: string): void {
        this.dataItem.label = str;
        this.subNodes['ScrollView'].show(false);
    }

    private onClick(): void {
        this.mgr.hideAllList();
        this.subNodes['ScrollView'].show();
    }
}