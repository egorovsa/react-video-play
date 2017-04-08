"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var UIVideoLoader = (function (_super) {
    __extends(UIVideoLoader, _super);
    function UIVideoLoader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        return _this;
    }
    UIVideoLoader.prototype.render = function () {
        return (React.createElement("div", { className: "ui-video-loader" },
            React.createElement("svg", { className: "ui-video-loader-circular", viewBox: "25 25 50 50", stroke: this.props.loaderColor },
                React.createElement("circle", { className: "ui-video-loader-path", cx: "50", cy: "50", r: "20", fill: "none", strokeWidth: "3", strokeMiterlimit: "10" }))));
    };
    return UIVideoLoader;
}(React.Component));
UIVideoLoader.defaultProps = {
    loaderColor: "#fff"
};
exports.UIVideoLoader = UIVideoLoader;
