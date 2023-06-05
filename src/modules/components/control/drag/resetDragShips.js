import displayController from '../display/displayController';

const resetDragShips = (humanPlayerSide) => {
  const resetBtn = document.querySelector('.reset-drag-btn');
  const startGameBtn = document.querySelector('.start-game-btn');
  const dragShips = document.querySelectorAll('.drag-ship');

  resetBtn.addEventListener('click', () => {
    displayController.resetHumanPlayerBoard(humanPlayerSide);

    startGameBtn.style.visibility = 'hidden';

    dragShips.forEach((ship) => {
      ship.style.visibility = 'visible';
    });
  });
};

export default resetDragShips;
