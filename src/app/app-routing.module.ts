import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailsComponent } from './components/emails/emails.component';
import { LoginComponent } from './components/login/login.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthRouteGuardService as AuthGuard } from './services/auth-route-guard/auth-route-guard.service';
import { EmailInfoComponent } from './components/email-info/email-info.component';
import { EmailDirectoriesComponent } from './components/email-directories/email-directories.component';

const routes: Routes = [
  { path: 'emails', component: EmailsComponent, canActivate: [AuthGuard] },
  {
    path: 'templates',
    component: TemplatesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'email-info',
    component: EmailInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'email-directory',
    component: EmailDirectoriesComponent,
    canActivate: [AuthGuard],
  },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
