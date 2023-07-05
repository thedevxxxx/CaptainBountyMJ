
import { _decorator, Component, Node } from 'cc';

import { INetManager, NetManagerBase } from "../../../../script/subgame/base/NetManagerBase";
import { commonEvent, CommonEventManage } from '../../../../script/event/CommonEventManage';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = captainsBountyNetManager
 * DateTime = Mon Jul 03 2023 08:44:24 GMT+0530 (India Standard Time)
 * Author = harshK
 * FileBasename = captainsBountyNetManager.ts
 * FileBasenameNoExtension = captainsBountyNetManager
 * URL = db://assets/subgame/pq/game/CaptainsBounty/Scripts/network/captainsBountyNetManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('captainsBountyNetManager')
export default class captainsBountyNetManager extends NetManagerBase implements INetManager {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
