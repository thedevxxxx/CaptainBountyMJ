
import * as cc from 'cc';
const { ccclass } = cc._decorator;
type IBindFunc = (data: any) => void;

@ccclass
export class CommonEventManage {
    private static _instance: CommonEventManage;
    private _mapHandler: Map<EventType, Map<string, IBindFunc>>;

    constructor() {
        this._mapHandler = new Map();
    }
    public static getInstance(): CommonEventManage {
        this._instance || (this._instance = new CommonEventManage());
        return this._instance;
    }
    /**
     * 注册监听事件
     * @param type 事件类型
     * @param classObj 响应函数所属类名
     * @param func 响应函数
     */
    public register(type: any, classObj: any, func: IBindFunc): void {
        let className = classObj.constructor.name;
        const funcs = this._mapHandler.get(type) || (new Map());
        if (funcs.has(className)) {
            return
        }
        funcs.set(className, func);
        this._mapHandler.set(type, funcs);
    }

    /**
     * 取消监听事件
     * @param type 事件类型
     * @param classObj 响应函数所属类名
     */
    public unregister(type: any, classObj: any): void {
        if (!this._mapHandler.has(type)) {
            return
        }
        let className = classObj.constructor.name;
        const funcs = this._mapHandler.get(type);
        funcs.has(className) && funcs.delete(className);
        this._mapHandler.set(type, funcs);
    }

    /**
     * 派发事件
     * @param type 事件类型
     * @param data 传递的数据
     */
    public dispatch(type: any, data?: any): void {
        if (!this._mapHandler.has(type)) {
            return
        }
        this._mapHandler.get(type).forEach((value: IBindFunc) => {
            value(data);
        })
    }
}
/**
 * 
 * @param EventType 事件类型常量
 */
export const enum EventType {
    /**本地事件 */
    CLICK_START = "CLICK_START",
    CLICK_EXIT = "CLICK_EXIT",
    CLICK_SOUND = "CLICK_SOUND",
    UPDATE_CHIP = "UPDATE_CHIP",
    CHIP_ADD = "CHIP_ADD",
    CHIP_MINUS = "CHIP_MINUS",
    CHIP_INDEX_MAX = "CHIP_INDEX_MAX",
    CHIP_INDEX_MIN = "CHIP_INDEX_MIN",
    CHIP_UPDATE = "CHIP_UPDATE",
    CHIP_INDEX_MIDDLE = "CHIP_INDEX_MIDDLE",
    CONTROL_UI_OPEN = "CONTROL_UI_OPEN",
    CONTROL_UI_CLOSE = "CONTROL_UI_CLOSE",
    MENU_UI_OPEN = "MENU_UI_OPEN",
    MENU_UI_CLOSE = "MENU_UI_CLOSE",
    PAYTABLE_UI_OPEN = "PAYTABLE_UI_OPEN",
    PAYTABLE_UI_CLOSE = "PAYTABLE_UI_CLOSE",
    RULE_UI_OPEN = "RULE_UI_OPEN",
    RULE_UI_CLOSE = "RULE_UI_CLOSE",
    AUTO_UI_OPEN = "AUTO_UI_OPEN",
    AUTO_UI_CLOSE = "AUTO_UI_CLOSE",
    ON_BET_LEVEL_CHANGE = 'ON_BET_LEVEL_CHANGE',
    HIST_UI_OPEN = "HIST_UI_OPEN",
    HIST_UI_CLOSE = "HIST_UI_CLOSE",
    ON_UPDATE_HISTORY = 'ON_UPDATE_HISTORY',
    UPDATE_BONUS = "UPDATE_BONUS",
    UPDATE_BALANCE = "UPDATE_BALANCE",
    CLICK_SYMBOL = "CLICK_SYMBOL"
}

export const commonEvent = CommonEventManage.getInstance();
