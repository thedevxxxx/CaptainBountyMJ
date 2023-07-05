import { INetManager, NetManagerBase } from "../../../../script/subgame/base/NetManagerBase";
import { commonEvent, CommonEventManage } from '../../../../script/event/CommonEventManage';
import mahjongWaysModel from "./mahjongWaysModel";

export class mahjongWaysNetManager extends NetManagerBase implements INetManager {
    static instance: mahjongWaysNetManager;
    static get inst(): mahjongWaysNetManager {
        if (!this.instance) {
            this.instance = new mahjongWaysNetManager();
        }
        return this.instance;
    }

    /**
     * 预留更换事件监听对象方法
     */
    static get evRepo(): CommonEventManage {
        return commonEvent;
    }

    get model(): mahjongWaysModel {
        return this._model as mahjongWaysModel;
    }

    constructor() {
        /**
         * 传后端定义的gamecode 
         */
        super('mahjong-ways');
    }
}

/**
 * 
 * @param EventType 事件类型常量
 */
export const enum mahjongWaysEventType {
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
}
