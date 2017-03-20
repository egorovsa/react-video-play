import * as React from 'react';
import {VideoSeekSlider} from 'react-video-seek-slider';

export interface Props {
    played: boolean,
    hide: boolean,
    mute: boolean,
    duration: number,
    currentTime: number,
    progressStartPercent: number,
    progressEndPercent: number,
    handlerPlayStop: (adv?) => void,
    handlerChangeCurrentTime: (value: number) => void,
    handlerToggleSound: () => void,
}

export interface State {
    seekWidth: number
}

export class UIVideoControlsComponent extends React.Component<Props, State> {
    state: State = {
        seekWidth: 0
    };

    static defaultProps: Props = {} as Props;

    private seekRange: HTMLInputElement;
    private rangeSlider: HTMLDivElement;

    componentDidMount() {
        this.handlerWindowResize();

        window.addEventListener('resize', this.handlerWindowResize);

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handlerWindowResize);
    }

    private handlerWindowResize = (): void => {
        if (this.seekRange) {
            this.setState({
                seekWidth: this.seekRange.offsetWidth | this.seekRange.clientWidth
            } as State);
        }
    };

    private handlerChangeSeekBar = (time:number): void => {
        this.props.handlerChangeCurrentTime(time);
    };

    private drawBufferLine(): JSX.Element {
        let timeEnd: number = this.props.progressEndPercent;
        let curTimePercent: number = (this.props.currentTime / this.props.duration) * 100;

        if (timeEnd < curTimePercent) {
            timeEnd = curTimePercent;
        }

        let left: number = (this.state.seekWidth / 100) * this.props.progressStartPercent;
        let right: number = (this.state.seekWidth / 100) * timeEnd;
        let width: number = right - left;

        return (
            <div
                className="seek-block-buffer"
                style={{
                    width: width,
                    left:left
                }}
            />
        )
    }

    private drawSeekBar(): JSX.Element {
        return (
            <VideoSeekSlider
                max={this.props.duration}
                currentTime={this.props.currentTime}
                progress={400}
                onChange={this.handlerChangeSeekBar}
            />
        )
    }

    private drawSoundsIcon(): JSX.Element {
        return (
            <div
                className={this.props.mute ? "sound-icon mute" :"sound-icon" }
                onClick={this.props.handlerToggleSound}
            />
        )
    }

    private drawSoundBar(): JSX.Element {
        return (
            <div className="sound-range">

            </div>
        )
    }

    private drawPlayPause(): JSX.Element {
        return (
            <div
                onClick={this.props.handlerPlayStop}
                className={this.props.played? 'play-pause-block':'play-pause-block played'}
            />
        );
    }

    public render() {
        return (
            <div className={this.props.hide? "ui-video-player-controls hide":"ui-video-player-controls"}>
                {this.drawPlayPause()}
                {this.drawSeekBar()}
                {this.drawSoundsIcon()}
            </div>
        );
    }
}