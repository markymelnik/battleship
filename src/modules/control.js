const { Gameboard } = require('./gameboard');
const { Player } = require('./player');
const { AI } = require('./ai');

const gameController = (() => {

	const resetNameForm = () => {
		const nameForm = document.querySelector('.name-form');
		const playerName = document.querySelector('.player-name');
		nameForm.style.visibility = 'visible';
		playerName.textContent = 'placeholder';
	}

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
		resetNameForm,
		displayShips,
		updateTile,
		resetPlayerTiles,
		resetAiTiles,
		endGameController
	}

})();

module.exports = { gameController }