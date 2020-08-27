import { Injectable } from '@angular/core';

import 'rxjs/add/operator/do';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http/';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment.prod';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).do((event: any) => {
      if (event instanceof HttpResponse) {
        localStorage.setItem('httpHeaders', event.headers.get('Authorization'));
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 400 || err.status === 0) {
          localStorage.clear();
          window.location.href = environment.url + '/auths/login';
        }
      }
    });
  }
}
