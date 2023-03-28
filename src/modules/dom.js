const { Gameboard } = require('./gameboard');

const domController = (() => {

  function createHeader() {
    const header = document.createElement('div');
    header.classList.add('header');
    const headerText = document.createElement('div');
    headerText.classList.add('header-text');
    headerText.textContent = 'Battleship';
    header.append(headerText);
    return header;
  }

  function createMiddle() {
    const middle = document.createElement('div');
    middle.classList.add('middle');

    const playerContainer = document.createElement('div');
    playerContainer.classList.add('player-container');

    const playerName = document.createElement('div');
    playerName.classList.add('player-name');
    playerName.textContent = 'placeholder';

    playerContainer.append(playerName,populateGrid('player'));

    const aiContainer = document.createElement('div');
    aiContainer.classList.add('ai-container');

    const aiName = document.createElement('div');
    aiName.classList.add('ai-name');
    aiName.textContent = 'OpponentAI';

    aiContainer.append(aiName,populateGrid('ai'));

    middle.append(playerContainer,aiContainer)

    return middle;
  }

  function createFooter() {
    const footer = document.createElement('div');
    footer.classList.add('footer');
    const footerText = document.createElement('div');
    footerText.classList.add('footer-text');
    footerText.textContent = 'Mark Melnik, 2023'
    footer.append(footerText);
    return footer;
  }

  function populateGrid(type) {
    const grid = document.createElement('div');
    grid.classList.add(type + '-grid');
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const tile = document.createElement('div');
        tile.classList.add(type + '-tile');
        tile.dataset.row = row;
        tile.dataset.col = col
        grid.appendChild(tile);
      }
    }
    return grid;
  }

  function displayShips(board, type) {
    const tiles = document.querySelectorAll('.'+type+'-tile');
    for (let row = 0; row < 10; row ++) {
      for (let col = 0; col < 10; col++) {
        tiles.forEach(tile => {
          if (board[row][col] !== null) {
            if (tile.dataset.row == row && tile.dataset.col == col) {
              tile.textContent = 'X';
            }  
          }
        })
      }
    }
  }

  const submitForm = () => {
    nameForm.addEventListener('submit', (event) => {
      playerName.textContent = nameInput.value || 'Player 1';
      nameForm.style.visibility = 'hidden';
      nameForm.reset();
      event.preventDefault();
    })
  }

  const resetGame = () => {
    resetBtn.addEventListener('click', () => {
      // nameForm.style.visibility = 'visible';
      // playerName.textContent = 'placeholder';
      console.log('Game Reset');
    })
  };

  const loadWebsite = () => {
    const container = document.querySelector('.container');
    container.append(createHeader(), createMiddle(), createFooter());
    return container;
  }

  return {
    createHeader,
    createMiddle,
    createFooter,
    populateGrid,
    displayShips,
    submitForm,
    resetGame,
    loadWebsite
  }

})();



const gameFlowController = () => {

  domController.loadWebsite();

  const playerSide = Gameboard();
  const playerBoard = playerSide.board;
  const playerGrid = document.querySelector('.player-grid');

  const aiSide = Gameboard();
  const aiBoard = aiSide.board;
  const aiGrid = document.querySelector('.ai-grid');

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

  // const nameForm = document.querySelector('.name-form');
  // const playerName = document.querySelector('.player-name');
  // const nameInput = document.querySelector('#nameInput');

  const resetBtn = document.querySelector('.reset-btn');

  domController.displayShips(playerBoard,'player');
  domController.displayShips(aiBoard,'ai');

  console.log('Battleship');
  console.log(playerBoard);
  console.log(aiBoard);

}

module.exports = { gameFlowController };