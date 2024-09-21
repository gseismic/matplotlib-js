import { DataTransform2D } from "./data_transform.js";


// 轴变换类 | Axes Transformation Class
class AxesTransform2D extends DataTransform2D {

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    // 真实数据转为比例数据 | Convert Real Data to Scaled Data
    data_to_axes(x: number, y: number): [number, number] {
        const x_axes = (x - this.xlim[0]) / (this.xlim[1] - this.xlim[0])
        const y_axes = (y - this.ylim[0]) / (this.ylim[1] - this.ylim[0])
        return [x_axes, y_axes];
    }

    // 真实数据转为比例数据 | Convert Real Data to Scaled Data  
    data_to_axes_batch(x: number[], y: number[]): [number[], number[]] {
        let size = x.length;
        let x_axes: number[] = [];
        let y_axes: number[] = [];
        for (let i = 0; i < size; i++) {
            const [x_axes_i, y_axes_i] = this.data_to_axes(x[i], y[i]);
            x_axes.push(x_axes_i);
            y_axes.push(y_axes_i);
        }
        return [x_axes, y_axes];
    }

    // 比例数据转为真实数据 | Convert Scaled Data to Real Data
    axes_to_data(x_axes: number, y_axes: number): [number, number] {
        const x = this.xlim[0] + x_axes * (this.xlim[1] - this.xlim[0])
        const y = this.ylim[0] + y_axes * (this.ylim[1] - this.ylim[0])
        return [x, y];
    }

    // 比例数据转为真实数据 | Convert Scaled Data to Real Data
    axes_to_data_batch(x_axes: number[], y_axes: number[]): [number[], number[]] {
        let size = x_axes.length;
        let x: number[] = [];
        let y: number[] = [];
        for (let i = 0; i < size; i++) {
            const [x_i, y_i] = this.axes_to_data(x_axes[i], y_axes[i]);
            x.push(x_i);
            y.push(y_i);
        }
        return [x, y];
    }   

    // 将比例坐标转换为绘图坐标 | Convert Scaled Coordinates to Plotting Coordinates
    transform(x_axes: number, y_axes: number): [number, number] {
        const [x, y] = this.axes_to_data(x_axes, y_axes);
        return super.transform(x, y);
    }

    // 【batch】将比例坐标转换为绘图坐标 | Convert Scaled Coordinates to Plotting Coordinates
    transform_batch(x_axes: number[], y_axes: number[]): [number[], number[]] {
        const [x, y] = this.axes_to_data_batch(x_axes, y_axes);
        return super.transform_batch(x, y);
    }

    // 将绘图坐标转换为比例坐标 | Convert Plotting Coordinates to Scaled Coordinates
    inverse_transform(x_p: number, y_p: number): [number, number] {
        const [x, y] = super.inverse_transform(x_p, y_p);
        return this.data_to_axes(x, y);
    }

    // 【batch】将绘图坐标转换为比例坐标 | Convert Plotting Coordinates to Scaled Coordinates
    inverse_transform_batch(x_p: number[], y_p: number[]): [number[], number[]] {
        const [x, y] = super.inverse_transform_batch(x_p, y_p);
        return this.data_to_axes_batch(x, y);
    }
}

export { AxesTransform2D };
