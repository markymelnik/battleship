const rotateDragShips = () => {
  const rotateBtn = document.querySelector('.rotate-drag-btn');
  const dragFleet = document.querySelector('.drag-fleet');
  const dragShips = document.querySelectorAll('.drag-ship');
  
  const shipTypes = [
    'destroyer',
    'submarine',
    'cruiser',
    'battleship',
    'carrier',
  ];

  rotateBtn.addEventListener('click', () => {
    dragShips.forEach((ship) => {
      if (ship.getAttribute('direction') === 'horizontal') {
        dragFleet.style.flexDirection = 'row';
        rotateShip(ship, 'vertical', 'h', 'v');
      } else if (ship.getAttribute('direction') === 'vertical') {
        dragFleet.style.flexDirection = 'column';
        rotateShip(ship, 'horizontal', 'v', 'h');
      }
    });
  });

  const rotateShip = (ship, direction, oldClass, newClass) => {
    ship.setAttribute('direction', direction);
    let shipType = shipTypes[ship.id];
    ship.classList.remove(`${shipType}-${oldClass}`);
    ship.classList.add(`${shipType}-${newClass}`);
  }
};

export default rotateDragShips;
