function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import isEmail from './isEmail';
import isRingCentralIvrPin from './isRingCentralIvrPin';
import isRingCentralPassword from './isRingCentralPassword';
import isRingCentralExtensionNumber from './isRingCentralExtensionNumber';
export default function isLimitedExtensionPostRequest(requestObj) {
  var errors = [];

  if (_typeof(requestObj) !== 'object') {
    errors.push("should be an object not ".concat(_typeof(requestObj)));
  }

  if (!requestObj.ivrPin) {
    errors.push('ivrPin required');
  } else if (isRingCentralIvrPin(requestObj.ivrPin) === false) {
    errors.push("ivrPin is invalid. Should be 6 digits, non sequestial, and repeated numbers. You sent ".concat(requestObj.ivrPin));
  }

  if (!requestObj.password) {
    errors.push('password required');
  } else if (isRingCentralPassword(requestObj.password) === false) {
    errors.push("password is invalid. Should have an upper case, lower case, special character, and a number. You sent ".concat(requestObj.password));
  }

  if (!requestObj.extensionNumber) {
    errors.push('Extension number is required');
  } else if (isRingCentralExtensionNumber(requestObj.extensionNumber) === false) {
    errors.push("Extension number ".concat(requestObj.extensionNumber, " is invalid"));
  }

  if (!requestObj.type) {
    errors.push('type required');
  } else if (requestObj.type !== 'Limited') {
    errors.push("type should be 'Limited'. You sent ".concat(requestObj.type));
  }

  if (!requestObj.contact) {
    errors.push('contact body required');
  }

  if (!requestObj.contact.firstName) {
    errors.push('contact.firstName required');
  }

  if (requestObj.contact.lastName) {
    errors.push('contact.lastName forbidden');
  }

  if (!requestObj.contact.email) {
    errors.push('contact.email required');
  } else if (isEmail(requestObj.contact.email) === false) {
    errors.push("contact.email is invalid. You sent ".concat(requestObj.contact.email));
  }

  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  } else {
    return true;
  }
}