import { Scaler } from './scaler.js';

class LinearScaler extends Scaler {
    scale(numMajorTicks: number, numMinorTicks: number) {
        const range = this.vmax - this.vmin;
        const idealStep = range / (numMajorTicks - 1);

        // Find the best step size that is a multiple of 1, 2, or 5
        const magnitude = Math.pow(10, Math.floor(this.log10(idealStep)));
        let step: number = 0.001;
        for (const stepSize of [0.1, 0.2, 0.5, 1, 2, 5, 10]) {
            if (stepSize * magnitude >= idealStep) {
                step = stepSize * magnitude;
                break;
            }
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
