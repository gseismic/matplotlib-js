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
    location: 'left' | 'right' | 'top' | 'bottom' = 'bottom';
    scaler_type: ScaleType = 'linear';

    min: number = 0;
    max: number = 10;
    label: string = '';

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
    tick_label_font_size: number = 20;

    spine_xlabel_space: number = 5; // 刻度标签与轴线之间的距离 | space between spine and label
    spine_ylabel_space: number = 10; // 刻度标签与轴线之间的距离 | space between spine and label
}

class Axis extends Drawable {
    protected options: AxisOptions = new AxisOptions();
    protected scaler: Scaler = new LinearScaler(0, 1);

    constructor(options: Partial<AxisOptions> = {}) {
        super('axes');
        // console.log('Axis options pre: ', this.options);
        // console.log('options: ', options);
        this.options = { ...this.options, ...options };
        console.log('Axis options: ', this.options);
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

    set_lim(min: number, max: number): void {
        if (this.options.min === min && this.options.max === max) {
            return;
        }
        this.options.min = min;
        this.options.max = max;
        this.scaler.set_lim(min, max);
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
        console.log('\t\tdo_draw: ', this);
        this.draw_axis_line(renderer);
        this.draw_ticks_and_labels(renderer);
    }

    protected draw_axis_line(renderer: Renderer2D): void {
        let is_vertical = this.options.location === 'left' || this.options.location === 'right';
        const endX = is_vertical ? this.options.x : this.options.x + this.options.length;
        const endY = is_vertical ? this.options.y + this.options.length : this.options.y;
        const line_options: Partial<Line2DOptions> = {
            color: this.options.spine_color,
            line_width: this.options.spine_width
        };
        console.log('\t\t\tdraw_axis_line: ', this.options.x, this.options.y, endX, endY, line_options);
        renderer.draw_line(this.options.x, this.options.y, endX, endY, line_options);
    }

    protected draw_ticks_and_labels(renderer: Renderer2D): void {
        const { majorTicks, minorTicks, newNumMajorTicks, newNumMinorTicks, precision } = this.scaler.scale(this.options.num_major_ticks, this.options.num_minor_ticks);
        let tick_start_x, tick_start_y, tick_end_x, tick_end_y;
        let tick_direction = this.options.tick_direction;
        // let tick_x, tick_y;
        let major_tick_length = this.options.major_tick_length;
        let minor_tick_length = this.options.minor_tick_length;
        let half_major_tick_length = major_tick_length / 2;

        // console.log('\t\t\t\toptions: ', this.options);
        // console.log('\t\t\t\tmajorTicks: ', majorTicks);
        // console.log('\t\t\t\tminorTicks: ', minorTicks);
        // console.log('\t\t\t\tnewNumMajorTicks: ', newNumMajorTicks);
        // console.log('\t\t\t\tnewNumMinorTicks: ', newNumMinorTicks);
        // console.log('\t\t\t\tprecision: ', precision);
        let is_vertical = this.options.location === 'left' || this.options.location === 'right';
        // console.log('\t\t\t\tmajorTicks: ', majorTicks);

        console.log(`window.devicePixelRatio: ${window.devicePixelRatio}`);

        for (let i = 0; i < majorTicks.length; i++) {
            const value = majorTicks[i];
            this._draw_tick_label(renderer, tick_direction, is_vertical, value, major_tick_length, precision, true);
        }

        for (let i = 0; i < minorTicks.length; i++) {
            const value = minorTicks[i];
            this._draw_tick_label(renderer, tick_direction, is_vertical, value, minor_tick_length, precision, false);
        }
    }

    _draw_tick_label(renderer: Renderer2D, 
        tick_direction: 'in' | 'out' | 'inout', 
        is_vertical: boolean, 
        value: number,
        tick_length: number,
        precision: number,
        draw_label: boolean = true
    ): void {
        let tick_x: number, tick_y: number;
        if (is_vertical) {
            tick_x = this.options.x;
            tick_y = this.transform.transform_y(value);
        } else {
            tick_x = this.transform.transform_x(value);
            tick_y = this.options.y;
        }

        const { tick_start_x, tick_start_y, tick_end_x, tick_end_y, label_x, label_y, text_baseline, text_align } = this._calculate_tick_label_position(
            this.options.location, tick_direction, tick_x, tick_y, tick_length, this.options.spine_xlabel_space, this.options.spine_ylabel_space
        );
        
        renderer.draw_line(tick_start_x, tick_start_y, tick_end_x, tick_end_y, {
            color: this.options.major_tick_color,
            line_width: this.options.major_tick_width
        });

        if(!draw_label) {
            return;
        }
        renderer.save();
        renderer.rotate(this.options.tick_label_rotation);
        const label: string = String(value.toFixed(precision));
        renderer.draw_text(label, label_x, label_y, {
            font_color: this.options.tick_label_color,
            font_family: this.options.tick_label_font_family,
            font_size: this.options.tick_label_font_size,
            text_baseline: text_baseline,
            text_align: text_align
        });
        renderer.restore();
    }

    _calculate_tick_label_position(
        location: 'left' | 'right' | 'top' | 'bottom', 
        tick_direction: 'in' | 'out' | 'inout', 
        tick_x: number,
        tick_y: number,
        tick_length: number,
        spine_xlabel_space: number,
        spine_ylabel_space: number
    ): {
        tick_start_x: number;
        tick_start_y: number;
        tick_end_x: number;
        tick_end_y: number;
        label_x: number;
        label_y: number;
        text_baseline: CanvasTextBaseline;
        text_align: CanvasTextAlign;
    } {
        let is_vertical = location === 'left' || location === 'right';
        let tick_start_x: number = tick_x;
        let tick_start_y: number = tick_y;
        let tick_end_x: number = tick_x;
        let tick_end_y: number = tick_y;
        let label_x: number = tick_x;
        let label_y: number = tick_y;
        let text_baseline: CanvasTextBaseline = 'top';
        let text_align: CanvasTextAlign = 'center';
        let half_tick_length = tick_length / 2;
        if(is_vertical) {
            // location: left, right: 
            // start/end-y: 一致
            text_align = 'center';
            let dir = tick_direction === 'inout' ? 0 : tick_direction === 'in' ? 1 : -1;
            let flag = location === 'right' ? 1 : -1;
            let shift_flag = dir * flag; // 1: (right, in), (left, out); -1: (right, out), (left, in)
            tick_start_y = tick_y;
            tick_end_y = tick_y;
            if(tick_direction != 'inout') {
                tick_start_x = tick_x;
                tick_end_x = tick_x - shift_flag * tick_length;
            } else {
                tick_start_x = tick_x - half_tick_length;
                tick_end_x = tick_x + half_tick_length;
            }

            text_baseline = 'middle';
            if(location === 'right') {
                label_x = Math.max(tick_start_x, tick_end_x) + spine_ylabel_space;
                text_align = 'left';
            } else {
                label_x = Math.min(tick_start_x, tick_end_x) - spine_ylabel_space;
                text_align = 'right';
            }
        } else {
            // location: top, bottom: 
            // start/end-x: 一致
            text_align = 'center';
            let dir = tick_direction === 'inout' ? 0 : tick_direction === 'in' ? 1 : -1;
            let flag = location === 'bottom' ? 1 : -1;
            let shift_flag = dir * flag; // 1: (bottom, in), (top, out); -1: (bottom, out), (top, in)
            tick_start_x = tick_x;
            tick_end_x = tick_x;
            if(tick_direction != 'inout') {
                tick_start_y = tick_y;
                tick_end_y = tick_y - shift_flag * tick_length;
            } else {
                tick_start_y = tick_y - half_tick_length;
                tick_end_y = tick_y + half_tick_length;
            }

            if(location === 'bottom') {
                label_y = Math.max(tick_start_y, tick_end_y) + spine_xlabel_space;
                text_baseline = 'top';
            } else {
                label_y = Math.min(tick_start_y, tick_end_y) - spine_xlabel_space;
                text_baseline = 'bottom';
            }
        } 
        return { 
            tick_start_x, tick_start_y, tick_end_x, tick_end_y, 
            label_x, label_y, text_baseline, text_align
        };
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