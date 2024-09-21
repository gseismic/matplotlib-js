import { BaseData } from './base_data.js';

// SeriesData 类
class SeriesData extends BaseData {
    constructor(data: { [key: string]: any[] }) {
        super(data);
    }

    get_data(): { [key: string]: any[] } {
        return this._data;
    }

    set_data(data: { [key: string]: any[] }): void {
        this._data = data;
    }
}

export { SeriesData };
