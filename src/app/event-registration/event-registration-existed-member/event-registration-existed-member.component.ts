import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent, EVENT_REGISTRATION_MODULE, SECURELS_MODULE_NAME } from '@app/shared';
import { Subscription } from 'rxjs';
import { EventRegistrationService } from '../service/event-registration.service';
import SecureLS from 'secure-ls';
import { SaveDetailsExistedMemberRequest } from '../models/save-details-existed-member.model';
import { memberPersonalInfo } from '../models/member-personal-info.model';
import { RegisteredMemberResponse } from '..';

@Component({
  selector: 'app-event-registration-existed-member',
  templateUrl: './event-registration-existed-member.component.html',
  styleUrl: './event-registration-existed-member.component.scss'
})
export class EventRegistrationExistedMemberComponent extends BaseComponent
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
      this.memberPersonalInfo = this.ls.get(SECURELS_MODULE_NAME.MEMBER_PERSONAL_INFO);
    }
  }


  // tslint:disable-next-line
  public isInvalidError(error: any): boolean {
    return this.submitted && error;
  }

  public redirectBackToVerify(): void {
    this._router.navigate([EVENT_REGISTRATION_MODULE.REDIRECT_VERIFY], {
      queryParams: { id: this.eventId, uuid: this.uuid, refer: this.refer },
    });
  }

  public saveExistedMemberForm(): void {
    let memberequestObject = {} as SaveDetailsExistedMemberRequest;
    if (this.refer) {
      memberequestObject = {
        memberId: this.memberId,
        refererCode: this.refer,
      }
    } else {
      memberequestObject = {
        memberId: this.memberId
      }
    }
    this.detailComponentSubscription.add(
      this._eventRegistrationService
        .registerExistedMember(this.eventId, this.uuid, memberequestObject)
        .subscribe((response: RegisteredMemberResponse) => {
          this.ls.set(SECURELS_MODULE_NAME.REGISTERED_MEMBER_INFO, response)
          this._router.navigate([EVENT_REGISTRATION_MODULE.REDIRECT_THANK_YOU], {
            queryParams: { id: this.eventId, uuid: this.uuid },
          });
        })
    );
  }

  ngOnDestroy(): void { }
}
