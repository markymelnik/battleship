
const domController = (() => {

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

  const createResetBtn = () => {
    const button = document.createElement('button');
    button.classList.add('reset-btn');
    button.setAttribute('type','button');
    button.textContent = 'Reset';
    return button;
  }

  const populateGrid = (type) => {
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

  const displayShips = (board, type) => {
    const tiles = document.querySelectorAll('.'+type+'-tile');
    for (let row = 0; row < 10; row ++) {
      for (let col = 0; col < 10; col++) {
        tiles.forEach(tile => {
          if (board[row][col] !== null) {
            if (tile.dataset.row == row && tile.dataset.col == col) {
              tile.textContent = 'O';
              tile.setAttribute('ship','true');
            }  
          }
        })
      }
    }
  }

  const resetGame = () => {
    const resetBtn = document.querySelector('.reset-btn');
    const nameForm = document.querySelector('.name-form');
    const playerName = document.querySelector('.player-name');
    resetBtn.addEventListener('click', () => {
      nameForm.style.visibility = 'visible';
      playerName.textContent = 'placeholder';
      console.log('Game Reset');
    })
  };

  const formController = () => {
    const nameForm = document.querySelector('.name-form');
    const nameInput = document.querySelector('#name-input');
    const playerName = document.querySelector('.player-name');
    const submitBtn = document.querySelector('.submit-btn');
    nameForm.addEventListener('submit', (event) => {
      playerName.textContent = nameInput.value || 'Player 1';
      nameForm.style.visibility = 'hidden';
      nameForm.reset();
      event.preventDefault();
    })
    submitBtn.addEventListener('click', (event) => {
      playerName.textContent = nameInput.value || 'Player 1';
      nameForm.style.visibility = 'hidden';
      nameForm.reset();
      event.preventDefault();
    })
  }

  const updateAiTile = (tile) => {
    tile.style.pointerEvents = 'none';
    tile.textContent = 'X';
    if (tile.getAttribute('ship')) {
      tile.style.backgroundColor = 'red';
    } else {
      tile.style.backgroundColor = 'lightblue';
    }
    return tile;
  }

  const loadWebsite = () => {
    const container = document.querySelector('.container');
    container.append(
      createHeader(), 
      createMiddle(), 
      createFooter(),
      // createNameForm(),
      // createResetBtn()
      );
    return container;
  }

  return {
    createHeader,
    createMiddle,
    createFooter,
    createNameForm,
    createResetBtn,
    populateGrid,
    displayShips,
    resetGame,
    formController,
    updateAiTile,
    loadWebsite
  }

})();

module.exports = { domController };