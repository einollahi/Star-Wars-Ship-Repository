import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './../services/token.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private tokenSrevice: TokenService) {}

  intercept<T>(
    request: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    const token = this.tokenSrevice.getToken();

    const clonedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: token ? 'Bearer ' + token : '',
      },
    });

    return next.handle(clonedRequest);
  }
}
