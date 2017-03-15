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
        let src: VideoSource[] = [{
            source: 'http://www.html5videoplayer.net/videos/toystory.mp4',
            // source: '',
            type: VideoSourceType.video_mp4
        }];

        return (
            <div>
                <UIVideoComponent width={800} sources={src}/>
            </div>
        );
    }
}