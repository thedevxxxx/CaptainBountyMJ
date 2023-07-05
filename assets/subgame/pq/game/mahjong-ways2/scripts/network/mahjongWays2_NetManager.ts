import { NetManagerBase } from "../../../../script/base/NetManagerBase";

export class mahjongWays2_NetManager extends NetManagerBase {
    static instance: mahjongWays2_NetManager;
    static get inst(): mahjongWays2_NetManager {
        if (!this.instance) {
            this.instance = new mahjongWays2_NetManager();
        }
        return this.instance;
    }

    constructor() {
        /**
         * 传后端定义的gamecode 
         */
        super('mahjong-ways2');
    }
}

export const mjhlNetMgr = mahjongWays2_NetManager.inst;
