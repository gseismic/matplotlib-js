import { Scaler } from './scaler.js';

class LogScaler extends Scaler {

    scale(numMajorTicks: number, numMinorTicks: number) {
        const logMin = this.log10(this.vmin);
        const logMax = this.log10(this.vmax);
        const logRange = logMax - logMin;

        // Calculate major ticks
        const majorStep = Math.ceil(logRange / (numMajorTicks - 1));
        const startExp = Math.floor(logMin);
        const endExp = Math.ceil(logMax);

        const majorTicks: number[] = [];
        for (let exp = startExp; exp <= endExp; exp += majorStep) {
            majorTicks.push(Math.pow(10, exp));
        }

        // Calculate minor ticks
        const minorTicks: number[] = [];
        for (let i = 0; i < majorTicks.length - 1; i++) {
            const start = majorTicks[i];
            const end = majorTicks[i + 1];
            for (let j = 2; j <= 9; j++) {
                const minorTick = start * j;
                if (minorTick < end) {
                    minorTicks.push(minorTick);
                }
            }
        }

        // 对于对数刻度，我们可以使用固定的精度，或根据最小刻度值来计算
        const precision = this.calculatePrecision(Math.min(...majorTicks));

        return {
            majorTicks,
            minorTicks,
            newNumMajorTicks: majorTicks.length,
            newNumMinorTicks: minorTicks.length,
            precision
        };
    }
}

export { LogScaler };
