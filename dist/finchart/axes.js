import { Axis } from './axis.js';
class Axes {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.originalXMin = 0;
        this.originalXMax = 10;
        this.originalYMin = 0;
        this.originalYMax = 10;
        this.xAxis = new Axis(x, y + height, width, false, 0, 10);
        this.yAxis = new Axis(x, y, height, true, 0, 10);
        this.setupDragListeners();
    }
    setupDragListeners() {
        this.ctx.canvas.addEventListener('mousedown', this.startDrag.bind(this));
        this.ctx.canvas.addEventListener('mousemove', this.drag.bind(this));
        this.ctx.canvas.addEventListener('mouseup', this.endDrag.bind(this));
        this.ctx.canvas.addEventListener('mouseleave', this.endDrag.bind(this));
    }
    startDrag(event) {
        this.isDragging = true;
        this.dragStartX = event.clientX;
        this.dragStartY = event.clientY;
        this.originalXMin = this.xAxis.getMin();
        this.originalXMax = this.xAxis.getMax();
        this.originalYMin = this.yAxis.getMin();
        this.originalYMax = this.yAxis.getMax();
    }
    drag(event) {
        if (!this.isDragging)
            return;
        const dx = event.clientX - this.dragStartX;
        const dy = event.clientY - this.dragStartY;
        const xRange = this.originalXMax - this.originalXMin;
        const yRange = this.originalYMax - this.originalYMin;
        const xShift = (dx / this.width) * xRange;
        const yShift = (dy / this.height) * yRange;
        this.xAxis.setRange(this.originalXMin - xShift, this.originalXMax - xShift);
        this.yAxis.setRange(this.originalYMin + yShift, this.originalYMax + yShift);
        this.draw();
        this.showRangeInfo();
    }
    endDrag() {
        this.isDragging = false;
    }
    showRangeInfo() {
        const xMin = this.xAxis.getMin().toFixed(2);
        const xMax = this.xAxis.getMax().toFixed(2);
        const yMin = this.yAxis.getMin().toFixed(2);
        const yMax = this.yAxis.getMax().toFixed(2);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(this.x + 10, this.y + 10, 150, 60);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(`X范围: ${xMin} - ${xMax}`, this.x + 20, this.y + 30);
        this.ctx.fillText(`Y范围: ${yMin} - ${yMax}`, this.x + 20, this.y + 50);
    }
    plot(x, y, options = {}) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = options.color || 'blue';
        for (let i = 0; i < x.length; i++) {
            const [canvasX, canvasY] = this.dataToCanvas(x[i], y[i]);
            if (i === 0) {
                this.ctx.moveTo(canvasX, canvasY);
            }
            else {
                this.ctx.lineTo(canvasX, canvasY);
            }
        }
        this.ctx.stroke();
        this.ctx.restore();
    }
    scatter(x, y, options = {}) {
        const radius = options.s || 5;
        this.ctx.fillStyle = options.c || 'red';
        for (let i = 0; i < x.length; i++) {
            const [canvasX, canvasY] = this.dataToCanvas(x[i], y[i]);
            this.ctx.beginPath();
            this.ctx.arc(canvasX, canvasY, radius, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }
    set_xlim(min, max) {
        this.xAxis.setRange(min, max);
    }
    set_ylim(min, max) {
        this.yAxis.setRange(min, max);
    }
    set_xlabel(label) {
        this.xAxis.setLabel(label);
    }
    set_ylabel(label) {
        this.yAxis.setLabel(label);
    }
    dataToCanvas(x, y) {
        const canvasX = this.xAxis.valueToPixel(x);
        const canvasY = this.yAxis.valueToPixel(y);
        return [canvasX, canvasY];
    }
    draw() {
        this.xAxis.draw(this.ctx);
        this.yAxis.draw(this.ctx);
    }
}
export { Axes };
