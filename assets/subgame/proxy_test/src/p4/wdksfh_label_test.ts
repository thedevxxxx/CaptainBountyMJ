import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;
import * as cc from 'cc';

@ccclass('WdksfhLabelTest')
export class WdksfhLabelTest extends Component {
    @property(Node)
    public frame: cc.Node | null = null;
    @property(Label)
    public game_tag: cc.Label | null = null;

    setstring (a: any, b: any) {
        this.frame.getComponent(cc.Label).string = a
        this.game_tag.getComponent(cc.Label).string = b
    }

    start () {
    }

}
