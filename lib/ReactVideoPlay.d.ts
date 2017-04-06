/// <reference types="react" />
import * as React from 'react';
export interface VideoSliderSlide {
    img: string;
    link: string;
}
export declare enum VideoSourceType {
    video_mp4 = 0,
    video_webm = 1,
    video_ogg = 2,
}
export interface VideoSource {
    source: string;
    type: VideoSourceType;
    codecs?: string;
}
export interface Source {
    name: string;
    source: VideoSource[];
    default?: boolean;
}
export interface Props {
    sources: Source[];
    enableSlider?: boolean;
    sliderSlides?: VideoSliderSlide[];
    hideSliderInMobile?: boolean;
    enableAdv?: boolean;
    advComponent?: JSX.Element;
    poster?: string;
    width?: number;
    height?: number;
    controls?: boolean;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
}
export interface State {
    containerWidth: number;
    currentVolume: number;
    duration: number;
    currentTime: number;
    progressEnd: number;
    soundLevel: number;
    soundLevelSave: number;
    srcIndex: number;
    adv: boolean;
    hideControls: boolean;
    muted: boolean;
    fullScreen: boolean;
    loading: boolean;
    stalled: boolean;
    paused: boolean;
    quality: boolean;
}
export declare class ReactVideoPlay extends React.Component<Props, State> {
    state: State;
    static defaultProps: Props;
    private player;
    private playerContainer;
    private interval;
    private hideControlsTimeoutId;
    private videoTypes;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private getDefaultSourceIndex();
    private setFocusToPlayerContainer;
    private handlerKeys;
    private handlerWindowResize;
    private handlerMouseMove;
    private handlerMouseEnter;
    private handlerMouseLeave;
    private events();
    private controlsHider();
    private handlerSeekBarChange;
    private drawAdv();
    private drawSlider();
    private handlerChangeSoundLevel;
    private handlerSoundsToggler;
    private handlerPlayStop;
    private handlerChangeQualityClick;
    private setSource(play?, currentTime?);
    private play();
    private pause(adv?);
    private handlerVideoClick;
    private getVideoTypeByEnum(type);
    private onFullscreenChange;
    private handlerFullscreen;
    private handlerQuality;
    private launchFullScreen;
    private cancelFullscreen();
    private drawLoading();
    private drawStalled();
    private drawPlayStopSplash();
    private drawQuality();
    private getControls();
    render(): JSX.Element;
}
