const { Ship } = require('../ship');

const cruiser = Ship('cruiser');

test('cruiser has length 3 and should be sunk when hit 3 times', () => {
  cruiser.hit();
  cruiser.hit();
  cruiser.hit();  
  expect(cruiser.length).toBe(3);
  expect(cruiser.isSunk()).toBe(true);
});

