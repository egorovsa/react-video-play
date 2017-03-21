import * as React from 'react';
import {VideoSeekSlider} from 'react-video-seek-slider';

interface Time {
    hh: string,
    mm: string,
    ss: string
}

export interface Props {
    played: boolean,
    hide: boolean,
    mute: boolean,
    duration: number,
    currentTime: number,
    progressEnd: number,
    handlerPlayStop: (adv?) => void,
    handlerChangeCurrentTime: (value: number) => void,
    handlerToggleSound: () => void,
    handlerChangeSoundLevel: (value: number) => void,
    soundLevel: number
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

    private secondsToTime(seconds: number): string {
        seconds = Math.round(seconds);

        let hours: number = Math.floor(seconds / 3600);
        let divirsForMinutes: number = seconds % 3600;
        let minutes: number = Math.floor(divirsForMinutes / 60);
        let sec: number = Math.ceil(divirsForMinutes % 60);

        let time: Time = {
            hh: hours.toString(),
            mm: minutes < 10 ? "0" + minutes : minutes.toString(),
            ss: sec < 10 ? "0" + sec : sec.toString()
        };

        return time.hh !== "0" ? time.hh + ":" : '' + time.mm + ':' + time.ss;
    }

    private handlerChangeSeekBar = (time: number): void => {
        this.props.handlerChangeCurrentTime(time);
    };

    private drawSeekBar(): JSX.Element {
        return (
            <VideoSeekSlider
                max={this.props.duration}
                currentTime={this.props.currentTime}
                progress={this.props.progressEnd}
                onChange={this.handlerChangeSeekBar}
            />
        )
    }

    private drawSoundBlock(): JSX.Element {
        return (
            <div className="sound-block">
                {this.drawSoundsIcon()}
                {this.drawSoundSlider()}
            </div>
        );
    }

    private drawSoundsIcon(): JSX.Element {
        return (
            <div
                className={this.props.mute ? "sound-icon mute" :"sound-icon" }
                onClick={this.props.handlerToggleSound}
            />
        )
    }

    private drawSoundSlider(): JSX.Element {
        return (
            <div
                className={true ? "sound-slider" :"sound-slider" }
            >
                <VideoSeekSlider
                    max={100}
                    currentTime={this.props.soundLevel}
                    progress={0}
                    onChange={this.props.handlerChangeSoundLevel}
                />
            </div>
        )
    }

    private drawTimes(): JSX.Element {
        return (
            <div className="controls-time">
                {this.secondsToTime(this.props.currentTime)} / {this.secondsToTime(this.props.duration)}
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
                {this.drawSeekBar()}
                {this.drawPlayPause()}
                {this.drawSoundBlock()}
                {this.drawTimes()}
                <div className="overlay"></div>
            </div>
        );
    }
}