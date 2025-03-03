import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import {
  GetMasterResponse,
  VaktaDetailsConfig,
  EventRegistrationService,
  SaveDetailsRequest,
  GetEventDetailsResponse,
  RegisteredMemberResponse,
} from '@app/event-registration';
import { BaseComponent, EVENTS, SECURELS_MODULE_NAME } from '@app/shared';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Subscription } from 'rxjs';
import SecureLS from 'secure-ls';

@Component({
  selector: 'app-event-member-register',
  templateUrl: './event-member-register.component.html',
  styleUrl: './event-member-register.component.scss',
})
export class EventMemberRegisterComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public eventId: string;
  public uuid: string;
  public refer: string;
  public areYouAttendingSabha: boolean = false;
  public isNextPage: boolean = false;
  public saveEventAttendingPersonDetails: FormGroup;
  public submitted: boolean;
  public sabhaList: Array<GetMasterResponse> = [];
  public address: string | VaktaDetailsConfig;
  public eventDate: string;
  private detailComponentSubscription: Subscription = new Subscription();
  private ls: SecureLS = new SecureLS();
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
    if (!this.isNextPage) {
      this._router.navigate([EVENTS.REDIRECT_VERIFY], {
        queryParams: { id: this.eventId, uuid: this.uuid },
      });
    } else {
      this.isNextPage = !this.isNextPage;
    }
  }
  public changeDob(d: any): void {
    this.saveEventAttendingPersonDetailsControls['DOB'].setValue(d);
  }

  public saveRegisterForm(event: any): void {
    let _fc = this.saveEventAttendingPersonDetailsControls;
    if (_fc['firstName'].value && _fc['lastName'].value) {
      this.isNextPage = true;
    }
    if (this.saveEventAttendingPersonDetails.invalid) {
      this.submitted = true;
      this.saveEventAttendingPersonDetails.markAllAsTouched();
      return;
    }
    let requestObject = {
      refererCode: this.refer,
      ...this.saveEventAttendingPersonDetails.value,
    } as SaveDetailsRequest;
    requestObject.firstName = `${this.saveEventAttendingPersonDetails.value.firstName}`;
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
        .subscribe((response: RegisteredMemberResponse) => {
          this.ls.set(SECURELS_MODULE_NAME.REGISTERED_MEMBER_INFO, response);
          this.ls.set(SECURELS_MODULE_NAME.EVENT_DETAILS, {
            eventId: this.eventId,
            uuid: this.uuid,
          });
          window.location.replace('https://rzp.io/l/CaK33eE5n');
          this.saveEventAttendingPersonDetails.reset();
        })
    );
  }

  private getMaster(): void {
    const paramId = 'sabha_id';
    this.detailComponentSubscription.add(
      this._eventRegistrationService
        .getMaster(this.eventId, this.uuid, paramId)
        .subscribe({
          next: (response: Array<GetMasterResponse>) => {
            if (response && response.length > 0) {
              this.sabhaList = response;
            }
          },
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
      DOB: [null, [RxwebValidators.required()]],
      refName: [null, []],
      sabhaId: [null, []],
      email: ['', []],
      gender: ['Male', []],
    });
  }

  private getEventInfo(): void {
    this.detailComponentSubscription.add(
      this._eventRegistrationService
        .getEventInfo(this.eventId, this.uuid)
        .subscribe((response: GetEventDetailsResponse) => {
          if (response.eventConfig.length > 0) {
            for (let eventConfig of response.eventConfig) {
              if (eventConfig.paramId === 'invite_msg') {
                this.address = eventConfig.values;
              }
              this.eventDate = response.eventStartDate;
            }
          }
        })
    );
  }

  public isMemberAttendingSabha(event: any) {
    console.log(event.target.checked);

    this.areYouAttendingSabha = event.target.checked;
  }

  ngOnDestroy(): void {}
}
