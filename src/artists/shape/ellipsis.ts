import { Drawable } from "../../core/drawable.js";
import { BoundingBox2D } from "../../core/bounding_box.js";
import { Renderer2D } from "../../core/renderer/renderer2d.js";

class Ellipsis extends Drawable {
    private x: number;
    private y: number;
    private rx: number;
    private ry: number;

    constructor(x: number, y: number, rx: number, ry: number) {
        super();    
        this.x = x;
        this.y = y;
        this.rx = rx;
        this.ry = ry;
    }

    compute_bounding_box(): BoundingBox2D {
        return new BoundingBox2D(this.x, this.y, this.rx, this.ry);
    }

    do_draw(renderer: Renderer2D) {
        renderer.draw_ellipsis(this.x, this.y, this.rx, this.ry);
    }
}

export { Ellipsis };
