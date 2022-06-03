import React, { Component } from 'react';
class Canvas extends Component {
    constructor(props) {
        super(props);
        this.limit = 4;
        this.scale = 0.005;
        this.original = { x: 0, y: 0 };
        this.paint = this.paint.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.init = this.init.bind(this);
    }

    zoomIn(e) {
        console.log(this.original);
        var rectX = e.clientX - this.rectangle.left;
        var rectY = e.clientY - this.rectangle.top;
        console.log(rectX, rectY);
        var x = -this.canvas.width / 2 + rectX;
        var y = this.canvas.height / 2 - rectY;
        console.log(x, y);
        this.original.x += this.scale * (x);
        this.original.y += this.scale * (y);
        this.scale *= 0.5;
        console.log(this.original);
        this.paint();
    }

    componentDidMount() {
        window.addEventListener("load", () => { this.init(); this.paint() });
    }

    state = {}

    init() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.rectangle = this.canvas.getBoundingClientRect();
    }

    paint() {
        var position = 0;
        for (var x = -this.canvas.width / 2; x < this.canvas.width / 2; x++) {
            for (var y = -this.canvas.height / 2; y < this.canvas.height / 2; y++) {
                var ax = this.original.x + x * this.scale;
                var ay = this.original.y + y * this.scale;

                var a1 = ax;
                var b1 = ay;
                var lp = 0;
                while (1) {
                    //{Do one iteration.}
                    lp = lp + 1;
                    var a2 = a1 * a1 - b1 * b1 + ax;
                    var b2 = 2 * a1 * b1 + ay;
                    a1 = a2;
                    b1 = b2;
                    if ((lp > 500) || ((a1 * a1) + (b1 * b1) > this.limit))
                        break;
                }
                if (lp > 255) {
                    lp = 255;
                }
                this.imageData.data[position] = lp;
                this.imageData.data[position + 1] = lp;
                this.imageData.data[position + 2] = lp;
                this.imageData.data[position + 3] = lp;
                position += 4;
            }
        }
        this.context.putImageData(this.imageData, 0, 0);
    }

    render() {
        var dimX = 640;
        var dimY = 640;
        return (<canvas style={{ border: "1px solid black" }} id="canvas" width={dimX} height={dimY} onClick={this.zoomIn}>  </canvas>);

    }
}

export default Canvas;