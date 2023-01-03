import React, { useRef, useState, useEffect } from 'react';
import { fabric } from "fabric";
import Button from 'react-bootstrap/Button';

function MyDrawing() {

  let [canvas, setCanvas] = useState<any>(null);

  const ClearCanvas = () => {
    canvas.remove.apply(canvas, canvas.getObjects())
  }

  useEffect(() => {
    if (canvas === null) return;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width=5;
    canvas.freeDrawingBrush.color="black";
    canvas.isDrawingMode = true;
    canvas.on('path:created', function (e) {
      console.log('path:created');
    })
  }, [canvas]);

  useEffect(() => {
    const canvas = new fabric.Canvas('myCanvas');
    setCanvas(canvas);
  }, []);

  return (
    <div id='NumericJudger'>
      <div id='CnavasDiv'>
        <div id='Canvas'><canvas id="myCanvas" width={300} height={300} /></div>
        <div id='ButtonContainer'>
          <Button variant="outline-secondary" onClick={ClearCanvas}>Delete</Button>
        </div>
      </div>
    </div>
  );
}

export default MyDrawing;
