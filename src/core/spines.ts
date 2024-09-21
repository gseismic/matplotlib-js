import { Axes } from './axes';
import { Renderer2D } from './renderer/renderer2d.js';
import { Drawable } from './drawable.js';

class Spine extends Drawable {
    private axes: Axes;
    private position: string;
    private _visible: boolean = true;
    private _color: string = 'black';
    private _linewidth: number = 1;
    private _bounds: string | [string, number] = 'auto';
    private _zorder: number = 0;

    constructor(axes: Axes, position: string) {
        this.axes = axes;
        this.position = position;
    }

    set_visible(visible: boolean): this {
        this._visible = visible;
        return this;
    }

    set_position(position: string | [string, number]): this {
        this._bounds = position;
        return this;
    }

    set_color(color: string): this {
        this._color = color;
        return this;
    }

    set_linewidth(width: number): this {
        this._linewidth = width;
        return this;
    }

    get_visible(): boolean {
        return this._visible;
    }

    get_position(): string | [string, number] {
        return this._bounds;
    }

    get_color(): string {
        return this._color;
    }

    get_linewidth(): number {
        return this._linewidth;
    }

    do_draw(renderer: Renderer2D) {
        if (!this._visible) return;

        const options = {'color': this._color, 'linewidth': this._linewidth};
        renderer.draw_line(x1, y1, x2, y2, options);

        renderer.beginPath();
        renderer.strokeStyle = this._color;
        renderer.lineWidth = this._linewidth;

        let x1, y1, x2, y2;
        // 根据 position 和 _bounds 计算实际绘制位置
        // 这里需要实现具体的位置计算逻辑

        renderer.moveTo(x1, y1);
        renderer.lineTo(x2, y2);
        renderer.stroke();
    }
}

export { Spine };