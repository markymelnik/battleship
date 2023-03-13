const { Ship } = require('./ship');

const Gameboard = () => {

  const board = newGameBoard();
  let fleet = [];

  function newGameBoard() {
    let gameboard = [];
    for (let row = 0; row < 10; row++) {
      gameboard[row] = [];
      for (let col = 0; col < 10; col++) {
        gameboard[row][col] = null;
      }
    }
    return gameboard;
  }

  function inBounds([row,col]) {
    if (row < 0 || row > 9 || col < 0 || col > 9) return undefined;
    else return board[row][col];
  }

  function validPlacement([row,col], shipType, direction) {
    let ship = Ship(shipType);
    if (direction === 'horizontal') {
      if (row + ship.length > 10) return undefined;
      else return board[row][col];
    } else if (direction === 'vertical') {
      if (col - ship.length < 0) return undefined;
      else return board[row][col];
    } else return undefined;
  }

  function placeShip([row,col], shipType, direction) {
    let ship = Ship(shipType);
    fleet.push(ship);
    let length = ship.length;
    if (direction === 'horizontal') {
      for (let i = row; i < length + row; i++) {
        board[i][col] = ship;
      }
      return board[row][col];
    }
    else if (direction === 'vertical') {
      for (let i = col; i > col - length; i--) {
        board[row][i] = ship;
      }
      return board[row][col];
    }

  }

  function receiveAttack([row,col]) {
    fleet.forEach((ship) => {
      let currentShip = board[row][col];
      if (ship.id == currentShip.id) {
        ship.hit();
      }
    })
  }

  return {
    board,
    fleet,
    newGameBoard,
    inBounds,
    validPlacement,
    placeShip,
    receiveAttack
  }
  
}

module.exports = { Gameboard };

