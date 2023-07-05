import { INetManager, NetManagerBase } from "../../../../script/subgame/base/NetManagerBase";
import { commonEvent, CommonEventManage } from '../../../../script/event/CommonEventManage';
import maskCarnivalModel from "./maskCarnivalModel";

export class maskCarnivalNetManager extends NetManagerBase implements INetManager {
    static instance: maskCarnivalNetManager;
    static get inst(): maskCarnivalNetManager {
        if (!this.instance) {
            this.instance = new maskCarnivalNetManager();
        }
        return this.instance;
    }

    /**
     * 预留更换事件监听对象方法
     */
    static get evRepo(): CommonEventManage {
        return commonEvent;
    }

    get model(): maskCarnivalModel {
        return this._model as maskCarnivalModel;
    }

    constructor() {
        /**
         * 传后端定义的gamecode 
         */
        super('mahjong-ways');
    }
}
