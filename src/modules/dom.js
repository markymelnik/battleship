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
    middle.append(playerContainer,aiContainer)
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

  const createNameForm = () => {
    const nameForm = document.createElement('form');
    nameForm.classList.add('name-form');
    nameForm.setAttribute('name','nameform');
    nameForm.setAttribute('autocomplete','off');
    const prompt = document.createElement('h1');
    prompt.textContent = 'Enter your name:';
    const formContent = document.createElement('div');
    formContent.classList.add('form-content');
    const label = document.createElement('label');
    label.setAttribute('for','name');
    const input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('id','name-input');
    input.setAttribute('name','name');
    input.setAttribute('required','');
    const button = document.createElement('button');
    button.classList.add('submit-btn');
    button.setAttribute('type','button');
    button.textContent = 'Submit';
    formContent.append(label, input, button);
    nameForm.append(prompt,formContent);
    return nameForm; 
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

  const loadWebsite = () => {
    const container = document.querySelector('.container');
    container.append(
      createHeader(), 
      createMiddle(), 
      createFooter(),
      createNameForm(),
      createWinBox(),
      createResetGameBtn()
      );
    return container;
  }

  return {
    loadWebsite
  }

})();

module.exports = { domCreator };