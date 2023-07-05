/**
 * 方法类
 * 其他脚本使用此类  import Configuration from "./Configuration"
 */

import { _decorator, Component, Button } from 'cc';
class NewClass {
    addClickEvent(node, target, component, handler) {
        var eventHandler = new Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;
        var clickEvents = node.getComponent(Button).clickEvents;
        clickEvents.push(eventHandler);
    }
}
export default new NewClass

