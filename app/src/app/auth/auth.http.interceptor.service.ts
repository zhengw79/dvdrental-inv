import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService {

  constructor(private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const bear_token = localStorage.getItem("access_token");
    const baseUrl = environment.apiUrl;

    if(bear_token) {
      req = req.clone({
        url: `${baseUrl}/${req.url}`,
        responseType: "json",
        setHeaders: {
          Authorization: `Bearer ${bear_token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					this._router.navigate(["/login"]);
				}
				return throwError(error);
			})
    );
  }
}
