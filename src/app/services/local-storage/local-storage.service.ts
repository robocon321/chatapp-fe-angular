import { UserLocalStorage } from '../../core/models/UserLocalStorage';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private USER_KEY = environment.USER_KEY;

  constructor() { }

  public getUser(): any {
    return JSON.parse(localStorage.getItem(this.USER_KEY) || "null");
  }

  public setUser(user: UserLocalStorage): any {
    localStorage.removeItem(this.USER_KEY);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public removeUser() {
    localStorage.removeItem(this.USER_KEY);
  }
}
