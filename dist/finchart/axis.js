class Axis {
    constructor(x, y, length, isVertical, min, max) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.isVertical = isVertical;
        this.min = 0;
        this.max = 10;
        this.label = '';
        this.setRange(min, max);
    }
    setRange(min, max) {
        this.min = min;
        this.max = max;
    }
    setLabel(label) {
        this.label = label;
    }
    valueToPixel(value) {
        const ratio = (value - this.min) / (this.max - this.min);
        return this.isVertical
            ? this.y + this.length - (ratio * this.length)
            : this.x + (ratio * this.length);
    }
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        if (this.isVertical) {
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
        }
        else {
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.length, this.y);
        }
        ctx.stroke();
        // 绘制刻度和标签
        const ticks = 5;
        for (let i = 0; i <= ticks; i++) {
            const value = this.min + (this.max - this.min) * (i / ticks);
            const position = this.length * (i / ticks);
            if (this.isVertical) {
                ctx.moveTo(this.x - 5, this.y + this.length - position);
                ctx.lineTo(this.x + 5, this.y + this.length - position);
                ctx.fillText(value.toFixed(1), this.x - 30, this.y + this.length - position);
            }
            else {
                ctx.moveTo(this.x + position, this.y - 5);
                ctx.lineTo(this.x + position, this.y + 5);
                ctx.fillText(value.toFixed(1), this.x + position, this.y + 20);
            }
        }
        ctx.stroke();
        ctx.restore();
        // 绘制轴标签
        if (this.label) {
            ctx.save();
            if (this.isVertical) {
                ctx.translate(this.x - 40, this.y + this.length / 2);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText(this.label, 0, 0);
            }
            else {
                ctx.fillText(this.label, this.x + this.length / 2, this.y + 40);
            }
            ctx.restore();
        }
    }
    getMin() {
        return this.min;
    }
    getMax() {
        return this.max;
    }
}
export { Axis };