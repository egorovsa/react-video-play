import * as React from 'react';

export interface Props {
	loaderColor?: string
}

export interface State {

}

export class UIVideoLoader extends React.Component<Props, State> {
	state: State = {};

	static defaultProps: Props = {
		loaderColor: "#fff"
	} as Props;

	public render() {
		return (
			<div className="ui-video-loader">
				<svg className="ui-video-loader-circular" viewBox="25 25 50 50" stroke={this.props.loaderColor}>
					<circle
						className="ui-video-loader-path"
						cx="50"
						cy="50"
						r="20"
						fill="none"
						strokeWidth="3"
						strokeMiterlimit="10"
					/>
				</svg>
			</div>
		);
	}
}