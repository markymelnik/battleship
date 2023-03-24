/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { displayController } = __webpack_require__(/*! ./modules/displayController */ \"./src/modules/displayController.js\");\n\ndisplayController();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/displayController.js":
/*!******************************************!*\
  !*** ./src/modules/displayController.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { Gameboard } = __webpack_require__(/*! ./gameboard */ \"./src/modules/gameboard.js\");\n\nconst playerGrid = document.querySelector('.player-grid');\nconst aiGrid = document.querySelector('.ai-grid');\n\n/* const nameForm = document.querySelector('.name-form');\nconst playerName = document.querySelector('.player-name');\nconst nameInput = document.querySelector('#nameInput'); */\n\nconst resetBtn = document.querySelector('.reset-btn');\n\n\nconst displayController = () => {\n\n  const populateWithTiles = (grid) => {\n    grid.style.gridTemplate = `repeat(10, 40px) / repeat(10, 40px)`;\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        let tile = document.createElement('div');\n        tile.classList.add('tile');\n        tile.setAttribute('row', i);\n        tile.setAttribute('col', j);\n        grid.appendChild(tile);\n      }\n    }\n  }\n\n  /* const submitForm = () => {\n  nameForm.addEventListener('submit', (event) => {\n    playerName.textContent = nameInput.value || 'Player 1';\n    nameForm.style.visibility = 'hidden';\n    nameForm.reset();\n    event.preventDefault();\n  })\n}; */\n\n  const resetGame = () => {\n    resetBtn.addEventListener('click', () => {\n      nameForm.style.visibility = 'visible';\n      playerName.textContent = 'placeholder';\n    })\n  };\n\n  const playerSide = Gameboard();\n  const playerBoard = playerSide.board;\n\n  const aiSide = Gameboard();\n  const aiBoard = aiSide.board;\n\n  playerSide.placeShip([1,1], 'destroyer', 'horizontal');\n  playerSide.placeShip([6,2], 'battleship', 'horizontal');\n  playerSide.placeShip([8,9], 'submarine', 'vertical');\n  playerSide.placeShip([4,6], 'carrier', 'vertical');\n  playerSide.placeShip([2,8], 'cruiser', 'horizontal');\n\n  aiSide.placeShip([4,4], 'destroyer', 'horizontal');\n  aiSide.placeShip([6,2], 'battleship', 'horizontal');\n  aiSide.placeShip([2,9], 'submarine', 'vertical');\n  aiSide.placeShip([1,6], 'carrier', 'vertical');\n  aiSide.placeShip([6,8], 'cruiser', 'vertical');\n\n\n  console.log('Battleship');\n  console.log(playerBoard);\n  console.log(aiBoard);\n  populateWithTiles(playerGrid);\n  populateWithTiles(aiGrid);\n  \n  // submitForm();\n  resetGame();\n\n};\n\n\n\n\n\n\n\nmodule.exports = { displayController };\n\n//# sourceURL=webpack://battleship/./src/modules/displayController.js?");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { Ship } = __webpack_require__(/*! ./ship */ \"./src/modules/ship.js\");\n\nconst Gameboard = () => {\n\n  const board = createGameBoard();\n  const fleet = newFleet();\n\n  function createGameBoard() {\n    let gameboard = [];\n    for (let row = 0; row < 10; row++) {\n      gameboard[row] = [];\n      for (let col = 0; col < 10; col++) {\n        gameboard[row][col] = null;\n      }\n    }\n    return gameboard;\n  }\n\n  function clearBoard() {\n    for (let row = 0; row < 10; row++) {\n      for (let col = 0; col < 10; col++) {\n        board[row][col] = null;\n      }\n    }\n  }\n\n  function newFleet() { return [] };\n\n  function clearFleet() {\n    while (fleet.length > 0) fleet.pop();\n  }\n\n  function inBounds([row,col]) {\n    return (row >= 0 && row <= 9 && col >= 0 && col <= 9)\n  }\n\n  function validPlacement([row,col], shipType, direction) {\n    if (inBounds([row,col])) {\n      let ship = Ship(shipType);\n      if (direction === 'horizontal') {\n        if (row + ship.length > 10) return undefined;\n        else return board[row][col];\n      } else if (direction === 'vertical') {\n        if (col - ship.length < 0) return undefined;\n        else return board[row][col];\n      } \n    }\n  }\n\n  function placeShip([row,col], shipType, direction) {\n    let currentShip = Ship(shipType);\n    if (!fleet.some((fleetShip) => fleetShip.id === currentShip.id)) {\n      fleet.push(currentShip);\n      let length = currentShip.length;\n      if (direction === 'horizontal') {\n        for (let i = row; i < length + row; i++) {\n          if (board[i][col] === null) {\n            board[i][col] = currentShip;\n          }\n          else throw Error('Another ship is in the way!');\n        }\n        return board[row][col];\n      }\n      else if (direction === 'vertical') {\n        for (let i = col; i > col - length; i--) {\n          if (board[row][i] === null) {\n            board[row][i] = currentShip;\n          }\n          else throw Error('Another ship is in the way!');\n        }\n        return board[row][col];\n      }\n    }\n  }\n\n  function receiveAttack([row,col]) {\n    let boardValue = board[row][col];\n    if (boardValue !== null) {\n      fleet.forEach((fleetShip) => {\n        if (boardValue.id === fleetShip.id) {\n          board[row][col] = 'hit';\n          fleetShip.hit();\n        }\n      })\n    }\n    else board[row][col] = 'nohit'; \n  }\n\n  function checkEndGame() {\n    return fleet.every((fleetShip) => fleetShip.isSunk());\n  }\n\n  return {\n    board,\n    fleet,\n    createGameBoard,\n    clearBoard,\n    clearFleet,\n    inBounds,\n    validPlacement,\n    placeShip,\n    receiveAttack,\n    checkEndGame\n  }\n  \n}\n\nmodule.exports = { Gameboard };\n\n//# sourceURL=webpack://battleship/./src/modules/gameboard.js?");

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { shipTypes } = __webpack_require__(/*! ./shipTypes */ \"./src/modules/shipTypes.js\");\n\nconst Ship = (shipType) => {\n  const type = shipType;\n  const length = shipTypes[shipType].length;\n  const id = shipTypes[shipType].id;\n  let hits = 0;\n  function hit() {\n    this.hits++;\n  }\n  function isSunk() {\n    return (this.hits === this.length);\n  }\n  return {\n    type, \n    length, \n    id, \n    hits, \n    hit, \n    isSunk\n  }\n}\n\nmodule.exports = { Ship };\n\n//# sourceURL=webpack://battleship/./src/modules/ship.js?");

/***/ }),

/***/ "./src/modules/shipTypes.js":
/*!**********************************!*\
  !*** ./src/modules/shipTypes.js ***!
  \**********************************/
/***/ ((module) => {

eval("const shipTypes = {\n  destroyer: {\n    id: 1,\n    name: 'destroyer',\n    length: 2\n  },\n  submarine: {\n    id: 2,\n    name: 'submarine',\n    length: 3\n  },\n  cruiser: {\n    id: 3,\n    name: 'cruiser',\n    length: 3\n  },\n  battleship: {\n    id: 4,\n    name: 'battleship',\n    length: 4\n  },\n  carrier: {\n    id: 5,\n    name: 'carrier',\n    length: 5\n  }\n}\n\nmodule.exports = { shipTypes };\n\n//# sourceURL=webpack://battleship/./src/modules/shipTypes.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;