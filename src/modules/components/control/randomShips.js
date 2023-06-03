import displayController from './displayController';

const randomShips = (humanPlayerSide) => {
  const startGameBtn = document.querySelector('.start-game-btn');
  const randomBtn = document.querySelector('.random-btn');

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

export default randomShips;
