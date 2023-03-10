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