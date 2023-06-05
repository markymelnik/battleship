import displayController from '../display/displayController';

const placeDragShipsRandomly = (humanPlayerSide) => {
  const startGameBtn = document.querySelector('.start-game-btn');
  const randomBtn = document.querySelector('.random-drag-btn');
  const dragShips = document.querySelectorAll('.drag-ship');

  randomBtn.addEventListener('click', () => {
    displayController.resetHumanPlayerBoard(humanPlayerSide);
    humanPlayerSide.placeShipsRandomly();
    displayController.displayAllPlayerShips(humanPlayerSide.board);
    startGameBtn.style.visibility = 'visible';

    dragShips.forEach((ship) => {
      ship.style.visibility = 'hidden';
    });
  });
};

export default placeDragShipsRandomly;
