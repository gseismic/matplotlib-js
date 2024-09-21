abstract class Scaler {
    protected vmin: number;
    protected vmax: number;

    constructor(vmin: number, vmax: number) {
        this.vmin = vmin;
        this.vmax = vmax;
    }

    abstract scale(numMajorTicks: number, numMinorTicks: number): {
        majorTicks: number[],
        minorTicks: number[],
        newNumMajorTicks: number,
        newNumMinorTicks: number
    };

    protected log10(x: number): number {
        return Math.log(x) / Math.LN10;
    }
}

class LinearScaler extends Scaler {
    scale(numMajorTicks: number, numMinorTicks: number) {
        const range = this.vmax - this.vmin;
        const idealStep = range / (numMajorTicks - 1);

        // Find the best step size that is a multiple of 1, 2, or 5
        const magnitude = Math.pow(10, Math.floor(this.log10(idealStep)));
        let step: number;
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

        return {
            majorTicks,
            minorTicks,
            newNumMajorTicks,
            newNumMinorTicks: minorTicks.length
        };
    }
}

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

        return {
            majorTicks,
            minorTicks,
            newNumMajorTicks: majorTicks.length,
            newNumMinorTicks: minorTicks.length
        };
    }
}

// 使用示例
const linearScaler = new LinearScaler(0, 100);
console.log(linearScaler.scale(5, 20));

const logScaler = new LogScaler(1, 1000);
console.log(logScaler.scale(4, 40));