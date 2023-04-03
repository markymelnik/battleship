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

eval("const { Gameboard } = __webpack_require__(/*! ./modules/gameboard */ \"./src/modules/gameboard.js\");\r\nconst { Player } = __webpack_require__(/*! ./modules/player */ \"./src/modules/player.js\");\r\nconst { AI } = __webpack_require__(/*! ./modules/ai */ \"./src/modules/ai.js\");\r\nconst { domController } = __webpack_require__(/*! ./modules/dom */ \"./src/modules/dom.js\")\r\n\r\ndomController.loadWebsite();\r\n\r\nconst playerSide = Gameboard();\r\nconst playerBoard = playerSide.board;\r\nconst playerGrid = document.querySelector('.player-grid');\r\nconst playerMark = new Player('Mark');\r\nconst playerTiles = document.querySelectorAll('.player-tile');\r\n\r\nconst aiSide = Gameboard();\r\nconst aiBoard = aiSide.board;\r\nconst aiGrid = document.querySelector('.ai-grid');\r\nconst playerAI = new AI('AI',playerMark,playerSide);\r\nconst aiTiles = document.querySelectorAll('.ai-tile');\r\n\r\nconst resetBtn = document.querySelector('.reset-btn');\r\n\r\nconst placeAllPlayerShips = () => {\r\n\tplayerSide.placeShip([1,1], 'destroyer', 'horizontal');\r\n\tplayerSide.placeShip([8,9], 'submarine', 'vertical');\r\n\tplayerSide.placeShip([2,8], 'cruiser', 'horizontal');\r\n\tplayerSide.placeShip([6,2], 'battleship', 'horizontal');\r\n\tplayerSide.placeShip([4,6], 'carrier', 'vertical');\r\n}\r\n\r\nconst resetBoards = () => {\r\n\t\r\n\tconst winBox = document.querySelector('.win-box');\r\n\twinBox.style.visibility = 'hidden';\r\n\r\n\tresetPlayerBoard();\r\n\tresetAiBoard();\r\n\r\n}\r\n\r\nconst resetPlayerBoard = () => {\r\n\tplayerSide.clearBoard();\r\n\tplayerSide.clearFleet();\r\n\tdomController.resetTiles('player');\r\n\tplaceAllPlayerShips();\r\n\tdomController.displayShips(playerBoard,'player');\r\n}\r\n\r\nconst resetAiBoard = () => {\r\n\taiSide.clearBoard();\r\n\taiSide.clearFleet();\r\n\tdomController.resetTiles('ai');\r\n\taiSide.placeShipsRandomly();\r\n\tdomController.displayShips(aiBoard,'ai');\r\n}\r\n\r\n// domController.formController();\r\n\r\nplaceAllPlayerShips();\r\naiSide.placeShipsRandomly();\r\n\r\ndomController.displayShips(playerBoard,'player');\r\ndomController.displayShips(aiBoard,'ai');\r\n\r\nconst updateBoard = () => {\r\n\r\n\taiTiles.forEach(tile => {\r\n\t\tlet row = tile.dataset.row;\r\n\t\tlet col = tile.dataset.col;\r\n\r\n\t\ttile.addEventListener('click', () => {\r\n\r\n\t\t\tplayerMark.targetedAttack([row,col], playerAI, aiSide);\r\n\t\t\tdomController.updateTile(tile);\r\n\t\t\tplayerAI.randomAttack(playerMark, playerSide);\r\n\r\n\t\t\tlet strike = playerAI.hitArray[playerAI.hitArray.length - 1];\r\n\r\n\t\t\tplayerTiles.forEach(tile => {\r\n\t\t\t\tlet row = +tile.dataset.row;\r\n\t\t\t\tlet col = +tile.dataset.col;\r\n\t\t\t\tif (strike[0] === row && strike[1] === col) {\r\n\t\t\t\t\tsetTimeout(() => { domController.updateTile(tile) }, 500);\r\n\t\t\t\t}\r\n\t\t\t})\r\n\r\n\t\t\tif (playerSide.checkEndGame()) {\r\n\t\t\t\tdomController.endGameController('ai');\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\tif (aiSide.checkEndGame()) {\r\n\t\t\t\tdomController.endGameController('player');\r\n\t\t\t}\r\n\r\n\t\t})\r\n\t})\r\n\t\r\n};\r\n\r\nresetBtn.addEventListener('click', resetBoards);\r\n\r\nupdateBoard();\r\n\r\nconsole.log('Battleship');\r\nconsole.log(playerBoard);\r\nconsole.log(aiBoard);\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/ai.js":
/*!***************************!*\
  !*** ./src/modules/ai.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { Player } = __webpack_require__(/*! ./player */ \"./src/modules/player.js\");\r\n\r\nclass AI extends Player {\r\n  constructor(name, enemyPlayer, enemySide) {\r\n    super(name);\r\n    this.turn = false;\r\n    this.enemyPlayer = enemyPlayer;\r\n    this.enemySide = enemySide;\r\n    this.hitArray = [];\r\n  }\r\n\r\n  randomAttack(enemyPlayer, enemySide) {\r\n    if(this.checkTurn()) {\r\n      let strike = [];\r\n      while(true) {\r\n        let firstNum = Math.floor(Math.random() * 10);\r\n        let secondNum = Math.floor(Math.random() * 10);\r\n        strike[0] = firstNum;\r\n        strike[1] = secondNum;\r\n        if(!this.hitArray.some(coords => coords[0] == strike[0] && coords[1] == strike[1])) {\r\n          this.hitArray.push(strike);\r\n          this.targetedAttack(strike, enemyPlayer, enemySide);\r\n          break;\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nmodule.exports = { AI };\n\n//# sourceURL=webpack://battleship/./src/modules/ai.js?");

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((module) => {

eval("\r\nconst domController = (() => {\r\n\r\n  const createHeader = () => {\r\n    const header = document.createElement('div');\r\n    header.classList.add('header');\r\n    const headerText = document.createElement('div');\r\n    headerText.classList.add('header-text');\r\n    headerText.textContent = 'Battleship';\r\n    header.append(headerText);\r\n    return header;\r\n  }\r\n\r\n  const createMiddle = () => {\r\n    const middle = document.createElement('div');\r\n    middle.classList.add('middle');\r\n    const playerContainer = document.createElement('div');\r\n    playerContainer.classList.add('player-container');\r\n    const playerName = document.createElement('div');\r\n    playerName.classList.add('player-name');\r\n    playerName.textContent = 'placeholder';\r\n    playerContainer.append(playerName,populateGrid('player'));\r\n    const aiContainer = document.createElement('div');\r\n    aiContainer.classList.add('ai-container');\r\n    const aiName = document.createElement('div');\r\n    aiName.classList.add('ai-name');\r\n    aiName.textContent = 'OpponentAI';\r\n    aiContainer.append(aiName,populateGrid('ai'));\r\n    middle.append(playerContainer,aiContainer)\r\n    return middle;\r\n  }\r\n\r\n  const createFooter = () => {\r\n    const footer = document.createElement('div');\r\n    footer.classList.add('footer');\r\n    const footerText = document.createElement('div');\r\n    footerText.classList.add('footer-text');\r\n    footerText.textContent = 'Mark Melnik, 2023'\r\n    footer.append(footerText);\r\n    return footer;\r\n  }\r\n\r\n  const createNameForm = () => {\r\n    const nameForm = document.createElement('form');\r\n    nameForm.classList.add('name-form');\r\n    nameForm.setAttribute('name','nameform');\r\n    nameForm.setAttribute('autocomplete','off');\r\n    const prompt = document.createElement('h1');\r\n    prompt.textContent = 'Enter your name:';\r\n    const formContent = document.createElement('div');\r\n    formContent.classList.add('form-content');\r\n    const label = document.createElement('label');\r\n    label.setAttribute('for','name');\r\n    const input = document.createElement('input');\r\n    input.setAttribute('type','text');\r\n    input.setAttribute('id','name-input');\r\n    input.setAttribute('name','name');\r\n    input.setAttribute('required','');\r\n    const button = document.createElement('button');\r\n    button.classList.add('submit-btn');\r\n    button.setAttribute('type','button');\r\n    button.textContent = 'Submit';\r\n    formContent.append(label, input, button);\r\n    nameForm.append(prompt,formContent);\r\n    return nameForm; \r\n  }\r\n\r\n  const createResetBtn = () => {\r\n    const button = document.createElement('button');\r\n    button.classList.add('reset-btn');\r\n    button.setAttribute('type','button');\r\n    button.textContent = 'Reset';\r\n    return button;\r\n  }\r\n\r\n  const createWinBox = () => {\r\n    const winBox = document.createElement('div');\r\n    winBox.classList.add('win-box');\r\n    const winText = document.createElement('div');\r\n    winText.classList.add('win-text');\r\n    winBox.append(winText);\r\n    return winBox;\r\n  }\r\n\r\n  const populateGrid = (type) => {\r\n    const grid = document.createElement('div');\r\n    grid.classList.add(type + '-grid');\r\n    for (let row = 0; row < 10; row++) {\r\n      for (let col = 0; col < 10; col++) {\r\n        const tile = document.createElement('div');\r\n        tile.classList.add(type + '-tile');\r\n        tile.dataset.row = row;\r\n        tile.dataset.col = col;\r\n        grid.appendChild(tile);\r\n      }\r\n    }\r\n    return grid;\r\n  }\r\n\r\n  const displayShips = (board, type) => {\r\n    const tiles = document.querySelectorAll('.'+type+'-tile');\r\n    for (let row = 0; row < 10; row ++) {\r\n      for (let col = 0; col < 10; col++) {\r\n        tiles.forEach(tile => {\r\n          if (board[row][col] !== null) {\r\n            if (tile.dataset.row == row && tile.dataset.col == col) {\r\n              tile.textContent = 'O';\r\n              tile.setAttribute('ship','true');\r\n            }  \r\n          }\r\n        })\r\n      }\r\n    }\r\n  }\r\n\r\n  const resetDisplay = () => {\r\n    const resetBtn = document.querySelector('.reset-btn');\r\n    // const nameForm = document.querySelector('.name-form');\r\n    // const playerName = document.querySelector('.player-name');\r\n    resetBtn.addEventListener('click', () => {\r\n      // nameForm.style.visibility = 'visible';\r\n      // playerName.textContent = 'placeholder';\r\n      console.log('Game Reset');\r\n    })\r\n  };\r\n\r\n  const formController = () => {\r\n    const nameForm = document.querySelector('.name-form');\r\n    const nameInput = document.querySelector('#name-input');\r\n    const playerName = document.querySelector('.player-name');\r\n    const submitBtn = document.querySelector('.submit-btn');\r\n    nameForm.addEventListener('submit', (event) => {\r\n      playerName.textContent = nameInput.value || 'Player 1';\r\n      nameForm.style.visibility = 'hidden';\r\n      nameForm.reset();\r\n      event.preventDefault();\r\n    })\r\n    submitBtn.addEventListener('click', (event) => {\r\n      playerName.textContent = nameInput.value || 'Player 1';\r\n      nameForm.style.visibility = 'hidden';\r\n      nameForm.reset();\r\n      event.preventDefault();\r\n    })\r\n  }\r\n\r\n  const updateTile = (tile) => {\r\n    tile.style.pointerEvents = 'none';\r\n    tile.textContent = 'X';\r\n    if (tile.getAttribute('ship')) {\r\n      tile.style.backgroundColor = 'darkred';\r\n    } else {\r\n      tile.style.backgroundColor = 'dodgerblue';\r\n    }\r\n    return tile;\r\n  }\r\n\r\n  const resetTiles = (type) => {\r\n    const tiles = document.querySelectorAll('.'+type+'-tile');\r\n    tiles.forEach(tile => {\r\n      tile.textContent = '';\r\n      tile.style.backgroundColor = 'darkslategrey';\r\n      tile.style.pointerEvents = 'auto';\r\n      tile.style.cursor = 'pointer';\r\n      tile.setAttribute('ship','');\r\n    })\r\n  }\r\n\r\n\r\n  const endGameController = (winner) => {\r\n\r\n    const aiTiles = document.querySelectorAll('.ai-tile');\r\n    const winBox = document.querySelector('.win-box');\r\n    const winText = document.querySelector('.win-text');\r\n    \r\n    aiTiles.forEach(tile => {\r\n      tile.style.pointerEvents = 'none';\r\n      tile.style.cursor = 'auto';\r\n    })\r\n    \r\n    winBox.style.visibility = 'visible';\r\n    if (winner === 'player') {\r\n      winText.textContent = 'You win!'\r\n    } else {\r\n      winText.textContent = 'You lose!';\r\n    }\r\n  }\r\n\r\n  const loadWebsite = () => {\r\n    const container = document.querySelector('.container');\r\n    container.append(\r\n      createHeader(), \r\n      createMiddle(), \r\n      createFooter(),\r\n      createWinBox(),\r\n      // createNameForm(),\r\n      createResetBtn()\r\n      );\r\n    return container;\r\n  }\r\n\r\n  return {\r\n    populateGrid,\r\n    displayShips,\r\n    resetDisplay,\r\n    formController,\r\n    updateTile,\r\n    resetTiles,\r\n    endGameController,\r\n    loadWebsite\r\n  }\r\n\r\n})();\r\n\r\nmodule.exports = { domController };\n\n//# sourceURL=webpack://battleship/./src/modules/dom.js?");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { Ship } = __webpack_require__(/*! ./ship */ \"./src/modules/ship.js\");\r\n\r\nconst Gameboard = () => {\r\n\r\n  const board = createGameBoard();\r\n  const fleet = newFleet();\r\n\r\n  function createGameBoard() {\r\n    let gameboard = [];\r\n    for (let row = 0; row < 10; row++) {\r\n      gameboard[row] = [];\r\n      for (let col = 0; col < 10; col++) {\r\n        gameboard[row][col] = null;\r\n      }\r\n    }\r\n    return gameboard;\r\n  }\r\n\r\n  function clearBoard() {\r\n    for (let row = 0; row < 10; row++) {\r\n      for (let col = 0; col < 10; col++) {\r\n        board[row][col] = null;\r\n      }\r\n    }\r\n  }\r\n\r\n  function newFleet() { return [] };\r\n\r\n  function clearFleet() {\r\n    while (fleet.length > 0) fleet.pop();\r\n  }\r\n\r\n  function inBounds([row,col]) {\r\n    return (row > -1 && row < 10 && col > -1 && col < 10)\r\n  }\r\n\r\n  function validPlacement([row,col], shipType, direction) {\r\n    let length = Ship(shipType).length;\r\n    if (inBounds([row,col])) {\r\n      if (direction === 'horizontal') {\r\n        return (row + length - 1 < 10);\r\n      } else if (direction === 'vertical') {\r\n        return (col - length + 1 > -1);\r\n      } \r\n    }\r\n  }\r\n\r\n  function isPathClearOfShips([row,col], shipType, direction) {\r\n    let length = Ship(shipType).length;\r\n    if (direction === 'horizontal') {\r\n      for (let i = row; i < row + length; i++) {\r\n        if (board[i][col] !== null) {\r\n          return false;\r\n        }\r\n      }\r\n      return true;\r\n    }\r\n    else if (direction === 'vertical') {\r\n      for (let i = col; i > col - length; i--) {\r\n        if (board[row][i] !== null) {\r\n          return false;\r\n        }\r\n      }\r\n      return true;\r\n    }\r\n  }\r\n\r\n  function placeShip([row,col], shipType, direction) {\r\n\r\n    if (!validPlacement([row,col], shipType, direction)) throw Error('The ship extends outside the board.');\r\n    if (!isPathClearOfShips([row,col],shipType,direction)) throw Error('There is another ship in the way.')\r\n    \r\n    let currentShip = Ship(shipType);\r\n    let length = currentShip.length;\r\n    \r\n    if (!fleet.some((fleetShip) => fleetShip.id === currentShip.id)) {\r\n      fleet.push(currentShip);\r\n    } \r\n    else throw Error('This ship is already in the fleet!');\r\n\r\n    if (direction === 'horizontal') {\r\n      for (let i = row; i < row + length; i++) {\r\n        board[i][col] = currentShip;\r\n      }\r\n    }\r\n    else if (direction === 'vertical') {\r\n      for (let i = col; i > col - length; i--) { \r\n        board[row][i] = currentShip;\r\n      }\r\n    }\r\n  }\r\n  \r\n  function generateRandomPlacement() {\r\n\r\n    const coords = [\r\n      Math.floor(Math.random() * 10),\r\n      Math.floor(Math.random() * 10)\r\n    ];\r\n\r\n    const directions = ['horizontal','vertical'];\r\n    const direction = directions[Math.round(Math.random())];\r\n\r\n    return [coords, direction];\r\n  }\r\n\r\n  function placeShipsRandomly() {\r\n\r\n    let ships = [\r\n      Ship('destroyer'),\r\n      Ship('submarine'),\r\n      Ship('cruiser'),\r\n      Ship('battleship'),\r\n      Ship('carrier')\r\n    ];\r\n\r\n    ships.forEach(ship => {\r\n      while (ships.includes(ship)) {\r\n        let currentShip = ship.type;\r\n        let nums = generateRandomPlacement();\r\n        let coords = nums[0];\r\n        let direction = nums[1];\r\n        if (\r\n          validPlacement(coords,currentShip,direction) &&\r\n          isPathClearOfShips(coords,currentShip,direction)\r\n          ) {\r\n          placeShip(coords,currentShip,direction);\r\n          ships = ships.filter(element => element !== ship);\r\n        }\r\n      }\r\n    });\r\n  }\r\n\r\n\r\n  function receiveAttack([row,col]) {\r\n    let boardValue = board[row][col];\r\n    if (boardValue !== null) {\r\n      fleet.forEach((fleetShip) => {\r\n        if (boardValue.id === fleetShip.id) {\r\n          fleetShip.hit();\r\n        }\r\n      })\r\n    }\r\n  }\r\n\r\n  function checkEndGame() {\r\n    return (fleet.every((fleetShip) => fleetShip.isSunk()));\r\n  };\r\n\r\n  return {\r\n    board,\r\n    fleet,\r\n    createGameBoard,\r\n    clearBoard,\r\n    clearFleet,\r\n    inBounds,\r\n    validPlacement,\r\n    isPathClearOfShips,\r\n    placeShip,\r\n    generateRandomPlacement,\r\n    placeShipsRandomly,\r\n    receiveAttack,\r\n    checkEndGame\r\n  }\r\n  \r\n}\r\n\r\nmodule.exports = { Gameboard };\n\n//# sourceURL=webpack://battleship/./src/modules/gameboard.js?");

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((module) => {

eval("\r\nclass Player {\r\n  constructor(playerName) {\r\n    this.name = typeof playerName === 'string' ? playerName : 'OpponentAI';\r\n    this.turn = true;\r\n  }\r\n  \r\n  checkTurn() {\r\n    return this.turn;\r\n  }\r\n\r\n  startTurn() {\r\n    if (this.turn === false) {\r\n      this.turn = true;\r\n    }\r\n  }\r\n\r\n  endTurn(enemyPlayer) {\r\n    if (this.turn === true) {\r\n      this.turn = false;\r\n      enemyPlayer.startTurn();\r\n    }\r\n  }\r\n\r\n  targetedAttack([row,col], enemyPlayer, enemySide) {\r\n    if (this.checkTurn()) {\r\n      enemySide.receiveAttack([row,col]);\r\n      this.endTurn(enemyPlayer);\r\n    }\r\n    else throw Error('Not your turn!')\r\n  }\r\n}\r\n\r\nmodule.exports = { Player };\n\n//# sourceURL=webpack://battleship/./src/modules/player.js?");

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { shipTypes } = __webpack_require__(/*! ./shipTypes */ \"./src/modules/shipTypes.js\");\r\n\r\nconst Ship = (shipType) => {\r\n  const type = shipType;\r\n  const length = shipTypes[shipType].length;\r\n  const id = shipTypes[shipType].id;\r\n  let hits = 0;\r\n  function hit() {\r\n    this.hits++;\r\n  }\r\n  function isSunk() {\r\n    return (this.hits === this.length);\r\n  }\r\n  return {\r\n    type, \r\n    length, \r\n    id, \r\n    hits, \r\n    hit, \r\n    isSunk\r\n  }\r\n}\r\n\r\nmodule.exports = { Ship };\n\n//# sourceURL=webpack://battleship/./src/modules/ship.js?");

/***/ }),

/***/ "./src/modules/shipTypes.js":
/*!**********************************!*\
  !*** ./src/modules/shipTypes.js ***!
  \**********************************/
/***/ ((module) => {

eval("const shipTypes = {\r\n  destroyer: {\r\n    id: 1,\r\n    name: 'destroyer',\r\n    length: 2\r\n  },\r\n  submarine: {\r\n    id: 2,\r\n    name: 'submarine',\r\n    length: 3\r\n  },\r\n  cruiser: {\r\n    id: 3,\r\n    name: 'cruiser',\r\n    length: 3\r\n  },\r\n  battleship: {\r\n    id: 4,\r\n    name: 'battleship',\r\n    length: 4\r\n  },\r\n  carrier: {\r\n    id: 5,\r\n    name: 'carrier',\r\n    length: 5\r\n  }\r\n}\r\n\r\nmodule.exports = { shipTypes };\n\n//# sourceURL=webpack://battleship/./src/modules/shipTypes.js?");

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