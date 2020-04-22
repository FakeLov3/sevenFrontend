import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../auth/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(private authenticationService: AuthenticationService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(err => {
                if (err.status === 401) {
                //auto logout se for true
                this.authenticationService.logout();
                location.reload(true);
                }

                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        );
    }
}