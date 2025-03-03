import { Component, Injector, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import {
  BaseComponent,
  EVENTS,
  EVENT_REGISTRATION_MODULE,
  NUMBERS,
  SECURELS_MODULE_NAME,
} from '@shared/index';

import SecureLS from 'secure-ls';
import {
  EventRegistrationService,
  RegisteredMemberResponse,
  SaveDetailsExistedMemberRequest,
  memberPersonalInfo,
} from '@app/event-registration';

@Component({
  selector: 'app-event-member-info',
  templateUrl: './event-member-info.component.html',
  styleUrl: './event-member-info.component.scss',
})
export class EventMemberInfoComponent
  extends BaseComponent
  implements OnInit, OnDestroy {
  public eventId: string;
  public memberId: string;
  public uuid: string;
  public refer: string;
  public showThankYouPopUp: boolean = false;
  public submitted: boolean;
  public memberPersonalInfo: memberPersonalInfo;
  private detailComponentSubscription: Subscription = new Subscription();
  private ls: SecureLS = new SecureLS();
  constructor(
    protected _injector: Injector,
    private _eventRegistrationService: EventRegistrationService
  ) {
    super(_injector);
    this.submitted = false;
    this.eventId = '';
    this.uuid = '';
    this.memberId = '';
    this.refer = '';
    this.memberPersonalInfo = {} as memberPersonalInfo;
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.eventId = params['id'];
      this.uuid = params['uuid'];
      this.memberId = params['memberId'];
      this.refer = params['refer'];
    });
    if (this.ls.get(SECURELS_MODULE_NAME.MEMBER_PERSONAL_INFO)) {
      this.memberPersonalInfo = this.ls.get(
        SECURELS_MODULE_NAME.MEMBER_PERSONAL_INFO
      );
    }
  }

  get btnText(): string {
    return this.memberPersonalInfo.register &&
      this.memberPersonalInfo.register === NUMBERS.ONE
      ? 'Make Payment'
      : 'Continue';
  }
  
  // tslint:disable-next-line
  public isInvalidError(error: any): boolean {
    return this.submitted && error;
  }

  public redirectBackToVerify(): void {
    this._router.navigate([EVENTS.REDIRECT_VERIFY], {
      queryParams: { id: this.eventId, uuid: this.uuid },
    });
  }

  public saveExistedMemberForm(): void {
    this.ls.set(SECURELS_MODULE_NAME.EVENT_DETAILS, { eventId: this.eventId, uuid: this.uuid })
    if (this.btnText === 'Make Payment') {
      window.location.replace('https://rzp.io/l/CaK33eE5n');
    } else {
      let memberRequestObject = {} as SaveDetailsExistedMemberRequest;
      if (this.refer) {
        memberRequestObject = {
          memberId: this.memberId,
          refererCode: this.refer,
        };
      } else {
        memberRequestObject = {
          memberId: this.memberId,
        };
      }
      this.detailComponentSubscription.add(
        this._eventRegistrationService
          .registerExistedMember(this.eventId, this.uuid, memberRequestObject)
          .subscribe((response: RegisteredMemberResponse) => {
            this.ls.set(SECURELS_MODULE_NAME.REGISTERED_MEMBER_INFO, response);
            window.location.replace('https://rzp.io/l/CaK33eE5n');
            // this._router.navigate(
            //   [EVENT_REGISTRATION_MODULE.REDIRECT_THANK_YOU],
            //   {
            //     queryParams: { id: this.eventId, uuid: this.uuid },
            //   }
            // );
          })
      );
    }
  }

  ngOnDestroy(): void { }
}
