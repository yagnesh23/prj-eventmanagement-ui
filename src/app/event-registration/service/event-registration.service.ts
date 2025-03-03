import { Injectable, Injector } from '@angular/core';

import { Observable, map } from 'rxjs';

import { EVENT, REG_ID, REPLACE_ID, STATUS } from '@app/constant';

import { SuccessResponse } from '@core/index';

import { BaseComponent } from '@shared/index';

import {
  GetEventDetailsResponse,
  GetMasterResponse,
  RegisteredMemberResponse,
  SaveDetailsRequest,
  VerifyMobileDataResponse,
  SaveDetailsExistedMemberRequest,
  GetReferenceResponse,
} from '..';

@Injectable({
  providedIn: 'root',
})
export class EventRegistrationService extends BaseComponent {
  constructor(protected injector: Injector) {
    super(injector);
  }

  public getEventInfo(
    id: string,
    uuid: string
  ): Observable<GetEventDetailsResponse> {
    const url = this.url.GET_EVENT_INFO.replace(REPLACE_ID, id);
    return this._restService
      .get(EVENT, url, {
        headers: {
          uuid: uuid,
        },
      })
      .pipe(
        map((response: SuccessResponse<GetEventDetailsResponse>) => {
          return response.data;
        })
      );
  }

  public getMaster(
    id: string,
    uuid: string,
    parmaId: string
  ): Observable<Array<GetMasterResponse>> {
    const url = this.url.GET_MASTER.replace(REPLACE_ID, id);
    return this._restService
      .get(EVENT, url, {
        params: { parmaId: parmaId },
        headers: {
          uuid: uuid,
        },
      })
      .pipe(
        map((response: SuccessResponse<Array<GetMasterResponse>>) => {
          return response.data;
        })
      );
  }

  public saveDetail(
    id: string,
    uuid: string,
    requestObject: SaveDetailsRequest
  ): Observable<RegisteredMemberResponse> {
    const url = this.url.REGISTER_MEMBER.replace(REPLACE_ID, id);
    return this._restService
      .post(EVENT, url, requestObject, {
        headers: {
          uuid: uuid,
        },
      })
      .pipe(
        map((response: SuccessResponse<RegisteredMemberResponse>) => {
          return response.data;
        })
      );
  }

  public setPaymentStatus(
    id: string,
    uuid: string,
    regId: string,
    status: string
  ): Observable<RegisteredMemberResponse> {
    const url = this.url.SET_MEMBER_PAYMENT_STATUS.replace(REPLACE_ID, id)
      .replace(REG_ID, regId)
      .replace(STATUS, status);
    return this._restService
      .post(
        EVENT,
        url,
        {},
        {
          headers: {
            uuid: uuid,
          },
        }
      )
      .pipe(
        map((response: SuccessResponse<RegisteredMemberResponse>) => {
          return response.data;
        })
      );
  }

  public verifyMobileNumber(
    id: string,
    uuid: string,
    mobile: number
  ): Observable<SuccessResponse<VerifyMobileDataResponse>> {
    const url = this.url.VERIFY_MEMBER_MOBILE_NUMBER.replace(REPLACE_ID, id);
    return this._restService
      .getDataWithParams(EVENT, url, {
        headers: {
          uuid: uuid,
        },
        params: {
          mobile: mobile,
        },
      })
      .pipe(
        map((response: SuccessResponse<VerifyMobileDataResponse>) => {
          return response;
        })
      );
  }

  public registerExistedMember(
    id: string,
    uuid: string,
    requestObject: SaveDetailsExistedMemberRequest
  ): Observable<RegisteredMemberResponse> {
    const url = this.url.REGISTER_MEMBER.replace(REPLACE_ID, id);
    return this._restService
      .post(EVENT, url, requestObject, {
        headers: {
          uuid: uuid,
        },
      })
      .pipe(
        map((response: SuccessResponse<RegisteredMemberResponse>) => {
          return response.data;
        })
      );
  }

  public getReferenceList(
    id: string,
    uuid: string,
    regId: string
  ): Observable<Array<GetReferenceResponse>> {
    const url = this.url.GET_MEMBER_REFERENCES_LIST.replace(
      REPLACE_ID,
      id
    ).replace(REG_ID, regId);
    return this._restService
      .get(EVENT, url, {
        headers: {
          uuid: uuid,
        },
      })
      .pipe(
        map((response: SuccessResponse<Array<GetReferenceResponse>>) => {
          return response.data;
        })
      );
  }

  /**
   * Send the whatsapp message
   * @param  {string} message
   * @param  {any} mobile
   */
  public shareOnWhatsApp(message: string, mobile: any) {
    if (message == undefined || message == '') return;
    if (mobile == undefined) {
      window.location.href =
        'whatsapp://send?text=' + encodeURIComponent(message);
    } else {
      window.location.href =
        'whatsapp://send?phone=91' +
        mobile +
        '&text=' +
        encodeURIComponent(message);
    }
  }
}
