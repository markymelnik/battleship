import createElement from '../createElement';

const createNewGameBtn = () => {
  const newGameBtn = createElement('button','new-game-btn','New Game');
  newGameBtn.setAttribute('type','button');
  return newGameBtn;
}

export default createNewGameBtn;
