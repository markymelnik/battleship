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
        resetBoardTiles('human');
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

  const resetBoardTiles = (type) => {
    const boardTiles = document.querySelectorAll('.' + type + '-player-tile');
    boardTiles.forEach((tile) => {
      tile.removeAttribute('ship');
      tile.removeAttribute('shipid');
      tile.removeAttribute('direction');
      tile.removeAttribute('style');
      tile.removeAttribute('hit');
      tile.textContent = '';
    });
  };

  const resetHumanPlayerBoard = (playerSide) => {
    playerSide.resetShipHits();
    playerSide.clearFleet();
    playerSide.clearBoard();
    resetBoardTiles('human');
  };

  const resetComputerPlayerBoard = (aiSide, playerAI, ships) => {
    aiSide.clearFleet();
    aiSide.clearBoard();
    playerAI.resetHitArray();
    resetBoardTiles('computer');
    aiSide.placeShipsRandomly(ships);
    initiateComputerPlayerShips(aiSide.board);
  };

  const endGameController = (winner) => {
    const computerPlayerTiles = document.querySelectorAll('.computer-player-tile');
    const endGameContainer = document.querySelector('.end-game-container');
    const endGameText = document.querySelector('.end-game-text');
    const gameStatusText = document.querySelector('.game-status-text');
    const humanPlayerName = document.querySelector('.human-player-name');
    const computerPlayerName = document.querySelector('.computer-player-name');
    const middle = document.querySelector('.middle');

    setTimeout(() => {
      endGameContainer.style.visibility = 'visible';
      middle.style.opacity = '0.5';
      if (winner === 'player') {
        endGameText.textContent = 'You win!';
        gameStatusText.textContent = `${humanPlayerName.textContent} wins!`;
      } else {
        endGameText.textContent = 'You lose!';
        gameStatusText.textContent = `${computerPlayerName.textContent} wins!`;
      }
    }, 800);

    computerPlayerTiles.forEach((tile) => {
      tile.style.pointerEvents = 'none';
    });
  };

  const resetGame = (playerSide, aiSide, playerAI, ships) => {
    const dragContainer = document.querySelector('.drag-container');
    const dragShips = document.querySelectorAll('.drag-ship');
    const startGameBtn = document.querySelector('.start-game-btn');
    const endGameContainer = document.querySelector('.end-game-container');
    const gameStatusText = document.querySelector('.game-status-text');
    const computerBoardContainer = document.querySelector('.computer-board-container');
    const middle = document.querySelector('.middle');

    resetHumanPlayerBoard(playerSide);
    resetComputerPlayerBoard(aiSide, playerAI, ships);

    endGameContainer.style.visibility = 'hidden';
    startGameBtn.style.visibility = 'hidden';
    dragContainer.style.visibility = 'visible';
    computerBoardContainer.style.visibility = 'hidden';
    middle.style.opacity = '1.0';

    dragShips.forEach((ship) => {
      ship.style.visibility = 'visible';
    });

    gameStatusText.textContent = 'Place your ships...';
  };

  return {
    displayShip,
    removeShipDisplay,
    initiateComputerPlayerShips,
    displayAllPlayerShips,
    displayShipPathOnHover,
    updateTileOnClick,
    resetHumanPlayerBoard,
    resetComputerPlayerBoard,
    resetBoardTiles,
    endGameController,
    resetGame
  };
})();

export default displayController;
