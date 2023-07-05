import { Node, Vec3 } from "cc";
import AnimationPlayer from "../animations/AnimationPlayer";
import mjhl_Multiple from "./mjhl_Multiple";
import mjhl_EventRepository from "../../../../../script/event/pq_EventRepository";
import mjhl_UIFactory from "../../../../../script/ui/pq_UIFactory";
import { log } from "cc";
import { sp } from "cc";

export default class mjhl_Multipler {

    private mjhl_EventRepository: mjhl_EventRepository;

    private mjhl_Multiples: Array<mjhl_Multiple>;

    private particleAnimationPlayer: AnimationPlayer;

    private currentMultiple: number;

    public constructor() {

    }

    public async init(mutipleParameter: MutipleParameter) {
        const parent = mutipleParameter.parent;
        const mjhl_UIFactory = mutipleParameter.mjhl_UIFactory;
        const mjhl_EventRepository = mutipleParameter.mjhl_EventRepository;

        this.mjhl_EventRepository = mjhl_EventRepository;
        this.mjhl_Multiples = new Array<mjhl_Multiple>();

        const multipleCount = 4;
        for (let index = 0; index < multipleCount; index++) {
            const multiple = new mjhl_Multiple(parent, index, mjhl_UIFactory);
            this.mjhl_Multiples.push(multiple);
        }

        log('win_vfx_a_1x1 load')
        const combinationSkeletonNode = hqq.addNode(parent,{
            Res:hqq['pq'],
            skeleton:"game/mjhl/animations/spines/win_vfx_a_1x1/",
            name:"combinationSkeleton",
            timeScale: 2,scale:2
        }); 
        this.particleAnimationPlayer = new AnimationPlayer(combinationSkeletonNode.getComponent(sp.Skeleton));

        mjhl_EventRepository.onMultiple.Attach(this.onMultiple);
        mjhl_EventRepository.onStartFreeGameButtonClicked.Attach(this.onStartFreeGameButtonClicked);

        return this;
    }

    public destroy() {
        try {
            this.mjhl_Multiples?.forEach(multiple => multiple?.destroy());
            this.mjhl_Multiples.length = 0;
            this.mjhl_Multiples = null;
            this.mjhl_EventRepository.onMultiple.Detach(this.onMultiple);
            this.mjhl_EventRepository.onFreeGame.Detach(this.onStartFreeGameButtonClicked);
        } catch (error) {
            console.log(`[mjhl_Multipler] ${error}`);
        }
    }

    private onMultiple = async (mutilpleParameter: MutilpleAttribute) => {
        const isFreeGame = mutilpleParameter.isFreeGame;
        const multiple = mutilpleParameter.multiple;
        if (multiple == null) {//??
            return;
        }
        let multiples = new Array<number>();
        if (isFreeGame) {
            multiples = [2, 4, 6, 10];
            await this.setFreeGameMultiples();
        } else {
            multiples = [1, 2, 3, 5];
            await this.setBaseGameMultiples();
        }
        const index = multiples.indexOf(multiple);
        if (index !== -1) {
            const mjhl_Multiple = this.mjhl_Multiples[index];
            const shuldPlayEffect = (this.currentMultiple !== multiple && this.currentMultiple != null);
            if (shuldPlayEffect) {
                this.playEffect(mjhl_Multiple.textSprite.node);
            }
            this.currentMultiple = multiple;
            await mjhl_Multiple.setCurrentMultipleTextSpriteSpritFrame(multiple.toString());
        } else {
            console.error(multiples, mutilpleParameter.multiple);
        }
    }

    private onStartFreeGameButtonClicked = async () => {
        const mutipleByIndex = ["2", "4", "6", "10"];
        for (let index = 0; index < mutipleByIndex.length; index++) {
            const mutiple = this.mjhl_Multiples[index];
            await mutiple.setCurrentMultipleTextSpriteSpritFrame(mutipleByIndex[index]);
            await this.playEffect(mutiple.textSprite.node);
            if (index > 0) {
                await mutiple.setFreeGameTextSpriteSpritFrame(mutipleByIndex[index]);
            }
        }
        // this.onMultiple({ multiple: 2, isFreeGame: true });
    }

    private async setFreeGameMultiples() {
        const mutipleByIndex = ["2", "4", "6", "10"];
        for (let index = 0; index < mutipleByIndex.length; index++) {
            await this.mjhl_Multiples[index].setFreeGameTextSpriteSpritFrame(mutipleByIndex[index]);
        }
    }

    private async setBaseGameMultiples() {
        const mutipleByIndex = ["1", "2", "3", "5"];
        for (let index = 0; index < mutipleByIndex.length; index++) {
            await this.mjhl_Multiples[index].setBaseGameTextSpriteSpritFrame(mutipleByIndex[index]);
        }
    }

    private async playEffect(parent: Node) {
        const particleAnimationPlayer = this.particleAnimationPlayer;
        particleAnimationPlayer.setParent(parent);
        await particleAnimationPlayer.playAnimationOnce("animation");
    }
}

export interface MutilpleAttribute {

    multiple: number;

    isFreeGame: boolean;

    isMute: boolean;
}

interface MutipleParameter {

    parent: Node;

    mjhl_UIFactory: mjhl_UIFactory;

    mjhl_EventRepository: mjhl_EventRepository;
}
