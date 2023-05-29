import createStartScreen from './screen/startScreen';
import createHeader from './screen/header';
import { createMiddle } from './screen/middle';
import createFooter from './screen/footer';
import createDragContainer from './game/dragContainer';
import createEndGameContainer from './game/endGameContainer';
import createResetGameBtn from './game/resetGameBtn';

const loadDOM = () => {
  const container = document.querySelector('.container');
  container.append(
    createStartScreen(),
    createHeader(),
    createMiddle(),
    createDragContainer(),
    createEndGameContainer(),
    createFooter(),
    createResetGameBtn()
  );
  return container;
};

export default loadDOM;
