

function set_canvas_size(canvas: HTMLCanvasElement, use_parent_size=true)
{
    // let dpi = window.devicePixelRatio || 1;
    let dpi = 1;
    // 如果设置了自动宽高的话，则就宽高设为父元素的宽高
    // width 和 height 是 canvas 的实际像素大小
    let width = 0;
    let height = 0;
    if (use_parent_size) {
        const parent = canvas.parentNode as HTMLElement | null;
        if (!parent) {
            throw new Error('canvas.parentNode is null');
        }
        // offsetWidth 是一个 DOM 属性，用来获取元素的可见宽度。它包含了内容的宽度、内边距（padding）、边框（border）和垂直滚动条的宽度，但不包括外边距（margin）。
        // 因此，canvas.parentNode.offsetWidth 是 canvas 的父元素的可见宽度。
        width = canvas.width = parent.offsetWidth * dpi;
        height = canvas.height = parent.offsetHeight * dpi;
        canvas.setAttribute('style', 'width:' + parent.offsetWidth + 'px;height:' + parent.offsetHeight + 'px;')
    } else {
        // canvas.style.width 决定了 canvas 在网页上显示的大小，影响其外观但不改变绘图的分辨率。
        // canvas.width 决定了 canvas 的实际绘图像素，影响图像的清晰度和分辨率。
        canvas.setAttribute('style', 'width:' + canvas.width + 'px;height:' + canvas.height + 'px;');
        canvas.width *= dpi;
        canvas.height *= dpi;
        width = canvas.width; 
        height = canvas.height;
    }
    return [width, height];
}

export { set_canvas_size };
