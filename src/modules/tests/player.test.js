import Player from '../components/user/player';
import AI from '../components/user/ai';
import Gameboard from '../components/gameboard';
import Ship from '../components/ship';

let playerMark, playerAI, boardMark, boardAI;

beforeEach(() => {
  playerMark = new Player('Mark');
  playerAI = new AI();
  boardMark = Gameboard();
  boardAI = Gameboard();
});

test('player has a name', () => {
  expect(playerMark.name).toBe('Mark');
});

test('player turn set to true initially', () => {
  expect(playerMark.checkTurn()).toBe(true);
});

test('AI turn set to false initially', () => {
  expect(playerAI.checkTurn()).toBe(false);
});

test('endTurn function switches turns between players', () => {
  playerMark.endTurn(playerAI);
  expect(playerMark.checkTurn()).toBe(false);
  expect(playerAI.checkTurn()).toBe(true);
  playerAI.endTurn(playerMark);
  expect(playerMark.checkTurn()).toBe(true);
  expect(playerAI.checkTurn()).toBe(false);
});

test('targeted attack throws error when it is not the player\'s turn', () => {
  boardAI.placeShip([2, 4], Ship('battleship'), 'horizontal');
  boardMark.placeShip([5, 8], Ship('battleship'), 'vertical');

  expect(playerMark.checkTurn()).toBe(true);
  expect(playerAI.checkTurn()).toBe(false);

  playerMark.targetedAttack([4, 4], playerAI, boardAI);
  expect(() => {
    playerMark.targetedAttack([5, 4], playerAI, boardAI);
  }).toThrow(Error);

  expect(playerMark.checkTurn()).toBe(false);
  expect(playerAI.checkTurn()).toBe(true);

  playerAI.targetedAttack([5, 7], playerMark, boardMark);
  expect(() => {
    playerAI.targetedAttack([5, 6], playerMark, boardMark);
  }).toThrow(Error);

  expect(playerMark.checkTurn()).toBe(true);
  expect(playerAI.checkTurn()).toBe(false);
});
