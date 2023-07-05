
export function formatGold(number: number): string {
    if (number == null) {
        return "null";
    }
    let string = number.toFixed(6);
    if (string.includes(".")) {
        return string.substring(0, string.indexOf(".") + 3);
    } else {
        return string;
    }
}