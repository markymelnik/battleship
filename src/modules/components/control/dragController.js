import Ship from '../ship';
import displayController from './displayController';
import rotateShips from './rotateShips';
import randomShips from './randomShips';
import startGame from './startGame'

const ships = [
  Ship('destroyer'),
  Ship('submarine'),
  Ship('cruiser'),
  Ship('battleship'),
  Ship('carrier'),
];

const dragController = (playerSide) => {
  const allShips = document.querySelectorAll('.ship');
  const allPlayerTiles = document.querySelectorAll('.player-tile');
  const startGameBtn = document.querySelector('.start-game-btn');

  let draggedShip;
  let originalPosition;
  let lastDropValid = false;

  allShips.forEach((ship) => {
    ship.addEventListener('dragstart', dragStart);
    ship.addEventListener('dragend', dragEnd);
  });

  allPlayerTiles.forEach((tile) => {
    tile.addEventListener('dragstart', dragShipOnBoardStart);
    tile.addEventListener('dragenter', dragEnter);
    tile.addEventListener('dragover', dragOver);
    tile.addEventListener('dragleave', dragLeave);
    tile.addEventListener('drop', dropShip);
    tile.addEventListener('dragend', dragEnd);
  });

  function dragStart(element) {
    draggedShip = element.target;
  }

  function dragShipOnBoardStart(tile) {

    const allShips = document.querySelectorAll('.ship');
    const ship = ships[tile.target.getAttribute('shipid')];
    let direction = tile.target.getAttribute('direction');

    originalPosition = {
      position: [tile.target.dataset.row, tile.target.dataset.col],
      ship,
      direction,
    }

    draggedShip = allShips[tile.target.getAttribute('shipid')];

    displayController.removeShipDisplay(ship);
    playerSide.removeShip(ship);
  }

  function dragEnter(tile) {
    tile.preventDefault();

    let row = tile.target.dataset.row;
    let col = tile.target.dataset.col;
    const direction = draggedShip.getAttribute('direction');

    const ship = ships[draggedShip.id];

    displayController.displayShipPath([row,col], ship, direction, 'in');
  }

  function dragOver(tile) {
    tile.preventDefault();

    let row = tile.target.dataset.row;
    let col = tile.target.dataset.col;
    const direction = draggedShip.getAttribute('direction');

    const ship = ships[draggedShip.id];

    displayController.displayShipPath([row, col], ship, direction, 'in');
  }

  function dragLeave(tile) {
    let row = tile.target.dataset.row;
    let col = tile.target.dataset.col;
    const direction = draggedShip.getAttribute('direction');

    const ship = ships[draggedShip.id];

    displayController.displayShipPath([row, col], ship, direction, 'out');
  }

  function dropShip(tile) {
    allPlayerTiles.forEach((tile) => {
      tile.classList.remove('drag-over');
    });

    const row = tile.target.dataset.row;
    const col = tile.target.dataset.col;

    if (!playerSide.inBounds([row, col])) {
      lastDropValid = false;
      return;
    }

    lastDropValid = true;
    draggedShip.style.visibility = 'hidden';

    const ship = ships[draggedShip.id];

    try {
      const direction = draggedShip.getAttribute('direction');
      const position = [row,col];
      playerSide.placeShip(position, ship, direction);
      displayController.displayShip(position, ship, direction);
    } catch (placementError) {
      console.log(placementError)
      try {
        const { position, ship, direction } = originalPosition;
        playerSide.placeShip(position, ship, direction);
        displayController.displayShip(position, ship, direction);
      } catch (error) {
        displayController.removeShipDisplay(ship);
        draggedShip.style.visibility = 'visible';
      }
    }

    if (playerSide.checkStartGame()) {
      startGameBtn.style.visibility = 'visible';
    }
  }

  function dragEnd() {
    if (!lastDropValid) {
      draggedShip.style.visibility = 'visible';
    }
    lastDropValid = false;
  }
};

const initDrag = (playerSide, playerBoard) => {
  dragController(playerSide),
  rotateShips(),
  randomShips(playerSide, playerBoard),
  startGame();
};

export default initDrag;
