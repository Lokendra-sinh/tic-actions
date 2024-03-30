
const { createCanvas } = require('canvas');

function generateGameBoard(){

    const containerHeight = 500;
    const containerWidth = 500;
    const canvasHeight = containerHeight + 200;
    const canvasWidth = containerWidth + 200;
    const boxSize = containerHeight / 3;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(100, 100, containerWidth, containerHeight);


    for (let i = 1; i <= 2; i++) {
        const x = 100 + i * boxSize;
        ctx.moveTo(x, 100);
        ctx.lineTo(x, 100 + containerHeight);
      }

      for (let i = 1; i <= 2; i++) {
        const y = 100 + i * boxSize;
        ctx.moveTo(100, y);
        ctx.lineTo(100 + containerWidth, y);
      }

      ctx.stroke();
      ctx.closePath();

        return canvas.toBuffer();

}

module.exports = generateGameBoard;