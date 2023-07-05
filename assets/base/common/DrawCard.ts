
import { _decorator, Component, Node, dynamicAtlasManager,
    Material, Sprite, UITransform, Vec2, EventTouch, v2, Rect, SpriteFrame, size, Color, color, isValid
} from 'cc';
const { ccclass, property } = _decorator;

/** 翻牌的扩充选项 */ 
interface CardOptInterface{
    /** 盖牌的存在时间(若为0或无则无限) 单位:秒*/
    liveTime?:number,
    /** 马上删除*/
    deletenow?:boolean,
    /** 盖牌素材资源 */
    backSp:SpriteFrame,
    /** 显示花牌素材资源 */
    colorSp:SpriteFrame,
    /** 翻牌后会执行此内容(销毁交由callBack), 若为null则翻牌后自动销毁 */
    callBack?:Function|undefined,
    /** 显示牌的宽 预设278.4 (172x1.6) */
    width?:number,
    /** 显示牌的长 预设371.2 (242x1.6) */
    heigh?:number,
    /** 是否显示遮罩 预设开 */
    isMask?:boolean,
    /** 遮罩的颜色 预设黑 */
    colorMask?:Color,
    /** 遮罩的透明度 预设50(255) */
    alphaMask?:number
}

@ccclass('DrawCard')
export class DrawCard extends Component {
    _backMaterialNode !: Node;
    _frontMaterialNode !: Node;
    _maskNode !: Node;
    _cardNode !: Node;
    _backMaterial !: Material;
    _frontMaterial !: Material;
    _touchLayer !: Node;

    touchFirstPos : any; // 咪牌的第一个坐标点
    isOpenCard !: boolean;

    // 保留原先 dynamicAtlasManager 值
    _oriDynameicAtlasValue !: boolean;

    isStart : boolean = false;
    endCallFun!: Function|undefined; // onDestroy call back Function

    liveTimer:any;
    isLive:boolean;

    start () {
        if(this.isStart) return // only
        // 保留原先值
        // this._oriDynameicAtlasValue = dynamicAtlasManager.enabled;

        this._backMaterialNode = this.node.getChildByName("cardBg")!;
        this._maskNode = this.node.getChildByName('mask')!;
        this._frontMaterialNode = this._backMaterialNode.getChildByName("cardNum")!;
        this._cardNode = this._backMaterialNode.getChildByName("card")!;
        this._backMaterial = this._backMaterialNode.getComponent(Sprite)!.getMaterial(0)!;
        this._frontMaterial = this._frontMaterialNode.getComponent(Sprite)!.getMaterial(0)!;
        this._touchLayer = this.node.getChildByName("touchLayer")!;

        //设置设置阴影部分的最大距离,取图片宽度的10分一座位距离
        let shadowDis = this._backMaterialNode.getComponent(UITransform)!.contentSize.width * this._backMaterialNode.getScale().x * 0.1;
        this._frontMaterial.setProperty('shadowDis', shadowDis);

        this.isStart = true;
        this.resetData();
    }

    onDestroy() {
        this.unscheduleAllCallbacks();
        // this._touchLayer.targetOff(this);
        // dynamicAtlasManager.enabled = this._oriDynameicAtlasValue;
    }

    /** 
     * 搓牌初始启动, 最低需代入盖牌与翻牌的spriteFrame与完成后(销毁)执行的函式
     * @param opt 设定显示牌面与背牌资源，可选调整长宽、遮罩等参数
     */ 
    public init(opt:CardOptInterface){
        let {liveTime,deletenow,backSp,colorSp,callBack,width,heigh,isMask,colorMask,alphaMask} = opt;
        if(deletenow){
            if(isValid(this.node)){
                this.node.destroy();
                return;
            }
        }
        if(!width) width = 278.4;
        if(!heigh) heigh = 371.2;
        if(isMask==undefined) isMask = true;
        if(!colorMask) colorMask = Color.BLACK;
        if(!alphaMask) alphaMask = 50;
        
        if(!backSp || !colorSp){
            console.log('(DrawCard Error) 基础背牌与牌面资源缺失');
            return
        }
        if(!this.isStart) this.start();
        this.isLive = true;
        // set mask
        this._maskNode.active = isMask;
        this._maskNode.getComponent(Sprite).color = color(colorMask.r,colorMask.g,colorMask.b,alphaMask);
        // set assets
        this.endCallFun = callBack;
        this._backMaterialNode.getComponent(Sprite)!.spriteFrame = backSp;
        this._frontMaterialNode.getComponent(Sprite)!.spriteFrame = colorSp;
        this._cardNode.getComponent(Sprite)!.spriteFrame = colorSp;
        // reset size
        this._touchLayer.getComponent(UITransform)?.setContentSize(size(width,heigh));
        this._backMaterialNode.getComponent(UITransform)?.setContentSize(size(width,heigh));
        this._frontMaterialNode.getComponent(UITransform)?.setContentSize(size(width,heigh));
        this._cardNode.getComponent(UITransform)?.setContentSize(size(width,heigh));

        // 存活时间
        if(liveTime){
            this.scheduleOnce(this.finalProcessing, liveTime);
        }
        
        this.addEvent();
    }
    
    /** 搓牌重置 */ 
    public resetData () {
        this.touchFirstPos = null;
        this.isOpenCard = false;
        this._cardNode.active = false;
        // dynamicAtlasManager.enabled = false; // 关闭此值
        this.resetPos(false);
    }

    addEvent(){
        // 注册监听
        this._touchLayer.on(Node.EventType.TOUCH_START, this.touchBegan, this);
        this._touchLayer.on(Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this._touchLayer.on(Node.EventType.TOUCH_END, this.touchEnded, this);
        this._touchLayer.on(Node.EventType.TOUCH_CANCEL, this.touchEnded, this);
    }

    removeEvent(){
        this._touchLayer.off(Node.EventType.TOUCH_START, this.touchBegan, this);
        this._touchLayer.off(Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this._touchLayer.off(Node.EventType.TOUCH_END, this.touchEnded, this);
        this._touchLayer.off(Node.EventType.TOUCH_CANCEL, this.touchEnded, this);
    }
    
    touchBegan(evt : EventTouch){
        this.touchFirstPos = evt.getUILocation();
    }
    touchEnded(evt : EventTouch){
        this.touchFirstPos = null;
        this.resetPos();
    }
    touchMove(evt : EventTouch){
        // 若已翻牌 则不进行
        if(this.isOpenCard || !this.isLive) return

        // init
        let centerPos = this._backMaterialNode.getComponent(UITransform)?.getBoundingBoxToWorld() as Rect,
            pos = v2(centerPos.x+centerPos?.width/2,centerPos?.y+centerPos?.height/2),
            touchPos = evt.getUILocation(),
            fx = this.touchFirstPos.x - pos.x, fxAbs = Math.abs(this.touchFirstPos.x - pos.x),
            tx = touchPos.x - pos.x, txAbs = Math.abs(touchPos.x - pos.x),
            fy = this.touchFirstPos.y - pos.y, fyAbs = Math.abs(this.touchFirstPos.y - pos.y),
            ty = touchPos.y - pos.y, tyAbs = Math.abs(touchPos.y - pos.y);

        // 同正负, 且值比初始点大
        if(fx / fxAbs == tx / txAbs && fxAbs < txAbs){
            touchPos.x = this.touchFirstPos.x; // 修正X
        }
        if(fy / fyAbs == ty / tyAbs && fyAbs < tyAbs){
            touchPos.y = this.touchFirstPos.y; // 修正Y
        }

        // 若为同点位 则不进行
        if(touchPos.equals(this.touchFirstPos)){
            this.resetPos(false);
            return
        }

        // 判断是否出牌匡, 决定翻牌
        if(!this._touchLayer.getComponent(UITransform)?.getBoundingBoxToWorld().contains(touchPos)){
            this.isOpenCard = true;
            this._cardNode.active = true;
            this.touchFirstPos = null;
            this.resetPos();
            this.finalProcessing();
            return
        }
        this.runActionCard(this.touchFirstPos, touchPos); // 材质球效果(遮罩)
    }

    // 最终处理
    finalProcessing(){
        if(!isValid(this.node) || !this.isLive) return
        this.isLive = false;
        this.removeEvent();
        if(this.endCallFun)
            this.endCallFun(this.node);
        else
            this.node.destroy();
    }

    // 重置坐标
    resetPos (isBool:boolean = true) {
        let initPos = new Vec2();
        this._backMaterial.setProperty('firstPos', initPos);
        this._backMaterial.setProperty('secondPos', initPos);
        this._frontMaterial.setProperty('firstPos', initPos);
        this._frontMaterial.setProperty('secondPos', initPos);
        // if(isBool) dynamicAtlasManager.enabled = this._oriDynameicAtlasValue;
    }

    // 传入两个点
    runActionCard (firstPos: Vec2, secondPos: Vec2) {
        this._backMaterial.setProperty('firstPos', firstPos);
        this._backMaterial.setProperty('secondPos', secondPos);
        this._frontMaterial.setProperty('firstPos', firstPos);
        this._frontMaterial.setProperty('secondPos', secondPos);
    }
}

