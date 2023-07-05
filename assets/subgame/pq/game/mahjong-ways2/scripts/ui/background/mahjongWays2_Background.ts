/*
import { Color, find, isValid, Node, screen, Size, Sprite, tween, Tween, UITransform, view } from "cc";
import mahjongWays2_EventRepository from "../../../../../script/event/pq_EventRepository";
import TweenPlayer from "../animations/mahjongWays2_TweenPlayer";
import mahjongWays2_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class mahjongWays2_Background {

    private backgroundSprite: Sprite;

    private colorTween: TweenPlayer<Color>;

    public constructor(parent: Node, mahjongWays2_UIFactory: mahjongWays2_UIFactory, mahjongWays2_EventRepository: mahjongWays2_EventRepository) {
        parent = parent.getChildByName("background");
        this.createUI(parent, mahjongWays2_UIFactory);

        this.colorTween = new TweenPlayer();

        mahjongWays2_EventRepository.onEnterGameSucceeded.Attach(() => {
            this.destroyGameLoading();
        });
        mahjongWays2_EventRepository.onEnterGameFailed.Attach(() => {
            this.destroyGameLoading();
        });

        mahjongWays2_EventRepository.onEffectSpinStarted.Attach(() => {
            this.addGray();
        });
        mahjongWays2_EventRepository.onCombine.Attach(() => {
            this.addGray();
        });
        mahjongWays2_EventRepository.onSpinFinished.Attach(() => {
            this.resetColor();
        });
        mahjongWays2_EventRepository.onFlip.Attach(() => {
            this.resetColor();
        });
    }

    public destroy() {
        this.colorTween.destroy();
        this.colorTween = null;
        view.setResizeCallback(null);
    }

    private createUI(parent: Node, mahjongWays2_UIFactory: mahjongWays2_UIFactory) {
        const backgroundSprite = mahjongWays2_UIFactory.createSprite({
            parent: parent,
            name: "mahjongWays2_Background",
        }, {
            spriteFramePath: "mahjong-ways2/mahjongWays2_images/mahjongWays2_ui_reel/spriteFrame",
            sizeMode: Sprite.SizeMode.RAW,
            type: Sprite.Type.SIMPLE
        }, {
            verticalCenter: 50
        });
        this.backgroundSprite = backgroundSprite;
    }

    private destroyGameLoading() {
        const gameLoading = find("Canvas/mahjongWays2_MainLoop/mahjongWays2_loding_background");
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