import { Component, OnInit } from '@angular/core';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { LoginAuthenticationService } from 'src/app/services/loginAuthentication/login-authentication.service';

@Component({
  selector: 'app-email-info',
  templateUrl: './email-info.component.html',
  styleUrls: ['./email-info.component.scss'],
})
export class EmailInfoComponent implements OnInit {
  dataSource: any = [];
  columnsToDisplay = ['projectManager', 'processTemplate'];
  currentUser: any = null;

  expandedElement: any | null;

  constructor(
    public authentication: LoginAuthenticationService,
    private ApiService: GroupsService
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
      this.dataSource = res;
    });
  }

  processTemplate(event, id) {
    event.stopPropagation();
    console.log(id);
  }

  ngOnInit(): void {}
}
