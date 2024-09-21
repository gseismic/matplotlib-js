import { Drawable } from "../../core/drawable.js";
import { BoundingBox2D } from "../../core/bounding_box.js";
import { Renderer2D } from "../../core/renderer/renderer2d.js";

class Text extends Drawable {
    private x: number;
    private y: number;
    private text: string;

    constructor(x: number, y: number, text: string) {
        super();
        this.x = x;
        this.y = y;
        this.text = text;
    }

    compute_bounding_box(): BoundingBox2D {
        return new BoundingBox2D(this.x, this.y, this.text.length, 1);
    }

    do_draw(renderer: Renderer2D) {
        renderer.draw_text(this.text, this.x, this.y);
    }
}