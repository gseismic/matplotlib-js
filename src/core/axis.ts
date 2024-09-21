import { Drawable } from './drawable.js';
import { Renderer2D } from './renderer/renderer2d.js';
import { Line2DOptions } from './renderer/options2d.js';
import { Scaler } from './scaler/scaler.js';
import { LinearScaler } from './scaler/linear_scaler.js';
import { LogScaler } from './scaler/log_scaler.js';
import { ScaleType } from './types/scale_type.js';

class AxisOptions {
    x: number = 0;
    y: number = 0;
    length: number = 100;
    min: number = 0;
    max: number = 10;
    label: string = '';
    location: 'left' | 'right' | 'top' | 'bottom' = 'bottom';
    scaler_type: ScaleType = 'linear';

    spine_color: string = 'black';
    spine_width: number = 1;
    spine_style: string = 'solid';

    num_major_ticks: number = 5;
    num_minor_ticks: number = 2;
    major_tick_length: number = 10;
    minor_tick_length: number = 5;
    major_tick_color: string = 'black';
    major_tick_width: number = 2;
    minor_tick_color: string = 'gray';
    minor_tick_width: number = 1;
    tick_direction: 'in' | 'out' | 'inout' = 'in';

    tick_label_rotation: number = 0;
    tick_label_color: string = 'black';
    tick_label_font_family: string = 'Arial';
    tick_label_font_size: number = 10;
}

class Axis extends Drawable {
    protected options: AxisOptions = new AxisOptions();
    protected scaler: Scaler = new LinearScaler(0, 1);

    constructor(options: Partial<AxisOptions> = {}) {
        super();
        this.options = { ...this.options, ...options };
        this.set_scaler(this.options.scaler_type);
    }

    set_scaler(scaler: ScaleType): void {
        if (scaler === 'linear') {
            this.scaler = new LinearScaler(this.options.min, this.options.max);
        } else if (scaler === 'log') {
            this.scaler = new LogScaler(this.options.min, this.options.max);
        } else {
            throw new Error(`Invalid scaler type: ${scaler}`);
        }
        this.options.scaler_type = scaler;
        this.mark_need_redraw();
    }

    set_position(x: number, y: number, length: number): void {
        if(this.options.x === x && this.options.y === y && this.options.length === length) {
            return;
        }
        this.options.x = x;
        this.options.y = y;
        this.options.length = length;
        this.mark_need_redraw();
    }

    set_range(min: number, max: number): void {
        if (this.options.min === min && this.options.max === max) {
            return;
        }
        this.options.min = min;
        this.options.max = max;
        this.mark_need_redraw();
    }

    set_label(label: string): void {
        if (this.options.label === label) {
            return;
        }
        this.options.label = label;
        this.mark_need_redraw();
    }

    do_draw(renderer: Renderer2D): void {
        this.draw_axis_line(renderer);
        this.draw_ticks_and_labels(renderer);
    }

    protected draw_axis_line(renderer: Renderer2D): void {
        let is_vertical = this.options.location === 'left' || this.options.location === 'right';
        const endX = is_vertical ? this.options.x : this.options.x + this.options.length;
        const endY = is_vertical ? this.options.y + this.options.length : this.options.y;
        const line_options: Partial<Line2DOptions> = {
            line_color: this.options.spine_color,
            line_width: this.options.spine_width
        };
        renderer.draw_line(this.options.x, this.options.y, endX, endY, line_options);
    }

    protected draw_ticks_and_labels(renderer: Renderer2D): void {
        const { majorTicks, minorTicks, newNumMajorTicks, newNumMinorTicks, precision } = this.scaler.scale(this.options.num_major_ticks, this.options.num_minor_ticks);
        let tick_start_x, tick_start_y, tick_end_x, tick_end_y;
        let tick_direction = this.options.tick_direction;
        let tick_x, tick_y;
        let tick_length = this.options.major_tick_length;
        let half_tick_length = tick_length / 2;
        let label_x, label_y;
        let label_align : CanvasTextAlign = 'right';
        let text_baseline : CanvasTextBaseline = 'top';

        // TODO: simplify
        let is_vertical = this.options.location === 'left' || this.options.location === 'right';
        if (is_vertical) {
            for (let i = 0; i <= majorTicks.length; i++) {
                const value = majorTicks[i];
                tick_x = this.options.x;
                tick_y = this.transform.transform_y(value);

                if(tick_direction === 'in') {
                    tick_start_x = tick_x;
                    tick_start_y = tick_y;
                    tick_end_x = tick_x + tick_length;
                    tick_end_y = tick_start_y;
                    label_x = tick_start_x - 2;
                    label_y = tick_start_y;
                    label_align = 'right';
                } else if(tick_direction === 'out') {
                    tick_start_x = tick_x;
                    tick_start_y = tick_y;
                    tick_end_x = tick_x - tick_length;
                    tick_end_y = tick_start_y;
                    label_x = tick_end_x - 2;
                    label_y = tick_end_y;
                    label_align = 'right';
                } else {
                    tick_start_x = tick_x - half_tick_length;
                    tick_start_y = tick_y;
                    tick_end_x = tick_x + half_tick_length;
                    tick_end_y = tick_start_y;
                    label_x = tick_end_x - 2;
                    label_y = tick_end_y;
                    label_align = 'right';
                }

                renderer.draw_line(tick_start_x, tick_start_y, tick_end_x, tick_end_y, {
                    line_color: this.options.major_tick_color,
                    line_width: this.options.major_tick_width
                }); 

                renderer.save();
                renderer.rotate(this.options.tick_label_rotation);
                const label = value.toFixed(precision);
                renderer.draw_text(label, tick_x, tick_y, {
                    font_color: this.options.tick_label_color,
                    font_family: this.options.tick_label_font_family,
                    font_size: this.options.tick_label_font_size,
                    text_align: label_align
                });
                renderer.restore();
            }
        } else {
            for (let i = 0; i <= majorTicks.length; i++) {
                const value = majorTicks[i];
                tick_x = this.transform.transform_x(value);
                tick_y = this.options.y;
                label_align = 'center';
                // TODO: tick space to label, text_baseline
                if(tick_direction === 'in') {
                    tick_start_x = tick_x;
                    tick_start_y = tick_y;
                    tick_end_x = tick_x;
                    tick_end_y = tick_start_y - tick_length;
                    label_x = tick_start_x;
                    label_y = tick_start_y;
                    text_baseline = 'bottom';
                } else if(tick_direction === 'out') {
                    tick_start_x = tick_x;
                    tick_start_y = tick_y;
                    tick_end_x = tick_x;
                    tick_end_y = tick_start_y + tick_length;
                    label_x = tick_end_x;
                    label_y = tick_end_y;
                    text_baseline = 'top';
                } else {
                    tick_start_x = tick_x;
                    tick_start_y = tick_y + half_tick_length;
                    tick_end_x = tick_x;
                    tick_end_y = tick_start_y - half_tick_length;
                    label_x = tick_x;
                    label_y = tick_end_y;
                    text_baseline = 'middle';
                }

                renderer.draw_line(tick_x, tick_y, tick_x + this.options.length, tick_y, {
                    line_color: this.options.major_tick_color,
                    line_width: this.options.major_tick_width
                });

                renderer.save();
                renderer.rotate(this.options.tick_label_rotation);
                const label = value.toFixed(precision);
                renderer.draw_text(label, label_x, label_y, {
                    font_color: this.options.tick_label_color,
                    font_family: this.options.tick_label_font_family,
                    font_size: this.options.tick_label_font_size
                });
                renderer.restore();
            }
        }
    }

    // onViewportChanged(viewport: Viewport): void {
    //     const { minX, maxX } = viewport.getXLim();
    //     const { minY, maxY } = viewport.getYLim();
    //     this.setRange(minX, maxX);  
    // }

    // bounding_box(): { x: number; y: number; width: number; height: number } {
    //     return {
    //         x: this.x,
    //         y: this.y,
    //         width: this.isVertical ? 0 : this.length,
    //         height: this.isVertical ? this.length : 0
    //     };
    // }
}

export { Axis };