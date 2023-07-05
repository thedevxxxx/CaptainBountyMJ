import { Button, Component, KeyCode, Label, Node, _decorator } from "cc";
import { IPopup, IPopupButton } from "../../interface/ICommonPopup";
const { ccclass, property } = _decorator;
@ccclass('CommonAlert')
export default class CommonAlert  extends Component {

    private paramsArr: Array<IPopup>;

    private curParams: IPopup;

    @property(Label)
    title:Label = null;

    @property(Label)
    content:Label = null;

    @property(Node)
    btnLayer_1:Node = null;

    @property(Node)
    btnLayer_2:Node = null;


    onLoad () {
        this.paramsArr = new Array<IPopup>();
    }

    onDestroy() {
    }

    public open(params: IPopup) {
        this.paramsArr.push(params);
        this.checkQueue();
    }

    private checkQueue() {
        if (this.curParams == null) {
            if (this.paramsArr.length > 0) {
                const params = this.paramsArr.shift();
                if (params != null) {
                    this.showPopup(params);
                }
            }
        }
    }

    private showPopup(params: IPopup) {
        this.curParams = params;
        this.title.string = params.title;
        this.content.string = params.content;
        let btn_1:Node;
        let btn_2:Node;
        if (params.buttons.length == 1) {
            this.btnLayer_1.active = true;
            this.btnLayer_2.active = false;
            btn_1 = this.btnLayer_1.getChildByName('btn_1');
            btn_1.getChildByName('Label').getComponent(Label).string = params.buttons[0].title;
        } else {
            this.btnLayer_1.active = false;
            this.btnLayer_2.active = true;
            btn_1 = this.btnLayer_2.getChildByName('btn_1');
            btn_2 = this.btnLayer_2.getChildByName('btn_2');
            btn_1.getChildByName('Label').getComponent(Label).string = params.buttons[0].title;
            btn_2.getChildByName('Label').getComponent(Label).string = params.buttons[1].title;
        }
    }

    private onClickBtn1() {
        console.log("点击弹窗按钮1")
        this.curParams.buttons[0].onClicked && this.curParams.buttons[0].onClicked();
        this.node.active = false;
    }

    private onClickBtn2() {
        console.log("点击弹窗按钮2")
        this.curParams.buttons[1].onClicked && this.curParams.buttons[1].onClicked();
        this.node.active = false;
    }

    private hidePopup() {
        this.curParams = null;
        this.checkQueue();
    }
}