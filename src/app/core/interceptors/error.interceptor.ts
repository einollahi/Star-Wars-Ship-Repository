import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private message: MessageService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMsg: string =
          error?.error instanceof ErrorEvent
            ? `Error: ${error.error.message}`
            : this.mapServerErrorMessage(error);

        console.warn(errorMsg);
        this.message.error(errorMsg);

        return throwError(() => errorMsg);
      })
    );
  }

  private mapServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return `Bad Request: ${error.message}`;
      case 401:
        return `401 Unauthorized: ${error.message}`;
      case 403:
        return `Forbidden: ${error.message}`;
      case 404:
        return `Not Found: ${error.message}`;
      case 405:
        return `Method Not Allowed: ${error.message}`;
      case 500:
        return `Internal Server Error: ${error.message}`;
      case 501:
        return `Not Implemented: ${error.message}`;
      case 502:
        return `Bad Gateway: ${error.message}`;
      case 503:
        return `Service Unavailable: ${error.message}`;
      case 504:
        return `Gateway Timeout: ${error.message}`;
      default:
        return `Unknown Server Error: ${error.message}`;
    }
  }
}
