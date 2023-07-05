import { find, Node, Vec3, BlockInputEvents, Button, Sprite, SpriteFrame, Widget, Label, Color, Font, LabelOutline, Layout, Slider, Vec2, Size, Toggle, ScrollView, Mask, ProgressBar, AnimationClip, dragonBones, Texture2D, sp, RichText, UITransform, ScrollBar, Animation, HorizontalTextAlignment, VerticalTextAlignment, Overflow, Layers, isValid, Material, ParticleSystem2D, ParticleAsset } from "cc";
import AssetRepository from "../asset/pq_AssetRepository";
import { log } from "cc";

export default class pq_UIFactory {//

    public readonly assetRepository: AssetRepository;

    public readonly canvasNode: Node;

    constructor(assetRepository: AssetRepository) {
        this.assetRepository = assetRepository;
        this.canvasNode = find("Canvas");
    }

    public destroy() {
        console.log(`[AssetRepository] destroy`);
    }

    public createNode(nodeParameter?: NodeParameter, widgetParameter?: WidgetParameter): Node {
        const parent = nodeParameter.parent;
        const name = nodeParameter.name;
        const position = nodeParameter.position;
        const rotation = nodeParameter.rotation;
        const scale = nodeParameter.scale;

        const node = new Node();
        if (parent != null) {
            if (isValid(parent, true)) {
                node.setParent(parent);
            } else {
                node.destroy();
                console.log(`[UIFactory] createNode, parent is null`);
            }
        }
        if (name != null) {
            node.name = name;
        }
        if (position != null) {
            node.setPosition(position);
        }
        if (rotation != null) {
            node.setRotationFromEuler(rotation);
        }
        if (scale != null) {
            node.setScale(scale);
        }
        if (widgetParameter != null) {
            this.addWidget(node, widgetParameter);
        }
        // node.layer = Layers.Enum.UI_2D;
        return node;
    }

    public createTransform(nodeParameter: NodeParameter, parameter?: UITransformParameter, widgetParameter?: WidgetParameter): UITransform {
        const node = this.createNode(nodeParameter);
        const transform = node.addComponent(UITransform);
        const position = parameter?.position;
        if (position != null) {
            node.setPosition(position.x, position.y);
        }
        const contentSize = parameter?.contentSize;
        if (contentSize != null) {
            transform.setContentSize(contentSize);
        }
        const anchorPoint = parameter?.anchorPoint;
        if (anchorPoint != null) {
            transform.setAnchorPoint(anchorPoint);
        }
        if (widgetParameter != null) {
            this.addWidget(node, widgetParameter);
        }
        return transform;
    }

    public createBlockInput(nodeParameter: NodeParameter): BlockInputEvents {
        const node = this.createNode(nodeParameter);
        node.addComponent(UITransform);
        this.addWidget(node, { top: 0, bottom: 0, left: 0, right: 0, target: this.canvasNode });
        return node.addComponent(BlockInputEvents);
    }

    public createButton(nodeParameter: NodeParameter, buttonParameter?: ButtonParameter, spriteParameter?: SpriteParameter, labelParameter?: LabelParameter, widgetParameter?: WidgetParameter): Button {
        const zoomScale = buttonParameter.zoomScale;
        const duration = buttonParameter.duration;
        const contentSize = buttonParameter.contentSize;
        const position = buttonParameter.position;
        const normalColor = buttonParameter.normalColor;
        const pressedColor = buttonParameter.pressedColor;
        const hoverColor = buttonParameter.hoverColor;
        const disabledColor = buttonParameter.disabledColor;
        const transition = buttonParameter.transition;
        const onClick = buttonParameter.onClick;

        const node = this.createNode(nodeParameter);

        if (spriteParameter != null) {
            this.addSprite(node, spriteParameter);
        }

        const button = node.addComponent(Button);

        if (onClick != null) {
            node.on(Button.EventType.CLICK, () => onClick());
        }

        if (transition != null) {
            button.transition = transition;
        }
        if (contentSize != null) {
            node.getComponent(UITransform).setContentSize(contentSize);
        }
        if (position != null) {
            node.setPosition(position.x, position.y);
        }
        if (normalColor != null) {
            button.normalColor = normalColor;
        }
        if (pressedColor != null) {
            button.pressedColor = pressedColor;
        }
        if (hoverColor != null) {
            button.hoverColor = hoverColor;
        }
        if (disabledColor != null) {
            button.disabledColor = disabledColor;
        }
        if (zoomScale != null) {
            button.zoomScale = zoomScale;
        }
        if (duration != null) {
            button.duration = duration;
        }

        if (labelParameter != null) {
            this.createLabel({
                parent: node,
                name: ""
            }, labelParameter);
        }

        if (widgetParameter != null) {
            this.addWidget(node, widgetParameter);
        }

        return button;
    }

    public createSprite(nodeParameter: NodeParameter, spriteParameter: SpriteParameter, widgetParameter?: WidgetParameter): Sprite {
        const node = this.createNode(nodeParameter);
        const sprite = this.addSprite(node, spriteParameter);
        if (widgetParameter != null) {
            this.addWidget(node, widgetParameter);
        }
        return sprite;
    }

    public addSprite(node: Node, spriteParameter: SpriteParameter): Sprite {
        const sprite = node.addComponent(Sprite);
        sprite.color = spriteParameter.color ?? sprite.color;
        const type = spriteParameter.type;
        if (type != null) {
            sprite.type = type;
        }
        const sizeMode = spriteParameter.sizeMode;
        if (sizeMode != null) {
            sprite.sizeMode = sizeMode;
        }
        const transform = sprite.getComponent(UITransform);
        const size = spriteParameter.contentSize;
        if (size != null) {
            transform.setContentSize(size);
        }
        const anchorPoint = spriteParameter.anchorPoint;
        if (anchorPoint != null) {
            transform.setAnchorPoint(anchorPoint);
        }
        const position = spriteParameter.position;
        if (position != null) {
            sprite.node.setPosition(position.x, position.y);
        }
        const spriteFramePath = spriteParameter.spriteFramePath;
        if (spriteFramePath != null) {
            (async () => {
                const spriteFrame = await this.assetRepository.getAsset(spriteFramePath, SpriteFrame);
                const isNodeValid = this.setSpriteFrame(sprite, spriteFrame);
                if (isNodeValid) {
                    sprite.getComponentsInChildren(Widget).forEach(widget => widget.updateAlignment());
                }
                const materialPath = spriteParameter.materialPath;
                if (materialPath != null) {
                    const material = await this.assetRepository.getAsset(materialPath, Material);
                    if (isValid(sprite.node, true)) {
                        sprite.customMaterial = material;
                    }
                }
            })();
        }
        return sprite;
    }

    public async createSpriteAsync(nodeParameter: NodeParameter, spriteParameter: SpriteParameter, widgetParameter?: WidgetParameter): Promise<Sprite> {
        const node = this.createNode(nodeParameter);
        const sprite = await this.addSpriteAsync(node, spriteParameter);
        if (widgetParameter != null) {
            this.addWidget(node, widgetParameter);
        }
        return sprite;
    }

    public async addSpriteAsync(node: Node, spriteParameter: SpriteParameter): Promise<Sprite> {
        const sprite = node.addComponent(Sprite);
        sprite.color = spriteParameter.color ?? sprite.color;
        const type = spriteParameter.type;
        if (type != null) {
            sprite.type = type;
        }
        const sizeMode = spriteParameter.sizeMode;
        if (sizeMode != null) {
            sprite.sizeMode = sizeMode;
        }
        const transform = sprite.getComponent(UITransform);
        const size = spriteParameter.contentSize;
        if (size != null) {
            transform.setContentSize(size);
        }
        const anchorPoint = spriteParameter.anchorPoint;
        if (anchorPoint != null) {
            transform.setAnchorPoint(anchorPoint);
        }
        const position = spriteParameter.position;
        if (position != null) {
            sprite.node.setPosition(position.x, position.y);
        }
        const spriteFramePath = spriteParameter.spriteFramePath;
        if (spriteFramePath != null) {
            const spriteFrame = await this.assetRepository.getAsset(spriteFramePath, SpriteFrame);
            const isValid = this.setSpriteFrame(sprite, spriteFrame);
            if (isValid) {
                sprite.getComponentsInChildren(Widget).forEach(widget => widget.updateAlignment());
            }
        }
        const materialPath = spriteParameter.materialPath;
        if (materialPath != null) {
            const material = await this.assetRepository.getAsset(materialPath, Material);
            if (isValid(sprite.node, true)) {
                sprite.customMaterial = material;
            }
        }
        return sprite;
    }

    public createLabel(nodeParameter: NodeParameter, parameter?: LabelParameter, labelOutlineParameter?: LabelOutlineParameter, widgetParameter?: WidgetParameter): Label {
        const node = this.createNode(nodeParameter);
        const label = node.addComponent(Label);
        label.color = Color.BLACK;
        label.string = "";

        if (parameter != null) {
            label.color = parameter.color ?? label.color;
            label.string = parameter.string ?? label.string;
            label.fontSize = parameter.fontSize ?? label.fontSize;
            label.lineHeight = parameter.lineHeight ?? label.lineHeight;
            label.horizontalAlign = parameter.horizontalAlign ?? label.horizontalAlign;
            label.verticalAlign = parameter.verticalAlign ?? label.verticalAlign;
            label.overflow = parameter.overflow ?? label.overflow;
            label.isBold = parameter.isBold ?? label.isBold;
            label.spacingX = parameter.spacingX ?? label.spacingX;

            const contentSize = parameter.contentSize;
            const transform = label.getComponent(UITransform);
            if (contentSize != null) {
                transform.setContentSize(contentSize);
            }
            const fontPath = parameter.fontPath;
            if (fontPath != null) {
                (async () => {
                    const font = await this.assetRepository.getAsset(fontPath, Font);
                    if (isValid(label.node, true)) {
                        label.font = font;
                    } else {
                        console.log(`[pq_UIFactory] label null`);
                    }
                })();
            }
            const anchorPoint = parameter.anchorPoint;
            if (anchorPoint != null) {
                transform.setAnchorPoint(anchorPoint);
            }
            const rotation = parameter.rotation;
            if (rotation != null) {
                label.node.eulerAngles = rotation;
            }
            const position = parameter.position;
            if (position != null) {
                label.node.setPosition(position);
            }
        }

        if (labelOutlineParameter != null) {
            const labelOutline = label.addComponent(LabelOutline);
            const {
                color: color,
                width: width
            } = labelOutlineParameter;
            if (color != null) {
                labelOutline.color = color;
            }
            if (width != null) {
                labelOutline.width = width;
            }
        }

        if (widgetParameter != null) {
            this.addWidget(node, widgetParameter);
        }
        return label;
    }

    public addWidget(node: Node, parameter: WidgetParameter): Widget {
        const widget = node.addComponent(Widget);
        widget.target = parameter.target ?? node.parent;
        widget.isAlignTop = (parameter.top == null) ? false : true;
        widget.isAlignBottom = (parameter.bottom == null) ? false : true;
        widget.isAlignLeft = (parameter.left == null) ? false : true;
        widget.isAlignRight = (parameter.right == null) ? false : true;
        widget.isAlignHorizontalCenter = (parameter.horizontalCenter == null) ? false : true;
        widget.isAlignVerticalCenter = (parameter.verticalCenter == null) ? false : true;
        widget.top = parameter.top;
        widget.bottom = parameter.bottom;
        widget.left = parameter.left;
        widget.right = parameter.right;
        widget.horizontalCenter = parameter.horizontalCenter;
        widget.verticalCenter = parameter.verticalCenter;
        widget.alignMode = parameter.alignMode ?? widget.alignMode;
        return widget;
    }

    public addVerticalLayout(node: Node, spacingY?: number, paddingTop?: number): Layout {
        const layout = node.addComponent(Layout);
        layout.type = Layout.Type.VERTICAL;
        layout.resizeMode = Layout.ResizeMode.CONTAINER;
        layout.spacingY = spacingY ?? 0;
        layout.paddingTop = paddingTop ?? 0;
        return layout;
    }

    public addHorizontalLayout(node: Node, horizontalParamter: HorizontalParameter): Layout {
        const layout = node.addComponent(Layout);
        layout.type = Layout.Type.HORIZONTAL;
        layout.resizeMode = horizontalParamter.resizeMode ?? Layout.ResizeMode.NONE;
        layout.paddingLeft = horizontalParamter.paddingLeft ?? 0;
        layout.paddingRight = horizontalParamter.paddingRight ?? 0;
        layout.spacingX = horizontalParamter.spacingX ?? 0;
        layout.horizontalDirection = horizontalParamter.horizontalDirection ?? Layout.HorizontalDirection.LEFT_TO_RIGHT;
        return layout;
    }

    public addGridLayout(node: Node, parameter: GridLayoutParameter, widgetParameter?: WidgetParameter) {
        const layout = node.addComponent(Layout);
        layout.type = Layout.Type.GRID;
        const resizeMode = parameter.resizeMode;
        const cellSize = parameter.cellSize;
        const startAxis = parameter.startAxis;
        const paddingTop = parameter.paddingTop;
        const paddingBottom = parameter.paddingBottom;
        const paddingLeft = parameter.paddingLeft;
        const paddingRight = parameter.paddingRight;
        const spacingX = parameter.spacingX;
        const spacingY = parameter.spacingY;
        const verticalDirection = parameter.verticalDirection;
        const horizontalDirection = parameter.horizontalDirection;
        const affectedByScale = parameter.affectedByScale;
        const constraint = parameter.constraint;
        const constraintNum = parameter.constraintNum;
        if (resizeMode != null) {
            layout.resizeMode = resizeMode;
        }
        if (cellSize != null) {
            layout.cellSize = cellSize;
        }
        if (startAxis != null) {
            layout.startAxis = startAxis;
        }
        if (paddingTop != null) {
            layout.paddingTop = paddingTop;
        }
        if (paddingBottom != null) {
            layout.paddingBottom = paddingBottom;
        }
        if (paddingLeft != null) {
            layout.paddingLeft = paddingLeft;
        }
        if (paddingRight != null) {
            layout.paddingRight = paddingRight;
        }
        if (spacingX != null) {
            layout.spacingX = spacingX;
        }
        if (spacingY != null) {
            layout.spacingY = spacingY;
        }
        if (verticalDirection != null) {
            layout.verticalDirection = verticalDirection;
        }
        if (horizontalDirection != null) {
            layout.horizontalDirection = horizontalDirection;
        }
        if (affectedByScale != null) {
            layout.affectedByScale = affectedByScale;
        }
        if (constraint != null) {
            layout.constraint = constraint;
        }
        if (constraintNum != null) {
            layout.constraintNum = constraintNum;
        }
        if (widgetParameter != null) {
            this.addWidget(node, widgetParameter);
        }
    }

    public createSlider(parent: Node, parameter: SliderParameter): Slider {
        const sliderNode = this.createSprite({
            parent: parent,
            name: ""
        }, {
            contentSize: parameter.sliderContentSize,
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            color: Color.GRAY,
            spriteFramePath: parameter.sliderSpriteFramePath
        }).node;

        const slider = sliderNode.addComponent(Slider);
        slider.progress = 0.0;

        const handleButton = this.createButton({
            parent: sliderNode,
            name: ""
        }, {
            transition: Button.Transition.NONE,
            position: new Vec2((sliderNode.position.x * 0.5 * -1), 0),
            contentSize: new Size(parameter.handleContentSize)
        }, {
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            color: Color.BLACK,
            spriteFramePath: parameter.handleSpriteFramePath
        });
        handleButton.interactable = false;
        slider.handle = handleButton.getComponent(Sprite);

        (async () => {
            const sliderSpriteFrame = await this.assetRepository.getAsset(parameter.sliderSpriteFramePath, SpriteFrame);
            const isSliderNodeValid = this.setSpriteFrame(sliderNode.getComponent(Sprite), sliderSpriteFrame);
            if (!isSliderNodeValid) {
                console.log(`[pq_UIFactory] sliderNode null`);
                return;
            }
            const handleSpriteFrame = await this.assetRepository.getAsset(parameter.handleSpriteFramePath, SpriteFrame);
            this.setSpriteFrame(handleButton.getComponent(Sprite), handleSpriteFrame);
        })();

        return slider;
    }

    public createToggle(parent: Node, parameter: ToggleParameter): Toggle {
        const toggleSprite = this.createSprite({
            parent: parent,
            name: ""
        }, {
            position: parameter.position,
            color: parameter.normalColor,
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.RAW,
            spriteFramePath: parameter.toggleSpriteFramePath,
            contentSize: parameter.contentSize
        });
        const toggleNode = toggleSprite.node;

        const toggle = toggleNode.addComponent(Toggle);

        const checkmark = this.createSprite({
            parent: toggleNode,
            name: ""
        }, {
            color: parameter.checkmarkColor,
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.RAW,
            spriteFramePath: parameter.checkmarkSpriteFramePath,
            contentSize: parameter.contentSize
        });
        toggle.checkMark = checkmark;

        const anchorPoint = parameter.anchorPoint;
        if (anchorPoint != null) {
            toggle.getComponent(UITransform).setAnchorPoint(anchorPoint);
            checkmark.getComponent(UITransform).setAnchorPoint(anchorPoint);
        }

        toggle.isChecked = false;
        toggleNode.on("toggle", () => parameter.onToggle?.());

        return toggle;
    }

    public createScrollView(parent: Node, parameter: ScrollViewParameter, widgetParameter?: WidgetParameter): ScrollView {
        const scrollViewSize = parameter.scroViewSize;
        const scrollViewSprite = this.createSprite({
            parent: parent,
            name: ""
        }, {
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            color: parameter.scrollViewColor ?? Color.WHITE,
        });
        const scrollViewNode = scrollViewSprite.node;
        scrollViewNode.getComponent(UITransform).setContentSize(scrollViewSize);
        const scrollView = scrollViewNode.addComponent(ScrollView);
        scrollView.horizontal = false;
        scrollView.brake = 0.75;
        scrollView.bounceDuration = 0.23;

        const inertia = parameter.inertia;
        if (inertia != null) {
            scrollView.inertia = inertia;
        }
        const elastic = parameter.elastic;
        if (elastic != null) {
            scrollView.elastic = elastic;
        }

        const scrollBarSprite = this.createSprite({
            parent: scrollViewNode,
            name: ""
        }, {
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            color: parameter.scrollBarColor ?? Color.GRAY,
            contentSize: new Size(12, scrollViewSize.height),
            anchorPoint: new Vec2(1, 0.5),
        });
        const scrollBarNode = scrollBarSprite.node;
        this.addWidget(scrollBarNode, { top: 0, bottom: 0, right: 0 }).alignMode = Widget.AlignMode.ALWAYS;
        const scrollBar = scrollBarNode.addComponent(ScrollBar);
        scrollBar.direction = ScrollBar.Direction.VERTICAL;

        const barSprite = this.createSprite({
            parent: scrollBarNode,
            name: ""
        }, {
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            //color: parameter.scrollBarColor ?? Color.GRAY,
            contentSize: new Size(10, (scrollBarSprite.getComponent(UITransform).height * 0.625)),//??
            anchorPoint: new Vec2(0, 0),
            position: new Vec2(-11, -31.25)//??
        });

        const viewNode = this.createNode({
            parent: scrollViewNode,
            name: ""
        });
        viewNode.addComponent(Mask);
        viewNode.getComponent(UITransform).setContentSize(scrollViewSize);
        this.addWidget(viewNode, { top: 0, bottom: 0, left: 0, right: 0 }).updateAlignment();//

        const contentNode = this.createNode({
            parent: viewNode,
            name: ""
        });
        contentNode.setPosition(-10, scrollViewSize.height * 0.5);
        const contentTransform = contentNode.addComponent(UITransform);
        contentTransform.setContentSize(new Size((scrollViewSize.width - scrollBarNode.getComponent(UITransform).width), parameter.contentHeight));
        contentTransform.setAnchorPoint(new Vec2(0.5, 1));

        //this.addSprite(contentNode, {//Debug
        //    color: new Color(255, 0, 0, 100),
        //    spriteFramePath: "mainui/images/default_panel/spriteFrame",
        //    sizeMode: Sprite.SizeMode.CUSTOM,
        //    type: Sprite.Type.SLICED
        //});

        scrollBar.handle = barSprite;
        scrollView.verticalScrollBar = scrollBar;
        scrollView.content = contentNode;

        (async () => {
            if (parameter.scrollViewSpriteFramePath != null) {
                const scrollViewspriteFrame = await this.assetRepository.getAsset(parameter.scrollViewSpriteFramePath, SpriteFrame);
                const isScrollViewSpriteValid = this.setSpriteFrame(scrollViewSprite, scrollViewspriteFrame);
                if (!isScrollViewSpriteValid) {
                    return;
                }
            }
            const scrollBar = scrollView.verticalScrollBar;
            if (parameter.scrollBarSpriteFramePath != null) {
                const scrollBarSpriteFrame = await this.assetRepository.getAsset(parameter.scrollBarSpriteFramePath, SpriteFrame);
                const isScrollBarValid = this.setSpriteFrame(scrollBar.getComponent(Sprite), scrollBarSpriteFrame);
                if (!isScrollBarValid) {
                    return;
                }
            }
            const bar = scrollBar.handle;
            if (parameter.barSpriteFramePath != null) {
                const barSprtieFrame = await this.assetRepository.getAsset(parameter.barSpriteFramePath, SpriteFrame);
                const isBarValid = this.setSpriteFrame(bar, barSprtieFrame);
                if (!isBarValid) {
                    return;
                }
            }
            bar.node.getComponent(UITransform).setContentSize(10, scrollViewSize.height * 0.5);
            bar.node.setPosition(bar.node.position.x, 0);
            scrollView.scrollToTop();

            if (widgetParameter != null) {
                this.addWidget(scrollViewNode, widgetParameter);
            }
        })();

        return scrollView;
    }

    public async createProgressBarAsync(parent: Node, progressBarParameter: ProgressBarParameter, widgetParameter: WidgetParameter): Promise<ProgressBar> {
        const progressBarSize = progressBarParameter.size;

        const progressBarNode = (await this.createSpriteAsync({
            parent: parent,
            name: ""
        }, {
            contentSize: progressBarSize,
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: progressBarParameter.progressSpriteFramePath
        })).node;
        const progressBar = progressBarNode.addComponent(ProgressBar);
        progressBar.mode = progressBarParameter.mode;

        const barSprite = await this.createSpriteAsync({
            parent: progressBarNode,
            name: ""
        }, {
            position: new Vec2((progressBarSize.width * 0.5 * -1), 0),
            contentSize: progressBarSize,
            anchorPoint: new Vec2(0.0, 0.5),
            type: progressBarParameter.barSpriteType ?? Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: progressBarParameter.barSpriteFramePath
        });

        progressBar.barSprite = barSprite;
        progressBar.progress = 0;
        progressBar.totalLength = 1;

        if (widgetParameter != null) {
            this.addWidget(progressBarNode, widgetParameter);
        }
        return progressBar;
    }

    public createVerticalDropdown(parent: Node, parameter: DropdownParameter, onItemClick: (index: number) => void, onRootButtonClick?: Function): Node {
        const buttonSize = parameter.buttonSize;
        const buttonNode = this.createButton({
            parent: parent,
            name: ""
        }, {
            onClick: () => {
                scrollView.node.active = !scrollView.node.active;
                onRootButtonClick?.();
            },
            transition: Button.Transition.NONE
        }, {
            contentSize: buttonSize,
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            color: parameter.buttonSpriteColor ?? Color.WHITE,
        }).node;

        const label = this.createLabel({
            parent: buttonNode,
            name: ""
        }, {
            string: parameter.title,
            color: parameter.labelColor,
        });

        const items = parameter.items;

        const scroViewSize = new Size(buttonSize.width, buttonSize.height * items.length);
        const scrollView = this.createScrollView(buttonNode, {
            scroViewSize: scroViewSize,
            contentHeight: scroViewSize.height,
            scrollViewColor: parameter.scrollViewColor,
            scrollBarColor: parameter.scrollBarColor,
            buttonSpriteFramePath: parameter.buttonSpriteFramePath,
            scrollViewSpriteFramePath: parameter.scrollViewSpriteFramePath,
            scrollBarSpriteFramePath: parameter.scrollViewSpriteFramePath,
            barSpriteFramePath: parameter.scrollViewSpriteFramePath
        });
        const scrollViewY = ((scrollView.node.getComponent(UITransform).height * 0.5) + (buttonSize.height * 0.5)) * -1.025;
        scrollView.node.setPosition(0, scrollViewY);
        const scrollBarWidth = scrollView.verticalScrollBar.node.getComponent(UITransform).width;
        const itemSize = new Size((scroViewSize.width - scrollBarWidth), (scroViewSize.height / items.length));
        for (let index = 0; index < items.length; index++) {
            const title = items[index];

            const button = this.createButton({
                parent: scrollView.content,
                name: ""
            }, {
                onClick: () => onItemClick(index),
                contentSize: itemSize
            }, {

            });
            button.node.getComponent(UITransform).setAnchorPoint(0.5, 1);

            const label = this.createLabel({
                parent: button.node,
                name: ""
            }, {
                string: title,
                fontSize: parameter.itemFontSize,
                color: parameter.labelColor
            });
            label.node.getComponent(UITransform).setAnchorPoint(0.5, 1);

            button.node.setPosition(1, button.node.getComponent(UITransform).height * index * -1);// layout??
        }
        scrollView.node.active = false;
        if (parameter.hideScrollBar) {
            scrollView.verticalScrollBar.node.active = false;
        }
        (async () => {
            this.setSpriteFrame(buttonNode.getComponent(Sprite), await this.assetRepository.getAsset(parameter.buttonSpriteFramePath, SpriteFrame));
        })();
        return buttonNode;
    }

    public createGridDropdown(parent: Node, parameter: DropdownParameter, onItemClick: (toggle: Toggle) => void, onRootButtonClick?: Function): Node {
        const buttonSize = parameter.buttonSize;
        const buttonNode = this.createButton({
            parent: parent,
            name: ""
        }, {
            onClick: () => {
                scrollView.node.active = !scrollView.node.active;
                onRootButtonClick?.();
            },
            transition: Button.Transition.NONE
        }, {
            contentSize: buttonSize,
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            color: parameter.buttonSpriteColor ?? Color.WHITE,
        }).node;

        const label = this.createLabel({
            parent: buttonNode,
            name: ""
        }, {
            string: parameter.title,
            color: parameter.labelColor,
        });

        const items = parameter.items;

        const scroViewSize = new Size(buttonSize.width, buttonSize.height * items.length);
        const contentHeight = scroViewSize.height;//* 0.9;
        const scrollView = this.createScrollView(buttonNode, {
            scroViewSize: scroViewSize,
            contentHeight: contentHeight,
            scrollViewColor: parameter.scrollViewColor,
            scrollBarColor: parameter.scrollBarColor,
            buttonSpriteFramePath: parameter.buttonSpriteFramePath,
            scrollViewSpriteFramePath: parameter.scrollViewSpriteFramePath,
            scrollBarSpriteFramePath: parameter.scrollViewSpriteFramePath,
            barSpriteFramePath: parameter.scrollViewSpriteFramePath
        });
        const scrollViewY = ((scrollView.node.getComponent(UITransform).height * 0.5) + (buttonSize.height * 0.5)) * -1.025;
        scrollView.node.setPosition(0, scrollViewY);
        const scrollBarWidth = scrollView.verticalScrollBar.node.getComponent(UITransform).width;
        const itemSize = new Size(((scroViewSize.width * 0.5)), (contentHeight / items.length));
        const column = 10;
        const row = Math.ceil(items.length / column);
        let itemIndex = 0;
        for (let rowIndex = 0; rowIndex < row; rowIndex++) {
            for (let columnIndex = 0; columnIndex < column; columnIndex++) {
                if (itemIndex === items.length) {
                    break;
                }
                const title = items[itemIndex];

                const toggle = this.createToggle(scrollView.content, {
                    position: Vec2.ZERO,//new Vec2(-150 + (225 * index), 0),
                    toggleSpriteFramePath: "mainui/images/default_panel/spriteFrame",
                    checkmarkSpriteFramePath: "mainui/images/default_toggle_checkmark/spriteFrame",
                    contentSize: new Size(50, 50),
                    anchorPoint: new Vec2(0.5, 1),
                    onToggle: () => onItemClick?.(toggle),
                    normalColor: Color.BLACK,
                    checkmarkColor: Color.GREEN
                });

                const label = this.createLabel({
                    parent: toggle.node,
                    name: ""
                }, {
                    string: title,
                    fontSize: parameter.itemFontSize,
                    color: parameter.labelColor,
                    horizontalAlign: Label.HorizontalAlign.LEFT,
                    verticalAlign: Label.VerticalAlign.CENTER,
                    overflow: Label.Overflow.SHRINK
                });
                this.addWidget(label.node, { top: 0, bottom: 0, right: -100 });

                const toggleWidth = toggle.node.getComponent(UITransform).width;
                const rowPositionX = (rowIndex === 0) ? (((scroViewSize.width * 0.5) * -1) + toggleWidth) : toggleWidth;
                toggle.node.setPosition(rowPositionX, itemSize.height * columnIndex * -1);
                itemIndex++;
            }
        }

        scrollView.node.active = false;
        if (parameter.hideScrollBar) {
            scrollView.verticalScrollBar.node.active = false;
        }
        (async () => {
            this.setSpriteFrame(buttonNode.getComponent(Sprite), await this.assetRepository.getAsset(parameter.buttonSpriteFramePath, SpriteFrame));
        })();
        return buttonNode;
    }

    public createAnimationClipWithSpriteFrames(parent: Node, animationClipParameters: Array<AnimationClipParameter>): Animation {
        const node = this.createNode({
            parent: parent,
            name: ""
        });
        node.addComponent(Sprite);
        const animation = node.addComponent(Animation);
        (async () => {
            for (let index = 0; index < animationClipParameters.length; index++) {
                const animationClipParameter = animationClipParameters[index];
                const spriteFrames: Array<SpriteFrame> = [];
                for await (let path of animationClipParameter.pathes) {
                    const spriteFrame = await this.assetRepository.getAsset(path, SpriteFrame);
                    spriteFrames.push(spriteFrame as SpriteFrame);
                }
                if (isValid(node, true)) {
                    const clip = AnimationClip.createWithSpriteFrames(spriteFrames, spriteFrames.length);
                    const speed = animationClipParameter.speed;
                    clip.wrapMode = animationClipParameter.wrapMode;
                    clip.name = animationClipParameter.clipName;
                    if (speed != null) {
                        clip.speed = speed;
                    }
                    animation.createState(clip, clip.name);
                } else {
                    console.log(`[pq_UIFactory] animation node is not valid`);
                }
            }
        })();
        return animation;
    }

    public createDragonBonesArmatureDisplay(parent: Node, parameter: DragonBonesArmatureDisplayParameter): dragonBones.ArmatureDisplay {
        const node = this.createNode({
            parent: parent,
            name: ""
        });

        const armatureDisplay = node.addComponent(dragonBones.ArmatureDisplay);
        (async () => {
            const dragonBonesAtlasAsset = new dragonBones.DragonBonesAtlasAsset();
            dragonBonesAtlasAsset.atlasJson = (await this.assetRepository.getAsset<dragonBones.DragonBonesAtlasAsset>(parameter.dragonBonesAtlasAssetPath, dragonBones.DragonBonesAtlasAsset)).atlasJson;
            dragonBonesAtlasAsset.texture = await this.assetRepository.getAsset<Texture2D>(parameter.texturePath, Texture2D);

            const dragonBonesAsset = await this.assetRepository.getAsset<dragonBones.DragonBonesAsset>(parameter.dragonBonesAssetPath, dragonBones.DragonBonesAsset);
            if (isValid(node, true)) {
                armatureDisplay.dragonAsset = dragonBonesAsset;
                armatureDisplay.dragonAtlasAsset = dragonBonesAtlasAsset;
                armatureDisplay.armatureName = parameter.armatureName;
                armatureDisplay.playAnimation(parameter.animationName, 0);
            } else {
                console.log(`[pq_UIFactory] armatureDisplay.node is not valid`);
            }
        })();

        return armatureDisplay;
    }

    public async createSpineSkeletonAsync(spineSkeletonParameter: SpineSkeletonParameter): Promise<sp.Skeleton> {
        const nodeParameter = spineSkeletonParameter.nodeParameter;
        const uiTransformParameter = spineSkeletonParameter.uiTransformParameter;
        const widgetParameter = spineSkeletonParameter.widgetParameter;
        const skeletonDataPath = spineSkeletonParameter.skeletonDataPath;
        const timeScale = spineSkeletonParameter.timeScale;
        const color = spineSkeletonParameter.color;
        const node = this.createTransform(nodeParameter, uiTransformParameter).node;
        const skeleton = node.addComponent(sp.Skeleton);
        skeleton.premultipliedAlpha = false;
        const skeletonData = await this.assetRepository.getAsset<sp.SkeletonData>(skeletonDataPath, sp.SkeletonData, true);
        if (!isValid(node, true)) {
            console.log(`[pq_UIFactory] skeleton.node is not valid`);
            return;
        }
        skeleton.skeletonData = skeletonData;
        if (timeScale != null) {
            skeleton.timeScale = timeScale;
        }
        if (color != null) {
            skeleton.color = color;
        }
        if (widgetParameter != null) {
            this.addWidget(node, widgetParameter);
        }
        return skeleton;
    }

    public createRichText(parent: Node, parameter: RichTextParameter): RichText {
        const node = this.createNode({
            parent: parent,
            name: ""
        });
        node.addComponent(UITransform);
        const richText = node.addComponent(RichText);

        const string = parameter.string;
        const horizontalAlign = parameter.horizontalAlign;
        const fontSize = parameter.fontSize;
        const fontPath = parameter.fontPath;
        const maxWidth = parameter.maxWidth;
        const lineHeight = parameter.lineHeight;

        if (string != null) {
            richText.string = string;
        }
        if (horizontalAlign != null) {
            richText.horizontalAlign = horizontalAlign;
        }
        if (fontSize != null) {
            richText.fontSize = fontSize;
        }
        if (maxWidth != null) {
            richText.maxWidth = maxWidth;
        }
        if (lineHeight != null) {
            richText.lineHeight = lineHeight;
        }
        //if (fontPath != null) {
        //    (async () => {
        //        const font = await this.pqui_AssetRepository.getAsset(fontPath, Font);
        //        if (richText != null) {
        //            richText.font = font;
        //        }
        //    })();
        //}
        return richText;
    }

    public async createParticleSystem2DAsync(particleSystem2DParameter: ParticleSystem2DParameter) {
        const nodeParameter = particleSystem2DParameter.nodeParameter;
        const customMaterialPath = particleSystem2DParameter.customMaterialPath;
        const playOnLoad = particleSystem2DParameter.playOnLoad;
        const autoRemoveOnFinish = particleSystem2DParameter.autoRemoveOnFinish;
        const filePath = particleSystem2DParameter.filePath;
        const spriteFramePaths = particleSystem2DParameter.spriteFramePaths;

        const node = this.createNode(nodeParameter);

        const particleSystem2D = node.addComponent(ParticleSystem2D);

        if (playOnLoad != null) {
            particleSystem2D.playOnLoad = playOnLoad;
        }
        if (autoRemoveOnFinish != null) {
            particleSystem2D.autoRemoveOnFinish = autoRemoveOnFinish;
        }
        if (customMaterialPath != null) {
            const customMaterial = await this.assetRepository.getAsset(customMaterialPath, Material);
            if (!isValid(node, true)) {
                return;
            }
            particleSystem2D.customMaterial = customMaterial;
        }
        if (filePath != null) {
            const particleAsset = await this.assetRepository.getAsset(filePath, ParticleAsset);
            if (!isValid(node, true)) {
                return;
            }
            particleSystem2D.file = particleAsset;
        }
        if (spriteFramePaths != null) {
            const spriteFrames = new Array<SpriteFrame>();
            for (let index = 0; index < spriteFramePaths.length; index++) {
                const spriFramePath = spriteFramePaths[index];
                const spriteFrame = await this.assetRepository.getAsset(spriFramePath, SpriteFrame);
                spriteFrames.push(spriteFrame);
            }
            const spriteFrameCount = spriteFrames.length;
            if (spriteFrameCount === 1) {
                particleSystem2D.spriteFrame = spriteFrames[0];
            } else {
                let i = 0;
                let interval = setInterval(() => {
                    const spriteFrame = spriteFrames[i];
                    particleSystem2D.spriteFrame = spriteFrame;
                    if (i < spriteFrameCount - 1) {
                        i++
                    } else {
                        i = 0;
                    }
                }, 100);
                node.on(Node.EventType.NODE_DESTROYED, () => {
                    spriteFrames.length = 0;
                    clearInterval(interval);
                    interval = null;
                });
            }
        }

        return particleSystem2D;
    }

    private setSpriteFrame(sprite: Sprite, spriteFrame: SpriteFrame): boolean {
        if (isValid(sprite.node, true)) {
            sprite.spriteFrame = spriteFrame;
            return true;
        } else {
            console.log(`[pq_UIFactory] sprite.node is not valid`);
            return false;
        }
    }

    public async setSpriteFrameByPathAsync(target: Sprite, path: string): Promise<boolean> {
        const spriteFrame = await this.assetRepository.getAsset<SpriteFrame>(path, SpriteFrame);
        if (isValid(target.node, true)) {
            try {
                if (target != null) {
                    target.spriteFrame = spriteFrame;
                }
            } catch (error) {
                console.log(`[pq_UIFactory] [setSpriteFrameByPathAsync] ${error}`);
            }
            return new Promise(resolve => resolve(true));
        } else {
            return new Promise(resolve => resolve(false));
        }
    }
}

export interface NodeParameter {
    parent?: Node;
    name?: string;
    position?: Vec3;
    rotation?: Vec3;
    scale?: Vec3;
}

export interface ButtonParameter {
    onClick?: Function;
    transition?: number;
    position?: Vec2;
    contentSize?: Size;
    normalColor?: Color;
    pressedColor?: Color;
    hoverColor?: Color;
    disabledColor?: Color;
    zoomScale?: number;
    duration?: number;
}

export interface SpriteParameter {
    contentSize?: Size;
    color?: Color;
    type?: number;
    sizeMode?: number;
    position?: Vec2;
    anchorPoint?: Vec2;
    spriteFramePath?: string;
    name?: string;
    materialPath?: string;
}

export interface LabelParameter {
    isBold?: boolean;
    color?: Color;
    string?: string;
    fontSize?: number;
    lineHeight?: number;
    horizontalAlign?: HorizontalTextAlignment;
    verticalAlign?: VerticalTextAlignment;
    overflow?: Overflow;
    contentSize?: Size;
    fontPath?: string;
    anchorPoint?: Vec2;
    rotation?: Vec3;
    position?: Vec3;
    spacingX?: number;
}

export interface LabelOutlineParameter {
    color?: Color;
    width?: number;
}

export interface ScrollViewParameter {
    scroViewSize: Size;
    contentHeight: number;
    scrollViewColor?: Color;
    scrollBarColor?: Color;
    barColor?: Color;
    buttonSpriteFramePath?: string;
    scrollViewSpriteFramePath?: string;
    scrollBarSpriteFramePath?: string;
    barSpriteFramePath?: string;
    inertia?: boolean;
    elastic?: boolean;
}

export interface DropdownParameter {
    buttonSize?: Size;
    title?: string;
    items?: Array<string>;
    itemFontSize?: number;
    buttonSpriteFramePath: string;
    scrollViewSpriteFramePath: string;
    scrollBarSpriteFramePath?: string;
    barSpriteFramePath?: string;
    scrollViewColor?: Color;
    scrollBarColor?: Color;
    buttonSpriteColor?: Color;
    labelColor?: Color;
    hideScrollBar?: boolean;
}

export interface ProgressBarParameter {
    mode: number;
    size: Size;
    progressSpriteFramePath: string;
    barSpriteFramePath: string;
    barSpriteType?: number;
}

export interface UITransformParameter {
    contentSize?: Size;
    position?: Vec2;
    anchorPoint?: Vec2;
}

export interface SliderParameter {
    sliderContentSize: Size;
    handleContentSize: Size;
    sliderSpriteFramePath: string;
    handleSpriteFramePath: string;
}

export interface ToggleParameter {
    position: Vec2;
    toggleSpriteFramePath: string;
    checkmarkSpriteFramePath: string;
    contentSize?: Size;
    anchorPoint?: Vec2;
    onToggle?: Function;
    normalColor?: Color;
    checkmarkColor?: Color;
}

export interface DragonBonesArmatureDisplayParameter {
    dragonBonesAtlasAssetPath: string;
    texturePath: string;
    dragonBonesAssetPath: string;
    armatureName: string;
    animationName: string;
}

export interface WidgetParameter {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    horizontalCenter?: number;
    verticalCenter?: number;
    target?: Node;
    alignMode?: number;
}

export interface AnimationClipParameter {
    pathes: Array<string>;
    clipName: string;
    wrapMode: number;
    speed?: number;
}

export interface SpineSkeletonParameter {
    nodeParameter: NodeParameter;
    uiTransformParameter?: UITransformParameter;
    widgetParameter?: WidgetParameter;
    skeletonDataPath: string;
    timeScale?: number;
    color?: Color;
}

export interface RichTextParameter {
    string?: string;
    horizontalAlign?: number;
    fontSize?: number;
    fontPath?: string;
    maxWidth?: number;
    lineHeight?: number;
}

export interface GridLayoutParameter {
    resizeMode?: number;
    cellSize?: Size;
    startAxis?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    spacingX?: number;
    spacingY?: number;
    verticalDirection?: number;
    horizontalDirection?: number;
    affectedByScale?: boolean;
    constraint?: number;
    constraintNum?: number;
}

export interface HorizontalParameter {
    resizeMode?: number;
    paddingLeft?: number;
    paddingRight?: number;
    spacingX?: number;
    horizontalDirection?: number;
}

export interface ParticleSystem2DParameter {
    nodeParameter: NodeParameter;
    customMaterialPath?: string;
    playOnLoad?: boolean;
    autoRemoveOnFinish?: boolean;
    filePath: string;
    spriteFramePaths?: Array<string>;
}