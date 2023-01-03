import { UserLocalStorage } from './../../core/models/UserLocalStorage';
import { LoginRequest } from './../../core/models/LoginRequest';
import { LocalStorageService } from './../local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  constructor(private _api: ApiService, private _token: LocalStorageService) { 
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this._api
    .post('http://localhost:8080/sign-in', loginRequest)
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
