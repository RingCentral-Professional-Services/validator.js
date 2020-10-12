import isMobilePhone from './isMobilePhone';


export default function isRingCentralAdvancedRulePostRequest(requestObj) {
  let errors = [];

  if (typeof requestObj !== 'object') {
    errors.push(`should be an object not ${typeof requestObj}`);
  }

  if (!requestObj.name) {
    errors.push('Custom rules require a name');
  } else if (typeof requestObj.name !== "string") {
    errors.push(`Rule name must be a string, not ${typeof requestObj.name}`);
  }

  if (!requestObj.callers && !requestObj.calledNumber && !requestObj.schedule) {
    errors.push('rules requires at least one trigger. callers, calledNumber, or a schedule');
  }

  if (requestObj.callers) {
    if (!Array.isArray(requestObj.callers)) {
      errors.push(`callers field should be an array`);
    }

    if (Array.isArray(requestObj.callers)) {
      requestObj.callers.forEach(element => {

        if (!element.callerId) {
          errors.push(`callers array elements should have callerId`);
        } else if (!isMobilePhone(element.callerId)) {
          errors.push(`${element.callerId} is not a valid phone number`);
        }

        if (element.name && typeof element.name !== "string") {
          errors.push(`${element.name} should be a string, not ${typeof element.name}`);
        }

      })
    }
  }

  if (requestObj.calledNumber) {
    if (!Array.isArray(requestObj.calledNumber)) {
      errors.push(`calledNumbers field should be an array`);
    }

    if (Array.isArray(requestObj.calledNumber)) {
      requestObj.calledNumber.forEach(element => {

        if (!element.phoneNumber) {
          errors.push(`calledNumber elements should have phoneNumber`);
        } else if (!isMobilePhone(element.phoneNumber)) {
          errors.push(`${element.phoneNumber} is not a valid phone number`);
        }

      })
    }
  }

  if (requestObj.schedule) {
    if (typeof requestObj.schedule !== "object") {
      errors.push(`schedule field should be an object, not ${typeof requestObj.schedule}`);
    }

    if (!requestObj.schedule.weeklyRanges && !requestObj.schedule.ranges) {
      errors.push(`schedule field should have either a weeklyRanges or ranges field`);
    } else if (requestObj.schedule.weeklyRanges && requestObj.schedule.ranges) {
      errors.push(`schedule field should only have a weeklyRanges or ranges field, not both`);
    }

    if (requestObj.schedule.weeklyRanges && typeof requestObj.schedule.weeklyRanges !== "object") {
      errors.push(`weeklyRanges field should be an object, not ${typeof requestObj.schedule.weeklyRanges}`);
    } else if (requestObj.schedule.weeklyRanges) {
      let weekdayArray = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      //TODO
    }
  }

  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  } else {
    return true;
  }
}
