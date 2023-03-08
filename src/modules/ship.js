const { shipTypes } = require('./shipTypes');

const Ship = (shipType) => {
  const type = shipType;
  const length = shipTypes[shipType].length;
  let hits = 0;
  function hit() {
    this.hits++;
  }
  function isSunk() {
    if (this.hits >= this.length) return true;
    else return false;
  }
  return {
    type, length, hits, hit, isSunk
  }
}

module.exports = { Ship };