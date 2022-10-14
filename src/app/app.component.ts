import { Component } from '@angular/core';
import { LoopBackConfig, LoopBackAuth } from './shared/sdk/index';
import { BASE_URL, API_VERSION } from './base.url';
import { LoginAuthenticationService } from './services/loginAuthentication/login-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gmail-chrome-extension';
  currentUser: any = null;
  constructor(
    private auth: LoopBackAuth,
    public loginAuth: LoginAuthenticationService,
    public router: Router
  ) {
    LoopBackConfig.setBaseURL(BASE_URL);
    LoopBackConfig.setApiVersion(API_VERSION);
    this.currentUser = this.auth.getCurrentUserData();
    this.loginAuth.userAuthenticated(this.currentUser);
    this.loginAuth.getAuthObservable().subscribe((res: any) => {
      this.currentUser = res;
      if (this.currentUser) {
        this.router.navigate(['emails']);
      }
    });
  }
}
