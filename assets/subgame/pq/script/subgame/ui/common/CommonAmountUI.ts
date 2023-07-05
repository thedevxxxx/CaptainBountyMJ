import { _decorator, Component, Label, Sprite, Color } from 'cc';
import { commonEvent, EventType } from '../../../event/CommonEventManage';
import { CommonAmountInfo } from '../../info/CommonAmountInfo';
import Tweens from '../../common/Tweens';
const { ccclass, property } = _decorator;

 
@ccclass('CommonAmountUI')
export class CommonAmountUI extends Component {

    private amount_label:Label;
    private chip_label:Label;
    private bonus_label:Label;

    private walletIcon:Sprite;
    private chipIcon:Sprite;
    private bonusIcon:Sprite;

    private amountInfo:CommonAmountInfo;

    onLoad () {
        this.walletIcon = this.node.getChildByName('balance').getChildByName('ic_wallet_open').getComponent(Sprite);
        this.chipIcon = this.node.getChildByName('chip').getChildByName('ic_chip').getComponent(Sprite);
        this.bonusIcon = this.node.getChildByName('bonus').getChildByName('ic_win').getComponent(Sprite);
        this.amount_label = this.node.getChildByName('balance').getChildByName('balance_label').getComponent(Label);
        this.chip_label = this.node.getChildByName('chip').getChildByName('chip_label').getComponent(Label);
        this.bonus_label = this.node.getChildByName('bonus').getChildByName('bonus_label').getComponent(Label);

        Tweens.addOpacityEffect(this.node.getChildByName('balance'), this.walletIcon.node);
        Tweens.addOpacityEffect(this.node.getChildByName('chip'), this.chipIcon.node);
        Tweens.addOpacityEffect(this.node.getChildByName('bonus'), this.bonusIcon.node);

        this.addEvent();
    }

    onDestroy() {
        this.removeEvent();
    }

    private addEvent() {
        commonEvent.register(EventType.CHIP_MINUS, this, this.onChipMinus.bind(this));
        commonEvent.register(EventType.CHIP_ADD, this, this.onChipAdd.bind(this));
        commonEvent.register(EventType.UPDATE_BONUS, this, this.updateBonus.bind(this));
        commonEvent.register(EventType.UPDATE_BALANCE, this, this.updateBalance.bind(this));
    }

    private removeEvent() {
        commonEvent.unregister(EventType.CHIP_MINUS, this);
        commonEvent.unregister(EventType.CHIP_ADD, this);
        commonEvent.unregister(EventType.UPDATE_BONUS, this);
        commonEvent.unregister(EventType.UPDATE_BALANCE, this);
    }

    private onChipMinus() {
        let index = this.amountInfo.chipArr.indexOf(this.amountInfo.chip);
        if (index > 0) {
            index--;
            commonEvent.dispatch(EventType.ON_BET_LEVEL_CHANGE, index);
            this.amountInfo.chip = this.amountInfo.chipArr[index];
            this.updateChip(this.amountInfo.chip);
        }
        Tweens.startBouncingTween(this.chip_label.node);
    }

    private onChipAdd() {
        let index = this.amountInfo.chipArr.indexOf(this.amountInfo.chip);
        if (index < this.amountInfo.chipArr.length - 1) {
            index++;
            commonEvent.dispatch(EventType.ON_BET_LEVEL_CHANGE, index);
            this.amountInfo.chip = this.amountInfo.chipArr[index];
            console.log(this.amountInfo.chip)
            this.updateChip(this.amountInfo.chip);
        }
        Tweens.startBouncingTween(this.chip_label.node);
    }

    /**
     * 更新icon颜色
     */
     updateIconColor(color:Color) {
        this.updateIconColorView(this.walletIcon, color);
        this.updateIconColorView(this.chipIcon, color);
        this.updateIconColorView(this.bonusIcon, color);
    }

    private updateIconColorView(sprite:Sprite, color:Color) {
        sprite.color = color;
    }

    updateAmountInfo(amountInfo:CommonAmountInfo) {
        this.amountInfo = amountInfo;
        this.updateBalance(this.amountInfo.balance);
        this.updateChip(this.amountInfo.chip);
        this.updateBonus(this.amountInfo.bonus);
    }

    //更新余额
    updateBalance(value:Number) {
        this.amount_label.getComponent(Label).string = hqq.commonTools.formatGold(value);
    }

    //更新筹码
    updateChip(value:Number) {
        this.chip_label.getComponent(Label).string = hqq.commonTools.formatGold(value);
        commonEvent.dispatch(EventType.CHIP_UPDATE, this.amountInfo);
    }

    //更新奖金
    updateBonus(value:Number) {
        this.bonus_label.getComponent(Label).string = hqq.commonTools.formatGold(value);
    }
}