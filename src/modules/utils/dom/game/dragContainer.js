import createElement from '../createElement';
import createDragFleet from './dragFleet';

const createDragContainer = () => {
  const dragContainer = createElement('div', 'drag-container');
  const dragContainerTitle = createElement('div', 'drag-container-title', 'Drag your ships onto the board!');
  const btnContainer = createElement('div', 'btn-container');
  const rotateBtn = createElement('button', 'rotate-drag-btn', 'Rotate');
  const randomBtn = createElement('button', 'random-drag-btn', 'Random');
  const resetBtn = createElement('button','reset-drag-btn', 'Reset');
  const startGameBtn = createElement('button', 'start-game-btn', 'Start');

  btnContainer.append(rotateBtn, randomBtn, resetBtn);
  
  dragContainer.append(
    dragContainerTitle,
    createDragFleet(),
    btnContainer,
    startGameBtn
  );

  return dragContainer;
};

export default createDragContainer;
