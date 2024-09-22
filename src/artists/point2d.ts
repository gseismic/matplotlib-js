import { Drawable } from '../core/drawable.js';
import { Renderer2D } from '../core/renderer/renderer2d.js';
import { BoundingBox } from '../core/bounding_box.js';
import { Transform2D } from '../core/transform/transform.js';
import { Point2DOptions } from '../core/renderer/options2d.js';
import { Point2DData } from './point2d_data.js';


class Point2D extends Drawable {
    protected data: Point2DData | null = null;
    private data_px: {x: number[], y: number[]} = {x: [], y: []};    
    protected options: any; // 将 private 改为 protected

    constructor(data: Point2DData, options: Partial<Point2DOptions> = {}, coord_type: 'data' | 'axes' = 'data') {
        super(coord_type);
        this.set_data(data);
        this.set_options(options);
    }

    after_transform_changed(transform: Transform2D): void {
    }

    do_draw(renderer: Renderer2D): void {
        if (!this.data) {
            console.log('no data');
            return;
        }
        // transform 变换或数据变化
        if(this.should_recalculate()) {
            const [xdata_px, ydata_px]  = this.transform.transform_batch(this.data.x, this.data.y);
            this.data_px = {x: xdata_px, y: ydata_px};
        }
        renderer.draw_points(this.data_px.x, this.data_px.y, this.options);
    }

    after_data_changed(data: any): void {
    }

    after_options_changed(options: any): void {
    }
}

export { Point2D, Point2DData, Point2DOptions };
