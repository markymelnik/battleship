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

eval("const { displayOutput } = __webpack_require__(/*! ./modules/display */ \"./src/modules/display.js\");\n\n\ndisplayOutput();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/display.js":
/*!********************************!*\
  !*** ./src/modules/display.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { Ship } = __webpack_require__(/*! ./ship */ \"./src/modules/ship.js\")\n\nconst newShip = Ship('carrier');\n\nconst displayOutput = () => {\n  console.log(newShip);\n  console.log(newShip.length);\n}\n\nmodule.exports = { displayOutput };\n\n//# sourceURL=webpack://battleship/./src/modules/display.js?");

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { shipTypes } = __webpack_require__(/*! ./shipTypes */ \"./src/modules/shipTypes.js\");\n\nconst Ship = (shipType) => {\n  const type = shipType;\n  const length = shipTypes[shipType].length;\n  const id = shipTypes[shipType].id;\n  let hits = 0;\n  function hit() {\n    this.hits++;\n  }\n  function isSunk() {\n    return (this.hits === this.length);\n  }\n  return {\n    type, \n    length,\n    id, \n    hits, \n    hit, \n    isSunk\n  }\n}\n\nmodule.exports = { Ship };\n\n//# sourceURL=webpack://battleship/./src/modules/ship.js?");

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