import displayController from './displayController';
import endGameController from './endGameController';

const onTileClick = (
  humanPlayer,
  humanPlayerSide,
  computerPlayer,
  computerPlayerSide
) => {
  const humanPlayerTiles = document.querySelectorAll('.human-player-tile');
  const computerPlayerTiles = document.querySelectorAll(
    '.computer-player-tile'
  );
  const gameStatusText = document.querySelector('.game-status-text');

  computerPlayerTiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      handleTileClick(tile);
    });
  });

  const handleTileClick = (tile) => {
    let row = tile.dataset.row;
    let col = tile.dataset.col;

    tile.style.pointerEvents = 'none';

    humanPlayer.targetedAttack([row, col], computerPlayer, computerPlayerSide);
    displayController.updateTileOnClick(tile);

    if (humanPlayerSide.checkEndGame()) {
      endGameController('ai');
      return;
    }

    computerPlayer.randomAttack(humanPlayer, humanPlayerSide);
    gameStatusText.textContent = 'AI Strikes!';

    if (computerPlayerSide.checkEndGame()) {
      endGameController('player');
      return;
    }

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
            computerPlayerTiles.forEach((tile) => {
              if (!tile.getAttribute('hit')) {
                tile.style.pointerEvents = 'auto';
              }
            });
          }
        }, 800);
      }
    });
  };
};

export default onTileClick;
