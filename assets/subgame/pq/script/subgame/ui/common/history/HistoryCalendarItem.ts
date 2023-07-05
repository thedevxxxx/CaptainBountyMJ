
import { _decorator, Component, Color } from 'cc';
import STool, { DCom } from '../../../common/STool';
import { Button } from 'cc';
const { ccclass } = _decorator;
 
@ccclass('HistoryCalendarItem')
export class HistoryCalendarItem extends Component {
    private subNodes: {[idx: string]: DCom};
    private _callBack: Function;
    private _onLoad: boolean = false;
    private _color: Color;
    private _label: string;

    onLoad () {
        this.subNodes = STool.getAllNode([
            'btn',
            'btn/Node/Label'
        ], this.node);

        this.addEvent();

        this._onLoad = true;
    }

    start(): void {
        if (this._label) {
            this.subNodes['btn/Node/Label'].label = this._label;
        }

        if (this._color) {
            this.subNodes['btn'].color = this._color;
            this.subNodes['btn/Node/Label'].color = this._color;
        }
    }

    setClickCallback(cb: Function): void {
        this._callBack = cb;
    }

    updateColor(color: Color): void {
        if (this._onLoad) {
            this.subNodes['btn'].color = color;
            this.subNodes['btn/Node/Label'].color = color;
        } else {
            this._color = color;
        }
    }

    set label(str: string) {
        if (this._onLoad) {
            this.subNodes['btn/Node/Label'].label = str;
        } else {
            this._label = str;
        }
    }

    get label(): string {
        return this.subNodes['btn/Node/Label'].label;
    }

    private addEvent(): void {
        this.subNodes['btn'].on(Button.EventType.CLICK, this.onClick.bind(this));
    }

    private onClick(): void {
        this._callBack(this.subNodes['btn/Node/Label'].label);
    }
}