const { Gameboard } = require('./modules/gameboard');
const { Player } = require('./modules/player');
const { AI } = require('./modules/ai');
const { domController } = require('./modules/dom');

domController.loadWebsite();

const playerSide = Gameboard();
const playerBoard = playerSide.board;
const playerMark = new Player('Mark');
const playerTiles = document.querySelectorAll('.player-tile');

const aiSide = Gameboard();
const aiBoard = aiSide.board;
const playerAI = new AI('AI',playerMark,playerSide);
const aiTiles = document.querySelectorAll('.ai-tile');

const newGameBtn = document.querySelector('.new-game-btn');
const resetGameBtn = document.querySelector('.reset-game-btn');

const placeAllPlayerShips = () => {
	playerSide.placeShip([1,1], 'destroyer', 'horizontal');
	playerSide.placeShip([8,9], 'submarine', 'vertical');
	playerSide.placeShip([2,8], 'cruiser', 'horizontal');
	playerSide.placeShip([6,2], 'battleship', 'horizontal');
	playerSide.placeShip([4,6], 'carrier', 'vertical');
}

const resetGame = () => {
	domController.resetNameForm();
	newGame();
}

const newGame = () => {
	const winBox = document.querySelector('.win-box');
	winBox.style.visibility = 'hidden';
	resetPlayerBoard();
	resetAiBoard();
}

const resetPlayerBoard = () => {
	playerSide.clearFleet();
	playerSide.clearBoard();
	domController.resetPlayerTiles();
	placeAllPlayerShips();
	domController.displayShips(playerBoard,'player');
}

const resetAiBoard = () => {
	aiSide.clearFleet();
	aiSide.clearBoard();
	playerAI.resetHitArray();
	domController.resetAiTiles();
	aiSide.placeShipsRandomly();
	domController.displayShips(aiBoard,'ai');
}

const updateBoard = () => {

	placeAllPlayerShips();
	aiSide.placeShipsRandomly();
	domController.displayShips(playerBoard,'player');
	domController.displayShips(aiBoard,'ai');

	domController.nameFormController();

	aiTiles.forEach(tile => {
		let row = tile.dataset.row;
		let col = tile.dataset.col;

		tile.addEventListener('click', () => {

			playerMark.targetedAttack([row,col], playerAI, aiSide);
			domController.updateTile(tile);
			playerAI.randomAttack(playerMark, playerSide);

			let strike = playerAI.hitArray[playerAI.hitArray.length - 1];

			playerTiles.forEach(tile => {
				let row = +tile.dataset.row;
				let col = +tile.dataset.col;
				if (strike[0] === row && strike[1] === col) {
					setTimeout(() => { domController.updateTile(tile) }, 800);
				}
			})

			if (playerSide.checkEndGame()) {
				domController.endGameController('ai');
			}
			
			if (aiSide.checkEndGame()) {
				domController.endGameController('player');
			}

		})

	})

	resetGameBtn.addEventListener('click', resetGame);
	newGameBtn.addEventListener('click', newGame);
	
};

updateBoard();

console.log('Battleship');
console.log(playerBoard);
console.log(aiBoard);
console.log(playerSide.fleet);
console.log(aiSide.fleet);