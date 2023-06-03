const startGame = () => {
  const startGameBtn = document.querySelector('.start-game-btn');
  const dragContainer = document.querySelector('.drag-container');
  const dragShips = document.querySelectorAll('.ship');
  const gameStatusText = document.querySelector('.game-status-text');
  const computerBoardContainer = document.querySelector('.computer-board-container');

  const hideDragShips = () => {
    dragShips.forEach((ship) => {
      ship.style.visibility = 'hidden';
    });
  };

  const initiateGame = () => {
    startGameBtn.addEventListener('click', () => {
      dragContainer.style.visibility = 'hidden';
      startGameBtn.style.visibility = 'hidden';
      gameStatusText.textContent = 'Your strike!';
      computerBoardContainer.style.visibility = 'visible';
    });
    hideDragShips();
  }
  
  initiateGame();
};

export default startGame;
