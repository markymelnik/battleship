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
  expect(gameboard.validHorizontalPlacement([0,0],'carrier')).toBe(null);
  expect(gameboard.validHorizontalPlacement([5,0],'carrier')).toBe(null);
  expect(gameboard.validHorizontalPlacement([6,0],'carrier')).toBe(undefined);
  expect(gameboard.validHorizontalPlacement([9,2], 'destroyer')).toBe(undefined);
  expect(gameboard.validHorizontalPlacement([7,4], 'battleship')).toBe(undefined);
  expect(gameboard.validHorizontalPlacement([7,4], 'submarine')).toBe(null);
});