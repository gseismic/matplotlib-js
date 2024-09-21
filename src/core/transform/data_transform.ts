import { Transform2D } from "./transform.js";

/**
 * 数据变换类 | Data Transformation Class
 * 
 * 用于将数据坐标转换为绘图坐标，或将绘图坐标转换为数据坐标 | 
 * Used to convert data coordinates to plotting coordinates, or plotting coordinates to data coordinates    
 * 
 */ 
class DataTransform2D extends Transform2D {
    private _xScale: number = 1; // x轴缩放比例 | X Axis Scale
    private _yScale: number = 1; // y轴缩放比例 | Y Axis Scale
    private _inv_xScale: number = 1; // x轴缩放比例的倒数 | Inverse of X Axis Scale
    private _inv_yScale: number = 1; // y轴缩放比例的倒数 | Inverse of Y Axis Scale

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    after_set_xlim(xlim: [number, number]): void {
        this._xScale = this.width / (this.xlim[1] - this.xlim[0]);
        this._inv_xScale = 1 / this._xScale;
    }

    after_set_ylim(ylim: [number, number]): void {
        this._yScale = this.height / (this.ylim[1] - this.ylim[0]);
        this._inv_yScale = 1 / this._yScale;
    }

    transform(x: number, y: number): [number, number] {
        const x_p = this.x + this._xScale * (x - this.xlim[0]);
        const y_p = this.y + this.height - this._yScale * (y - this.ylim[0]);   
        return [x_p, y_p];
    }

    transform_x(x: number): number {
        return this.x + this._xScale * (x - this.xlim[0]);
    }

    transform_y(y: number): number {
        return this.y + this.height - this._yScale * (y - this.ylim[0]);
    }

    transform_batch(x: number[], y: number[]): [number[], number[]] {
        let size = x.length;
        let x_p: number[] = [];
        let y_p: number[] = [];
        for (let i = 0; i < size; i++) {
            const [x_p_i, y_p_i] = this.transform(x[i], y[i]);
            x_p.push(x_p_i);
            y_p.push(y_p_i);
        }
        return [x_p, y_p];
    }

    inverse_transform(x_p: number, y_p: number): [number, number] {
        const x = this.xlim[0] + (x_p - this.x) * this._inv_xScale;
        const y = this.ylim[0] + (this.height - (y_p - this.y)) * this._inv_yScale;
        return [x, y];
    }

    inverse_transform_batch(x_p: number[], y_p: number[]): [number[], number[]] {
        let size = x_p.length;
        let x: number[] = [];
        let y: number[] = [];
        for (let i = 0; i < size; i++) {
            const [x_i, y_i] = this.inverse_transform(x_p[i], y_p[i]);
            x.push(x_i);
            y.push(y_i);
        }
        return [x, y];
    }
}

export { DataTransform2D };
