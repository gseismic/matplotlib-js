import { Signal } from '../../utils/signal.js';
import { Point } from '../types/point.js';

class MouseEventHandler {
    private canvas: HTMLCanvasElement;
    private is_dragging: boolean = false;
    private last_position: Point | null = null;

    public mouse_move: Signal<Point> = new Signal();
    public mouse_enter: Signal<Point> = new Signal();
    public mouse_leave: Signal<Point> = new Signal();
    public mouse_down: Signal<Point> = new Signal();
    public mouse_up: Signal<Point> = new Signal();
    public click: Signal<Point> = new Signal();
    public double_click: Signal<Point> = new Signal();
    public drag_start: Signal<Point> = new Signal();
    public drag_move: Signal<{ start: Point, end: Point }> = new Signal();
    public drag_end: Signal<{ start: Point, end: Point }> = new Signal();

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.setup_event_listeners();
    }

    private setup_event_listeners(): void {
        this.canvas.addEventListener('mousemove', this.handle_mouse_move.bind(this));
        this.canvas.addEventListener('mouseenter', this.handle_mouse_enter.bind(this));
        this.canvas.addEventListener('mouseleave', this.handle_mouse_leave.bind(this));
        this.canvas.addEventListener('mousedown', this.handle_mouse_down.bind(this));
        this.canvas.addEventListener('mouseup', this.handle_mouse_up.bind(this));
        this.canvas.addEventListener('click', this.handle_click.bind(this));
        this.canvas.addEventListener('dblclick', this.handle_double_click.bind(this));
    }

    private get_mouse_position(event: MouseEvent): Point {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    private handle_mouse_move(event: MouseEvent): void {
        const position = this.get_mouse_position(event);
        this.mouse_move.emit(position);

        if (this.is_dragging && this.last_position) {
            this.drag_move.emit({
                start: this.last_position,
                end: position
            });
        }
    }

    private handle_mouse_enter(event: MouseEvent): void {
        const position = this.get_mouse_position(event);
        this.mouse_enter.emit(position);
    }

    private handle_mouse_leave(event: MouseEvent): void {
        const position = this.get_mouse_position(event);
        this.mouse_leave.emit(position);

        if (this.is_dragging) {
            this.is_dragging = false;
            this.drag_end.emit({
                start: this.last_position!,
                end: position
            });
        }
    }

    private handle_mouse_down(event: MouseEvent): void {
        const position = this.get_mouse_position(event);
        this.mouse_down.emit(position);

        this.is_dragging = true;
        this.last_position = position;
        this.drag_start.emit(position);
    }

    private handle_mouse_up(event: MouseEvent): void {
        const position = this.get_mouse_position(event);
        this.mouse_up.emit(position);

        if (this.is_dragging) {
            this.is_dragging = false;
            this.drag_end.emit({
                start: this.last_position!,
                end: position
            });
        }
        this.last_position = null;
    }

    private handle_click(event: MouseEvent): void {
        const position = this.get_mouse_position(event);
        this.click.emit(position);
    }

    private handle_double_click(event: MouseEvent): void {
        const position = this.get_mouse_position(event);
        this.double_click.emit(position);
    }
}

export { MouseEventHandler };
