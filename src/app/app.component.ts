import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {
  }

  isLayout() : boolean {
    const url: string = this.router.url;
    return url === '/sign-in' || url === '/404' || url === '/sign-up';
  }
}
