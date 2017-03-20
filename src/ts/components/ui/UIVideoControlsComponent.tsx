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

    private secondsToTime(seconds: number): Time {
        seconds = Math.round(seconds);

        let hours: number = Math.floor(seconds / 3600);
        let divirsForMinutes: number = seconds % 3600;
        let minutes: number = Math.floor(divirsForMinutes / 60);
        let sec: number = Math.ceil(divirsForMinutes % 60);

        return {
            hh: hours.toString(),
            mm: minutes < 10 ? "0" + minutes : minutes.toString(),
            ss: sec < 10 ? "0" + sec : sec.toString()
        }
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

    private drawSoundsIcon(): JSX.Element {
        return (
            <div
                className={this.props.mute ? "sound-icon mute" :"sound-icon" }
                onClick={this.props.handlerToggleSound}
            />
        )
    }

    private drawTimes(): JSX.Element {
        let durationTime: Time = this.secondsToTime(this.props.duration);
        let сurrentTime: Time = this.secondsToTime(this.props.currentTime);
        let duration: string = durationTime.hh !== "0" ? durationTime.hh + ":" : '' + durationTime.mm + ':' + durationTime.ss;
        let сurrent: string = сurrentTime.hh !== "0" ? сurrentTime.hh + ":" : '' + сurrentTime.mm + ':' + сurrentTime.ss;

        return (
            <div className="controls-time">
                {сurrent} / {duration}
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
                {this.drawSoundsIcon()}
                {this.drawTimes()}
                <div className="overlay"></div>
            </div>
        );
    }
}