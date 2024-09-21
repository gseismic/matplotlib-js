import { Drawable } from "../../core/drawable.js";
import { BoundingBox2D } from "../../core/bounding_box.js";
import { Renderer2D } from "../../core/renderer/renderer2d.js";

class Circle extends Drawable {
    private x: number;
    private y: number;
    private radius: number;

    constructor(x: number, y: number, radius: number) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    compute_bounding_box(): BoundingBox2D {
        return new BoundingBox2D(this.x, this.y, this.radius, this.radius);
    }

    do_draw(renderer: Renderer2D) {
        renderer.draw_circle(this.x, this.y, this.radius);
    }
}   

export { Circle };