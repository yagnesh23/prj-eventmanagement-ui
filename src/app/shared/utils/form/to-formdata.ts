import { Generic } from '@app/core';

export function toFormData(formValue: Generic): Generic {
  const formData = new FormData();

  for (const key of Object.keys(formValue)) {
    if (key && formValue[key]) {
      const value = formValue[key];
      formData.append(key, value);
    }
  }

  return formData;
}
