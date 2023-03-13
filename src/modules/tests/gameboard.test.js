const { Gameboard } = require('../gameboard');

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