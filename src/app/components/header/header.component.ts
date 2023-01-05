import { Router } from '@angular/router';
import { UserLocalStorage } from './../../core/models/UserLocalStorage';
import { LocalStorageService } from './../../services/local-storage/local-storage.service';
import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges, DoCheck {
  userInfo: UserLocalStorage;
  url: string = '';
  constructor(private router: Router, private _localStorage: LocalStorageService) {
    this.userInfo = _localStorage.getUser();
   }

  ngDoCheck(): void {
    console.log("Do Check", this.url);
    this.url = this.router.url;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Change", this.url);
  }

  ngOnInit() {
    this.url = this.router.url;
    console.log("Init", this.url);
  }

  logout () {
    this._localStorage.removeUser();
    this.router.navigate(['/sign-in']);
  }
}
