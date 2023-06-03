import displayController from './displayController';
import endGameController from './endGameController';

const onTileClick = (humanPlayer, humanPlayerSide, computerPlayer, computerPlayerSide) => {
  const humanPlayerTiles = document.querySelectorAll('.human-player-tile');
  const computerPlayerTiles = document.querySelectorAll('.computer-player-tile');
  const gameStatusText = document.querySelector('.game-status-text');

  const humanPlayerStrikes = () => {
    let strike = computerPlayer.hitArray[computerPlayer.hitArray.length - 1];

    humanPlayerTiles.forEach((tile) => {
      let row = +tile.dataset.row;
      let col = +tile.dataset.col;

      if (strike[0] === row && strike[1] === col) {
        setTimeout(() => {
          displayController.updateTileOnClick(tile);
          if (
            !humanPlayerSide.checkEndGame() &&
            !computerPlayerSide.checkEndGame()
          ) {
            gameStatusText.textContent = 'Your strike!';
            toggleTilePointerEvents('auto');
          }
        }, 800);
      }
    });
  };
  
  const handleTileClick = (tile) => {
    let row = tile.dataset.row;
    let col = tile.dataset.col;

    toggleTilePointerEvents('none');

    humanPlayer.targetedAttack([row, col], computerPlayer, computerPlayerSide);
    displayController.updateTileOnClick(tile);

    if (humanPlayerSide.checkEndGame()) {
      endGameController('computer');
      return;
    }

    computerPlayer.randomAttack(humanPlayer, humanPlayerSide);
    gameStatusText.textContent = 'Computer strikes!';

    if (computerPlayerSide.checkEndGame()) {
      endGameController('human');
      return;
    }

    humanPlayerStrikes();
  };

  const toggleTilePointerEvents = (value) => {
    computerPlayerTiles.forEach((tile) => {
      if (!tile.getAttribute('hit')) {
        tile.style.pointerEvents = value;
      }
    });
  };

  computerPlayerTiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      handleTileClick(tile);
    });
  });
};

export default onTileClick;
