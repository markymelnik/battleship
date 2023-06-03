import createElement from '../createElement';
import createNewGameBtn from './newGameBtn';

const createEndGameContainer = () => {
  const endGameContainer = createElement('div', 'end-game-container');
  const winText = createElement('div', 'end-game-text');
  endGameContainer.append(winText, createNewGameBtn());
  return endGameContainer;
};

export default createEndGameContainer;
