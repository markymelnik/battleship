const { Gameboard } = require('./modules/components/gameboard');
const { Ship } = require('./modules/components/ship');
const { Player } = require('./modules/components/player');
const { AI } = require('./modules/components/ai');
const { gameController } = require('./modules/components/control');
const { domCreator } = require('./modules/utilities/dom');
const { shipPlacer } = require('./modules/components/drag');

domCreator.loadWebsite();

const playerSide = Gameboard();
const playerBoard = playerSide.board;
const playerMark = new Player('Mark');

const aiSide = Gameboard();
const aiBoard = aiSide.board;
const playerAI = new AI('AI',playerMark,playerSide);

const gameText = document.querySelector('.game-text');

const updateBoard = (() => {

	const startScreen = document.querySelector('.start-screen');
	const nameForm = document.querySelector('.name-form');
	const nameInput = document.querySelector('#username');
	const playerName = document.querySelector('.player-name');
	const enterGameBtn = document.querySelector('.enter-game-btn');
	const resetGameBtn = document.querySelector('.reset-game-btn');
	const newGameBtn = document.querySelector('.new-game-btn');
	const playerTiles = document.querySelectorAll('.player-tile');
	const aiTiles = document.querySelectorAll('.ai-tile');
	const dragContainer = document.querySelector('.drag-container');

	enterGameBtn.addEventListener('click', (event) => {
		
		startScreen.classList.add('fade-out');
		playerName.textContent = nameInput.value || 'Player';
		nameForm.style.visibility = 'hidden';
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

	shipPlacer.dragController(playerSide,playerBoard);
	shipPlacer.randomShips(playerSide,playerBoard);
	shipPlacer.rotateShips();
	shipPlacer.startGame();

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
					}, 1000);
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