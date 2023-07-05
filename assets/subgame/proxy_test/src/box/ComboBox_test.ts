import { _decorator, Component, Node, Label } from 'cc';
import * as cc from 'cc';
import { Prefab } from 'cc';
import { ItemTest } from './Item_test';
const { ccclass, property } = _decorator;

@ccclass('ComboBoxTest')
export class ComboBoxTest extends Component {
    @property(Node)
    public triangle: cc.Node | null = null;
    @property(Label)
    public comboLabel: cc.Label | null = null;
    @property(Node)
    public dropDown: cc.Node | null = null;
    @property(Node)
    public vLayoutNode: cc.Node | null = null;
    @property(Node)
    public contentNode: cc.Node | null = null;
 
    @property(Prefab)   // 下拉框选项)
    public itemPrefab: cc.Prefab | null = null;      // 下拉框选项 = 'Prefab       // 下拉框选项';
    isDropDown;
    itemArray;
 
    onLoad() {
       this.isDropDown = false;
       this.itemArray = ['上', '下'];
       this.initItems();
    }
 
    comboboxClicked() {
       // this.rotateTriangle();
       this.showHideDropDownBox();
       if (!this.isDropDown)
          this.isDropDown = true;
       else
          this.isDropDown = false;
    }
 
    // rotateTriangle() {
    //    if (!this.isDropDown) {
    //       let rotateAction = cc.rotateTo(0.5, 180).easing(cc.easeCubicActionOut());
    //       this.triangle.runAction(rotateAction);
    //    }
    //    else {
    //       let rotateAction = cc.rotateTo(0.5, -90).easing(cc.easeCubicActionOut());
    //       this.triangle.runAction(rotateAction);
    //    }
    // }
 
    showHideDropDownBox() {
       if (!this.isDropDown)
          this.dropDown.active = true;
       else
          this.dropDown.active = false;
    }
 
    initItems() {
       let totalHeight = 0;
       for (let i = 0; i < this.itemArray.length; i++) {
          let item = cc.instantiate(this.itemPrefab);
          item.children[0].getComponent(cc.Label).string = this.itemArray[i];
          item.getComponent(ItemTest).initComboBox(this);
          this.vLayoutNode.addChild(item);
          totalHeight += item.getComponent(cc.UITransform).height;
       }
       if (totalHeight > this.contentNode.getComponent(cc.UITransform).height)
          this.contentNode.getComponent(cc.UITransform).height = totalHeight;
    }
 
 }