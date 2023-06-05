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
    const title = startScreen.querySelector('.start-screen-title');
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

  const gameboardContainers = middle.querySelector('.gameboards-container');
  expect(gameboardContainers).not.toBeNull(); 

  const humanPlayerContainer = gameboardContainers.querySelector('.human-board-container');
  expect(humanPlayerContainer).not.toBeNull();

  const computerPlayerContainer = gameboardContainers.querySelector('.computer-board-container');
  expect(computerPlayerContainer).not.toBeNull();

  const humanPlayerName = humanPlayerContainer.querySelector('.human-player-name');
  expect(humanPlayerName.textContent).toBe('placeholder');

  const computerPlayerName = computerPlayerContainer.querySelector('.computer-player-name');
  expect(computerPlayerName.textContent).toBe('Computer');

  const gameStatusText = middle.querySelector('.game-status-text');
  expect(gameStatusText.textContent).toBe('Loading...');
});

test('grid should be populated with tiles with correct row and col dataset properties', () => {
  const type = 'human';
  const grid = createGridTiles(type);

  expect(grid.tagName).toBe('DIV');
  expect(grid.classList.contains(`${type}-player-grid`)).toBe(true);

  const tiles = grid.querySelectorAll(`.${type}-player-tile`);
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
    expect(dragFleet.classList.contains('drag-fleet')).toBeTruthy();
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
      const dragShip = dragFleet.children[i];

      expect(dragShip.nodeName).toBe('DIV');
      expect(dragShip.classList.contains('drag-ship')).toBeTruthy();
      expect(dragShip.classList.contains(shipTypes[i])).toBeTruthy();
      expect(dragShip.id).toBe(String(i));
      expect(dragShip.getAttribute('draggable')).toBe('true');
      expect(dragShip.getAttribute('direction')).toBe('horizontal');
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
    const dragFleet = dragContainer.querySelector('.drag-fleet');
    const btnContainer = dragContainer.querySelector('.btn-container');
    const rotateBtn = btnContainer.querySelector('.rotate-drag-btn');
    const randomBtn = btnContainer.querySelector('.random-drag-btn');
    const resetDragBtn = btnContainer.querySelector('.reset-drag-btn');
    const startGameBtn = dragContainer.querySelector('.start-game-btn');

    expect(title.textContent).toBe('Drag your ships onto the board!');
    expect(dragFleet).not.toBeNull();
    expect(rotateBtn.textContent).toBe('Rotate');
    expect(randomBtn.textContent).toBe('Random');
    expect(resetDragBtn.textContent).toBe('Reset');
    expect(startGameBtn.textContent).toBe('Start');
  });
});

test('should create end game container with correct structure', () => {
  const endGameContainer = createEndGameContainer();
  expect(endGameContainer.nodeName).toBe('DIV');
  expect(endGameContainer.classList.contains('end-game-container')).toBeTruthy();
  expect(endGameContainer.children.length).toBe(2);

  const winText = endGameContainer.querySelector('.end-game-text');
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
