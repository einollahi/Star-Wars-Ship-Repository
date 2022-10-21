/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

interface IParam {
  [param: string]: string | number | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly API_URL = 'https://swapi.dev/api';

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  public get<T>(url: string, params: IParam = {}): Observable<T> {
    this.loadingService.enable();

    const httpParams: IParam = {};
    for (const param in params) {
      httpParams[param] = String(params[param]);
    }

    return this.http
      .get<T>(this.API_URL + url, {
        params: httpParams,
      })
      .pipe(
        finalize(() => {
          this.loadingService.disable();
        })
      );
  }

  public post<T, D>(url: string, data: D): Observable<T> {
    return this.http.post<T>(`${this.API_URL}${url}`, data);
  }

  public put<T, D>(url: string, payload: D): Observable<T> {
    this.loadingService.enable();
    return this.http.put<T>(this.API_URL + url, payload).pipe(
      finalize(() => {
        this.loadingService.disable();
      })
    );
  }

  public patch<T, D>(url: string, payload: D): Observable<T> {
    this.loadingService.enable();
    return this.http.patch<T>(this.API_URL + url, payload).pipe(
      finalize(() => {
        this.loadingService.disable();
      })
    );
  }

  public delete<T>(url: string): Observable<T> {
    this.loadingService.enable();
    return this.http.delete<T>(this.API_URL + url).pipe(
      finalize(() => {
        this.loadingService.disable();
      })
    );
  }
}
