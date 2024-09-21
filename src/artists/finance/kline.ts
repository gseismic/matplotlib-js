// import { Drawable } from '../../core/drawable.js';
// import { Renderer } from '../../core/renderer/renderer2d.js';
// import { Viewport } from '../../backup/viewport.js';
// import { Line2D } from '../line2d.js';

// interface KLineData {
//     open: number;
//     high: number;
//     low: number;
//     close: number;
//     timestamp: number;
// }

// class KLine extends Drawable {
//     private data: KLineData[] | null = null;
//     private dataP: {x: number[], open: number[], high: number[], low: number[], close: number[]} | null = null;
//     private bodyLine: Line2D;
//     private wickLine: Line2D;

//     constructor(data: KLineData[], options: any = {}) {
//         super(0, 0);
//         this.setData(data);
//         this.options = options;
//         this.bodyLine = new Line2D([], [], { color: 'green' });
//         this.wickLine = new Line2D([], [], { color: 'black' });
//     }

//     setData(data: KLineData[]): void {
//         this.data = data;
//         this.onDataChanged(data);
//     }

//     onDataChanged(data: KLineData[]): void {
//         if (!data || data.length === 0) return;
        
//         const x = data.map(d => d.timestamp);
//         const open = data.map(d => d.open);
//         const high = data.map(d => d.high);
//         const low = data.map(d => d.low);
//         const close = data.map(d => d.close);

//         this.data = { x, open, high, low, close };
//     }

//     onViewportChanged(viewport: Viewport): void {
//         if (!this.data) return;

//         const { x, open, high, low, close } = this.data;
//         const [xP, openP] = viewport.dataToCanvasBatch(x, open);
//         const [, highP] = viewport.dataToCanvasBatch(x, high);
//         const [, lowP] = viewport.dataToCanvasBatch(x, low);
//         const [, closeP] = viewport.dataToCanvasBatch(x, close);

//         this.dataP = { x: xP, open: openP, high: highP, low: lowP, close: closeP };
//     }

//     onOptionsChanged(options: any): void {
//         // 在这个类中不需要实现
//     }

//     draw(renderer: Renderer, viewport: Viewport): void {
//         if (!this.dataP) return;

//         const { x, open, high, low, close } = this.dataP;
//         const candleWidth = this.options.candleWidth || 5;

//         for (let i = 0; i < x.length; i++) {
//             const isUp = close[i] >= open[i];
//             const color = isUp ? 'green' : 'red';

//             // 绘制K线实体
//             renderer.drawRect(
//                 x[i] - candleWidth / 2,
//                 Math.min(open[i], close[i]),
//                 candleWidth,
//                 Math.abs(close[i] - open[i]),
//                 { fillStyle: color }
//             );

//             // 绘制上下影线
//             renderer.drawLine(x[i], low[i], x[i], high[i], { strokeStyle: color });
//         }
//     }

//     boundingRect(): { x: number; y: number; width: number; height: number } {
//         if (!this.dataP) {
//             return { x: 0, y: 0, width: 0, height: 0 };
//         }
//         const { x, high, low } = this.dataP;
//         const minX = Math.min(...x);
//         const maxX = Math.max(...x);
//         const minY = Math.min(...low);
//         const maxY = Math.max(...high);
//         return {
//             x: minX,
//             y: minY,
//             width: maxX - minX,
//             height: maxY - minY
//         };
//     }
// }

// export { KLine, KLineData };
