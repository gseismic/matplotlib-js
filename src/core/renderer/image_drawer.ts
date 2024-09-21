class ImageDrawer {
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    // 绘制整个图像 | draw full
    draw_full(image: CanvasImageSource, dx: number, dy: number): void {
        this.context.drawImage(image, dx, dy);
    }

    // 绘制图像并指定大小 | draw with specified size
    draw_scaled(image: CanvasImageSource, dx: number, dy: number, dWidth: number, dHeight: number): void {
        this.context.drawImage(image, dx, dy, dWidth, dHeight);
    }

    // 裁剪源图像并绘制到目标位置 | crop and draw
    draw_cropped(
        image: CanvasImageSource, 
        sx: number, sy: number, sWidth: number, sHeight: number,
        dx: number, dy: number, dWidth: number, dHeight: number
    ): void {
        this.context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }

    // 综合方法,根据参数数量自动选择绘制方式 | draw with auto selection
    draw(
        image: CanvasImageSource,
        dx: number, dy: number,
        dWidth?: number, dHeight?: number,
        sx?: number, sy?: number, sWidth?: number, sHeight?: number
    ): void {
        if (sx !== undefined && sy !== undefined && sWidth !== undefined && sHeight !== undefined) {
            this.draw_cropped(image, sx, sy, sWidth, sHeight, dx, dy, dWidth!, dHeight!);
        } else if (dWidth !== undefined && dHeight !== undefined) {
            this.draw_scaled(image, dx, dy, dWidth, dHeight);
        } else {
            this.draw_full(image, dx, dy);
        }
    }
}

export { ImageDrawer };