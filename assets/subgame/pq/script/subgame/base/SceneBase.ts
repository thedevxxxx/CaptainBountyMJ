import { Component } from 'cc';
import { PopupUIManager } from '../../ui/CommonPopupUIManager';
import { director } from 'cc';
import proto from "../../network/proto/PQproto_msg.js";
import { ErrorParam } from './ReceiverBase';

export class SceneBase extends Component {
    protected showRetryToast(count: number): void {
        PopupUIManager.openToast(`网路繁忙, 正在重试... (第${count}次)`);
    }

    protected showConnectFailPop(retryCb: Function): void {
        const param = {
            title: "未能成功交易",
            content: `未能连接到服務，请检查您的网路或重试。\n(错误代码: N1000)`,
            buttons: [{
                title: "重试",
                onClicked: retryCb,
            }, {
                title: "退出",
                onClicked: () => {
                    this.exit();
                },
            }]};
        PopupUIManager.openAlert(param);
    }

    protected showPointEnoughPop(data: ErrorParam): void {
        const param = {
            title: "未能成功交易",
            content: `积分不足， 请尝试切换注额。\n(错误代码: ${proto.SubCommand.EnumSubSpinResp}E${data.resultCode}T${data.serverTime})`,
            buttons: [{
                title: "确定",
                onClicked: () => {
                    console.log('积分不足处理')
                },
            }]};
        PopupUIManager.openAlert(param);
    }

    protected showFailPop(data: ErrorParam): void {
        const param = {
            title: "",
            content: `\n(错误代码: ${proto.SubCommand.EnumSubSpinResp}E${data.resultCode}T${data.serverTime})`,
            buttons: [{
                title: "确定",
                onClicked: () => {
                    this.exit();
                },
            }]};
        PopupUIManager.openAlert(param);
    }

    /**
     * 退出
     */
    protected async exit() {
        hqq.reflect.setOrientation("landscape");
        director.loadScene("pq_main");
    }
}

