import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EventRegistrationService } from '@app/event-registration';
import {
  BaseComponent,
  EVENTS,
  NUMBERS,
  SECURELS_MODULE_NAME,
} from '@app/shared';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Subscription } from 'rxjs';
import SecureLS from 'secure-ls';

@Component({
  selector: 'app-event-member-verify',
  templateUrl: './event-member-verify.component.html',
  styleUrl: './event-member-verify.component.scss',
})
export class EventMemberVerifyComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public saveEventAttendingMobileVerify: FormGroup;
  public submitted: boolean;
  public eventId: string;
  public uuid: string;
  public refer: string;
  private ls = new SecureLS();
  private detailComponentSubscription: Subscription = new Subscription();
  constructor(
    private _injector: Injector,
    private _eventRegistrationService: EventRegistrationService
  ) {
    super(_injector);
    this.saveEventAttendingMobileVerify = this._formBuilder.group({});
    this.submitted = false;
    this.eventId = '';
    this.uuid = '';
    this.refer = '';
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.eventId = params['id'];
      this.uuid = params['uuid'];
      this.refer = params['refer'];
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
              this._router.navigate([EVENTS.REDIRECT_MEMBER], {
                queryParams: {
                  id: this.eventId,
                  uuid: this.uuid,
                  memberId: response.data.memberId,
                },
              });
            } else if (response.status === 'Success' && response.data.regId) {
              this.ls.set(
                SECURELS_MODULE_NAME.MEMBER_PERSONAL_INFO,
                response.data
              );
              if (response.data.register === NUMBERS.ONE) {
                this._router.navigate([EVENTS.REDIRECT_MEMBER], {
                  queryParams: {
                    id: this.eventId,
                    uuid: this.uuid,
                    memberId: response.data.memberId,
                  },
                });
              } else if (response.data.register === NUMBERS.TWO) {
                this._router.navigate([EVENTS.REDIRECT_ALREADY_REGISTER], {
                  queryParams: {
                    id: this.eventId,
                    uuid: this.uuid,
                    memberId: response.data.memberId,
                  },
                });
              }
            }
          },
          error: (error: HttpErrorResponse) => {
            if (error.error.status === 'Member not found') {
              this._router.navigate([EVENTS.REDIRECT_REGISTER], {
                queryParams: {
                  id: this.eventId,
                  uuid: this.uuid,
                  mobile:
                    this.saveEventAttendingMobileVerifyControls['mobile'].value,
                },
              });
            }
          },
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
