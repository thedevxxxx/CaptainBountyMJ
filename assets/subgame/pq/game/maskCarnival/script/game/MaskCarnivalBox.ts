import { UITransform, _decorator } from 'cc';
import { CommonBoxInfo } from '../../../../script/subgame/info/CommonBoxInfo';
import { CommonBox } from '../../../../script/subgame/ui/game/CommonBox';
const { ccclass, property } = _decorator;
 
@ccclass('MaskCarnivalBox')
export class MaskCarnivalBox extends CommonBox {

    public constructor() {
        super();
    }

    start () {
    }

    
    /**
     * 创建卷轴
     * @param maxCol 最大列数
     * @param boxInfo 传入卷轴集合
     */
     createReels(maxCol:number, boxInfo:CommonBoxInfo) {
        super.createReels(maxCol, boxInfo);
        for (var i = 0; i < this.maxCol; i++ ) {
            let reel = this.reels[i];
            reel.x = -300 + i * reel.getComponent(UITransform).width;
        }
    }


}