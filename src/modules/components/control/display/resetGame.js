import displayController from './displayController';

const resetGame = (playerSide, aiSide, playerAI, ships) => {
  const dragContainer = document.querySelector('.drag-container');
  const dragShips = document.querySelectorAll('.drag-ship');
  const startGameBtn = document.querySelector('.start-game-btn');
  const endGameContainer = document.querySelector('.end-game-container');
  const gameStatusText = document.querySelector('.game-status-text');
  const computerBoardContainer = document.querySelector('.computer-board-container');
  const middle = document.querySelector('.middle');

  const resetBoards = () => {
    displayController.resetHumanPlayerBoard(playerSide);
    displayController.resetComputerPlayerBoard(aiSide, playerAI, ships);
  }
  
  const resetGameStatus = () => {
    endGameContainer.style.visibility = 'hidden';
    startGameBtn.style.visibility = 'hidden';
    dragContainer.style.visibility = 'visible';
    computerBoardContainer.style.visibility = 'hidden';
    middle.style.opacity = '1.0';
    gameStatusText.textContent = 'Place your ships...';
  }
  
  const resetDragShips = () => {
    dragShips.forEach((ship) => {
      ship.style.visibility = 'visible';
    });
  }

  resetBoards();
  resetGameStatus();
  resetDragShips();
};

export default resetGame;
