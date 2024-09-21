import { SeriesData } from './series_data.js';

// XYSeriesData 类
class XYSeriesData extends SeriesData {
    constructor(data: { x: any[], y: any[] }) {
        super(data);
    }

    get_data(): { x: any[], y: any[] } {
        return this._data;
    }

    set_data(data: { x: any[], y: any[] }): void {
        this._data = data;
    }

    get_x_data(): any[] {
        return this._data.x;
    }

    get_y_data(): any[] {
        return this._data.y;
    }
}

export { XYSeriesData };
