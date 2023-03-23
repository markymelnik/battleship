const { Gameboard } = require('./gameboard');

const playerGrid = document.querySelector('.player-grid');
const aiGrid = document.querySelector('.ai-grid');

const nameForm = document.querySelector('.name-form');
const playerName = document.querySelector('.player-name');
const nameInput = document.querySelector('#nameInput');

const resetBtn = document.querySelector('.reset-btn');

const displayController = () => {
  console.log('Battleship');
  getGridSquares(playerGrid);
  getGridSquares(aiGrid);
  submitForm();
  resetGame();
};

const getGridSquares = (grid) => {
  grid.style.gridTemplate = `repeat(10, 40px) / repeat(10, 40px)`;
  for (let i = 0; i < (10 * 10); i++) {
    let tile = document.createElement('div');
    tile.classList.add('tile');
    grid.appendChild(tile);
  }
}

const submitForm = () => {
  nameForm.addEventListener('submit', (event) => {
    playerName.textContent = nameInput.value;
    nameForm.style.visibility = 'hidden';
    nameForm.reset();
    event.preventDefault();
  })
};

const resetGame = () => {
  resetBtn.addEventListener('click', () => {
    nameForm.style.visibility = 'visible';
    playerName.textContent = 'placeholder';
  })
}

module.exports = { displayController };