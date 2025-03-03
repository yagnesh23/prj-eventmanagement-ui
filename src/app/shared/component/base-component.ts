import { Component, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, DecimalPipe, Location } from '@angular/common';

import { EnvironmentConfigService, RestService } from '@core/index';
import Url from '@shared/_helpers/url';

@Component({
  selector: 'app-base',
  template: ``,
})
export class BaseComponent {
  protected url = Url;
  protected _router: Router;
  protected _location: Location;
  protected _activatedRoute: ActivatedRoute;
  protected _environmentConfigService: EnvironmentConfigService;
  protected _restService: RestService;
  protected _formBuilder: FormBuilder;
  protected _decimalPipe: DecimalPipe;
  protected _datePipe: DatePipe;

  constructor(injector: Injector) {
    this._router = injector.get(Router);
    this._activatedRoute = injector.get(ActivatedRoute);
    this._environmentConfigService = injector.get(EnvironmentConfigService);
    this._restService = injector.get(RestService);
    this._formBuilder = injector.get(FormBuilder);
    this._location = injector.get(Location);
    this._decimalPipe = injector.get(DecimalPipe);
    this._datePipe = injector.get(DatePipe);
  }
}
