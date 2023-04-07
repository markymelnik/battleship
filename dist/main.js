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

eval("const { Gameboard } = __webpack_require__(/*! ./modules/gameboard */ \"./src/modules/gameboard.js\");\r\nconst { Ship } = __webpack_require__(/*! ./modules/ship */ \"./src/modules/ship.js\");\r\nconst { Player } = __webpack_require__(/*! ./modules/player */ \"./src/modules/player.js\");\r\nconst { AI } = __webpack_require__(/*! ./modules/ai */ \"./src/modules/ai.js\");\r\nconst { domCreator } = __webpack_require__(/*! ./modules/dom */ \"./src/modules/dom.js\");\r\nconst { gameController } = __webpack_require__(/*! ./modules/control */ \"./src/modules/control.js\");\r\n\r\ndomCreator.loadWebsite();\r\n\r\nconst playerSide = Gameboard();\r\nconst playerBoard = playerSide.board;\r\nconst playerMark = new Player('Mark');\r\n\r\nconst aiSide = Gameboard();\r\nconst aiBoard = aiSide.board;\r\nconst playerAI = new AI('AI',playerMark,playerSide);\r\n\r\nconst newGameBtn = document.querySelector('.new-game-btn');\r\nconst resetGameBtn = document.querySelector('.reset-game-btn');\r\n\r\nconst resetController = (() => {\r\n\t\r\n\tconst winBox = document.querySelector('.win-box');\r\n\tconst shipsContainer = document.querySelector('.ships-container');\r\n\t\r\n\tconst resetPlayerBoard = () => {\r\n\t\tplayerSide.clearFleet();\r\n\t\tplayerSide.clearBoard();\r\n\t\tgameController.resetPlayerTiles();\r\n\t}\r\n\r\n\tconst resetAiBoard = () => {\r\n\t\taiSide.clearFleet();\r\n\t\taiSide.clearBoard();\r\n\t\tplayerAI.resetHitArray();\r\n\t\tgameController.resetAiTiles();\r\n\t\taiSide.placeShipsRandomly();\r\n\t\tgameController.displayShips(aiBoard,'ai');\r\n\t}\r\n\r\n\tconst newGame = () => {\r\n\r\n\t\twinBox.style.visibility = 'hidden';\r\n\t\tshipsContainer.style.visibility = 'visible';\r\n\t\tresetPlayerBoard();\r\n\t\tresetAiBoard();\r\n\r\n\t}\r\n\r\n\tconst resetGame = () => {\r\n\t\tnewGame();\r\n\t}\r\n\r\n\treturn {\r\n\t\tresetPlayerBoard,\r\n\t\tresetAiBoard,\r\n\t\tnewGame,\r\n\t\tresetGame\r\n\t}\r\n\r\n})();\r\n\r\nconst dragController = (() => {\r\n\r\n\tconst allShips = document.querySelectorAll('.ship');\r\n\tconst rotateBtn = document.querySelector('.rotate-btn');\r\n\r\n  rotateBtn.addEventListener('click', () => {\r\n\t\tallShips.forEach(ship => {\r\n\t\t\tif (ship.classList.contains('horizontal')) {\r\n\t\t\t\trotateVertically(ship);\r\n\t\t\t} else if (ship.classList.contains('vertical')) {\r\n\t\t\t\trotateHorizontally(ship);\r\n\t\t\t}\r\n\t\t})\r\n\t})\r\n\r\n\tconst ships = [\r\n\t\tShip('destroyer'),\r\n\t\tShip('submarine'),\r\n\t\tShip('cruiser'),\r\n\t\tShip('battleship'),\r\n\t\tShip('carrier')\r\n\t];\r\n\r\n\tallShips.forEach(ship => {\r\n\t\tship.addEventListener('dragstart', dragStart);\r\n\t})\r\n\r\n\tconst allPlayerTiles = document.querySelectorAll('.player-tile');\r\n\r\n\tallPlayerTiles.forEach(tile => {\r\n\t\ttile.addEventListener('dragenter', dragEnter);\r\n\t\ttile.addEventListener('dragover', dragOver);\r\n\t\ttile.addEventListener('dragLeave', dragLeave);\r\n\t\ttile.addEventListener('drop', dropShip);\r\n\t})\r\n\r\n\tlet draggedShip;\r\n\r\n\tfunction dragStart(e) {\r\n\t\tdraggedShip = e.target;\r\n\t\t\r\n\t}\r\n\r\n\tfunction dragEnter(e) {\r\n\t\te.preventDefault();\r\n\t}\r\n\r\n\tfunction dragOver(e) {\r\n\t\te.preventDefault();\r\n\t}\r\n\r\n\tfunction dragLeave(e) {\r\n\r\n\t}\r\n\r\n\tfunction dropShip(e) {\r\n\r\n\t\tconst row = e.target.dataset.row;\r\n\t\tconst col = e.target.dataset.col;\r\n\r\n\t\tconst ship = ships[draggedShip.id];\r\n\r\n\t\tif (draggedShip.classList.contains('horizontal')) {\r\n\t\t\tplayerSide.placeShip([row,col],ship,'vertical');\r\n\t\t} else if (draggedShip.classList.contains('vertical')) {\r\n\t\t\tplayerSide.placeShip([row,col],ship,'horizontal');\r\n\t\t}\r\n\r\n\t\tgameController.displayShips(playerBoard,'player');\r\n\r\n\t\tif (playerSide.checkStartGame()) {\r\n\t\t\tconst shipsContainer = document.querySelector('.ships-container');\r\n\t\t\tshipsContainer.style.visibility = 'hidden';\r\n\t\t}\r\n\r\n\t}\r\n\r\n\tfunction rotateVertically(ship) {\r\n\r\n\t\tship.classList.remove('horizontal');\r\n\t\tship.classList.add('vertical');\r\n\r\n\t\tlet id = ship.id;\r\n\t\tswitch(id) {\r\n\t\t\tcase '0':\r\n\t\t\t\tship.style.width = '45px';\r\n\t\t\t\tship.style.height = '90px';\r\n\t\t\t\tbreak;\r\n\t\t\tcase '1':\r\n\t\t\t\tship.style.width = '45px';\r\n\t\t\t\tship.style.height = '135px';\r\n\t\t\t\tbreak;\r\n\t\t\tcase '2':\r\n\t\t\t\tship.style.width = '45px';\r\n\t\t\t\tship.style.height = '135px';\r\n\t\t\t\tbreak;\r\n\t\t\tcase '3': \r\n\t\t\t\tship.style.width = '45px';\r\n\t\t\t\tship.style.height = '170px';\r\n\t\t\t\tbreak;\r\n\t\t\tcase '4': \r\n\t\t\t\tship.style.width = '45px';\r\n\t\t\t\tship.style.height = '225px';\r\n\t\t\t\tbreak;\r\n\t\t}\r\n\t}\r\n\r\n\tfunction rotateHorizontally(ship) {\r\n\r\n\t\tship.classList.remove('vertical');\r\n\t\tship.classList.add('horizontal');\r\n\r\n\t\tlet id = ship.id;\r\n\t\tswitch(id) {\r\n\t\t\tcase '0':\r\n\t\t\t\tship.style.width = '90px';\r\n\t\t\t\tship.style.height = '45px';\r\n\t\t\t\tbreak;\r\n\t\t\tcase '1':\r\n\t\t\t\tship.style.width = '135px';\r\n\t\t\t\tship.style.height = '45px';\r\n\t\t\t\tbreak;\r\n\t\t\tcase '2':\r\n\t\t\t\tship.style.width = '135px';\r\n\t\t\t\tship.style.height = '45px';\r\n\t\t\t\tbreak;\r\n\t\t\tcase '3': \r\n\t\t\t\tship.style.width = '170px';\r\n\t\t\t\tship.style.height = '45px';\r\n\t\t\t\tbreak;\r\n\t\t\tcase '4': \r\n\t\t\t\tship.style.width = '225px';\r\n\t\t\t\tship.style.height = '45px';\r\n\t\t\t\tbreak;\r\n\t\t}\r\n\t}\r\n\r\n})();\r\n\r\nconst updateBoard = () => {\r\n\r\n\tconst playerTiles = document.querySelectorAll('.player-tile');\r\n\tconst aiTiles = document.querySelectorAll('.ai-tile');\r\n\r\n\taiSide.placeShipsRandomly();\r\n\tgameController.displayShips(playerBoard,'player');\r\n\tgameController.displayShips(aiBoard,'ai');\r\n\r\n\t// gameController.nameFormController();\r\n\tresetGameBtn.addEventListener('click', resetController.resetGame);\r\n\tnewGameBtn.addEventListener('click', resetController.resetGame);\r\n\r\n\taiTiles.forEach(tile => {\r\n\t\tlet row = tile.dataset.row;\r\n\t\tlet col = tile.dataset.col;\r\n\r\n\t\ttile.addEventListener('click', () => {\r\n\r\n\t\t\tplayerMark.targetedAttack([row,col], playerAI, aiSide);\r\n\t\t\tgameController.updateTile(tile);\r\n\t\t\tplayerAI.randomAttack(playerMark, playerSide);\r\n\r\n\t\t\tlet strike = playerAI.hitArray[playerAI.hitArray.length - 1];\r\n\r\n\t\t\tplayerTiles.forEach(tile => {\r\n\t\t\t\tlet row = +tile.dataset.row;\r\n\t\t\t\tlet col = +tile.dataset.col;\r\n\t\t\t\tif (strike[0] === row && strike[1] === col) {\r\n\t\t\t\t\tsetTimeout(() => { gameController.updateTile(tile) }, 600);\r\n\t\t\t\t}\r\n\t\t\t})\r\n\r\n\t\t\tif (playerSide.checkEndGame()) {\r\n\t\t\t\tgameController.endGameController('ai');\r\n\t\t\t}\r\n\t\t\tif (aiSide.checkEndGame()) {\r\n\t\t\t\tgameController.endGameController('player');\r\n\t\t\t}\r\n\r\n\t\t})\r\n\r\n\t})\r\n};\r\n\r\nupdateBoard();\r\n\r\nconsole.log('Battleship');\r\nconsole.log(playerBoard);\r\nconsole.log(aiBoard);\r\nconsole.log(playerSide.fleet);\r\nconsole.log(aiSide.fleet);\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/ai.js":
/*!***************************!*\
  !*** ./src/modules/ai.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { Player } = __webpack_require__(/*! ./player */ \"./src/modules/player.js\");\r\n\r\nclass AI extends Player {\r\n  constructor(name, enemyPlayer, enemySide) {\r\n    super(name);\r\n    this.turn = false;\r\n    this.enemyPlayer = enemyPlayer;\r\n    this.enemySide = enemySide;\r\n    this.hitArray = [];\r\n  }\r\n\r\n  resetHitArray() {\r\n    return this.hitArray = [];\r\n  }\r\n\r\n  randomAttack(enemyPlayer, enemySide) {\r\n    if(this.checkTurn()) {\r\n      let strike = [];\r\n      while(true) {\r\n        let firstNum = Math.floor(Math.random() * 10);\r\n        let secondNum = Math.floor(Math.random() * 10);\r\n        strike[0] = firstNum;\r\n        strike[1] = secondNum;\r\n        if(!this.hitArray.some(coords => coords[0] == strike[0] && coords[1] == strike[1])) {\r\n          this.hitArray.push(strike);\r\n          this.targetedAttack(strike, enemyPlayer, enemySide);\r\n          break;\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nmodule.exports = { AI };\n\n//# sourceURL=webpack://battleship/./src/modules/ai.js?");

/***/ }),

/***/ "./src/modules/control.js":
/*!********************************!*\
  !*** ./src/modules/control.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { Gameboard } = __webpack_require__(/*! ./gameboard */ \"./src/modules/gameboard.js\");\r\nconst { Player } = __webpack_require__(/*! ./player */ \"./src/modules/player.js\");\r\nconst { AI } = __webpack_require__(/*! ./ai */ \"./src/modules/ai.js\");\r\n\r\nconst gameController = (() => {\r\n\r\n\tconst nameFormController = () => {\r\n\r\n\t\tconst nameForm = document.querySelector('.name-form');\r\n\t\tconst nameInput = document.querySelector('#name-input');\r\n\t\tconst playerName = document.querySelector('.player-name');\r\n\t\tconst submitBtn = document.querySelector('.submit-btn');\r\n\r\n\t\tnameForm.addEventListener('submit', (event) => {\r\n\t\t\tplayerName.textContent = nameInput.value || 'Player 1';\r\n\t\t\tnameForm.style.visibility = 'hidden';\r\n\t\t\tnameForm.reset();\r\n\t\t\tevent.preventDefault();\r\n\t\t})\r\n\t\t\r\n\t\tsubmitBtn.addEventListener('click', (event) => {\r\n\t\t\tplayerName.textContent = nameInput.value || 'Player 1';\r\n\t\t\tnameForm.style.visibility = 'hidden';\r\n\t\t\tnameForm.reset();\r\n\t\t\tevent.preventDefault();\r\n\t\t})\r\n\t}\r\n\r\n\tconst resetNameForm = () => {\r\n\t\tconst nameForm = document.querySelector('.name-form');\r\n\t\tconst playerName = document.querySelector('.player-name');\r\n\t\tnameForm.style.visibility = 'visible';\r\n\t\tplayerName.textContent = 'placeholder';\r\n\t}\r\n\r\n\tconst displayShips = (board, type) => {\r\n\t\tconst tiles = document.querySelectorAll('.'+type+'-tile');\r\n\t\tfor (let row = 0; row < 10; row ++) {\r\n\t\t\tfor (let col = 0; col < 10; col++) {\r\n\t\t\t\ttiles.forEach(tile => {\r\n\t\t\t\t\tif (board[row][col] !== null) {\r\n\t\t\t\t\t\tif (tile.dataset.row == row && tile.dataset.col == col) {\r\n\t\t\t\t\t\t\ttile.textContent = 'O';\r\n\t\t\t\t\t\t\ttile.setAttribute('ship','true');\r\n\t\t\t\t\t\t}  \r\n\t\t\t\t\t}\r\n\t\t\t\t})\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\tconst updateTile = (tile) => {\r\n\t\ttile.style.pointerEvents = 'none';\r\n\t\ttile.textContent = 'X';\r\n\t\tif (tile.getAttribute('ship')) {\r\n\t\t\ttile.style.backgroundColor = 'darkred';\r\n\t\t} else {\r\n\t\t\ttile.style.backgroundColor = 'dodgerblue';\r\n\t\t}\r\n\t}\r\n\r\n\tconst resetPlayerTiles = () => {\r\n\t\tconst playerTiles = document.querySelectorAll('.player-tile');\r\n\t\tplayerTiles.forEach(tile => {\r\n\t\t\ttile.textContent = '';\r\n\t\t\ttile.style.backgroundColor = 'darkslategrey';\r\n\t\t\ttile.style.pointerEvents = 'auto';\r\n\t\t\ttile.removeAttribute('ship');\r\n\t\t})\r\n\t}\r\n\r\n\tconst resetAiTiles = () => {\r\n\t\tconst aiTiles = document.querySelectorAll('.ai-tile');\r\n\t\taiTiles.forEach(tile => {\r\n\t\t\ttile.textContent = '';\r\n\t\t\ttile.style.backgroundColor = 'darkslategrey';\r\n\t\t\ttile.style.pointerEvents = 'auto';\r\n\t\t\ttile.style.cursor = 'pointer';\r\n\t\t\ttile.removeAttribute('ship');\r\n\t\t})\r\n\t}\r\n\r\n\tconst endGameController = (winner) => {\r\n\r\n\t\tconst aiTiles = document.querySelectorAll('.ai-tile');\r\n\t\tconst winBox = document.querySelector('.win-box');\r\n\t\tconst winText = document.querySelector('.win-text');\r\n\t\t\t\r\n\t\taiTiles.forEach(tile => {\r\n\t\t\ttile.style.pointerEvents = 'none';\r\n\t\t})\r\n\t\t\t\r\n\t\tsetTimeout(() => {  \r\n\t\t\twinBox.style.visibility = 'visible';\r\n\t\t\tif (winner === 'player') {\r\n\t\t\t\twinText.textContent = 'You win!'\r\n\t\t\t} else {\r\n\t\t\t\twinText.textContent = 'You lose!';\r\n\t\t\t}\r\n\t\t}, 800);\r\n\t}\r\n\r\n\treturn {\r\n\t\t// nameFormController,\r\n\t\t// resetNameForm,\r\n\t\tdisplayShips,\r\n\t\tupdateTile,\r\n\t\tresetPlayerTiles,\r\n\t\tresetAiTiles,\r\n\t\tendGameController\r\n\t}\r\n\r\n})();\r\n\r\nmodule.exports = { gameController }\n\n//# sourceURL=webpack://battleship/./src/modules/control.js?");

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((module) => {

eval("const domCreator = (() => {\r\n\r\n  const createHeader = () => {\r\n    const header = document.createElement('div');\r\n    header.classList.add('header');\r\n    const headerText = document.createElement('div');\r\n    headerText.classList.add('header-text');\r\n    headerText.textContent = 'Battleship';\r\n    header.append(headerText);\r\n    return header;\r\n  }\r\n\r\n  const createMiddle = () => {\r\n    const middle = document.createElement('div');\r\n    middle.classList.add('middle');\r\n    const playerContainer = document.createElement('div');\r\n    playerContainer.classList.add('player-container');\r\n    const playerName = document.createElement('div');\r\n    playerName.classList.add('player-name');\r\n    playerName.textContent = 'placeholder';\r\n    playerContainer.append(playerName,createGridTiles('player'));\r\n    const aiContainer = document.createElement('div');\r\n    aiContainer.classList.add('ai-container');\r\n    const aiName = document.createElement('div');\r\n    aiName.classList.add('ai-name');\r\n    aiName.textContent = 'OpponentAI';\r\n    aiContainer.append(aiName,createGridTiles('ai'));\r\n    middle.append(playerContainer,aiContainer)\r\n    return middle;\r\n  }\r\n\r\n  const createFooter = () => {\r\n    const footer = document.createElement('div');\r\n    footer.classList.add('footer');\r\n    const footerText = document.createElement('div');\r\n    footerText.classList.add('footer-text');\r\n    footerText.textContent = 'Mark Melnik, 2023'\r\n    footer.append(footerText);\r\n    return footer;\r\n  }\r\n\r\n  const createNameForm = () => {\r\n    const nameForm = document.createElement('form');\r\n    nameForm.classList.add('name-form');\r\n    nameForm.setAttribute('name','nameform');\r\n    nameForm.setAttribute('autocomplete','off');\r\n    const prompt = document.createElement('h1');\r\n    prompt.textContent = 'Enter your name:';\r\n    const formContent = document.createElement('div');\r\n    formContent.classList.add('form-content');\r\n    const label = document.createElement('label');\r\n    label.setAttribute('for','name');\r\n    const input = document.createElement('input');\r\n    input.setAttribute('type','text');\r\n    input.setAttribute('id','name-input');\r\n    input.setAttribute('name','name');\r\n    input.setAttribute('required','');\r\n    const button = document.createElement('button');\r\n    button.classList.add('submit-btn');\r\n    button.setAttribute('type','button');\r\n    button.textContent = 'Submit';\r\n    formContent.append(label, input, button);\r\n    nameForm.append(prompt,formContent);\r\n    return nameForm; \r\n  }\r\n\r\n  const createResetGameBtn = () => {\r\n    const button = document.createElement('button');\r\n    button.classList.add('reset-game-btn');\r\n    button.setAttribute('type','button');\r\n    button.textContent = 'Reset Game';\r\n    return button;\r\n  }\r\n\r\n  const createWinBox = () => {\r\n    const winBox = document.createElement('div');\r\n    winBox.classList.add('win-box');\r\n    const winText = document.createElement('div');\r\n    winText.classList.add('win-text');\r\n    winBox.append(winText,createNewGameBtn());\r\n    return winBox;\r\n  }\r\n\r\n  const createNewGameBtn = () => {\r\n    const newGameBtn = document.createElement('button');\r\n    newGameBtn.classList.add('new-game-btn');\r\n    newGameBtn.textContent = 'New Game';\r\n    return newGameBtn;\r\n  }\r\n\r\n  const createGridTiles = (type) => {\r\n    const grid = document.createElement('div');\r\n    grid.classList.add(type + '-grid');\r\n    for (let row = 0; row < 10; row++) {\r\n      for (let col = 0; col < 10; col++) {\r\n        const tile = document.createElement('div');\r\n        tile.classList.add(type + '-tile');\r\n        tile.dataset.row = row;\r\n        tile.dataset.col = col;\r\n        grid.appendChild(tile);\r\n      }\r\n    }\r\n    return grid;\r\n  }\r\n\r\n  const appendShips = () => {\r\n\r\n    const allShips = document.createElement('div');\r\n    allShips.classList.add('all-ships');\r\n\r\n    const destroyer = document.createElement('div');\r\n    destroyer.classList.add('ship','destroyer','horizontal');\r\n    destroyer.id = 0;\r\n    destroyer.setAttribute('draggable','true');\r\n\r\n    const submarine = document.createElement('div');\r\n    submarine.classList.add('ship','submarine','horizontal');\r\n    submarine.id = 1;\r\n    submarine.setAttribute('draggable','true');\r\n\r\n    const cruiser = document.createElement('div');\r\n    cruiser.classList.add('ship','cruiser','horizontal');\r\n    cruiser.id = 2;\r\n    cruiser.setAttribute('draggable','true');\r\n\r\n    const battleship = document.createElement('div');\r\n    battleship.classList.add('ship','battleship','horizontal');\r\n    battleship.id = 3;\r\n    battleship.setAttribute('draggable','true');\r\n\r\n    const carrier = document.createElement('div');\r\n    carrier.classList.add('ship','carrier','horizontal');\r\n    carrier.id = 4;\r\n    carrier.setAttribute('draggable','true');\r\n  \r\n    allShips.append(\r\n      destroyer,\r\n      submarine,\r\n      cruiser,\r\n      battleship,\r\n      carrier\r\n    )\r\n\r\n    return allShips;\r\n  }\r\n\r\n  const createShipsContainer = () => {\r\n\r\n    const shipsContainer = document.createElement('div');\r\n    shipsContainer.classList.add('ships-container');\r\n\r\n    const shipsContainerHeader = document.createElement('h1');\r\n    shipsContainerHeader.textContent = 'Place your ships!';\r\n\r\n    const rotateBtn = document.createElement('button');\r\n    rotateBtn.classList.add('rotate-btn');\r\n    rotateBtn.textContent = 'Rotate';\r\n\r\n    shipsContainer.append(shipsContainerHeader, appendShips(), rotateBtn);\r\n    return shipsContainer;\r\n  } \r\n\r\n  \r\n\r\n  const loadWebsite = () => {\r\n    const container = document.querySelector('.container');\r\n    container.append(\r\n      createHeader(), \r\n      createMiddle(), \r\n      createFooter(),\r\n      createShipsContainer(),\r\n      // createNameForm(),\r\n      createWinBox(),\r\n      createResetGameBtn()\r\n      );\r\n    return container;\r\n  }\r\n\r\n  return {\r\n    loadWebsite,\r\n    appendShips\r\n  }\r\n\r\n})();\r\n\r\nmodule.exports = { domCreator };\n\n//# sourceURL=webpack://battleship/./src/modules/dom.js?");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { Ship } = __webpack_require__(/*! ./ship */ \"./src/modules/ship.js\");\r\n\r\nconst Gameboard = () => {\r\n\r\n  const board = createGameBoard();\r\n  const fleet = createFleet();\r\n\r\n  function createGameBoard() {\r\n    let gameboard = [];\r\n    for (let row = 0; row < 10; row++) {\r\n      gameboard[row] = [];\r\n      for (let col = 0; col < 10; col++) {\r\n        gameboard[row][col] = null;\r\n      }\r\n    }\r\n    return gameboard;\r\n  }\r\n\r\n  function createFleet() { return [] };\r\n\r\n  function clearBoard() {\r\n    for (let row = 0; row < 10; row++) {\r\n      for (let col = 0; col < 10; col++) {\r\n        board[row][col] = null;\r\n      }\r\n    }\r\n  }\r\n\r\n  function clearFleet() {\r\n    while (fleet.length > 0) fleet.pop();\r\n  }\r\n\r\n  function inBounds([row,col]) {\r\n    return (row > -1 && row < 10 && col > -1 && col < 10)\r\n  }\r\n\r\n  function validPlacement([row,col],ship,direction) {\r\n\r\n    if (!inBounds([row,col])) throw Error('Invalid initial starting position.');\r\n\r\n    let length = ship.length;\r\n    \r\n    if (direction === 'horizontal') {\r\n      if (row + length - 1 < 10) {\r\n        return true;\r\n      } else {\r\n        return false;\r\n      }\r\n    } else if (direction === 'vertical') {\r\n      if (col - length + 1 > -1) {\r\n        return true;\r\n      } else {\r\n        return false;\r\n      }\r\n    }\r\n  }\r\n\r\n  function isPathClearOfShips([row,col], ship, direction) {\r\n    let length = ship.length;\r\n    if (direction === 'horizontal') {\r\n      for (let i = row; i < row + length; i++) {\r\n        if (board[i][col] !== null) {\r\n          return false;\r\n        }\r\n      }\r\n      return true;\r\n    }\r\n    else if (direction === 'vertical') {\r\n      for (let i = col; i > col - length; i--) {\r\n        if (board[row][i] !== null) {\r\n          return false;\r\n        }\r\n      }\r\n      return true;\r\n    }\r\n  }\r\n\r\n  function getAdjacentTiles([row,col]) {\r\n    \r\n    if (!inBounds([row,col])) throw Error('Invalid row and col parameters.');\r\n    \r\n    let adjacentLocations = [\r\n      [row - 1, col - 1],\r\n      [row - 1, col],\r\n      [row - 1, col + 1],\r\n      [row, col + 1],\r\n      [row + 1, col + 1],\r\n      [row + 1, col],\r\n      [row + 1, col - 1],\r\n      [row, col - 1]\r\n    ];\r\n\r\n    let adjacentTiles = adjacentLocations.filter((tile) => {\r\n      if (inBounds([tile[0],tile[1]])) {\r\n        return tile;\r\n      }\r\n    })\r\n    return adjacentTiles;\r\n  }\r\n\r\n  function areAdjacentTilesEmpty([row,col], ship, direction) {\r\n    let length = ship.length;\r\n    if (direction === 'horizontal') {\r\n      for (let i = row; i < row + length; i++) {\r\n        let adjacentTiles = getAdjacentTiles([i,col]);\r\n        if (adjacentTiles.some((tile) => board[tile[0]][tile[1]] !== null)) {\r\n          return false;\r\n        }\r\n      }\r\n      return true;\r\n    }\r\n    else if (direction === 'vertical') {\r\n      for (let i = col; i > col - length; i--) {\r\n        let adjacentTiles = getAdjacentTiles([row,i]);\r\n        if (adjacentTiles.some((tile) => board[tile[0]][tile[1]] !== null)) {\r\n          return false;\r\n        }\r\n      }\r\n      return true;\r\n    }\r\n  }\r\n\r\n  function placeShip([row,col], ship, direction) {\r\n\r\n    row = +row;\r\n    col = +col;\r\n\r\n    if (!validPlacement([row,col],ship,direction)) throw Error('The ship extends outside the board.');\r\n    if (!isPathClearOfShips([row,col],ship,direction)) throw Error('There is another ship in the way.');\r\n    if (!areAdjacentTilesEmpty([row,col],ship,direction)) throw Error('This ship is adjacent to another ship.');\r\n  \r\n    let length = ship.length;\r\n\r\n    if (!fleet.some((fleetShip) => fleetShip.id === ship.id)) {\r\n      fleet.push(ship);\r\n    } \r\n    else throw Error('This ship is already in the fleet!');\r\n\r\n    if (direction === 'horizontal') {\r\n      for (let i = row; i < row + length; i++) {\r\n        board[i][col] = ship;\r\n      }\r\n    }\r\n    else if (direction === 'vertical') {\r\n      for (let i = col; i > col - length; i--) { \r\n        board[row][i] = ship;\r\n      }\r\n    }\r\n  }\r\n\r\n  const placeAllShips = () => {\r\n    placeShip([1,1], 'destroyer', 'horizontal');\r\n    placeShip([8,9], 'submarine', 'vertical');\r\n    placeShip([2,8], 'cruiser', 'horizontal');\r\n    placeShip([6,2], 'battleship', 'horizontal');\r\n    placeShip([4,6], 'carrier', 'vertical');\r\n  }\r\n  \r\n  function generateRandomPlacement() {\r\n\r\n    const coords = [\r\n      Math.floor(Math.random() * 10),\r\n      Math.floor(Math.random() * 10)\r\n    ];\r\n\r\n    const directions = ['horizontal','vertical'];\r\n    const direction = directions[Math.round(Math.random())];\r\n\r\n    return [coords, direction];\r\n  }\r\n\r\n  function placeShipsRandomly() {\r\n\r\n    let ships = [\r\n      Ship('destroyer'),\r\n      Ship('submarine'),\r\n      Ship('cruiser'),\r\n      Ship('battleship'),\r\n      Ship('carrier')\r\n    ];\r\n\r\n    ships.forEach(ship => {\r\n      while (ships.includes(ship)) {\r\n        let nums = generateRandomPlacement();\r\n        let coords = nums[0];\r\n        let direction = nums[1];\r\n        if (\r\n          validPlacement(coords,ship,direction) &&\r\n          areAdjacentTilesEmpty(coords,ship,direction) &&\r\n          isPathClearOfShips(coords,ship,direction)\r\n          ) {\r\n          placeShip(coords,ship,direction);\r\n          ships = ships.filter(element => element !== ship);\r\n        }\r\n      }\r\n    });\r\n  }\r\n\r\n  function receiveAttack([row,col]) {\r\n    let boardValue = board[row][col];\r\n    if (boardValue !== null) {\r\n      fleet.forEach((fleetShip) => {\r\n        if (boardValue.id === fleetShip.id) {\r\n          fleetShip.hit();\r\n        }\r\n      })\r\n    }\r\n  }\r\n\r\n  function checkStartGame() {\r\n    return (fleet.length > 4);\r\n  };\r\n\r\n  function checkEndGame() {\r\n    return (fleet.every((fleetShip) => fleetShip.isSunk()));\r\n  };\r\n\r\n  return {\r\n    board,\r\n    fleet,\r\n    createGameBoard,\r\n    createFleet,\r\n    clearBoard,\r\n    clearFleet,\r\n    inBounds,\r\n    validPlacement,\r\n    isPathClearOfShips,\r\n    getAdjacentTiles,\r\n    areAdjacentTilesEmpty,\r\n    placeShip,\r\n    placeAllShips,\r\n    generateRandomPlacement,\r\n    placeShipsRandomly,\r\n    receiveAttack,\r\n    checkStartGame,\r\n    checkEndGame\r\n  }\r\n  \r\n}\r\n\r\nmodule.exports = { Gameboard };\n\n//# sourceURL=webpack://battleship/./src/modules/gameboard.js?");

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((module) => {

eval("class Player {\r\n  constructor(playerName) {\r\n    this.name = typeof playerName === 'string' ? playerName : 'OpponentAI';\r\n    this.turn = true;\r\n  }\r\n  \r\n  checkTurn() {\r\n    return this.turn;\r\n  }\r\n\r\n  startTurn() {\r\n    if (this.turn === false) {\r\n      this.turn = true;\r\n    }\r\n  }\r\n\r\n  endTurn(enemyPlayer) {\r\n    if (this.turn === true) {\r\n      this.turn = false;\r\n      enemyPlayer.startTurn();\r\n    }\r\n  }\r\n\r\n  targetedAttack([row,col], enemyPlayer, enemySide) {\r\n    if (this.checkTurn()) {\r\n      enemySide.receiveAttack([row,col]);\r\n      this.endTurn(enemyPlayer);\r\n    }\r\n    else throw Error('Not your turn!')\r\n  }\r\n}\r\n\r\nmodule.exports = { Player };\n\n//# sourceURL=webpack://battleship/./src/modules/player.js?");

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