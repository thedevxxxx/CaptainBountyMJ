import { Button, Sprite, Vec2, Color, Node } from "cc";
import pq_EventRepository from "../../event/pq_EventRepository";
import pq_UIFactory from "../pq_UIFactory";

export default class pq_Loading {

    private loading: Node;

    private timeout: ReturnType<typeof setTimeout>;

    private button: Button;

    public constructor(pq_LoadingParameter: pq_LoadingParameter) {
        this.createUI(pq_LoadingParameter);

        pq_LoadingParameter.pq_EventRepository.onLoginSucceeded.Attach(() => this.hideLoading());
    }

    public showLoading() {
        if (this.loading == null) {
            console.log(`[pq_Loading] no excute showLoading when loading's node is null.`);
            return;
        }
        const previousActive = this.loading.active;
        this.loading.active = true;

        if (previousActive === this.loading.active) {
            console.log(`[pq_Loading] loading already active.`);
            return;
        }
        this.startTimout();
    }

    public hideLoading() {
        this.loading.active = false;
    }

    public setScale(isProtrait: boolean) {
        //if (isProtrait) {
        //    this.loading.scale = 0.56;
        //} else {
        //    this.loading.scale = 1;
        //}
    }

    public destroy() {
        this.clearTimeout();
    }

    private async createUI(pq_LoadingParameter: pq_LoadingParameter) {
        const pq_UIFactory = pq_LoadingParameter.pq_UIFactory;
        const parent = pq_LoadingParameter.parent;
        const pq_EventRepository = pq_LoadingParameter.pq_EventRepository;

        const background = pq_UIFactory.createSprite({
            parent: parent,
            name: ""
        }, {
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/bigImage/pq_bg/spriteFrame"
        }, {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        });
        this.loading = background.node;

        const button = pq_UIFactory.createButton({
            parent: background.node,
            name: ""
        }, {
            transition: Button.Transition.NONE,
            onClick: () => pq_EventRepository.onExitLoadingButtonClick.Notify()
        }, {
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.RAW,
            spriteFramePath: "pq/images/pq_btn_exit/spriteFrame"
        }, null, {
            left: 0,
            top: 19
        });
        this.button = button;

        const logo = pq_UIFactory.createSprite({
            parent: background.node,
            name: ""
        }, {
            position: new Vec2(-15, 50),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.RAW,
            spriteFramePath: "pq/images/pq_loading_dec/spriteFrame"
        });

        const spineSkeleton = await pq_UIFactory.createSpineSkeletonAsync({
            nodeParameter: {
                parent: background.node
            },
            skeletonDataPath: "pq/animations/pq_loading/pq_loading",
        });
        spineSkeleton.node.setPosition(0, -260);
        spineSkeleton.setAnimation(0, "animation", true);
    }

    private startTimout() {
        const button = this.button;
        const buttonSprite = button.getComponent(Sprite);
        buttonSprite.color = Color.GRAY;
        button.interactable = false;
        this.clearTimeout();
        this.timeout = setTimeout(() => {
            if (button == null) {
                this.clearTimeout();
                console.error(`[pq_Loading] clearTimeout when button is null.`);
                return;
            }
            buttonSprite.color = Color.WHITE;
            button.interactable = true;
        }, 1000);
    }

    private clearTimeout() {
        if (this.timeout != null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
}

interface pq_LoadingParameter {
    parent: Node;
    pq_UIFactory: pq_UIFactory;
    pq_EventRepository: pq_EventRepository
}