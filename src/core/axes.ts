import { Scene } from './scene.js';
import { Renderer2D } from './renderer/renderer2d.js';
import { Spine } from './spines.js';
import { Legend, LegendOptions } from './legend.js';
import {Axis } from './axis.js'

interface AxesOptions {
    xlim: [number, number];
    ylim: [number, number];
    xlabel: string;
    ylabel: string;
    title: string;
    grid_visible: boolean;
}

enum AxesScale {
    LINEAR = 'linear',
    LOG = 'log',
    SQUARE_ROOT = 'sqrt',
    CUBE_ROOT = 'cbrt',
    LOGIT = 'logit',
    PROBIT = 'probit',
    INVERSE = 'inverse',
}

// 管理直角坐标系数据的Scene | Scene for managing coordinate data
class Axes extends Scene {
    // protected figure: Figure | null = null;
    protected xlabel: string = '';
    protected ylabel: string = '';
    protected title: string = ''; 
    protected xscale: AxesScale = AxesScale.LINEAR;
    protected yscale: AxesScale = AxesScale.LINEAR;
    protected grid_visible: boolean = false;
    protected spines: { [key: string]: Axis };
    protected _legend: Legend | null = null;

    constructor(x: number, y: number, width: number, height: number, z_index: number = 0) {
        super(x, y, width, height, z_index);
        this.spines = {
            top: new Axis(this, 'top'),
            bottom: new Spine(this, 'bottom'),
            left: new Spine(this, 'left'),
            right: new Spine(this, 'right')
        };
    }

    get xaxis() {
        return this.spines.bottom;
    }

    get yaxis() {
        return this.spines.left;
    }

    set_xscale(value: AxesScale) {
        this.xscale = value;
    }

    set_yscale(value: AxesScale) {
        this.yscale = value;
    }

    set_xlabel(label: string) {
        this.xlabel = label;
    }

    set_ylabel(label: string) {
        this.ylabel = label;
    }

    set_title(title: string) {
        this.title = title;
    }

    legend(handles: any[], labels: string[], options: Partial<LegendOptions> = {}): Legend {
        this._legend = new Legend(this.canvas, options);
        handles.forEach((handle, index) => {
            // 假设handle有一个get_color方法来获取其颜色
            this._legend?.add_item(labels[index], handle.get_color());
        });
        if (this._legend) {
            this.add(this._legend);
        }
        return this._legend;
    }

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
        this.grid_visible = visible;
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

    cla() {
        // 清除当前的坐标轴
        this.spines = {};
        this.xlabel = '';
        this.ylabel = '';
        this.grid_visible = false;
    }

    draw(renderer: Renderer2D) {
        super.draw(renderer);
        this.draw_spines(renderer);
        this.draw_labels(renderer);
    }

    private draw_spines(renderer: Renderer2D) {
        for (const key in this.spines) {
            this.spines[key].draw(renderer);
        }
    }

    private draw_labels(renderer: Renderer2D) {
        // 绘制x轴标签
        if (this.xlabel) {
            // 具体实现
        }
        // 绘制y轴标签
        if (this.ylabel) {
            // 具体实现
        }
    }

    add(object: any) {
        super.add(object);
    }
}

export { Axes };
