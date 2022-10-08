import { Component, Inject, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { LoginAuthenticationService } from 'src/app/services/loginAuthentication/login-authentication.service';
import { AddEmailsModalComponent } from '../../emails/add-emails-modal/add-emails-modal.component';

@Component({
  selector: 'app-upsert-email-modal',
  templateUrl: './upsert-email-modal.component.html',
  styleUrls: ['./upsert-email-modal.component.scss'],
})
export class UpsertEmailModalComponent implements OnInit {
  model: any = {};
  currentUser: any;
  success: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpsertEmailModalComponent>,
    private GroupsService: GroupsService,
    private LoginAuthenticationService: LoginAuthenticationService
  ) {
    this.LoginAuthenticationService.getAuthObservable().subscribe((res) => {
      this.currentUser = res;
    });
    if (data) {
      const { email } = data;
      this.model = email;
    }
  }
  upsertEmail() {
    let object = {};
    if (!this?.model?.id) {
      object = { ...this.model, ...{ enduserId: this.currentUser.id } };
    } else {
      object = this.model;
    }
    console.log(object);
    this.GroupsService.addEmail(object).then((res) => {
      this.success = true;
      object = {};
      this.closeDialog();
    });
  }

  closeDialog() {
    this.dialogRef.close({ success: this.success });
  }

  ngOnInit(): void {}
}
