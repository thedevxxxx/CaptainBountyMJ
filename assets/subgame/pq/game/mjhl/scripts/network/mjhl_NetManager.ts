import { NetManagerBase } from "../../../../script/base/NetManagerBase";

export class mjhl_NetManager extends NetManagerBase {
    static instance: mjhl_NetManager;
    static get inst(): mjhl_NetManager {
        if (!this.instance) {
            this.instance = new mjhl_NetManager();
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

export const mjhlNetMgr = mjhl_NetManager.inst;
