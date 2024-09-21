
// 数据基类
abstract class BaseData {
    protected _data: { [key: string]: any };

    constructor(data: { [key: string]: any }) {
        this._data = data;
    }

    abstract get_data(): { [key: string]: any };
    abstract set_data(data: { [key: string]: any }): void;
}

export { BaseData };



