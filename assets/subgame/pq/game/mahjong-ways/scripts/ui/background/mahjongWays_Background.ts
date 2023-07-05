/*
import { Color, find, isValid, Node, screen, Size, Sprite, tween, Tween, UITransform, view } from "cc";
import mahjongWays_EventRepository from "../../../../../script/event/pq_EventRepository";
import TweenPlayer from "../animations/mahjongWays_TweenPlayer";
import mahjongWays_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class mahjongWays_Background {

    private backgroundSprite: Sprite;

    private colorTween: TweenPlayer<Color>;

    public constructor(parent: Node, mahjongWays_UIFactory: mahjongWays_UIFactory, mahjongWays_EventRepository: mahjongWays_EventRepository) {
        parent = parent.getChildByName("background");
        this.createUI(parent, mahjongWays_UIFactory);

        this.colorTween = new TweenPlayer();

        mahjongWays_EventRepository.onEnterGameSucceeded.Attach(() => {
            this.destroyGameLoading();
        });
        mahjongWays_EventRepository.onEnterGameFailed.Attach(() => {
            this.destroyGameLoading();
        });

        mahjongWays_EventRepository.onEffectSpinStarted.Attach(() => {
            this.addGray();
        });
        mahjongWays_EventRepository.onCombine.Attach(() => {
            this.addGray();
        });
        mahjongWays_EventRepository.onSpinFinished.Attach(() => {
            this.resetColor();
        });
        mahjongWays_EventRepository.onFlip.Attach(() => {
            this.resetColor();
        });
    }

    public destroy() {
        this.colorTween.destroy();
        this.colorTween = null;
        view.setResizeCallback(null);
    }

    private createUI(parent: Node, mahjongWays_UIFactory: mahjongWays_UIFactory) {
        const backgroundSprite = mahjongWays_UIFactory.createSprite({
            parent: parent,
            name: "mahjongWays_Background",
        }, {
            spriteFramePath: "mahjong-ways/mahjongWays_images/mahjongWays_ui_reel/spriteFrame",
            sizeMode: Sprite.SizeMode.RAW,
            type: Sprite.Type.SIMPLE
        }, {
            verticalCenter: 50
        });
        this.backgroundSprite = backgroundSprite;
    }

    private destroyGameLoading() {
        const gameLoading = find("Canvas/mahjongWays_MainLoop/mahjongWays_loding_background");
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
*/