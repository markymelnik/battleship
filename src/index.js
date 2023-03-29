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
const playerAI = new AI();
const aiTiles = document.querySelectorAll('.ai-tile');

playerSide.placeShip([1,1], 'destroyer', 'horizontal');
playerSide.placeShip([8,9], 'submarine', 'vertical');
playerSide.placeShip([2,8], 'cruiser', 'horizontal');
playerSide.placeShip([6,2], 'battleship', 'horizontal');
playerSide.placeShip([4,6], 'carrier', 'vertical');

aiSide.placeShip([5,6], 'destroyer', 'horizontal');
aiSide.placeShip([3,9], 'submarine', 'vertical');
aiSide.placeShip([5,2], 'cruiser', 'vertical');
aiSide.placeShip([6,4], 'battleship', 'horizontal');
aiSide.placeShip([1,6], 'carrier', 'vertical');

// domController.resetGame();
// domController.formController();

domController.displayShips(playerBoard,'player');
domController.displayShips(aiBoard,'ai');

const updateBoard = () => {

	aiTiles.forEach(tile => {
		let row = tile.dataset.row;
		let col = tile.dataset.col;
		tile.addEventListener('click', () => {
			playerMark.targetedAttack([row,col], playerAI, aiSide);
			tile.textContent = 'X';
			domController.updateTile(tile);
		})
	})

	playerTiles.forEach(tile => {
		let row = tile.dataset.row;
		let col = tile.dataset.col;
		tile.addEventListener('click', () => {
			playerAI.targetedAttack([row,col], playerMark, playerSide);
			tile.textContent = 'X';
			domController.updateTile(tile);
		})
	})

};

updateBoard();

console.log('Battleship');
console.log(playerBoard);
console.log(aiBoard);
console.log(playerSide.fleet);
console.log(aiSide.fleet);