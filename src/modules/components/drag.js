const { Ship } = require('./ship');
const { gameController } = require('./control');

const shipPlacer = (() => {

  const dragController = (playerSide,playerBoard) => {

    const dragContainer = document.querySelector('.drag-container');
	  const allShipsContainer = document.querySelector('.all-ships');
	  const allShips = document.querySelectorAll('.ship');
	  const allPlayerTiles = document.querySelectorAll('.player-tile');
    const gameText = document.querySelector('.game-text');

	  let draggedShip;

    const ships = [
      Ship('destroyer'),
      Ship('submarine'),
      Ship('cruiser'),
      Ship('battleship'),
      Ship('carrier')
    ];

    allShips.forEach(ship => {
      ship.addEventListener('dragstart', dragStart);
    })

    allPlayerTiles.forEach(tile => {
      tile.addEventListener('dragenter', dragEnter);
      tile.addEventListener('dragover', dragOver);
      tile.addEventListener('dragLeave', dragLeave);
      tile.addEventListener('drop', dropShip);
    })

    function dragStart(e) {
      draggedShip = e.target;
      
    }

    function dragEnter(e) {
      e.preventDefault();
      e.target.classList.add('drag-over');
    }

    function dragOver(e) {
      e.preventDefault();
      e.target.classList.add('drag-over');
    }

    function dragLeave(e) {
      e.preventDefault();
      e.target.classList.remove('drag-over');
    }

    function dropShip(e) {

      e.preventDefault();
      e.target.classList.remove('drag-over');

      const row = e.target.dataset.row;
      const col = e.target.dataset.col;

      const ship = ships[draggedShip.id];

      if (draggedShip.classList.contains('horizontal')) {
        playerSide.placeShip([row,col],ship,'vertical');
      } else if (draggedShip.classList.contains('vertical')) {
        playerSide.placeShip([row,col],ship,'horizontal');
      }

      gameController.displayShips(playerBoard,'player');

      if (playerSide.checkStartGame()) {
        dragContainer.style.visibility = 'hidden';
        gameText.textContent = 'Make your strike!';	
      }
    }
	}

  const rotateShips = () => {

    const rotateBtn = document.querySelector('.rotate-btn');
    const allShipsContainer = document.querySelector('.all-ships');
	  const allShips = document.querySelectorAll('.ship');
    
    rotateBtn.addEventListener('click', () => {
      allShips.forEach(ship => {
        if (ship.classList.contains('horizontal')) {
          allShipsContainer.style.flexDirection = 'row';
          rotateVertically(ship);
        } else if (ship.classList.contains('vertical')) {
          allShipsContainer.style.flexDirection = 'column';
          rotateHorizontally(ship);  
        }
      })
    });
  }
	
  const randomShips = (playerSide,playerBoard) => {

    const dragContainer = document.querySelector('.drag-container');
    const randomBtn = document.querySelector('.random-btn');
    const gameText = document.querySelector('.game-text');
    
    randomBtn.addEventListener('click', () => {
      playerSide.placeShipsRandomly();
      gameController.displayShips(playerBoard,'player');
      dragContainer.style.visibility = 'hidden';
      gameText.textContent = 'Make your strike!';
    });
  }
	

	const rotateVertically = (ship) => {

		ship.classList.remove('horizontal');
		ship.classList.add('vertical');

		let id = ship.id;
		switch(id) {
			case '0':
				ship.classList.remove('destroyer-h')
				ship.classList.add('destroyer-v');
				break;
			case '1':
				ship.classList.remove('submarine-h')
				ship.classList.add('submarine-v');
				break;
			case '2':
				ship.classList.remove('cruiser-h');
				ship.classList.add('cruiser-v');
				break;
			case '3': 
			  ship.classList.remove('battleship-h');
			  ship.classList.add('battleship-v');
				break;
			case '4': 
			  ship.classList.remove('carrier-h');
			  ship.classList.add('carrier-v');
				break;
		}
	}

	const rotateHorizontally = (ship) => {

		ship.classList.remove('vertical');
		ship.classList.add('horizontal');

		let id = ship.id;
		switch(id) {
			case '0':
				ship.classList.remove('destroyer-v')
				ship.classList.add('destroyer-h');
				break;
			case '1':
				ship.classList.remove('submarine-v')
				ship.classList.add('submarine-h');
				break;
			case '2':
				ship.classList.remove('cruiser-v')
				ship.classList.add('cruiser-h');
				break;
			case '3': 
			  ship.classList.remove('battleship-v');
			  ship.classList.add('battleship-h');
				break;
			case '4': 
			  ship.classList.remove('carrier-v');
			  ship.classList.add('carrier-h');
				break;
		}
	}

  return {
    dragController,
    rotateShips,
    randomShips
  }

})();

module.exports = { shipPlacer };