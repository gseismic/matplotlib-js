import { Signal } from '../../utils/signal.js';

class KeyEventHandler {
    private canvas: HTMLCanvasElement;

    public key_down: Signal<KeyboardEvent> = new Signal();
    public key_up: Signal<KeyboardEvent> = new Signal();
    public key_press: Signal<KeyboardEvent> = new Signal();
    public key_repeat: Signal<KeyboardEvent> = new Signal();

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.setup_event_listeners();
    }
    
    private setup_event_listeners(): void {
        this.canvas.addEventListener('keydown', 
            (event: KeyboardEvent) => {
                this.key_down.emit(event);
                // 只在特定情况下阻止默认行为
                if (this.should_prevent_default(event)) {
                    event.preventDefault();
                }
            });
        this.canvas.addEventListener('keyup', 
            (event: KeyboardEvent) => {
                this.key_up.emit(event);
                // 只在特定情况下阻止默认行为
                if (this.should_prevent_default(event)) {
                    event.preventDefault();
                }
            });
        this.canvas.addEventListener('keypress', 
            (event: KeyboardEvent) => {
                this.key_press.emit(event);
                // 只在特定情况下阻止默认行为
                if (this.should_prevent_default(event)) {
                    event.preventDefault();
                }
            });
    }

    private should_prevent_default(event: KeyboardEvent): boolean {
        // 根据具体需求实现此方法
        return false; // 默认阻止
    }
}

export { KeyEventHandler };
