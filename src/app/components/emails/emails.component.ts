import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmailsModalComponent } from './add-emails-modal/add-emails-modal.component';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss']
})
export class EmailsComponent implements OnInit {
  displayedColumns: string[] = ['GroupName', 'Emails'];
  ListData = [
    {position: 1, name: 'John@gmail.com', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Doe@gmail.com', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Smith@gmail.com', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'casan@gmail.com', weight: 9.0122, symbol: 'Be'},
  ];
  constructor(public dialog: MatDialog) { }
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
