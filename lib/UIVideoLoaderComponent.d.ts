/// <reference types="react" />
import * as React from 'react';
export interface Props {
    loaderColor?: string;
}
export interface State {
}
export declare class UIVideoLoader extends React.Component<Props, State> {
    state: State;
    static defaultProps: Props;
    render(): JSX.Element;
}
