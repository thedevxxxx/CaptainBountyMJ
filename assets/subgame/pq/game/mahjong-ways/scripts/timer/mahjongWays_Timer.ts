
export default class mahjongWays_Timer {

    public static timeouts: Array<ReturnType<typeof setTimeout>>;

    public constructor() {
        mahjongWays_Timer.timeouts = new Array<ReturnType<typeof setTimeout>>();
    }

    public destroy() {
        mahjongWays_Timer.timeouts.forEach(timeout => {
            clearTimeout(timeout);
        });
        mahjongWays_Timer.timeouts.length = 0;
        mahjongWays_Timer.timeouts = null
    }
}

export function delay(millisecond: number): Promise<void> {
    return new Promise<void>(resolve => {
        const timeout = setTimeout(() => {
            resolve();
            const index = mahjongWays_Timer.timeouts.indexOf(timeout, 0);
            if (index > -1) {
                mahjongWays_Timer.timeouts.splice(index, 1);
            }
        }, millisecond);
        mahjongWays_Timer.timeouts.push(timeout);
    });
}