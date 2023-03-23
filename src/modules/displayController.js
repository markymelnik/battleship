const playerGrid = document.querySelector('.player-grid');
const aiGrid = document.querySelector('.ai-grid');

const displayController = () => {
  console.log('Battleship');
  getGridSquares(playerGrid);
  getGridSquares(aiGrid);
};

const getGridSquares = (grid) => {
  grid.style.gridTemplate = `repeat(10, 40px) / repeat(10, 40px)`;
  for (let i = 0; i < (10 * 10); i++) {
    let tile = document.createElement('div');
    tile.classList.add('tile');
    grid.appendChild(tile);
  }
}

module.exports = { displayController };