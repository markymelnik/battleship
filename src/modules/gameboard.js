const { Ship } = require('./ship');

const Gameboard = () => {

  const board = createGameBoard();
  const fleet = newFleet();

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

  function clearBoard() {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        board[row][col] = null;
      }
    }
  }

  function newFleet() { return [] };

  function clearFleet() {
    while (fleet.length > 0) fleet.pop();
  }

  function inBounds([row,col]) {
    return (row >= 0 && row <= 9 && col >= 0 && col <= 9)
  }

  function validPlacement([row,col], length, direction) {
    if (inBounds([row,col])) {
      if (direction === 'horizontal') {
        return (row + length < 10);
      } else if (direction === 'vertical') {
        return (col - length > 0);
      } 
    }
  }

  function placeShip([row,col], shipType, direction) {
    let currentShip = Ship(shipType);
    let length = currentShip.length;
    if (!fleet.some((fleetShip) => fleetShip.id === currentShip.id)) {
      fleet.push(currentShip);
        if (direction === 'horizontal') {
          for (let i = row; i < length + row; i++) {
            if (board[i][col] === null) {
              board[i][col] = currentShip;
            }
            else throw Error('Another ship is in the way!');
          }
          return board[row][col];
        }

        else if (direction === 'vertical') {
          for (let i = col; i > col - length; i--) {
            if (board[row][i] === null) {
              board[row][i] = currentShip;
            }
            else throw Error('Another ship is in the way!');
          }
          return board[row][col];
        

      }
    }
    else throw Error('This ship is already in the fleet!');
  }

  function receiveAttack([row,col]) {
    let boardValue = board[row][col];
    if (boardValue !== null) {
      fleet.forEach((fleetShip) => {
        if (boardValue.id === fleetShip.id) {
          boardValue = 'hit';
          fleetShip.hit();
        }
      })
    }
    else board[row][col] = 'nohit'; 
  }

  function checkEndGame() {
    return fleet.every((fleetShip) => fleetShip.isSunk());
  };


  return {
    board,
    fleet,
    createGameBoard,
    clearBoard,
    clearFleet,
    inBounds,
    validPlacement,
    placeShip,
    receiveAttack,
    checkEndGame,
  }
  
}

module.exports = { Gameboard };