import { LocalStorageService } from './../../services/local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AssignTokenInterceptor implements HttpInterceptor {
  constructor(private _token: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this._token.getUser();
    if(user != null) {
      const token = 'Bearer ' + this._token.getUser().token;
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', token);
      const authReq = req.clone({headers})  
      return next.handle(authReq);
    } 
    return next.handle(req);
  }
}
