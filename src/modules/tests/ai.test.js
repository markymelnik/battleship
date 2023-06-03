import HumanPlayer from '../components/player/HumanPlayer';
import ComputerPlayer from '../components/player/ComputerPlayer';
import Gameboard from '../components/control/Gameboard';
import Ship from '../components/ship/Ship';

let humanPlayer, computerPlayer, humanPlayerBoard, computerPlayerBoard;

beforeEach(() => {
  humanPlayer = new HumanPlayer('Mark');
  computerPlayer = new ComputerPlayer();
  humanPlayerBoard = Gameboard();
  computerPlayerBoard = Gameboard();
});

test('AI has a name', () => {
  expect(computerPlayer.name).toBe('Computer');
});

test('AI turn set to false initially', () => {
  expect(computerPlayer.checkTurn()).toBe(false);
});

test('player turn set to true initially', () => {
  expect(humanPlayer.checkTurn()).toBe(true);
});

test('AI chooses random coordinates to hit and updates hitArray', () => {
  computerPlayerBoard.placeShip([1, 1], Ship('battleship'), 'horizontal');
  humanPlayerBoard.placeShip([1, 1], Ship('battleship'), 'horizontal');
  humanPlayer.targetedAttack([1, 1], computerPlayer, computerPlayerBoard);

  expect(computerPlayer.hitArray.length).toBe(0);

  computerPlayer.randomAttack(humanPlayer, humanPlayerBoard); // This correctly receives a random set of coordinates.

  expect(computerPlayer.hitArray.length).toBe(1);
});
