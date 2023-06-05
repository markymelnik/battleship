import HumanPlayer from './HumanPlayer';
import ComputerPlayer from './ComputerPlayer';

const initPlayers = (humanPlayerSide) => {
  const humanPlayer = new HumanPlayer('Human Player');
  const computerPlayer = new ComputerPlayer('Computer Player', humanPlayer, humanPlayerSide);

  return { humanPlayer, computerPlayer }
}

export default initPlayers;