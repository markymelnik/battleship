const displayController = (() => {
  const displayShip = ([row, col], ship, direction) => {
    const humanPlayerTiles = document.querySelectorAll('.human-player-tile');

    let length = ship.length;

    row = +row;
    col = +col;

    if (direction === 'horizontal') {
      for (let i = col; i < col + length; i++) {
        humanPlayerTiles.forEach((tile) => {
          if (tile.dataset.col == i && tile.dataset.row == row) {
            tile.setAttribute('ship', 'true');
            tile.setAttribute('shipid', ship.id);
            tile.setAttribute('direction','horizontal');
          }
          if (tile.getAttribute('ship', 'true')) {
            tile.style.background = 'white';
            tile.style.cursor = 'pointer';
          }
        });
      }
    } else if (direction === 'vertical') {
      for (let i = row; i < row + length; i++) {
        humanPlayerTiles.forEach((tile) => {
          if (tile.dataset.row == i && tile.dataset.col == col) {
            tile.setAttribute('ship', 'true');
            tile.setAttribute('shipid', ship.id);
            tile.setAttribute('direction','vertical');
          }
          if (tile.getAttribute('ship', 'true')) {
            tile.style.background = 'white';
            tile.style.cursor = 'pointer';
          }
        });
      }
    }
  };

  const removeShipDisplay = (ship) => {
    const humanPlayerTiles = document.querySelectorAll('.human-player-tile');

    humanPlayerTiles.forEach((tile) => {
      if (tile.getAttribute('shipid') == ship.id) {
        resetBoardTile(tile);
      }
    })
  }

  const initiateComputerPlayerShips = (computerPlayerBoard) => {
    const computerPlayerTiles = document.querySelectorAll('.computer-player-tile');

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        computerPlayerTiles.forEach((tile) => {
          if (computerPlayerBoard[row][col] !== null) {
            if (tile.dataset.row == row && tile.dataset.col == col) {
              // Uncomment statement below to view AI board ships
              // tile.style.background = 'white';
              tile.setAttribute('ship', 'true');
            }
          }
        });
      }
    }
  };

  const displayAllPlayerShips = (humanPlayerBoard) => {
    const humanPlayerTiles = document.querySelectorAll('.human-player-tile');

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        humanPlayerTiles.forEach((tile) => {
          if (humanPlayerBoard[row][col] !== null) {
            if (tile.dataset.row == row && tile.dataset.col == col) {
              tile.style.background = 'white';
              tile.setAttribute('ship', 'true');
            }
          }
        });
      }
    }
  };

  const displayShipPathOnHover = ([row, col], ship, direction, status) => {
    const humanPlayerTiles = document.querySelectorAll('.human-player-tile');

    let length = ship.length;

    row = +row;
    col = +col;

    if (direction === 'horizontal') {
      for (let i = col; i < col + length; i++) {
        humanPlayerTiles.forEach((tile) => {
          if (tile.dataset.row == row && tile.dataset.col == i) {
            if (status === 'in') {
              tile.classList.add('drag-over');
            } else if (status === 'out') {
              tile.classList.remove('drag-over');
            }
          }
        });
      }
    } else if (direction === 'vertical') {
      for (let i = row; i < row + length; i++) {
        humanPlayerTiles.forEach((tile) => {
          if (tile.dataset.row == i && tile.dataset.col == col) {
            if (status === 'in') {
              tile.classList.add('drag-over');
            } else if (status === 'out') {
              tile.classList.remove('drag-over');
            }
          }
        });
      }
    }
  };

  const updateTileOnClick = (tile) => {
    tile.textContent = '✕';
    tile.setAttribute('hit', 'true');
    tile.style.pointerEvents = 'none';
    if (tile.getAttribute('ship')) {
      tile.style.backgroundColor = 'var(--red-color)';
    }
  };

  const resetBoardTile = (tile) => {
    tile.removeAttribute('ship');
    tile.removeAttribute('shipid');
    tile.removeAttribute('direction');
    tile.removeAttribute('style');
    tile.removeAttribute('hit');
    tile.textContent = '';
  };

  const resetHumanPlayerBoardTiles = () => {
    const humanPlayerTiles = document.querySelectorAll('.human-player-tile');
    humanPlayerTiles.forEach((tile) => {
      resetBoardTile(tile);
    });
  }

  const resetComputerPlayerBoardTiles = () => {
    const computerPlayerTiles = document.querySelectorAll('.computer-player-tile');
    computerPlayerTiles.forEach((tile) => {
      resetBoardTile(tile);
    });
  }

  const resetHumanPlayerBoard = (playerSide) => {
    playerSide.resetShipHits();
    playerSide.clearFleet();
    playerSide.clearBoard();
    resetHumanPlayerBoardTiles();
  };

  const resetComputerPlayerBoard = (aiSide, playerAI, ships) => {
    aiSide.clearFleet();
    aiSide.clearBoard();
    playerAI.resetHitArray();
    resetComputerPlayerBoardTiles();
    aiSide.placeShipsRandomly(ships);
    initiateComputerPlayerShips(aiSide.board);
  };

  return {
    displayShip,
    removeShipDisplay,
    initiateComputerPlayerShips,
    displayAllPlayerShips,
    displayShipPathOnHover,
    updateTileOnClick,
    resetBoardTile,
    resetHumanPlayerBoardTiles,
    resetComputerPlayerBoardTiles,
    resetHumanPlayerBoard,
    resetComputerPlayerBoard,
  };
})();

export default displayController;
