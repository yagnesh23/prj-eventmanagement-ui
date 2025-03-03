import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { EnvironmentConfig, ProvideEnvironmentConfig } from '@core/index';

fetch(environment.configJsonPath)
  .then((response) => response.json())
  .then((appConfig: EnvironmentConfig) => {
    if (environment.production) {
      enableProdMode();
    }
    platformBrowserDynamic([
      {
        provide: ProvideEnvironmentConfig,
        useValue: appConfig,
      },
    ])
      .bootstrapModule(AppModule)
      .catch((error) => console.log(error));
  });
