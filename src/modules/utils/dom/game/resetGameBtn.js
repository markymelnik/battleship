import createElement from '../createElement';

const createResetGameBtn = () => {
  const resetGameBtn = createElement('button', 'reset-game-btn', 'Reset Game');
  resetGameBtn.setAttribute('type', 'button');
  return resetGameBtn;
};

export default createResetGameBtn;
