import { Drawable } from './drawable.js';
import { Renderer2D } from './renderer/renderer2d.js';
// import { BoundingBox2D } from './bounding_box.js';
import { Text2DOptions, Rectangle2DOptions } from './renderer/options2d.js';
import { Canvas } from './canvas.js';

// TODO: 文本长度
class LegendOptions {
    position: 'upper_right' | 'upper_left' | 'lower_left' | 'lower_right' = 'upper_right';
    padding: number = 5; // in px
    item_spacing: number = 5; // in px
    box_width: number = 20; // in px
    box_height: number = 10; // in px
    font_family: string = 'Arial';
    font_size: number = 12;
    font_color: string = 'black';
    background_color: string | null = null;
    border_color: string | null = null;
    border_width: number = 1; // in px
    // shadow: boolean = false;
    // shadow_color: string = 'rgba(0, 0, 0, 0.5)';
    // shadow_blur: number = 4; // in px
    // shadow_offset_x: number = 2; // in px
    // shadow_offset_y: number = 2; // in px
}

class Legend extends Drawable {
    private canvas: Canvas;
    protected items: Array<{label: string, handle: Drawable}> = [];
    protected options: LegendOptions;
    protected default_options: LegendOptions = new LegendOptions();

    constructor(canvas: Canvas, options: Partial<LegendOptions> = {}) {
        super();
        this.canvas = canvas;
        this.options = { ...this.default_options, ...options };
    }

    add_item(label: string, handle: Drawable): void {
        this.items.push({label, handle});
    }

    set_options(options: Partial<LegendOptions>): void {
        this.options = { ...this.options, ...options };
    }

    private get_position_offset(canvas_width: number, canvas_height: number): [number, number] {
        let x: number, y: number;
        // 计算图例的位置
        switch (this.options.position) {
            case 'upper_right':
                x = canvas_width - this.options.padding - this.options.box_width;
                y = this.options.padding;
                break;
            case 'upper_left':
                x = this.options.padding;
                y = this.options.padding;
                break;
            case 'lower_left':
                x = this.options.padding;
                y = canvas_height - this.options.padding - (this.options.box_height + this.options.item_spacing) * this.items.length;
                break;
            case 'lower_right':
                x = canvas_width - this.options.padding - this.options.box_width;
                y = canvas_height - this.options.padding - (this.options.box_height + this.options.item_spacing) * this.items.length;
                break;
        }

        return [x, y]
    }

    do_draw(renderer: Renderer2D): void {
        if (this.items.length === 0) return;

        const [canvas_width, canvas_height] = this.canvas.get_size();
        const [x, y] = this.get_position_offset(canvas_width, canvas_height);

        // 绘制背景和边框 | draw background and border
        if (this.options.background_color || this.options.border_color) {
            const legend_width = this.options.box_width + this.options.padding * 2;
            const legend_height = (this.options.box_height + this.options.item_spacing) * this.items.length + this.options.padding * 2;

            let back_options: Partial<Rectangle2DOptions> = {};
            if (this.options.border_color) {
                back_options["edge_color"] = this.options.border_color;
            } 
            if (this.options.border_width) {
                back_options["edge_width"] = this.options.border_width;
            }   
            if (this.options.background_color) {
                back_options["fill_color"] = this.options.background_color;
            }
            renderer.draw_rect(
                x - this.options.padding,
                y - this.options.padding, 
                legend_width, 
                legend_height, 
                back_options
            );
        }

        let text_options: Partial<Text2DOptions> = {
            font_family: this.options.font_family,
            font_size: this.options.font_size,
            font_color: this.options.font_color,
            text_align: 'left',
            text_baseline: 'top',
        };

        // 绘制每个图例项 | draw each legend item
        let box_width = this.options.box_width;
        let box_height = this.options.box_height;
        let item_spacing = this.options.item_spacing;
        this.items.forEach((item, index) => {
            // top y
            const item_y = y + index * (box_height + item_spacing);

            let label: string = item.label;
            let handle: Drawable = item.handle;

            handle.draw_legend(renderer, x, item_y, box_width, box_height);
            renderer.draw_text(label, x + box_width + 5, item_y + box_height / 2, text_options);
        });
    }

    // bounding_box(): BoundingBox2D {
    //     // 计算图例的边界框
    //     const width = this.options.box_width + this.options.padding * 2;
    //     const height = (this.options.box_height + this.options.item_spacing) * this.items.length + this.options.padding * 2;
    //     return new BoundingBox2D(0, 0, width, height);
    // }
}

export { Legend, LegendOptions };
