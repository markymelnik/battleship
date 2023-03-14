const { Gameboard } = require('../gameboard');
const { Ship } = require('../Ship');

let gameboard;

beforeEach(() => {
  gameboard = Gameboard();
});

test('check for an empty gameboard with coordinate within bounds', () => {
  expect(gameboard.inBounds([0,0])).toBe(null);
  expect(gameboard.inBounds([9,10])).toBe(undefined);
  expect(gameboard.inBounds([-1,-2])).toBe(undefined);
  expect(gameboard.inBounds([1,2])).toBe(null);
});

test('check for valid horizontal placement', () => {
  expect(gameboard.validPlacement([5,5],'carrier','horizontal')).toBe(null);
  expect(gameboard.validPlacement([6,5],'carrier','horizontal')).toBe(undefined);
  expect(gameboard.validPlacement([5,5],'carrier','vertical')).toBe(null);
  expect(gameboard.validPlacement([5,4],'carrier','vertical')).toBe(undefined);
  expect(gameboard.validPlacement([9,3],'destroyer','horizontal')).toBe(undefined);
  expect(gameboard.validPlacement([2,3],'battleship','vertical')).toBe(undefined);
  expect(gameboard.validPlacement([7,2],'submarine','horizontal')).toBe(null);
  expect(gameboard.validPlacement([2,7],'submarine','vertical')).toBe(null);
});

test('gameboard squares update to true when a ship is placed', () => {
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