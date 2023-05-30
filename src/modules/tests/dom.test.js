import createElement from '../utils/dom/createElement';
import createStartScreen from '../utils/dom/screen/startScreen';
import createHeader from '../utils/dom/screen/header';
import { createMiddle, createGridTiles } from '../utils/dom/screen/middle';
import createFooter from '../utils/dom/screen/footer';
import createDragFleet from '../utils/dom/game/dragFleet';
import createDragContainer from '../utils/dom/game/dragContainer';
import createEndGameContainer from '../utils/dom/game/endGameContainer';
import createNewGameBtn from '../utils/dom/game/newGameBtn';
import createResetGameBtn from '../utils/dom/game/resetGameBtn';

test('should create an element with the provided tag, className, and text', () => {
  const element = createElement('div','testClass','testText');
  expect(element.tagName).toBe('DIV');
  expect(element.classList.contains('testClass')).toBeTruthy();
  expect(element.textContent).toBe('testText');
});

describe('create start screen', () => {
  let startScreen;

  beforeEach(() => {
    startScreen = createStartScreen();
  });

  test('should create start screen with correct structure', () => {
    expect(startScreen.tagName).toBe('DIV');
    expect(startScreen.classList.contains('start-screen')).toBeTruthy();
    expect(startScreen.children.length).toBe(2);
  });
  test('start screen has correct title', () => {
    const title = startScreen.querySelector('.start-title');
    expect(title.textContent).toBe('Battleship');
  });
  test('should create correct name input form structure', () => {
    const nameInputForm = startScreen.querySelector('.name-form');
    expect(nameInputForm.nodeName).toBe('FORM');
    expect(nameInputForm.children.length).toBe(3);
    expect(nameInputForm.querySelector('label').textContent).toBe('Enter your name:');
    expect(nameInputForm.querySelector('input').nodeName).toBe('INPUT');
    expect(nameInputForm.querySelector('button').textContent).toBe('Start');
  });
});

test('should create a header section with correct structure', () => {
  const header = createHeader();
  expect(header.tagName).toBe('DIV');
  expect(header.classList.contains('header')).toBeTruthy();
  expect(header.childNodes.length).toBe(1);
  expect(header.firstChild.tagName).toBe('DIV');
  expect(header.firstChild.classList.contains('header-text'));
  expect(header.firstChild.textContent).toBe('Battleship');
});

test('should create a middle section with correct structure', () => {
  const middle = createMiddle();
  expect(middle.tagName).toBe('DIV');
  expect(middle.classList.contains('middle')).toBe(true);

  const boardContainer = middle.querySelector('.board-containers');
  expect(boardContainer).not.toBeNull(); 

  const playerContainer = boardContainer.querySelector('.player-container');
  expect(playerContainer).not.toBeNull();

  const aiContainer = boardContainer.querySelector('.ai-container');
  expect(aiContainer).not.toBeNull();

  const playerName = playerContainer.querySelector('.player-name');
  expect(playerName.textContent).toBe('placeholder');

  const aiName = aiContainer.querySelector('.ai-name');
  expect(aiName.textContent).toBe('Opponent AI');

  const gameText = middle.querySelector('.game-status-text');
  expect(gameText.textContent).toBe('Loading...');
});

test('grid should be populated with tiles with correct row and col dataset properties', () => {
  const type = 'player';
  const grid = createGridTiles(type);

  expect(grid.tagName).toBe('DIV');
  expect(grid.classList.contains(`${type}-grid`)).toBe(true);

  const tiles = grid.querySelectorAll(`.${type}-tile`);
  expect(tiles.length).toBe(100);

  tiles.forEach((tile, index) => {
    expect(tile.dataset.row).toBe(Math.floor(index / 10).toString());
    expect(tile.dataset.col).toBe((index % 10).toString());
  });
});

test('should create a footer section with correct structure', () => {
  const footer = createFooter();
  expect(footer.tagName).toBe('DIV');
  expect(footer.classList.contains('footer')).toBeTruthy();
  expect(footer.childNodes.length).toBe(1);
  expect(footer.firstChild.tagName).toBe('DIV');
  expect(footer.firstChild.classList.contains('footer-text')).toBeTruthy();
  expect(footer.firstChild.textContent).toBe('Mark Melnik, 2023');
});

describe('create drag fleet', () => {
  let dragFleet;

  beforeEach(() => {
    dragFleet = createDragFleet();
  });
  test('should create a container with correct structure', () => {
    expect(dragFleet.nodeName).toBe('DIV');
    expect(dragFleet.classList.contains('all-ships')).toBeTruthy();
    expect(dragFleet.children.length).toBe(5);
  });

  test('should create a container with ships having correct classes, id, and attributes', () => {
    const shipTypes = [
      'destroyer-h',
      'submarine-h',
      'cruiser-h',
      'battleship-h',
      'carrier-h',
    ];
    for (let i = 0; i < shipTypes.length; i++) {
      const ship = dragFleet.children[i];

      expect(ship.nodeName).toBe('DIV');
      expect(ship.classList.contains('ship')).toBeTruthy();
      expect(ship.classList.contains(shipTypes[i])).toBeTruthy();
      expect(ship.classList.contains('horizontal')).toBeTruthy();
      expect(ship.id).toBe(String(i));
      expect(ship.getAttribute('draggable')).toBe('true');
    }
  });
});

describe('create drag container', () => {

  let dragContainer;

  beforeEach(() => {
    dragContainer = createDragContainer();
  })

  test('it should create a container with correct structure and classes', () => {
    expect(dragContainer.tagName).toBe('DIV');
    expect(dragContainer.classList.contains('drag-container')).toBeTruthy();
    expect(dragContainer.children.length).toBe(4);
  });

  test('it should create a container with correct title, drag fleet, buttons, and their respective texts', () => {
    const title = dragContainer.querySelector('div');
    const dragFleet = dragContainer.querySelector('.all-ships');
    const btnContainer = dragContainer.querySelector('.btn-container');
    const rotateBtn = btnContainer.querySelector('.rotate-btn');
    const randomBtn = btnContainer.querySelector('.random-btn');
    const startGameBtn = dragContainer.querySelector('.start-game-btn');

    expect(title.textContent).toBe('Drag your ships onto the board!');
    expect(dragFleet).not.toBeNull();
    expect(rotateBtn.textContent).toBe('Rotate');
    expect(randomBtn.textContent).toBe('Random');
    expect(startGameBtn.textContent).toBe('Start');
  });
});

test('should create end game container with correct structure', () => {
  const endGameContainer = createEndGameContainer();
  expect(endGameContainer.nodeName).toBe('DIV');
  expect(endGameContainer.classList.contains('win-box')).toBeTruthy();
  expect(endGameContainer.children.length).toBe(2);

  const winText = endGameContainer.querySelector('.win-text');
  expect(winText).not.toBe(null);

  const newGameBtn = endGameContainer.querySelector('.new-game-btn');
  expect(newGameBtn).not.toBe(null);
});

test('should create a new game button with correct structure', () => {
  const button = createNewGameBtn();
  expect(button.tagName).toBe('BUTTON');
  expect(button.classList.contains('new-game-btn')).toBeTruthy();
  expect(button.getAttribute('type')).toBe('button');
  expect(button.textContent).toBe('New Game');
});

test('should create a reset game button with correct structure', () => {
  const button = createResetGameBtn();
  expect(button.tagName).toBe('BUTTON');
  expect(button.classList.contains('reset-game-btn')).toBeTruthy();
  expect(button.getAttribute('type')).toBe('button');
  expect(button.textContent).toBe('Reset Game');
});
