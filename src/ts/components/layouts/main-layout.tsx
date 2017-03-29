import * as React from 'react';
import {UIVideoComponent, VideoSource, VideoSourceType} from "../ui/UIVideoComponent";

export interface Props {

}

export interface State {

}

export class AppComponent extends React.Component<Props, State> {
    state: State = {};

    //static defaultProps: Props = {} as Props;

    public render() {
        let src: VideoSource[] = [
            {
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
            }
        ];

        return (
            <div>
                <div className="container">
                    <UIVideoComponent
                        sources={src}
                        poster="https://placeholdit.imgix.net/~text?txtsize=42&txt=React-Html5 Video Player&w=900&h=450"
                    />
                </div>
            </div>
        );
    }
}