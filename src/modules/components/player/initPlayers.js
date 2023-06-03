import HumanPlayer from './HumanPlayer';
import ComputerPlayer from './ComputerPlayer';
import Gameboard from '../control/Gameboard';

const initPlayers = () => {
  const humanPlayer = new HumanPlayer('Human Player');
  const humanPlayerSide = Gameboard();

  const computerPlayer = new ComputerPlayer('Computer Player', humanPlayer, humanPlayerSide);
  const computerPlayerSide = Gameboard();

  return { humanPlayer, humanPlayerSide, computerPlayer, computerPlayerSide }
}

export default initPlayers;