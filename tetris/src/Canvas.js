import React, { Component } from 'react';

class Canvas extends Component {

    constructor(props) {
        super(props);
        let md = [];
        for (var i = 0; i < 250; i++) {
            md.push(new Array(250).fill(null));
        }

        this.state = { pixels: md };

    }

    render() {
        return (<div><p>return this</p></div>);
    }
}

export default Canvas;