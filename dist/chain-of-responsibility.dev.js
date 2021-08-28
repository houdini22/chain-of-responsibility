/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/AbstractChainItem.tsx":
/*!*******************************************!*\
  !*** ./src/classes/AbstractChainItem.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AbstractChainItem = /*#__PURE__*/function () {
  function AbstractChainItem(chainContainer) {
    var _this = this;

    var usePromise = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, AbstractChainItem);

    _defineProperty(this, "chainContainer", null);

    _defineProperty(this, "nextChainItem", null);

    _defineProperty(this, "promise", null);

    _defineProperty(this, "resolve", null);

    this.chainContainer = chainContainer;
    this.promise = null;
    this.resolve = null;

    if (usePromise === true) {
      this.promise = new Promise(function (resolve, reject) {
        _this.resolve = resolve;
      });
      this.getChainContainer().addPromise(this.promise);
    }
  }

  _createClass(AbstractChainItem, [{
    key: "hasPromise",
    value: function hasPromise() {
      return !!this.promise;
    }
  }, {
    key: "getPromise",
    value: function getPromise() {
      return this.promise;
    }
  }, {
    key: "setNextChainItem",
    value: function setNextChainItem(chainItem) {
      this.nextChainItem = chainItem;
      return this;
    }
  }, {
    key: "getNextChainItem",
    value: function getNextChainItem() {
      return this.nextChainItem;
    }
  }, {
    key: "getChainContainer",
    value: function getChainContainer() {
      return this.chainContainer;
    }
  }, {
    key: "getValueContainer",
    value: function getValueContainer() {
      return this.getChainContainer().getValueContainer();
    }
  }, {
    key: "executeNext",
    value: function executeNext() {
      var next = this.getNextChainItem();

      if (next) {
        while (next && next.shouldSkip(this.getValueContainer()) === true) {
          next = next.getNextChainItem();
        }
      }

      if (next) {
        if (next.shouldStopBefore(this.getValueContainer()) === false) {
          return next.execute();
        }
      }

      return this.getValueContainer().getResult();
    }
  }, {
    key: "execute",
    value: function execute() {
      var _this2 = this;

      if (this.hasPromise()) {
        this.getPromise().then(function () {
          if (_this2.shouldStopAfter(_this2.getValueContainer()) === false) {
            _this2.executeNext();
          }
        });
      }

      this._execute(this.getValueContainer(), this.resolve);

      if (this.shouldStopAfter(this.getValueContainer()) === true) {
        return this.getValueContainer().getResult();
      }

      if (!this.hasPromise()) {
        return this.executeNext();
      }
    }
  }, {
    key: "_execute",
    value: function _execute(valueContainer, resolve) {
      return false;
    }
  }, {
    key: "shouldStopBefore",
    value: function shouldStopBefore(valueContainer) {
      return false;
    }
  }, {
    key: "shouldStopAfter",
    value: function shouldStopAfter(valueContainer) {
      return false;
    }
  }, {
    key: "shouldSkip",
    value: function shouldSkip(valueContainer) {
      return false;
    }
  }]);

  return AbstractChainItem;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AbstractChainItem);

/***/ }),

/***/ "./src/classes/AbstractChainItemContainer.tsx":
/*!****************************************************!*\
  !*** ./src/classes/AbstractChainItemContainer.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AbstractChainItemContainer = /*#__PURE__*/function () {
  function AbstractChainItemContainer(valueContainer) {
    var _this = this;

    _classCallCheck(this, AbstractChainItemContainer);

    _defineProperty(this, "promises", []);

    _defineProperty(this, "valueContainer", null);

    _defineProperty(this, "firstChainItem", null);

    _defineProperty(this, "promise", null);

    this.valueContainer = valueContainer;
    this.firstChainItem = this.getFirstChainItem();

    this._createItemsChain(this.firstChainItem);

    this.promise = new Promise(function (resolve, reject) {
      _this.resolve = resolve;
    });
  }

  _createClass(AbstractChainItemContainer, [{
    key: "_createItemsChain",
    value: function _createItemsChain(first) {}
  }, {
    key: "_getFirstChainItem",
    value: function _getFirstChainItem() {
      return null;
    }
  }, {
    key: "getValueContainer",
    value: function getValueContainer() {
      return this.valueContainer;
    }
  }, {
    key: "getFirstChainItem",
    value: function getFirstChainItem() {
      if (!this.firstChainItem) {
        this.firstChainItem = this._getFirstChainItem();
      }

      return this.firstChainItem;
    }
  }, {
    key: "addPromise",
    value: function addPromise(promise) {
      this.promises.push(promise);
      return this;
    }
  }, {
    key: "run",
    value: function run() {
      var _this2 = this;

      var item = this.getFirstChainItem();

      while (item && item.shouldSkip(this.getValueContainer()) === true) {
        item = item.getNextChainItem();
      }

      if (item && item.shouldStopBefore(this.getValueContainer()) === false) {
        item.execute();
      }

      Promise.all(this.promises).then(function () {
        _this2.resolve(_this2.getResult());
      });
      return this.promise;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.getValueContainer().getResult();
    }
  }]);

  return AbstractChainItemContainer;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AbstractChainItemContainer);

/***/ }),

/***/ "./src/classes/AbstractChainItemValueContainer.tsx":
/*!*********************************************************!*\
  !*** ./src/classes/AbstractChainItemValueContainer.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_object_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/object-helper */ "./src/helpers/object-helper.tsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * Wrapper for values
 */

var AbstractChainItemValueContainer = /*#__PURE__*/function () {
  function AbstractChainItemValueContainer(value, params) {
    _classCallCheck(this, AbstractChainItemValueContainer);

    _defineProperty(this, "rawValue", null);

    _defineProperty(this, "value", null);

    _defineProperty(this, "parameters", {});

    var rawValue; // copy value

    if (Array.isArray(value)) {
      rawValue = value.concat();
    } else if (_typeof(value) == "object") {
      rawValue = _objectSpread({}, value);
    } else {
      rawValue = value;
    }

    this.rawValue = rawValue;
    this.value = this._parseValue(value);
    this.parameters = params;
  }

  _createClass(AbstractChainItemValueContainer, [{
    key: "_parseValue",
    value: function _parseValue(value) {
      return value;
    }
  }, {
    key: "getRawValue",
    value: function getRawValue() {
      return this.rawValue;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.getValue();
    }
  }, {
    key: "getParameter",
    value: function getParameter(path) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return _helpers_object_helper__WEBPACK_IMPORTED_MODULE_0__.default.getPropertyByPath(this.parameters, path, defaultValue);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (path === null) {
        return this.value;
      } else if (typeof path == "string") {
        return _helpers_object_helper__WEBPACK_IMPORTED_MODULE_0__.default.getPropertyByPath(this.value, path, defaultValue);
      }

      throw "Wrong usage.";
    }
  }, {
    key: "setValue",
    value: function setValue(path) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (_typeof(this.value) == "object") {
        _helpers_object_helper__WEBPACK_IMPORTED_MODULE_0__.default.setPropertyByPath(this.value, path, value);
        return this;
      }

      this.value = path;
      return this;
    }
  }]);

  return AbstractChainItemValueContainer;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AbstractChainItemValueContainer);

/***/ }),

/***/ "./src/helpers/object-helper.tsx":
/*!***************************************!*\
  !*** ./src/helpers/object-helper.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPropertyByPath": () => (/* binding */ getPropertyByPath),
/* harmony export */   "setPropertyByPath": () => (/* binding */ setPropertyByPath),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var getPropertyByPath = function getPropertyByPath(obj, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var arr = path.split(".");

  for (var i = 0; i < arr.length; i += 1) {
    obj = obj[arr[i]];

    if (typeof obj === "undefined") {
      return defaultValue;
    }
  }

  return obj;
};
var setPropertyByPath = function setPropertyByPath(obj, path, value) {
  var arr = path.split(".");
  var result = obj;

  for (var i = 0; i < arr.length - 1; i++) {
    var n = arr[i];

    if (n in result) {
      result = result[n];
    } else {
      result[n] = {};
      result = result[n];
    }
  }

  result[arr[arr.length - 1]] = value;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getPropertyByPath: getPropertyByPath,
  setPropertyByPath: setPropertyByPath
});

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/main.tsx ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractChainItemContainer": () => (/* reexport safe */ _classes_AbstractChainItemContainer__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "AbstractChainItem": () => (/* reexport safe */ _classes_AbstractChainItem__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "AbstractChainItemValueContainer": () => (/* reexport safe */ _classes_AbstractChainItemValueContainer__WEBPACK_IMPORTED_MODULE_2__.default)
/* harmony export */ });
/* harmony import */ var _classes_AbstractChainItemContainer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/AbstractChainItemContainer */ "./src/classes/AbstractChainItemContainer.tsx");
/* harmony import */ var _classes_AbstractChainItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/AbstractChainItem */ "./src/classes/AbstractChainItem.tsx");
/* harmony import */ var _classes_AbstractChainItemValueContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/AbstractChainItemValueContainer */ "./src/classes/AbstractChainItemValueContainer.tsx");




})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=chain-of-responsibility.dev.js.map