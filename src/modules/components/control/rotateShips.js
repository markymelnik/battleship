const rotateShips = () => {
  const rotateBtn = document.querySelector('.rotate-btn');
  const shipsContainer = document.querySelector('.ships-container');
  const allShips = document.querySelectorAll('.ship');
  const shipTypes = [
    'destroyer',
    'submarine',
    'cruiser',
    'battleship',
    'carrier',
  ];

  rotateBtn.addEventListener('click', () => {
    allShips.forEach((ship) => {
      if (ship.getAttribute('direction') === 'horizontal') {
        shipsContainer.style.flexDirection = 'row';
        rotateShip(ship, 'vertical', 'h', 'v');
      } else if (ship.getAttribute('direction') === 'vertical') {
        shipsContainer.style.flexDirection = 'column';
        rotateShip(ship, 'horizontal', 'v', 'h');
      }
    });
  });

  function rotateShip(ship, direction, oldClass, newClass) {
    ship.setAttribute('direction', direction);
    let shipType = shipTypes[ship.id];
    ship.classList.remove(`${shipType}-${oldClass}`);
    ship.classList.add(`${shipType}-${newClass}`);
  }
};

export default rotateShips;
