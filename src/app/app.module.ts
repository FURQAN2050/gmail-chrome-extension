import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailsComponent } from './components/emails/emails.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AddEmailsModalComponent } from './components/emails/add-emails-modal/add-emails-modal.component';
import { AddTemplatesModalComponent } from './components/templates/add-templates-modal/add-templates-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SDKBrowserModule } from './shared/sdk/index';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxEditorModule } from 'ngx-editor';
import { TemplatesComponent } from './components/templates/templates.component';
import { EmailEditorModule } from 'angular-email-editor';
import { AddTemplateModalComponent } from './components/templates/add-template-modal/add-template-modal.component';
import { EmailInfoComponent } from './components/email-info/email-info.component';
import { EmailDirectoriesComponent } from './components/email-directories/email-directories.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EmailsComponent,
    TemplatesComponent,
    AddTemplatesModalComponent,
    AddEmailsModalComponent,
    NavbarComponent,
    TemplatesComponent,
    AddTemplateModalComponent,
    EmailInfoComponent,
    EmailDirectoriesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    HttpClientModule,
    SDKBrowserModule.forRoot(),
    MatChipsModule,
    MatToolbarModule,
    MatOptionModule,
    MatAutocompleteModule,
    NgxEditorModule,
    EmailEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
