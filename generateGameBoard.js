const { createCanvas } = require("canvas");

function generateGameBoard(gameState) {
  const containerHeight = 500;
  const containerWidth = 500;
  const canvasHeight = containerHeight + 200;
  const canvasWidth = containerWidth + 500;
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

        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(move.position === row[i] + col[j]){
                    ctx.shadowColor = "white";
                    ctx.shadowBlur = 10;
                    ctx.font = "70px Arial";
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.lineWidth = 2;
                    ctx.fillText(move.player, 100 + (j + 0.5) * boxSize, 100 + (i + 0.5) * boxSize);
                }
            }
        }
    })

    ctx.shadowColor = null;
    ctx.shadowBlur = 0;

    // check for game over condition or draw or winner

    const winningCombos = [
        ["A1", "A2", "A3"],
        ["B1", "B2", "B3"],
        ["C1", "C2", "C3"],
        ["A1", "B1", "C1"],
        ["A2", "B2", "C2"],
        ["A3", "B3", "C3"],
        ["A1", "B2", "C3"],
        ["A3", "B2", "C1"],
    ];

    let winner = null;
    winningCombos.forEach(combo => {
        const [a, b, c] = combo;
        if(gameState.moves.some(m => m.position === a) && gameState.moves.some(m => m.position === b) && gameState.moves.some(m => m.position === c)){
            const playerA = gameState.moves.find(m => m.position === a).player;
            const playerB = gameState.moves.find(m => m.position === b).player;
            const playerC = gameState.moves.find(m => m.position === c).player;

            if(playerA === playerB && playerB === playerC){
                winner = playerA;
            }
        }
    });

    if(winner !== null){
        ctx.font = "70px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(winner + " wins!", 350, 100 + containerHeight / 2);
    } else if(gameState.moves.length === 9){
        ctx.font = "70px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("It's a draw!", 350, 100 + containerHeight / 2);
    } else {
    // render current move indicator
    ctx.font = "30px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "left";
    ctx.fillText("Current Player: " + gameState.currentPlayer, 650, 100 + containerHeight / 2);
    ctx.fillText("Last Move: " + gameState.moves[gameState.moves.length - 1].position, 650, 100 + containerHeight / 2 + 50);
    ctx.fillText("Total Moves: " + gameState.moves.length, 650, 100 + containerHeight / 2 + 100);
    ctx.fillText("Game in progress...", 650, 100 + containerHeight / 2 + 150);
    }

  ctx.stroke();
  ctx.closePath();

  return canvas.toBuffer();
}

module.exports = generateGameBoard;
