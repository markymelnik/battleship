import createStartScreen from '../../utils/dom/screen/startScreen';
import createHeader from '../../utils/dom/screen/header';
import { createMiddle } from '../../utils/dom/screen/middle';
import createFooter from '../../utils/dom/screen/footer';
import createDragContainer from '../../utils/dom/game/dragContainer';
import createEndGameContainer from '../../utils/dom/game/endGameContainer';
import createResetGameBtn from '../../utils/dom/game/resetGameBtn';

const loadDOM = () => {
  const container = document.querySelector('.container');

  const elements = [
    createStartScreen(),
    createHeader(),
    createMiddle(),
    createDragContainer(),
    createEndGameContainer(),
    createFooter(),
    createResetGameBtn(),
  ];

  container.append(...elements);

  return container;
};

export default loadDOM;
