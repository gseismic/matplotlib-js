
class Point2DData {
    public length: number = 0;
    protected _x: number[] = [];
    protected _y: number[] = [];
    constructor(x: number[], y: number[]) {
        if(x.length != y.length) 
        {
            throw new Error("length of x and y must be same");
        }
        this._x = x;
        this._y = y;
        this.length = x.length;
    }

    get x(): number[] {
        return this._x;
    }

    get y(): number[] {
        return this._y;
    }   
}

class Line2DData extends Point2DData {}

export { Point2DData, Line2DData };
