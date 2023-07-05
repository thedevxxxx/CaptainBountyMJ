
import { _decorator, Component, Node, Sprite, UITransform, Layers, Label, Color, Button } from 'cc';
import { commonEvent, EventType } from '../../../event/CommonEventManage';
import { CommonAmountInfo } from '../../info/CommonAmountInfo';
import { CommonModeInfo } from '../../info/CommonModeInfo';
const { ccclass, property } = _decorator;
 
@ccclass('CommonAutoUI')
export class CommonAutoUI extends Component {

    private modeInfo:CommonModeInfo;
    private amountInfo:CommonAmountInfo;

    private amount_layout:Node;
    private btns_layout:Node;
    private startBtn:Button;

    private color_1 = new Color(255, 255, 255);
    private color_2 = new Color(180, 120, 80);

    onLoad () {
        this.amount_layout = this.node.getChildByName('layout').getChildByName('panel').getChildByName('amount_layout');
        this.btns_layout = this.node.getChildByName('layout').getChildByName('panel').getChildByName('btns_layout');
        this.startBtn = this.node.getChildByName('layout').getChildByName('panel').getChildByName('pqui_dark_square2').getChildByName('start_btn').getComponent(Button);
        this.addEvent();
    }

    onDestroy() {
        this.removeEvent();
    }

    private addEvent() {
        commonEvent.register(EventType.AUTO_UI_OPEN, this, this.open.bind(this));
        commonEvent.register(EventType.AUTO_UI_CLOSE, this, this.close.bind(this));
    }

    private removeEvent() {
        commonEvent.unregister(EventType.AUTO_UI_OPEN, this);
        commonEvent.unregister(EventType.AUTO_UI_CLOSE, this);
    }

    clickCloseBtn() {
        console.log("点击关闭按钮")
        this.close();
        this.modeInfo.auto = 0;
        commonEvent.dispatch(EventType.CONTROL_UI_OPEN);
    }

    clickStartBtn() {
        console.log("点击自动旋转开始按钮")
        let data = {
            "amountInfo": this.amountInfo,
            "modeInfo": this.modeInfo,
        }
        console.log("点击开始按钮 modeInfo:", data)
        commonEvent.dispatch(EventType.CLICK_START, data);
        this.close();
    }

    open() {
        this.node.active = true;
        this.modeInfo.auto = 0;
        this.startBtn.getComponent(Button).interactable = false;
        this.updateBtnView();
        this.updateBalance(this.amountInfo.balance);
        this.updateChip(this.amountInfo.chip);
        this.updateBonus(this.amountInfo.bonus);
    }

    close() {
        this.node.active = false;
    }

    private clickTimesBtn(data:any) {
        var btns = this.btns_layout.children;
        for (let i in btns) {
            let btn = btns[i];
            if (btn != data.currentTarget) {
                btn.getChildByName('label').getComponent(Label).color = this.color_1;
            } else {
                btn.getChildByName('label').getComponent(Label).color = this.color_2;
                this.startBtn.getComponent(Button).interactable = true;
                this.modeInfo.auto = this.modeInfo.autoArr[Number(i)];
            }
        }
    }

    /**
     * 更新icon颜色
     */
    updateIconColor(color:Color) {
        let walletIcon = this.amount_layout.getChildByName('balance').getChildByName('ic_wallet_open').getComponent(Sprite);
        let chipIcon = this.amount_layout.getChildByName('chip').getChildByName('ic_chip').getComponent(Sprite);
        let bonusIcon = this.amount_layout.getChildByName('bonus').getChildByName('ic_win').getComponent(Sprite);
        this.updateIconColorView(walletIcon, color);
        this.updateIconColorView(chipIcon, color);
        this.updateIconColorView(bonusIcon, color);
    }

    private updateIconColorView(sprite:Sprite, color:Color) {
        sprite.color = color;
    }


    //更新modeinfo
    updateModeInfo(modeInfo:CommonModeInfo) {
        this.modeInfo = modeInfo;
        this.updateBtnView();
    }

    //更新amountInfo
    updateAmountInfo(amountInfo:CommonAmountInfo) {
        this.amountInfo = amountInfo;
    }

    private updateBtnView() {
        var btns = this.btns_layout.children;
        for (let i in btns) {
            let btn = btns[i];
            btn.getChildByName('label').getComponent(Label).string = this.modeInfo.autoArr[i].toString();
            btn.getChildByName('label').getComponent(Label).color = this.color_1;
        }
    }

    //更新余额
    updateBalance(value:Number) {
        let balance_label = this.amount_layout.getChildByName('balance').getChildByName('balance_label').getComponent(Label);
        balance_label.getComponent(Label).string = hqq.commonTools.formatGold(value);
    }

    //更新筹码
    updateChip(value:Number) {
        let chip_label = this.amount_layout.getChildByName('chip').getChildByName('chip_label').getComponent(Label);
        chip_label.getComponent(Label).string = hqq.commonTools.formatGold(value);
    }

    //更新奖金
    updateBonus(value:Number) {
        let bonus_label = this.amount_layout.getChildByName('bonus').getChildByName('bonus_label').getComponent(Label);
        bonus_label.getComponent(Label).string = hqq.commonTools.formatGold(value);
    }
}