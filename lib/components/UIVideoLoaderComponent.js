"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.UIVideoLoader = function (props) {
    return React.createElement("div", { className: "ui-video-loader" },
        React.createElement("svg", { className: "ui-video-loader-circular", viewBox: "25 25 50 50", stroke: props.loaderColor },
            React.createElement("circle", { className: "ui-video-loader-path", cx: "50", cy: "50", r: "20", fill: "none", strokeWidth: "3", strokeMiterlimit: "10" })));
};
