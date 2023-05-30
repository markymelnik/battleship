import Gameboard from './modules/components/gameboard';
import Player from './modules/components/user/player';
import AI from './modules/components/user/ai';
import displayController from './modules/components/control/displayController';
import initDrag from './modules/components/control/dragController';
import loadDOM from './modules/utils/dom/loadDOM';

loadDOM();

const playerSide = Gameboard();
const playerBoard = playerSide.board;
const playerMark = new Player('Mark');
const aiSide = Gameboard();
const aiBoard = aiSide.board;
const playerAI = new AI('AI', playerMark, playerSide);

initDrag(playerSide, playerBoard);

const gameStatusText = document.querySelector('.game-status-text');

const updateBoard = (() => {
  const startScreen = document.querySelector('.start-screen');
  const startTitle = document.querySelector('.start-title');
  const enterGameBtn = document.querySelector('.enter-game-btn');
  const nameForm = document.querySelector('.name-form');
  const nameInput = document.querySelector('#username');
  const playerName = document.querySelector('.player-name');
  const resetGameBtn = document.querySelector('.reset-game-btn');
  const newGameBtn = document.querySelector('.new-game-btn');
  const playerTiles = document.querySelectorAll('.player-tile');
  const aiTiles = document.querySelectorAll('.ai-tile');
  const dragContainer = document.querySelector('.drag-container');
  const aiContainer = document.querySelector('.ai-container');

  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      startTitle.classList.add('active');
    }, 500);
    setTimeout(() => {
      nameForm.classList.add('active');
    }, 1000);
    setTimeout(() => {
      enterGameBtn.style.visibility = 'visible';
    }, 1600);
  });

  enterGameBtn.addEventListener('click', (event) => {
    startTitle.classList.remove('active');
    startTitle.classList.add('fade');
    setTimeout(() => {
      nameForm.classList.remove('active');
      nameForm.classList.add('fade');
    }, 100);
    setTimeout(() => {
      startScreen.style.top = '-100vh';
    }, 250);

    playerName.textContent = nameInput.value || 'Player';
    nameForm.reset();

    aiContainer.style.visibility = 'hidden';
    dragContainer.style.visibility = 'visible';
    resetGameBtn.style.visibility = 'visible';

    setTimeout(() => {
      startScreen.style.display = 'none';
      aiSide.placeShipsRandomly();
      displayController.displayAllShips(aiBoard, 'ai');
      gameStatusText.textContent = 'Place your ships...';
    }, 1000);

    event.preventDefault();
  });

  resetGameBtn.addEventListener('click', () => {
    displayController.newGame(playerSide, aiSide, playerAI);
  });

  newGameBtn.addEventListener('click', () => {
    displayController.newGame(playerSide, aiSide, playerAI);
  });

  aiTiles.forEach((tile) => {
    let row = tile.dataset.row;
    let col = tile.dataset.col;

    tile.addEventListener('click', () => {
      playerMark.targetedAttack([row, col], playerAI, aiSide);
      displayController.updateTile(tile);

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
            displayController.updateTile(tile);
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
      });
      if (playerSide.checkEndGame()) {
        displayController.endGameController('ai');
      }
      if (aiSide.checkEndGame()) {
        displayController.endGameController('player');
      }
    });
  });
})();
