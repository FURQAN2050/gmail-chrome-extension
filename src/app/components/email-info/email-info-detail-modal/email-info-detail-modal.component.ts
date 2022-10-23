import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupsService } from 'src/app/services/groups/groups.service';

@Component({
  selector: 'app-email-info-detail-modal',
  templateUrl: './email-info-detail-modal.component.html',
  styleUrls: ['./email-info-detail-modal.component.scss'],
})
export class EmailInfoDetailModalComponent implements OnInit {
  emailData: any = {};
  editMode = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EmailInfoDetailModalComponent>,
    private ApiFactory: GroupsService
  ) {
    const { template, editMode = false } = data;
    this.editMode = editMode;
    this.emailData = template ? template : {};
  }

  updateEmailInfo() {
    this.ApiFactory.upsertEmailInfo(this.emailData).then(
      (res) => {
        console.log(res);
        this.dialogRef.close({ success: true });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}
}
