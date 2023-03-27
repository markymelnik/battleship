const { Gameboard } = require('./gameboard');

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

  const playerGrid = document.createElement('div');
  playerGrid.classList.add('player-grid');

  playerContainer.append(playerName,playerGrid);

  const aiContainer = document.createElement('div');
  aiContainer.classList.add('ai-container');

  const aiName = document.createElement('div');
  aiName.classList.add('ai-name');
  aiName.textContent = 'OpponentAI';

  const aiGrid = document.createElement('div');
  aiGrid.classList.add('ai-grid');

  aiContainer.append(aiName,aiGrid);

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

const gameFlowController = () => {

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
  aiSide.placeShip([4,9], 'submarine', 'vertical');
  aiSide.placeShip([5,2], 'cruiser', 'vertical');
  aiSide.placeShip([6,4], 'battleship', 'horizontal');
  aiSide.placeShip([1,6], 'carrier', 'vertical');

  const resetBtn = document.querySelector('.reset-btn');

  console.log('Battleship');
  console.log(playerBoard);
  console.log(aiBoard);

  // const nameForm = document.querySelector('.name-form');
  // const playerName = document.querySelector('.player-name');
  // const nameInput = document.querySelector('#nameInput');

  
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
  
  return {
    submitForm,
    resetGame
  }

};

const loadWebsite = () => {
  const container = document.querySelector('.container');
  container.append(createHeader(), createMiddle(), createFooter());
  return container;
}

module.exports = { loadWebsite, gameFlowController };