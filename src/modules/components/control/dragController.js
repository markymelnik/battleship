import Ship from '../ship';
import displayController from './displayController';

const dragController = (playerSide) => {
  const allShips = document.querySelectorAll('.ship');
  const allPlayerTiles = document.querySelectorAll('.player-tile');
  const startGameBtn = document.querySelector('.start-game-btn');
  const dragContainer = document.querySelector('.drag-container');

  let draggedShip;

  const ships = [
    Ship('destroyer'),
    Ship('submarine'),
    Ship('cruiser'),
    Ship('battleship'),
    Ship('carrier'),
  ];

  allShips.forEach((ship) => {
    ship.addEventListener('dragstart', dragStart);
  });

  allPlayerTiles.forEach((tile) => {
    tile.addEventListener('dragstart', dragShipOnBoardStart);
    tile.addEventListener('dragenter', dragEnter);
    tile.addEventListener('dragover', dragOver);
    tile.addEventListener('dragleave', dragLeave);
    tile.addEventListener('drop', dropShip);
  });

  function dragStart(dragShip) {
    draggedShip = dragShip.target;
  }

  function dragShipOnBoardStart(tile) {

    const allShips = document.querySelectorAll('.ship');
    const ship = ships[tile.target.getAttribute('shipid')];
    let row = tile.target.dataset.row;
    let col = tile.target.dataset.col;
    let direction = tile.target.getAttribute('direction');

    draggedShip = allShips[tile.target.getAttribute('shipid')];

    displayController.removeShipDisplay(ship);
    playerSide.removeShip(ship);
  }

  function dragEnter(tile) {
    tile.preventDefault();

    let row = tile.target.dataset.row;
    let col = tile.target.dataset.col;

    const ship = ships[draggedShip.id];

    if (draggedShip.getAttribute('direction') === 'horizontal') {
      displayController.displayShipPath([row, col], ship, 'horizontal', 'in');
    } else if (draggedShip.getAttribute('direction') === 'vertical') {
      displayController.displayShipPath([row, col], ship, 'vertical', 'in');
    }
  }

  function dragOver(tile) {
    tile.preventDefault();

    let row = tile.target.dataset.row;
    let col = tile.target.dataset.col;

    const ship = ships[draggedShip.id];

    if (draggedShip.getAttribute('direction') === 'horizontal') {
      displayController.displayShipPath([row, col], ship, 'horizontal', 'in');
    } else if (draggedShip.getAttribute('direction') === 'vertical') {
      displayController.displayShipPath([row, col], ship, 'vertical', 'in');
    }
  }

  function dragLeave(tile) {
    let row = tile.target.dataset.row;
    let col = tile.target.dataset.col;

    const ship = ships[draggedShip.id];

    if (draggedShip.getAttribute('direction') === 'horizontal') {
      displayController.displayShipPath([row, col], ship, 'horizontal', 'out');
    } else if (draggedShip.getAttribute('direction') === 'vertical') {
      displayController.displayShipPath([row, col], ship, 'vertical', 'out');
    }
  }

  function dropShip(tile) {

    allPlayerTiles.forEach((tile) => {
      tile.classList.remove('drag-over');
    })

    const row = tile.target.dataset.row;
    const col = tile.target.dataset.col;

    const ship = ships[draggedShip.id];

    if (draggedShip.getAttribute('direction') === 'horizontal') {
      playerSide.placeShip([row, col], ship, 'horizontal');
      displayController.displayShip([row, col], ship, 'horizontal');
    } else if (draggedShip.getAttribute('direction') === 'vertical') {
      playerSide.placeShip([row, col], ship, 'vertical');
      displayController.displayShip([row, col], ship, 'vertical');
    }

    draggedShip.style.visibility = 'hidden';

    console.log(draggedShip);

    if (playerSide.checkStartGame()) {
      startGameBtn.style.visibility = 'visible';
    }
  }
};

const rotateShips = () => {
  const rotateBtn = document.querySelector('.rotate-btn');
  const allShipsContainer = document.querySelector('.all-ships');
  const allShips = document.querySelectorAll('.ship');

  rotateBtn.addEventListener('click', () => {
    allShips.forEach((ship) => {
      if (ship.getAttribute('direction') === 'horizontal') {
        allShipsContainer.style.flexDirection = 'row';
        rotateToVertical(ship);
      } else if (ship.getAttribute('direction') === 'vertical') {
        allShipsContainer.style.flexDirection = 'column';
        rotateToHorizontal(ship);
      }
    });
  });
};

const randomShips = (playerSide, playerBoard) => {
  const startGameBtn = document.querySelector('.start-game-btn');
  const randomBtn = document.querySelector('.random-btn');

  const dragShips = document.querySelectorAll('.ship');

  randomBtn.addEventListener('click', () => {
    if (playerSide.fleet.length > 0)
      displayController.resetPlayerBoard(playerSide);
    playerSide.placeShipsRandomly();
    displayController.displayAllShips(playerBoard, 'player');
    startGameBtn.style.visibility = 'visible';

    dragShips.forEach((ship) => {
      ship.style.visibility = 'hidden';
    });
  });
};

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

const rotateToVertical = (ship) => {
  ship.setAttribute('direction', 'vertical');

  let id = ship.id;
  switch (id) {
    case '0':
      ship.classList.remove('destroyer-h');
      ship.classList.add('destroyer-v');
      break;
    case '1':
      ship.classList.remove('submarine-h');
      ship.classList.add('submarine-v');
      break;
    case '2':
      ship.classList.remove('cruiser-h');
      ship.classList.add('cruiser-v');
      break;
    case '3':
      ship.classList.remove('battleship-h');
      ship.classList.add('battleship-v');
      break;
    case '4':
      ship.classList.remove('carrier-h');
      ship.classList.add('carrier-v');
      break;
  }
};

const rotateToHorizontal = (ship) => {
  ship.setAttribute('direction', 'horizontal');

  let id = ship.id;
  switch (id) {
    case '0':
      ship.classList.remove('destroyer-v');
      ship.classList.add('destroyer-h');
      break;
    case '1':
      ship.classList.remove('submarine-v');
      ship.classList.add('submarine-h');
      break;
    case '2':
      ship.classList.remove('cruiser-v');
      ship.classList.add('cruiser-h');
      break;
    case '3':
      ship.classList.remove('battleship-v');
      ship.classList.add('battleship-h');
      break;
    case '4':
      ship.classList.remove('carrier-v');
      ship.classList.add('carrier-h');
      break;
  }
};

const initDrag = (playerSide, playerBoard) => {
  dragController(playerSide),
  rotateShips(),
  randomShips(playerSide, playerBoard),
  startGame();
};

export default initDrag;
