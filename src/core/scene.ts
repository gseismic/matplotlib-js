import { DataTransform2D } from './transform/data_transform.js';
import { AxesTransform2D } from './transform/axes_transform.js';
import { ScaleType } from './types/scale_type.js';

class SceneOptions {
    x: number = 0;
    y: number = 0;
    width: number = 100;
    height: number = 100;
    zorder: number = 0;
    visible: boolean = true;
    xlim: [number, number] = [0, 1];
    ylim: [number, number] = [0, 1];

    xlabel?: string;
    ylabel?: string;
    title?: string;
    xscale?: ScaleType;
    yscale?: ScaleType;
    grid_visible?: boolean;
}
/**
 * 场景类，用于管理所有绘图元素 | Scene class for managing all drawing elements
 */
class Scene {
    protected options: SceneOptions = new SceneOptions();

    private drawables: any[] = [];
    public data_transform: DataTransform2D;
    public axes_transform: AxesTransform2D;
    protected data_transform_changed: boolean = true;
    protected axes_transform_changed: boolean = true;
    protected visible_changed: boolean = true;
    protected element_changed: boolean = true;

    constructor(options: Partial<SceneOptions> = {}) {
        this.options = { ...this.options, ...options };
        this.data_transform = new DataTransform2D(this.options.x, this.options.y, this.options.width, this.options.height);
        this.axes_transform = new AxesTransform2D(this.options.x, this.options.y, this.options.width, this.options.height);
    }

    set_position(x: number, y: number, width: number, height: number) {
        if (x == this.options.x && y == this.options.y && width == this.options.width && height == this.options.height) {
            return;
        }
        this.options.x = x;
        this.options.y = y;
        this.options.width = width;
        this.options.height = height;
        this.data_transform.set_position(x, y, width, height);
        this.axes_transform.set_position(x, y, width, height);
        this.data_transform_changed = true;
        this.axes_transform_changed = true;
    }

    set_xlim(min: number, max: number) {
        if (min == this.options.xlim[0] && max == this.options.xlim[1]) {
            return;
        }
        this.options.xlim = [min, max];
        this.data_transform.set_xlim([min, max]);
        this.axes_transform.set_xlim([min, max]);
        this.data_transform_changed = true;
        this.axes_transform_changed = true;
    }

    set_ylim(min: number, max: number) {
        if (min == this.options.ylim[0] && max == this.options.ylim[1]) {
            return;
        }
        this.options.ylim = [min, max];
        this.data_transform.set_ylim([min, max]);
        this.axes_transform.set_ylim([min, max]);
        this.data_transform_changed = true;
        this.axes_transform_changed = true;
    }

    add(drawable: any) {
        // 不是add后立刻渲染 | it's not rendered immediately after add
        this.drawables.push(drawable);
        this.drawables.sort((a, b) => a.zorder - b.zorder);
        this.element_changed = true;
    }

    remove(drawable: any) {
        const index = this.drawables.indexOf(drawable);
        if (index > -1) {
            this.drawables.splice(index, 1);
            this.element_changed = true;
        }
    }

    clear() {
        this.drawables = [];
        this.element_changed = true;
    }

    set_visible(visible: boolean) {
        if(this.options.visible == visible) {
            return;
        }
        this.options.visible = visible;
        this.visible_changed = true;
    }

    get_visible() {
        return this.options.visible;
    }

    before_render(renderer: any): void {}
    after_render(renderer: any): void {}

    render(renderer: any, clear: boolean = true) {
        if (clear) {
            // 可能有其他renderer，所以不清空整个canvas | There may be other renderers, so do not clear the entire canvas
            renderer.clear_rect(this.options.x, this.options.y, this.options.width, this.options.height);
        }
        this.before_render(renderer);
        if(!this.options.visible) {
            this.after_render(renderer);
            return;
        }
        if(this.element_changed) {
            this.drawables.sort((a, b) => a.zorder - b.zorder);
            this.element_changed = false;
        }
        console.log('drawables: ', this.drawables.length, this.drawables);
        for (const drawable of this.drawables) {
            if(this.data_transform_changed && drawable.get_coord_type() == 'data') {
                drawable.set_transform(this.data_transform);
            }
            if(this.axes_transform_changed && drawable.get_coord_type() == 'axes') {
                drawable.set_transform(this.axes_transform);
            }
            console.log('\tdrawing: ', drawable);
            drawable.draw(renderer);
        }
        this.data_transform_changed = false;
        this.axes_transform_changed = false;
        this.visible_changed = false;
        this.after_render(renderer);
    }

    get zorder() {
        return this.options.zorder;
    }
}

export { Scene, SceneOptions };
