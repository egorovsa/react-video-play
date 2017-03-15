import * as React from 'react';

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
    width: number,
    height?: number,
    controls?: boolean,
    autoPlay?: boolean,
    loop?: boolean,
    sources: VideoSource[]
}

export interface State {
}

export class UIVideoComponent extends React.Component<Props, State> {
    static state: State = {} as State;

    static defaultProps: Props = {} as Props;

    private player;
    private playerContainer;

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

    public render() {
        return (
            <div
                className="ui-video-player-component"
                ref={(playerContainer)=>{
                    this.playerContainer = playerContainer;
                }}
            >
                <video
                    width={this.props.width}
                    height={this.props.height?this.props.height:''}
                    controls
                    ref={(player)=>{
                        this.player = player;
                    }}
                >
                    {this.getSources()}
                </video>
            </div>
        );
    }
}