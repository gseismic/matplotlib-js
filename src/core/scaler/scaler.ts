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
            return Math.ceil(-Math.log10(absStep));
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