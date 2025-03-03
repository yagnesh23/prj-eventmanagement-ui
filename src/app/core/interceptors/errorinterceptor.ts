import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { RestService } from '@core/index';

import { NUMBERS } from '@shared/index';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _restService: RestService,
    private _toastr: ToastrService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        const errorResponse = err;
        this._restService.isSavingProgressBehaviorSubject.next(false);
        if (errorResponse.status === NUMBERS.FOUR_ZERO_THREE) {
          // this._authenticationService.unAuthorize();
        }
        if (errorResponse.status === NUMBERS.FOUR_ZERO_ONE) {
          this.commonErrorHandlerForInformationMessageFormat(errorResponse);
        } else if (errorResponse.status === NUMBERS.FOUR_HUNDERED) {
          this.commonErrorHandlerForInformationMessageFormat(errorResponse);
        } else if (errorResponse.status === NUMBERS.ZERO) {
          this._toastr.error('Internal Server Error', 'Failed', {
            timeOut: NUMBERS.THREE_THOUSAND,
            toastClass: 'toast ngx-toastr',
            closeButton: true,
          });
        } else if (
          errorResponse.status === NUMBERS.FIVE_HUNDERED &&
          errorResponse.statusText === 'Internal Server Error'
        ) {
          this._toastr.error('Internal Server Error', 'Failed', {
            timeOut: NUMBERS.THREE_THOUSAND,
            toastClass: 'toast ngx-toastr',
            closeButton: true,
          });
        } else if (errorResponse.status === NUMBERS.FOUR_ZERO_SIX) {
          this._toastr.error(errorResponse.error.error.error, 'Failed', {
            timeOut: NUMBERS.THREE_THOUSAND,
            toastClass: 'toast ngx-toastr',
            closeButton: true,
          });
        } else if (errorResponse.status === NUMBERS.FOUR_ZERO_FOUR) {
          console.log(errorResponse);
          this.commonErrorHandlerForInformationMessageFormat(errorResponse);
        }
        return throwError(() => this.handleError(errorResponse));
      })
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // just a test ... more could would go here
    return throwError(() => err);
  }

  private commonErrorHandlerForInformationMessageFormat(
    errorResponse: HttpErrorResponse
  ): void {
    if (typeof errorResponse.error.status === 'string') {
      // this._toastr.error(errorResponse.error.status, 'Failed', {
      //   timeOut: NUMBERS.TEN_THOUSAND,
      //   toastClass: 'toast ngx-toastr',
      //   closeButton: true,
      // });
    } else if (errorResponse?.error?.informationMessage) {
      const errorObject = errorResponse?.error?.informationMessage;
      const informationMessage = errorResponse?.error?.informationMessage;
      // this._toastr.error(informationMessage[NUMBERS.ZERO].message, 'Failed', {
      //   timeOut: NUMBERS.TEN_THOUSAND,
      //   toastClass: 'toast ngx-toastr',
      //   closeButton: true,
      // });
    }
  }
}
