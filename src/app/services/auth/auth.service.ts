import { LocalStorageService } from './../local-storage/local-storage.service';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string = environment.authUrl;

  constructor(private http: HttpClient, private _localStorage: LocalStorageService) { }

  refreshToken(): Observable<any> {
    return this.http
    .post(`${this.authUrl}/api/auth/refreshAccessToken`, this._localStorage.getUser().refreshToken, {
      responseType: 'text'
    })
    .pipe(catchError((error: any) => {
      return throwError(error.error)
    }));
  }
}
