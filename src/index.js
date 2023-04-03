const { Gameboard } = require('./modules/gameboard');
const { Player } = require('./modules/player');
const { AI } = require('./modules/ai');
const { domController } = require('./modules/dom')

domController.loadWebsite();

const playerSide = Gameboard();
const playerBoard = playerSide.board;
const playerGrid = document.querySelector('.player-grid');
const playerMark = new Player('Mark');
const playerTiles = document.querySelectorAll('.player-tile');

const aiSide = Gameboard();
const aiBoard = aiSide.board;
const aiGrid = document.querySelector('.ai-grid');
const playerAI = new AI('AI',playerMark,playerSide);
const aiTiles = document.querySelectorAll('.ai-tile');

const resetBtn = document.querySelector('.reset-btn');

const placeAllPlayerShips = () => {
	playerSide.placeShip([1,1], 'destroyer', 'horizontal');
	playerSide.placeShip([8,9], 'submarine', 'vertical');
	playerSide.placeShip([2,8], 'cruiser', 'horizontal');
	playerSide.placeShip([6,2], 'battleship', 'horizontal');
	playerSide.placeShip([4,6], 'carrier', 'vertical');
}

const resetBoards = () => {
	
	const winBox = document.querySelector('.win-box');
	winBox.style.visibility = 'hidden';

	resetPlayerBoard();
	resetAiBoard();

}

const resetPlayerBoard = () => {
	playerSide.clearBoard();
	playerSide.clearFleet();
	domController.resetTiles('player');
	placeAllPlayerShips();
	domController.displayShips(playerBoard,'player');
}

const resetAiBoard = () => {
	aiSide.clearBoard();
	aiSide.clearFleet();
	domController.resetTiles('ai');
	aiSide.placeShipsRandomly();
	domController.displayShips(aiBoard,'ai');
}

// domController.formController();

placeAllPlayerShips();
aiSide.placeShipsRandomly();

domController.displayShips(playerBoard,'player');
domController.displayShips(aiBoard,'ai');

const updateBoard = () => {

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
					setTimeout(() => { domController.updateTile(tile) }, 500);
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
	
};

resetBtn.addEventListener('click', resetBoards);

updateBoard();

console.log('Battleship');
console.log(playerBoard);
console.log(aiBoard);