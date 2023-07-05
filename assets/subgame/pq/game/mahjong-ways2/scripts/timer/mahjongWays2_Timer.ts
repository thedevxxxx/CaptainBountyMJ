
export default class mahjongWays2_Timer {

    public static timeouts: Array<ReturnType<typeof setTimeout>>;

    public constructor() {
        mahjongWays2_Timer.timeouts = new Array<ReturnType<typeof setTimeout>>();
    }

    public destroy() {
        mahjongWays2_Timer.timeouts.forEach(timeout => {
            clearTimeout(timeout);
        });
        mahjongWays2_Timer.timeouts.length = 0;
        mahjongWays2_Timer.timeouts = null
    }
}

export function delay(millisecond: number): Promise<void> {
    return new Promise<void>(resolve => {
        const timeout = setTimeout(() => {
            resolve();
            const index = mahjongWays2_Timer.timeouts.indexOf(timeout, 0);
            if (index > -1) {
                mahjongWays2_Timer.timeouts.splice(index, 1);
            }
        }, millisecond);
        mahjongWays2_Timer.timeouts.push(timeout);
    });
}