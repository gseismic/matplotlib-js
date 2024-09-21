import { Transform, Transform2D } from './transform/transform.js';
import { BoundingBox2D } from './bounding_box.js';

abstract class Drawable {
    protected zorder: number = 0;
    protected visible: boolean = true;
    protected interactive: boolean = true;
    protected coord_type: string = 'data';

    protected need_redraw: boolean = true;

    protected data: any|null = null ;
    protected data_view: any|null = null; // view of data
    protected options: any|null = null;
    protected transform: Transform2D | null = null;

    protected data_changed: boolean = true;
    protected options_changed: boolean = true;
    protected data_view_changed: boolean = true;
    protected transform_changed: boolean = true;

    constructor(coord_type: string = 'data') {
        this.coord_type = coord_type;
    }

    set_visible(visible: boolean): void {
        this.visible = visible;
    }

    set_interactive(interactive: boolean): void {
        this.interactive = interactive;
    }

    set_zorder(zorder: number): void {
        this.zorder = zorder;
    }

    set_transform(transform: Transform2D): void {
        if (this.transform !== transform) {
            this.transform = transform;
            this.transform_changed = true;
            this.after_transform_changed(transform);
        }
    }
    
    set_data(data: any): void {
        // data比较可能比较耗时，所以不比较 | it is too time-consuming to compare data  
        this.data = data;
        this.data_changed = true;
        this.after_data_changed(data);
    }

    set_options(options: any): void {
        if (this.options !== options) {
            this.options = options;
            this.options_changed = true;
            this.after_options_changed(options);
        }
    }

    set_data_view(data_view: any): void {
        if (this.data_view !== data_view) {
            this.data_view = data_view;
            this.data_view_changed = true;
            this.after_data_view_changed(data_view);
        }
    }

    draw(renderer: any, enforce: boolean = false): void {
        if (this.visible) {
            if (enforce || (this.transform_changed || this.options_changed || this.data_changed || this.data_view_changed)) {
                this.do_draw(renderer);
            }
            this.transform_changed = false;
            this.options_changed = false;
            this.data_changed = false;
            this.data_view_changed = false;
        }
    }

    draw_legend(renderer: any, px: number, py: number, width: number, height: number): void {}

    after_data_view_changed(data_view: any): void {}
    after_data_changed(data: any): void {}
    after_options_changed(options: any): void {}
    after_transform_changed(transform: Transform): void {}

    abstract do_draw(renderer: any): void;

    should_redraw(): boolean {
        return this.need_redraw;
    }

    mark_need_redraw(need_redraw: boolean=true): void {
        this.need_redraw = need_redraw;
    }

    get_coord_type(): string {
        return this.coord_type;
    }

    // abstract compute_bounding_box(): BoundingBox2D;
    //  bounding_box(): BoundingBox2D
    //  {
    //     if (this.transform_changed) {
    //         this.compute_bounding_box();
    //         this.transform_changed = false;
    //     }
    //     return this.bounding_box;
    //  }

    // contains(pointX: number, pointY: number): boolean {
    //     const box = this.bounding_box();
    //     return box.contains(pointX, pointY);
    // }

    // onMouseMove(event: MouseEvent): void {}
    // onMouseDown(event: MouseEvent): void {}
    // onMouseUp(event: MouseEvent): void {}
    // onMouseEnter(event: MouseEvent): void {}
    // onMouseLeave(event: MouseEvent): void {}
    // onClick(event: MouseEvent): void {}
    // onDoubleClick(event: MouseEvent): void {}
    // onKeyDown(event: KeyboardEvent): void {}
    // onKeyUp(event: KeyboardEvent): void {}
    // onKeyPress(event: KeyboardEvent): void {}

    // update(): void {}
}

export { Drawable };