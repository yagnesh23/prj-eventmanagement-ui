import { Component, Injector, OnDestroy, OnInit } from '@angular/core';

import { BaseComponent, SECURELS_MODULE_NAME } from '@shared/index';

import SecureLS from 'secure-ls';
import {EventRegistrationService, GetEventDetailsResponse, RegisteredMemberResponse} from '..';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-event-registration-thank-you-screen',
  templateUrl: './event-registration-thank-you-screen.component.html',
  styleUrl: './event-registration-thank-you-screen.component.scss',
})
export class EventRegistrationThankYouScreenComponent
  extends BaseComponent
  implements OnInit, OnDestroy {
  public registeredMemberInfo: RegisteredMemberResponse;
  public eventId: string;
  public memberId: string;
  public uuid: string;
  public refer: string;
  public eventInfo: GetEventDetailsResponse
  private ls: SecureLS = new SecureLS();
  constructor(
    protected _injector: Injector,
    private _eventRegistrationService: EventRegistrationService
  ) {
    super(_injector);
    this.registeredMemberInfo = {} as RegisteredMemberResponse;
    this.eventInfo = {} as GetEventDetailsResponse;
    this.eventId = '';
    this.uuid = '';
    this.memberId = '';
    this.refer = '';
  }

  ngOnInit(): void {
    this.eventInfo = {
      eventStartDate: '2025-03-17 20:30:00',
        } as any;
    if (this.ls.get(SECURELS_MODULE_NAME.REGISTERED_MEMBER_INFO)) {
      this.registeredMemberInfo = this.ls.get(
        SECURELS_MODULE_NAME.REGISTERED_MEMBER_INFO
      );
    }
  }

  sendLinkOnWhatsApp(): void {
    let url = '/event/info';
    if (environment.production) {
      url = '/event-registration/event/info';
    }
    const message = `Jai Swaminarayan Das na Das
    \nI registered for *Picnic* on *${this.registeredMemberInfo.regDate}*
    \nKindly get your self register with my referral link and join us
    \n*${window.location.origin}${url}?id=${this.eventId}&uuid=${this.uuid}&refererCode=${this.registeredMemberInfo.refererCode}*
    \n*${this.registeredMemberInfo.firstName} ${this.registeredMemberInfo.lastName}*`;
    this._eventRegistrationService.shareOnWhatsApp(message, undefined);
  }
  ngOnDestroy(): void { }
}
