import { FormGroup } from '@angular/forms';

export class Utils {
  constructor() {}

  static scrollToFirstInvalidControl(id: string) {
    let form = document.getElementById(id); // <-- your formID
    let firstInvalidControl = form!.getElementsByClassName('ng-invalid')[0];
    firstInvalidControl.scrollIntoView();
    (firstInvalidControl as HTMLElement).focus();
  }

  static commonValidationForForm(error: any, formGroup: FormGroup): FormGroup {
    const errorObject = error?.error?.data;
    if (!errorObject) return formGroup;
    const errorkeys = Object.keys(errorObject);
    const formGroupKeys = Object.keys(formGroup.value);
    for (const keys of errorkeys) {
      if (
        formGroup.value &&
        keys === formGroupKeys[formGroupKeys.indexOf(keys)]
      ) {
        formGroup
          ?.get(formGroupKeys[formGroupKeys.indexOf(keys)])
          ?.setErrors({ custom: errorObject[keys] });
      }
    }
    return formGroup;
  }

  static filter(reqObj: any): any {
    Object.keys(reqObj).forEach(function (key: any): void {
      if (
        reqObj[key] === null ||
        reqObj[key] === 'string' ||
        reqObj[key] === 'undefined'
      ) {
        delete reqObj[key];
      }
    });
    return reqObj;
  }
}
