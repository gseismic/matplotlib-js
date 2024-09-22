

class Line2DOptions {
    color: string = 'black';
    line_width: number = 1;
    line_style: string = 'solid';
    line_cap: CanvasLineCap = 'butt';
}

class Point2DOptions {
    color: string = 'black';
    size: number = 2;
    edge_color: string = 'black';
    edge_width: number = 1;
}

// note: no edge_type, we need it? 
class Circle2DOptions {
    fill_color: string = 'black';
    edge_color: string = 'black';
    edge_width: number = 1;
}

class Ellipse2DOptions extends Circle2DOptions {}
class Rectangle2DOptions extends Circle2DOptions {}
class Polygon2DOptions extends Circle2DOptions {}

// http://www.staroceans.org/w3c/canvas_textbaseline.asp.1.html#gsc.tab=0
// textBaseLine: top, hanging, middle, alphabetic, ideographic, bottom
// textBaseline 属性可以取以下几个值：
// top: 文本em方框的顶部与指定的y坐标对齐。
// hanging: 文本悬挂基线与指定的y坐标对齐,主要用于一些特殊的文字。
// middle: 文本em方框的中间与指定的y坐标对齐。
// alphabetic: 默认值。文本基线与指定的y坐标对齐(普通字母下边缘)。
// ideographic: 表意基线与指定的y坐标对齐,主要用于中文、日文和韩文。
// bottom: 文本em方框的底部与指定的y坐标对齐。
class Text2DOptions {
    font_size: number = 12;
    font_family: string = 'Arial';
    font_color: string = 'black';
    text_align: CanvasTextAlign = 'left';
    text_baseline: CanvasTextBaseline = 'top';
}

export { 
    Line2DOptions, 
    Text2DOptions, 
    Rectangle2DOptions, 
    Circle2DOptions, 
    Point2DOptions, 
    Ellipse2DOptions,
    Polygon2DOptions
};
