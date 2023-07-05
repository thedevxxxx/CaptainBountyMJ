
import { _decorator, Component, Node, math, instantiate, Label, ScrollView, Color, Scene, director, game} from 'cc';
const { ccclass, property } = _decorator;
import * as cc from "cc";
 
@ccclass('LogCanvas')
export class LogCanvas extends Component {
    @property(Node)
    btn: Node;

    @property(Node)
    closebtn: Node;

    @property(Node)
    window: Node;

    btnpos: math.Vec3;
    
    @property(Node)
    addLogLabel: Node;

    @property(ScrollView)
    scrollV: ScrollView;
    

    onLoad() {
        this.btnpos = this.window.getPosition();
        this.btn.on(Node.EventType.TOUCH_MOVE, this.onClickMove.bind(this), this);
        this.closebtn.on(Node.EventType.TOUCH_END, this.onClickBtn.bind(this), this);
        const listener = this.scrollV.node.eventProcessor.touchListener;
        if (listener) listener.swallowTouches = false;
        this.init();
    }

    init() {
        //@ts-ignore
        cc.error = function () {
            let data = ""
            for (let i = 0; i < arguments.length; i++) {
                data += arguments[i] + " "
            }
            let labelNode = instantiate(this.addLogLabel);
            labelNode.getComponent(Label).string =  'cc.error:' + data;
            labelNode.getComponent(Label).color = new Color(255,0,0);
            this.scrollV.content.addChildEx(labelNode);
            this.onRefreshContent(30);
            this.scrollV.scrollToBottom();
        }.bind(this);

        //@ts-ignore
        cc.warn = function () {
            let data = ""
            for (let i = 0; i < arguments.length; i++) {
                data += arguments[i] + " "
            }
            let labelNode = instantiate(this.addLogLabel);
            labelNode.getComponent(Label).string =  'cc.warn:' + data;
            labelNode.getComponent(Label).color = new Color(0,0,255);
            this.scrollV.content.addChildEx(labelNode);
            this.onRefreshContent(30);
            this.scrollV.scrollToBottom();
        }.bind(this);

        //@ts-ignore
        cc.log = function () {
            let data = ""
            for (let i = 0; i < arguments.length; i++) {
                data += arguments[i] + " "
            }
            let labelNode = instantiate(this.addLogLabel);
            labelNode.getComponent(Label).string =  'cc.log:' + data;
            labelNode.getComponent(Label).color = new Color(0,0,0);
            this.scrollV.content.addChildEx(labelNode);
            this.onRefreshContent(30);
            this.scrollV.scrollToBottom();
            
        }.bind(this);

        //@ts-ignore
        cc.debug = function () {
            let data = ""
            for (let i = 0; i < arguments.length; i++) {
                data += arguments[i] + " "
            }
            let labelNode = instantiate(this.addLogLabel);
            labelNode.getComponent(Label).string =  'cc.debug:' + data;
            labelNode.getComponent(Label).color = new Color(255,0,0);
            this.scrollV.content.addChildEx(labelNode);
            this.onRefreshContent(30);
            this.scrollV.scrollToBottom();
        }.bind(this);

        console.error = function () {
            let data = ""
            for (let i = 0; i < arguments.length; i++) {
                data += arguments[i] + " "
            }
            let labelNode = instantiate(this.addLogLabel);
            labelNode.getComponent(Label).string =  'console.error:' + data;
            labelNode.getComponent(Label).color = new Color(255,0,0);
            this.scrollV.content.addChildEx(labelNode);
            this.onRefreshContent(30);
            this.scrollV.scrollToBottom();
        }.bind(this);

        console.warn = function () {
            let data = ""
            for (let i = 0; i < arguments.length; i++) {
                data += arguments[i] + " "
            }
            let labelNode = instantiate(this.addLogLabel);
            labelNode.getComponent(Label).string =  'console.warn:' + data;
            labelNode.getComponent(Label).color = new Color(0,0,255);
            this.scrollV.content.addChildEx(labelNode);
            this.onRefreshContent(30);
            this.scrollV.scrollToBottom();
        }.bind(this);

        console.log = function () {
            let data = ""
            for (let i = 0; i < arguments.length; i++) {
                data += arguments[i] + " "
            }
            let labelNode = instantiate(this.addLogLabel);
            labelNode.getComponent(Label).string =  'console.log:' + data;
            labelNode.getComponent(Label).color = new Color(0,0,0);
            this.scrollV.content.addChildEx(labelNode);
            this.onRefreshContent(30);
            this.scrollV.scrollToBottom();
            
        }.bind(this);

        console.debug = function () {
            let data = ""
            for (let i = 0; i < arguments.length; i++) {
                data += arguments[i] + " "
            }
            let labelNode = instantiate(this.addLogLabel);
            labelNode.getComponent(Label).string =  'debug:' + data;
            labelNode.getComponent(Label).color = new Color(255,0,0);
            this.scrollV.content.addChildEx(labelNode);
            this.onRefreshContent(30);
            this.scrollV.scrollToBottom();
        }.bind(this);

        
    }

    //超出比數就刪除
    onRefreshContent(num: number) {
        let child = this.scrollV.content.children;
        if(child.length > num) {
            child.shift();
        }
    }

    onClickMove(event) {
        var x = event.getPreviousLocation().x - event.getLocationX();
        var y = event.getPreviousLocation().y - event.getLocationY();
        let xV = this.window.position.x + (-x);
        let yV = this.window.position.y + (-y);
        this.window.setPosition(xV, yV);
        event.propagationStopped = true;
    }

    onClickBtn() {
        this.scrollV.node.active = !this.scrollV.node.active;
    }
}
