import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from '../../services/toast.service';

const BASE_URL = 'http://localhost:3000';

export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const toastService = inject(ToastService);

  let modifiedReq = req.clone({
    url: req.url.startsWith('http') ? req.url : `${BASE_URL}/${req.url}`,
    setHeaders: {
      'Content-Type': 'application/json'
    }
  });

  return next(modifiedReq).pipe(
    catchError((error) => {
      toastService.showToast('Something went wrong', 'danger');
      return throwError(() => error);
    })
  );
};
