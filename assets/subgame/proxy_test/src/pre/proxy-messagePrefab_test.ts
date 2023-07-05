import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;
import * as cc from 'cc';
@ccclass('ProxyMessagePrefabTest')
export class ProxyMessagePrefabTest extends Component {
    @property(Label)
    public message: Label | null = null;
    timer;
    start () {
      //2秒后销毁目标节点
    this.timer = setTimeout(
      function() {
        this.node.destroy();
      }.bind(this),
      2000
    );
    }

    setMessage (string: any) {
        this.message.string = string;
            //动态更改弹窗背景长度以适应文字长度
            this.node
              .getChildByName("bg")
              .getChildByName("message")
              .getComponent(cc.Label)
              .markForUpdateRenderData(true);
              let newWidth = this.node.getChildByName("bg").getChildByName("message")
              .getComponent(cc.UITransform).width;
            this.node.getChildByName("bg").getComponent(cc.UITransform).setContentSize(newWidth + 40, 40);
            }

    onDestroy () {
        clearTimeout(this.timer);
    }


}

/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// cc.Class({
//   extends: cc.Component,
// 
//   properties: {
//     message: cc.Label
//   },
//   // onLoad () {},
//   start: function() {
//     // 2 秒后销毁目标节点
//     this.timer = setTimeout(
//       function() {
//         this.node.destroy();
//       }.bind(this),
//       2000
//     );
//   },
//   setMessage: function(string) {
//     this.message.string = string;
//     //动态更改弹窗背景长度以适应文字长度
//     this.node
//       .getChildByName("bg")
//       .getChildByName("message")
//       .getComponent("cc.Label")
//       ._forceUpdateRenderData(true);
//     let newWidth = this.node.getChildByName("bg").getChildByName("message")
//       .width;
//     this.node.getChildByName("bg").setContentSize(newWidth + 40, 40);
//   },
//   // update (dt) {},
//   onDestroy() {
//     clearTimeout(this.timer);
//   }
// });
