/// <reference types="react" />
import * as React from 'react';
export interface Props {
    played: boolean;
    hide: boolean;
    mute: boolean;
    fullscreenEnable: boolean;
    duration: number;
    currentTime: number;
    progressEnd: number;
    soundLevel: number;
    handlerPlayStop: (adv?) => void;
    handlerChangeCurrentTime: (value: number) => void;
    handlerToggleSound: () => void;
    handlerChangeSoundLevel: (value: number) => void;
    handlerFullscreen: () => void;
    handlerQuality: () => void;
    showSourceName?: boolean;
    sourceName?: string;
}
export interface State {
    seekWidth: number;
}
export declare class UIVideoControlsComponent extends React.Component<Props, State> {
    state: State;
    static defaultProps: Props;
    private seekRange;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private handlerWindowResize;
    private secondsToTime(seconds);
    private handlerChangeSeekBar;
    private drawSeekBar();
    private drawSoundBlock();
    private drawSoundsIcon();
    private drawSoundSlider();
    private drawTimes();
    private drawPlayPause();
    private drawFullScreen();
    private drawQuality();
    render(): JSX.Element;
}
