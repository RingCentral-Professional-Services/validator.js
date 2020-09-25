import isEmail from './isEmail';
import isRingCentralIvrPin from './isRingCentralIvrPin';
import isRingCentralPassword from './isRingCentralPassword';


export default function isLimitedExtensionPutRequest(requestObj) {
  let errors = [];

  if (typeof requestObj !== 'object') {
    errors.push(`should be an object not ${typeof requestObj}`);
  }

  if (requestObj.ivrPin && isRingCentralIvrPin(requestObj.ivrPin) === false) {
    errors.push(`ivrPin is invalid. Should be 6 digits, non sequestial, and repeated numbers. You sent ${requestObj.ivrPin}`);
  }

  if (requestObj.password && isRingCentralPassword(requestObj.password) === false) {
    errors.push(`password is invalid. Should have an upper case, lower case, special character, and a number. You sent ${requestObj.password}`);
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

  if (requestObj.contact && isEmail(requestObj.contact.email) === false) {
    errors.push(`contact.email is invalid. You sent ${requestObj.contact.email}`);
  }

  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  } else {
    return true;
  }
}
