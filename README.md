# react-video-play

React video player for TypeScript and JavaScript like youtube

![react-video-play](https://github.com/egorovsa/react-video-play/blob/master/screenshot.png?raw=true)

Demo [react-video-play](http://video.egorov.pw)

## How to install
```
npm i react-video-play --save
```

## How to import

For TypeScript usage there is an index.d.ts in node_modules folder
```typescript
import {ReactVideoPlay, VideoSourceType} from 'react-video-play';
```

or

```javascript
var ReactVideoPlay =  require('react-video-play');
var VideoSourceType =  require('react-video-play').VideoSourceType;
```

## How to use

### CSS

Use css and images. There is a public folder in node_modules/react-video-play
```
node_modules/react-video-play/public/css/react-video-play.css
```

### TSX / JSX

```typescript jsx
    <ReactVideoPlay
        sources={src}
        poster="http://lorempixel.com/900/450/people/"
        advComponent={<UIVideoAdvTest/>}
        enableSlider={true}
        sliderSlides={slides}
        autoplay={true}
        muted={true}
    />
```

## Options
+ `sources` (Source[], required) - video source's interfaces for TypeScript implementations

```typescript
    interface Source {
    	name: string,
    	default?: boolean,
    	source: VideoSource[]
    }

    enum VideoSourceType{
        video_mp4,
        video_webm,
        video_ogg
    }

    interface VideoSource {
        source: string,
        type: VideoSourceType,
        codecs?: string
    }
```

#### Source example

```typescript
    import {VideoSourceType} from 'react-video-play';
    // or const VideoSourceType =  require('react-video-play').VideoSourceType;

    let src = [
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
                type: VideoSourceType.video_ogg
            }]
        }, {
            name: '720p',
            default: true,
            source: [{
                source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.mp4',
                type: VideoSourceType.video_mp4
            }, {
                source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.webm',
                type: VideoSourceType.video_webm
            }, {
                source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.ogv',
                type: VideoSourceType.video_ogg
            }, {
                source: 'http://easyhtml5video.com/assets/video/new/Penguins_of_Madagascar.m4v',
                type: VideoSourceType.video_mp4
            }]
         }
    ];
```

+ `enableSlider` (boolean, default: false) - enable preview slider
+ `hideSliderInMobile` (boolean, default: true) - hide slider in mobile devices
+ `sliderSlides` (VideoSliderSlide[], required if enableSlider installed true) - slides

```typescript
    interface VideoSliderSlide {
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
+ `autoplay` (boolean, default: false) - autoplay video after start
+ `muted` (boolean, default: false) - muted by default
+ `showSourceName` (boolean, default: false) - prefer source name to HQ icon
+ `ambiLight` (boolean, default: false) - switch on Philips ambilight
+ `loaderColor` (string, default: "#fff") - default loader color

## For development
just use:

```
$ yarn or $ npm i
$ npm run dev
```

open your browser http://localhost:3000

## For Build

`
$ npm run production
`
