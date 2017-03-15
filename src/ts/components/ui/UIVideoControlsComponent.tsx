import * as React from 'react';

export interface Props {
    played: boolean,
    duration: number,
    currentTime: number,
    playStop: (adv?) => void,
    changeCurrentTime: (value: number) => void
}

export interface State {

}

export class UIVideoControlsComponent extends React.Component<Props, State> {
    state: State = {};

    static defaultProps: Props = {} as Props;

    componentDidMount() {

    }

    private handlerSeekBarChange = (e): void => {
        this.props.changeCurrentTime(e.target.value);
    };

    private handlerPlayPause = (): void => {
        this.props.playStop();
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
                    onChange={this.handlerSeekBarChange}
                />
            </div>
        )
    }

    private drawPlayPause(): JSX.Element {
        return (
            <div className="play-pause-block">
                <button onClick={this.handlerPlayPause} className={this.props.played? 'played':''}>1</button>
            </div>
        );
    }

    public render() {
        return (
            <div className="ui-video-player-controls">
                {this.drawPlayPause()}
                {this.drawSeekBar()}
            </div>
        );
    }
}