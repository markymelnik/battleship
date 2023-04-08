const { Gameboard } = require('./modules/gameboard');
const { Ship } = require('./modules/ship');
const { Player } = require('./modules/player');
const { AI } = require('./modules/ai');
const { domCreator } = require('./modules/dom');
const { gameController } = require('./modules/control');

domCreator.loadWebsite();

// component, utility files

const playerSide = Gameboard();
const playerBoard = playerSide.board;
const playerMark = new Player('Mark');

const aiSide = Gameboard();
const aiBoard = aiSide.board;
const playerAI = new AI('AI',playerMark,playerSide);

const startScreen = document.querySelector('.start-screen');
const newGameBtn = document.querySelector('.new-game-btn');
const resetGameBtn = document.querySelector('.reset-game-btn');

const shipContainer = document.querySelector('.ships-container');

const gameText = document.querySelector('.game-text');

const resetController = (() => {
	
	const winBox = document.querySelector('.win-box');
	const shipsContainer = document.querySelector('.ships-container');
	
	const resetPlayerBoard = () => {
		playerSide.resetShipHits();
		playerSide.clearFleet();
		playerSide.clearBoard();
		gameController.resetPlayerTiles();

	}

	const resetAiBoard = () => {
		aiSide.clearFleet();
		aiSide.clearBoard();
		playerAI.resetHitArray();
		gameController.resetAiTiles();
		aiSide.placeShipsRandomly();
		gameController.displayShips(aiBoard,'ai');
	}

	const newGame = () => {

		winBox.style.visibility = 'hidden';
		shipsContainer.style.visibility = 'visible';
		resetPlayerBoard();
		resetAiBoard();
		gameText.textContent = 'Place your ships.'

	}

	const resetGame = () => {
		newGame();
	}

	return {
		resetPlayerBoard,
		resetAiBoard,
		newGame,
		resetGame
	}

})();

const dragController = (() => {

	const shipContainer = document.querySelector('.ships-container');
	const allShipsContainer = document.querySelector('.all-ships');
	const allShips = document.querySelectorAll('.ship');
	const rotateBtn = document.querySelector('.rotate-btn');
	const randomBtn = document.querySelector('.random-btn');

  rotateBtn.addEventListener('click', () => {
		allShips.forEach(ship => {
			if (ship.classList.contains('horizontal')) {
				allShipsContainer.style.flexDirection = 'row';
				rotateVertically(ship);
			} else if (ship.classList.contains('vertical')) {
				allShipsContainer.style.flexDirection = 'column';
				rotateHorizontally(ship);  
			}
		})
	});

	randomBtn.addEventListener('click', () => {
		playerSide.placeShipsRandomly();
		gameController.displayShips(playerBoard,'player');
		shipContainer.style.visibility = 'hidden';
		gameText.textContent = 'Make your strike!';
	});

	const ships = [
		Ship('destroyer'),
		Ship('submarine'),
		Ship('cruiser'),
		Ship('battleship'),
		Ship('carrier')
	];

	allShips.forEach(ship => {
		ship.addEventListener('dragstart', dragStart);
	})

	const allPlayerTiles = document.querySelectorAll('.player-tile');

	allPlayerTiles.forEach(tile => {
		tile.addEventListener('dragenter', dragEnter);
		tile.addEventListener('dragover', dragOver);
		tile.addEventListener('dragLeave', dragLeave);
		tile.addEventListener('drop', dropShip);
	})

	let draggedShip;

	function dragStart(e) {
		draggedShip = e.target;
		
	}

	function dragEnter(e) {
		e.preventDefault();
		e.target.classList.add('drag-over');
	}

	function dragOver(e) {
		e.preventDefault();
		e.target.classList.add('drag-over');
	}

	function dragLeave(e) {
		e.preventDefault();
		e.target.classList.remove('drag-over');
	}

	function dropShip(e) {

		e.preventDefault();
		e.target.classList.remove('drag-over');

		const row = e.target.dataset.row;
		const col = e.target.dataset.col;

		const ship = ships[draggedShip.id];

		if (draggedShip.classList.contains('horizontal')) {
			playerSide.placeShip([row,col],ship,'vertical');
		} else if (draggedShip.classList.contains('vertical')) {
			playerSide.placeShip([row,col],ship,'horizontal');
		}

		gameController.displayShips(playerBoard,'player');

		if (playerSide.checkStartGame()) {
			shipContainer.style.visibility = 'hidden';
			gameText.textContent = 'Make your strike!';	
		}

	}

	// Use CSS class selectors instead*

	function rotateVertically(ship) {

		ship.classList.remove('horizontal');
		ship.classList.add('vertical');

		let id = ship.id;
		switch(id) {
			case '0':
				ship.style.width = '45px';
				ship.style.height = '90px';
				break;
			case '1':
				ship.style.width = '45px';
				ship.style.height = '135px';
				break;
			case '2':
				ship.style.width = '45px';
				ship.style.height = '135px';
				break;
			case '3': 
				ship.style.width = '45px';
				ship.style.height = '170px';
				break;
			case '4': 
				ship.style.width = '45px';
				ship.style.height = '225px';
				break;
		}
	}

	function rotateHorizontally(ship) {

		ship.classList.remove('vertical');
		ship.classList.add('horizontal');

		let id = ship.id;
		switch(id) {
			case '0':
				ship.style.width = '90px';
				ship.style.height = '45px';
				break;
			case '1':
				ship.style.width = '135px';
				ship.style.height = '45px';
				break;
			case '2':
				ship.style.width = '135px';
				ship.style.height = '45px';
				break;
			case '3': 
				ship.style.width = '170px';
				ship.style.height = '45px';
				break;
			case '4': 
				ship.style.width = '225px';
				ship.style.height = '45px';
				break;
		}
	}

})();

const updateBoard = () => {

	const playerTiles = document.querySelectorAll('.player-tile');
	const aiTiles = document.querySelectorAll('.ai-tile');

	const nameForm = document.querySelector('.name-form');
	const nameInput = document.querySelector('#username');
	const playerName = document.querySelector('.player-name');
	const startGameBtn = document.querySelector('.start-game-btn');

	startGameBtn.addEventListener('click', (event) => {
		
		startScreen.classList.add('fade-out');
		playerName.textContent = nameInput.value || 'Player';
		nameForm.style.visibility = 'hidden';
		nameForm.reset();
		
		
		setTimeout(() => {
			startScreen.style.display = 'none';
			shipContainer.style.visibility = 'visible';
			resetGameBtn.style.visibility = 'visible';
			aiSide.placeShipsRandomly();
			gameController.displayShips(aiBoard,'ai');
			gameText.textContent = 'Place your ships';
		}, 1000)

		event.preventDefault();
		
	})

	resetGameBtn.addEventListener('click', resetController.resetGame);
	newGameBtn.addEventListener('click', resetController.resetGame);

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
};

updateBoard();

console.log('Battleship');
console.log(playerBoard);
console.log(aiBoard);
console.log(playerSide.fleet);
console.log(aiSide.fleet);