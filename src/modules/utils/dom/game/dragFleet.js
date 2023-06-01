import createElement from '../createElement';

const createDragShip = (tag, className1, className2, direction, id) => {
  const ship = document.createElement(tag);
  ship.classList.add(className1, className2);
  ship.id = id;
  ship.setAttribute('draggable', 'true');
  ship.setAttribute('direction', direction);
  return ship;
}

const createDragFleet = () => {
  const dragShips = createElement('div', 'all-ships');
  const destroyer = createDragShip('div', 'ship', 'destroyer-h', 'horizontal', 0);
  const submarine = createDragShip('div', 'ship', 'submarine-h', 'horizontal', 1);
  const cruiser = createDragShip('div', 'ship', 'cruiser-h', 'horizontal', 2);
  const battleship = createDragShip('div', 'ship', 'battleship-h', 'horizontal', 3);
  const carrier = createDragShip('div', 'ship', 'carrier-h', 'horizontal', 4);
  dragShips.append(destroyer, submarine, cruiser, battleship, carrier);
  return dragShips;
}

export default createDragFleet;
