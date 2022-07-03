import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmailEditorComponent } from 'angular-email-editor';
import { AddTemplateModalComponent } from './add-template-modal/add-template-modal.component';

const ELEMENT_DATA: any = [{ name: 'test Template' }];
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'editTemplate'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  addTemplate() {
    let dialogRef = this.dialog.open(AddTemplateModalComponent, {
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.success) {
      }
    });
  }

  upsertTemplate(event, element) {
    event.stopPropagation();
    console.log(element);
    let dialogRef = this.dialog.open(AddTemplateModalComponent, {
      height: 'auto',
      data: {
        template: element,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.success) {
        // this.getGroups(this.currentUser);
      }
    });
  }
}
