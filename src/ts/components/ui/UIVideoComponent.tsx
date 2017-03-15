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
    fullScreen: boolean,
    currentSeek: number,
    currentVolume: number,
    duration: number,
    currentTime: number
}

export class UIVideoComponent extends React.Component<Props, State> {
    state: State = {
        fullScreen: false,
        currentSeek: 0,
        currentVolume: 0,
        duration: 0,
        currentTime: 0
    };

    static defaultProps: Props = {} as Props;

    private player: HTMLVideoElement;
    private playerContainer;

    componentDidMount() {
        this.events();
        this.initControls();
    }


    private events(): void {

        if (this.player) {
            this.player.addEventListener('playing', () => {
                setInterval(() => {
                    this.setState({
                        currentTime: +this.player.currentTime
                    } as State);
                }, 100);
            });

            this.player.addEventListener('loadeddata', () => {
                this.setState({
                    duration: this.player.duration
                } as State);
            });
        }

    }

    private initControls(): void {
        if (this.player) {
            this.initFullScreen();
        }
    }

    private initFullScreen(): void {

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

    private drawControls(): JSX.Element {
        return (
            <div className="ui-video-player-controls">
                <div className="play-block">&nbsp;</div>
                {this.drawSeekBar()}
            </div>
        )
    }

    private seekBarChangeHandler = (e): void => {
        this.player.currentTime = e.target.value;

        this.setState({
            currentTime: e.target.value
        } as State);
    };

    private drawSeekBar(): JSX.Element {
        return (
            <div className="seek-block">
                <input
                    type="range"
                    min="0"
                    max={this.state.duration}
                    step="0.1"
                    value={this.state.currentTime}
                    onChange={this.seekBarChangeHandler}
                />
            </div>
        )
    }

    private clickPlayStopHandler = (): void => {
        if (this.player.paused) {
            this.player.play();
        } else {
            this.player.pause();
        }
    };


    public render() {
        return (
            <div
                className="ui-video-player-component"
                style={{
                    width: this.props.width+'px'
                }}
                ref={(playerContainer)=>{
                    this.playerContainer = playerContainer;
                }}
            >
                <video
                    width="100%"
                    height={this.props.height?this.props.height:''}
                    ref={(player)=>{
                        this.player = player;
                    }}
                    onClick={this.clickPlayStopHandler}
                >
                    {this.getSources()}
                </video>

                {this.drawControls()}
            </div>
        );
    }
}