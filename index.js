const generateGameBoard = require("./generateGameBoard");
const dotenv = require("dotenv");
dotenv.config();
console.log("Starting server...");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

async function getGameState() {
    console.log("Getting game state");
  const params = {
    Bucket: "tic-actions",
    Key: "game-state.json",
  };

  try {
    const data = await s3.getObject(params).promise();
    return JSON.parse(data.Body.toString());
  } catch (err) {
    console.error("Error getting game state: ", err);
    return null;
  }
}

async function updateGameState(gameState) {
    console.log("Updating game state");
  const params = {
    Bucket: "tic-actions",
    Key: "game-state.json",
    Body: JSON.stringify(gameState),
    ContentType: "application/json",
  };

  try {
    await s3.putObject(params).promise();
    console.log("Game state updated successfully");
  } catch (err) {
    console.error("Error updating game state: ", err);
  }
}

async function main() {
  try {
    let gameState = await getGameState();
    const move = "A1";

    if (!gameState) {
      gameState = {
        moves: [{ position: move, player: "X" }],
        currentPlayer: "O",
      };
    } else {
        if(gameState.moves.some(m => m.position === move)){
            console.log("Invalid move");
            return;
        }
      const player = gameState.currentPlayer;
      gameState.moves.push({ position: move, player });
      gameState.currentPlayer = player === "X" ? "O" : "X";
    }

    await updateGameState(gameState);
    const buffer = generateGameBoard(gameState);

    const params = {
      Bucket: "tic-actions",
      Key: "game-board.png",
      Body: buffer,
      ContentType: "image/png",
    };

    const data = await s3.upload(params).promise();
    const imageUrl = data.Location;
    console.log("Image uploaded successfully:", imageUrl);
  } catch (err) {
    console.error("Error: ", err);
  }
}

main();