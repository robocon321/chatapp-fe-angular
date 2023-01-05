import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { observable, Subscriber, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  useLayout: boolean = false;

  constructor(private router: Router) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        const { url } = this.router;
        this.useLayout = !(url == '/sign-in' || url == '/404' || url == '/sign-up');
      }
    });
  }
}
