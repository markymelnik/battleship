const gameController = (() => {

	const displayAllShips = (board, type) => {
		const tiles = document.querySelectorAll('.'+type+'-tile');
		for (let row = 0; row < 10; row ++) {
			for (let col = 0; col < 10; col++) {
				tiles.forEach(tile => {
					if (board[row][col] !== null) {
						if (tile.dataset.row == row && tile.dataset.col == col) {
							tile.style.background = 'white';
							tile.setAttribute('ship','true');
						}  
					}
				})
			}
		}
	}

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
          }
        })
      }
    } 
    else if (direction === 'vertical') {
      for (let i = col; i > col - length; i--) {
        tiles.forEach(tile => {
          if (tile.dataset.col == i && tile.dataset.row == row) {
            tile.style.background = 'white';
          }
        })
      }
    } 
    
  }

	const updateTile = (tile) => {
		tile.style.pointerEvents = 'none';
		tile.textContent = 'X';
		if (tile.getAttribute('ship')) {
			tile.style.backgroundColor = 'darkred';
		} else {
			tile.style.backgroundColor = 'dodgerblue';
		}
	}

	const newGame = (playerSide, aiSide, playerAI) => {

		const winBox = document.querySelector('.win-box');
		const dragContainer = document.querySelector('.drag-container');
		const gameText = document.querySelector('.game-text');
		const dragShips = document.querySelectorAll('.ship');

		resetPlayerBoard(playerSide);
		resetAiBoard(aiSide, playerAI);

		winBox.style.visibility = 'hidden';
		dragContainer.style.visibility = 'visible';
		dragShips.forEach(ship => { 
			ship.style.visibility = 'visible';
		})
		gameText.textContent = 'Place your ships.';
		
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

	const resetPlayerTiles = () => {
		const playerTiles = document.querySelectorAll('.player-tile');
		playerTiles.forEach(tile => {
			tile.textContent = '';
			tile.style.backgroundColor = 'darkslategrey';
			tile.style.pointerEvents = 'auto';
			tile.removeAttribute('ship');
		})
	}

	const resetAiTiles = () => {
		const aiTiles = document.querySelectorAll('.ai-tile');
		aiTiles.forEach(tile => {
			tile.textContent = '';
			tile.style.backgroundColor = 'darkslategrey';
			tile.style.pointerEvents = 'auto';
			tile.style.cursor = 'pointer';
			tile.removeAttribute('ship');
		})
	}

	const endGameController = (winner) => {

		const aiTiles = document.querySelectorAll('.ai-tile');
		const winBox = document.querySelector('.win-box');
		const winText = document.querySelector('.win-text');
		const gameText = document.querySelector('.game-text');
			
		aiTiles.forEach(tile => {
			tile.style.pointerEvents = 'none';
		})
			
		setTimeout(() => {  
			winBox.style.visibility = 'visible';
			if (winner === 'player') {
				winText.textContent = 'You win!';
				gameText.textContent = 'You win!';
			} else {
				winText.textContent = 'You lose!';
				gameText.textContent = 'You lose!';
			}
		}, 800);
	}

	return {
		displayAllShips,
		displayShip,
		updateTile,
		resetPlayerBoard,
		resetAiBoard,
		resetPlayerTiles,
		resetAiTiles,
		endGameController,
		newGame
	}

})();

module.exports = { gameController }