import { Player } from '../components/player';
import { AI } from '../components/ai';
import { Gameboard } from '../components/gameboard';
import { Ship } from '../components/ship';
import { beforeEach, test, expect } from 'vitest';

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

test('AI has a name and its initial turn status is false', () => {
	expect(playerAI.turn).toBe(false);
	expect(playerAI.name).toBe('OpponentAI');
});

test('AI chooses random coordinates to hit and updates hitArray', () => {
	boardAI.placeShip([1, 1], Ship('battleship'), 'horizontal');
	boardMark.placeShip([1, 1], Ship('battleship'), 'horizontal');
	playerMark.targetedAttack([1, 1], playerAI, boardAI);
  	expect(playerAI.hitArray.length).toBe(0);
  	playerAI.randomAttack(playerMark, boardMark); // This correctly receives a random set of coordinates.
	expect(playerAI.hitArray.length).toBe(1);
});
