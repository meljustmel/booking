import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

export class ValueValidators {
  static checkValue(formGroup: FormGroup) {
    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];
        if (control.value) {
          return null;
        }
      }
    }

    return {
      validateValue: {
        valid: false
      }
    };
  }
}

