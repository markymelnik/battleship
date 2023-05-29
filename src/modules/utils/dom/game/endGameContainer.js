import createElement from '../createElement';
import createNewGameBtn from './newGameBtn';

const createEndGameContainer = () => {
  const endGameContainer = createElement('div', 'win-box');
  const winText = createElement('div', 'win-text');
  endGameContainer.append(winText, createNewGameBtn());
  return endGameContainer;
};

export default createEndGameContainer;
