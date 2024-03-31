# 🎮 Welcome to Tic Tac Toe! 🎮

Please give this repo a star if you like the build. It'll motivate me to create "Checker or Chess" game just using Github Actions. Thank You!

Get ready for an exciting game of Tic Tac Toe, right here on GitHub! This classic game is now powered by GitHub Actions, allowing you to play against other players in a fun and interactive way.

## 🕹️ How to Play

1. 🆕 To make a move, create a new issue in this repository.
2. 📝 Put whatever you like in the title, but make sure you provide the position of your move in the description (A1, A2, A3, B1, B2, B3, C1, C2, C3)
3. ⏳ The game will update automatically (usually around 10s) based on your move, and the updated game board will be displayed in the README.
4. 🔄 Players take turns making moves until the game is won or ends in a draw.
5. 🎲 The game board is represented as follows:

A1 | A2 | A3
---+----+---
B1 | B2 | B3
---+----+---
C1 | C2 | C3


6. 🏆 The first player to get three of their marks in a row (horizontally, vertically, or diagonally) wins the game.
7. 🤝 If all positions on the board are filled and no player has won, the game ends in a draw.

## 🛠️ How the Game Works

Under the hood, this Tic Tac Toe game is powered by the magic of GitHub Actions! Here's a brief overview of how it all comes together:

1. 🚀 When a player creates a new issue with their move, it triggers a GitHub Actions workflow.
2. 🔍 The workflow extracts the move position from the issue description using a regular expression and store it as an ENV variable.
3. 🎨 The game logic is implemented in a Node.js script that generates a new game board image using canvas based on the current state of the game and the player's move which we extracted from issue description.
4. ☁️ The updated game board image is then uploaded to an Amazon S3 bucket for storage.
5. 📝 The workflow updates the README file with the new game board image URL and the game instructions.
6. 🔄 The updated README file is committed and pushed back to the repository, reflecting the current state of the game.
7. 🎉 Players can view the updated game board in the README and continue playing by creating new issues with their moves.

It's a seamless and automated process that allows players to enjoy the game without any manual intervention. GitHub Actions takes care of all the heavy lifting, making it a truly interactive and engaging experience!

## 🎉 Let's Play!

Now that you know how to play and how the game works, it's time to dive in and start your Tic Tac Toe adventure! Create a new issue with your move and let the fun begin!

