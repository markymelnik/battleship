import Ship from '../ship/Ship';

const Gameboard = () => {
  const board = createGameBoard();
  let fleet = createFleet();

  function createGameBoard() {
    let gameboard = [];
    for (let row = 0; row < 10; row++) {
      gameboard[row] = [];
      for (let col = 0; col < 10; col++) {
        gameboard[row][col] = null;
      }
    }
    return gameboard;
  }

  function createFleet() {
    return [];
  }

  function clearBoard() {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        board[row][col] = null;
      }
    }
  }

  function clearFleet() {
    while (fleet.length > 0) fleet.pop();
  }

  function inBounds([row, col]) {
    return row > -1 && row < 10 && col > -1 && col < 10;
  }

  function validPlacement([row, col], ship, direction) {
    if (!inBounds([row, col])) {
      throw new Error('Invalid initial starting position');
    }

    if (direction === 'horizontal') {
      return col + ship.length - 1 < 10;
    } else if (direction === 'vertical') {
      return row + ship.length - 1 < 10;
    }
  }

  function isPathClearOfShips([row, col], ship, direction) {
    if (direction === 'horizontal') {
      for (let i = col; i < col + ship.length; i++) {
        if (board[row][i] !== null) {
          return false;
        }
      }
      return true;
    } else if (direction === 'vertical') {
      for (let i = row; i < row + ship.length; i++) {
        if (board[i][col] !== null) {
          return false;
        }
      }
      return true;
    }
  }

  function getAdjacentTiles([row, col]) {
    if (!inBounds([row, col])) {
      console.error('Invalid row and col paramteres.');
    }

    let adjacentLocations = [
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1],
      [row, col + 1],
      [row + 1, col + 1],
      [row + 1, col],
      [row + 1, col - 1],
      [row, col - 1],
    ];

    let adjacentTiles = adjacentLocations.filter((tile) => {
      if (inBounds([tile[0], tile[1]])) {
        return tile;
      }
    });
    return adjacentTiles;
  }

  function areAdjacentTilesEmpty([row, col], ship, direction) {
    if (direction === 'vertical') {
      for (let i = row; i < row + ship.length; i++) {
        let adjacentTiles = getAdjacentTiles([i, col]);
        if (adjacentTiles.some((tile) => board[tile[0]][tile[1]] !== null)) {
          return false;
        }
      }
      return true;
    } else if (direction === 'horizontal') {
      for (let i = col; i < col + ship.length; i++) {
        let adjacentTiles = getAdjacentTiles([row, i]);
        if (adjacentTiles.some((tile) => board[tile[0]][tile[1]] !== null)) {
          return false;
        }
      }
      return true;
    }
  }

  function placeShip([row, col], ship, direction) {
    row = +row;
    col = +col;

    if (!validPlacement([row, col], ship, direction)) {
      throw new Error('The ship extends outside the board.');
    }
    if (!isPathClearOfShips([row, col], ship, direction)) {
      throw new Error('There is another ship in the way.');
    }
    if (!areAdjacentTilesEmpty([row, col], ship, direction)) {
      throw new Error('This ship is adjacent to another ship.');
    }

    addShipToFleet(ship);

    if (direction === 'vertical') {
      for (let i = row; i < row + ship.length; i++) {
        board[i][col] = ship;
      }
      return true;
    } else if (direction === 'horizontal') {
      for (let i = col; i < col + ship.length; i++) {
        board[row][i] = ship;
      }
      return true;
    }
  }

  function addShipToFleet(ship) {
    if (!fleet.some((fleetShip) => fleetShip.id === ship.id)) {
      fleet.push(ship);
    } else throw new Error('This ship is already in the fleet!');
  }

  function removeShip(ship) {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] !== null && board[row][col].id == ship.id) {
          board[row][col] = null;
        }
      }
    }
    removeShipFromFleet(ship);
  }

  function removeShipFromFleet(ship) {
    fleet = fleet.filter((fleetShip) => fleetShip.id !== ship.id);
  }

  const placeAllShips = () => {
    placeShip([1, 1], 'destroyer', 'horizontal');
    placeShip([8, 9], 'submarine', 'vertical');
    placeShip([2, 8], 'cruiser', 'horizontal');
    placeShip([6, 2], 'battleship', 'horizontal');
    placeShip([4, 6], 'carrier', 'vertical');
  };

  function generateRandomPlacement() {
    const coords = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];

    const directions = ['horizontal', 'vertical'];
    const direction = directions[Math.round(Math.random())];

    return [coords, direction];
  }

  function placeShipsRandomly() {
    let ships = [
      Ship('destroyer'),
      Ship('submarine'),
      Ship('cruiser'),
      Ship('battleship'),
      Ship('carrier'),
    ];

    ships.forEach((ship) => {
      while (ships.includes(ship)) {
        let nums = generateRandomPlacement();
        let coords = nums[0];
        let direction = nums[1];
        if (
          validPlacement(coords, ship, direction) &&
          areAdjacentTilesEmpty(coords, ship, direction) &&
          isPathClearOfShips(coords, ship, direction)
        ) {
          placeShip(coords, ship, direction);
          ships = ships.filter((element) => element !== ship);
        }
      }
    });
  }

  function receiveAttack([row, col]) {
    let boardValue = board[row][col];
    if (boardValue !== null) {
      fleet.forEach((fleetShip) => {
        if (boardValue.id === fleetShip.id) {
          fleetShip.hit();
        }
      });
    }
  }

  function checkStartGame() {
    return fleet.length > 4;
  }

  function checkEndGame() {
    return fleet.every((fleetShip) => fleetShip.isSunk());
  }

  function resetShipHits() {
    fleet.forEach((fleetShip) => {
      fleetShip.hits = 0;
    });
  }

  return {
    board,
    fleet,
    createGameBoard,
    createFleet,
    clearBoard,
    clearFleet,
    inBounds,
    validPlacement,
    isPathClearOfShips,
    getAdjacentTiles,
    areAdjacentTilesEmpty,
    placeShip,
    addShipToFleet,
    removeShip,
    removeShipFromFleet,
    placeAllShips,
    generateRandomPlacement,
    placeShipsRandomly,
    receiveAttack,
    checkStartGame,
    checkEndGame,
    resetShipHits,
  };
};

export default Gameboard;
