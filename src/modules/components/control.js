export const gameController = (() => {

	const displayShip = ([row,col], ship, direction) => {

		const tiles = document.querySelectorAll('.player-tile');

    let length = ship.length;

    row = +row;
    col = +col;

    if (direction === 'horizontal') {
      for (let i = row; i < row + length; i++) {
        tiles.forEach(tile => {
          if (tile.dataset.row == i && tile.dataset.col == col) {
            tile.style.background = 'white';
						tile.setAttribute('ship','true');
          }
        })
      }
    } 
    else if (direction === 'vertical') {
      for (let i = col; i > col - length; i--) {
        tiles.forEach(tile => {
          if (tile.dataset.col == i && tile.dataset.row == row) {
            tile.style.background = 'white';
						tile.setAttribute('ship','true');
          }
        })
      }
    } 
  }

	const displayAllShips = (board, type) => {

		const tiles = document.querySelectorAll('.'+type+'-tile');

		for (let row = 0; row < 10; row ++) {
			for (let col = 0; col < 10; col++) {
				tiles.forEach(tile => {
					if (board[row][col] !== null) {
						if (tile.dataset.row == row && tile.dataset.col == col) {
							// if (type === 'player') 
							tile.style.background = 'white';
							tile.setAttribute('ship','true');
						}  
					}
				})
			}
		}
	}

	const displayShipPath = ([row,col], ship, direction, status) => {

		const allPlayerTiles = document.querySelectorAll('.player-tile');

		let length = ship.length;

    row = +row;
    col = +col;

		if (direction === 'vertical') {
      for (let i = col; i > col - length; i--) {
        allPlayerTiles.forEach(tile => {
          if (tile.dataset.row == row && tile.dataset.col == i) {
						if (status === 'in') {
							tile.classList.add('drag-over');
						}
						else if (status === 'out') {
							tile.classList.remove('drag-over');
						}
            
          }
        })
      }
    }
    else if (direction === 'horizontal') {
      for (let i = row; i < row + length; i++) {
        allPlayerTiles.forEach(tile => {
          if (tile.dataset.row == i && tile.dataset.col == col) {
            if (status === 'in') {
							tile.classList.add('drag-over');
						}
						else if (status === 'out') {
							tile.classList.remove('drag-over');
						}
          }
        })
      }
    }
	}

	const updateTile = (tile) => {
		tile.textContent = '✕';
		tile.setAttribute('hit','true');
		tile.style.pointerEvents = 'none';
		if (tile.getAttribute('ship')) {
			tile.style.backgroundColor = 'darkred';
		}
	}

	const resetPlayerTiles = () => {
		const playerTiles = document.querySelectorAll('.player-tile');
		playerTiles.forEach(tile => {
			tile.textContent = '';
			tile.style.backgroundColor = 'var(--blue-color)';
			tile.removeAttribute('ship');
		})
	}

	const resetAiTiles = () => {
		const aiTiles = document.querySelectorAll('.ai-tile');
		aiTiles.forEach(tile => {
			tile.textContent = '';
			tile.style.backgroundColor = 'var(--blue-color)';
			tile.style.pointerEvents = 'auto';
			tile.style.cursor = 'pointer';
			tile.removeAttribute('ship');
			tile.removeAttribute('hit');
		})
	}

	const resetPlayerBoard = (playerSide) => {
		playerSide.resetShipHits();
		playerSide.clearFleet();
		playerSide.clearBoard();
		resetPlayerTiles();
	}

	const resetAiBoard = (aiSide, playerAI) => {
		aiSide.clearFleet();
		aiSide.clearBoard();
		playerAI.resetHitArray();
		resetAiTiles();
		aiSide.placeShipsRandomly();
		displayAllShips(aiSide.board,'ai');
	}

	const endGameController = (winner) => {

		const aiTiles = document.querySelectorAll('.ai-tile');
		const winBox = document.querySelector('.win-box');
		const winText = document.querySelector('.win-text');
		const gameText = document.querySelector('.game-text');
		const playerName = document.querySelector('.player-name');
		const aiName = document.querySelector('.ai-name');
			
		setTimeout(() => {  
			winBox.style.visibility = 'visible';
			if (winner === 'player') {
				winText.textContent = 'You win!';
				gameText.textContent = `${playerName.textContent} wins!`;
			} else {
				winText.textContent = 'You lose!';
				gameText.textContent = `${aiName.textContent} wins!`;
			}
		}, 800);

		aiTiles.forEach(tile => {
			tile.style.pointerEvents = 'none';
		})	
	}

	const newGame = (playerSide, aiSide, playerAI) => {

		const dragContainer = document.querySelector('.drag-container');
		const dragShips = document.querySelectorAll('.ship');
		const startGameBtn = document.querySelector('.start-game-btn')
		const winBox = document.querySelector('.win-box');
		const gameText = document.querySelector('.game-text');
		
		resetPlayerBoard(playerSide);
		resetAiBoard(aiSide, playerAI);

		winBox.style.visibility = 'hidden';
		startGameBtn.style.visibility = 'hidden';
		dragContainer.style.visibility = 'visible';

		dragShips.forEach(ship => { 
			ship.style.visibility = 'visible';
		})

		gameText.textContent = 'Place your ships...';
		
	}

	return {
		displayShip,
		displayAllShips,
		displayShipPath,
		updateTile,
		resetPlayerBoard,
		resetAiBoard,
		resetPlayerTiles,
		resetAiTiles,
		endGameController,
		newGame
	}

})();