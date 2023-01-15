import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from './../../core/models/LoginRequest';
import { UserLocalStorage } from './../../core/models/UserLocalStorage';
import { LocalStorageService } from './../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  private apiUrl = environment.authUrl;
  constructor(private http: HttpClient, private _token: LocalStorageService) { 
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http
    .post(`${this.apiUrl}/api/auth/sign-in`, loginRequest)
    .pipe(catchError((error: any) => throwError(error.error)))
    .pipe(map((res: any) => {
      const userInfo: UserLocalStorage = {
        token: res.token,
        refreshToken: res.refreshToken,
        email: res.email,
        role: res.roles[0]
      };
      this._token.setUser(userInfo);
      return userInfo;
    }));
  }
}
