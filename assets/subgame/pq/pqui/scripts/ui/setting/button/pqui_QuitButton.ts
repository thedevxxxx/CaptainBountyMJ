import { Button, Color, Size, Sprite, Vec3, Label, director, Node } from "cc";
import pqui_EventRepository from "../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { view } from "cc";
import { ResolutionPolicy } from "cc";

export default class pqui_QuitButton {

    private pqui_EventRepository: pqui_EventRepository;

    private pqui_UIFactory: pqui_UIFactory;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_EventRepository: pqui_EventRepository) {
        this.pqui_EventRepository = pqui_EventRepository;
        this.pqui_UIFactory = pqui_UIFactory;

        const node = pqui_UIFactory.createNode({
            parent: parent,
            name: "pqui_QuitButton"
        });
        pqui_UIFactory.addWidget(node, { left: 20, top: 15 });

        const button = pqui_UIFactory.createButton({
            parent: node,
            name: ""
        }, {
            transition: Button.Transition.COLOR,
            normalColor: new Color(180, 120, 80),
            hoverColor: new Color(180, 120, 80),
            pressedColor: new Color(127, 82, 52),
            disabledColor: new Color(180, 120, 80),
            onClick: () => this.onQuitButtonClicked(),
        }, {
            contentSize: new Size(60.9, 54.6),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_btn_exit/spriteFrame",
        });

        const label = pqui_UIFactory.createLabel({
            parent: node,
            name: ""
        }, {
            position: new Vec3(0, -60),
            string: "退出",
            color: new Color(161, 146, 138),
            horizontalAlign: Label.HorizontalAlign.CENTER,
            verticalAlign: Label.VerticalAlign.CENTER,
            fontSize: 25
        });

        pqui_EventRepository.onQuit.Attach(() => this.quit());
    }

    public destroy() {

    }

    private onQuitButtonClicked() {
        this.pqui_EventRepository.onPopup.Notify({
            title: "退出游戏",
            content: "你确定要退出游戏?",
            popupButtonParameters: [{
                title: "取消",
            }, {
                title: "退出",
                onClicked: () => this.quit()
            }]
        });
    }

    private async quit() {
        await this.pqui_UIFactory.assetRepository.loadBundle("pq", true)//??
        this.pqui_EventRepository.onQuitButtonClickedUI.Notify();
        director.loadScene("pq_main");//??
    }
}