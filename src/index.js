const { Gameboard } = require('./modules/gameboard');
const { Ship } = require('./modules/ship');
const { Player } = require('./modules/player');
const { AI } = require('./modules/ai');
const { domCreator } = require('./modules/dom');
const { gameController } = require('./modules/control');

domCreator.loadWebsite();

const playerSide = Gameboard();
const playerBoard = playerSide.board;
const playerMark = new Player('Mark');

const aiSide = Gameboard();
const aiBoard = aiSide.board;
const playerAI = new AI('AI',playerMark,playerSide);

const newGameBtn = document.querySelector('.new-game-btn');
const resetGameBtn = document.querySelector('.reset-game-btn');

const resetController = (() => {

	const resetPlayerBoard = () => {
		playerSide.clearFleet();
		playerSide.clearBoard();
		playerSide.placeAllShips();
		gameController.resetPlayerTiles();
		gameController.displayShips(playerBoard,'player');
	}

	const resetAiBoard = () => {
		aiSide.clearFleet();
		aiSide.clearBoard();
		playerAI.resetHitArray();
		aiSide.placeShipsRandomly();
		gameController.resetAiTiles();
		gameController.displayShips(aiBoard,'ai');
	}

	const newGame = () => {
		const winBox = document.querySelector('.win-box');
		winBox.style.visibility = 'hidden';
		resetPlayerBoard();
		resetAiBoard();
	}

	const resetGame = () => {
		gameController.resetNameForm();
		newGame();
	}

	return {
		resetPlayerBoard,
		resetAiBoard,
		newGame,
		resetGame
	}

})();

const updateBoard = () => {

	const playerTiles = document.querySelectorAll('.player-tile');
	const aiTiles = document.querySelectorAll('.ai-tile');

	// playerSide.placeAllShips();
	aiSide.placeShipsRandomly();
	gameController.displayShips(playerBoard,'player');
	gameController.displayShips(aiBoard,'ai');

	// gameController.nameFormController();
	resetGameBtn.addEventListener('click', resetController.resetGame);
	newGameBtn.addEventListener('click', resetController.newGame);

	aiTiles.forEach(tile => {
		let row = tile.dataset.row;
		let col = tile.dataset.col;

		tile.addEventListener('click', () => {

			playerMark.targetedAttack([row,col], playerAI, aiSide);
			gameController.updateTile(tile);
			playerAI.randomAttack(playerMark, playerSide);

			let strike = playerAI.hitArray[playerAI.hitArray.length - 1];

			playerTiles.forEach(tile => {
				let row = +tile.dataset.row;
				let col = +tile.dataset.col;
				if (strike[0] === row && strike[1] === col) {
					setTimeout(() => { gameController.updateTile(tile) }, 600);
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




const ships = [
	Ship('destroyer'),
	Ship('submarine'),
	Ship('cruiser'),
	Ship('battleship'),
	Ship('carrier')
];

let notDropped;

let draggedShip;

const allShips = document.querySelectorAll('.ship');

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


function dragStart(e) {
	notDropped = false;
	draggedShip = e.target;
}

function dragEnter(e) {
}

function dragOver(e) {
	e.preventDefault();
}

function dragLeave(e) {

}

function dropShip(e) {
	const row = e.target.dataset.row;
	const col = e.target.dataset.col;
	const ship = ships[draggedShip.id];
	console.log(row);
	console.log(col);
	console.log(ship.type);
	playerSide.placeShip([row,col],ship.type,'horizontal');
	if (!notDropped) {
		draggedShip.remove;
	}
}