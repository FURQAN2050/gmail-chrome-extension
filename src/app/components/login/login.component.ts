import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginAuthenticationService } from 'src/app/services/loginAuthentication/login-authentication.service';
import {EnduserApi,LoopBackAuth} from '../../shared/sdk'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
model:any={}
  constructor(public route:Router,
    public _snackBar:MatSnackBar,
    public endUserAPI:EnduserApi,
    public auth: LoopBackAuth,
    public basicAuthentication:LoginAuthenticationService
    ) { }
  logIn(){
    if(this.model.email && this.model.password){
      this.endUserAPI.login({ email: this.model.email, password: this.model.password }).subscribe(token => {
        this.auth.save();
        let user: any = this.auth.getCurrentUserData();
        this.auth.setUser(user);
        this.basicAuthentication.userAuthenticated(user);
        this.route.navigateByUrl('/emails');
      },err=>{
        alert('User name or password is incorrect');
      })
      
    }
    else{
      this._snackBar.open('Please Enter Email Or Password', undefined, {
        duration: 3000
      });
    }
  }
  signUp(){
    this.route.navigateByUrl('/signup')

  }
  ngOnInit(){
    console.log(history.state.data)
    if(history.state.data)
    this.model=history.state.data
  }

}
