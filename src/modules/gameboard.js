const { Ship } = require('./ship');

const Gameboard = () => {

  const board = newGameboard();

  function newGameboard() {
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

  return {
    newGameboard,
    inBounds,
    validPlacement
  }
  
}

module.exports = { Gameboard };

