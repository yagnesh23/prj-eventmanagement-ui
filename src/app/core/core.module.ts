import {
  LOCALE_ID,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import localeHi from '@angular/common/locales/en-IN';
import { registerLocaleData } from '@angular/common';

import {
  SessionStorageServiceClass,
  BasicAuthInterceptor,
  ErrorInterceptor,
  WindowFactory,
  WindowWrapper,
} from '@app/core';

registerLocaleData(localeHi);

@NgModule()
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Import CoreModule in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: LOCALE_ID, useValue: 'en_IN' },
        SessionStorageServiceClass,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: BasicAuthInterceptor,
          multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: WindowWrapper, useFactory: WindowFactory },
      ],
    };
  }
}
