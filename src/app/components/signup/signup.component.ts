import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
model:any={}
  constructor(public route:Router,public _snackBar:MatSnackBar) { }
  logIn(){

    if(this.model.firstName && this.model.email && this.model.password && this.model.confirmPassword){
      if(this.model.password == this.model.confirmPassword)
      this.route.navigateByUrl('/login',{ state: { data:this.model } })
      else
      this._snackBar.open('Confirm Password Not Same', undefined, {
        duration: 3000
      });
    }
    else{
      this._snackBar.open('Please Enter Required Fields', undefined, {
        duration: 3000
      });
    }
   

  }
  ngOnInit(): void {
  }

}
