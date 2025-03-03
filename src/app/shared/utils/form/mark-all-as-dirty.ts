import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export function markAllAsDirty(control: AbstractControl | null): void {
  if (!!control) {
    control.markAsDirty();
    if (control instanceof FormGroup || control instanceof FormArray) {
      for (const childName of Object.keys(control.controls)) {
        markAllAsDirty(control.controls[childName as keyof unknown]);
      }
    }
  }
}
