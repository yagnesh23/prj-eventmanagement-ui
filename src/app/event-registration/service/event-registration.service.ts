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

  public saveDetail(
    requestObject: SaveDetailsRequest
  ): Observable<RegisteredMemberResponse> {
    const url = this.url.REGISTER_MEMBER;
    return this._restService
      .post(EVENT, url, requestObject)
      .pipe(
        map((response: SuccessResponse<RegisteredMemberResponse>) => {
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
