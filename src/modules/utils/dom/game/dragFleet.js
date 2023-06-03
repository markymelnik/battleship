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
  const dragFleet = createElement('div', 'drag-fleet');
  const destroyer = createDragShip('div', 'drag-ship', 'destroyer-h', 'horizontal', 0);
  const submarine = createDragShip('div', 'drag-ship', 'submarine-h', 'horizontal', 1);
  const cruiser = createDragShip('div', 'drag-ship', 'cruiser-h', 'horizontal', 2);
  const battleship = createDragShip('div', 'drag-ship', 'battleship-h', 'horizontal', 3);
  const carrier = createDragShip('div', 'drag-ship', 'carrier-h', 'horizontal', 4);
  dragFleet.append(destroyer, submarine, cruiser, battleship, carrier);
  return dragFleet;
}

export default createDragFleet;
