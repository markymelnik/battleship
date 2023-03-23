const { Player } = require('../player');
const { AI } = require('../ai');
const { Gameboard } = require('../gameboard');
const { Ship } = require('../ship');

let playerMark;
let playerAI;
let boardMark;
let boardAI;

beforeEach(() => {
  playerMark = new Player('Mark');
  playerAI = new AI();
  boardMark = Gameboard();
  boardAI = Gameboard();
});

test('name is specified else it is set to default opponentAI', () => {
  expect(playerMark.name).toBe('Mark');
  expect(playerAI.name).toBe('opponentAI');
});

test('turn logic works correctly through endTurn function', () => {
  expect(playerMark.checkTurn()).toBe(true);
  expect(playerAI.checkTurn()).toBe(false);
  playerMark.endTurn(playerAI);
  expect(playerMark.checkTurn()).toBe(false);
  expect(playerAI.checkTurn()).toBe(true);
  playerAI.endTurn(playerMark);
  expect(playerMark.checkTurn()).toBe(true);
  expect(playerAI.checkTurn()).toBe(false);
  playerMark.endTurn(playerAI);
  expect(playerMark.checkTurn()).toBe(false);
  expect(playerAI.checkTurn()).toBe(true);
});

test('attack function correctly calls endTurn which does not allow two consecutive attacks', () => {
  const foo = Ship('battleship');

  expect(playerMark.checkTurn()).toBe(true);
  expect(playerAI.checkTurn()).toBe(false);

  expect(boardAI.board[4][4]).toBe(null);
  boardAI.placeShip([2,4],foo.type,'horizontal');
  playerMark.targetedAttack([4,4], playerAI, boardAI);
  expect(boardAI.board[4][4]).toBe('hit');
  expect(() => { playerMark.targetedAttack([5,4], playerAI, boardAI) } ).toThrow(Error);

  expect(playerMark.checkTurn()).toBe(false);
  expect(playerAI.checkTurn()).toBe(true);

  expect(boardMark.board[5][5]).toBe(null);
  boardMark.placeShip([5,8],foo.type,'vertical');
  playerAI.targetedAttack([5,7], playerMark, boardMark);
  expect(boardMark.board[5][7]).toBe('hit');
  expect(() => { playerAI.targetedAttack([5,6], playerMark, boardMark) } ).toThrow(Error);

  expect(playerMark.checkTurn()).toBe(true);
  expect(playerAI.checkTurn()).toBe(false);
});