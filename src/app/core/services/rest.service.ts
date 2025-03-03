import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { EnvironmentConfigService } from './environment-config.service';

@Injectable({ providedIn: 'root' })
export class RestService {
  public isSavingProgressBehaviorSubject: Subject<boolean> = new Subject<boolean>();
  constructor(
    protected http: HttpClient,
    protected environmentConfigService: EnvironmentConfigService,
    private router: Router
  ) { }

  /**
   * Performs a GET request to a given endpoint
   * @param endpoint points to the key in config.json > endpointConfiguration. If explicitly null then this will be ignored
   * @param path
   * @param options
   */
  get(
    endpoint: string | null,
    path: string,
    options?: object
  ): Observable<any> {
    // this.isSavingProgressBehaviorSubject.next(true);
    return this.http.get(this.getEndpoint(endpoint) + path, options).pipe(
      catchError((e) => {
        this.isSavingProgressBehaviorSubject.next(false);
        return e;
      }),
      map((response: any) => {
        this.isSavingProgressBehaviorSubject.next(false);
        return response;
      }),
      take(1)
    );
  }

  /**
    * Performs a GET request to a given endpoint
    * @param endpoint points to the key in config.json > endpointConfiguration. If explicitly null then this will be ignored
    * @param path
    * @param params
    */
  public getDataWithParams(endpoint: string | null, path: string, options: any) {
    return this.http.get(this.getEndpoint(endpoint) + path, options).pipe(
      catchError((e) => {
        this.isSavingProgressBehaviorSubject.next(false);
        return e;
      }),
      map((response: any) => {
        this.isSavingProgressBehaviorSubject.next(false);
        return response;
      }),
      take(1)
    );
  }

  /**
   * Performs a POST request to a given endpoint
   * @param endpoint points to the key in config.json > endpointConfiguration. If explicitly null then this will be ignored
   * @param path
   * @param body
   * @param options
   */
  post(
    endpoint: string | null,
    path: string,
    body: any,
    options?: object
  ): Observable<any> {
    this.isSavingProgressBehaviorSubject.next(true);
    return this.http
      .post(this.getEndpoint(endpoint) + path, body, options)
      .pipe(
        catchError((e) => {
          this.isSavingProgressBehaviorSubject.next(false);
          return e;
        }),
        map((response: any) => {
          this.isSavingProgressBehaviorSubject.next(false);
          return response;
        }),
        take(1)
      );
  }
  /**
   * Performs a POST request to a given endpoint
   * @param endpoint points to the key in config.json > endpointConfiguration. If explicitly null then this will be ignored
   * @param path
   * @param body
   * @param options
   */
  patch(
    endpoint: string | null,
    path: string,
    body: any,
    options?: object
  ): Observable<any> {
    this.isSavingProgressBehaviorSubject.next(true);
    return this.http
      .patch(this.getEndpoint(endpoint) + path, body, options)
      .pipe(
        catchError((e) => {
          this.isSavingProgressBehaviorSubject.next(false);
          return e;
        }),
        map((response: any) => {
          this.isSavingProgressBehaviorSubject.next(false);
          return response;
        }),
        take(1)
      );
  }
  /**
   * Performs a PUT request to a given endpoint
   * @param endpoint points to the key in config.json > endpointConfiguration. If explicitly null then this will be ignored
   * @param path
   * @param body
   * @param options
   */
  put(
    endpoint: string | null,
    path: string,
    body: any,
    options?: object
  ): Observable<any> {
    this.isSavingProgressBehaviorSubject.next(true);
    return this.http.put(this.getEndpoint(endpoint) + path, body, options).pipe(
      catchError((e) => {
        this.isSavingProgressBehaviorSubject.next(false);
        return e;
      }),
      map((response: any) => {
        this.isSavingProgressBehaviorSubject.next(false);
        return response;
      }),
      take(1)
    );
  }

  /**
   * Performs a PUT request to a given endpoint
   * @param endpoint points to the key in config.json > endpointConfiguration. If explicitly null then this will be ignored
   * @param path
   * @param options
   */
  delete(
    endpoint: string | null,
    path: string,
    options?: object
  ): Observable<any> {
    // this.isSavingProgressBehaviorSubject.next(true);
    return this.http.delete(this.getEndpoint(endpoint) + path, options).pipe(
      catchError((e) => {
        this.isSavingProgressBehaviorSubject.next(false);
        return e;
      }),
      map((response: any) => {
        this.isSavingProgressBehaviorSubject.next(false);
        return response;
      }),
      take(1)
    );
  }

  private getEndpoint(endpoint: string | null): string {
    if (endpoint === null) {
      return '';
    } else {
      return this.environmentConfigService.getEndpoint(endpoint);
    }
  }
}
