# react-html5-video

![react-stores](https://github.com/egorovsa/React-html5-video/blob/master/screenshot.png?raw=true)

React video player with preview slider and adv like youtube

## How to install
```
npm i react-html5-video --save
```

## How to use

```typescript
import {ReactHtml5Video} from 'react-html5-video';

//JSX
    <ReactHtml5Video
        sources={src}
        poster="http://lorempixel.com/900/450/people/"
        advComponent={<UIVideoAdvTest/>}
    />
```


## Options

+ `sources` (Source[], required) - video source

```typescript
    export interface Source {
    	name: string,
    	source: VideoSource[]
    }

    export interface VideoSource {
        source: string,
        type: VideoSourceType,
        codecs?: string
    }

    export enum VideoSourceType{
    	video_mp4,
    	video_webm,
    	videi_ogg
    }
```

#### Source example
