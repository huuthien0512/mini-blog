import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DialogService } from '../services/dialog.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private dialogService: DialogService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const basicAuth = this.storageService.getBasicAuth();
    if (basicAuth) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuth,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 0) {
          this.dialogService.openInfoDialog(
            'Information',
            'Server not found ⊙﹏⊙∥!'
          );
        }
        return throwError(() => error);
      })
    );
  }
}
