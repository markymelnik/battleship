const gameController = (() => {

	const displayShips = (board, type) => {
		const tiles = document.querySelectorAll('.'+type+'-tile');
		for (let row = 0; row < 10; row ++) {
			for (let col = 0; col < 10; col++) {
				tiles.forEach(tile => {
					if (board[row][col] !== null) {
						if (tile.dataset.row == row && tile.dataset.col == col) {
							tile.textContent = 'O';
							tile.setAttribute('ship','true');
						}  
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

		winBox.style.visibility = 'hidden';
		dragContainer.style.visibility = 'visible';
		resetPlayerBoard(playerSide);
		resetAiBoard(aiSide, playerAI);
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
		displayShips(aiSide.board,'ai');
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
		displayShips,
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