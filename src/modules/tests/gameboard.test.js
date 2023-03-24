const { Gameboard } = require('../gameboard');
const { Ship } = require('../ship');

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
  expect(gameboard.validPlacement([5,5],'carrier','horizontal')).toBe(null);
  expect(gameboard.validPlacement([6,5],'carrier','horizontal')).toBe(undefined);
  expect(gameboard.validPlacement([5,5],'carrier','vertical')).toBe(null);
  expect(gameboard.validPlacement([5,4],'carrier','vertical')).toBe(undefined);
  expect(gameboard.validPlacement([9,3],'destroyer','horizontal')).toBe(undefined);
  expect(gameboard.validPlacement([2,3],'battleship','vertical')).toBe(undefined);
  expect(gameboard.validPlacement([7,2],'submarine','horizontal')).toBe(null);
  expect(gameboard.validPlacement([2,7],'submarine','vertical')).toBe(null);
});

test('check that ships do not cross over each other', () => {
  const foo = Ship('battleship');
  const bar = Ship('submarine');
  gameboard.placeShip([5,5],foo.type,'horizontal');
  expect(() => { gameboard.placeShip([6,6],bar.type,'vertical') } ).toThrow(Error);
  gameboard.placeShip([5,4],bar.type,'vertical');
});

test('gameboard position contains the ship object when ship is placed', () => {
  const foo = Ship('destroyer');
  const bar = Ship('submarine');

  expect(gameboard.board[4][2]).toBe(null);
  expect(gameboard.board[5][2]).toBe(null);
  expect(gameboard.board[6][2]).toBe(null);
  gameboard.placeShip([4,2],foo.type,'horizontal');
  expect(JSON.stringify(gameboard.board[4][2])).toEqual(JSON.stringify(foo));
  expect(JSON.stringify(gameboard.board[5][2])).toEqual(JSON.stringify(foo));
  expect(JSON.stringify(gameboard.board[6][2])).toEqual(JSON.stringify(null));

  expect(gameboard.board[8][3]).toBe(null);
  expect(gameboard.board[8][2]).toBe(null);
  expect(gameboard.board[8][1]).toBe(null);
  expect(gameboard.board[8][0]).toBe(null);
  gameboard.placeShip([8,3],bar.type,'vertical');
  expect(JSON.stringify(gameboard.board[8][3])).toEqual(JSON.stringify(bar));
  expect(JSON.stringify(gameboard.board[8][2])).toEqual(JSON.stringify(bar));
  expect(JSON.stringify(gameboard.board[8][1])).toEqual(JSON.stringify(bar));
  expect(JSON.stringify(gameboard.board[8][0])).toEqual(JSON.stringify(null));
});

test('check if placing a ship pushes that ship into fleet array', () => {
  const foo = Ship('cruiser');
  const bar = Ship('carrier');
  const taz = Ship('carrier');
  expect(JSON.stringify(gameboard.fleet)).toBe(JSON.stringify([]));
  gameboard.placeShip([2,2],foo.type,'horizontal');
  expect(JSON.stringify(gameboard.fleet)).toBe(JSON.stringify([foo]));
  gameboard.placeShip([4,4],bar.type,'horizontal');
  gameboard.placeShip([7,7],taz.type,'vertical');
  expect(JSON.stringify(gameboard.fleet)).toBe(JSON.stringify([foo,bar]));
});

test('check if an attack hits a ship and increases hit count of that ship in the fleet', () => {
  const foo = Ship('battleship');
  const bar = Ship('destroyer');
  gameboard.placeShip([4,4],foo.type,'horizontal');
  gameboard.receiveAttack([4,4]);
  gameboard.receiveAttack([5,4]);
  gameboard.receiveAttack([7,4]);
  expect(gameboard.fleet[0].hits).toBe(3);
  gameboard.placeShip([3,3],bar.type,'vertical');
  gameboard.receiveAttack([3,3]);
  gameboard.receiveAttack([3,2]);
  expect(gameboard.fleet[1].hits).toBe(2);
});

test('if an attack hits a ship, its board value becomes "hit"; otherwise its board value becomes "nohit"', () => {
  const foo = Ship('carrier');
  gameboard.placeShip([5,5],foo.type,'vertical');
  expect(JSON.stringify(gameboard.board[5][5])).toEqual(JSON.stringify(foo));
  gameboard.receiveAttack([5,4]);
  expect(gameboard.board[5][4]).toBe('hit');
  gameboard.receiveAttack([4,4]);
  expect(gameboard.board[4][4]).toBe('nohit');
});

test('return true if a ship is sunk', () => {
  const foo = Ship('battleship');
  gameboard.placeShip([1,8],foo.type,'vertical');
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
  const foo = Ship('battleship');
  gameboard.placeShip([1,8],foo.type,'vertical');
  expect(gameboard.fleet[0].isSunk()).toBe(false);
  expect(gameboard.checkEndGame()).toBe(false);
  expect(JSON.stringify(gameboard.fleet)).toBe(JSON.stringify([foo]));
  gameboard.receiveAttack([1,8]);
  gameboard.receiveAttack([1,7]);
  gameboard.receiveAttack([1,6]);
  gameboard.receiveAttack([1,5]);
  expect(gameboard.fleet[0].hits).toBe(4);
  expect(gameboard.fleet[0].length).toBe(4);
  expect(gameboard.fleet[0].isSunk()).toBe(true);
  expect(gameboard.checkEndGame()).toBe(true);
});