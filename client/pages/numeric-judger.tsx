import React, { useState, useEffect } from 'react';
import { fabric } from "fabric";
import Button from 'react-bootstrap/Button';
import {
  Chart as ChartJS,
  registerables,
} from 'chart.js'
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  ...registerables,
);

const options = {
  scales: {
    y: {
      ticks: {
        callback: function(value: number, _: any) {
          return `${value} %`;
        },
      },
    },
  },
};

function MyDrawing() {

  let [canvas, setCanvas] = useState<any>(null);
  const [predicted, setPredicted] = useState<number[]>([]);

  const ClearCanvas = () => {
    canvas.remove.apply(canvas, canvas.getObjects())
  }

  const Judge = () => {
    setPredicted([]);
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
    const buffer = new Uint8Array(binaryData.length);
    for (var i = 0; i < binaryData.length; i++) {
      buffer[i] = binaryData.charCodeAt(i);
    }
    // Blobを作成
    const blob = new Blob([buffer.buffer]);
    // maltipart/form-dataでPOST
    fetch('/api/numeric-judge', {
      method: 'POST',
      headers: {
        'Content-Type': "maltipart/form-data",
      },
      body: blob,
    })
    .then(res => res.json())
    .then(data => {
      let predicted: number[] = [];
      for (let i = 0; i < 10; i++) {
        predicted.push(data[i]);
      }
      setPredicted(predicted);
    });
  };

  useEffect(() => {
    if (canvas === null) return;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width=5;
    canvas.freeDrawingBrush.color="black";
    canvas.isDrawingMode = true;
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
          <Button variant="outline-primary" onClick={Judge}>🦁 Judge 🦁</Button>
        </div>
      </div>
      <div id='ChartDiv'>
        <Bar
          data={{
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            datasets: [
              {
                label: 'Probability',
                data: predicted,
              }
            ],
          }}
          options={options}
        />
      </div>
    </div>
  );
};

export default MyDrawing;
