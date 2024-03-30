const { createCanvas } = require("canvas");

function generateGameBoard(gameState) {
  const containerHeight = 500;
  const containerWidth = 500;
  const canvasHeight = containerHeight + 200;
  const canvasWidth = containerWidth + 200;
  const boxSize = containerHeight / 3;
  const row = ["A", "B", "C"];
  const col = ["1", "2", "3"];
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.strokeStyle = "white";
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

  // render row titles (A, B, C)
  for(let i = 0; i < 3; i++){
    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText(row[i], 50, 100 + (i + 1) * boxSize - 75);
  }

    // render column titles (1, 2, 3)
    for(let i = 0; i < 3; i++){
        ctx.font = "30px Arial";
        ctx.fillStyle = "green";
        ctx.fillText(col[i], 100 + (i + 1) * boxSize - 75, 50);
        }

    // render moves

    gameState.moves.forEach(move => {

        switch (move.position){
            case 'A1':
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(move.player, 100 + 0.5 * boxSize, 100 + 0.5 * boxSize);
                break;
            case 'A2':
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(move.player, 100 + 0.5 * boxSize, 100 + 1.5 * boxSize);
                break;
            case 'A3':
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(move.player, 100 + 0.5 * boxSize, 100 + 2.5 * boxSize);
                break;
            case 'B1':
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(move.player, 100 + 1.5 * boxSize, 100 + 0.5 * boxSize);
                break;
            case 'B2':
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(move.player, 100 + 1.5 * boxSize, 100 + 1.5 * boxSize);
                break;
            case 'B3':
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(move.player, 100 + 1.5 * boxSize, 100 + 2.5 * boxSize);
                break;
            case 'C1':
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(move.player, 100 + 2.5 * boxSize, 100 + 0.5 * boxSize);
                break;
            case 'C2':
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(move.player, 100 + 2.5 * boxSize, 100 + 1.5 * boxSize);
                break;
            case 'C3':
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(move.player, 100 + 2.5 * boxSize, 100 + 2.5 * boxSize);
                break;
            default:
                break;
        }
    })

  ctx.stroke();
  ctx.closePath();

  return canvas.toBuffer();
}

module.exports = generateGameBoard;
