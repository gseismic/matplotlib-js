import { Drawable } from '../../core/drawable.js';
import { Renderer2D } from '../../core/renderer/renderer2d.js';
import { BoundingBox2D } from '../../core/bounding_box.js';
import { RectangleOptions2D } from '../../core/renderer/options2d.js';


class Rectangle extends Drawable {
    x: number; // 左下角x坐标 | lower left x
    y: number; // 左下角y坐标 | lower left y
    width: number; // 宽度 | width
    height: number; // 高度 | height
    default_options: RectangleOptions2D = {
        fill_color: 'black',
        edge_color: 'black',
        edge_width: 1
    };
    options: RectangleOptions2D;

    constructor(x: number, y: number, width: number, height: number, options: Partial<RectangleOptions2D>) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.options = { ...this.default_options, ...options };
    }

    do_draw(renderer: Renderer2D): void {
        const ctx = renderer.canvas;
        if (this.transform) {
            const [x0, y0] = this.transform.transform(this.x, this.y);
            const [x3, y3] = this.transform.transform(this.x + this.width, this.y + this.height);
        }
        else {
            const [x0, y0] = [this.x, this.y];
            renderer.draw_rect(x0, y0, this.width, this.height, this.options);
        }
    }

    bounding_box(): BoundingBox2D {
        return new BoundingBox2D(this.x, this.y, this.width, this.height);
    }
}

export { Rectangle };   