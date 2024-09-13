import { Axes } from './axes.js';
class Figure {
    constructor(canvasId) {
        this.objects = [];
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.setupEventListeners();
        this.axes = new Axes(this.ctx, 50, 50, this.canvas.width - 100, this.canvas.height - 100);
    }
    add_subplot(nrows, ncols, index) {
        // 简化实现,暂时只支持单个子图
        return this.axes;
    }
    show() {
        this.axes.draw();
    }
    setupEventListeners() {
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        // ... 其他事件监听器
    }
    handleMouseMove(event) {
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
    add(obj) {
        this.objects.push(obj);
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const obj of this.objects) {
            obj.draw(this.ctx);
        }
    }
}
// ... 实现各种图形类,如Line, Circle, Rectangle等
// ... 实现各种图表类,如LineChart, BarChart等
export { Figure };
