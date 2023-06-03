import loadDOM from './modules/components/onLoad/loadDOM';
import loadStartScreen from './modules/components/onLoad/loadStartScreen';
import Gameboard from './modules/components/gameboard';
import Player from './modules/components/user/player';
import AI from './modules/components/user/ai';
import initDrag from './modules/components/control/dragController';
import displayController from './modules/components/control/displayController';

loadDOM();
loadStartScreen();

const playerSide = Gameboard();
const playerBoard = playerSide.board;
const playerMark = new Player('Mark');
const aiSide = Gameboard();
const aiBoard = aiSide.board;
const playerAI = new AI('AI', playerMark, playerSide);

initDrag(playerSide, playerBoard);
displayController.newGame(playerSide, aiSide, playerAI);

const updateBoard = (() => {
  
  const resetGameBtn = document.querySelector('.reset-game-btn');
  const newGameBtn = document.querySelector('.new-game-btn');
  const playerTiles = document.querySelectorAll('.player-tile');
  const aiTiles = document.querySelectorAll('.ai-tile');
  const gameStatusText = document.querySelector('.game-status-text');
  
  resetGameBtn.addEventListener('click', () => {
    displayController.newGame(playerSide, aiSide, playerAI);
  });

  newGameBtn.addEventListener('click', () => {
    displayController.newGame(playerSide, aiSide, playerAI);
  });

  const handleTileClick = (tile) => {
    let row = tile.dataset.row;
    let col = tile.dataset.col;

    playerMark.targetedAttack([row, col], playerAI, aiSide);
    displayController.updateTileOnClick(tile);

    aiTiles.forEach((tile) => {
      tile.style.pointerEvents = 'none';
    });

    playerAI.randomAttack(playerMark, playerSide);
    gameStatusText.textContent = 'AI Strikes!';

    let strike = playerAI.hitArray[playerAI.hitArray.length - 1];

    playerTiles.forEach((tile) => {
      let row = +tile.dataset.row;
      let col = +tile.dataset.col;

      if (strike[0] === row && strike[1] === col) {
        setTimeout(() => {
          displayController.updateTileOnClick(tile);
          if (!playerSide.checkEndGame() && !aiSide.checkEndGame()) {
            gameStatusText.textContent = 'Your strike!';
            aiTiles.forEach((tile) => {
              if (!tile.getAttribute('hit')) {
                tile.style.pointerEvents = 'auto';
              }
            });
          }
        }, 800);
      }
    })
  }

  aiTiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      handleTileClick(tile);
    })
  })

})();
