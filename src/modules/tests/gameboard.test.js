import { Gameboard } from '../components/gameboard';
import { Ship } from '../components/ship';
import { beforeEach, test, expect } from 'vitest';

let gameboard;

beforeEach(() => {
  gameboard = Gameboard();
});

test('check for an empty gameboard with coordinate within bounds', () => {
  expect(gameboard.inBounds([0,0])).toBe(true);
  expect(gameboard.inBounds([9,9])).toBe(true);
  expect(gameboard.inBounds([9,10])).toBe(false);
  expect(gameboard.inBounds([-1,-2])).toBe(false);
  expect(gameboard.inBounds([1,2])).toBe(true);
});

test('check for valid vertical and horizontal placement', () => {
  expect(gameboard.validPlacement([5,5],Ship('carrier'),'horizontal')).toBe(true);
  expect(gameboard.validPlacement([6,5],Ship('carrier'),'horizontal')).toBe(false);
  expect(gameboard.validPlacement([5,4],Ship('carrier'),'vertical')).toBe(true);
  expect(gameboard.validPlacement([5,3],Ship('carrier'),'vertical')).toBe(false);
  expect(gameboard.validPlacement([9,3],Ship('destroyer'),'horizontal')).toBe(false);
  expect(gameboard.validPlacement([2,2],Ship('battleship'),'vertical')).toBe(false);
  expect(gameboard.validPlacement([7,2],Ship('submarine'),'horizontal')).toBe(true);
  expect(gameboard.validPlacement([2,7],Ship('submarine'),'vertical')).toBe(true);
});

test('check that ships do not cross over each other', () => {
  gameboard.placeShip([5,5],Ship('battleship'),'horizontal');
  expect(gameboard.isPathClearOfShips([6,6],Ship('submarine'),'vertical')).toBe(false);
  expect(gameboard.isPathClearOfShips([8,6],Ship('submarine'),'vertical')).toBe(false);
  expect(gameboard.isPathClearOfShips([9,6],Ship('submarine'),'vertical')).toBe(true);
});

test('check that all valid adjacent tiles are returned', () => {
  expect(gameboard.getAdjacentTiles([5,5])).toStrictEqual([[4, 4], [4, 5], [4, 6], [5, 6], [6, 6], [6, 5], [6, 4], [5, 4]]);
  expect(gameboard.getAdjacentTiles([1,0])).toStrictEqual([[0, 0], [0, 1], [1, 1], [2, 1], [2, 0]]);
  expect(gameboard.getAdjacentTiles([0,0])).toStrictEqual([[0, 1], [1, 1], [1, 0]]);
});

test('check that all adjacent tiles are empty', () => {
  expect(gameboard.areAdjacentTilesEmpty([4,4],Ship('battleship'),'horizontal')).toBe(true);
  gameboard.placeShip([3,3],Ship('carrier'),'horizontal');
  expect(gameboard.areAdjacentTilesEmpty([4,4],Ship('battleship'),'horizontal')).toBe(false);
  expect(gameboard.areAdjacentTilesEmpty([8,4],Ship('battleship'),'vertical')).toBe(false);
  expect(gameboard.areAdjacentTilesEmpty([9,4],Ship('battleship'),'vertical')).toBe(true);
});

test('gameboard position contains the ship object when ship is placed', () => {
  expect(gameboard.board[4][2]).toBe(null);
  expect(gameboard.board[5][2]).toBe(null);
  expect(gameboard.board[6][2]).toBe(null);
  gameboard.placeShip([4,2],Ship('destroyer'),'horizontal');
  expect(JSON.stringify(gameboard.board[4][2])).toEqual(JSON.stringify(Ship('destroyer')));
  expect(JSON.stringify(gameboard.board[5][2])).toEqual(JSON.stringify(Ship('destroyer')));
  expect(JSON.stringify(gameboard.board[6][2])).toEqual(JSON.stringify(null));

  expect(gameboard.board[8][3]).toBe(null);
  expect(gameboard.board[8][2]).toBe(null);
  expect(gameboard.board[8][1]).toBe(null);
  expect(gameboard.board[8][0]).toBe(null);
  gameboard.placeShip([8,3],Ship('submarine'),'vertical');
  expect(JSON.stringify(gameboard.board[8][3])).toEqual(JSON.stringify(Ship('submarine')));
  expect(JSON.stringify(gameboard.board[8][2])).toEqual(JSON.stringify(Ship('submarine')));
  expect(JSON.stringify(gameboard.board[8][1])).toEqual(JSON.stringify(Ship('submarine')));
  expect(JSON.stringify(gameboard.board[8][0])).toEqual(JSON.stringify(null));
});

test('check if placing a ship pushes that ship into fleet array', () => {
  const foo = Ship('cruiser');
  const bar = Ship('carrier');
  const taz = Ship('carrier');
  expect(JSON.stringify(gameboard.fleet)).toBe(JSON.stringify([]));
  gameboard.placeShip([2,2],Ship('cruiser'),'horizontal');
  expect(JSON.stringify(gameboard.fleet)).toBe(JSON.stringify([foo]));
  gameboard.placeShip([4,4],Ship('carrier'),'horizontal');
  expect(JSON.stringify(gameboard.fleet)).toBe(JSON.stringify([foo,bar]));
});

test('check if an attack hits a ship and increases hit count of that ship in the fleet', () => {
  gameboard.placeShip([4,4],Ship('battleship'),'horizontal');
  gameboard.receiveAttack([4,4]);
  gameboard.receiveAttack([5,4]);
  gameboard.receiveAttack([7,4]);
  expect(gameboard.fleet[0].hits).toBe(3);
  gameboard.placeShip([2,3],Ship('destroyer'),'vertical');
  gameboard.receiveAttack([2,3]);
  gameboard.receiveAttack([2,2]);
  expect(gameboard.fleet[1].hits).toBe(2);
});

test('the same type of ship cannot be placed twice', () => {
  gameboard.placeShip([2,2], Ship('destroyer'), 'vertical');
  expect(() => { gameboard.placeShip([4,4], Ship('destroyer'), 'horizontal') } ).toThrow(Error);
});

test('return true if a ship is sunk', () => {
  gameboard.placeShip([1,8],Ship('battleship'),'vertical');
  expect(gameboard.fleet[0].isSunk()).toBe(false);
  gameboard.receiveAttack([1,8]);
  gameboard.receiveAttack([1,7]);
  expect(gameboard.fleet[0].isSunk()).toBe(false);
  gameboard.receiveAttack([1,6]);
  gameboard.receiveAttack([1,5]);
  expect(gameboard.fleet[0].hits).toBe(4);
  expect(gameboard.fleet[0].isSunk()).toBe(true);
});

test('check to see if whole fleet is sunk, signaling the game ending', () => {
  gameboard.placeShip([1,8],Ship('battleship'),'vertical');
  expect(gameboard.fleet[0].isSunk()).toBe(false);
  expect(gameboard.checkEndGame()).toBe(false);
  expect(JSON.stringify(gameboard.fleet)).toBe(JSON.stringify([Ship('battleship')]));
  gameboard.receiveAttack([1,8]);
  gameboard.receiveAttack([1,7]);
  gameboard.receiveAttack([1,6]);
  gameboard.receiveAttack([1,5]);
  expect(gameboard.fleet[0].hits).toBe(4);
  expect(gameboard.fleet[0].length).toBe(4);
  expect(gameboard.fleet[0].isSunk()).toBe(true);
  expect(gameboard.checkEndGame()).toBe(true);
});

test('ships are randomly placed on the board', () => {
  gameboard.placeShipsRandomly();
})