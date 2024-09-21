var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scaler = /** @class */ (function () {
    function Scaler(vmin, vmax) {
        this.vmin = vmin;
        this.vmax = vmax;
    }
    Scaler.prototype.log10 = function (x) {
        return Math.log(x) / Math.LN10;
    };
    return Scaler;
}());
var LinearScaler = /** @class */ (function (_super) {
    __extends(LinearScaler, _super);
    function LinearScaler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LinearScaler.prototype.scale = function (numMajorTicks, numMinorTicks) {
        var range = this.vmax - this.vmin;
        var idealStep = range / (numMajorTicks - 1);
        // Find the best step size that is a multiple of 1, 2, or 5
        var magnitude = Math.pow(10, Math.floor(this.log10(idealStep)));
        var step;
        for (var _i = 0, _a = [0.1, 0.2, 0.5, 1, 2, 5, 10]; _i < _a.length; _i++) {
            var stepSize = _a[_i];
            if (stepSize * magnitude >= idealStep) {
                step = stepSize * magnitude;
                break;
            }
        }
        // Calculate new number of major ticks
        var start = Math.ceil(this.vmin / step) * step;
        var end = Math.floor(this.vmax / step) * step;
        var newNumMajorTicks = Math.floor((end - start) / step) + 1;
        // Calculate major tick positions
        var majorTicks = [];
        for (var i = 0; i < newNumMajorTicks; i++) {
            majorTicks.push(start + i * step);
        }
        // Calculate minor tick positions
        var minorStep = step / 5;
        var minorTicks = [];
        for (var i = 0; i < majorTicks.length - 1; i++) {
            for (var j = 1; j < 5; j++) {
                minorTicks.push(majorTicks[i] + j * minorStep);
            }
        }
        return {
            majorTicks: majorTicks,
            minorTicks: minorTicks,
            newNumMajorTicks: newNumMajorTicks,
            newNumMinorTicks: minorTicks.length
        };
    };
    return LinearScaler;
}(Scaler));
var LogScaler = /** @class */ (function (_super) {
    __extends(LogScaler, _super);
    function LogScaler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogScaler.prototype.scale = function (numMajorTicks, numMinorTicks) {
        var logMin = this.log10(this.vmin);
        var logMax = this.log10(this.vmax);
        var logRange = logMax - logMin;
        // Calculate major ticks
        var majorStep = Math.ceil(logRange / (numMajorTicks - 1));
        var startExp = Math.floor(logMin);
        var endExp = Math.ceil(logMax);
        var majorTicks = [];
        for (var exp = startExp; exp <= endExp; exp += majorStep) {
            majorTicks.push(Math.pow(10, exp));
        }
        // Calculate minor ticks
        var minorTicks = [];
        for (var i = 0; i < majorTicks.length - 1; i++) {
            var start = majorTicks[i];
            var end = majorTicks[i + 1];
            for (var j = 2; j <= 9; j++) {
                var minorTick = start * j;
                if (minorTick < end) {
                    minorTicks.push(minorTick);
                }
            }
        }
        return {
            majorTicks: majorTicks,
            minorTicks: minorTicks,
            newNumMajorTicks: majorTicks.length,
            newNumMinorTicks: minorTicks.length
        };
    };
    return LogScaler;
}(Scaler));
// 使用示例
var linearScaler = new LinearScaler(0, 100);
console.log(linearScaler.scale(5, 20));
var logScaler = new LogScaler(1, 1000);
console.log(logScaler.scale(4, 40));
