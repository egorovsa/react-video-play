/// <reference types="react" />
import * as React from 'react';
export interface VideoSliderSlide {
    img: string;
    link: string;
}
export interface Props {
    slides: VideoSliderSlide[];
    containerWidth?: number;
    minSlides?: number;
    sliderWidth?: number;
    minSlideSpace?: number;
    show: boolean;
}
export interface State {
    containerWidth: number;
}
export declare class UIVideoSlider extends React.Component<Props, State> {
    state: State;
    static defaultProps: Props;
    private slider;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private handlerResize;
    private getSlideStyle();
    private getSlidesContainerWidth();
    private drawSlides();
    private getWrapperWidth();
    render(): JSX.Element;
}
