import React, { useRef, useState, useEffect } from 'react';
import { fabric } from "fabric";
import Button from 'react-bootstrap/Button';

function MyDrawing() {

  let [canvas, setCanvas] = useState<any>(null);

  const ClearCanvas = () => {
    canvas.remove.apply(canvas, canvas.getObjects())
  }

  const SendBinary = (e) => {
    // 画像をバイナリに変換
    // create a new canvas element to store the data
    const dataCanvas = document.createElement('canvas');
    dataCanvas.width = canvas.getWidth();
    dataCanvas.height = canvas.getHeight();

    // copy the data from the original canvas to the new canvas
    const ctx = dataCanvas.getContext('2d');
    ctx.drawImage(canvas.getElement(), 0, 0);

    // get the data from the new canvas as a binary data
    const data = dataCanvas.toDataURL('image/png');
    const binaryData = atob(data.split(',')[1]);
    var buffer = new Uint8Array(binaryData.length);
    for (var i = 0; i < binaryData.length; i++) {
      buffer[i] = binaryData.charCodeAt(i);
    }
    // Blobを作成
    var blob = new Blob([buffer.buffer]);
    // BlobをFormDataに追加
    var formData = new FormData();
    formData.append('image', blob);
    // FormDataをPOST
    fetch('/api/numeric-judger', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
  };

  useEffect(() => {
    if (canvas === null) return;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width=5;
    canvas.freeDrawingBrush.color="black";
    canvas.isDrawingMode = true;
    canvas.on('path:created', SendBinary);
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
