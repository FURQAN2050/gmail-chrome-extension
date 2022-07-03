import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTemplatesModalComponent } from './add-templates-modal/add-templates-modal.component';
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
import { AddTemplateModalComponent } from './add-template-modal/add-template-modal.component';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
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
export class TemplatesComponent implements OnInit {
  dataSource: any = [];
  columnsToDisplay = ['name', 'editTemplate'];
  expandedElement: any | null;
  addNewTemplate = '';
  currentUser: any = null;
  templates: any = [];
  constructor(
    public dialog: MatDialog,
    public GroupsService: GroupsService,
    public authentication: LoginAuthenticationService
  ) {
    this.authentication.getAuthObservable().subscribe((res) => {
      this.currentUser = res;
      this.getTemplates(this.currentUser);
    });
  }
  ngOnInit(): void {}

  getTemplates(user: any) {
    console.log('get Template Called');
    let filters = {
      where: { enduserId: user.id },
    };
    this.GroupsService.lookupTemplates(filters).then((res) => {
      console.log(res);
      this.dataSource = res;
    });
  }

  upsertTemplates(event, element) {
    event.stopPropagation();
    console.log(element);
    let dialogRef = this.dialog.open(AddTemplatesModalComponent, {
      height: 'auto',
      data: {
        template: element,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.success) {
        this.getTemplates(this.currentUser);
      }
    });
  }

  addTemplates() {
    let dialogRef = this.dialog.open(AddTemplatesModalComponent, {
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result.success && result.data) {
        // this.templates.push(result.data);
        // console.log('template iss');
        // console.log(this.templates);
        this.getTemplates(this.currentUser);
      }
    });
  }

  removeTemplate(template, group) {
    console.log(template);
    console.log(group);
    this.GroupsService.deleteGroupEmail(template.id, group.id).then((res) => {
      this.getTemplates(this.currentUser);
    });
  }

  addTemplate(group) {
    console.log(this.addNewTemplate);
    console.log(group);
    console.log(this.currentUser);

    let createTemplatePayload = {
      template: this.addNewTemplate,
      enduserId: this.currentUser.id,
      nickname: this.addNewTemplate,
    };
    //first need to create the email.
    this.GroupsService.upsertEmail(createTemplatePayload).then((res) => {
      console.log(res);
      let groupEmailPayload = {
        emailId: res.id,
        groupId: group.id,
        enduserId: this.currentUser.id,
      };
      this.GroupsService.upsertGroupEmailAPI(groupEmailPayload);
      this.getTemplates(this.currentUser);
      this.addNewTemplate = '';
    });
  }
}
