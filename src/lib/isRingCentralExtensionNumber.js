let ivrPinRegex = new RegExp(/(111|211|311|411|511|611|711|811|911|988)/, 'i');

export default function isRingCentralExtensionNumber(extensionNumber) {
  return !ivrPinRegex.test(extensionNumber);
}
