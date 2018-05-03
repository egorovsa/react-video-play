import * as React from 'react';
import {UIVideoSlider} from "./components/UIVideoSliderComponent";
import {UIVideoLoader} from "./components/UIVideoLoaderComponent";
import {UIVideoControlsComponent} from "./components/UIVideoControlsComponent";
import {isMobile} from 'is-mobile';


export interface VideoSliderSlide {
	img: string;
	link: string;
}

export enum VideoSourceType {
	video_mp4 = 'video/mp4',
	video_webm = 'video/webm',
	video_ogg = 'video/ogg'
}

export interface VideoSource {
	source: string,
	type: VideoSourceType,
	codecs?: string
}

export interface Source {
	name: string,
	source: VideoSource[],
	default?: boolean
}

export interface Props {
	sources: Source[],
	enableSlider?: boolean,
	sliderSlides?: VideoSliderSlide[],
	hideSliderInMobile?: boolean,
	enableAdv?: boolean,
	advComponent?: JSX.Element
	poster?: string,
	width?: number,
	height?: number,
	controls?: boolean,
	autoplay?: boolean,
	loop?: boolean,
	muted?: boolean,
	showSourceName?: boolean,
	ambiLight?: boolean,
	loaderColor?: string
}

export interface State {
	containerWidth: number,
	currentVolume: number,
	duration: number,
	currentTime: number,
	progressEnd: number,
	soundLevel: number,
	soundLevelSave: number,
	srcIndex: number,
	adv: boolean,
	hideControls: boolean,
	muted: boolean,
	fullScreen: boolean,
	loading: boolean,
	stalled: boolean,
	paused: boolean,
	quality: boolean
}

export class ReactVideoPlay extends React.Component<Props, State> {
	state: State = {
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

	static defaultProps: Props = {
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
	} as Props;

	private player: HTMLVideoElement;
	private canvas: HTMLCanvasElement;
	private playerContainer: HTMLDivElement;
	private interval: any = null;
	private intervalAmbient: any = null;
	private hideControlsTimeoutId: any = null;

	componentDidMount() {
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

		let defaultSourceIndex: number = this.getDefaultSourceIndex();

		if (defaultSourceIndex !== this.state.srcIndex) {
			this.setState({
				srcIndex: defaultSourceIndex
			} as State, () => {
				this.setSource(this.props.autoplay);
			});
		} else {
			this.setSource(this.props.autoplay);
		}

		if (this.props.muted) {
			this.handlerSoundsToggler()
		}
	}

	componentWillUnmount() {
		this.playerContainer.removeEventListener('mouseenter', this.handlerMouseEnter);
		this.playerContainer.removeEventListener('mouseleave', this.handlerMouseLeave);
		this.playerContainer.removeEventListener("webkitfullscreenchange", this.onFullscreenChange);
		this.playerContainer.removeEventListener("mozfullscreenchange", this.onFullscreenChange);
		this.playerContainer.removeEventListener("fullscreenchange", this.onFullscreenChange);
		this.playerContainer.removeEventListener('mousemove', this.handlerMouseMove);
		this.playerContainer.removeEventListener('click', this.setFocusToPlayerContainer);

		window.removeEventListener('keydown', this.handlerKeys);
		window.removeEventListener('resize', this.handlerWindowResize);
	}

	private playAmbient(stop?: boolean): void {
		if (this.props.ambiLight && this.canvas) {
			if (!stop) {
				let ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');

				this.intervalAmbient = setInterval(() => {
					ctx.drawImage(this.player, 0, 0, this.player.offsetWidth, this.player.offsetHeight);
				}, 30);
			} else {
				clearInterval(this.intervalAmbient);
			}
		}
	}

	private getDefaultSourceIndex(): number {
		let defaultStatusSourceIndex: number = this.state.srcIndex;

		this.props.sources.map((src: Source, i: number) => {
			if (src.default && src.default === true) {
				defaultStatusSourceIndex = i;
			}
		});

		return defaultStatusSourceIndex;
	}

	private setFocusToPlayerContainer = (): void => {
		this.playerContainer.focus();
	};

	private handlerKeys = (e): void => {
		if (document.activeElement === this.playerContainer) {
			let volume: number = 0;

			switch (e.keyCode) {
				case 32:
					this.handlerPlayStop(true);
					break;
				case 37:
					this.handlerSeekBarChange(this.player.currentTime - 1);
					break;
				case 39:
					this.handlerSeekBarChange(this.player.currentTime + 0.5);
					break;
				case 38:
					volume = this.player.volume + 0.1 > 1 ? 1 : this.player.volume + 0.1;
					this.handlerChangeSoundLevel(volume * 100);
					break;
				case 40:
					volume = this.player.volume - 0.1 < 0 ? 0 : this.player.volume - 0.1;
					this.handlerChangeSoundLevel(volume * 100);
					break;
			}
		}
	};

	private handlerWindowResize = (): void => {
		if (this.props.width) {
			this.setState({
				containerWidth: this.props.width
			} as State);
		} else {
			if (this.playerContainer) {
				this.setState({
					containerWidth: this.playerContainer.offsetWidth
				} as State);
			}
		}
	};

	private handlerMouseMove = (): void => {
		if (!isMobile()) {
			this.controlsHider()
		}
	};

	private handlerMouseEnter = (): void => {
		this.setState({
			hideControls: false,
		} as State);
	};

	private handlerMouseLeave = (): void => {
		if (!this.player.paused) {
			this.setState({
				hideControls: true,
				quality: false
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

			this.player.addEventListener('pause', () => {
				this.pause(true);
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

	private controlsHider(timeout: number = 3000): void {
		this.setState({
			hideControls: false
		} as State);

		if (this.hideControlsTimeoutId) {
			clearTimeout(this.hideControlsTimeoutId);
		}

		if (!this.state.adv && this.state.fullScreen) {
			this.hideControlsTimeoutId = setTimeout(() => {
				this.handlerMouseLeave();
			}, timeout);
		}
	}

	private handlerSeekBarChange = (value: number): void => {
		this.player.currentTime = value;

		this.setState({
			currentTime: value
		} as State, () => {
			if (isMobile()) {
				this.controlsHider();
			}
		});
	};

	private drawAdv(): JSX.Element {
		if (this.props.enableAdv && this.props.advComponent) {
			return (
				<div className={this.state.adv ? "adv-main-container" : "adv-main-container hide"}>
					{this.props.advComponent}
				</div>
			)
		}
	}

	private drawSlider(): JSX.Element {
		if (this.props.enableSlider && this.props.sliderSlides && !(isMobile() && this.props.hideSliderInMobile)) {
			return (
				<UIVideoSlider show={this.state.adv} slides={this.props.sliderSlides}/>
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

		if (isMobile()) {
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

		if (isMobile()) {
			this.controlsHider();
		}
	};

	private handlerPlayStop = (adv?): void => {
		if (this.player.paused) {
			this.play();
			this.playAmbient()
		} else {
			this.pause(adv);
			this.playAmbient(true);
		}
	};

	private handlerChangeQualityClick = (index: number): void => {
		let currentTime: number = this.player.currentTime;

		this.setState({
			srcIndex: index,
			quality: false
		} as State, () => {
			this.setSource(!this.state.paused, currentTime);
		});
	};

	private setSource(play?: boolean, currentTime?: number): void {
		for (let i = 0; i < this.props.sources[this.state.srcIndex].source.length; i++) {
			let src: VideoSource = this.props.sources[this.state.srcIndex].source[i];
			let type: string = src.type;

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
	}

	private play(): void {
		this.player.play();

		this.setState({
			adv: false,
			paused: false
		} as State, () => {
			if (isMobile()) {
				this.controlsHider();
			}
		});
	}

	private pause(adv?): void {
		this.player.pause();

		clearInterval(this.interval);

		this.setState({
			paused: true,
			hideControls: false
		} as State);

		if (adv) {
			this.setState({
				adv: true,
			} as State);
		}
	}

	private handlerVideoClick = (): void => {
		if (!isMobile()) {
			this.handlerPlayStop();
		} else {
			this.setState({
				hideControls: false
			} as State);

			this.controlsHider(6000)
		}
	};

	private onFullscreenChange = (): void => {
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

		if (isMobile()) {
			this.controlsHider();
		}

		this.handlerWindowResize()
	};

	private handlerFullscreen = (): void => {
		if (this.state.fullScreen) {
			this.cancelFullscreen();
		} else {
			this.launchFullScreen(this.playerContainer);
		}
	};

	private handlerQuality = (): void => {
		if (this.state.quality) {
			this.setState({
				quality: false
			} as State);
		} else {
			clearTimeout(this.hideControlsTimeoutId);

			this.setState({
				quality: true
			} as State);
		}
	};

	private launchFullScreen = (element): void => {
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
				<UIVideoLoader loaderColor={this.props.loaderColor}/>
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

		if (!this.state.paused) {
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

	private drawQuality(): JSX.Element {
		let className = this.state.quality ? "ui-video-player-src " : "ui-video-player-src hide";

		return (
			<div className={className}>
				{
					this.props.sources.map((source: Source, i: number) => {
						return (
							<div
								className={i === this.state.srcIndex ? "src-one active" : "src-one"}
								onClick={() => this.handlerChangeQualityClick(i)}
								key={i}
							>
								{source.name}
							</div>
						)
					})
				}
			</div>
		)
	}

	private getControls(): JSX.Element {
		if (this.props.controls) {
			return (
				<UIVideoControlsComponent
					played={this.player ? this.player.paused : true}
					mute={this.player ? this.state.muted : true}
					duration={this.state.duration}
					currentTime={this.state.currentTime}
					progressEnd={this.state.progressEnd}
					hide={this.state.hideControls}
					soundLevel={this.state.soundLevel}
					fullscreenEnable={this.state.fullScreen}
					showSourceName={this.props.showSourceName}
					sourceName={this.props.sources[this.state.srcIndex].name}
					handlerPlayStop={this.handlerPlayStop}
					handlerChangeCurrentTime={this.handlerSeekBarChange}
					handlerToggleSound={this.handlerSoundsToggler}
					handlerChangeSoundLevel={this.handlerChangeSoundLevel}
					handlerFullscreen={this.handlerFullscreen}
					handlerQuality={this.handlerQuality}
				/>
			);
		}
	}

	private drawAmbiLight(): JSX.Element {
		if (this.props.ambiLight) {
			return (
				<canvas
					ref={(ref) => {
						this.canvas = ref
					}}
					className="ambiLight"
					style={{
						width: this.props.width ? this.props.width + 'px' : '100%',
						minHeight: ((this.state.containerWidth / 100) * 56) + 'px'
					}}
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
				tabIndex={0}
				className={className}
				style={{
					width: this.props.width ? this.props.width + 'px' : '100%',
					minHeight: ((this.state.containerWidth / 100) * 56) + 'px'
				}}
				ref={(playerContainer) => {
					this.playerContainer = playerContainer;
				}}
			>
				{this.drawAmbiLight()}

				<div className="ui-video-player-wrapper">
					{this.drawLoading()}
					{this.drawStalled()}
					{this.drawPlayStopSplash()}
					{this.getControls()}
					{this.drawAdv()}
					{this.drawSlider()}
					{this.drawQuality()}

					<video
						width="100%"
						height={this.props.height ? this.props.height : ''}
						ref={(player) => {
							this.player = player;
						}}
						onClick={this.handlerVideoClick}
						poster={this.props.poster}
					>
						{this.props.children}
					</video>
				</div>
			</div>
		);
	}
}