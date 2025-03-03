import { Component, Injector, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import {
  BaseComponent,
  EVENT_REGISTRATION_MODULE,
  NUMBERS, SECURELS_MODULE_NAME,
} from '@shared/index';

import { EventRegistrationService, GetEventDetailsResponse } from '..';
import { IMAGE_BASE_HREF } from '@app/constant';
import SecureLS from "secure-ls";

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
  private ls: SecureLS = new SecureLS();
  private infoComponentSubscription: Subscription = new Subscription();
  constructor(
    protected injector: Injector,
    private _eventRegistrationService: EventRegistrationService
  ) {
    super(injector);
    this.eventId = '';
    this.uuid = '';
    this.eventImage = 'assets/images/bg.svg';
    this.refer = '';
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.eventId = params['id'];
      this.uuid = params['uuid'];
      this.refer = params['refer'];
      this.getEventInfo();
    });
  }

  public redirectToVerifyPage(): void {
    this._router.navigate([EVENT_REGISTRATION_MODULE.REDIRECT_DETAILS]);
  }

  private getEventInfo(): void {
    this.infoComponentSubscription.add(
      this._eventRegistrationService
        .getEventInfo(this.eventId, this.uuid)
        .subscribe((response: GetEventDetailsResponse) => {
          console.log(response);
          this.ls.set(SECURELS_MODULE_NAME.EVENT_INFO, response);
          for (let eventConfig of response.eventConfig) {
            if (eventConfig.paramId === 'event_image') {
              this.eventImage = `${this._environmentConfigService.getEndpoint(
                IMAGE_BASE_HREF
              )}${eventConfig.values}`;
            }
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.infoComponentSubscription.unsubscribe();
  }
}
