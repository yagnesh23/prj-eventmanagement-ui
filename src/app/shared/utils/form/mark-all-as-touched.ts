import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export function markAllAsTouched(control: AbstractControl | null): void {
  if (!!control) {
    control.markAsTouched();
    if (control instanceof FormGroup || control instanceof FormArray) {
      for (const childName of Object.keys(control.controls)) {
        markAllAsTouched(control.controls[childName as keyof unknown]);
      }
    }
  }
}
