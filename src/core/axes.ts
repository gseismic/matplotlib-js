import { Scene, SceneOptions } from './scene.js';
import { Renderer2D } from './renderer/renderer2d.js';
import { Legend, LegendOptions } from './legend.js';
import {Axis } from './axis.js'
import { ScaleType } from './types/scale_type.js';
import { Line2D, Line2DOptions, Line2DData } from '../artists/line2d.js';
import { Point2D, Point2DData, Point2DOptions } from '../artists/point2d.js';


// 管理直角坐标系数据的Scene | Scene for managing coordinate data
class Axes extends Scene {
    protected options: SceneOptions = {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            zorder: 0,
            visible: true,
            xlim: [0, 1],
            ylim: [0, 1],
            // extra
            xlabel: '',
            ylabel: '',
            title: '',
            xscale: 'linear',
            yscale: 'linear',
            grid_visible: false,
    };
    // protected xlabel: string = '';
    // protected ylabel: string = '';
    // protected title: string = ''; 
    // protected xscale: ScaleType = 'linear';
    // protected yscale: ScaleType = 'linear';
    // protected grid_visible: boolean = false;

    protected _spines: { [key: string]: Axis };
    protected _legend: Legend | null = null;

    constructor(options: Partial<SceneOptions> = {}) {
        super(options);
        // console.log('Axes options: ', this.options);
        // console.log('options: ', options);
        this.options = { ...this.options, ...options };
        // console.log('Axes options after: ', this.options);
        this._spines = {
            top: new Axis({x: this.options.x, y: this.options.y, length: this.options.width, location: 'top', min: this.options.xlim[0], max: this.options.xlim[1]}),
            bottom: new Axis({x: this.options.x, y: this.options.y + this.options.height, length: this.options.width, location: 'bottom', min: this.options.xlim[0], max: this.options.xlim[1]}),
            left: new Axis({x: this.options.x, y: this.options.y, length: this.options.height, location: 'left', min: this.options.ylim[0], max: this.options.ylim[1]}),
            right: new Axis({x: this.options.x + this.options.width, y: this.options.y, length: this.options.height, location: 'right', min: this.options.ylim[0], max: this.options.ylim[1]})
        };
        this.add(this._spines.top);
        this.add(this._spines.bottom);
        this.add(this._spines.left);
        this.add(this._spines.right);
    }

    get spines() {
        return this._spines;
    }

    set_xscale(value: ScaleType) {
        this.options.xscale = value;
        this.spines.bottom.set_scaler(value);
        this.spines.top.set_scaler(value);
    }

    set_yscale(value: ScaleType) {
        this.options.yscale = value;
        this.spines.left.set_scaler(value);
        this.spines.right.set_scaler(value);
    }

    set_xlabel(label: string) {
        this.options.xlabel = label;
        this.spines.bottom.set_label(label);
        this.spines.top.set_label(label);
    }

    set_ylabel(label: string) {
        this.options.ylabel = label;
        this.spines.left.set_label(label);
        this.spines.right.set_label(label);
    }

    set_xlim(min: number, max: number) {
        super.set_xlim(min, max);
        this.spines.bottom.set_lim(min, max);
        this.spines.top.set_lim(min, max);
    }

    set_ylim(min: number, max: number) {
        super.set_ylim(min, max);
        this.spines.left.set_lim(min, max);
        this.spines.right.set_lim(min, max);
    }

    set_title(title: string) {
        this.options.title = title;
    }

    // legend(handles: any[], labels: string[], options: Partial<LegendOptions> = {}): Legend {
    //     // TODO: 直接传位置参数
    //     this._legend = new Legend(this.canvas, options);
    //     handles.forEach((handle, index) => {
    //         // 假设handle有一个get_color方法来获取其颜色
    //         this._legend?.add_item(labels[index], handle.get_color());
    //     });
    //     if (this._legend) {
    //         this.add(this._legend);
    //     }
    //     return this._legend;
    // }

    set_xticks(ticks: number[]) {
        // 具体实现
    }

    set_yticks(ticks: number[]) {
        // 具体实现
    }

    set_xticklabels(labels: string[]) {
        // 具体实现
    }

    set_yticklabels(labels: string[]) {
        // 具体实现
    }

    set_aspect(aspect: number) {
        // 具体实现
    }

    grid(visible: boolean) {
        this.options.grid_visible = visible;
    }

    axhline(y: number, options: any = {}) {
        // 在 y 位置绘制水平线的具体实现
    }

    axvline(x: number, options: any = {}) {
        // 在 x 位置绘制垂直线的具体实现
    }

    axhspan(ymin: number, ymax: number, options: any = {}) {
        // 在 y 轴范围内绘制水平阴影区域的具体实现
    }

    axvspan(xmin: number, xmax: number, options: any = {}) {
        // 在 x 轴范围内绘制垂直阴影区域的具体实现
    }

    text(x: number, y: number, s: string) {
        // 在指定位置添加文本的具体实现
    }

    annotate(s: string, xy: { x: number, y: number }) {
        // 在特定数据点位置添加注释的具体实现
    }

    add_patch(patch: any) {
        // 向图形中添加形状（如矩形、圆形等）的具体实现
    }

    plot(x: number[], y: number[], options: Partial<Line2DOptions> = {}) {
        // 绘制折线图的具体实现
        const data = new Line2DData(x, y);
        const line = new Line2D(data, options);
        this.add(line);
        return line;
    }

    scatter(x: number[], y: number[], options: Partial<Point2DOptions> = {}) {
        // 绘制散点图的具体实现
        const data = new Point2DData(x, y);
        const point = new Point2D(data, options);
        this.add(point);
        return point;
    }


}

export { Axes };
