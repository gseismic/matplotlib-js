import { set_canvas_size } from '../utils/dom'; 
import { KeyEventHandler } from './events/key_event.js';
import { MouseEventHandler } from './events/mouse_event.js';

interface MarginOptions {
    margin_left: number;
    margin_top: number;
    margin_right: number;
    margin_bottom: number;
}

class Canvas {
    public dpi: number;
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public width: number; // in pixels
    public height: number; // in pixels
    protected key_event_handler: KeyEventHandler;
    protected mouse_event_handler: MouseEventHandler;
    public options: MarginOptions = {
        margin_left: 50,
        margin_top: 50,
        margin_right: 50,
        margin_bottom: 50,
    };
    public use_parent_size: boolean = true;
    constructor(canvas_id: string, options: Partial<MarginOptions> = {}, use_parent_size: boolean = true) {
        this.canvas = document.getElementById(canvas_id) as HTMLCanvasElement;
        this.options = { ...this.options, ...options };
        this.use_parent_size = use_parent_size;
        this.context = this.canvas.getContext('2d')!;
        this.dpi = window.devicePixelRatio || 1;
        const size = set_canvas_size(this.canvas, this.use_parent_size);
        this.width = size[0];
        this.height = size[1];
        this.key_event_handler = new KeyEventHandler(this.canvas);
        this.mouse_event_handler = new MouseEventHandler(this.canvas);
    }

    get_size(): [number, number] {
        return [this.width, this.height];   
    }
}
export { Canvas, MarginOptions };