import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import Url from '@shared/_helpers/url';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    // const currentUser = this._authenticationService.currentUserValue;
    // if (currentUser && currentUser.token != null) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${currentUser.token}`
    //     },
    //   });
    // }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        // headers: request.headers.set('Content-Type', 'application/json'),
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body && event.body.success) {
            // this.toastr.successToastr(event.body.success,event.body.message);
          }
        }
        return event;
      })
    );
  }
}
