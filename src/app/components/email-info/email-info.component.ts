import { Component, OnInit } from '@angular/core';
import { LoginAuthenticationService } from 'src/app/services/loginAuthentication/login-authentication.service';

@Component({
  selector: 'app-email-info',
  templateUrl: './email-info.component.html',
  styleUrls: ['./email-info.component.scss'],
})
export class EmailInfoComponent implements OnInit {
  dataSource: any = [];
  columnsToDisplay = ['projectManager', 'processData'];
  currentUser: any = null;

  expandedElement: any | null;

  constructor(public authentication: LoginAuthenticationService) {
    this.authentication.getAuthObservable().subscribe((res) => {
      this.currentUser = res;
    });
  }

  ngOnInit(): void {}
}
