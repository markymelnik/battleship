const endGameController = (winner) => {
  const computerPlayerTiles = document.querySelectorAll('.computer-player-tile');
  const endGameContainer = document.querySelector('.end-game-container');
  const endGameText = document.querySelector('.end-game-text');
  const gameStatusText = document.querySelector('.game-status-text');
  const humanPlayerName = document.querySelector('.human-player-name');
  const computerPlayerName = document.querySelector('.computer-player-name');
  const middle = document.querySelector('.middle');

  setTimeout(() => {
    endGameContainer.style.visibility = 'visible';
    middle.style.opacity = '0.5';
    if (winner === 'player') {
      endGameText.textContent = 'You win!';
      gameStatusText.textContent = `${humanPlayerName.textContent} wins!`;
    } else {
      endGameText.textContent = 'You lose!';
      gameStatusText.textContent = `${computerPlayerName.textContent} wins!`;
    }
  }, 800);

  computerPlayerTiles.forEach((tile) => {
    tile.style.pointerEvents = 'none';
  });
};

export default endGameController;
