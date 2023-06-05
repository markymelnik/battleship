import HumanPlayer from '../components/player/HumanPlayer';
import ComputerPlayer from '../components/player/ComputerPlayer';
import Gameboard from '../components/gameboard/gameboard';
import Ship from '../components/ship/Ship';

let humanPlayer, computerPlayer, humanPlayerBoard, computerPlayerBoard;

beforeEach(() => {
  humanPlayer = new HumanPlayer('Mark');
  computerPlayer = new ComputerPlayer();
  humanPlayerBoard = Gameboard();
  computerPlayerBoard = Gameboard();
});

test('player has a name', () => {
  expect(humanPlayer.name).toBe('Mark');
});

test('player turn set to true initially', () => {
  expect(humanPlayer.checkTurn()).toBe(true);
});

test('AI turn set to false initially', () => {
  expect(computerPlayer.checkTurn()).toBe(false);
});

test('endTurn function switches turns between players', () => {
  humanPlayer.endTurn(computerPlayer);
  expect(humanPlayer.checkTurn()).toBe(false);
  expect(computerPlayer.checkTurn()).toBe(true);
  computerPlayer.endTurn(humanPlayer);
  expect(humanPlayer.checkTurn()).toBe(true);
  expect(computerPlayer.checkTurn()).toBe(false);
});

test('targeted attack throws error when it is not the player\'s turn', () => {
  computerPlayerBoard.placeShip([2, 4], Ship('battleship'), 'horizontal');
  humanPlayerBoard.placeShip([5, 8], Ship('battleship'), 'vertical');

  expect(humanPlayer.checkTurn()).toBe(true);
  expect(computerPlayer.checkTurn()).toBe(false);

  humanPlayer.targetedAttack([4, 4], computerPlayer, computerPlayerBoard);
  expect(() => {
    humanPlayer.targetedAttack([5, 4], computerPlayer, computerPlayerBoard);
  }).toThrow(Error);

  expect(humanPlayer.checkTurn()).toBe(false);
  expect(computerPlayer.checkTurn()).toBe(true);

  computerPlayer.targetedAttack([5, 7], humanPlayer, humanPlayerBoard);
  expect(() => {
    computerPlayer.targetedAttack([5, 6], humanPlayer, humanPlayerBoard);
  }).toThrow(Error);

  expect(humanPlayer.checkTurn()).toBe(true);
  expect(computerPlayer.checkTurn()).toBe(false);
});
