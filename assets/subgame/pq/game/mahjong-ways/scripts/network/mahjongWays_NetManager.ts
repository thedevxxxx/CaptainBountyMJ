import { NetManagerBase } from "../../../../script/base/NetManagerBase";

export class mahjongWays_NetManager extends NetManagerBase {
    static instance: mahjongWays_NetManager;
    static get inst(): mahjongWays_NetManager {
        if (!this.instance) {
            this.instance = new mahjongWays_NetManager();
        }
        return this.instance;
    }

    constructor() {
        /**
         * 传后端定义的gamecode 
         */
        super('mahjong-ways');
    }
}

export const mjhlNetMgr = mahjongWays_NetManager.inst;
