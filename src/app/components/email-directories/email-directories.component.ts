import { MatDialog } from '@angular/material/dialog';

import { GroupsService } from '../../services/groups/groups.service';
import { LoginAuthenticationService } from 'src/app/services/loginAuthentication/login-authentication.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EmailApi } from 'src/app/shared/sdk';
import { Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AddEmailsModalComponent } from '../emails/add-emails-modal/add-emails-modal.component';
import { UpsertEmailModalComponent } from './upsert-email-modal/upsert-email-modal.component';

@Component({
  selector: 'app-email-directories',
  templateUrl: './email-directories.component.html',
  styleUrls: ['./email-directories.component.scss'],
})
export class EmailDirectoriesComponent implements OnInit {
  dataSource: any = [];
  columnsToDisplay = ['name', 'email', 'phone', 'notes', 'edit']; //'delete'
  expandedElement: any | null;
  currentUser: any = null;

  constructor(
    public dialog: MatDialog,
    public GroupsService: GroupsService,
    public authentication: LoginAuthenticationService
  ) {
    this.authentication.getAuthObservable().subscribe((res) => {
      this.currentUser = res;
      this.getEmails(this.currentUser);
    });
  }

  ngOnInit(): void {}

  getEmails(user: any) {
    let filters = {
      where: { enduserId: user.id },
      // include: ['emails', 'templates'],
      order: 'id DESC',
    };
    this.GroupsService.lookupEmail(filters).then((res) => {
      console.log(res);
      setTimeout(() => {
        this.dataSource = res;
      }, 3000);
    });
  }

  editEmail(event, element) {
    event.stopPropagation();
    console.log(element);
    let dialogRef = this.dialog.open(UpsertEmailModalComponent, {
      height: 'auto',
      width: '50vw',
      data: {
        email: element,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result.success) {
        this.getEmails(this.currentUser);
      }
    });
  }

  addEmail() {
    let dialogRef = this.dialog.open(UpsertEmailModalComponent, {
      height: 'auto',
      width: '50vw',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result.success) {
        this.getEmails(this.currentUser);
      }
    });
  }

  expensionFunc(element) {}

  deleteEmail(event, id) {
    event.stopPropagation();
  }
}
