import './App.css';
import React, { useEffect, useState } from 'react';
import { useRef } from "react";
function App() {
  var width, height;
  width = 800; height = 640;
  const cnv = useRef(null);
  const [image, setImage] = useState({ orig: null, compare: null });
  const [slider, setSlider] = useState(50);
  var ctx = null;


  useEffect(() => {
    ctx = cnv.current.getContext("2d");
    draw();
  }, [image.orig, image.compare, slider])

  //Source https://stackoverflow.com/questions/6775768/how-can-i-draw-an-image-from-the-html5-file-api-on-canvas
  function handleImage(e, position) {
    var reader = new FileReader();
    var file = e.target.files[0];
    // load to image to get it's width/height
    let img = new Image();
    setImage((prev) => ({ ...prev, [position]: img }));
    img.onload = function () {
      // setup scaled dimensions
      var dim = getScaledDim(img, ctx.canvas.dataMaxWidth, ctx.canvas.dataMaxHeight);
      // scale canvas to image
      ctx.canvas.width = dim.width;
      ctx.canvas.height = dim.height;
    }
    // this is to setup loading the image
    reader.onloadend = function () {
      img.src = reader.result;
    }
    // this is to read the file
    reader.readAsDataURL(file);
  }

  // returns scaled dimensions object
  function getScaledDim(img, maxWidth, maxHeight) {
    var scaled = {
      ratio: img.width / img.height,
      width: img.width,
      height: img.height
    }
    if (scaled.width > maxWidth) {
      scaled.width = maxWidth;
      scaled.height = scaled.width / scaled.ratio;
    }
    if (scaled.height > maxHeight) {
      scaled.height = maxHeight;
      scaled.width = scaled.height / scaled.ratio;
    }
    return scaled;
  }

  function draw() {
    let img = null;
    if (image && image.orig) {
      img = image.orig;
      ctx.drawImage(img, 0, 0, img.width * 0.01 * slider, img.height
        , 0, 0, ctx.canvas.width * 0.01 * slider, ctx.canvas.height
      );
    }
    if (image && image.compare) {
      img = image.compare;
      ctx.drawImage(img, img.width * 0.01 * slider, 0, img.width, img.height
        , ctx.canvas.width * 0.01 * slider, 0, ctx.canvas.width, ctx.canvas.height
      );
    }
  }

  return (
    <div className="App">
      <label>Scroller To Split the screen</label><input type="range" min="0" max="100" value={slider} onChange={(e) => setSlider(e.target.value)}></input>
      <label>image</label><input type="file" accept="image/*" onChange={(e) => handleImage(e, "orig")}></input>
      <label>image2</label><input type="file" accept="image/*" onChange={(e) => handleImage(e, "compare")}></input>
      <canvas style={{ border: "1px solid black", height, width }} ref={cnv} />
    </div>
  );
}

export default App;
