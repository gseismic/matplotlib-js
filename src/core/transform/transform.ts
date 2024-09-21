
abstract class Transform {
    abstract transform(x: number, y: number): [number, number];
    abstract inverse_transform(x_p: number, y_p: number): [number, number];
}

/**
 * 数据变换类 | Data Transformation Class
 * 
 * 用于将数据坐标转换为绘图坐标，或将绘图坐标转换为数据坐标 | 
 * Used to convert data coordinates to plotting coordinates, or plotting coordinates to data coordinates    
 * 
 */
abstract class Transform2D extends Transform {
    protected x: number; // 原点x坐标 | Origin X Coordinate
    protected y: number; // 原点y坐标 | Origin Y Coordinate
    protected width: number; // 变换后的宽度 | Transformed Width
    protected height: number; // 变换后的高度 | Transformed Height
    protected xlim: [number, number] = [0, 1]; // x轴范围 | X Axis Range
    protected ylim: [number, number] = [0, 1]; // y轴范围 | Y Axis Range

    constructor(x: number, y: number, width: number, height: number) {
        super();
        this.x = x;
        this.y = y;
        this.width = width; 
        this.height = height;
    }

    // 将数据坐标转换为绘图坐标 | Convert Data Coordinates to Plotting Coordinates
    abstract transform(x: number, y: number): [number, number];
    abstract transform_x(x: number): number;
    abstract transform_y(y: number): number;

    // 将绘图坐标转换为数据坐标 | Convert Plotting Coordinates to Data Coordinates
    abstract inverse_transform(x_p: number, y_p: number): [number, number];

    set_position(x: number, y: number, width: number, height: number): void {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // 设置x轴范围 | Set X Axis Range
    set_xlim(xlim: [number, number]): void {
        this.xlim = xlim;
        this.after_set_xlim(xlim);
    }

    // 设置y轴范围 | Set Y Axis Range
    set_ylim(ylim: [number, number]): void {
        this.ylim = ylim;
        this.after_set_ylim(ylim);
    }

    // 设置x轴范围之后调用 | Called after setting X Axis Range
    after_set_xlim(xlim: [number, number]): void {
    }

    // 设置y轴范围之后调用 | Called after setting Y Axis Range
    after_set_ylim(ylim: [number, number]): void {
    }

    public get_xlim(): [number, number] {
        return this.xlim;
    }

    public get_ylim(): [number, number] { 
        return this.ylim;
    }

    public get_rect(): [number, number, number, number] {
        return [this.x, this.y, this.width, this.height];
    }
}


export {Transform, Transform2D };