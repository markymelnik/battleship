import Ship from './Ship';

const initShips = () => {
  return [
    Ship('destroyer'),
    Ship('submarine'),
    Ship('cruiser'),
    Ship('battleship'),
    Ship('carrier'),
  ];
};

export default initShips;