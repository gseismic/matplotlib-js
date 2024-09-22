import { Drawable } from '../core/drawable.js';
import { Renderer2D } from '../core/renderer/renderer2d.js';
import { BoundingBox } from '../core/bounding_box.js';
import { Transform2D } from '../core/transform/transform.js';
import { Line2DOptions } from '../core/renderer/options2d.js';
import { Line2DData } from './point2d_data.js';

class Line2D extends Drawable {
    protected data: Line2DData | null = null;
    private data_px: {x: number[], y: number[]} = {x: [], y: []};    
    protected options: any; // 将 private 改为 protected

    constructor(data: Line2DData, options: Partial<Line2DOptions> = {}, coord_type: 'data' | 'axes' = 'data') {
        super(coord_type);
        this.set_data(data);
        this.set_options(options);
    }

    after_transform_changed(transform: Transform2D): void {
    }

    do_draw(renderer: Renderer2D): void {
        console.log('do_draw ..');
        console.log(this.data);
        if (!this.data) {
            console.log('no data');
            return;
        }
        // transform 变换或数据变化
        if(this.should_recalculate()) {
            const [xdata_px, ydata_px]  = this.transform.transform_batch(this.data.x, this.data.y);
            this.data_px = {x: xdata_px, y: ydata_px};
        }
        renderer.draw_lines(this.data_px.x, this.data_px.y, this.options);
    }

    // bounding_box(): BoundingBox {
    //     if (!this.data_px) {
    //         return new BoundingBox(0, 0, 0, 0);
    //     }
    //     // 简单实现，返回数据的边界
    //     const minX = Math.min(...this.data_px.xdata);
    //     const maxX = Math.max(...this.data_px.xdata);
    //     const minY = Math.min(...this.data_px.ydata);
    //     const maxY = Math.max(...this.data_px.ydata);
    //     return new BoundingBox(minX, minY, maxX - minX, maxY - minY);
    // }

    after_data_changed(data: any): void {
        // 在这个类中不需要实现
        console.log('Line2D', data.x, data.y);
    }

    after_options_changed(options: any): void {
        // 在这个类中不需要实现
    }
}

export { Line2D, Line2DData, Line2DOptions };
