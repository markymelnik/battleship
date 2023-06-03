import loadDOM from './modules/components/onLoad/loadDOM';
import loadStartScreen from './modules/components/onLoad/loadStartScreen';
import Gameboard from './modules/components/gameboard';
import HumanPlayer from './modules/components/player/HumanPlayer';
import ComputerPlayer from './modules/components/player/ComputerPlayer';
import Ship from './modules/components/ship/Ship';
import initDrag from './modules/components/control/dragController';
import displayController from './modules/components/control/displayController';

loadDOM();
loadStartScreen();

const humanPlayer = new HumanPlayer('Human Player');
const humanPlayerSide = Gameboard();

const computerPlayer = new ComputerPlayer('Computer Player', humanPlayer, humanPlayerSide);
const computerPlayerSide = Gameboard();

const ships = [
  Ship('destroyer'),
  Ship('submarine'),
  Ship('cruiser'),
  Ship('battleship'),
  Ship('carrier'),
];

initDrag(humanPlayerSide, ships);
displayController.resetGame(humanPlayerSide, computerPlayerSide, computerPlayer, ships);

const updateBoard = (() => {
  const humanPlayerTiles = document.querySelectorAll('.human-player-tile');
  const computerPlayerTiles = document.querySelectorAll('.computer-player-tile');
  const resetGameBtn = document.querySelector('.reset-game-btn');
  const newGameBtn = document.querySelector('.new-game-btn');
  const gameStatusText = document.querySelector('.game-status-text');

  resetGameBtn.addEventListener('click', () => {
    displayController.resetGame(
      humanPlayerSide,
      computerPlayerSide,
      computerPlayer,
      ships
    );
  });

  newGameBtn.addEventListener('click', () => {
    displayController.resetGame(
      humanPlayerSide,
      computerPlayerSide,
      computerPlayer,
      ships
    );
  });

  const handleTileClick = (tile) => {
    let row = tile.dataset.row;
    let col = tile.dataset.col;

    tile.style.pointerEvents = 'none';

    humanPlayer.targetedAttack([row, col], computerPlayer, computerPlayerSide);
    displayController.updateTileOnClick(tile);

    
    if (humanPlayerSide.checkEndGame()) {
      displayController.endGameController('ai');
      return;
    }

    console.log(humanPlayerSide.fleet);

    computerPlayer.randomAttack(humanPlayer, humanPlayerSide);
    gameStatusText.textContent = 'AI Strikes!';

    if (computerPlayerSide.checkEndGame()) {
      displayController.endGameController('player');
      return;
    }

    console.log(computerPlayerSide.fleet);

    let strike = computerPlayer.hitArray[computerPlayer.hitArray.length - 1];

    humanPlayerTiles.forEach((tile) => {
      let row = +tile.dataset.row;
      let col = +tile.dataset.col;

      if (strike[0] === row && strike[1] === col) {
        setTimeout(() => {
          displayController.updateTileOnClick(tile);
          if (
            !humanPlayerSide.checkEndGame() &&
            !computerPlayerSide.checkEndGame()
          ) {
            gameStatusText.textContent = 'Your strike!';
            computerPlayerTiles.forEach((tile) => {
              if (!tile.getAttribute('hit')) {
                tile.style.pointerEvents = 'auto';
              }
            });
          }
        }, 800);
      }
    });
  };

  computerPlayerTiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      handleTileClick(tile);
    });
  });
})();
