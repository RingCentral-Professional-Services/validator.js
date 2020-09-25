"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLimitedExtensionPutRequest;

var _isEmail = _interopRequireDefault(require("./isEmail"));

var _isRingCentralIvrPin = _interopRequireDefault(require("./isRingCentralIvrPin"));

var _isRingCentralPassword = _interopRequireDefault(require("./isRingCentralPassword"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isLimitedExtensionPutRequest(requestObj) {
  var errors = [];

  if (_typeof(requestObj) !== 'object') {
    errors.push("should be an object not ".concat(_typeof(requestObj)));
  }

  if (requestObj.ivrPin && (0, _isRingCentralIvrPin.default)(requestObj.ivrPin) === false) {
    errors.push("ivrPin is invalid. Should be 6 digits, non sequestial, and repeated numbers. You sent ".concat(requestObj.ivrPin));
  }

  if (requestObj.password && (0, _isRingCentralPassword.default)(requestObj.password) === false) {
    errors.push("password is invalid. Should have an upper case, lower case, special character, and a number. You sent ".concat(requestObj.password));
  }

  if (requestObj.type) {
    errors.push('cannot change type of extension');
  }

  if (requestObj.contact && !requestObj.contact.firstName) {
    errors.push('contact.firstName required');
  }

  if (requestObj.contact && requestObj.contact.lastName) {
    errors.push('contact.lastName forbidden');
  }

  if (requestObj.contact && (0, _isEmail.default)(requestObj.contact.email) === false) {
    errors.push("contact.email is invalid. You sent ".concat(requestObj.contact.email));
  }

  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  } else {
    return true;
  }
}

module.exports = exports.default;
module.exports.default = exports.default;