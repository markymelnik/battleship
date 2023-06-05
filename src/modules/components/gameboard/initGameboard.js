import Gameboard from './gameboard';

const initGameboard = () => {
  const humanPlayerSide = Gameboard();
  const computerPlayerSide = Gameboard();

  return { humanPlayerSide, computerPlayerSide }
}

export default initGameboard;