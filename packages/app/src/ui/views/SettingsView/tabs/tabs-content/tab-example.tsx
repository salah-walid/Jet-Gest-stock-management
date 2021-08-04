import React, { Component } from 'react';

interface Props{
    title: string
}

export default class TabExample extends Component<Props> {
    render() {
        return (
            <div>
                {this.props.title}
            </div>
        )
    }
}
