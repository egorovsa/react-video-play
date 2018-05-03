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
var react_video_seek_slider_1 = require("react-video-seek-slider");
var is_mobile_1 = require("is-mobile");
var UIVideoControlsComponent = /** @class */ (function (_super) {
    __extends(UIVideoControlsComponent, _super);
    function UIVideoControlsComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            seekWidth: 0
        };
        _this.handlerWindowResize = function () {
            if (_this.seekRange) {
                _this.setState({
                    seekWidth: _this.seekRange.offsetWidth | _this.seekRange.clientWidth
                });
            }
        };
        _this.handlerChangeSeekBar = function (time) {
            _this.props.handlerChangeCurrentTime(time);
        };
        return _this;
    }
    UIVideoControlsComponent.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.handlerWindowResize);
        this.handlerWindowResize();
    };
    UIVideoControlsComponent.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.handlerWindowResize);
    };
    UIVideoControlsComponent.prototype.secondsToTime = function (seconds) {
        seconds = Math.round(seconds);
        var hours = Math.floor(seconds / 3600);
        var divirsForMinutes = seconds % 3600;
        var minutes = Math.floor(divirsForMinutes / 60);
        var sec = Math.ceil(divirsForMinutes % 60);
        var time = {
            hh: hours.toString(),
            mm: minutes < 10 ? "0" + minutes : minutes.toString(),
            ss: sec < 10 ? "0" + sec : sec.toString()
        };
        return time.hh !== "0" ? time.hh + ":" : '' + time.mm + ':' + time.ss;
    };
    UIVideoControlsComponent.prototype.drawSeekBar = function () {
        return (React.createElement(react_video_seek_slider_1.VideoSeekSlider, { max: this.props.duration, currentTime: this.props.currentTime, progress: this.props.progressEnd, onChange: this.handlerChangeSeekBar, limitTimeTooltipBySides: true }));
    };
    UIVideoControlsComponent.prototype.drawSoundBlock = function () {
        return (React.createElement("div", { className: "sound-block" },
            this.drawSoundsIcon(),
            this.drawSoundSlider()));
    };
    UIVideoControlsComponent.prototype.drawSoundsIcon = function () {
        return (React.createElement("div", { className: this.props.mute ? "sound-icon mute" : "sound-icon", onClick: this.props.handlerToggleSound }));
    };
    UIVideoControlsComponent.prototype.drawSoundSlider = function () {
        return (React.createElement("div", { className: true ? "sound-slider" : "sound-slider" },
            React.createElement(react_video_seek_slider_1.VideoSeekSlider, { max: 100, currentTime: this.props.soundLevel, progress: 0, onChange: this.props.handlerChangeSoundLevel, hideHoverTime: true })));
    };
    UIVideoControlsComponent.prototype.drawTimes = function () {
        if (!is_mobile_1.isMobile()) {
            return (React.createElement("div", { className: "controls-time" },
                this.secondsToTime(this.props.currentTime),
                " / ",
                this.secondsToTime(this.props.duration)));
        }
    };
    UIVideoControlsComponent.prototype.drawPlayPause = function () {
        return (React.createElement("div", { onClick: this.props.handlerPlayStop, className: this.props.played ? 'play-pause-block' : 'play-pause-block played' }));
    };
    UIVideoControlsComponent.prototype.drawFullScreen = function () {
        return (React.createElement("div", { onClick: this.props.handlerFullscreen, className: this.props.fullscreenEnable ? 'fullscreen opened' : 'fullscreen' }));
    };
    UIVideoControlsComponent.prototype.drawQuality = function () {
        if (this.props.showSourceName) {
            return (React.createElement("div", { onClick: this.props.handlerQuality, className: "hq-text" }, this.props.sourceName));
        }
        else {
            return (React.createElement("div", { onClick: this.props.handlerQuality, className: "hq" }));
        }
    };
    UIVideoControlsComponent.prototype.render = function () {
        return (React.createElement("div", { className: this.props.hide ? "ui-video-player-controls hide" : "ui-video-player-controls" },
            React.createElement("div", { className: "controllers-block" },
                this.drawSeekBar(),
                this.drawPlayPause(),
                this.drawSoundBlock(),
                this.drawTimes(),
                this.drawFullScreen(),
                this.drawQuality()),
            React.createElement("div", { className: "overlay" })));
    };
    UIVideoControlsComponent.defaultProps = {};
    return UIVideoControlsComponent;
}(React.Component));
exports.UIVideoControlsComponent = UIVideoControlsComponent;
