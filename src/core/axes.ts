import { Scene, SceneOptions } from './scene.js';
import { Renderer2D } from './renderer/renderer2d.js';
import { Legend, LegendOptions } from './legend.js';
import {Axis } from './axis.js'
import { ScaleType } from './types/scale_type.js';

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
        this.options = { ...this.options, ...options };
        this._spines = {
            top: new Axis({location: 'top'}),
            bottom: new Axis({location: 'bottom'}),
            left: new Axis({location: 'left'}),
            right: new Axis({location: 'right'})
        };
    }

    get spines() {
        return this._spines;
    }

    set_xscale(value: ScaleType) {
        this.spines.bottom.set_scaler(value);
        this.spines.top.set_scaler(value);
    }

    set_yscale(value: ScaleType) {
        this.spines.left.set_scaler(value);
        this.spines.right.set_scaler(value);
    }

    set_xlabel(label: string) {
        this.spines.bottom.set_label(label);
        this.spines.top.set_label(label);
    }

    set_ylabel(label: string) {
        this.spines.left.set_label(label);
        this.spines.right.set_label(label);
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
}

export { Axes };
