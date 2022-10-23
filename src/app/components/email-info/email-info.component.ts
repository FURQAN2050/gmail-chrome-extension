import { Component, OnInit } from '@angular/core';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { LoginAuthenticationService } from 'src/app/services/loginAuthentication/login-authentication.service';
import { BASE_URL } from 'src/app/base.url';
import { MatDialog } from '@angular/material/dialog';
import { EmailInfoDetailModalComponent } from './email-info-detail-modal/email-info-detail-modal.component';

@Component({
  selector: 'app-email-info',
  templateUrl: './email-info.component.html',
  styleUrls: ['./email-info.component.scss'],
})
export class EmailInfoComponent implements OnInit {
  dataSource: any = [];
  columnsToDisplay = [
    'castingDirector',
    'subject',
    // 'clientName',
    // 'projectName',
    'view',
    'processTemplate',
    'delete',
    'edit',
  ];
  currentUser: any = null;

  expandedElement: any | null;

  constructor(
    public authentication: LoginAuthenticationService,
    private ApiService: GroupsService,
    public dialog: MatDialog
  ) {
    this.authentication.getAuthObservable().subscribe((res) => {
      this.currentUser = res;

      this.getEmailInfo();
    });
  }

  getEmailInfo() {
    let filters = {
      where: { enduserId: this.currentUser.id },
    };
    this.ApiService.lookupEmailInfo(filters).then((res) => {
      console.log(res);
      res.forEach((element: any) => {
        element['subject'] = JSON.parse(element.subject);
      });
      this.dataSource = res;
    });
  }

  processTemplate(event, id) {
    event.stopPropagation();
    console.log(id);
    fetch(`${BASE_URL}/api/emailinformations/parseEmailInformation?id=${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.getEmailInfo();
      });
  }

  deleteTemplate(event, id) {
    event.stopPropagation();
    let ans = confirm('Are you Sure you want to Delete the group ?');
    if (ans) {
      this.ApiService.deleteEmailInfo(id).then((res) => {
        this.getEmailInfo();
      });
    }
  }

  viewTemplate(event, element) {
    event.stopPropagation();
    let dialogRef = this.dialog.open(EmailInfoDetailModalComponent, {
      height: 'auto',
      width: '900px',
      data: {
        template: element,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result.success && result.data) {
      }
    });
  }

  editEmailInfo(event, element) {
    event.stopPropagation();
    let dialogRef = this.dialog.open(EmailInfoDetailModalComponent, {
      height: 'auto',
      width: '900px',
      data: {
        template: element,
        editMode: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result.success && result.data) {
      }
    });
  }

  ngOnInit(): void {}
}
