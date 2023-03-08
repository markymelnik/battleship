const { Ship } = require('./ship')

const newShip = Ship('carrier');

const displayOutput = () => {
  console.log(newShip);
  console.log(newShip.length);
}

module.exports = { displayOutput };