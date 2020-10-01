"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRingCentralExtensionNumber;
var ivrPinRegex = new RegExp(/(111|211|311|411|511|611|711|811|911|988)/, 'i');

function isRingCentralExtensionNumber(extensionNumber) {
  return !ivrPinRegex.test(extensionNumber);
}

module.exports = exports.default;
module.exports.default = exports.default;