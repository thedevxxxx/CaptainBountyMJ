
export default class mjhl_Timer {

    public static timeouts: Array<ReturnType<typeof setTimeout>>;

    public constructor() {
        mjhl_Timer.timeouts = new Array<ReturnType<typeof setTimeout>>();
    }

    public destroy() {
        mjhl_Timer.timeouts.forEach(timeout => {
            clearTimeout(timeout);
        });
        mjhl_Timer.timeouts.length = 0;
        mjhl_Timer.timeouts = null
    }
}

export function delay(millisecond: number): Promise<void> {
    return new Promise<void>(resolve => {
        const timeout = setTimeout(() => {
            resolve();
            const index = mjhl_Timer.timeouts.indexOf(timeout, 0);
            if (index > -1) {
                mjhl_Timer.timeouts.splice(index, 1);
            }
        }, millisecond);
        mjhl_Timer.timeouts.push(timeout);
    });
}