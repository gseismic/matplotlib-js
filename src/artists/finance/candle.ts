// import { Drawable } from '../../core/drawable.js';
// import { Renderer2D } from '../../core/renderer/renderer2d.js';

// interface CandleData {
//     open: number;
//     high: number;
//     low: number;
//     close: number;
// }

// class Candle extends Drawable {
//     private data: CandleData[] | null = null;
//     private dataP: {x: number[], open: number[], high: number[], low: number[], close: number[]} | null = null;

//     constructor(open: number, high: number, low: number, close: number, options: any = {}) {
//         super();
//         this.data = [
//             {open: open, high: high, low: low, close: close}
//         ];
//     }

//     do_draw(renderer: Renderer2D): void {
//         if (this.dataP === null) {
//             return;
//         }
//         renderer.draw_rect(this.dataP.open, this.dataP.high, this.dataP.low, this.dataP.close, this.options);
//     }

//     bounding_box(): BoundingBox2D {
//         return new BoundingBox2D(this.x, this.y, this.width, this.height);
//     }
// }

// export { Candle };