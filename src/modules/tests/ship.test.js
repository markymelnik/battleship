const { Ship } = require('../components/ship');

let cruiser; 

beforeEach(() => {
  cruiser = Ship('cruiser');
});

test('accurate information about cruiser', () => {
  expect(cruiser.type).toBe('cruiser');
  expect(cruiser.length).toBe(3);
  expect(cruiser.hits).toBe(0);
});

test('cruiser is hit 2 times', () => {
  expect(cruiser.hits).toBe(0);
  cruiser.hit();
  expect(cruiser.hits).toBe(1);
  cruiser.hit();
  expect(cruiser.hits).toBe(2);
})

test('cruiser is sunk after 3 hits', () => {
  expect(cruiser.isSunk()).toBe(false);
  cruiser.hit();
  cruiser.hit();
  expect(cruiser.isSunk()).toBe(false);
  cruiser.hit(); 
  expect(cruiser.isSunk()).toBe(true);
});