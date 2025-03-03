import { InjectionToken } from '@angular/core';

export const ENVIRONMENT_CONFIG = new InjectionToken<EnvironmentConfig>('EnvironmentConfig');

export interface EnvironmentConfig {
  apiUrl: string;
  imageBaseHref: string;
}
