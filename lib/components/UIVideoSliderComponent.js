"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var UIVideoSlider = /** @class */ (function (_super) {
    __extends(UIVideoSlider, _super);
    function UIVideoSlider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            containerWidth: 0
        };
        _this.handlerResize = function () {
            if (_this.slider) {
                var computedStyle = window.getComputedStyle(_this.slider);
                var width = _this.slider.offsetWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
                _this.setState({
                    containerWidth: width
                });
            }
        };
        return _this;
    }
    UIVideoSlider.prototype.componentDidMount = function () {
        if (!this.props.containerWidth) {
            this.handlerResize();
            window.addEventListener('resize', this.handlerResize);
        }
        else {
            this.setState({
                containerWidth: this.props.containerWidth
            });
        }
    };
    UIVideoSlider.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.handlerResize);
    };
    UIVideoSlider.prototype.getSlideStyle = function () {
        return {
            marginLeft: this.props.minSlideSpace / 2,
            marginRight: this.props.minSlideSpace / 2
        };
    };
    UIVideoSlider.prototype.getSlidesContainerWidth = function () {
        return (this.props.sliderWidth + this.props.minSlideSpace) * this.props.slides.length;
    };
    UIVideoSlider.prototype.drawSlides = function () {
        var _this = this;
        return this.props.slides.map(function (slide, i) {
            return (React.createElement("div", { key: i, className: "ui-video-adv-slide", style: _this.getSlideStyle() },
                React.createElement("a", { href: slide.link },
                    React.createElement("img", { src: slide.img }))));
        });
    };
    UIVideoSlider.prototype.getWrapperWidth = function () {
        var width = this.state.containerWidth;
        var slidersCountInPage = Math.floor((width) / (this.props.sliderWidth + this.props.minSlideSpace));
        if (slidersCountInPage > this.props.slides.length) {
            slidersCountInPage = this.props.slides.length;
        }
        return slidersCountInPage * (this.props.sliderWidth + this.props.minSlideSpace);
    };
    UIVideoSlider.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: this.props.show ? "ui-video-adv-slider" : "ui-video-adv-slider hide", style: { width: this.props.containerWidth ? this.props.containerWidth : '100%' }, ref: function (ref) {
                _this.slider = ref;
            } },
            React.createElement("div", { className: "ui-video-adv-slider-wrapper", style: { width: this.getWrapperWidth() } },
                React.createElement("div", { className: "slides-container", style: { width: this.getSlidesContainerWidth() + 'px' } }, this.drawSlides()))));
    };
    UIVideoSlider.defaultProps = {
        minSlides: 3,
        sliderWidth: 100,
        minSlideSpace: 20,
        show: false
    };
    return UIVideoSlider;
}(React.Component));
exports.UIVideoSlider = UIVideoSlider;
