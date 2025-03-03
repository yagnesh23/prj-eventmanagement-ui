import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent, SECURELS_MODULE_NAME } from '@app/shared';
import { environment } from 'environments/environment';
import SecureLS from 'secure-ls';
import { RegisteredMemberResponse } from '../models/registered-member-response.model';
import { EventRegistrationService } from '../service/event-registration.service';
import { Subscription } from 'rxjs';
import { GetReferenceResponse } from '../models/get-reference-response.model';
import { SuccessResponse } from '@app/core';
import {GetEventDetailsResponse} from "@app/event-registration";

@Component({
  selector: 'app-event-registration-already-member-screen',
  templateUrl: './event-registration-already-member-screen.component.html',
  styleUrl: './event-registration-already-member-screen.component.scss'
})
export class EventRegistrationAlreadyMemberScreenComponent extends BaseComponent
  implements OnInit, OnDestroy {
  public registeredMemberInfo: RegisteredMemberResponse;
  public eventId: string;
  public memberId: string;
  public uuid: string;
  public refer: string;
  public referenceList: Array<GetReferenceResponse>;
  public eventInfo: GetEventDetailsResponse;
  private ls: SecureLS = new SecureLS();
  private detailComponentSubscription: Subscription = new Subscription();
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
    this.referenceList = [];
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.eventId = params['id'];
      this.uuid = params['uuid'];
      this.memberId = params['memberId'];
      this.refer = params['refer'];
    });
    this.eventInfo = this.ls.get(SECURELS_MODULE_NAME.EVENT_INFO);
    if (this.ls.get(SECURELS_MODULE_NAME.REGISTERED_MEMBER_INFO)) {
      this.registeredMemberInfo = this.ls.get(
        SECURELS_MODULE_NAME.REGISTERED_MEMBER_INFO
      );
      console.log(this.eventInfo)
      // this.getReferenceList();
    }
  }

  private getReferenceList() {
    this.detailComponentSubscription.add(
      this._eventRegistrationService
        .getReferenceList(this.eventId, this.uuid, this.registeredMemberInfo.regId.toString())
        .subscribe({
          next: (response: Array<GetReferenceResponse>) => {
            if (response.length > 0) {
              this.referenceList = response;
            }
          }
        })
    );
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

  sendReferenceListOnWhatsApp(): void {
    this._eventRegistrationService.shareOnWhatsApp(this.formatMessage(), undefined);
  }

  formatMessage(): string {
    let message = `Jai Swaminarayan Das na Das\nReference List:\n`;
    this.referenceList.forEach((row: GetReferenceResponse) => {
      if (row.register === 1) {
        message += '-----------------------------\n';
        message += 'Pending List\n';
        message += '-----------------------------\n';
      } else if (row.register === 2) {
        message += '-----------------------------\n';
        message += 'Completed List\n';
        message += '-----------------------------\n';
      } else {
        message += '-----------------------------\n';
        message += 'Cancelled List\n';
        message += '-----------------------------\n';
      }
      message += `${row.firstName} ${row.lastName} | ${row.mobile}\n`;
    });
    return message;
  }


  ngOnDestroy(): void { }
}
