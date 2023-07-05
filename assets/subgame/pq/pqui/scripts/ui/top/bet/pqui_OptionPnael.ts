import { Size, Color, Sprite, Vec2, Vec3, UITransform } from "cc";
import { Node } from "cc";
import pqui_DataRepository from "../../../data/pqui_DataRepository";
import { findMultiplierAndMultiplicant } from "../../../math/pqui_Math";
import pqui_ScrollViewOption from "./pqui_ScrollViewOption";
import pqui_UIFactory from "../../../../../script/ui/pq_UIFactory";

export default class pqui_OptionPnael {

    private pqui_DataRepository: pqui_DataRepository;

    private pqui_ScrollViewOptions: Array<pqui_ScrollViewOption>;

    private indexOfBetAmount = 0;

    private indexOfBetMutiple = 1;

    private indexOfBaseBet = 2;

    private indexOfTotalAmount = 3;

    public constructor(parent: Node, pqui_UIFactory: pqui_UIFactory, pqui_DataRepository: pqui_DataRepository) {
        this.pqui_DataRepository = pqui_DataRepository;
        this.createUI(parent, pqui_UIFactory);
        this.moveToByTotalValue(pqui_DataRepository.totalBetAmount);
    }

    public destroy() {
        try {
            this.pqui_ScrollViewOptions.forEach(scrollViewOption => scrollViewOption.destroy());
            this.pqui_ScrollViewOptions.length = 0;
            this.pqui_ScrollViewOptions = null;
        } catch (error) {
            console.log(`[pqui_OptionPnael] ${error}`);
        }
    }

    public scrollToMax() {
        const betAmountOption = this.pqui_ScrollViewOptions[this.indexOfBetAmount];
        const betMultipleOption = this.pqui_ScrollViewOptions[this.indexOfBetMutiple];
        const totalAmountOption = this.pqui_ScrollViewOptions[this.indexOfTotalAmount];

        betAmountOption.moveToByValue(betAmountOption.maxValue);
        betMultipleOption.moveToByValue(betMultipleOption.maxValue);
        totalAmountOption.moveToByValue(totalAmountOption.maxValue);
    }

    public getBetAmount() {
        return this.pqui_ScrollViewOptions[this.indexOfBetAmount].currentValue;
    }

    public getBetMutiple() {
        return this.pqui_ScrollViewOptions[this.indexOfBetMutiple].currentValue;
    }

    public getTotalBetAmount() {
        return this.pqui_ScrollViewOptions[this.indexOfTotalAmount].currentValue;
    }

    private createUI(parent: Node, pqui_UIFactory: pqui_UIFactory) {
        const parentSize = parent.getComponent(UITransform).contentSize;
        const background = pqui_UIFactory.createSprite({
            parent: parent,
            name: ""
        }, {
            contentSize: new Size(parentSize.width, parentSize.height * 0.6),
            color: new Color(40, 40, 51),
            type: Sprite.Type.SIMPLE,
            sizeMode: Sprite.SizeMode.CUSTOM,
            spriteFramePath: "pq/pqui/images/pqui_white/spriteFrame"
        }, {
            top: 120
        });

        const highlightBackground = pqui_UIFactory.createSprite({
            parent: background.node,
            name: ""
        }, {
            contentSize: new Size(parentSize.width * 0.97, parentSize.height * 0.1),
            position: new Vec2(0, -50),
            type: Sprite.Type.SLICED,
            sizeMode: Sprite.SizeMode.CUSTOM,
            color: new Color(48, 48, 61),
            spriteFramePath: "pq/pqui/images/pqui_white_square/spriteFrame",
        });
        const operationLabel = pqui_UIFactory.createLabel({
            parent: highlightBackground.node,
            name: ""
        }, {
            position: new Vec3(-10, 0),
            string: "x             x              =",
            color: new Color(136, 136, 136)
        });

        this.pqui_ScrollViewOptions = new Array<pqui_ScrollViewOption>();
        const optionCount = 4;
        const backgroundSize = background.getComponent(UITransform).contentSize;
        const contentSize = new Size(backgroundSize.width / optionCount, backgroundSize.height);
        const startPotition = new Vec3(((contentSize.width * -1) - (contentSize.width * 0.5)));
        const titles = ["投注大小", "投注倍数", "基础投注", "投注总额"];
        const colors = [Color.WHITE, Color.WHITE, Color.WHITE, new Color(180, 120, 80)];
        const extraButtonLabelContents = [["", "-", "-", ""], ["", "-", "-", ""], ["", "", "", ""], ["", "-", "-", ""]];
        const prefixesOfItemString = ["¥", "", "", "¥"];
        const fractionDigits = [2, 0, 0, 2];
        const betAmounts = this.pqui_DataRepository.betAmounts;
        const betMutiples = this.pqui_DataRepository.betMutiples;
        const baseBets = [20];
        let betTotals = new Array<number>();
        for (let betAmountIndex = 0; betAmountIndex < betAmounts.length; betAmountIndex++) {
            for (let betMutipleIndex = 0; betMutipleIndex < betMutiples.length; betMutipleIndex++) {
                for (let baseBetIndex = 0; baseBetIndex < baseBets.length; baseBetIndex++) {
                    const betAmount = betAmounts[betAmountIndex];
                    const betMutiple = betMutiples[betMutipleIndex];
                    const baseBet = baseBets[baseBetIndex];
                    const betTotal = (betAmount * betMutiple * baseBet).toFixed(2);
                    betTotals.push(+betTotal);
                }
            }
        }
        betTotals = betTotals.filter((value, index, self) => {
            return index === self.indexOf(value);
        });
        betTotals.sort((a, b) => a - b);
        const valuesList = [betAmounts, betMutiples, baseBets, betTotals];
        for (let index = 0; index < titles.length; index++) {
            const scrollViewOption = new pqui_ScrollViewOption(background.node, {
                position: new Vec3((startPotition.x + (contentSize.width * index)), 0),
                contentSize: contentSize,
                title: titles[index],
                labelColor: colors[index],
                values: valuesList[index],
                extraButtonLabelContents: extraButtonLabelContents[index],
                itemStringPrefix: prefixesOfItemString[index],
                fractionDigits: fractionDigits[index],
                onValueChangeByTouchUp: () => this.onScrollViewItemValueChangeByTouchUp(index),
            }, pqui_UIFactory);
            this.pqui_ScrollViewOptions.push(scrollViewOption);
        }
    }

    private onScrollViewItemValueChangeByTouchUp(index: number) {
        const betAmountOption = this.pqui_ScrollViewOptions[this.indexOfBetAmount];
        const betMultipleOption = this.pqui_ScrollViewOptions[this.indexOfBetMutiple];
        const baseBetOption = this.pqui_ScrollViewOptions[this.indexOfBaseBet];
        const totalAmountOption = this.pqui_ScrollViewOptions[this.indexOfTotalAmount];
        if (index === this.indexOfBetAmount || index === this.indexOfBetMutiple) {
            const totalBet = +(betAmountOption.currentValue * betMultipleOption.currentValue * baseBetOption.currentValue).toFixed(2);
            totalAmountOption.moveToByValue(totalBet);
        } else if (index === this.indexOfTotalAmount) {
            const totalAmountOption = this.pqui_ScrollViewOptions[this.indexOfTotalAmount];
            const totalBet = totalAmountOption.currentValue;
            this.moveToByTotalValue(totalBet);
        } else {
            console.log(`[pqui_OptionPnael] baseBet`);
        }
    }

    private moveToByTotalValue(totalBet: number) {
        const betAmountOption = this.pqui_ScrollViewOptions[this.indexOfBetAmount];
        const betMultipleOption = this.pqui_ScrollViewOptions[this.indexOfBetMutiple];
        const totalAmountOption = this.pqui_ScrollViewOptions[this.indexOfTotalAmount];
        const product = +((totalBet / 20).toFixed(2));
        const formula = findMultiplierAndMultiplicant(this.pqui_DataRepository.betAmounts, this.pqui_DataRepository.betMutiples, product);
        betAmountOption.moveToByValue(formula.multiplier);
        betMultipleOption.moveToByValue(formula.multiplicant);
        totalAmountOption.moveToByValue(totalBet);
    }

    //private moveToDefaultValue(betAmount: number, betMultiple: number) {
    //    const betAmountOption = this.pqui_ScrollViewOptions[this.indexOfBetAmount];
    //    const betMultipleOption = this.pqui_ScrollViewOptions[this.indexOfBetMutiple];
    //    const baseBetOption = this.pqui_ScrollViewOptions[this.indexOfBaseBet];
    //    const totalAmountOption = this.pqui_ScrollViewOptions[this.indexOfTotalAmount];
    //    betAmountOption.moveToByValue(betAmount);
    //    betMultipleOption.moveToByValue(betMultiple);
    //    const totalBet = +(betAmount * betMultiple * baseBetOption.currentValue).toFixed(2);
    //    totalAmountOption.moveToByValue(totalBet);
    //}
}