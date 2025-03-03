import { Component, Injector, OnDestroy, OnInit } from '@angular/core';

import {
  BaseComponent,
  EVENT_REGISTRATION_MODULE,
} from '@shared/index';

@Component({
  selector: 'app-event-registration-image',
  templateUrl: './event-registration-image.component.html',
  styleUrl: './event-registration-image.component.scss',
})
export class EventRegistrationImageComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public eventId: string;
  public uuid: string;
  public refer: string;
  public eventImage: string;
  constructor(
    protected injector: Injector,
  ) {
    super(injector);
    this.eventId = '';
    this.uuid = '';
    this.eventImage = 'assets/images/bg.svg';
    this.refer = '';
  }

  ngOnInit(): void {
  }

  public redirectToVerifyPage(): void {
    this._router.navigate([EVENT_REGISTRATION_MODULE.REDIRECT_DETAILS]);
  }


  ngOnDestroy(): void {
  }
}
