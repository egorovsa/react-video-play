import * as React from 'react';

export interface Props {
	loaderColor: string
}

export const UIVideoLoader = (props: Props) => {
	return <div className="ui-video-loader">
		<svg className="ui-video-loader-circular" viewBox="25 25 50 50" stroke={props.loaderColor}>
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
	</div>;
};