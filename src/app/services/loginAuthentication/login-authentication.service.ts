import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthenticationService {
  private authSubject = new BehaviorSubject([]);

  constructor() { }
  public userAuthenticated(user: any) {
    localStorage.setItem('loggedInUser',JSON.stringify(user));
    this.authSubject.next(user);
  }
  public getAuthObservable() {
    return this.authSubject.asObservable();
  }
}
