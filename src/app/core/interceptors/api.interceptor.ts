import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

const BASE_URL = 'http://localhost:3000';

export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  let modifiedReq = req.clone({
    url: req.url.startsWith('http') ? req.url : `${BASE_URL}/${req.url}`,
    setHeaders: {
      'Content-Type': 'application/json'
    }
  });


  if (!req.url.includes('login') && !req.url.includes('users')) {
    const token = localStorage.getItem('authToken');
    if (token) {
      modifiedReq = modifiedReq.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(modifiedReq).pipe(
    catchError((error) => {
      console.error('API Error:', error);
      return throwError(() => error);
    })
  );
};
