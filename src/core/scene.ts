import { DataTransform2D } from './transform/data_transform.js';
import { AxesTransform2D } from './transform/axes_transform.js';
/**
 * 场景类，用于管理所有绘图元素 | Scene class for managing all drawing elements
 */
class Scene {
    public z_index: number = 0;
    private drawables: any[] = [];
    private visible: boolean = true;
    protected position: { x: number, y: number, width: number, height: number };
    protected xlim: [number, number] = [0, 1];
    protected ylim: [number, number] = [0, 1];
    public data_transform: DataTransform2D;
    public axes_transform: AxesTransform2D;
    protected data_transform_changed: boolean = true;
    protected axes_transform_changed: boolean = true;
    // protected element_changed: boolean = true;

    constructor(x: number, y: number, width: number, height: number, z_index: number = 0) {
        this.position = { x, y, width, height };
        this.data_transform = new DataTransform2D(x, y, width, height);
        this.axes_transform = new AxesTransform2D(x, y, width, height);
        this.z_index = z_index; 
    }

    set_position(x: number, y: number, width: number, height: number) {
        if (x == this.position.x && y == this.position.y && width == this.position.width && height == this.position.height) {
            return;
        }
        this.position = { x, y, width, height };
        this.data_transform.set_position(x, y, width, height);
        this.axes_transform.set_position(x, y, width, height);
        this.data_transform_changed = true;
        this.axes_transform_changed = true;
    }

    set_xlim(min: number, max: number) {
        if (min == this.xlim[0] && max == this.xlim[1]) {
            return;
        }
        this.xlim = [min, max];
        this.data_transform.set_xlim([min, max]);
        this.axes_transform.set_xlim([min, max]);
        this.data_transform_changed = true;
        this.axes_transform_changed = true;
    }

    set_ylim(min: number, max: number) {
        if (min == this.ylim[0] && max == this.ylim[1]) {
            return;
        }
        this.ylim = [min, max];
        this.data_transform.set_ylim([min, max]);
        this.axes_transform.set_ylim([min, max]);
        this.data_transform_changed = true;
        this.axes_transform_changed = true;
    }

    add(drawable: any) {
        // 不是add后立刻渲染 | it's not rendered immediately after add
        this.drawables.push(drawable);
        this.drawables.sort((a, b) => a.zorder - b.zorder);
    }

    remove(drawable: any) {
        const index = this.drawables.indexOf(drawable);
        if (index > -1) {
            this.drawables.splice(index, 1);
        }
    }

    clear() {
        this.drawables = [];
    }

    set_visible(visible: boolean) {
        this.visible = visible;
    }

    get_visible() {
        return this.visible;
    }

    before_render(renderer: any): void {}
    after_render(renderer: any): void {}

    render(renderer: any, clear: boolean = true) {
        if (clear) {
            renderer.clear_rect(this.position.x, this.position.y, this.position.width, this.position.height);
        }
        this.before_render(renderer);
        if(!this.visible) {
            this.after_render(renderer);
            return;
        }
        for (const drawable of this.drawables) {
            if(this.data_transform_changed && drawable.get_coord_type() == 'data') {
                drawable.set_transform(this.data_transform);
            }
            if(this.axes_transform_changed && drawable.get_coord_type() == 'axes') {
                drawable.set_transform(this.axes_transform);
            }
            drawable.draw(renderer);
        }
        this.data_transform_changed = false;
        this.axes_transform_changed = false;
        this.after_render(renderer);
    }
}

export { Scene };
