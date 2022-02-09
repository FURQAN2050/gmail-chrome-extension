import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
model:any={}
  constructor(public route:Router,public _snackBar:MatSnackBar) { }
  logIn(){
    if(this.model.email && this.model.password)
    this.route.navigateByUrl('/signup')
    else
    this._snackBar.open('Please Enter Email Or Password', undefined, {
      duration: 3000
    });
  }
  ngOnInit(){
    console.log(history.state.data)
    if(history.state.data)
    this.model=history.state.data
  }

}
