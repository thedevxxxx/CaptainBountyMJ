import * as cc from "cc";
import { UIOpacity } from "cc";
import { Vec3 } from "cc";

export default class Tweens {
    private static tweenIdx: any = {};

    private static getSubTweenIdx(nodeId: string): {} {
        if (!this.tweenIdx[nodeId]) {
            this.tweenIdx[nodeId] = {};
        }

        return this.tweenIdx[nodeId];
    }
    
    /**
     * 摇动
     * @param root 
     * @returns 
     */
    static startShakeTween(root: cc.Node, callback?: Function) {
        const nodeId = this.getSubTweenIdx(root['_id']);
        const befPoint = nodeId['befPoint'] || root.getPosition()
        nodeId['befPoint'] = befPoint;
        return new Promise<void>(resolve => {
            let vibration = 2;
            let shakePosition = new cc.Vec3(befPoint.x, befPoint.y);
            const temp = { value: vibration };
            this.getSubTweenIdx(root['_id'])['shake'] = cc.tween(temp)
                .to(1, { value: 0 }, {
                    progress: (start, end, current, ratio) => {
                        vibration = current;
                        shakePosition.x = (befPoint.x + ((Math.random() * vibration) * (((Math.random()) > 0.5) ? 1 : -1)));
                        shakePosition.y = (befPoint.y + ((Math.random() * vibration) * (((Math.random()) > 0.5) ? 1 : -1)));
                        root.setPosition(shakePosition);
                        return start + (end - start) * ratio;
                    },
                }).call(() => {
                    this.stopShakeTween(root);
                    if (callback) {
                        callback();
                    }
                    resolve();
                }).start();
        });
    }

    static stopShakeTween(root: cc.Node) {
        const nodeId = this.getSubTweenIdx(root['_id']);
        if (nodeId['shake'] != null) {
            nodeId['shake'].stop();
            nodeId['shake'] = null;
            root.setPosition(nodeId['befPoint']);
            nodeId['befPoint'] = null;
        }
    }

    /**
     * 掉落
     * @param root 
     * @param param 
     * @returns 
     */
    static async startFallTween(root: cc.Node, param: FallParam) {
        const nodeId = this.getSubTweenIdx(root['_id']);
        return new Promise<void>(resolve => {
            const node = root;
            const targetPosition = param.target;
            const distance = node.position.y - targetPosition.y;
            const speed = 500;
            const time = distance / speed;
            nodeId['fall'] = cc.tween(node)
                .delay(param.delay)
                .to(time, { position: targetPosition }, { easing: "bounceOut" })
                .call(() => {
                    param.callback()
                    resolve();
                })
                .start();
        });
        
    }

    static stopFallTween(root: cc.Node) {
        const nodeId = this.getSubTweenIdx(root['_id']);
        if (nodeId['fall'] != null) {
            nodeId['fall'].stop();
            nodeId['fall'] = null;
        }
    }

    /**
     * 渐变增加灰色滤镜
     * @param root 
     */
    static addGrayTween(root: cc.Node, callback?: Function): void {
        const nodeId = this.getSubTweenIdx(root['_id']);
        const spirtes = root.getComponentsInChildren(cc.Sprite);
        this.stopColorTween(root);
        const color = new cc.Color(spirtes[0].color);
        nodeId['color']= cc.tween(color)
            .to(0.3, {
                r: cc.Color.GRAY.r,
                g: cc.Color.GRAY.g,
                b: cc.Color.GRAY.b
            }, {
                onUpdate: () => {
                    spirtes.forEach(sprite => {
                        sprite.color = color;
                    });
                },
                onComplete: () => {
                    spirtes.forEach(sprite => {
                        sprite.color = cc.Color.GRAY;
                    });
                    if (callback) {
                        callback();
                    }
                }
            })
            .start();
    }

    /**
     * 渐变移除颜色滤镜
     * @param root 
     */
    static resetColorTween(root: cc.Node, callback?: Function, sec: number = 0.6): void {
        const nodeId = this.getSubTweenIdx(root['_id']);
        const spirtes = root.getComponentsInChildren(cc.Sprite);
        this.stopColorTween(root);
        const color = new cc.Color(spirtes[0].color);
        nodeId['color']= cc.tween(color)
            .to(sec, {
                r: cc.Color.WHITE.r,
                g: cc.Color.WHITE.g,
                b: cc.Color.WHITE.b
            }, {
                onUpdate: () => {
                    spirtes.forEach(sprite => {
                        sprite.color = color;
                    });
                },
                onComplete: () => {
                    spirtes.forEach(sprite => {
                        sprite.color = cc.Color.WHITE;
                    });
                    if (callback) {
                        callback();
                    }
                }
            })
            .start();
    }

    static stopColorTween(root: cc.Node): void {
        const nodeId = this.getSubTweenIdx(root['_id']);
        if (nodeId['color'] != null) {
            nodeId['color'].stop();
            nodeId['color'] = null;
        }
    }

    /**
     * 指定渐变色
     * @param root 
     */
    static changeColorTween(root: cc.Node, color: cc.Color, sec: number = 0.2): void {
        const spirtes = root.getComponentsInChildren(cc.Sprite);
        const spc = new cc.Color(spirtes[0].color);
        cc.tween(spc)
            .to(sec, {
                r: color.r,
                g: color.g,
                b: color.b
            }, {
                onUpdate: (d: any) => {
                    spirtes[0].color = new cc.Color(d.r, d.g, d.b);
                }
            })
            .start();
    }
    
    /**
     * 模拟翻转效果
     * @param root 
     */
     static startFilpTween(root: cc.Node, callback?: Function): void {
        const nodeId = this.getSubTweenIdx(root['_id']);
        const befScale = nodeId['befScale'] || root.getScale()
        nodeId['befScale'] = befScale;
        this.stopFilpTween(root);
        let scale = root.getScale();
        this.getSubTweenIdx(root['_id'])['flip'] = cc.tween(root)
            .to(0.25, {
                scale: new cc.Vec3(0, scale.y, scale.z)
            }, {
                onComplete: () => {
                    this.stopFilpTween(root);
                    if (callback) {
                        callback();
                    }
                }
            })
            .start();
    }

    static stopFilpTween(root: cc.Node): void {
        const nodeId = this.getSubTweenIdx(root['_id']);
        if (nodeId['flip'] != null) {
            nodeId['flip'].stop();
            root.setScale(nodeId['befScale']);
            nodeId['flip'] = null;
        }
    }

    /**
     * 操作按钮大小效果反馈
     * @param node 
     */
    static addScaleEffect(node: cc.Node): void {
        const befScale = node.getScale();
        const endFun = ()=> {
            cc.tween(node)
            .to(0.1, { scale: new Vec3(befScale.x, befScale.y, 1)}, { easing: "bounceOut" })
            .start();
        }

        node.on(cc.Node.EventType.TOUCH_START, ()=> {
            cc.tween(node.scale)
            .to(0.1, new Vec3(befScale.x * 0.9, befScale.y * 0.9, 1), {
                onUpdate: (data: Vec3) => {
                    node.setScale(data.x, data.y, 1)
                },
            })
            .start();
        });

        node.on(cc.Node.EventType.TOUCH_CANCEL, endFun, this);
        node.on(cc.Node.EventType.TOUCH_END, endFun, this);
    }

    /**
     * 操作按钮颜色渐变反馈
     * @param node 操作节点
     * @param color 
     * @param target 变化节点, 如果为无则将根节点作为反馈对象
     */
    static addColorEffect(node: cc.Node, color: cc.Color, target?: cc.Node): void {
        const endFun = ()=> {
            Tweens.resetColorTween(target || node, null, 0.1);
        }

        node.on(cc.Node.EventType.TOUCH_START, ()=> {
            Tweens.changeColorTween(target || node, color, 0.1);
        });

        node.on(cc.Node.EventType.TOUCH_CANCEL, endFun, this);
        node.on(cc.Node.EventType.TOUCH_END, endFun, this);
    }

    /**
     * 操作按钮透明度反馈
     * @param node 操作节点
     * @param target 变化节点, 如果为无则将根节点作为反馈对象
     */
    static addOpacityEffect(node: cc.Node, target?: cc.Node): void {
        const nodeId = this.getSubTweenIdx(node['_id']);

        let tnode = target || node;
        let opt = tnode.getComponent(UIOpacity);
        if (!opt) {
            opt = tnode.addComponent(UIOpacity);
        }

        const endFun = ()=> {
            if (opt.opacity == 100) {
                node.off(cc.Node.EventType.TOUCH_CANCEL, endFun, this);
                node.off(cc.Node.EventType.TOUCH_END, endFun, this);
            } else {
                nodeId['addOpacity']  = cc.tween(opt)
                    .to(0.1, {opacity :255})
                    .start();
                node.off(cc.Node.EventType.TOUCH_CANCEL, endFun, this);
                node.off(cc.Node.EventType.TOUCH_END, endFun, this);
            }
        }

        node.on(cc.Node.EventType.TOUCH_START, ()=> {
            if (opt.opacity < 255) return;
            nodeId['addOpacity']  = cc.tween(opt)
                .to(0.1, {opacity :101})
                .start();

            node.on(cc.Node.EventType.TOUCH_CANCEL, endFun, this);
            node.on(cc.Node.EventType.TOUCH_END, endFun, this);
        });

        
    }

    static stopAddOpacityEffect(root: cc.Node): void {
        const nodeId = this.getSubTweenIdx(root['_id']);
        if (nodeId['addOpacity'] != null) {
            nodeId['addOpacity'].stop();
            nodeId['addOpacity'] = null;
        }
    }

    /**
     * 弹动效果
     */
    static startBouncingTween(root: cc.Node): void {
        const nodeId = this.getSubTweenIdx(root['_id']);
        const befScale = nodeId['befScale'] || root.getScale();
        
        cc.tween(root)
            .to(0.075, { scale: new Vec3(1.8, 1.8, 1) })
            .to(0.1, { scale: new Vec3(0.9, 0.9, 1) })
            .to(0.1, { scale: befScale }, { easing: "backOut" })
            .start()
    }

}

export interface FallParam {
    delay: number;
    target: cc.Vec3;
    callback: Function;
}