const displayController = (() => {
  const displayShip = ([row, col], ship, direction) => {
    const playerTiles = document.querySelectorAll('.player-tile');

    let length = ship.length;

    row = +row;
    col = +col;

    if (direction === 'horizontal') {
      for (let i = col; i < col + length; i++) {
        playerTiles.forEach((tile) => {
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
        playerTiles.forEach((tile) => {
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
    const playerTiles = document.querySelectorAll('.player-tile');

    playerTiles.forEach((tile) => {
      if (tile.getAttribute('shipid') == ship.id) {
        resetTile(tile);
      }
    })
  }

  const initiateAiShips = (aiBoard) => {
    const tiles = document.querySelectorAll('.ai-tile');

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        tiles.forEach((tile) => {
          if (aiBoard[row][col] !== null) {
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

  const displayAllPlayerShips = (board, type) => {
    const tiles = document.querySelectorAll('.player-tile');

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        tiles.forEach((tile) => {
          if (board[row][col] !== null) {
            if (tile.dataset.row == row && tile.dataset.col == col) {
              tile.style.background = 'white';
              tile.setAttribute('ship', 'true');
            }
          }
        });
      }
    }
  };

  const displayShipPath = ([row, col], ship, direction, status) => {
    const allPlayerTiles = document.querySelectorAll('.player-tile');

    let length = ship.length;

    row = +row;
    col = +col;

    if (direction === 'horizontal') {
      for (let i = col; i < col + length; i++) {
        allPlayerTiles.forEach((tile) => {
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
        allPlayerTiles.forEach((tile) => {
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

  const resetTile = (tile) => {
    tile.removeAttribute('ship');
    tile.removeAttribute('shipid');
    tile.removeAttribute('direction');
    tile.removeAttribute('style');
    tile.removeAttribute('hit');
    tile.textContent = '';
  };

  const resetPlayerTiles = () => {
    const playerTiles = document.querySelectorAll('.player-tile');
    playerTiles.forEach((tile) => {
      resetTile(tile);
    });
  };

  const resetAiTiles = () => {
    const aiTiles = document.querySelectorAll('.ai-tile');
    aiTiles.forEach((tile) => {
      resetTile(tile);
    });
  };

  const resetPlayerBoard = (playerSide) => {
    playerSide.resetShipHits();
    playerSide.clearFleet();
    playerSide.clearBoard();
    resetPlayerTiles();
  };

  const resetAiBoard = (aiSide, playerAI) => {
    aiSide.clearFleet();
    aiSide.clearBoard();
    playerAI.resetHitArray();
    resetAiTiles();
    aiSide.placeShipsRandomly();
    initiateAiShips(aiSide.board, 'ai');
  };

  const endGameController = (winner) => {
    const aiTiles = document.querySelectorAll('.ai-tile');
    const winBox = document.querySelector('.win-box');
    const winText = document.querySelector('.win-text');
    const gameStatusText = document.querySelector('.game-status-text');
    const playerName = document.querySelector('.player-name');
    const aiName = document.querySelector('.ai-name');
    const middle = document.querySelector('.middle');

    setTimeout(() => {
      winBox.style.visibility = 'visible';
      middle.style.opacity = '0.5';
      if (winner === 'player') {
        winText.textContent = 'You win!';
        gameStatusText.textContent = `${playerName.textContent} wins!`;
      } else {
        winText.textContent = 'You lose!';
        gameStatusText.textContent = `${aiName.textContent} wins!`;
      }
    }, 800);

    aiTiles.forEach((tile) => {
      tile.style.pointerEvents = 'none';
    });
  };

  const newGame = (playerSide, aiSide, playerAI) => {
    const dragContainer = document.querySelector('.drag-container');
    const dragShips = document.querySelectorAll('.ship');
    const startGameBtn = document.querySelector('.start-game-btn');
    const winBox = document.querySelector('.win-box');
    const gameStatusText = document.querySelector('.game-status-text');
    const aiContainer = document.querySelector('.ai-container');
    const middle = document.querySelector('.middle');

    resetPlayerBoard(playerSide);
    resetAiBoard(aiSide, playerAI);

    winBox.style.visibility = 'hidden';
    startGameBtn.style.visibility = 'hidden';
    dragContainer.style.visibility = 'visible';
    aiContainer.style.visibility = 'hidden';
    middle.style.opacity = '1.0';

    dragShips.forEach((ship) => {
      ship.style.visibility = 'visible';
    });

    gameStatusText.textContent = 'Place your ships...';
  };

  return {
    displayShip,
    removeShipDisplay,
    initiateAiShips,
    displayAllPlayerShips,
    displayShipPath,
    updateTileOnClick,
    resetPlayerBoard,
    resetAiBoard,
    resetPlayerTiles,
    resetAiTiles,
    endGameController,
    newGame
  };
})();

export default displayController;
