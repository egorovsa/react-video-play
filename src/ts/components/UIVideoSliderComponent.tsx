import * as React from 'react';

export interface VideoSliderSlide {
	img: string,
	link: string
}

export interface Props {
	slides: VideoSliderSlide[],
	containerWidth?: number,
	minSlides?: number,
	sliderWidth?: number,
	minSlideSpace?: number,
	show: boolean
}

export interface State {
	containerWidth: number
}

export class UIVideoSlider extends React.Component<Props, State> {
	state: State = {
		containerWidth: 0
	};

	static defaultProps: Props = {
		minSlides: 3,
		sliderWidth: 100,
		minSlideSpace: 20,
		show: false
	} as Props;

	private slider: HTMLDivElement;

	componentDidMount() {
		if (!this.props.containerWidth) {
			this.handlerResize();

			window.addEventListener('resize', this.handlerResize)
		} else {
			this.setState({
				containerWidth: this.props.containerWidth
			} as State);
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handlerResize)
	}

	private handlerResize = (): void => {
		if (this.slider) {
			let computedStyle: CSSStyleDeclaration = window.getComputedStyle(this.slider);
			let width: number = this.slider.offsetWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);

			this.setState({
				containerWidth: width
			} as State);
		}
	};

	private getSlideStyle(): Object {
		return {
			marginLeft: this.props.minSlideSpace / 2,
			marginRight: this.props.minSlideSpace / 2
		}
	}

	private getSlidesContainerWidth(): number {
		return (this.props.sliderWidth + this.props.minSlideSpace) * this.props.slides.length;
	}

	private drawSlides(): JSX.Element[] {
		return this.props.slides.map((slide: VideoSliderSlide, i: number) => {
			return (
				<div key={i} className="ui-video-adv-slide" style={this.getSlideStyle()}>
					<a href={slide.link}>
						<img src={slide.img}/>
					</a>
				</div>
			);
		})
	}

	private getWrapperWidth(): number {
		let width = this.state.containerWidth;
		let slidersCountInPage: number = Math.floor((width) / (this.props.sliderWidth + this.props.minSlideSpace));

		if (slidersCountInPage > this.props.slides.length) {
			slidersCountInPage = this.props.slides.length
		}

		return slidersCountInPage * (this.props.sliderWidth + this.props.minSlideSpace)
	}

	public render() {
		return (
			<div
				className={this.props.show ? "ui-video-adv-slider" : "ui-video-adv-slider hide"}
				style={{width: this.props.containerWidth ? this.props.containerWidth : '100%'}}
				ref={(ref) => {
					this.slider = ref
				}}
			>
				<div className="ui-video-adv-slider-wrapper" style={{width: this.getWrapperWidth()}}>
					<div className="slides-container" style={{width: this.getSlidesContainerWidth() + 'px'}}>
						{this.drawSlides()}
					</div>
				</div>
			</div>
		);
	}
}