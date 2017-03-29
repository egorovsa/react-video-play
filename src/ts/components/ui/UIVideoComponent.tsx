import * as React from 'react';
import {UIVideoControlsComponent} from "./UIVideoControlsComponent";
const mobile = require('is-mobile');

export enum VideoSourceType{
	video_mp4,
	video_webm,
	videi_ogg
}

export interface VideoSource {
	source: string,
	type: VideoSourceType,
	codecs?: string
}

export interface Props {
	width?: number,
	height?: number,
	controls?: boolean,
	autoPlay?: boolean,
	loop?: boolean,
	sources: VideoSource[]
	poster?: string
}

export interface State {
	currentVolume: number,
	duration: number,
	currentTime: number,
	progressEnd: number,
	soundLevel: number,
	soundLevelSave: number,
	adv: boolean,
	hideControls: boolean,
	muted: boolean,
	fullScreen: boolean,
	loading: boolean,
	stalled: boolean,
	paused: boolean
}

export class UIVideoComponent extends React.Component<Props, State> {
	state: State = {
		currentVolume: 0,
		duration: 0,
		currentTime: 0,
		progressEnd: 0,
		soundLevel: 100,
		soundLevelSave: 100,
		adv: false,
		hideControls: false,
		muted: false,
		fullScreen: false,
		loading: true,
		stalled: false,
		paused: true
	};

	static defaultProps: Props = {
		controls: true
	} as Props;

	private player: HTMLVideoElement;
	private playerContainer: HTMLDivElement;
	private interval: any = null;
	private hideControlsTimeoutId: any = null;

	componentDidMount() {
		this.events();

		if (this.playerContainer) {
			this.playerContainer.addEventListener('mouseenter', this.handlerMouseEnter);
			this.playerContainer.addEventListener('mouseleave', this.handlerMouseLeave);
			this.playerContainer.addEventListener("webkitfullscreenchange", this.onFullscreenChange);
			this.playerContainer.addEventListener("mozfullscreenchange", this.onFullscreenChange);
			this.playerContainer.addEventListener("fullscreenchange", this.onFullscreenChange);
			this.playerContainer.addEventListener('mousemove', this.handlerMouseMove);
		}
	}

	componentWillUnmount() {
		this.playerContainer.removeEventListener('mouseenter', this.handlerMouseEnter);
		this.playerContainer.removeEventListener('mouseleave', this.handlerMouseLeave);
		this.playerContainer.removeEventListener("webkitfullscreenchange", this.onFullscreenChange);
		this.playerContainer.removeEventListener("mozfullscreenchange", this.onFullscreenChange);
		this.playerContainer.removeEventListener("fullscreenchange", this.onFullscreenChange);
		this.playerContainer.removeEventListener('mousemove', this.handlerMouseMove);
	}

	private handlerMouseMove = (): void => {
		if (!mobile()) {
			this.controlsHider()
		}
	};

	private handlerMouseEnter = (): void => {
		this.setState({
			hideControls: false
		} as State);
	};

	private handlerMouseLeave = (): void => {
		if (!this.player.paused) {
			this.setState({
				hideControls: true
			} as State);
		}
	};

	private events(): void {
		if (this.player) {
			this.player.addEventListener('play', () => {
				this.interval = setInterval(() => {
					this.setState({
						currentTime: +this.player.currentTime
					} as State);
				}, 100);
			});

			this.player.addEventListener('loadeddata', () => {
				this.setState({
					duration: this.player.duration,
					loading: false
				} as State);
			});

			this.player.addEventListener('ended', () => {
				this.setState({
					adv: true,
					hideControls: false
				} as State);
			});

			this.player.addEventListener('canplay', () => {
				this.setState({
					loading: false
				} as State);
			});

			this.player.addEventListener('waiting', () => {
				this.setState({
					loading: true
				} as State);
			});

			this.player.addEventListener("progress", () => {
				let currentTime: number = this.player.currentTime;
				let buffer: TimeRanges = this.player.buffered;

				if (buffer.length > 0 && this.state.duration > 0) {
					let currentBuffer: number = 0;

					for (let i = 0; i < buffer.length; i++) {
						if (buffer.start(i) <= currentTime && currentTime <= buffer.end(i)) {
							currentBuffer = i;
							break;
						}
					}

					this.setState({
						progressEnd: buffer.end(currentBuffer)
					} as State);
				}
			}, false);
		}
	}

	private controlsHider(): void {
		this.setState({
			hideControls: false
		} as State);

		if (this.hideControlsTimeoutId) {
			clearTimeout(this.hideControlsTimeoutId);
		}

		console.log('handlerMouseMove');
		console.log(!this.state.adv, this.state.fullScreen);

		if (!this.state.adv && this.state.fullScreen) {
			this.hideControlsTimeoutId = setTimeout(() => {
				this.handlerMouseLeave();
			}, 3000);
		}
	}

	private getVideoType(source: VideoSource): string {
		let videoType: string = "video/mp4;";

		switch (source.type) {
			case VideoSourceType.videi_ogg:
				videoType = 'video/ogg;';
				break;
			case VideoSourceType.video_webm:
				videoType = 'video/webm;';
				break;
		}

		if (source.codecs) {
			videoType += ' codecs="' + source.codecs + '"';
		}

		return videoType;
	}

	private getSources(): JSX.Element[] {
		return this.props.sources.map((src: VideoSource, i: number) => {
			return (<source src={src.source} type={this.getVideoType(src)} key={i}/>)
		});
	}

	private handlerSeekBarChange = (value: number): void => {
		this.player.currentTime = value;

		this.setState({
			currentTime: value
		} as State, () => {
			if (mobile()) {
				this.controlsHider();
			}
		});
	};

	private drawAdv(): JSX.Element {
		if (this.state.adv) {
			return (
				<div className="ui-video-player-adv">
					<h1>ADV HERE</h1>
				</div>
			)
		}
	}

	private handlerChangeSoundLevel = (value: number): void => {
		this.player.volume = value / 100;
		this.player.muted = false;

		this.setState({
			soundLevel: value,
			soundLevelSave: value,
			muted: false
		} as State);

		if (mobile()) {
			this.controlsHider();
		}
	};

	private handlerSoundsToggler = (): void => {
		if (this.player.muted) {
			this.player.muted = false;

			this.setState({
				muted: false,
				soundLevel: this.state.soundLevelSave
			} as State);
		} else {
			this.player.muted = true;

			this.setState({
				muted: true,
				soundLevel: 0
			} as State);
		}

		if (mobile()) {
			this.controlsHider();
		}
	};

	private handlerPlayStop = (adv?): void => {
		if (this.player.paused) {
			this.player.play();

			if (adv) {
				this.setState({
					adv: false,
					paused: false
				} as State, () => {
					if (mobile()) {
						this.controlsHider();
					}
				});
			}


		} else {
			this.player.pause();

			clearInterval(this.interval);

			if (adv) {
				this.setState({
					adv: true,
					paused: true,
					hideControls: false
				} as State);
			}
		}
	};

	private handlerVideoClick = (): void => {
		if (!mobile()) {
			this.handlerPlayStop();
		} else {
			this.setState({
				hideControls: false
			} as State);
		}
	};

	private onFullscreenChange = (e): void => {
		let fullscreenElement =
			document['fullscreenElement'] ||
			document['mozFullscreenElement'] ||
			document['webkitFullscreenElement'];

		let fullscreenEnabled =
			document['fullscreenEnabled'] ||
			document['mozFullscreenEnabled'] ||
			document['webkitFullscreenEnabled'];

		this.setState({
			fullScreen: !!(fullscreenEnabled && fullscreenElement)
		} as State);

		if (mobile()) {
			this.controlsHider();
		}
	};

	private handlerFullscreen = (): void => {
		if (this.state.fullScreen) {
			this.cancelFullscreen();
		} else {
			this.launchFullScreen(this.playerContainer);
		}
	};

	private launchFullScreen = (element): void => {
		console.log('launchFullScreen');
		if (element.requestFullScreen) {
			element.requestFullScreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullScreen) {
			element.webkitRequestFullScreen();
		}

		this.setState({
			fullScreen: true
		} as State);

		this.hideControlsTimeoutId = setTimeout(() => {
			this.handlerMouseLeave();
		}, 3000);
	};

	private cancelFullscreen(): void {
		if (document['cancelFullScreen']) {
			document['cancelFullScreen']();
		} else if (document['mozCancelFullScreen']) {
			document['mozCancelFullScreen']();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}

		this.setState({
			fullScreen: false
		} as State);
	}

	private drawLoading(): JSX.Element {
		if (this.state.loading) {
			return (
				<div className="ui-video-player-loading"/>
			);
		}
	}

	private drawStalled(): JSX.Element {
		if (this.state.stalled) {
			return (
				<div className="ui-video-player-stalled">
					<p>Media data is not available</p>
				</div>
			);
		}
	}

	private drawPlayStopSplash(): JSX.Element {
		let className: string = "ui-video-player-ps-splash play";

		if (!this.state.paused || this.state.loading) {
			className += " hide";
		}

		if (!this.state.adv && this.state.paused) {
			return (
				<div
					onClick={this.handlerPlayStop}
					className={className}
				/>
			);
		}
	}

	private getControls(): JSX.Element {
		if (this.props.controls) {
			return (
				<UIVideoControlsComponent
					played={this.player ? this.player.paused : true}
					mute={this.player ? this.state.muted : true}
					duration={this.state.duration}
					currentTime={this.state.currentTime}
					handlerPlayStop={this.handlerPlayStop}
					handlerChangeCurrentTime={this.handlerSeekBarChange}
					handlerToggleSound={this.handlerSoundsToggler}
					handlerChangeSoundLevel={this.handlerChangeSoundLevel}
					handlerFullscreen={this.handlerFullscreen}
					progressEnd={this.state.progressEnd}
					hide={this.state.hideControls}
					soundLevel={this.state.soundLevel}
					fullscreenEnable={this.state.fullScreen}
				/>
			);
		}
	}

	public render() {
		let className: string = "ui-video-player-component";

		if (this.state.fullScreen && this.state.hideControls) {
			className += " hide-cursor";
		}

		return (
			<div
				className={className}
				style={{
					width: this.props.width ? this.props.width + 'px' : '100%'
				}}
				ref={(playerContainer) => {
					this.playerContainer = playerContainer;
				}}
			>
				{this.drawLoading()}
				{this.drawStalled()}
				{this.drawPlayStopSplash()}

				<video
					width="100%"
					height={this.props.height ? this.props.height : ''}
					ref={(player) => {
						this.player = player;
					}}
					onClick={this.handlerVideoClick}
					poster={this.props.poster}
				>
					{this.getSources()}
				</video>


				{this.getControls()}
				{this.drawAdv()}
			</div>
		);
	}
}