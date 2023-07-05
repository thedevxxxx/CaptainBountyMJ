import { Color, Label, Layout, Node, Size, Sprite, UITransform, Vec2, Vec3, Widget } from "cc";
import mjhl_DataRepository from "../../data/mjhl_DataRepository";
import { SymbolName } from "../../type/mjhl_Types";
import mjhl_GameState, { GameState } from "../gamestate/mjhl_GameState";
import mjhl_EventRepository from "../../../../../script/event/pq_EventRepository";
import mjhl_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class mjhl_SymbolGuider {

    private mjhl_DataRepository: mjhl_DataRepository;

    private mjhl_EventRepository: mjhl_EventRepository;

    private mjhl_GameState: mjhl_GameState;

    private guiderBackgroundNode: Node;

    private reelsRootNode: Node;

    private targetParentX: number;

    private currentTarget: Node;

    private targetOriginalParent: Node;

    private targetOriginalSiblingIndex: number;

    private backgroundNode: Node;

    private descriptionLabel: Label;

    private paytablelayout: UITransform;

    public constructor(reelsRootNode: Node, mjhl_UIFactory: mjhl_UIFactory, mjhl_GameState: mjhl_GameState, mjhl_EventRepository: mjhl_EventRepository, mjhl_DataRepository: mjhl_DataRepository) {
        this.mjhl_GameState = mjhl_GameState;
        this.mjhl_EventRepository = mjhl_EventRepository;
        this.mjhl_DataRepository = mjhl_DataRepository;

        this.reelsRootNode = reelsRootNode;
        this.createUI(reelsRootNode, mjhl_UIFactory);
        this.hideBackground();
        this.hideGuiderBackgroundNode();
        this.hidePaytablelayout();
    }

    public toggleInfo(target: Node, reelIndex: number, symbolName: SymbolName) {
        if (this.mjhl_DataRepository.freeGameCount > 0) {
            return;
        }
        if (this.mjhl_GameState.gameStateMachine.isState(GameState.Playing)) {
            return;
        }
        if (this.currentTarget === target) {
            this.hideInfo();
        } else {
            this.showInfo(target, reelIndex, symbolName);
        }
    }

    public hideInfo() {
        if (this.currentTarget != null) {
            this.currentTarget.setParent(this.targetOriginalParent);
            this.currentTarget.setPosition(0, this.currentTarget.y);
            this.currentTarget.setSiblingIndex(this.targetOriginalSiblingIndex);
            this.currentTarget = null;
        }
        this.hideBackground();
        this.hideGuiderBackgroundNode();
    }

    private createUI(reelsRootNode: Node, mjhl_UIFactory: mjhl_UIFactory) {
        const background = mjhl_UIFactory.createSprite({
            parent: reelsRootNode,
            name: "mjhl_SymbolGuiderBackground"
        }, {
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE,
            spriteFramePath: "mjhl/images/mjhl_default_sprite_splash/spriteFrame"
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        });
        this.backgroundNode = background.node;

        const guiderBackground = mjhl_UIFactory.createSprite({
            parent: null,
            name: "mjhl_SymbolGuider"
        }, {
            contentSize: new Size(280, 180),
            sizeMode: Sprite.SizeMode.CUSTOM,
            type: Sprite.Type.SIMPLE,
            spriteFramePath: "mjhl/images/mjhl_mj_info/spriteFrame"
        }, {

        });
        this.guiderBackgroundNode = guiderBackground.node;

        const descriptionLabel = mjhl_UIFactory.createLabel({
            parent: guiderBackground.node,
            name: "descriptionLabel"
        }, {
            overflow: Label.Overflow.CLAMP,
            contentSize: new Size(200, 180),
            //   lineHeight: 180,
            string: "百搭符號可替代除奪寶符號外的所有符號。",
            color: Color.WHITE,
            fontSize: 20
        }, null, {

        });
        this.descriptionLabel = descriptionLabel;

        const paytablelayout = mjhl_UIFactory.createTransform({
            parent: guiderBackground.node,
            name: "paytablelayout"
        }, {
            contentSize: new Size(100, 114)
        });
        this.paytablelayout = paytablelayout;
        mjhl_UIFactory.addGridLayout(paytablelayout.node, {
            resizeMode: Layout.ResizeMode.CHILDREN,
            cellSize: new Size(30, 30),
            startAxis: Layout.AxisDirection.VERTICAL,
            horizontalDirection: Layout.HorizontalDirection.LEFT_TO_RIGHT,
            verticalDirection: Layout.VerticalDirection.TOP_TO_BOTTOM,
            constraint: Layout.Constraint.FIXED_ROW,
            constraintNum: 3,
            spacingX: 10,
            spacingY: 10
        }, {

        });
        for (let index = 0; index < 6; index++) {
            mjhl_UIFactory.createLabel({
                parent: paytablelayout.node,
                name: "paytableLable",
            }, {
                anchorPoint: new Vec2(0, 0.5),
                fontPath: (index > 2) ? "mjhl/bigImage/text/num/a_mjhl_silver_num" : "mjhl/bigImage/text/num/a_mjhl_gold_num",
                color: Color.WHITE,
                spacingX: -12,
                fontSize: 30,
                string: "0"
            });
        }
    }

    private showInfo(target: Node, reelIndex: number, symbolName: SymbolName) {
        if (symbolName == null) {
            console.log("[mjhl_SymbolGuider] symbolName is null");
            return;
        }
        this.hideInfo();
        this.showBackground();
        this.currentTarget = target;
        const isGuiderAlignRight = (reelIndex > 2);

        const guiderBackgroundNode = this.guiderBackgroundNode
        guiderBackgroundNode.setParent(target);
        guiderBackgroundNode.setSiblingIndex(0);
        this.targetParentX = target.parent.position.x;
        this.targetOriginalParent = target.parent;
        this.targetOriginalSiblingIndex = target.getSiblingIndex();
        target.setParent(this.reelsRootNode);
        target.setPosition(this.targetParentX, target.y);

        const backgroundTransform = guiderBackgroundNode.getComponent(UITransform);
        if (symbolName === SymbolName.Wild || symbolName === SymbolName.Scatter) {
            backgroundTransform.setContentSize(424, 180);
            const descriptionLabel = this.descriptionLabel;
            descriptionLabel.string = (symbolName === SymbolName.Wild) ? "百搭符號可替代除奪寶\n符號外的所有符號。" : "3個奪寶福靠可觸發免費旋轉。";
            const descriptionLabelWidget = this.descriptionLabel.getComponent(Widget);
            if (isGuiderAlignRight) {
                descriptionLabelWidget.isAlignRight = false;
                descriptionLabelWidget.isAlignLeft = true;
                descriptionLabelWidget.left = 40;
            } else {
                descriptionLabelWidget.isAlignRight = true;
                descriptionLabelWidget.isAlignLeft = false;
                descriptionLabelWidget.right = 40;
            }
            this.showDescriptionLabel();
            this.hidePaytablelayout();
        } else {
            const paytableWidget = this.paytablelayout.getComponent(Widget);
            if (isGuiderAlignRight) {
                paytableWidget.isAlignRight = false;
                paytableWidget.isAlignLeft = true;
                paytableWidget.left = -15;
            } else {
                paytableWidget.isAlignRight = true;
                paytableWidget.isAlignLeft = false;
                paytableWidget.right = 55;
            }
            backgroundTransform.setContentSize(280, 180);
            this.hideDescriptionLabel();
            this.sohwPaytableLayout(symbolName);
        }

        const widget = guiderBackgroundNode.getComponent(Widget);
        if (isGuiderAlignRight) {
            widget.isAlignRight = true;
            widget.isAlignLeft = false;
            widget.right = 0;
        } else {
            widget.isAlignRight = false;
            widget.isAlignLeft = true;
            widget.left = 5;
        }
        this.showGuiderBackgroundNode();
        this.mjhl_EventRepository.onSymbolGuiderShow.Notify();
    }

    private showBackground() {
        const backgroundNode = this.backgroundNode
        backgroundNode.active = true;
        backgroundNode.setSiblingIndex(backgroundNode.parent.children.length - 1);
    }

    private hideBackground() {
        this.backgroundNode.active = false;
    }

    private showGuiderBackgroundNode() {
        this.guiderBackgroundNode.active = true;

    }

    private hideGuiderBackgroundNode() {
        this.guiderBackgroundNode.active = false;
    }

    private showDescriptionLabel() {
        this.descriptionLabel.node.active = true;
    }

    private hideDescriptionLabel() {
        this.descriptionLabel.node.active = false;
    }

    private sohwPaytableLayout(symbolName: SymbolName) {
        const paytablelayout = this.paytablelayout;
        paytablelayout.node.active = true;
        const labels = this.paytablelayout.getComponentsInChildren(Label);
        const paytableInfoBySymbolName = new Map<SymbolName, Array<Number>>();
        paytableInfoBySymbolName.set(SymbolName.GreenDragon, [5, 4, 3, 100, 60, 15]);
        paytableInfoBySymbolName.set(SymbolName.RedDragon, [5, 4, 3, 80, 40, 10]);
        paytableInfoBySymbolName.set(SymbolName.WhiteDragon, [5, 4, 3, 60, 20, 8]);
        paytableInfoBySymbolName.set(SymbolName.EightOfCharacters, [5, 4, 3, 40, 15, 6]);
        paytableInfoBySymbolName.set(SymbolName.FiveOfDots, [5, 4, 3, 20, 10, 4]);
        paytableInfoBySymbolName.set(SymbolName.FiveOfBamboos, [5, 4, 3, 20, 10, 4]);
        paytableInfoBySymbolName.set(SymbolName.TwoOfDots, [5, 4, 3, 10, 5, 2]);
        paytableInfoBySymbolName.set(SymbolName.TwoOfBamboos, [5, 4, 3, 10, 5, 2]);
        paytableInfoBySymbolName.set(SymbolName.GoldenGreenDragon, [5, 4, 3, 100, 60, 15]);
        paytableInfoBySymbolName.set(SymbolName.GoldenRedDragon, [5, 4, 3, 80, 40, 10]);
        paytableInfoBySymbolName.set(SymbolName.GoldenWhiteDragon, [5, 4, 3, 60, 20, 8]);
        paytableInfoBySymbolName.set(SymbolName.GoldenEightOfCharacters, [5, 4, 3, 40, 15, 6]);
        paytableInfoBySymbolName.set(SymbolName.GoldenFiveOfDots, [5, 4, 3, 20, 10, 4]);
        paytableInfoBySymbolName.set(SymbolName.GoldenFiveOfBamboos, [5, 4, 3, 20, 10, 4]);
        paytableInfoBySymbolName.set(SymbolName.GoldenTwoOfDots, [5, 4, 3, 10, 5, 2]);
        paytableInfoBySymbolName.set(SymbolName.GoldenTwoOfBamboos, [5, 4, 3, 10, 5, 2]);
        const paytableInfo = paytableInfoBySymbolName.get(symbolName);
        for (let index = 0; index < labels.length; index++) {
            const label = labels[index];
            label.string = paytableInfo[index].toString();
        }
    }

    private hidePaytablelayout() {
        this.paytablelayout.node.active = false;
    }
}
