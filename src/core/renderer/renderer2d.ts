import { Renderer } from './renderer.js';   
import { ImageDrawer } from './image_drawer.js';
import {
    Line2DOptions, 
    Text2DOptions, 
    Rectangle2DOptions,
    Circle2DOptions, 
    Point2DOptions, 
    Ellipse2DOptions,
    Polygon2DOptions
} from './options2d.js';

interface Render2DOptions {
    strokeStyle?: string;
    fillStyle?: string;
    lineWidth?: number;
    lineCap?: CanvasLineCap; // butt, round, square
    lineDash?: number[];
    font?: string;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
}

class Renderer2D extends Renderer {
    public context: CanvasRenderingContext2D;
    private imageDrawer: ImageDrawer;

    private defaultOptions: Render2DOptions = {
        strokeStyle: 'black',
        fillStyle: 'black',
        lineWidth: 1,
        lineCap: 'butt',
        font: '12px Arial',
        textAlign: 'left',
        textBaseline: 'top'
    };

    private defaultLineOptions: Line2DOptions = {
        line_width: 1,
        color: 'black',
        line_style: 'solid',
        line_cap: 'butt'
    };

    private defaultPointOptions: Point2DOptions = {
        size: 2,
        color: 'black',
        edge_color: 'black',
        edge_width: 1
    };

    private defaultCircleOptions: Circle2DOptions = {
        fill_color: 'black',
        edge_color: 'black',
        edge_width: 1
    };

    private defaultEllipseOptions: Ellipse2DOptions = {
        fill_color: 'black',
        edge_color: 'black',
        edge_width: 1
    };

    private defaultRectangleOptions: Rectangle2DOptions = {
        fill_color: 'black',
        edge_color: 'black',
        edge_width: 1
    };

    private defaultPolygonOptions: Polygon2DOptions = {
        fill_color: 'black',
        edge_color: 'black',
        edge_width: 1   
    };

    private defaultTextOptions: Text2DOptions = {
        font_size: 12,
        font_family: 'Arial',
        font_color: 'black',
        text_align: 'left',
        text_baseline: 'top'
    };

    constructor(context: CanvasRenderingContext2D, options?: Partial<Render2DOptions>) {
        super();
        this.context = context;
        this.defaultOptions = { ...this.defaultOptions, ...options };
        this.imageDrawer = new ImageDrawer(context);
    }

    flush(): void {}

    private apply_options(options?: Partial<Render2DOptions>) {
        const appliedOptions = { ...this.defaultOptions, ...options };
        Object.assign(this.context, appliedOptions);
    }

    clear() {
        this.clear_rect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    clear_rect(x: number, y: number, width: number, height: number) {
        this.context.clearRect(x, y, width, height);
    }

    translate(x: number, y: number) {
        this.context.translate(x, y);
    }

    rotate(angle: number) {
        this.context.rotate(angle);
    }

    scale(x: number, y: number) {
        this.context.scale(x, y);
    }

    save() {
        this.context.save();
    }

    restore() {
        this.context.restore();
    }

    private mplStyleToLineDash(style: string): number[] {
        switch (style) {
            case '-':    return [];  // 实线
            case '--':   return [6, 6];  // 虚线
            case '-.':   return [6, 4, 2, 4];  // 点划线
            case ':':    return [2, 4];  // 点线
            case ' ':    return [0, 6];  // 无线（空格）
            case 'solid':       return [];  // 实线
            case 'dashed':      return [6, 6];  // 虚线
            case 'dashdot':     return [6, 4, 2, 4];  // 点划线
            case 'dotted':      return [2, 4];  // 点线
            case 'loosely dotted':     return [2, 6];  // 稀疏点线
            case 'densely dotted':     return [2, 2];  // 密集点线
            case 'loosely dashed':     return [6, 8];  // 稀疏虚线
            case 'densely dashed':     return [4, 4];  // 密集虚线
            case 'loosely dashdotted': return [6, 8, 2, 8];  // 稀疏点划线
            case 'densely dashdotted': return [4, 4, 2, 4];  // 密集点划线
            default:     return [];  // 默认实线
        }
    }

    apply_line_options(options?: Partial<Line2DOptions>) {
        options = { ...this.defaultLineOptions, ...options };
        let canvas_options: Partial<Render2DOptions> = { }
        if (options?.color) {
            canvas_options["strokeStyle"] = options.color;
        }
        if (options?.line_width) {
            canvas_options["lineWidth"] = options.line_width;
        }
        if (options?.line_cap) {
            canvas_options["lineCap"] = options.line_cap;
        }
        if (options?.line_style) {
            canvas_options["lineDash"] = this.mplStyleToLineDash(options.line_style);
        }
        this.apply_options(canvas_options);
    }

    draw_line(x1: number, y1: number, x2: number, y2: number, options?: Partial<Line2DOptions>) {
        this.context.save();
        this.apply_line_options(options);
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
        this.context.restore();
        return this;
    }

    draw_lines(xs: number[], ys: number[], options?: Partial<Line2DOptions>) {  
        if (xs.length !== ys.length) {
            throw new Error('size of xs and ys must be the same');
        }
        this.context.save();
        this.apply_line_options(options);
        this.context.beginPath();
        this.context.moveTo(xs[0], ys[0]);
        for (let i = 1; i < xs.length; i++) {
            this.context.lineTo(xs[i], ys[i]);
        }
        this.context.stroke();
        this.context.restore();
        return this;
    }

    draw_strip_lines(xs: number[], ys: number[], options?: Partial<Line2DOptions>) {
        if (xs.length !== ys.length) {
            throw new Error('size of xs and ys must be the same');
        }
        this.context.save();
        this.apply_line_options(options);
        this.context.beginPath();
        let n = Math.floor(xs.length/2);
        for (let i = 0; i < n; i++) {
            this.context.moveTo(xs[2*i], ys[2*i]);
            this.context.lineTo(xs[2*i+1], ys[2*i+1]);
        }
        this.context.stroke();
        this.context.restore();
        return this;
    }

    apply_point_options(options?: Partial<Point2DOptions>) {
        options = { ...this.defaultPointOptions, ...options };  
        let canvas_options: Partial<Render2DOptions> = {};
        if (options?.color) {
            canvas_options["fillStyle"] = options.color;
        }
        if (options?.edge_color) {
            canvas_options["strokeStyle"] = options.edge_color;
        }
        if (options?.edge_width) {
            canvas_options["lineWidth"] = options.edge_width;
        }
        this.apply_options(canvas_options);
    }

    draw_point(x: number, y: number, options?: Partial<Point2DOptions>) {
        this.context.save();
        this.apply_point_options(options);
        let radius = (options?.size) ?? this.defaultPointOptions.size;
        // Note: a ?? b:如果 a 是 null 或 undefined，则返回 b
        // if a is null or undefined, return b
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.restore();
        return this;
    }   

    draw_points(xs: number[], ys: number[], options?: Partial<Point2DOptions>) {
        this.context.save();
        this.apply_point_options(options);
        let radius = (options?.size) ?? this.defaultPointOptions.size;
        for (let i = 0; i < xs.length; i++) {
            this.context.beginPath();
            this.context.arc(xs[i], ys[i], radius, 0, 2 * Math.PI);
            this.context.fill();
            this.context.stroke();
        }
        this.context.restore();
        return this;
    }

    apply_circle_like_options(
        default_options: Partial<Circle2DOptions>, 
        options?: Partial<Circle2DOptions>, 
        enforce_fill: boolean = false,  
        enforce_stroke: boolean = false
    ) {
        options = { ...default_options, ...options };
        let do_fill = false;
        let do_stroke = false;
        let canvas_options: Partial<Render2DOptions> = {};
        if (options?.fill_color) {
            canvas_options["fillStyle"] = options.fill_color;
            do_fill = enforce_fill || true;
        }
        if (options?.edge_color) {
            canvas_options["strokeStyle"] = options.edge_color;
            do_stroke = enforce_stroke || true;
        }
        if (options?.edge_width) {
            canvas_options["lineWidth"] = options.edge_width;
        }
        this.apply_options(canvas_options);
        return [do_fill, do_stroke];
    }

    draw_circle(x: number, y: number, radius: number, options?: Partial<Circle2DOptions>) {
        this.context.save();
        const [do_fill, do_stroke] = this.apply_circle_like_options(this.defaultCircleOptions, options, false, false);
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        if (do_fill) {
            this.context.fill();
        }
        if (do_stroke) {
            this.context.stroke();
        }
        this.context.restore();
        return this;
    }

    draw_circles(xs: number[], ys: number[], rs: number[], options?: Partial<Circle2DOptions>) {
        this.context.save();
        const [do_fill, do_stroke] = this.apply_circle_like_options(this.defaultCircleOptions, options, false, false);
        this.context.beginPath();
        for (let i = 0; i < xs.length; i++) {
            this.context.arc(xs[i], ys[i], rs[i], 0, 2 * Math.PI);
        }
        //arc()方法本身就会创建一个完整的圆形路径。当你指定起始角度为0，结束角度为2π（完整的圆）时，路径已经是闭合的。
        // fill()方法会自动闭合路径。即使路径没有显式闭合，填充操作也会将起点和终点连接起来。
        // 对于描边操作，由于圆形路径已经是闭合的，stroke()会正确地描绘整个圆周。
        if (do_fill) {
            this.context.fill();
        }
        if (do_stroke) {
            this.context.stroke();
        }
        this.context.restore();
        return this;
    }

    draw_rect(x: number, y: number, width: number, height: number, options?: Partial<Rectangle2DOptions>) {
        this.context.save();
        const [do_fill, do_stroke] = this.apply_circle_like_options(this.defaultRectangleOptions, options, false, false);
        if (do_fill) {
            this.context.fillRect(x, y, width, height);
        }
        if (do_stroke) {
            this.context.strokeRect(x, y, width, height);
        }
        this.context.restore();
        return this;
    }

    draw_rects(xs: number[], ys: number[], widths: number[], heights: number[], options?: Partial<Rectangle2DOptions>) {
        this.context.save();
        const [do_fill, do_stroke] = this.apply_circle_like_options(this.defaultRectangleOptions, options, false, false);
        if (do_fill) {
            for (let i = 0; i < xs.length; i++) {
                this.context.fillRect(xs[i], ys[i], widths[i], heights[i]);
            }
        }
        if (do_stroke) {
            for (let i = 0; i < xs.length; i++) {
                this.context.strokeRect(xs[i], ys[i], widths[i], heights[i]);
            }
        }  
        this.context.restore();
        return this;
    }

    draw_ellipsis(x: number, y: number, rx: number, ry: number, options?: Partial<Ellipse2DOptions>) {
        this.context.save();
        const [do_fill, do_stroke] = this.apply_circle_like_options(this.defaultEllipseOptions, options, false, false);
        this.context.beginPath();
        this.context.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
        if (do_fill) {
            this.context.fill();
        }
        if (do_stroke) {
            this.context.stroke();
        }
        this.context.restore();
        return this;
    }

    draw_ellipses(xs: number[], ys: number[], rx: number[], ry: number[], options?: Partial<Ellipse2DOptions>) {
        this.context.save();
        const [do_fill, do_stroke] = this.apply_circle_like_options(this.defaultEllipseOptions, options, false, false);
        this.context.beginPath();
        for (let i = 0; i < xs.length; i++) {
            this.context.ellipse(xs[i], ys[i], rx[i], ry[i], 0, 0, 2 * Math.PI);
        }
        if (do_fill) {
            this.context.fill();
        }
        if (do_stroke) {
            this.context.stroke();
        }
        this.context.restore();
        return this;
    }

    draw_polygon(points: [number, number][] | number[], options?: Partial<Polygon2DOptions>) {
        this.context.save();
        const [do_fill, do_stroke] = this.apply_circle_like_options(this.defaultPolygonOptions, options, false, false);
        this.context.beginPath();
        if (Array.isArray(points[0])) {
            // 如果输入是[x, y]对的数组
            const typedPoints = points as [number, number][];
            this.context.moveTo(typedPoints[0][0], typedPoints[0][1]);
            for (let i = 1; i < typedPoints.length; i++) {
                this.context.lineTo(typedPoints[i][0], typedPoints[i][1]);
            }
        } else {
            // 如果输入是平铺的数字数组
            const flatPoints = points as number[];
            this.context.moveTo(flatPoints[0], flatPoints[1]);
            for (let i = 2; i < flatPoints.length; i += 2) {
                this.context.lineTo(flatPoints[i], flatPoints[i + 1]);
            }
        }
        this.context.closePath();
        if (do_fill) {
            this.context.fill();
        }
        if (do_stroke) {
            this.context.stroke();
        }
        
        this.context.restore();
        return this;
    }

    draw_polygons(polygons: ([number, number][] | number[])[], options?: Partial<Polygon2DOptions>) {
        this.context.save();
        const [do_fill, do_stroke] = this.apply_circle_like_options(this.defaultPolygonOptions, options, false, false);
        this.context.beginPath();
        
        for (const polygon of polygons) {
            if (Array.isArray(polygon[0])) {
                // 如果是[x, y]对的数组
                const typedPoints = polygon as [number, number][];
                this.context.moveTo(typedPoints[0][0], typedPoints[0][1]);
                for (let i = 1; i < typedPoints.length; i++) {
                    this.context.lineTo(typedPoints[i][0], typedPoints[i][1]);
                }
            } else {
                // 如果是平铺的数字数组
                const flatPoints = polygon as number[];
                this.context.moveTo(flatPoints[0], flatPoints[1]);
                for (let i = 2; i < flatPoints.length; i += 2) {
                    this.context.lineTo(flatPoints[i], flatPoints[i + 1]);
                }
            }
            this.context.closePath();
        }
        
        if (do_fill) {
            this.context.fill();
        }
        if (do_stroke) {
            this.context.stroke();
        }
        
        this.context.restore();
        return this;
    }

    apply_text_options(options?: Partial<Text2DOptions>) {
        options = { ...this.defaultTextOptions, ...options };
        let canvas_options: Partial<Render2DOptions> = {};
        if (options?.font_size) {
            canvas_options["font"] = `${options.font_size}px ${options.font_family}`;
        }
        if (options?.font_color) {
            canvas_options["fillStyle"] = options.font_color;
        }   
        if (options?.text_align) {
            canvas_options["textAlign"] = options.text_align;
        }
        if (options?.text_baseline) {
            canvas_options["textBaseline"] = options.text_baseline;
        }
        this.apply_options(canvas_options);
    }

    draw_text(text: string, x: number, y: number, options?: Partial<Text2DOptions>) {
        this.context.save();
        this.apply_text_options(options);
        this.context.fillText(text, x, y);
        // this.context.strokeText(text, x, y);
        this.context.restore();
        return this;
    }

    draw_texts(xs: number[], ys: number[], texts: string[], options?: Partial<Text2DOptions>) : Renderer2D {
        this.context.save();
        this.apply_text_options(options);
        for (let i = 0; i < xs.length; i++) {
            this.context.fillText(texts[i], xs[i], ys[i]);
        }
        this.context.restore();
        return this;
    }

    draw_image(
        image: CanvasImageSource,
        dx: number, dy: number,
        dWidth?: number, dHeight?: number,
        sx?: number, sy?: number, sWidth?: number, sHeight?: number
    ) : Renderer2D {
        this.imageDrawer.draw(image, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
        return this;
    }
}


export { Renderer2D };