import * as React from 'react';

export interface Props {
    played: boolean,
    duration: number,
    currentTime: number,
    mute: boolean,
    handlerPlayStop: (adv?) => void,
    handlerChangeCurrentTime: (value: number) => void,
    handlerToggleSound: () => void
}

export interface State {

}

export class UIVideoControlsComponent extends React.Component<Props, State> {
    state: State = {};

    static defaultProps: Props = {} as Props;

    componentDidMount() {

    }

    private handlerChangeSeekBar = (e): void => {
        this.props.handlerChangeCurrentTime(e.target.value);
    };

    private drawSeekBar(): JSX.Element {
        return (
            <div className="seek-block">
                <input
                    type="range"
                    min="0"
                    max={this.props.duration}
                    step="0.1"
                    value={this.props.currentTime}
                    onChange={this.handlerChangeSeekBar}
                />
            </div>
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
                <input
                    type="range"
                    min="0"
                    max={this.props.duration}
                    step="0.1"
                    value={this.props.currentTime}
                    onChange={this.handlerChangeSeekBar}
                />
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
            <div className="ui-video-player-controls">
                {this.drawPlayPause()}
                {this.drawSeekBar()}
                {this.drawSoundsIcon()}
            </div>
        );
    }
}