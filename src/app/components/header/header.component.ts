import { Router } from '@angular/router';
import { UserLocalStorage } from './../../core/models/UserLocalStorage';
import { LocalStorageService } from './../../services/local-storage/local-storage.service';
import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  userInfo: UserLocalStorage;
  url: string = '';
  constructor(private router: Router, private _localStorage: LocalStorageService) {
    this.userInfo = _localStorage.getUser();
   }

  ngDoCheck(): void {
    this.url = this.router.url;
  }

  ngOnInit() {
    this.url = this.router.url;
  }

  logout () {
    this._localStorage.removeUser();
    this.router.navigate(['/sign-in']);
  }
}
