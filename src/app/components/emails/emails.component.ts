import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmailsModalComponent } from './add-emails-modal/add-emails-modal.component';
import { GroupsService } from '../../services/groups/groups.service';
import { LoginAuthenticationService } from 'src/app/services/loginAuthentication/login-authentication.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { EmailApi } from 'src/app/shared/sdk';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class EmailsComponent implements OnInit {
  dataSource: any = [];
  columnsToDisplay = ['name', 'totalEmails', 'totalTemplates', 'editGroup'];
  expandedElement: any | null;
  addNewEmail = '';
  currentUser: any = null;
  constructor(
    public dialog: MatDialog,
    public GroupsService: GroupsService,
    public authentication: LoginAuthenticationService
  ) {
    this.authentication.getAuthObservable().subscribe((res) => {
      this.currentUser = res;
      this.getGroups(this.currentUser);
    });
  }
  ngOnInit(): void {}

  getGroups(user: any) {
    let filters = {
      where: { enduserId: user.id },
      include: ['emails', 'templates'],
    };
    this.GroupsService.lookupGroups(filters).then((res) => {
      console.log(res);
      this.dataSource = res;
    });
  }

  upsertEmails(event, element) {
    event.stopPropagation();
    console.log(element);
    let dialogRef = this.dialog.open(AddEmailsModalComponent, {
      height: 'auto',
      width: '50vw',
      data: {
        groups: element,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.success) {
        this.getGroups(this.currentUser);
      }
    });
  }

  addEmails() {
    let dialogRef = this.dialog.open(AddEmailsModalComponent, {
      height: 'auto',
      width: '50vw',
      // data: {
      //   animal: 'panda',
      // },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.success) {
        this.getGroups(this.currentUser);
      }
    });
  }

  removeEmail(email, group) {
    console.log(email);
    console.log(group);
    this.GroupsService.deleteGroupEmail(email.id, group.id).then((res) => {
      this.getGroups(this.currentUser);
    });
  }

  addEmail(group) {
    console.log(this.addNewEmail);
    console.log(group);
    console.log(this.currentUser);

    let createEmailPayload = {
      email: this.addNewEmail,
      enduserId: this.currentUser.id,
      nickname: this.addNewEmail,
    };
    //first need to create the email.
    this.GroupsService.upsertEmail(createEmailPayload).then((res) => {
      console.log(res);
      let groupEmailPayload = {
        emailId: res.id,
        groupId: group.id,
        enduserId: this.currentUser.id,
      };
      this.GroupsService.upsertGroupEmailAPI(groupEmailPayload);
      this.getGroups(this.currentUser);
      this.addNewEmail = '';
    });
  }
}
