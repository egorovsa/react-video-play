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
var UIVideoSliderComponent_1 = require("./components/UIVideoSliderComponent");
var UIVideoLoaderComponent_1 = require("./components/UIVideoLoaderComponent");
var UIVideoControlsComponent_1 = require("./components/UIVideoControlsComponent");
var is_mobile_1 = require("is-mobile");
var VideoSourceType;
(function (VideoSourceType) {
    VideoSourceType["video_mp4"] = "video/mp4";
    VideoSourceType["video_webm"] = "video/webm";
    VideoSourceType["video_ogg"] = "video/ogg";
})(VideoSourceType = exports.VideoSourceType || (exports.VideoSourceType = {}));
var ReactVideoPlay = /** @class */ (function (_super) {
    __extends(ReactVideoPlay, _super);
    function ReactVideoPlay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            containerWidth: 0,
            currentVolume: 0,
            duration: 0,
            currentTime: 0,
            progressEnd: 0,
            soundLevel: 100,
            soundLevelSave: 100,
            srcIndex: 0,
            adv: false,
            hideControls: false,
            muted: false,
            fullScreen: false,
            loading: false,
            stalled: false,
            paused: true,
            quality: false,
        };
        _this.interval = null;
        _this.intervalAmbient = null;
        _this.hideControlsTimeoutId = null;
        _this.setFocusToPlayerContainer = function () {
            _this.playerContainer.focus();
        };
        _this.handlerKeys = function (e) {
            if (document.activeElement === _this.playerContainer) {
                var volume = 0;
                switch (e.keyCode) {
                    case 32:
                        _this.handlerPlayStop(true);
                        break;
                    case 37:
                        _this.handlerSeekBarChange(_this.player.currentTime - 1);
                        break;
                    case 39:
                        _this.handlerSeekBarChange(_this.player.currentTime + 0.5);
                        break;
                    case 38:
                        volume = _this.player.volume + 0.1 > 1 ? 1 : _this.player.volume + 0.1;
                        _this.handlerChangeSoundLevel(volume * 100);
                        break;
                    case 40:
                        volume = _this.player.volume - 0.1 < 0 ? 0 : _this.player.volume - 0.1;
                        _this.handlerChangeSoundLevel(volume * 100);
                        break;
                }
            }
        };
        _this.handlerWindowResize = function () {
            if (_this.props.width) {
                _this.setState({
                    containerWidth: _this.props.width
                });
            }
            else {
                if (_this.playerContainer) {
                    _this.setState({
                        containerWidth: _this.playerContainer.offsetWidth
                    });
                }
            }
        };
        _this.handlerMouseMove = function () {
            if (!is_mobile_1.isMobile()) {
                _this.controlsHider();
            }
        };
        _this.handlerMouseEnter = function () {
            _this.setState({
                hideControls: false,
            });
        };
        _this.handlerMouseLeave = function () {
            if (!_this.player.paused) {
                _this.setState({
                    hideControls: true,
                    quality: false
                });
            }
        };
        _this.handlerSeekBarChange = function (value) {
            _this.player.currentTime = value;
            _this.setState({
                currentTime: value
            }, function () {
                if (is_mobile_1.isMobile()) {
                    _this.controlsHider();
                }
            });
        };
        _this.handlerChangeSoundLevel = function (value) {
            _this.player.volume = value / 100;
            _this.player.muted = false;
            _this.setState({
                soundLevel: value,
                soundLevelSave: value,
                muted: false
            });
            if (is_mobile_1.isMobile()) {
                _this.controlsHider();
            }
        };
        _this.handlerSoundsToggler = function () {
            if (_this.player.muted) {
                _this.player.muted = false;
                _this.setState({
                    muted: false,
                    soundLevel: _this.state.soundLevelSave
                });
            }
            else {
                _this.player.muted = true;
                _this.setState({
                    muted: true,
                    soundLevel: 0
                });
            }
            if (is_mobile_1.isMobile()) {
                _this.controlsHider();
            }
        };
        _this.handlerPlayStop = function (adv) {
            if (_this.player.paused) {
                _this.play();
                _this.playAmbient();
            }
            else {
                _this.pause(adv);
                _this.playAmbient(true);
            }
        };
        _this.handlerChangeQualityClick = function (index) {
            var currentTime = _this.player.currentTime;
            _this.setState({
                srcIndex: index,
                quality: false
            }, function () {
                _this.setSource(!_this.state.paused, currentTime);
            });
        };
        _this.handlerVideoClick = function () {
            if (!is_mobile_1.isMobile()) {
                _this.handlerPlayStop();
            }
            else {
                _this.setState({
                    hideControls: false
                });
                _this.controlsHider(6000);
            }
        };
        _this.onFullscreenChange = function () {
            var fullscreenElement = document['fullscreenElement'] ||
                document['mozFullscreenElement'] ||
                document['webkitFullscreenElement'];
            var fullscreenEnabled = document['fullscreenEnabled'] ||
                document['mozFullscreenEnabled'] ||
                document['webkitFullscreenEnabled'];
            _this.setState({
                fullScreen: !!(fullscreenEnabled && fullscreenElement)
            });
            if (is_mobile_1.isMobile()) {
                _this.controlsHider();
            }
            _this.handlerWindowResize();
        };
        _this.handlerFullscreen = function () {
            if (_this.state.fullScreen) {
                _this.cancelFullscreen();
            }
            else {
                _this.launchFullScreen(_this.playerContainer);
            }
        };
        _this.handlerQuality = function () {
            if (_this.state.quality) {
                _this.setState({
                    quality: false
                });
            }
            else {
                clearTimeout(_this.hideControlsTimeoutId);
                _this.setState({
                    quality: true
                });
            }
        };
        _this.launchFullScreen = function (element) {
            if (element.requestFullScreen) {
                element.requestFullScreen();
            }
            else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }
            else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            }
            _this.setState({
                fullScreen: true
            });
            _this.hideControlsTimeoutId = setTimeout(function () {
                _this.handlerMouseLeave();
            }, 3000);
        };
        return _this;
    }
    ReactVideoPlay.prototype.componentDidMount = function () {
        var _this = this;
        this.events();
        this.handlerWindowResize();
        if (this.playerContainer) {
            this.playerContainer.addEventListener('mouseenter', this.handlerMouseEnter);
            this.playerContainer.addEventListener('mouseleave', this.handlerMouseLeave);
            this.playerContainer.addEventListener("webkitfullscreenchange", this.onFullscreenChange);
            this.playerContainer.addEventListener("mozfullscreenchange", this.onFullscreenChange);
            this.playerContainer.addEventListener("fullscreenchange", this.onFullscreenChange);
            this.playerContainer.addEventListener('mousemove', this.handlerMouseMove);
            this.playerContainer.addEventListener('click', this.setFocusToPlayerContainer);
        }
        window.addEventListener('keydown', this.handlerKeys);
        window.addEventListener('resize', this.handlerWindowResize);
        var defaultSourceIndex = this.getDefaultSourceIndex();
        if (defaultSourceIndex !== this.state.srcIndex) {
            this.setState({
                srcIndex: defaultSourceIndex
            }, function () {
                _this.setSource(_this.props.autoplay);
            });
        }
        else {
            this.setSource(this.props.autoplay);
        }
        if (this.props.muted) {
            this.handlerSoundsToggler();
        }
    };
    ReactVideoPlay.prototype.componentWillUnmount = function () {
        this.playerContainer.removeEventListener('mouseenter', this.handlerMouseEnter);
        this.playerContainer.removeEventListener('mouseleave', this.handlerMouseLeave);
        this.playerContainer.removeEventListener("webkitfullscreenchange", this.onFullscreenChange);
        this.playerContainer.removeEventListener("mozfullscreenchange", this.onFullscreenChange);
        this.playerContainer.removeEventListener("fullscreenchange", this.onFullscreenChange);
        this.playerContainer.removeEventListener('mousemove', this.handlerMouseMove);
        this.playerContainer.removeEventListener('click', this.setFocusToPlayerContainer);
        window.removeEventListener('keydown', this.handlerKeys);
        window.removeEventListener('resize', this.handlerWindowResize);
    };
    ReactVideoPlay.prototype.playAmbient = function (stop) {
        var _this = this;
        if (this.props.ambiLight && this.canvas) {
            if (!stop) {
                var ctx_1 = this.canvas.getContext('2d');
                this.intervalAmbient = setInterval(function () {
                    ctx_1.drawImage(_this.player, 0, 0, _this.player.offsetWidth, _this.player.offsetHeight);
                }, 30);
            }
            else {
                clearInterval(this.intervalAmbient);
            }
        }
    };
    ReactVideoPlay.prototype.getDefaultSourceIndex = function () {
        var defaultStatusSourceIndex = this.state.srcIndex;
        this.props.sources.map(function (src, i) {
            if (src.default && src.default === true) {
                defaultStatusSourceIndex = i;
            }
        });
        return defaultStatusSourceIndex;
    };
    ReactVideoPlay.prototype.events = function () {
        var _this = this;
        if (this.player) {
            this.player.addEventListener('play', function () {
                _this.interval = setInterval(function () {
                    _this.setState({
                        currentTime: +_this.player.currentTime
                    });
                }, 100);
            });
            this.player.addEventListener('loadeddata', function () {
                _this.setState({
                    duration: _this.player.duration,
                    loading: false
                });
            });
            this.player.addEventListener('ended', function () {
                _this.setState({
                    adv: true,
                    hideControls: false
                });
            });
            this.player.addEventListener('canplay', function () {
                _this.setState({
                    loading: false
                });
            });
            this.player.addEventListener('waiting', function () {
                _this.setState({
                    loading: true
                });
            });
            this.player.addEventListener('pause', function () {
                _this.pause(true);
            });
            this.player.addEventListener("progress", function () {
                var currentTime = _this.player.currentTime;
                var buffer = _this.player.buffered;
                if (buffer.length > 0 && _this.state.duration > 0) {
                    var currentBuffer = 0;
                    for (var i = 0; i < buffer.length; i++) {
                        if (buffer.start(i) <= currentTime && currentTime <= buffer.end(i)) {
                            currentBuffer = i;
                            break;
                        }
                    }
                    _this.setState({
                        progressEnd: buffer.end(currentBuffer)
                    });
                }
            }, false);
        }
    };
    ReactVideoPlay.prototype.controlsHider = function (timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = 3000; }
        this.setState({
            hideControls: false
        });
        if (this.hideControlsTimeoutId) {
            clearTimeout(this.hideControlsTimeoutId);
        }
        if (!this.state.adv && this.state.fullScreen) {
            this.hideControlsTimeoutId = setTimeout(function () {
                _this.handlerMouseLeave();
            }, timeout);
        }
    };
    ReactVideoPlay.prototype.drawAdv = function () {
        if (this.props.enableAdv && this.props.advComponent) {
            return (React.createElement("div", { className: this.state.adv ? "adv-main-container" : "adv-main-container hide" }, this.props.advComponent));
        }
    };
    ReactVideoPlay.prototype.drawSlider = function () {
        if (this.props.enableSlider && this.props.sliderSlides && !(is_mobile_1.isMobile() && this.props.hideSliderInMobile)) {
            return (React.createElement(UIVideoSliderComponent_1.UIVideoSlider, { show: this.state.adv, slides: this.props.sliderSlides }));
        }
    };
    ReactVideoPlay.prototype.setSource = function (play, currentTime) {
        for (var i = 0; i < this.props.sources[this.state.srcIndex].source.length; i++) {
            var src = this.props.sources[this.state.srcIndex].source[i];
            var type = src.type;
            if (this.player.canPlayType(type)) {
                this.player.src = src.source;
                if (play) {
                    this.play();
                    this.playAmbient();
                }
                if (currentTime) {
                    this.player.currentTime = currentTime;
                }
                break;
            }
        }
    };
    ReactVideoPlay.prototype.play = function () {
        var _this = this;
        this.player.play();
        this.setState({
            adv: false,
            paused: false
        }, function () {
            if (is_mobile_1.isMobile()) {
                _this.controlsHider();
            }
        });
    };
    ReactVideoPlay.prototype.pause = function (adv) {
        this.player.pause();
        clearInterval(this.interval);
        this.setState({
            paused: true,
            hideControls: false
        });
        if (adv) {
            this.setState({
                adv: true,
            });
        }
    };
    ReactVideoPlay.prototype.cancelFullscreen = function () {
        if (document['cancelFullScreen']) {
            document['cancelFullScreen']();
        }
        else if (document['mozCancelFullScreen']) {
            document['mozCancelFullScreen']();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        this.setState({
            fullScreen: false
        });
    };
    ReactVideoPlay.prototype.drawLoading = function () {
        if (this.state.loading) {
            return (React.createElement(UIVideoLoaderComponent_1.UIVideoLoader, { loaderColor: this.props.loaderColor }));
        }
    };
    ReactVideoPlay.prototype.drawStalled = function () {
        if (this.state.stalled) {
            return (React.createElement("div", { className: "ui-video-player-stalled" },
                React.createElement("p", null, "Media data is not available")));
        }
    };
    ReactVideoPlay.prototype.drawPlayStopSplash = function () {
        var className = "ui-video-player-ps-splash play";
        if (!this.state.paused) {
            className += " hide";
        }
        if (!this.state.adv && this.state.paused) {
            return (React.createElement("div", { onClick: this.handlerPlayStop, className: className }));
        }
    };
    ReactVideoPlay.prototype.drawQuality = function () {
        var _this = this;
        var className = this.state.quality ? "ui-video-player-src " : "ui-video-player-src hide";
        return (React.createElement("div", { className: className }, this.props.sources.map(function (source, i) {
            return (React.createElement("div", { className: i === _this.state.srcIndex ? "src-one active" : "src-one", onClick: function () { return _this.handlerChangeQualityClick(i); }, key: i }, source.name));
        })));
    };
    ReactVideoPlay.prototype.getControls = function () {
        if (this.props.controls) {
            return (React.createElement(UIVideoControlsComponent_1.UIVideoControlsComponent, { played: this.player ? this.player.paused : true, mute: this.player ? this.state.muted : true, duration: this.state.duration, currentTime: this.state.currentTime, progressEnd: this.state.progressEnd, hide: this.state.hideControls, soundLevel: this.state.soundLevel, fullscreenEnable: this.state.fullScreen, showSourceName: this.props.showSourceName, sourceName: this.props.sources[this.state.srcIndex].name, handlerPlayStop: this.handlerPlayStop, handlerChangeCurrentTime: this.handlerSeekBarChange, handlerToggleSound: this.handlerSoundsToggler, handlerChangeSoundLevel: this.handlerChangeSoundLevel, handlerFullscreen: this.handlerFullscreen, handlerQuality: this.handlerQuality }));
        }
    };
    ReactVideoPlay.prototype.drawAmbiLight = function () {
        var _this = this;
        if (this.props.ambiLight) {
            return (React.createElement("canvas", { ref: function (ref) {
                    _this.canvas = ref;
                }, className: "ambiLight", style: {
                    width: this.props.width ? this.props.width + 'px' : '100%',
                    minHeight: ((this.state.containerWidth / 100) * 56) + 'px'
                } }));
        }
    };
    ReactVideoPlay.prototype.render = function () {
        var _this = this;
        var className = "ui-video-player-component";
        if (this.state.fullScreen && this.state.hideControls) {
            className += " hide-cursor";
        }
        return (React.createElement("div", { tabIndex: 0, className: className, style: {
                width: this.props.width ? this.props.width + 'px' : '100%',
                minHeight: ((this.state.containerWidth / 100) * 56) + 'px'
            }, ref: function (playerContainer) {
                _this.playerContainer = playerContainer;
            } },
            this.drawAmbiLight(),
            React.createElement("div", { className: "ui-video-player-wrapper" },
                this.drawLoading(),
                this.drawStalled(),
                this.drawPlayStopSplash(),
                this.getControls(),
                this.drawAdv(),
                this.drawSlider(),
                this.drawQuality(),
                React.createElement("video", { width: "100%", height: this.props.height ? this.props.height : '', ref: function (player) {
                        _this.player = player;
                    }, onClick: this.handlerVideoClick, poster: this.props.poster }, this.props.children))));
    };
    ReactVideoPlay.defaultProps = {
        sources: [],
        controls: true,
        enableSlider: false,
        enableAdv: true,
        hideSliderInMobile: true,
        muted: false,
        autoplay: false,
        showSourceName: false,
        ambiLight: false,
        loaderColor: "#fff"
    };
    return ReactVideoPlay;
}(React.Component));
exports.ReactVideoPlay = ReactVideoPlay;
