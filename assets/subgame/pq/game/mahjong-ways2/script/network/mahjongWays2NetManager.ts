import { INetManager, NetManagerBase } from "../../../../script/subgame/base/NetManagerBase";
import { commonEvent, CommonEventManage } from '../../../../script/event/CommonEventManage';
import mahjongWays2Model from "./mahjongWays2Model";

export class mahjongWays2NetManager extends NetManagerBase implements INetManager {
    static instance: mahjongWays2NetManager;
    static get inst(): mahjongWays2NetManager {
        if (!this.instance) {
            this.instance = new mahjongWays2NetManager();
        }
        return this.instance;
    }

    /**
     * 预留更换事件监听对象方法
     */
    static get evRepo(): CommonEventManage {
        return commonEvent;
    }

    get model(): mahjongWays2Model {
        return this._model as mahjongWays2Model;
    }

    constructor() {
        /**
         * 传后端定义的gamecode 
         */
        super('mahjong-ways2');
    }
}

/**
 * 
 * @param EventType 事件类型常量
 */
export const enum mahjongWays2EventType {
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
