export default class TimeUtils {
    /**
     * 闰年判断
     * @param year 
     * @returns 
     */
    private static isLeapYear(year: number): boolean {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }

    static getDayInMonth(year: number, month: number): number {
        let result = 0;
        switch(month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                result = 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                result = 30;
                break;
            case 2:
                if (TimeUtils.isLeapYear(year)) {
                    result = 29;
                } else {
                    result = 28;
                }
                break;
        }

        return result;
    }
}