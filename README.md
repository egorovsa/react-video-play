# react-html5-video

![react-stores](https://github.com/egorovsa/React-html5-video/blob/master/screenshot.png?raw=true)

React video player with preview slider and adv like youtube

Demo [react-html5-video](http://video.egorov.pw)

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
        enableSlider={true}
        sliderSlides={slides}
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

```typescript
    let src: Source[] = [
        {
            name: '1080p',
            source: [{
                source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4',
                type: VideoSourceType.video_mp4 // for ES5 just type:0
            }, {
                source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm',
                type: VideoSourceType.video_webm // for ES5 just type:1
            }, {
                source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.ogv',
                type: VideoSourceType.videi_ogg // for ES5 just type:2
            }]
        }, {
            name: '720p',
            source: [{
                source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4',
                type: VideoSourceType.video_mp4 // for ES5 just type:0
            }, {
                source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm',
                type: VideoSourceType.video_webm // for ES5 just type:1
            }, {
                source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.ogv',
                type: VideoSourceType.videi_ogg  // for ES5 just type:2
            }, {
                source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.m4v',
                type: VideoSourceType.video_mp4 // for ES5 just type:0
            }]
         }
    ];
```


+ `enableSlider` (boolean, default: false) - enable preview slider
+ `hideSliderInMobile` (boolean, default: true) - hide slider in mobile devices
+ `sliderSlides` (VideoSliderSlide[], required if enableSlider installed true) - slides

```typescript
    export interface VideoSliderSlide {
    	img: string,
    	link: string
    }
```

#### sliderSlides example

```typescript
    slides: [
        {
            img: "http://lorempixel.com/100/75/people/",
            link: "http://video.egorov.pw",
        },
        {
            img: "http://lorempixel.com/100/75/city/",
            link: "http://video.egorov.pw",
        }
    ]
```

+ `enableAdv` (boolean, default: true) - enable ADV, it will be shown whenever player pause
+ `advComponent` (JSX.Element, required if enableAdv installed true) - React component for ADV
+ `poster` (string, default: none) - show preview video image
+ `width` (number, default: none) - video container width
+ `height` (number, default: none) - video container height
+ `controls` (boolean, default: true) - controls


## For development
just use:

+ $ yarn or $ npm i
+ $ gulp

open your browser http://localhost:3000

## For Build

$ ./production