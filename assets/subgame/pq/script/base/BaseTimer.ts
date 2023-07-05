
export default class BaseTimer {

    static timeouts: Array<ReturnType<typeof setTimeout>>;

    constructor() {
        BaseTimer.timeouts = new Array<ReturnType<typeof setTimeout>>();
    }

    destroy() {
        BaseTimer.timeouts.forEach(timeout => {
            clearTimeout(timeout);
        });
        BaseTimer.timeouts.length = 0;
        BaseTimer.timeouts = null
    }
}

export function delay(millisecond: number): Promise<void> {
    return new Promise<void>(resolve => {
        const timeout = setTimeout(() => {
            resolve();
            const index = BaseTimer.timeouts.indexOf(timeout, 0);
            if (index > -1) {
                BaseTimer.timeouts.splice(index, 1);
            }
        }, millisecond);
        BaseTimer.timeouts.push(timeout);
    });
}