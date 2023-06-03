import loadDOM from "./modules/components/onLoad/loadDOM";
import loadStartScreen from "./modules/components/onLoad/loadStartScreen";
import initPlayers from "./modules/components/player/initPlayers";
import initShips from "./modules/components/ship/initShips";
import initDrag from "./modules/components/control/drag/dragController";
import onTileClick from "./modules/components/control/display/onTileClick";
import resetGame from "./modules/components/control/display/resetGame";

const gameFlowController = (() => {
  loadDOM();
  loadStartScreen();

  const { humanPlayer, humanPlayerSide, computerPlayer, computerPlayerSide } = initPlayers();
  const ships = initShips();

  initDrag(humanPlayerSide, ships);
  resetGame(humanPlayerSide, computerPlayerSide, computerPlayer, ships);
  onTileClick(humanPlayer, humanPlayerSide, computerPlayer, computerPlayerSide);

  const resetGameHandler = () => resetGame(humanPlayerSide, computerPlayerSide, computerPlayer, ships);
  document.querySelector(".reset-game-btn").addEventListener("click", resetGameHandler);
  document.querySelector(".new-game-btn").addEventListener("click", resetGameHandler);
})();
