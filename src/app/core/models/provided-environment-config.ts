import { InjectionToken } from '@angular/core';

import { EnvironmentConfig } from './environment-config';

export const ProvideEnvironmentConfig = new InjectionToken<EnvironmentConfig>(
  'EnvironmentConfig'
);
