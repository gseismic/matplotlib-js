import { Scene } from './scene.js';
import { Canvas, MarginOptions } from './canvas.js';
import { Renderer2D } from './renderer/renderer2d.js';
import { Axes } from './axes.js';
import { Point } from './types/point.js';

class Figure extends Canvas {
  private renderer: Renderer2D;
  private scenes: Scene[] = [];
  private client_rect: [number, number, number, number];

  constructor(canvas_id: string, options: Partial<MarginOptions> = {}, use_parent_size: boolean = true) {
    super(canvas_id, options, use_parent_size);
    this.client_rect = [
      this.options.margin_left,
      this.options.margin_top,
      this.width - this.options.margin_right - this.options.margin_left,
      this.height - this.options.margin_bottom - this.options.margin_top
    ];
    this.renderer = new Renderer2D(this.context);
    this.setup_event_listeners();
  }

  // FUTURE TODO
  // set_options(options: any): void {
  //   this.options = options;
  // }

  add_subplot(nrows: number, ncols: number, i_row: number, i_col: number, 
              wspace: number = 20, hspace: number = 20): Axes 
  {
    let x = this.client_rect[0] + i_col * (this.client_rect[2] + wspace) / ncols;
    let y = this.client_rect[1] + i_row * (this.client_rect[3] + hspace) / nrows;
    let width = (this.client_rect[2] - (ncols - 1) * wspace) / ncols;
    let height = (this.client_rect[3] - (nrows - 1) * hspace) / nrows;

    const axes = new Axes({x, y, width, height});
    this.scenes.push(axes);
    this.scenes.sort((a, b) => a.zorder - b.zorder);

    return axes;
  }

  draw(): void {
    this.renderer.clear_rect(0, 0, this.width, this.height);
    for (const scene of this.scenes) {
      scene.render(this.renderer, false); // clear: false
    }
    this.renderer.flush();
  }

  setup_event_listeners(): void {
    this.key_event_handler.key_down.connect(this.on_key_down.bind(this));
    this.mouse_event_handler.mouse_move.connect(this.on_mouse_move.bind(this));
  }

  on_key_down(event: KeyboardEvent): void {
    /*
    key_down在按下时就触发,key_press在释放时触发
    key_down可以捕获所有按键,key_press只捕获可打印字符
    key_down可能会重复触发,key_press只触发一次
    */
    console.log(event);
  }

  on_mouse_move(position: Point): void {
    console.log(position);
  }
}

export { Figure };
