
import { _decorator, Component, Node } from 'cc';
import CommonAlert from '../subgame/ui/common/CommonAlert';
import { IPopup } from '../subgame/interface/ICommonPopup';
import CommonToast from '../subgame/ui/common/CommonToast';
const { ccclass, property } = _decorator;
 
@ccclass('CommonPopupUIManager')
export class CommonPopupUIManager extends Component {
    private static _instance: CommonPopupUIManager;

    private alert:CommonAlert;
    private toast:CommonToast;

    public static getInstance(): CommonPopupUIManager {
        this._instance || (this._instance = new CommonPopupUIManager());
        return this._instance;
    }

    /**
     * 初始化alert组件
     * @param alert 
     */
    public initAlert(alert: CommonAlert) {
        this.alert = alert;
    }

    /**
     * 打开弹窗
     * @param params 
     */
    public openAlert(params: IPopup) {
        this.alert.node.active = true;
        this.alert.open(params);
    }

    /**
     * 初始化Toast组件
     * @param Toast
     */
     public initToast(toast: CommonToast) {
        this.toast = toast;
    }

    /**
     * 打开Toast
     * @param params 
     */
     public openToast(params: string) {
        this.toast.node.active = true;
        this.toast.open(params);
    }

    start () {
    }

}

export const PopupUIManager = CommonPopupUIManager.getInstance();