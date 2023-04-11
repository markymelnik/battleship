import { Gameboard } from './modules/components/gameboard';
import { Ship } from './modules/components/ship';
import { Player } from './modules/components/player';
import { AI } from './modules/components/ai';
import { gameController } from './modules/components/control';
import { domCreator } from './modules/utilities/dom';
import { initDrag } from './modules/components/drag';

domCreator.loadWebsite();

// Initialization + Reset

const playerSide = Gameboard();
const playerBoard = playerSide.board;
const playerMark = new Player('Mark');

const aiSide = Gameboard();
const aiBoard = aiSide.board;
const playerAI = new AI('AI',playerMark,playerSide);

initDrag(playerSide,playerBoard);

const gameText = document.querySelector('.game-text');

const updateBoard = (() => {

	const startScreen = document.querySelector('.start-screen');
	const startTitle = document.querySelector('.start-title');
	const enterGameBtn = document.querySelector('.enter-game-btn');
	const nameForm = document.querySelector('.name-form');
	const nameInput = document.querySelector('#username');
	const playerName = document.querySelector('.player-name');
	const resetGameBtn = document.querySelector('.reset-game-btn');
	const newGameBtn = document.querySelector('.new-game-btn');
	const playerTiles = document.querySelectorAll('.player-tile');
	const aiTiles = document.querySelectorAll('.ai-tile');
	const dragContainer = document.querySelector('.drag-container');

	window.addEventListener('DOMContentLoaded', () => {

		setTimeout(() => {
			startTitle.classList.add('active');
		}, 500)

		setTimeout(() => {
			nameForm.classList.add('active');
		}, 1000)
	})


	enterGameBtn.addEventListener('click', (event) => {
		
		startTitle.classList.remove('active');
		startTitle.classList.add('fade');

		setTimeout(() => {
			nameForm.classList.remove('active');
			nameForm.classList.add('fade');
		}, 100)

		setTimeout(() => {
			startScreen.style.top = '-100vh'
		}, 250);

		playerName.textContent = nameInput.value || 'Player';
		nameForm.reset();
		
		setTimeout(() => {
			startScreen.style.display = 'none';
			dragContainer.style.visibility = 'visible';
			resetGameBtn.style.visibility = 'visible';
			aiSide.placeShipsRandomly();
			gameController.displayAllShips(aiBoard,'ai');
			gameText.textContent = 'Place your ships';
		}, 1000)

		event.preventDefault();
		
	})
	
	resetGameBtn.addEventListener('click', () => {
		gameController.newGame(playerSide,aiSide,playerAI);
	})

	newGameBtn.addEventListener('click', () => {
		gameController.newGame(playerSide,aiSide,playerAI);
	})

	aiTiles.forEach(tile => {
		let row = tile.dataset.row;
		let col = tile.dataset.col;

		tile.addEventListener('click', () => {

			playerMark.targetedAttack([row,col], playerAI, aiSide);
			gameController.updateTile(tile);

			aiTiles.forEach(tile => {
				tile.style.pointerEvents = 'none';
			});

			playerAI.randomAttack(playerMark, playerSide);
			gameText.textContent = 'AI Strikes!';

			let strike = playerAI.hitArray[playerAI.hitArray.length - 1];

			playerTiles.forEach(tile => {
				let row = +tile.dataset.row;
				let col = +tile.dataset.col;
				if (strike[0] === row && strike[1] === col) {
					setTimeout(() => { 
						
						gameController.updateTile(tile);
						if (!playerSide.checkEndGame() && !aiSide.checkEndGame()) {
							gameText.textContent = 'Make your strike!';
						}

						aiTiles.forEach(tile => {
							if (!tile.getAttribute('hit')) {
								tile.style.pointerEvents = 'auto';
							}
						});

					}, 800);
				}
			})

			if (playerSide.checkEndGame()) {
				gameController.endGameController('ai');
			}
			if (aiSide.checkEndGame()) {
				gameController.endGameController('player');		
			}

		})

	})

	console.log(playerBoard);
	console.log(playerSide.fleet);

})();