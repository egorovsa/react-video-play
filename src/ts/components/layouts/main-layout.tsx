import * as React from 'react';
import {Source, UIVideoComponent, VideoSource, VideoSourceType} from "../ui/UIVideoComponent";
import {UIVideoAdvTest} from "../ui/UIVideoAdvTestComponent";

export interface Props {

}

export interface State {

}

export class AppComponent extends React.Component<Props, State> {
	state: State = {};

	//static defaultProps: Props = {} as Props;

	public render() {
		let src: Source[] = [
			{
				name: '1080p',
				source: [{
					source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4',
					type: VideoSourceType.video_mp4
				}, {
					source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm',
					type: VideoSourceType.video_webm
				}, {
					source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.ogv',
					type: VideoSourceType.videi_ogg
				}, {
					source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.m4v',
					type: VideoSourceType.video_mp4
				}]
			}, {
				name: '720p',
				source: [{
					source: 'http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4',
					type: VideoSourceType.video_mp4
				}, {
					source: 'http://www.quirksmode.org/html5/videos/big_buck_bunny.webm',
					type: VideoSourceType.video_webm
				}, {
					source: 'http://www.quirksmode.org/html5/videos/big_buck_bunny.ogv',
					type: VideoSourceType.videi_ogg
				}]
			}, {
				name: '480p',
				source: [{
					source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4',
					type: VideoSourceType.video_mp4
				}, {
					source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm',
					type: VideoSourceType.video_webm
				}, {
					source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.ogv',
					type: VideoSourceType.videi_ogg
				}, {
					source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.m4v',
					type: VideoSourceType.video_mp4
				}]
			}, {
				name: '240p',
				source: [{
					source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4',
					type: VideoSourceType.video_mp4
				}, {
					source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm',
					type: VideoSourceType.video_webm
				}, {
					source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.ogv',
					type: VideoSourceType.videi_ogg
				}, {
					source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.m4v',
					type: VideoSourceType.video_mp4
				}]
			}

		];

		return (
			<div>
				<div className="container">
					<UIVideoComponent
						sources={src}
						poster="http://lorempixel.com/900/450/people/"
						advComponent={<UIVideoAdvTest/>}
					/>
				</div>
			</div>
		);
	}
}