import React, { Component } from 'react';
class Canvas   extends Component {
    constructor(props) {
        super(props);
        this.limit = 30;
        this.scale = 0.02;
        this.paint = this.paint.bind(this);
    }

    componentDidMount(){
        window.addEventListener("load",this.paint);
    }
    state = {}

    paint() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var scale =0.001;
        var position =0;
        for (var x = -this.canvas.width/2; x < this.canvas.width/2; x++){
            for (var y = -this.canvas.width/2; y < this.canvas.width/2 ; y++) {
                // var ax = cx + x * scale;
                // var ay = cy + y * scale;
                var ax = x * scale;
                var ay = y * scale;

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
                    lp = 0;
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
        var dimX = 840;
        var dimY = 840;
        return ( <canvas id="canvas" width={dimX} height={dimY}>  </canvas> );

    }
}

export default Canvas;