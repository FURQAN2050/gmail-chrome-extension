import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailsComponent } from './components/emails/emails.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'emails', component: EmailsComponent },
  { path: '**', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
