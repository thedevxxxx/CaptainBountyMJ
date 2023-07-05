
export function findMultiplierAndMultiplicant(multipliers: Array<number>, multiplicant: Array<number>, product: number): { multiplier: number, multiplicant: number } {
    let betAmount = null;
    let betMultiple = null;
    for (let betAmountIndex = 0; betAmountIndex < multipliers.length; betAmountIndex++) {
        betAmount = multipliers[betAmountIndex];
        for (let betMutipleIndex = 0; betMutipleIndex < multiplicant.length; betMutipleIndex++) {
            betMultiple = multiplicant[betMutipleIndex];
            const tempResult = +((betAmount * betMultiple).toFixed(2));
            if (tempResult === product) {
                break;
            } else {
                betMultiple = null;
            }
        }
        if (betMultiple != null) {
            break;
        }
    }
    return { multiplier: betAmount, multiplicant: betMultiple }
}