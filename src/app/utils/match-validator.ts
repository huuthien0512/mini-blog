import { FormGroup } from '@angular/forms';

export function matchValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (!control || !matchingControl) {
      return;
    }
    if (
      control.value &&
      matchingControl.value &&
      control.value !== matchingControl.value
    ) {
      matchingControl.setErrors({ match: true });
    } else {
      delete matchingControl.errors?.['match'];
    }
  };
}
