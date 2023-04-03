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

playerSide.placeShip([1,1], 'destroyer', 'horizontal');
playerSide.placeShip([8,9], 'submarine', 'vertical');
playerSide.placeShip([2,8], 'cruiser', 'horizontal');
playerSide.placeShip([6,2], 'battleship', 'horizontal');
playerSide.placeShip([4,6], 'carrier', 'vertical');

aiSide.placeShipsRandomly();

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
			domController.updateTile(tile);
			playerAI.randomAttack(playerMark, playerSide);

			let strike = playerAI.hitArray[playerAI.hitArray.length - 1];

			playerTiles.forEach(tile => {
				let row = +tile.dataset.row;
				let col = +tile.dataset.col;
				if (strike[0] === row && strike[1] === col) {
					setTimeout(() => { domController.updateTile(tile) }, 500);
				}
			});

			if (playerSide.checkEndGame()) {
				domController.showWinText('ai');
				console.log('You lose!');
			}	
			if (aiSide.checkEndGame()) {
				domController.showWinText('player');
				console.log('You win!');
			}

		})
	})
};

updateBoard();

console.log('Battleship');
console.log(playerBoard);
console.log(aiBoard);