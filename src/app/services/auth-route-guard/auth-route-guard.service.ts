import { Injectable } from '@angular/core';
import { LoopBackAuth } from 'src/app/shared/sdk';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthRouteGuardService implements CanActivate {

  constructor(private auth: LoopBackAuth,) { }
  canActivate(): boolean {
    let user = this.auth.getCurrentUserData();
    console.log(user);
    if (user && user!=null)
      return true;
    else {
      return false;
    }
  }
}
