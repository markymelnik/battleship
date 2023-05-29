import createElement from '../createElement';

const createMiddle = () => {
  const middle = createElement('div', 'middle');
  const boardContainer = createElement('div', 'board-containers');
  const playerContainer = createElement('div', 'player-container');
  const playerName = createElement('div', 'player-name', 'placeholder');
  const aiContainer = createElement('div', 'ai-container');
  const aiName = createElement('div', 'ai-name', 'Opponent AI');
  const gameText = createElement('div', 'game-text', 'Loading...');

  playerContainer.append(playerName, createGridTiles('player'));
  aiContainer.append(aiName, createGridTiles('ai'));
  boardContainer.append(playerContainer, aiContainer);
  middle.append(boardContainer, gameText);

  return middle;
};

const createGridTiles = (type) => {
  const grid = createElement('div', `${type}-grid`);
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const tile = createElement('div', `${type}-tile`);
      tile.dataset.row = row;
      tile.dataset.col = col;
      grid.appendChild(tile);
    }
  }
  return grid;
};

export { createMiddle, createGridTiles };
