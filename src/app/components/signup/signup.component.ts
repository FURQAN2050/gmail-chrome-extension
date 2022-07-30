import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EnduserApi, UserApi } from 'src/app/shared/sdk';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  model: any = {};
  constructor(
    public route: Router,
    public _snackBar: MatSnackBar,
    public signupApi: EnduserApi
  ) {}
  signUp() {
    if (
      this.model.firstName &&
      this.model.lastName &&
      this.model.email &&
      this.model.password &&
      this.model.confirmPassword
    ) {
      if (this.model.password == this.model.confirmPassword) {
        let obj = {
          realm: `${this.model.firstName} ${this.model.lastName}`,
          username: `${this.model.firstName} ${this.model.lastName}`,
          email: this.model.email,
          emailVerified: true,
          password: this.model.password,
        };
        this.signupApi.create(obj).subscribe(
          (res) => {
            this.route.navigateByUrl('/login', { state: { data: this.model } });
          },
          (err) => {
            alert(
              JSON.stringify(err?.details?.messages) ||
                'Please check the email Again.'
            );
          }
        );
      } else
        this._snackBar.open('Confirm Password Not Same', undefined, {
          duration: 3000,
        });
    } else {
      this._snackBar.open('Please Enter Required Fields', undefined, {
        duration: 3000,
      });
    }
  }

  login() {
    this.route.navigateByUrl('/login');
  }

  ngOnInit(): void {}
}
