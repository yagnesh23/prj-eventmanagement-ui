import { Component, OnInit, OnDestroy, Injector } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { BaseComponent, EVENT_REGISTRATION_MODULE } from '@shared/index';

import {
  EventRegistrationService,
  GetEventDetailsResponse,
  GetMasterResponse,
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
    this._activatedRoute.queryParams.subscribe((params) => {
      this.eventId = params['id'];
      this.uuid = params['uuid'];
      this.refer = params['refer'];
      this.saveEventAttendingPersonDetailsControls['mobile'].setValue(
        params['mobile']
      );
      this.getMaster();
      this.getEventInfo();
    });
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
    this.saveEventAttendingPersonDetailsControls['DOB'].setValue(d);
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
    requestObject.firstName = `${this.saveEventAttendingPersonDetails.value.firstName} ${this.saveEventAttendingPersonDetails.value.middleName}`;
    requestObject.dob = this.saveEventAttendingPersonDetailsControls[
      'DOB'
    ].value
      .split('/')
      .reverse()
      .join('-');
    if (this.areYouAttendingSabha) {
      requestObject.sabhaId =
        this.saveEventAttendingPersonDetails.value.sabhaId;
      requestObject.refName = '';
    } else {
      requestObject.refName =
        this.saveEventAttendingPersonDetails.value.refName;
      requestObject.sabhaId = 0;
    }
    console.log(requestObject);
    this.detailComponentSubscription.add(
      this._eventRegistrationService
        .saveDetail(this.eventId, this.uuid, requestObject)
        .subscribe((response: SaveDetailsRequest) => {
          this.saveEventAttendingPersonDetails.reset();
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
      mobile: [
        null,
        [
          RxwebValidators.required(),
          RxwebValidators.numeric(),
          RxwebValidators.minLength({ value: 10 }),
          RxwebValidators.maxLength({ value: 10 }),
        ],
      ],
      email: [null, [RxwebValidators.email()]],
      DOB: [null, [RxwebValidators.required()]],
      refName: [null, []],
      sabhaId: [null, []],
    });
  }

  private getEventInfo(): void {
    this.detailComponentSubscription.add(
      this._eventRegistrationService
        .getEventInfo(this.eventId, this.uuid)
        .subscribe((response: GetEventDetailsResponse) => {
          for (let eventConfig of response.eventConfig) {
            if (eventConfig.paramId === 'invite_msg') {
              this.address = eventConfig.values;
            }
            this.eventDate = response.eventStartDate;
          }
        })
    );
  }

  ngOnDestroy(): void {}
}
