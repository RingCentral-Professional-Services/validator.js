import assertString from './util/assertString';

const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])\S{8,}$/, '');

export default function isRingCentralPassword(str) {
  assertString(str);

  return passwordRegex.test(str);
}
