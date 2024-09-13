import { Axis } from './axis.js';

class Axes {
    private xAxis: Axis;
    private yAxis: Axis;
  
    private isDragging = false;
    private dragStartX = 0;
    private dragStartY = 0;
    private originalXMin = 0;
    private originalXMax = 10;
    private originalYMin = 0;
    private originalYMax = 10;
  
    constructor(
      private ctx: CanvasRenderingContext2D,
      private x: number,
      private y: number,
      private width: number,
      private height: number
    ) {
      this.xAxis = new Axis(x, y + height, width, false, 0, 10);
      this.yAxis = new Axis(x, y, height, true, 0, 10);
      this.setupDragListeners();
    }
  
    private setupDragListeners() {
      this.ctx.canvas.addEventListener('mousedown', this.startDrag.bind(this));
      this.ctx.canvas.addEventListener('mousemove', this.drag.bind(this));
      this.ctx.canvas.addEventListener('mouseup', this.endDrag.bind(this));
      this.ctx.canvas.addEventListener('mouseleave', this.endDrag.bind(this));
    }
  
    private startDrag(event: MouseEvent) {
      this.isDragging = true;
      this.dragStartX = event.clientX;
      this.dragStartY = event.clientY;
      this.originalXMin = this.xAxis.getMin();
      this.originalXMax = this.xAxis.getMax();
      this.originalYMin = this.yAxis.getMin();
      this.originalYMax = this.yAxis.getMax();
    }
  
    private drag(event: MouseEvent) {
      if (!this.isDragging) return;
  
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
  
    private endDrag() {
      this.isDragging = false;
    }
  
    private showRangeInfo() {
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
  
    plot(x: number[], y: number[], options: any = {}) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.strokeStyle = options.color || 'blue';
      for (let i = 0; i < x.length; i++) {
        const [canvasX, canvasY] = this.dataToCanvas(x[i], y[i]);
        if (i === 0) {
          this.ctx.moveTo(canvasX, canvasY);
        } else {
          this.ctx.lineTo(canvasX, canvasY);
        }
      }
      this.ctx.stroke();
      this.ctx.restore();
    }
  
    scatter(x: number[], y: number[], options: any = {}) {
      const radius = options.s || 5;
      this.ctx.fillStyle = options.c || 'red';
      for (let i = 0; i < x.length; i++) {
        const [canvasX, canvasY] = this.dataToCanvas(x[i], y[i]);
        this.ctx.beginPath();
        this.ctx.arc(canvasX, canvasY, radius, 0, 2 * Math.PI);
        this.ctx.fill();
      }
    }
  
    set_xlim(min: number, max: number) {
      this.xAxis.setRange(min, max);
    }
  
    set_ylim(min: number, max: number) {
      this.yAxis.setRange(min, max);
    }
  
    set_xlabel(label: string) {
      this.xAxis.setLabel(label);
    }
  
    set_ylabel(label: string) {
      this.yAxis.setLabel(label);
    }
  
    private dataToCanvas(x: number, y: number): [number, number] {
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