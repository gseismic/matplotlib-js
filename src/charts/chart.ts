import { Figure, FigureOptions } from "../core/figure.js";

class Chart {
    objects: DrawableObject[] = [];

    constructor(canvas_id: string, options: Partial<FigureOptions> = {}) {
        super(canvas_id, options);
    }

    add_object(object: DrawableObject) {
        this.objects.push(object);
    }
}

export { Chart };