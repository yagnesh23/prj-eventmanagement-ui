import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

import { CoreModule } from '@core/core.module';

import { SharedModule } from '@shared/index';

import { ToastrModule } from 'ngx-toastr';

import { ENVIRONMENT_CONFIG, EnvironmentConfig } from './core/tokens/environment-config.token';

const environmentConfig: EnvironmentConfig = {
  apiUrl: 'https://api.example.com',
  imageBaseHref: 'https://images.example.com/'
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    HttpClientModule,
    CoreModule.forRoot(),
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: ENVIRONMENT_CONFIG, useValue: environmentConfig }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
