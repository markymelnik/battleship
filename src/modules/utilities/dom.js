const domCreator = (() => {

  const createHeader = () => {
    const header = document.createElement('div');
    header.classList.add('header');
    const headerText = document.createElement('div');
    headerText.classList.add('header-text');
    headerText.textContent = 'Battleship';
    header.append(headerText);
    return header;
  }

  const createMiddle = () => {
    const middle = document.createElement('div');
    middle.classList.add('middle');
    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board-containers');
    const playerContainer = document.createElement('div');
    playerContainer.classList.add('player-container');
    const playerName = document.createElement('div');
    playerName.classList.add('player-name');
    playerName.textContent = 'placeholder';
    playerContainer.append(playerName,createGridTiles('player'));
    const aiContainer = document.createElement('div');
    aiContainer.classList.add('ai-container');
    const aiName = document.createElement('div');
    aiName.classList.add('ai-name');
    aiName.textContent = 'OpponentAI';
    aiContainer.append(aiName,createGridTiles('ai'));
    const gameText = document.createElement('div');
    gameText.classList.add('game-text');
    gameText.textContent = 'Loading...';
    boardContainer.append(playerContainer,aiContainer);
    middle.append(boardContainer, gameText)
    return middle;
  }

  const createFooter = () => {
    const footer = document.createElement('div');
    footer.classList.add('footer');
    const footerText = document.createElement('div');
    footerText.classList.add('footer-text');
    footerText.textContent = 'Mark Melnik, 2023'
    footer.append(footerText);
    return footer;
  }

  const createResetGameBtn = () => {
    const button = document.createElement('button');
    button.classList.add('reset-game-btn');
    button.setAttribute('type','button');
    button.textContent = 'Reset Game';
    return button;
  }

  const createWinBox = () => {
    const winBox = document.createElement('div');
    winBox.classList.add('win-box');
    const winText = document.createElement('div');
    winText.classList.add('win-text');
    winBox.append(winText,createNewGameBtn());
    return winBox;
  }

  const createNewGameBtn = () => {
    const newGameBtn = document.createElement('button');
    newGameBtn.classList.add('new-game-btn');
    newGameBtn.textContent = 'New Game';
    return newGameBtn;
  }

  const createGridTiles = (type) => {
    const grid = document.createElement('div');
    grid.classList.add(type + '-grid');
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const tile = document.createElement('div');
        tile.classList.add(type + '-tile');
        tile.dataset.row = row;
        tile.dataset.col = col;
        grid.appendChild(tile);
      }
    }
    return grid;
  }

  const appendShips = () => {

    const allShips = document.createElement('div');
    allShips.classList.add('all-ships');

    const destroyer = document.createElement('div');
    destroyer.classList.add('ship','destroyer-h','horizontal');
    destroyer.id = 0;
    destroyer.setAttribute('draggable','true');

    const submarine = document.createElement('div');
    submarine.classList.add('ship','submarine-h','horizontal');
    submarine.id = 1;
    submarine.setAttribute('draggable','true');

    const cruiser = document.createElement('div');
    cruiser.classList.add('ship','cruiser-h','horizontal');
    cruiser.id = 2;
    cruiser.setAttribute('draggable','true');

    const battleship = document.createElement('div');
    battleship.classList.add('ship','battleship-h','horizontal');
    battleship.id = 3;
    battleship.setAttribute('draggable','true');

    const carrier = document.createElement('div');
    carrier.classList.add('ship','carrier-h','horizontal');
    carrier.id = 4;
    carrier.setAttribute('draggable','true');
  
    allShips.append(
      destroyer,
      submarine,
      cruiser,
      battleship,
      carrier
    )

    return allShips;
  }

  const createDragContainer = () => {

    const dragContainer = document.createElement('div');
    dragContainer.classList.add('drag-container');

    const shipsContainerHeader = document.createElement('h1');
    shipsContainerHeader.textContent = 'Place your ships!';

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const rotateBtn = document.createElement('button');
    rotateBtn.classList.add('rotate-btn');
    rotateBtn.textContent = 'Rotate';

    const randomBtn = document.createElement('button');
    randomBtn.classList.add('random-btn');
    randomBtn.textContent = 'Random';

    btnContainer.append(rotateBtn,randomBtn);

    dragContainer.append(shipsContainerHeader, appendShips(), btnContainer);

    return dragContainer;
  } 

  const createNameForm = () => {

    const nameForm = document.createElement('form');
    nameForm.classList.add('name-form');
    nameForm.setAttribute('name','name-form');
    nameForm.setAttribute('autocomplete','off');

    const label = document.createElement('label');
    label.setAttribute('for','username');
    label.textContent = 'Enter your name:';

    const input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('id','username');
    input.setAttribute('name','username');
    input.setAttribute('required','');

    const startGameBtn = document.createElement('button');
    startGameBtn.setAttribute('type','button');
    startGameBtn.classList.add('start-game-btn');
    startGameBtn.textContent = 'Start';

    nameForm.append(label,input,startGameBtn);

    return nameForm; 
  }

  const createStartScreen = () => {
    const startScreen = document.createElement('div');
    startScreen.classList.add('start-screen');
    const startTitle = document.createElement('h1');
    startTitle.classList.add('start-title');
    startTitle.textContent = 'Battleship!';
    startScreen.append(startTitle,createNameForm());
    return startScreen;
  }

  const loadWebsite = () => {
    const container = document.querySelector('.container');
    container.append(
      createStartScreen(),
      createHeader(), 
      createMiddle(), 
      createFooter(),
      createDragContainer(),
      createWinBox(),
      createResetGameBtn()
      );
    return container;
  }

  return {
    loadWebsite,
    appendShips
  }

})();

module.exports = { domCreator };