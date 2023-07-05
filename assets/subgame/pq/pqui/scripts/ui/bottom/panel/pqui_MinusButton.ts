import { Button, Color, Node, Size, Sprite } from "cc";
import pqui_DataRepository from "../../../data/pqui_DataRepository";
import { findMultiplierAndMultiplicant } from "../../../math/pqui_Math";
import pqui_EventRepository from "../../../../../script/event/pq_EventRepository";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class pqui_MinusButton {

    private pqui_DataRepository: pqui_DataRepository;

    private pqui_EventRepository: pqui_EventRepository;

    private button: Button;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_DataRepository: pqui_DataRepository, pqui_EventRepository: pqui_EventRepository) {
        this.pqui_DataRepository = pqui_DataRepository;
        this.pqui_EventRepository = pqui_EventRepository;

        const button = pqui_UIFactory.createButton({
            parent: parent,
            name: ""
        }, {
            transition: Button.Transition.COLOR,
            normalColor: new Color(180, 120, 80),
            hoverColor: new Color(180, 120, 80),
            pressedColor: new Color(127, 82, 52),
            disabledColor: new Color(180, 120, 80),
            onClick: () => this.onMinusButtonClicked()
        }, {
            contentSize: new Size(80, 80),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_btn_minus/spriteFrame",
        }, null, {
            left: 164.4,
            top: 22.5
        });
        this.button = button;

        this.pqui_EventRepository.onTotalBetAmountChangedUI.Attach((totalBet) => {
            const totalBets = this.pqui_DataRepository.totalBets;
            if (totalBet === totalBets[0]) {
                button.normalColor = new Color(127, 82, 52);
                button.hoverColor = new Color(127, 82, 52);
            } else {
                button.normalColor = new Color(180, 120, 80);
                button.hoverColor = new Color(180, 120, 80);
            }
        });

        pqui_EventRepository.onlockButtonsUI.Attach(() => {
            this.lock();
        });

        pqui_EventRepository.onUnlockButtonsUI.Attach(() => {
            this.unlock();
        });
    }

    public destroy() {

    }

    private onMinusButtonClicked() {
        const totalBets = this.pqui_DataRepository.totalBets;
        const currentTotalBet = this.pqui_DataRepository.totalBetAmount;
        let index = totalBets.indexOf(currentTotalBet) - 1;
        if (currentTotalBet === totalBets[0]) {
            index = 0;
            this.pqui_EventRepository.onBlackToastUI.Notify({ content: "最小投注" });
        } else {
            index = totalBets.indexOf(currentTotalBet) - 1;
        }

        const totalBet = totalBets[index]
        const product = +((totalBet / 20).toFixed(2));
        const formula = findMultiplierAndMultiplicant(this.pqui_DataRepository.betAmounts, this.pqui_DataRepository.betMutiples, product);
        this.pqui_EventRepository.onBetAmountChangedUI.Notify(formula.multiplier);
        this.pqui_EventRepository.onBetMutipleChangedUI.Notify(formula.multiplicant);
        this.pqui_EventRepository.onTotalBetAmountChangedUI.Notify(totalBet);
    }

    private lock() {
        this.button.interactable = false;
    }

    private unlock() {
        this.button.interactable = true;
    }
}