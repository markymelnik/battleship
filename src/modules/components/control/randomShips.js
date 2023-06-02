import displayController from './displayController';

const randomShips = (playerSide, playerBoard) => {
  const startGameBtn = document.querySelector('.start-game-btn');
  const randomBtn = document.querySelector('.random-btn');

  const dragShips = document.querySelectorAll('.ship');

  randomBtn.addEventListener('click', () => {
    displayController.resetPlayerBoard(playerSide);
    playerSide.placeShipsRandomly();
    displayController.displayAllPlayerShips(playerBoard, 'player');
    startGameBtn.style.visibility = 'visible';

    dragShips.forEach((ship) => {
      ship.style.visibility = 'hidden';
    });
  });
};

export default randomShips;
