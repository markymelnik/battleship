const { Gameboard } = require('./gameboard');

const playerGrid = document.querySelector('.player-grid');
const aiGrid = document.querySelector('.ai-grid');

/* const nameForm = document.querySelector('.name-form');
const playerName = document.querySelector('.player-name');
const nameInput = document.querySelector('#nameInput'); */

const resetBtn = document.querySelector('.reset-btn');


const displayController = () => {

  const populateWithTiles = (grid) => {
    grid.style.gridTemplate = `repeat(10, 40px) / repeat(10, 40px)`;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('row', i);
        tile.setAttribute('col', j);
        grid.appendChild(tile);
      }
    }
  }

  /* const submitForm = () => {
  nameForm.addEventListener('submit', (event) => {
    playerName.textContent = nameInput.value || 'Player 1';
    nameForm.style.visibility = 'hidden';
    nameForm.reset();
    event.preventDefault();
  })
}; */

  const resetGame = () => {
    resetBtn.addEventListener('click', () => {
      nameForm.style.visibility = 'visible';
      playerName.textContent = 'placeholder';
    })
  };

  const playerSide = Gameboard();
  const playerBoard = playerSide.board;

  const aiSide = Gameboard();
  const aiBoard = aiSide.board;

  playerSide.placeShip([1,1], 'destroyer', 'horizontal');
  playerSide.placeShip([6,2], 'battleship', 'horizontal');
  playerSide.placeShip([8,9], 'submarine', 'vertical');
  playerSide.placeShip([4,6], 'carrier', 'vertical');
  playerSide.placeShip([2,8], 'cruiser', 'horizontal');

  aiSide.placeShip([4,4], 'destroyer', 'horizontal');
  aiSide.placeShip([6,2], 'battleship', 'horizontal');
  aiSide.placeShip([2,9], 'submarine', 'vertical');
  aiSide.placeShip([1,6], 'carrier', 'vertical');
  aiSide.placeShip([6,8], 'cruiser', 'vertical');


  console.log('Battleship');
  console.log(playerBoard);
  console.log(aiBoard);
  populateWithTiles(playerGrid);
  populateWithTiles(aiGrid);
  
  // submitForm();
  resetGame();

};







module.exports = { displayController };