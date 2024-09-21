// import { Drawable } from '../core/drawable.js';
// import { Renderer2D } from '../core/renderer/renderer2d.js';
// import { Viewport } from '../backup/viewport.js';
// import { BoundingBox2D } from '../core/bounding_box.js';

// class Line2DData {
//     public length: number = 0;
//     xs: number[];
//     ys: number[];
//     constructor(xs: number[], ys: number[]) {
//         if(xs.length != ys.length) 
//         {
//             throw new Error("xs 和 ys 的长度必须相同");
//         }
//         this.xs = xs;
//         this.ys = ys;
//         this.length = xs.length;
//     }
// }

// class Line2D extends Drawable {
//     // private xdata: number[] = [];
//     // private ydata: number[] = [];
//     // private xdataP: number[] | null = null;
//     // private ydataP: number[] | null = null;
//     // private data: {xdata: number[], ydata: number[]} | null = null;
//     // protected data:
//     private dataP: {xdata: number[], ydata: number[]} | null = null;    
//     protected options: any; // 将 private 改为 protected

//     constructor(xdata: number[], ydata: number[], options: any = {}) {
//         super()
//         this.set_data({xdata, ydata});
//         this.options = options;
//     }

//     after_transform_changed(transform: Transform): void {
//         console.log('on_viewport_changed ..');
//         // const [xdataP, ydataP]  = viewport.dataToCanvasBatch(this.data.xdata, this.data.ydata);
//         // this.dataP = {xdata: xdataP, ydata: ydataP};
//     }

//     do_draw(renderer: Renderer2D): void {
//         console.log('draw line2d');
//         console.log('px', this.dataP);
//         if (this.dataP) {
//             renderer.draw_lines(this.dataP.xdata, this.dataP.ydata, this.options);
//         }
//     }

//     bounding_box(): BoundingBox2D {
//         if (!this.dataP) {
//             return new BoundingBox2D(0, 0, 0, 0);
//         }
//         // 简单实现，返回数据的边界
//         const minX = Math.min(...this.dataP.xdata);
//         const maxX = Math.max(...this.dataP.xdata);
//         const minY = Math.min(...this.dataP.ydata);
//         const maxY = Math.max(...this.dataP.ydata);
//         return {
//             x: minX,
//             y: minY,
//             width: maxX - minX,
//             height: maxY - minY
//         };
//     }

//     after_data_changed(data: any): void {
//         // 在这个类中不需要实现
//         // console.log('Line2D', data.xdata, data.ydata);
//     }

//     after_options_changed(options: any): void {
//         // 在这个类中不需要实现
//     }
// }

// export { Line2D };
