import { UserLocalStorage } from './../../core/models/UserLocalStorage';
import { LocalStorageService } from './../local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild {
  private USER_KEY = environment.USER_KEY;

  constructor(private route: Router, private _token: LocalStorageService) {

  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const userInfo: UserLocalStorage = JSON.parse(localStorage[this.USER_KEY] || null);
    if(userInfo == null) {
      this.route.navigate(['/sign-in']);
      return false;
    } else {
      const firstPath = route.url.length == 0 ? '' : route.url[0].path;
      if(userInfo.role == 'ADMIN' && !firstPath.startsWith('admin')) {
        this.route.navigate(['/admin']);
        return false;
      }
      if(userInfo.role == 'CLIENT' && firstPath.startsWith('admin')) {
        this.route.navigate(['/']);
        return false;
      }
      return true;
    }
  }

}
