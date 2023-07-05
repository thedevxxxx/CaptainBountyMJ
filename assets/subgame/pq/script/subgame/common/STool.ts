import * as cc from "cc";
import { Size } from "cc";

export default class STool {
    static getAllNode(paths: string[], referenceNode?: cc.Node): {[idx: string]: DCom} {
        const obj: {[idx: string]: DCom} = {};
        for (let i = 0; i < paths.length; i++) {
            const path: string = paths[i];
            obj[path] = new DCom(path, referenceNode);
        }
        return obj;
    }
}


export class DCom {
    private _node: cc.Node;
    private _name: string;

    constructor(path: string, referenceNode?: cc.Node) {
        this._node = cc.find(path, referenceNode);
    }

    createBtn(tran: number): void {
        let btn: cc.Button = this._node.getComponent(cc.Button);

        if (!cc.isValid(btn)) {
            btn = this._node.addComponent(cc.Button);
        }

        btn.transition = tran;
    }

    on(evnet: string, fun?: Function): void {
        this._node.on(evnet, fun);
    }

    off(evnet: string, fun?: Function): void {
        this._node.off(evnet);
    }

    show(bool: boolean = true): void {
        this.node.active = bool;
    }

    switchDisplay(): void {
        this.node.active = !this.node.active;
    }

    set btnLabel(str: string) {
        const btn: cc.Button = this._node.getComponent(cc.Button);
        if (cc.isValid(btn)) {
            const labelNode: cc.Node = cc.find('Label', this._node);
            const label: cc.Label = labelNode.getComponent(cc.Label);
            if (cc.isValid(label)) {
                label.string = str;
            }
        }
    }

    set label(str: string) {
        const label: cc.Label = this._node.getComponent(cc.Label);
        if (cc.isValid(label)) {
            if (label.name.indexOf('nickname') > 0) {
                label.string =  hqq.commonTools.addellipsis(str);
            } else {
                label.string = str;
            }
        }
    }

    set font(font: cc.Font) {
        const label: cc.Label = this._node.getComponent(cc.Label);
        if (cc.isValid(label)) {
            label.font = font;
        }
    }

    set fontColor(color: cc.Color) {
        const label: cc.Label = this._node.getComponent(cc.Label);
        if (cc.isValid(label)) {
            label.color = color;
        }
    }

    set color(color: cc.Color) {
        const label: cc.Label = this._node.getComponent(cc.Label);
        const sprite: cc.Sprite = this._node.getComponent(cc.Sprite);

        if (cc.isValid(label)) {
            label.color = color;
        }

        if (cc.isValid(sprite)) {
            sprite.color = color;
        }
    }

    set spriteFrame(frame: cc.SpriteFrame) {
        const sp: cc.Sprite = this._node.getComponent(cc.Sprite);

        if (cc.isValid(sp)) {
            sp.spriteFrame = frame;
        }
    }

    set x(val: number) {
        this._node.x = val;
    }

    set y(val: number) {
        this._node.y = val;
    }

    set name(str: string) {
        this._name = str;
    }

    get sprite(): cc.Sprite {
        let result: cc.Sprite = this._node.getComponent(cc.Sprite);

        if (!cc.isValid(result)) {
            result = this._node.addComponent(cc.Sprite);
        }

        return result;
    }

    get content(): cc.Size {
        let tran: cc.UITransform = this._node.getComponent(cc.UITransform);

        if (!cc.isValid(tran)) {
            tran = this._node.addComponent(cc.UITransform);
        }

        return tran.contentSize;
    }

    get node(): cc.Node {
        return this._node;
    }

    get x(): number {
        return this._node.x;
    }

    get y(): number {
        return this._node.y;
    }

    get worldPosition(): cc.Vec3 {
        return this._node.worldPosition;
    }

    get name(): string {
        return this._name;
    }

    get label(): string {
        let result: string = '';
        const label: cc.Label = this._node.getComponent(cc.Label);
        if (cc.isValid(label)) {
            result = label.string;
        }

        return result;
    }

    get active(): boolean {
        return this.node.active;
    }
}