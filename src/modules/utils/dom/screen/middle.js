import createElement from '../createElement';

const createMiddle = () => {
  const middle = createElement('div', 'middle');
  const boardContainer = createElement('div', 'gameboards-container');
  const humanPlayerContainer = createElement('div', 'human-board-container');
  const playerName = createElement('div', 'human-player-name', 'placeholder');
  const computerPlayerContainer = createElement('div', 'computer-board-container');
  const computerName = createElement('div', 'computer-player-name', 'Computer');
  const gameStatusText = createElement('div', 'game-status-text', 'Loading...');

  humanPlayerContainer.append(playerName, createGridTiles('human'));
  computerPlayerContainer.append(computerName, createGridTiles('computer'));
  boardContainer.append(humanPlayerContainer, computerPlayerContainer);
  middle.append(boardContainer, gameStatusText);

  return middle;
};

const createGridTiles = (type) => {
  const grid = createElement('div', `${type}-player-grid`);
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const tile = createElement('div', `${type}-player-tile`);
      tile.dataset.row = row;
      tile.dataset.col = col;
      grid.appendChild(tile);
    }
  }
  return grid;
};

export { createMiddle, createGridTiles };
