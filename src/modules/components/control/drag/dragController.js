import Ship from '../../ship/Ship';
import displayController from '../display/displayController';
import rotateShips from '../drag/rotateShips';
import randomShips from '../drag/randomShips';
import startGame from '../display/startGame';

const ships = [
  Ship('destroyer'),
  Ship('submarine'),
  Ship('cruiser'),
  Ship('battleship'),
  Ship('carrier'),
];

const dragController = (humanPlayerSide) => {
  const dragShips = document.querySelectorAll('.drag-ship');
  const humanPlayerTiles = document.querySelectorAll('.human-player-tile');
  const startGameBtn = document.querySelector('.start-game-btn');

  let draggedShip;
  let originalPosition;
  let lastDropValid = false;

  dragShips.forEach((ship) => {
    ship.addEventListener('dragstart', dragStart);
    ship.addEventListener('dragend', dragEnd);
  });

  humanPlayerTiles.forEach((tile) => {
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
    const dragShips = document.querySelectorAll('.drag-ship');
    const ship = ships[tile.target.getAttribute('shipid')];
    let direction = tile.target.getAttribute('direction');

    originalPosition = {
      position: [tile.target.dataset.row, tile.target.dataset.col],
      ship,
      direction,
    };

    draggedShip = dragShips[tile.target.getAttribute('shipid')];

    displayController.removeShipDisplay(ship);
    humanPlayerSide.removeShip(ship);
  }

  function dragEnter(tile) {
    tile.preventDefault();

    let row = tile.target.dataset.row;
    let col = tile.target.dataset.col;
    const direction = draggedShip.getAttribute('direction');

    const ship = ships[draggedShip.id];

    displayController.displayShipPathOnHover([row, col], ship, direction, 'in');
  }

  function dragOver(tile) {
    tile.preventDefault();

    let row = tile.target.dataset.row;
    let col = tile.target.dataset.col;
    const direction = draggedShip.getAttribute('direction');

    const ship = ships[draggedShip.id];

    displayController.displayShipPathOnHover([row, col], ship, direction, 'in');
  }

  function dragLeave(tile) {
    let row = tile.target.dataset.row;
    let col = tile.target.dataset.col;
    const direction = draggedShip.getAttribute('direction');

    const ship = ships[draggedShip.id];

    displayController.displayShipPathOnHover(
      [row, col],
      ship,
      direction,
      'out'
    );
  }

  function dropShip(tile) {
    humanPlayerTiles.forEach((tile) => {
      tile.classList.remove('drag-over');
    });

    const row = tile.target.dataset.row;
    const col = tile.target.dataset.col;

    if (!humanPlayerSide.inBounds([row, col])) {
      lastDropValid = false;
      return;
    }

    lastDropValid = true;
    draggedShip.style.visibility = 'hidden';

    const ship = ships[draggedShip.id];

    try {
      const direction = draggedShip.getAttribute('direction');
      const position = [row, col];
      humanPlayerSide.placeShip(position, ship, direction);
      displayController.displayShip(position, ship, direction);
    } catch (placementError) {
      console.log(placementError);
      try {
        const { position, ship, direction } = originalPosition;
        humanPlayerSide.placeShip(position, ship, direction);
        displayController.displayShip(position, ship, direction);
      } catch (error) {
        displayController.removeShipDisplay(ship);
        draggedShip.style.visibility = 'visible';
      }
    }

    if (humanPlayerSide.checkStartGame()) {
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

const initDrag = (humanPlayerSide) => {
  dragController(humanPlayerSide),
    rotateShips(),
    randomShips(humanPlayerSide),
    startGame();
};

export default initDrag;
