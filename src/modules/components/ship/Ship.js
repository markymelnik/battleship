import shipTypes from './shipTypes';

const Ship = (shipType) => {
  const type = shipType;
  const length = shipTypes[shipType].length;
  const id = shipTypes[shipType].id;
  const direction = shipTypes[shipType].direction;
  let hits = 0;

  function hit() {
    this.hits++;
  }

  function isSunk() {
    return this.hits === this.length;
  }
  
  return {
    type,
    length,
    id,
    direction,
    hits,
    hit,
    isSunk,
  };
};

export default Ship;
