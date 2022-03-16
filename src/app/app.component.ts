import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'banking-ui';

  public routeLinks = [
    { route: 'home', title: 'Home' },
    { route: 'account', title: 'Account' },
    { route: 'dashboard', title: 'Dashboard' },
    { route: 'login', title: 'Login' },
    { route: 'register', title: 'Register' },
    { route: 'payment', title: 'Payment' },
  ];

  constructor(public route: ActivatedRoute){}
}
