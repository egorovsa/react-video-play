import * as React from 'react';
import {VideoSeekSlider} from 'react-video-seek-slider';
import {isMobile} from 'is-mobile';

interface Time {
	hh: string,
	mm: string,
	ss: string
}

export interface Props {
	played: boolean,
	hide: boolean,
	mute: boolean,
	fullscreenEnable: boolean,
	duration: number,
	currentTime: number,
	progressEnd: number,
	soundLevel: number,
	handlerPlayStop: (adv?) => void,
	handlerChangeCurrentTime: (value: number) => void,
	handlerToggleSound: () => void,
	handlerChangeSoundLevel: (value: number) => void,
	handlerFullscreen: () => void,
	handlerQuality: () => void,
	showSourceName?: boolean,
	sourceName?: string
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
		window.addEventListener('resize', this.handlerWindowResize);
		this.handlerWindowResize();
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
				limitTimeTooltipBySides={true}
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
				className={this.props.mute ? "sound-icon mute" : "sound-icon"}
				onClick={this.props.handlerToggleSound}
			/>
		)
	}

	private drawSoundSlider(): JSX.Element {
		return (
			<div className={true ? "sound-slider" : "sound-slider"}>
				<VideoSeekSlider
					max={100}
					currentTime={this.props.soundLevel}
					progress={0}
					onChange={this.props.handlerChangeSoundLevel}
					hideHoverTime={true}
				/>
			</div>
		)
	}

	private drawTimes(): JSX.Element {
		if (!isMobile()) {
			return (
				<div className="controls-time">
					{this.secondsToTime(this.props.currentTime)} / {this.secondsToTime(this.props.duration)}
				</div>
			)
		}
	}

	private drawPlayPause(): JSX.Element {
		return (
			<div
				onClick={this.props.handlerPlayStop}
				className={this.props.played ? 'play-pause-block' : 'play-pause-block played'}
			/>
		);
	}

	private drawFullScreen(): JSX.Element {
		return (
			<div
				onClick={this.props.handlerFullscreen}
				className={this.props.fullscreenEnable ? 'fullscreen opened' : 'fullscreen'}
			/>
		);
	}

	private drawQuality(): JSX.Element {
		if (this.props.showSourceName) {
			return (
				<div
					onClick={this.props.handlerQuality}
					className="hq-text"
				>
					{this.props.sourceName}
				</div>
			);
		} else {
			return (
				<div
					onClick={this.props.handlerQuality}
					className="hq"
				/>
			);
		}
	}

	public render() {
		return (
			<div className={this.props.hide ? "ui-video-player-controls hide" : "ui-video-player-controls"}>
				<div className="controllers-block">
					{this.drawSeekBar()}
					{this.drawPlayPause()}
					{this.drawSoundBlock()}
					{this.drawTimes()}
					{this.drawFullScreen()}
					{this.drawQuality()}
				</div>

				<div className="overlay"></div>
			</div>
		);
	}
}