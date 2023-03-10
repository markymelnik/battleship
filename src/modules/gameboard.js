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

  function validHorizontalPlacement([row,col], shipType) {
    let ship = Ship(shipType);
    if (row + ship.length > 10) return undefined;
    else return board[row][col];
  }

  return {
    newGameboard,
    inBounds,
    validHorizontalPlacement
  }
  
}

module.exports = { Gameboard };

