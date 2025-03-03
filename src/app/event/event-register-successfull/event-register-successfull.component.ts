import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import {
  EventRegistrationService,
  RegisteredMemberResponse,
} from '@app/event-registration';
import { BaseComponent, SECURELS_MODULE_NAME } from '@app/shared';
import SecureLS from 'secure-ls';

@Component({
  selector: 'app-event-register-successfull',
  templateUrl: './event-register-successfull.component.html',
  styleUrl: './event-register-successfull.component.scss',
})
export class EventRegisterSuccessfullComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public eventId: string;
  public uuid: string;
  public refer: string;
  public loading: boolean;
  private ls: SecureLS = new SecureLS();
  memberPersonalInfo: RegisteredMemberResponse;
  constructor(
    protected injector: Injector,
    private _eventRegistrationService: EventRegistrationService
  ) {
    super(injector);
    this.eventId = '';
    this.uuid = '';
    this.refer = '';
    this.loading = true;
    this.memberPersonalInfo = {} as RegisteredMemberResponse;
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.eventId = params['id'];
      this.uuid = params['uuid'];
      this.refer = params['refer'];
    });

    if (
      !this.eventId &&
      !this.uuid &&
      this.ls.get(SECURELS_MODULE_NAME.EVENT_DETAILS)
    ) {
      const eventDetails = this.ls.get(SECURELS_MODULE_NAME.EVENT_DETAILS);
      this.eventId = eventDetails.eventId;
      this.uuid = eventDetails.uuid;
      this.refer = eventDetails?.refer;
    }

    if (this.ls.get(SECURELS_MODULE_NAME.REGISTERED_MEMBER_INFO)) {
      this.memberPersonalInfo = this.ls.get(
        SECURELS_MODULE_NAME.REGISTERED_MEMBER_INFO
      );
      this.setMemberCompletedStatus();
    }
  }

  private setMemberCompletedStatus(): Error | any {
    if (!this.memberPersonalInfo.regId)
      return new Error('Reg Id is not present');
    console.log(this.eventId, this.uuid, this, this.memberPersonalInfo);
    this._eventRegistrationService
      .setPaymentStatus(
        this.eventId,
        this.uuid,
        this.memberPersonalInfo.regId?.toString(),
        '2'
      )
      .subscribe((response: RegisteredMemberResponse) => {
        this.loading = false;
      });
  }
  ngOnDestroy(): void {}
}
