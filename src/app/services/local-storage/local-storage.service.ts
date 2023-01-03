import { UserLocalStorage } from '../../core/models/UserLocalStorage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  USER_KEY = 'USER_KEY';

  constructor() { }

  public getUser(): any {
    return JSON.parse(localStorage.getItem(this.USER_KEY) || "");
  }

  public setUser(user: UserLocalStorage): any {
    localStorage.removeItem(this.USER_KEY);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}
