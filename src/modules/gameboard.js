const { Ship } = require('./ship');

const Gameboard = () => {

  const board = createGameBoard();
  const fleet = createFleet();

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

  function createFleet() { return [] };

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

  function inBounds([row,col]) {
    return (row > -1 && row < 10 && col > -1 && col < 10)
  }

  function validPlacement([row,col], shipType, direction) {
    let length = Ship(shipType).length;
    if (inBounds([row,col])) {
      if (direction === 'horizontal') {
        return (row + length - 1 < 10);
      } else if (direction === 'vertical') {
        return (col - length + 1 > -1);
      } 
    }
  }

  function isPathClearOfShips([row,col], shipType, direction) {
    let length = Ship(shipType).length;
    if (direction === 'horizontal') {
      for (let i = row; i < row + length; i++) {
        if (board[i][col] !== null) {
          return false;
        }
      }
      return true;
    }
    else if (direction === 'vertical') {
      for (let i = col; i > col - length; i--) {
        if (board[row][i] !== null) {
          return false;
        }
      }
      return true;
    }
  }

  function getAdjacentTiles([row,col]) {
    
    if (!inBounds([row,col])) throw Error('Invalid row and col parameters.');
    
    let adjacentLocations = [
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1],
      [row, col + 1],
      [row + 1, col + 1],
      [row + 1, col],
      [row + 1, col - 1],
      [row, col - 1]
    ];

    let adjacentTiles = adjacentLocations.filter((tile) => {
      if (inBounds([tile[0],tile[1]])) {
        return tile;
      }
    })
    return adjacentTiles;
  }

  function areAdjacentTilesEmpty([row,col], shipType, direction) {
    let length = Ship(shipType).length;
    if (direction === 'horizontal') {
      for (let i = row; i < row + length; i++) {
        let adjacentTiles = getAdjacentTiles([i,col]);
        if (adjacentTiles.some((tile) => board[tile[0]][tile[1]] !== null)) {
          return false;
        }
      }
      return true;
    }
    else if (direction === 'vertical') {
      for (let i = col; i > col - length; i--) {
        let adjacentTiles = getAdjacentTiles([row,i]);
        if (adjacentTiles.some((tile) => board[tile[0]][tile[1]] !== null)) {
          return false;
        }
      }
      return true;
    }
  }

  function placeShip([row,col], shipType, direction) {

    if (!validPlacement([row,col], shipType, direction)) throw Error('The ship extends outside the board.');
    if (!isPathClearOfShips([row,col],shipType,direction)) throw Error('There is another ship in the way.');
    if (!areAdjacentTilesEmpty([row,col],shipType,direction)) throw Error('This ship is adjacent to another ship.');
    
    let currentShip = Ship(shipType);
    let length = currentShip.length;
    
    if (!fleet.some((fleetShip) => fleetShip.id === currentShip.id)) {
      fleet.push(currentShip);
    } 
    else throw Error('This ship is already in the fleet!');

    if (direction === 'horizontal') {
      for (let i = row; i < row + length; i++) {
        board[i][col] = currentShip;
      }
    }
    else if (direction === 'vertical') {
      for (let i = col; i > col - length; i--) { 
        board[row][i] = currentShip;
      }
    }
  }
  
  function generateRandomPlacement() {

    const coords = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10)
    ];

    const directions = ['horizontal','vertical'];
    const direction = directions[Math.round(Math.random())];

    return [coords, direction];
  }

  function placeShipsRandomly() {

    let ships = [
      Ship('destroyer'),
      Ship('submarine'),
      Ship('cruiser'),
      Ship('battleship'),
      Ship('carrier')
    ];

    ships.forEach(ship => {
      while (ships.includes(ship)) {
        let currentShip = ship.type;
        let nums = generateRandomPlacement();
        let coords = nums[0];
        let direction = nums[1];
        if (
          validPlacement(coords,currentShip,direction) &&
          areAdjacentTilesEmpty(coords,currentShip,direction) &&
          isPathClearOfShips(coords,currentShip,direction)
          ) {
          placeShip(coords,currentShip,direction);
          ships = ships.filter(element => element !== ship);
        }
      }
    });
  }


  function receiveAttack([row,col]) {
    let boardValue = board[row][col];
    if (boardValue !== null) {
      fleet.forEach((fleetShip) => {
        if (boardValue.id === fleetShip.id) {
          fleetShip.hit();
        }
      })
    }
  }

  function checkEndGame() {
    return (fleet.every((fleetShip) => fleetShip.isSunk()));
  };

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
    generateRandomPlacement,
    placeShipsRandomly,
    receiveAttack,
    checkEndGame
  }
  
}

module.exports = { Gameboard };