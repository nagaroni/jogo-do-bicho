/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/javascripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/javascripts/helpers.js":
/*!***************************************!*\
  !*** ./assets/javascripts/helpers.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar getGameResults = function getGameResults(path) {\n  return new Promise(function (resolve, reject) {\n    var request = new XMLHttpRequest();\n    request.open(\"GET\", path);\n    request.onload = function () {\n      if (request.status >= 200 && request.status <= 300) {\n        resolve(request.response);\n      } else {\n        reject(request.statusText);\n      }\n    };\n    request.onerror = function () {\n      return reject(request.statusText);\n    };\n    request.send();\n  });\n};\n\nexports.getGameResults = getGameResults;\n\n//# sourceURL=webpack:///./assets/javascripts/helpers.js?");

/***/ }),

/***/ "./assets/javascripts/index.js":
/*!*************************************!*\
  !*** ./assets/javascripts/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _helpers = __webpack_require__(/*! ./helpers.js */ \"./assets/javascripts/helpers.js\");\n\nvar createTag = function createTag(tagName) {\n  return document.createElement(tagName);\n};\nvar tabNavigation = function tabNavigation(name) {\n  var navigation = createTag('li');\n  var link = createTag('a');\n  link.href = '#' + name;\n  link.innerText = name;\n  navigation.append(link);\n\n  return navigation;\n};\nvar createGameGrid = function createGameGrid(type, games) {\n  var container = createTag('div');\n  games.forEach(function () {\n    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : game,\n        position = _ref.position,\n        result = _ref.result,\n        animal = _ref.animal;\n\n    var row = createTag('div');\n    var positionColumn = createTag('div');\n    var resultColumn = createTag('div');\n    var animalColumn = createTag('div');\n    row.classList.add('columns');\n    row.appendChild(positionColumn);\n    row.appendChild(resultColumn);\n    row.appendChild(animalColumn);\n    positionColumn.innerText = position;\n    resultColumn.innerText = result;\n    animalColumn.innerText = animal;\n    container.appendChild(row);\n  });\n\n  return container;\n};\n\nvar tabContent = function tabContent(type, games) {\n  var contentBody = createGameGrid(type, games);\n  contentBody.id = type;\n  contentBody.classList.add('tab-content');\n\n  return contentBody;\n};\n\nvar tabs = function tabs(results) {\n  var types = Object.keys(results);\n  var ul = createTag('ul');\n  var container = createTag('div');\n  container.appendChild(ul);\n  types.map(function (type) {\n    ul.appendChild(tabNavigation(type));\n    container.appendChild(tabContent(type, results[type]));\n  });\n  ul.classList.add('tab-navigation');\n  container.classList.add('tabs');\n\n  return container;\n};\n\nvar app = document.getElementById('app');\n\nvar parseResults = function parseResults(jsonstring) {\n  var _JSON$parse = JSON.parse(jsonstring),\n      results = _JSON$parse.results;\n\n  var container = tabs(results);\n  app.appendChild(container);\n};\n\n(0, _helpers.getGameResults)('/api/results').then(function (data) {\n  return parseResults(data);\n}).catch(function (error) {\n  return console.log(error);\n});\n\n//# sourceURL=webpack:///./assets/javascripts/index.js?");

/***/ })

/******/ });