import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmailsModalComponent } from './add-emails-modal/add-emails-modal.component';
import {GroupsService} from '../../services/groups/groups.service'
import { LoginAuthenticationService } from 'src/app/services/loginAuthentication/login-authentication.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss']
})
export class EmailsComponent implements OnInit {
  displayedColumns: string[] = ['GroupName'];
  currentUser:any=null;
  ListData :any= [];
  constructor(public dialog: MatDialog ,public GroupsService:GroupsService,public authentication:LoginAuthenticationService) {
    this.authentication.getAuthObservable().subscribe(res=>{
      this.currentUser=res;
      this.getGroups(this.currentUser);
    }) 
  }

  getGroups(user:any){
    let filters={
      where:{enduserId:user.id},
      include:['emails']
    }
    this.GroupsService.lookupGroups(filters).then(res=>{
      console.log(res);
      this.ListData=res;
    });
  }

  addEmails(){
    this.dialog.open(AddEmailsModalComponent, {
      height:"auto",
      width:"50vw"
      // data: {
      //   animal: 'panda',
      // },
    });
  }
  ngOnInit(): void {
  }

}
