import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { BaseComponent, EVENT_REGISTRATION_MODULE } from '@shared/index';

import {
  EventRegistrationService,
  GetEventDetailsResponse,
  GetMasterResponse, RegisteredMemberResponse,
  SaveDetailsRequest,
  VaktaDetailsConfig,
} from '..';

import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-event-registration-details',
  templateUrl: './event-registration-details.component.html',
  styleUrl: './event-registration-details.component.scss',
})
export class EventRegistrationDetailsComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public eventId: string;
  public uuid: string;
  public refer: string;
  public areYouAttendingSabha: boolean = false;
  public saveEventAttendingPersonDetails: FormGroup;
  public submitted: boolean;
  public sabhaList: Array<GetMasterResponse> = [];
  public address: string | VaktaDetailsConfig;
  public eventDate: string;
  private detailComponentSubscription: Subscription = new Subscription();
  constructor(
    protected _injector: Injector,
    private _eventRegistrationService: EventRegistrationService
  ) {
    super(_injector);
    this.submitted = false;
    this.eventId = '';
    this.address = '';
    this.eventDate = '';
    this.uuid = '';
    this.refer = '';
    this.saveEventAttendingPersonDetails = this._formBuilder.group({});
  }

  ngOnInit(): void {
    this.initFormGroup();
  }

  get saveEventAttendingPersonDetailsControls(): {
    [key: string]: AbstractControl;
  } {
    return this.saveEventAttendingPersonDetails.controls;
  }

  // tslint:disable-next-line
  public isInvalidError(error: any): boolean {
    return this.submitted && error;
  }

  public redirectBackToVerify(): void {
    this._router.navigate([EVENT_REGISTRATION_MODULE.REDIRECT_VERIFY], {
      queryParams: { id: this.eventId, uuid: this.uuid },
    });
  }

  public changeDob(d: any): void {
    this.saveEventAttendingPersonDetailsControls['dateOfBirth'].setValue(d);
  }

  public saveRegisterForm(): void {
    if (this.saveEventAttendingPersonDetails.invalid) {
      this.submitted = true;
      this.saveEventAttendingPersonDetails.markAllAsTouched();
      return;
    }
    let requestObject = {
      refererCode: this.refer,
      ...this.saveEventAttendingPersonDetails.value,
    } as SaveDetailsRequest;
    requestObject.fullName = `${this.saveEventAttendingPersonDetails.value.firstName} ${this.saveEventAttendingPersonDetails.value.middleName} ${this.saveEventAttendingPersonDetails.value.lastName}`;
    requestObject.dateOfBirth = this.saveEventAttendingPersonDetailsControls[
      'dateOfBirth'
    ].value
      .split('/')
      .reverse()
      .join('-');
    console.log(requestObject);
    this.detailComponentSubscription.add(
      this._eventRegistrationService
        .saveDetail(requestObject)
        .subscribe((response: RegisteredMemberResponse) => {
          this.saveEventAttendingPersonDetails.reset();
          this._router.navigate([EVENT_REGISTRATION_MODULE.REDIRECT_THANK_YOU]);
        })
    );
  }

  private initFormGroup(): void {
    this.saveEventAttendingPersonDetails = this._formBuilder.group({
      firstName: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.alpha({ allowWhiteSpace: true }),
          RxwebValidators.maxLength({
            value: 13,
          }),
        ],
      ],
      middleName: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.alpha({ allowWhiteSpace: true }),
          RxwebValidators.maxLength({
            value: 13,
          }),
        ],
      ],
      lastName: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.alpha({ allowWhiteSpace: true }),
          RxwebValidators.maxLength({
            value: 13,
          }),
        ],
      ],
      fullName: [null, []],
      mobileNo: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.numeric(),
          RxwebValidators.minLength({ value: 10 }),
          RxwebValidators.maxLength({ value: 10 }),
        ],
      ],
      emailId: [null, [RxwebValidators.email()]],
      dateOfBirth: [null, [RxwebValidators.required()]],
      referenceName: [null, [RxwebValidators.required()]],
      address: [null, [RxwebValidators.required()]],
    });
  }

  ngOnDestroy(): void {}
}
