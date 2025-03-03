import { Inject, Injectable } from '@angular/core';

import { ProvideEnvironmentConfig, EnvironmentConfig } from '@core/index';

import { recursiveDeepCopy } from '@shared/index';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentConfigService {
  constructor(
    @Inject(ProvideEnvironmentConfig)
    private _environmentConfig: EnvironmentConfig
  ) {}

  get environmentConfig(): EnvironmentConfig {
    return recursiveDeepCopy(this._environmentConfig);
  }

  getEndpoint(key: string): string {
    if (
      this._environmentConfig.endpointConfiguration &&
      this._environmentConfig.endpointConfiguration[key]
    ) {
      return this._environmentConfig.endpointConfiguration[key];
    }
    throw new Error(`Endpoint ${key} is not configured.`);
  }
}
