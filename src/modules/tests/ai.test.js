import { Player } from '../components/user/player';
import { AI } from '../components/user/ai';
import { Gameboard } from '../components/gameboard';
import { Ship } from '../components/ship';

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

test('AI has a name', () => {
  expect(playerAI.name).toBe('Opponent AI');
});

test('AI turn set to false initially', () => {
  expect(playerAI.checkTurn()).toBe(false);
});

test('player turn set to true initially', () => {
  expect(playerMark.checkTurn()).toBe(true);
});

test('AI chooses random coordinates to hit and updates hitArray', () => {
  boardAI.placeShip([1, 1], Ship('battleship'), 'horizontal');
  boardMark.placeShip([1, 1], Ship('battleship'), 'horizontal');
  playerMark.targetedAttack([1, 1], playerAI, boardAI);

  expect(playerAI.hitArray.length).toBe(0);

  playerAI.randomAttack(playerMark, boardMark); // This correctly receives a random set of coordinates.

  expect(playerAI.hitArray.length).toBe(1);
});
