
import { _decorator, Component } from 'cc';
import STool, { DCom } from '../../../common/STool';
import { CommonHistoryUI, DISPLAY_STATE } from '../CommonHistoryUI';
import { Button } from 'cc';
const { ccclass } = _decorator;
 
@ccclass('HistoryLoad')
export class HistoryLoad extends Component {
    private subNodes: {[idx: string]: DCom};
    private mgr: CommonHistoryUI;

    setManager(parent: CommonHistoryUI): void {
        this.mgr = parent;
    }

    onLoad () {
        this.subNodes = STool.getAllNode([
            'pqui_btn_close2',
        ], this.node);

        this.addEvent();
    }

    show(bool: boolean = true): void {
        this.node.active = bool;
    }

    private addEvent(): void {
        this.subNodes['pqui_btn_close2'].on(Button.EventType.CLICK, this.onClose.bind(this));
    }

    private onClose(): void {
        this.mgr.setState(DISPLAY_STATE.CLOSE);
    }
}