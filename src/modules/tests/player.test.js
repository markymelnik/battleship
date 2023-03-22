const { Player } = require('../player');
const { Gameboard } = require('../gameboard');
const { Ship } = require('../ship');

let playerMark;
let playerAI;
let boardMark;
let boardAI;

beforeEach(() => {
  playerMark = new Player('Mark');
  playerAI = new Player(12);
  boardMark = Gameboard();
  boardAI = Gameboard();
});

test('name is specified else it is set to default opponentAI', () => {
  expect(playerMark.name).toBe('Mark');
  expect(playerAI.name).toBe('opponentAI');
  expect(playerAI.name).not.toBe(12);
});

test('turn logic works correctly', () => {
  expect(playerMark.checkTurn()).toBe(true);
  playerMark.endTurn();
  expect(playerMark.checkTurn()).toBe(false);
  playerMark.startTurn();
  expect(playerMark.checkTurn()).toBe(true);
});

test('attack function works', () => {
  const foo = Ship('battleship');
  expect(playerMark.checkTurn()).toBe(true);
  boardAI.placeShip([2,4],foo.type,'horizontal');
  playerMark.attack([4,4], playerAI, boardAI);
  expect(playerMark.checkTurn()).toBe(false);
  expect(boardAI.board[4][4]).toBe('hit');
});