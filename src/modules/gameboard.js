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

  function validPlacement([row,col], shipType, direction) {
    if (inBounds([row,col])) {
      let ship = Ship(shipType);
      if (direction === 'horizontal') {
        if (row + ship.length > 10) return undefined;
        else return board[row][col];
      } else if (direction === 'vertical') {
        if (col - ship.length < 0) return undefined;
        else return board[row][col];
      } 
    }
  }

  function placeShip([row,col], shipType, direction) {
    let currentShip = Ship(shipType);
    if (!fleet.some((fleetShip) => fleetShip.id === currentShip.id)) {
      fleet.push(currentShip);
      let length = currentShip.length;
      if (direction === 'horizontal') {
        for (let i = row; i < length + row; i++) {
          board[i][col] = currentShip;
        }
        return board[row][col];
      }
      else if (direction === 'vertical') {
        for (let i = col; i > col - length; i--) {
          board[row][i] = currentShip;
        }
        return board[row][col];
      }
    }
  }

  function receiveAttack([row,col]) {
    let boardValue = board[row][col];
    if (boardValue !== null) {
      fleet.forEach((fleetShip) => {
        if (boardValue.id === fleetShip.id) {
          board[row][col] = 'hit';
          fleetShip.hit();
        }
      })
    }
    else board[row][col] = 'nohit'; 
  }

  function checkEndGame() {
    return fleet.every((fleetShip) => fleetShip.isSunk());
  }

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
    checkEndGame
  }
  
}

module.exports = { Gameboard };