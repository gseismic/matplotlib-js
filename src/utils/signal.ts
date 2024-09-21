class Signal<T = any> {
    private listeners: Array<{ listener: (data: T) => void, priority: number }> = [];

    /**
     * 连接事件监听器，可以指定优先级 | connect listener with priority
     * @param listener - 监听器函数 | listener function
     * @param priority - 优先级，数字越大优先级越高，默认为0 | higher is better
     */
    connect(listener: (data: T) => void, priority: number = 0): void {
        const listenerWithPriority = { listener, priority };
        this.listeners.push(listenerWithPriority);
        this.listeners.sort((a, b) => b.priority - a.priority);
    }

    /**
     * 断开事件监听器 | disconnect listener
     * @param listener - 要移除的监听器函数 | listener function to remove
     */
    disconnect(listener: (data: T) => void): void {
        this.listeners = this.listeners.filter(l => l.listener !== listener);
    }

    /**
     * 触发事件，调用所有监听器 | emit signal to all listeners
     * @param data - 传递给监听器的数据 | data to pass to listeners
     */
    emit(data: T): void {
        this.listeners.forEach(({listener}) => listener(data));
    }
}

export { Signal };