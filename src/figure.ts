import { Axes } from './axes.js';

class Figure {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private axes: Axes;
  private objects: DrawableObject[] = [];

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.setupEventListeners();
    this.axes = new Axes(this.ctx, 50, 50, this.canvas.width - 100, this.canvas.height - 100);
  }

  add_subplot(nrows: number, ncols: number, index: number): Axes {
    // 简化实现,暂时只支持单个子图
    return this.axes;
  }

  show() {
    this.axes.draw();
  }

  private setupEventListeners() {
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    // ... 其他事件监听器
  }

  private handleMouseMove(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    for (const obj of this.objects) {
      if (obj.isPointInside(x, y)) {
        console.log(`鼠标在 ${obj.constructor.name} 内`);
        break;
      }
    }
  }

  add(obj: DrawableObject) {
    this.objects.push(obj);
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const obj of this.objects) {
      obj.draw(this.ctx);
    }
  }
}

interface DrawableObject {
  bounding_rect(): { x: number, y: number, width: number, height: number };
  draw(ctx: CanvasRenderingContext2D): void;
  isPointInside(x: number, y: number): boolean;
}

// ... 实现各种图形类,如Line, Circle, Rectangle等
// ... 实现各种图表类,如LineChart, BarChart等

export { Figure };
