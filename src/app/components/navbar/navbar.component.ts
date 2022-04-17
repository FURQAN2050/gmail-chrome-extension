import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAuthenticationService } from 'src/app/services/loginAuthentication/login-authentication.service';
import { LoopBackAuth } from 'src/app/shared/sdk';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser: any = '';
  constructor(
    private auth: LoopBackAuth,
    private router: Router,
    public loginAuth: LoginAuthenticationService
  ) {
    this.loginAuth.getAuthObservable().subscribe((res) => {
      this.currentUser = res;
    });
  }

  ngOnInit(): void {}
  logout() {
    console.log('function called.');
    this.auth.clear();
    this.currentUser = null;
    this.loginAuth.userAuthenticated(null);
    this.router.navigateByUrl('/login');
  }
}
