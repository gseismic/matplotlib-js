import { Signal } from '../../utils/signal.js';

class KeyEventHandler {
    private canvas: HTMLCanvasElement;

    public key_down: Signal<KeyboardEvent> = new Signal();
    public key_up: Signal<KeyboardEvent> = new Signal();
    public key_press: Signal<KeyboardEvent> = new Signal();

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.setup_event_listeners();
    }

    private setup_event_listeners(): void {
        this.canvas.addEventListener('keydown', this.handle_key_down.bind(this));
        this.canvas.addEventListener('keyup', this.handle_key_up.bind(this));
        this.canvas.addEventListener('keypress', this.handle_key_press.bind(this));
    }

    private handle_key_down(event: KeyboardEvent): void {
        this.key_down.emit(event);
    }

    private handle_key_up(event: KeyboardEvent): void {
        this.key_up.emit(event);
    }

    private handle_key_press(event: KeyboardEvent): void {
        this.key_press.emit(event);
    }
}

export { KeyEventHandler };
