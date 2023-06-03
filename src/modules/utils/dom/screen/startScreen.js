import createElement from '../createElement';

const createStartScreen = () => {
  const startScreen = createElement('div', 'start-screen');
  const startTitle = createElement('h1', 'start-screen-title', 'Battleship');

  startScreen.append(startTitle, createNameInputForm());
  return startScreen;
};

const createNameInputForm = () => {
  const nameInputForm = document.createElement('form');
  nameInputForm.classList.add('name-form');
  nameInputForm.setAttribute('name', 'name-form');
  nameInputForm.setAttribute('autocomplete', 'off');

  const label = document.createElement('label');
  label.setAttribute('for', 'username');
  label.textContent = 'Enter your name:';

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'username');
  input.setAttribute('name', 'username');
  input.setAttribute('required', '');

  const enterGameBtn = document.createElement('button');
  enterGameBtn.setAttribute('type', 'button');
  enterGameBtn.classList.add('enter-game-btn');
  enterGameBtn.textContent = 'Start';

  nameInputForm.append(label, input, enterGameBtn);

  return nameInputForm;
};

export default createStartScreen;
