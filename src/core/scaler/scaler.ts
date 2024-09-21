abstract class Scaler {
    protected vmin: number;
    protected vmax: number;

    constructor(vmin: number, vmax: number) {
        this.vmin = vmin;
        this.vmax = vmax;
    }

    protected calculatePrecision(step: number): number {
        const absStep = Math.abs(step);
        if (absStep >= 1) {
            return 0;
        } else {
            // 计算小数点后有几位
            // 10的-3次方是0.001，10的-2次方是0.01，10的-1次方是0.1，10的0次方是1，10的1次方是10，10的2次方是100，10的3次方是1000
            return Math.ceil(-this.log10(absStep));
        }
    }

    abstract scale(numMajorTicks: number, numMinorTicks: number): {
        majorTicks: number[],
        minorTicks: number[],
        newNumMajorTicks: number,
        newNumMinorTicks: number,
        precision: number
    };

    protected log10(x: number): number {
        return Math.log(x) / Math.LN10;
    }
}

export { Scaler };