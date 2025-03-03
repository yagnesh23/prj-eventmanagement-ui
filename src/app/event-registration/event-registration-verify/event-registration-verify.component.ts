import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import {
  BaseComponent,
  EVENT_REGISTRATION_MODULE,
  SECURELS_MODULE_NAME,
} from '@app/shared';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Subscription } from 'rxjs';
import { GetMasterResponse } from '../models/get-master-response.model';
import { EventRegistrationService } from '../service/event-registration.service';
import SecureLS from 'secure-ls';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-event-registration-verify',
  templateUrl: './event-registration-verify.component.html',
  styleUrl: './event-registration-verify.component.scss',
})
export class EventRegistrationVerifyComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public eventId: string;
  public uuid: string;
  public refer: string;
  public showThankYouPopUp: boolean = true;
  public saveEventAttendingMobileVerify: FormGroup;
  public submitted: boolean;
  public sabhaList: Array<GetMasterResponse> = [];
  private detailComponentSubscription: Subscription = new Subscription();
  private ls = new SecureLS();
  constructor(
    protected _injector: Injector,
    private _eventRegistrationService: EventRegistrationService
  ) {
    super(_injector);
    this.submitted = false;
    this.eventId = '';
    this.uuid = '';
    this.refer = '';
    this.saveEventAttendingMobileVerify = this._formBuilder.group({});
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.eventId = params['id'];
      this.uuid = params['uuid'];
      this.refer = params['refer'];
      this.getMaster();
    });
    this.initFormGroup();
  }

  get saveEventAttendingMobileVerifyControls(): {
    [key: string]: AbstractControl;
  } {
    return this.saveEventAttendingMobileVerify.controls;
  }

  // tslint:disable-next-line
  public isInvalidError(error: any): boolean {
    return this.submitted && error;
  }

  public redirectBackToInfo(): void {
    this._router.navigate([EVENT_REGISTRATION_MODULE.REDIRECT_INFO], {
      queryParams: { id: this.eventId, uuid: this.uuid, refer: this.refer },
    });
  }

  public changeDob(d: any): void {
    this.saveEventAttendingMobileVerifyControls['DOB'].setValue(d);
  }

  public saveVerifyForm(): void {
    if (this.saveEventAttendingMobileVerify.invalid) {
      this.submitted = true;
      this.saveEventAttendingMobileVerify.markAllAsTouched();
      return;
    }

    this.detailComponentSubscription.add(
      this._eventRegistrationService
        .verifyMobileNumber(
          this.eventId,
          this.uuid,
          this.saveEventAttendingMobileVerifyControls['mobile'].value
        )
        .subscribe({
          next: (response) => {
            if (response.status === 'Success' && response.data.memberId) {
              this.ls.set(
                SECURELS_MODULE_NAME.MEMBER_PERSONAL_INFO,
                response.data
              );
              this._router.navigate(
                [EVENT_REGISTRATION_MODULE.REDIRECT_EXISTED_MEMBER],
                {
                  queryParams: {
                    id: this.eventId,
                    uuid: this.uuid,
                    memberId: response.data.memberId,
                    refer: this.refer,
                  },
                }
              );
            } else if (response.status === 'Success' && response.data.regId) {
              this.ls.set(
                SECURELS_MODULE_NAME.REGISTERED_MEMBER_INFO,
                response.data
              );
              this._router.navigate(
                [EVENT_REGISTRATION_MODULE.REDIRECT_ALREADY_MEMBER],
                {
                  queryParams: { id: this.eventId, uuid: this.uuid },
                }
              );
            }
          },
          error: (error: HttpErrorResponse) => {
            if (error.error.status === 'Member not found') {
              this._router.navigate(
                [EVENT_REGISTRATION_MODULE.REDIRECT_DETAILS],
                {
                  queryParams: {
                    id: this.eventId,
                    uuid: this.uuid,
                    mobile:
                      this.saveEventAttendingMobileVerifyControls['mobile']
                        .value,
                    refer: this.refer,
                  },
                }
              );
            }
          },
        })
    );
  }

  private getMaster(): void {
    const paramId = 'sabha_id';
    this.detailComponentSubscription.add(
      this._eventRegistrationService
        .getMaster(this.eventId, this.uuid, paramId)
        .subscribe((response: Array<GetMasterResponse>) => {
          this.sabhaList = response;
        })
    );
  }

  private initFormGroup(): void {
    this.saveEventAttendingMobileVerify = this._formBuilder.group({
      mobile: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.numeric(),
          RxwebValidators.minLength({ value: 10 }),
          RxwebValidators.maxLength({ value: 10 }),
        ],
      ],
    });
  }

  ngOnDestroy(): void {}
}
