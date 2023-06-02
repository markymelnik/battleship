const startGame = () => {
  const startGameBtn = document.querySelector('.start-game-btn');
  const dragContainer = document.querySelector('.drag-container');
  const dragShips = document.querySelectorAll('.ship');
  const gameText = document.querySelector('.game-status-text');
  const aiContainer = document.querySelector('.ai-container');

  startGameBtn.addEventListener('click', () => {
    dragContainer.style.visibility = 'hidden';
    startGameBtn.style.visibility = 'hidden';
    gameText.textContent = 'Your strike!';
    aiContainer.style.visibility = 'visible';

    dragShips.forEach((ship) => {
      ship.style.visibility = 'hidden';
    });
  });
};

export default startGame;