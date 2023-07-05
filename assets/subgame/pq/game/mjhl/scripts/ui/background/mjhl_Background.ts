import { Color, find, isValid, Node, screen, Size, Sprite, tween, Tween, UITransform, view } from "cc";
import mjhl_EventRepository from "../../../../../script/event/pq_EventRepository";
import TweenPlayer from "../animations/TweenPlayer";
import mjhl_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class mjhl_Background {

    private backgroundSprite: Sprite;

    private colorTween: TweenPlayer<Color>;

    public constructor(parent: Node, mjhl_UIFactory: mjhl_UIFactory, mjhl_EventRepository: mjhl_EventRepository) {

        this.createUI(parent, mjhl_UIFactory);

        this.colorTween = new TweenPlayer();

        mjhl_EventRepository.onEnterGameSucceeded.Attach(() => {
            this.destroyGameLoading();
        });
        mjhl_EventRepository.onEnterGameFailed.Attach(() => {
            this.destroyGameLoading();
        });

        mjhl_EventRepository.onEffectSpinStarted.Attach(() => {
            this.addGray();
        });
        mjhl_EventRepository.onCombine.Attach(() => {
            this.addGray();
        });
        mjhl_EventRepository.onSpinFinished.Attach(() => {
            this.resetColor();
        });
        mjhl_EventRepository.onFlip.Attach(() => {
            this.resetColor();
        });
    }

    public destroy() {
        this.colorTween.destroy();
        this.colorTween = null;
        view.setResizeCallback(null);
    }

    private createUI(parent: Node, mjhl_UIFactory: mjhl_UIFactory) {
        const backgroundSprite = mjhl_UIFactory.createSprite({
            parent: parent,
            name: "mjhl_Background",
        }, {
            spriteFramePath: "mjhl/images/mjhl_green_bg/spriteFrame",
            sizeMode: Sprite.SizeMode.RAW,
            type: Sprite.Type.SIMPLE
        }, {
            verticalCenter: 50
        });
        this.backgroundSprite = backgroundSprite;
    }

    private destroyGameLoading() {
        const gameLoading = find("Canvas/mjhl_MainLoop/mjhl_loding_background");
        if (isValid(gameLoading, true)) {
            gameLoading.destroy();
        }
    }

    private addGray() {
        this.colorTween.stopTween();
        const color = new Color(this.backgroundSprite.color);
        this.colorTween.tween = tween(color)
            .to(0.3, {
                r: Color.GRAY.r,
                g: Color.GRAY.g,
                b: Color.GRAY.b
            }, {
                onUpdate: () => {
                    this.backgroundSprite.color = color;
                }
            })
            .start();
    }

    private resetColor() {
        const backgroundSprite = this.backgroundSprite;
        if (backgroundSprite.color !== Color.WHITE) {
            this.colorTween.stopTween();
            const color = new Color(this.backgroundSprite.color);
            this.colorTween.tween = tween(color)
                .to(0.6, {
                    r: Color.WHITE.r,
                    g: Color.WHITE.g,
                    b: Color.WHITE.b
                }, {
                    onUpdate: () => {
                        this.backgroundSprite.color = color;
                    }
                })
                .start();
        }
    }
}
