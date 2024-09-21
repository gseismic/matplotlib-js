import { Scaler } from './scaler.js';

class LinearScaler extends Scaler {
    scale(numMajorTicks: number, numMinorTicks: number) {
        const range = this.vmax - this.vmin;
        const idealStep = range / (numMajorTicks - 1);

        // 使用更简单的方法计算步长
        const exponent = Math.floor(this.log10(idealStep));
        const fraction = idealStep / Math.pow(10, exponent);
        let step: number;

        if (fraction < 1.5) {
            step = Math.pow(10, exponent);
        } else if (fraction < 3) {
            step = 2 * Math.pow(10, exponent);
        } else if (fraction < 7.5) {
            step = 5 * Math.pow(10, exponent);
        } else {
            step = 10 * Math.pow(10, exponent);
        }

        // Calculate new number of major ticks
        const start = Math.ceil(this.vmin / step) * step;
        const end = Math.floor(this.vmax / step) * step;
        const newNumMajorTicks = Math.floor((end - start) / step) + 1;

        // Calculate major tick positions
        const majorTicks: number[] = [];
        for (let i = 0; i < newNumMajorTicks; i++) {
            majorTicks.push(start + i * step);
        }

        // Calculate minor tick positions
        const minorStep = step / 5;
        const minorTicks: number[] = [];
        for (let i = 0; i < majorTicks.length - 1; i++) {
            for (let j = 1; j < 5; j++) {
                minorTicks.push(majorTicks[i] + j * minorStep);
            }
        }
        const precision = this.calculatePrecision(step);

        return {
            majorTicks,
            minorTicks,
            newNumMajorTicks,
            newNumMinorTicks: minorTicks.length,
            precision   
        };
    }
}

export { LinearScaler };
