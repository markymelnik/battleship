const endGameController = (winner) => {
  const computerPlayerTiles = document.querySelectorAll('.computer-player-tile');
  const endGameContainer = document.querySelector('.end-game-container');
  const endGameText = document.querySelector('.end-game-text');
  const gameStatusText = document.querySelector('.game-status-text');
  const humanPlayerName = document.querySelector('.human-player-name');
  const computerPlayerName = document.querySelector('.computer-player-name');
  const middle = document.querySelector('.middle');

  const disableComputerPlayerTiles = () => {
    computerPlayerTiles.forEach((tile) => {
      tile.style.pointerEvents = 'none';
    });
  }

  const displayEndGameResults = () => {
    if (winner === 'human') {
      endGameText.textContent = 'You win!';
      gameStatusText.textContent = `${humanPlayerName.textContent} wins!`;
    } else {
      endGameText.textContent = 'You lose!';
      gameStatusText.textContent = `${computerPlayerName.textContent} wins!`;
    }

    endGameContainer.style.visibility = 'visible';
    middle.style.opacity = '0.5';
  };

  disableComputerPlayerTiles();
  setTimeout(displayEndGameResults, 800);
};

export default endGameController;
